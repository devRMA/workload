# 0010 — Legal basis

**`pass`**

> Owner: labor-law-analyst · Gate: `law` (G2) · Run 1 of this gate, against `spec.md` run 2 ·
> **Blocking — no design, copy, plan or code starts before this passes.**

This gate settles **L1–L10**. It creates **one** binding clause (**LR3.5**), restates **one** existing
clause whose domain was written narrower than its substance (**LR4.2**), states **one** measured floor
(**LR4.4**), and corrects **one** acceptance criterion that cannot fail as written (**AC13**).

It also records **four findings the sweep produced and nobody had measured**, one of which —
**F1, DS1 P4 permanently under the fixed route nav** — is a live breach of the clause this gate
creates, in 4 of 4 cells. A clause with a failing subject on the day it is written is a clause that
has been seen red; that is why LR3.5 is binding rather than advisory.

**The remedy space this gate leaves G3 is narrower than G1 assumed, and the narrowing is arithmetic,
not judgment:** the consent surface's legal floor at 390 is **336 px** of rendered border-box height,
and clearing the lowest occluded row would require a bottom-anchored surface of **≤ 125.9 px** on `/`
and **≤ 277 px** on `/custo-da-hora`. **No bottom-anchored fixed consent surface can satisfy AC13 at
390 at any legally valid size.** §4.4 has the measurement and §4.5 what follows from it.

---

## 0. Scope of this analysis

### Covered

| # | What | Where it is settled |
|---|---|---|
| 1 | **L1** — are CA, CB, CC in the `0006` §2.1 domain, and is the handed set of three complete | §3 |
| 2 | **L2** — does a surface unmounted until a tap satisfy LR3 as corrected | §3.4 |
| 3 | **L3** — the consent surface's floor on placement, size, persistence and prominence, at 390, in rendered geometry | §4 |
| 4 | **L4** — the narrowest container in which a relocated surface still clears LR1 and LR2b | §5 |
| 5 | **L5** — is *short line above the fold + full text in the footer* permitted, and does it need a mandated string | §6 |
| 6 | **L6** — does **R** become a binding LR clause | §7 |
| 7 | **L7** — is a disclosure intersected by the fixed header or route nav concealed under LR3 | §8, and it is **LR3.5** |
| 8 | **L8** — are the legal figures on both routes unchanged by a positioning-only change | §9 |
| 9 | **L9** — does covering a **claim** engage LR3-as-corrected or LR6.1 | §8.3 |
| 10 | **L10** — is an assistive-only 1-px row a disclosure for these purposes | §10 |
| 11 | The **AC13 vacuity correction** — the criterion as written can pass while measuring nothing | §11 |
| 12 | Four findings **F1–F4**, each routed, none patched here | §12 |

### Explicitly not covered

| Excluded | Why | Who owns it |
|---|---|---|
| **Where any surface goes.** No placement, no order, no component, no viewport band. | §6 rules that the fold itself is not a legal obligation. This gate states floors; a gate that also states positions has no floor left to enforce. | `product-designer`, G3 |
| **Re-verification of `lib/legal-tables.ts`** — RGPS, RPPS, IRRF brackets, parcela a deduzir, dependent deduction, the Lei 15.270/2025 reduction. | Settled at `0002` G2, re-verified at `0005` G6/G9, `0006` G6, `0008` G2 and `0009`. **`0002`'s `legal.md` remains the rebuild contract for `lib/legal-tables.ts` and nothing here supersedes any part of it.** This spec computes nothing and AC4 freezes every rendered figure. | — |
| **Flow height above `#salario-bruto`.** | `0008` owns it; `spec.md` AC15 states its ceiling. §12 F1's remedy is flow height **below** the footer, which is a different quantity and spends none of `0008`'s budget — §12 says so explicitly so nobody mis-routes it. | `0008` |
| **What a disclosure says.** | `0003`'s citation registry and `0007`'s Súmula 431 scope. §6 mandates **no string**, so AC5's exemption list from this gate is **empty** and the boundary is never crossed. | `0003`, `0007` |
| **What the consent surface asks or stores.** | `spec.md` § Out of scope 7. §4 rules on its *floor*, not on its questions. The two consent defects the sweep found (§12 F2, F3) are **reported and routed**, not remedied here. | routed |
| **Any consent-rate or revenue claim, in either direction.** | `spec.md` § Out of scope 9. Nobody in this pipeline has measured one, and §4.5's ruling that the surface *may* leave the first screen is a statement about what the law permits, **never** a recommendation that it should. | the human |

### How the measurements below were taken

Against the **deployed preview**, never a local build — `AGENTS.md` §4 rule 6: sibling agents are
active in this tree and `.next` is shared mutable state during a parallel gate.

```
HOST = https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app
viewport 390×844, both colour schemes, Chromium via @playwright/test
```

Five scripts, all new at this gate, all in `.specs/0010-disclosure-reachability-on-mobile/evidence/`
(gitignored), each with its `.txt` beside it:

| Script | What it produced | Used by |
|---|---|---|
| `g2-consent-floor.mjs` | the banner's internal composition, part by part, with `getBoundingClientRect()`, `font-size` and cpl | §4.2 |
| `g2-consent-floor-2.mjs` | the compaction ladder with an **overflow check on every step** | §4.3 |
| `g2-consent-floor-3.mjs` | the floor **constructed in the browser** and measured, not computed | §4.4 |
| `g2-collapsed-disclosures-2.mjs` | CA, CB, CC, **CD, CE** reached by tapping their controls, then measured | §3, §5 |
| `g2-occluded-disclosures-2.mjs` | for every LR-domain surface, the **scroll range at which its whole box clears the fixed chrome**, and whether that range exists | §8, §12 F1 |

Every number in this document was produced by one of those five and is reproduced in **both** themes.
Where a number appears without a theme it was identical to the tenth of a pixel in both, and that is
stated rather than assumed.

**No number here is arithmetic on a token value.** Where a floor is stated, the state it describes
was built in the browser and measured (§4.4). Where prose and a worked measurement disagree, the
measurement wins and the prose is corrected here, at the gate that found it.

---

## 1. Rules in play

| # | Rule | Why this change depends on it |
|---|---|---|
| R1 | **LGPD art. 5º XII** — consent is a *manifestação livre, informada e inequívoca* for a *finalidade determinada* | L3: the floor is a floor on being informed and unequivocal, not on pixels |
| R2 | **LGPD art. 6º IV and VI** — livre acesso and transparência | L3: "facilmente acessíveis" is the only accessibility word the law uses, and it is not a fold requirement |
| R3 | **LGPD art. 8º, caput and §§ 1º–6º** — the form of consent, the controller's burden of proof, the nullity of generic authorisations | L3: §4º is the granularity clause LR4 was built on |
| R4 | **LGPD art. 9º, caput, I–VII and §§ 1º–3º** — what the holder must be told, and the nullity of consent obtained without it | L3: §1º is the clause that makes a content gap a **consent** defect, not a UX one |
| R5 | **ANPD, *Guia Orientativo — Cookies e Proteção de Dados Pessoais*, out/2022** — the regulator's own banner guidance | L3: the source of the equal-prominence and second-level requirements. **Soft law**: boas práticas, expressly *não exaustivas*. It informs the floor; it does not create one on its own. |
| R6 | **CF art. 7º, XVI** and **CLT art. 59, caput and § 1º** | L1: the norms **CA** and **CB** cite, verified word for word before either was classified |
| R7 | **WCAG 2.2 AA, SC 2.5.8 Target Size (Minimum)** — 24×24 CSS px | L3: the only binding floor on a control's rendered size, via `AGENTS.md` §9 |
| R8 | **`0005` §3 LR1, LR3, LR4 · `0006` §3.2 LR2a, LR2b · `0008` §4.1 LR3-as-corrected, §4.2 LR6.1** | The rule set this gate extends. It adds **LR3.5**, restates **LR4**'s clause 2 as **LR4.2**, and adds **LR4.4**. Everything else stands word for word. |

---

## 2. Sources

### R1–R4 — LGPD, Lei nº 13.709, de 14 de agosto de 2018

| | |
|---|---|
| Norm | Lei nº 13.709/2018 (LGPD), as amended by Lei nº 13.853/2019 |
| Articles | art. 5º XII; art. 6º IV, VI; art. 8º caput e §§ 1º–6º; art. 9º caput, I–VII e §§ 1º–3º |
| Effective from | 2020-09-18 (arts. 1º–64, Lei nº 14.058/2020); sanctions from 2021-08-01 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm — fetched this session, 310,252 bytes, HTTP 200 |

**Every operative unit read, and what each one does to a geometric floor.** This is the exhaustion
the ruling rests on: a floor stated without it would be a floor asserted, not derived.

| Unit | Verbatim substance | Does it fix placement, size, persistence or prominence? |
|---|---|---|
| art. 5º XII | *"manifestação livre, informada e inequívoca pela qual o titular concorda com o tratamento de seus dados pessoais para uma finalidade determinada"* | **No pixel.** It fixes three properties of the act: free, informed, unequivocal. "Informed" is the one that reaches geometry, and only through legibility — LR1/LR2. |
| art. 6º IV | *"livre acesso: garantia … de consulta facilitada e gratuita sobre a forma e a duração do tratamento"* | **No.** "Facilitada" is about availability, not about a viewport band. |
| art. 6º VI | *"transparência: garantia … de informações claras, precisas e facilmente acessíveis"* | **No.** "Facilmente acessíveis" is the closest the statute comes, and it is satisfied by a surface that is present, legible and operable. |
| art. 8º caput | *"deverá ser fornecido por escrito ou por outro meio que demonstre a manifestação de vontade"* | **No.** It fixes the *medium*, and a click is such a medium. |
| art. 8º § 1º | destaque das demais cláusulas contratuais | **Not applicable.** It governs consent inside a **contract**; there is no contract here. |
| art. 8º § 2º | *"Cabe ao controlador o ônus da prova"* | **Indirectly, and this is the sharpest one.** The controller must be able to prove the consent was validly obtained. A surface that cannot be read or operated produces a record it cannot defend. This is the clause that turns a legibility failure into a *consent* failure. |
| art. 8º § 3º | *"É vedado o tratamento … mediante vício de consentimento"* | **No pixel**, but it voids the result when §§ 1º/4º or art. 9º are unmet. |
| art. 8º § 4º | *"deverá referir-se a finalidades determinadas, e as autorizações genéricas … serão nulas"* | **No pixel.** This is the granularity clause. It is what **LR4** was built on at `0005` §4, and it is discharged by the **second-level** surface, not by the banner. |
| art. 8º § 5º | revocation *"por procedimento gratuito e facilitado"* | **Persistence, and only this one does.** There must be a *standing* way back. `cookie-consent.tsx:156-165` provides it — the fixed shield control that renders **when the banner is not visible**. §4.6 rules on it. |
| art. 8º § 6º | notice of changes to art. 9º I/II/III/V | **No.** Nothing here changes a purpose. |
| art. 9º caput | *"acesso facilitado às informações … de forma clara, adequada e ostensiva"* about I–VII | **The only "ostensiva" in the statute**, and it qualifies **the information**, not the request. §4.1 rules on what that does and does not buy. |
| art. 9º I–VII | finalidade específica; forma e duração; identificação do controlador; contato; uso compartilhado; responsabilidades; **direitos do titular, com menção explícita ao art. 18** | **Content floor.** These seven are what the surface must lead to. Measured against the shipped banner in §4.1: **two of seven are addressed, five are not, and there is no page anywhere in the app that carries them.** That is finding **F3**. |
| art. 9º § 1º | *"esse será considerado **nulo** caso as informações … não tenham sido apresentadas previamente com transparência, de forma clara e inequívoca"* | **The nullity clause.** It is why F3 is a consent defect and not a content wish. |
| art. 9º § 2º | change of purpose | **No.** |
| art. 9º § 3º | treatment as a condition of the service | **Not applicable.** `analytics-wrapper.tsx:12` loads GA only on `readTelemetryConsent() === true`; the calculator works identically either way. Verified, not assumed. |

**The finding of this table is the absence.** Fourteen operative units, and **not one fixes a
position, a height, a width, a duration of display or a z-order.** What they fix is *content*,
*operability*, *granularity* and *revocability*. Geometry enters only where a content or operability
requirement cannot be met at a given size — which is exactly how `0005` §4 derived LR4, and it is the
only honest way to derive a floor here.

### R5 — ANPD, *Guia Orientativo — Cookies e Proteção de Dados Pessoais*

| | |
|---|---|
| Norm | Not a norm. Guidance issued by the Autoridade Nacional de Proteção de Dados |
| Version | 1.0, outubro/2022 |
| Source | https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf — fetched this session, 670,788 bytes, HTTP 200 |

Its own words on its weight: *"serão apresentadas **orientações não exaustivas, consideradas como
boas práticas**"*. It is quoted here because the regulator's stated expectation is what the
controller's art. 8º §2º burden is measured against, not because it creates a rule.

**Banners de primeiro nível — what to observe:**

- *"Disponibilizar botão que permita **rejeitar todos os cookies não necessários, de fácil
  visualização**, nos banners de primeiro e segundo nível."*
- *"Fornecer um **link de fácil acesso** para que o titular possa exercer os seus direitos … saber
  mais detalhes sobre como seus dados são utilizados e sobre o período de retenção, além de solicitar
  a eliminação dos dados, opor-se ao tratamento ou revogar o consentimento."*

**What to avoid, quoted because three of them describe the shipped build:**

- *"Utilizar um único botão no banner de primeiro nível, sem opção de gerenciamento"* — **not us.**
- *"Dificultar a visualização ou compreensão dos botões de rejeitar cookies ou de configurar cookies,
  e conferir maior destaque apenas ao botão de aceite"* — **not us**: measured, *Recusar* and *Aceitar
  Tudo* have **identical border-box areas, 14 016 px² each**, in both themes (`g2-consent-floor-3.txt`,
  step A). This is the one the app gets right, and §4.4 makes it a clause so it stays right.
- *"**Apresentar cookies não necessários ativados por padrão, exigindo a desativação manual pelo
  titular**"* and *"**Desativar cookies baseados no consentimento por padrão**"* — **us.**
  `components/organisms/cookie-consent.tsx:15` is `useState(true)`. Finding **F2** (§12).
- *"Não disponibilizar banner de segundo nível"* — **not us**: *Configurar* opens one.
- *"Não disponibilizar informações e mecanismo direto, simplificado e próprio para o exercício dos
  direitos de revogação … e de oposição"* — **partly us**: revocation exists (`:156-165`); the
  information does not. Finding **F3** (§12).

### R6 — CF art. 7º XVI and CLT art. 59, verified before CA and CB were classified

| | |
|---|---|
| Norms | Constituição Federal de 1988, art. 7º, XVI · Decreto-Lei nº 5.452/1943 (CLT), art. 59, caput e § 1º, na redação da Lei nº 13.467/2017 |
| Effective from | CF: 1988-10-05 · CLT art. 59 § 1º in its current wording: 2017-11-11 (Lei nº 13.467/2017) |
| Superseded by | in force |
| Sources | https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm · https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm — both fetched this session, HTTP 200 |

Verbatim, from the fetched text:

- **CF art. 7º, XVI** — *"remuneração do serviço extraordinário superior, no mínimo, em cinqüenta por
  cento à do normal"*.
- **CLT art. 59, caput** (Lei nº 13.467/2017) — *"A duração diária do trabalho poderá ser acrescida de
  horas extras, em número não excedente de duas, por acordo individual, convenção coletiva ou acordo
  coletivo de trabalho."*
- **CLT art. 59, § 1º** (Lei nº 13.467/2017) — *"A remuneração da hora extra será, pelo menos, 50%
  (cinquenta por cento) superior à da hora normal."*

**CA's citation is correct**, both norms, both numbers. **CB's claim is correct and I checked the
whole article for a unit that would refute it**: the caput caps extras at two per day and § 1º states
**one** floor with **no tier**; §§ 2º–6º govern compensation regimes and the 12×36 journey and set no
rate step. **No federal norm doubles the rate after the second hour.** CB is right, and it is right
about a number the app renders by default (§12 F4).

---

## 3. L1 and L2 — CA, CB, CC, and the two the search did not return

### 3.1 — The handed set is under-counted, and so was the re-derived one

`spec.md` names three strings — **CA**, **CB**, **CC** — and says so honestly: it derived them by
searching for `hint=` literals and for gap-words. That search is a search over **string literals in
`.tsx` files**. `AGENTS.md` §5, *How a rule's domain is defined*, says to rule on the instance **by
reading the module its strings come from, never on the component that renders them** — and the
module `regime-field.tsx` renders from is `lib/payroll.ts`.

```
$ grep -rn "WORK_REGIME_INFO" lib components --include="*.ts" --include="*.tsx" -l
lib/payroll.ts
components/molecules/regime-field.tsx
```

`lib/payroll.ts` `WORK_REGIME_INFO` carries two `impact` strings, rendered at
`components/molecules/regime-field.tsx:78`, **inside the same `CollapsiblePanel` as CC**. Both state
rates, one interpolates a currency ceiling and the table year, and one names a gap. **Neither has
ever been classified by any `legal.md`.** They are admitted here as **CD** and **CE**.

| # | Source module and line | Rendered at | What it says |
|---|---|---|---|
| **CA** | `components/organisms/journey-form.tsx:142` (literal `hint`) | `components/organisms/journey-form.tsx:142` | *O piso legal é 50% sobre a hora normal (art. 7º, XVI, da CF; art. 59, §1º, da CLT).* |
| **CB** | `components/organisms/journey-form.tsx:157` (literal `hint`) | `components/organisms/journey-form.tsx:157` | *Não existe lei que dobre o adicional depois da 2ª hora: o piso continua sendo 50%. Só use 100% se a sua convenção coletiva previr esse degrau.* |
| **CC** | `components/molecules/regime-field.tsx:83` (literal) | `components/molecules/regime-field.tsx:83` | *O regime muda só o cálculo do INSS. O IRRF segue a mesma tabela para os dois.* |
| **CD** | `lib/payroll.ts` — `WORK_REGIME_INFO[0].impact` | `components/molecules/regime-field.tsx:78` | *INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14%. O teto do salário de contribuição é R$ …: acima disso o desconto trava em R$ … (tabela de 2026).* |
| **CE** | `lib/payroll.ts` — `WORK_REGIME_INFO[1].impact` | `components/molecules/regime-field.tsx:78` | *Aplicamos a tabela do RPPS federal: a contribuição não para no teto … as faixas seguem subindo até 22% … Servidor estadual ou municipal tem alíquota própria (muitas vezes 14% linear), então este número não vale para ele.* |

**The enumeration is the test's output, never its definition.** The test is `0006` §2.1, and §3.5
adds the clause it was missing.

### 3.2 — Each one against each clause of the `0006` §2.1 test, one clause at a time

| # | (a) Cite — states a number, rate, threshold, divisor or year, or attributes one to a norm | (b) Gap — names a variable, right or amount the user's situation includes and this app does not produce | (c) Choice — records, conditions or solicits a decision the app stores and acts on | Ruling |
|---|---|---|---|---|
| **CA** | **yes** — the rate **50%**, attributed to **CF art. 7º XVI** and **CLT art. 59 § 1º**, both verified verbatim in §2 R6 | no — the app computes the overtime rate; it omits nothing here | no — it explains an operand; it does not solicit the choice | **LR domain, on (a).** |
| **CB** | **yes** — **50%** and **100%**, with a negative attribution (*não existe lei*) that is itself a claim about the corpus, verified in §2 R6 | **yes** — *a sua convenção coletiva*. The CCT step is an amount the user's real payslip may include and this app cannot know. It is the same obligation DS1 P3 discharges page-wide, discharged again at the operand | no | **LR domain, on (a) and (b).** The sharpest of the five. |
| **CC** | **no**, read literally — no number, no rate, no year, and no number attributed to a norm | no — it says the opposite: that nothing else changes | **not on its face.** The regime *is* stored and acted on, but (c)'s stated basis is LGPD art. 5º XII / 8º §4º and its subject is consent | **LR domain, on the new clause (d)** — §3.5 |
| **CD** | **yes** — **7,5%**, **14%**, the RGPS ceiling as currency, and **the table year**, all interpolated from `CURRENT_LEGAL_YEAR` | no | no | **LR domain, on (a).** |
| **CE** | **yes** — **22%**, **14%** | **yes** — *"Servidor estadual ou municipal tem alíquota própria … este número não vale para ele"* is a gap named at the point it bites | no | **LR domain, on (a) and (b).** |

**Five of five are in the LR domain.** The answer AC8 demands, by name: **CA in, CB in, CC in.**

### 3.3 — All five rendered and measured, not bounded from source

Lesson **031**, promoted into this agent's definition: *render every disclosure before you report
anything about it.* Reaching them needed the consent banner dismissed first — the first attempt
(`g2-collapsed-disclosures.mjs`) reported all five still absent after the taps, and that was **my
instrument failing, not the surfaces being absent**. The `fixed` banner was intercepting the pointer.
Recorded rather than quietly re-run, because a probe that returns ABSENT for the wrong reason is
exactly the error this rule exists to stop.

`g2-collapsed-disclosures-2.mjs`, 390×844, seeded, consent answered, **both themes, identical to the
tenth of a pixel in all of them**:

| # | On load | After the tap | `font-size` | rendered `width` | surface root | **LR2a** spent | **LR2b** cpl | line boxes | chars |
|---|---|---|---|---|---|---|---|---|---|
| **CA** | `ABSENT FROM DOM` | present, `vtop` 903.0..937.7 | **12px** | 258 | 308 | **50** ✗ | **41.5** ✓ | 2 | 83 |
| **CB** | `ABSENT FROM DOM` | present, `vtop` 1051.2..1120.8 | **12px** | 258 | 308 | **50** ✗ | **35.5** ✗ | 4 | 142 |
| **CC** | `ABSENT FROM DOM` | present, `vtop` 71.4..106.2 | **12px** | 308 | 358 | **50** ✗ | **38.5** ✗ | 2 | 77 |
| **CD** | `ABSENT FROM DOM` | present, `vtop` −408.6..−284.6 | 14px | 253 | 254 | **1** ✓ | 27.7 *(residual)* | 6 | 166 |
| **CE** | `ABSENT FROM DOM` | present, `vtop` −145.6..41.4 | 14px | 249 | 254 | **5** ✓ | 32.4 *(residual)* | 9 | 292 |

**LR2b binds at 390 for a surface whose body text is ≤ 12px** (`0006` §3.2). CA, CB and CC are
12px — so **CB and CC fail LR2b at 390 today, at 35.5 and 38.5 against a floor of 40.** CD and CE
are 14px, so LR2b does not bind and their cpl is a **residual, reported and never absorbed**
(`0006` §3.3).

**LR2a's reading is ambiguous for these five and the ambiguity is the finding.** `0006` §3.2 defines
`surfaceRoot` as *"the outermost element the surface renders (for a banner, the `AlertBanner` root
`<div>`)"* — written for a banner, which is a component with a root. A `hint` is a paragraph inside a
`Field` inside a card; "the outermost element the surface renders" has no referent. Two readings
exist and they disagree: under **the nearest ancestor wider than the text** (what I measured: 308,
308, 358) CA/CB/CC spend **50** and fail by 18; under **the text's own containing block** they spend
0 and pass trivially. **I set the first reading**, because the second makes LR2a unfailable for any
surface whose parent is its own width, which is every paragraph in the app — a clause that cannot be
red is decoration (`0005` §3). Under that reading the **18 px overspend is the `p-6` padding**
(24 px each side + 1 px border = 50 against a 32 px budget), and it is the same 18 px that **DS4**
spends (§4.2) — one cause, two surfaces, and neither had ever been measured.

### 3.4 — L2 · does an unmounted surface satisfy LR3 as corrected? **No, and the reason is the claim, not the control**

LR3-as-corrected (`0008` §4.1) binds *"for every disclosure surface, **in every frame in which the
claim it qualifies is rendered**, with no user interaction beyond scrolling"* and requires the
surface to be *"present in the DOM in that frame, without an event"* and *"not inside … a subtree
whose owner has `aria-expanded="false"`"*.

So the question is not whether the string is behind a control. It is **whether its claim is on the
screen while it is not.** Answering it needs the claim named for each of the five, and then measured.

| # | The claim it qualifies — the rendered element whose number, right or amount its text refers to | Where that claim renders | Measured, on load, before any tap |
|---|---|---|---|
| **CA** | the overtime rate the app applies — rendered as **`Extra 50%`** at `components/organisms/day-summary.tsx:193` | `/`, in the day summary, **outside** the panel | claim rendered **True**, CA `ABSENT FROM DOM` — 2/2 themes |
| **CB** | **`Extra 100%`** at `components/organisms/day-summary.tsx:203`, the default from `hooks/use-work-calculator.ts:14` | `/`, same block, **outside** the panel | claim rendered **True**, CB `ABSENT FROM DOM` — 2/2 themes |
| **CC** | the deduction and the líquido computed under the selected regime | `/custo-da-hora`, **outside** the panel | claim rendered **True**, CC `ABSENT FROM DOM` — 2/2 themes |
| **CD** | the RGPS deduction figure computed from `TABLE.rgpsBrackets` | `/custo-da-hora`, outside | claim rendered **True**, CD `ABSENT FROM DOM` — 2/2 themes |
| **CE** | the RPPS deduction figure computed from `TABLE.rppsFederalBrackets` | `/custo-da-hora`, outside | claim rendered **True**, CE `ABSENT FROM DOM` — 2/2 themes |

> **A correction to my own instrument, made here rather than left in the numbers.** For CC, CD and CE
> the probe's claim marker was the bare string `INSS`, and on `/` that matched the **footer**, not a
> regime figure. The `/` rows of `g2-collapsed-disclosures-2.txt` therefore prove nothing about
> CC/CD/CE and I am not using them. The ruling above rests only on the `/custo-da-hora` rows, where
> the regime control renders and the marker is the figure it governs.

**The ruling. All five breach LR3-as-corrected, and all five breach LR6.1.**

- **LR3**, bullet 1 — not present in the DOM in a frame where the claim is, and the presence depends
  on an **event**. Bullet 3 — inside a subtree whose owner is `aria-expanded="false"` on load
  (`journey-form.tsx:91`, `regime-field.tsx:37`), and worse than that: `collapsible-panel.tsx:17`
  renders `{isOpen ? … : null}`, so there is no subtree at all.
- **LR6.1** — `frameIndex(disclosure) − frameIndex(claim) ≤ 0` is not merely violated, it is
  **undefined on the left-hand side**: with no interaction the disclosure has no frame. The escape
  clause applies as written — *a delta of 1 frame is a finding, not a licence* — and an unbounded
  delta is not a smaller finding than a 1-frame one.

**And this is not a defect this spec may fix.** `spec.md` § Non-goals forbids a control that reveals
a disclosure and forbids any new string; making CA–CE satisfy LR3 means rendering them
unconditionally, which spends **flow height above `#salario-bruto`** on `/custo-da-hora` — `0008`'s
budget, ceiling **< 12 px**, and AC15 makes spending it a bounce. So the honest disposition is the
one AC8 already provides for: **ruled in domain, defect named, routed with an owner and a trigger,
never a date.** §12 **F4** carries it.

### 3.5 — The clause `0006` §2.1 was missing, and CC is what found it

CC states no number and names no gap, and it is plainly a disclosure: it tells the user **which legal
table governs their case**. `0006` §2.1's three clauses are all about what a string *says about a
quantity*; none is about what a string says about **applicability**. That is lesson **045** —
*a claim about the user's contract can live in a constant that renders nothing* — arriving on a
string instead of a constant.

> **Clause (d) — Applicability. Binding, and it extends the `0006` §2.1 test rather than replacing
> it.**
>
> A rendered string is in the LR domain if it **states which norm, table, regime or hypothesis applies
> or does not apply to the user's own case**, in a way that changes how the user should read a number
> the app computes — even when it states no number itself.

**What it deliberately excludes, because a veto that covers everything covers nothing.** Run against
the strings already ruled, it must not move any of them, and it does not:

- `salary-calculator.tsx:124-126` (**C1**, the zero warning) — says the zero is an absent input. No
  norm, no table, no regime, no hypothesis. **Out**, as `0006` §2.3 ruled.
- `lib/journey.ts:19-36` (**C4**, the eight ordering messages) — chronology. **Out**, as `0006` §2.4
  ruled.
- `journey-form.tsx:134` (*"Define o tempo total de trabalho esperado por dia…"*) and
  `salary-calculator.tsx:116` (*"A mesma jornada diária usada na aba Jornada"*) — describe the app's
  own wiring. **Out.**
- `regime-field.tsx` — `selected.summary` (*"Carteira assinada, inclusive em estatais"*), rendered
  on the button **outside** the panel: it is a **label for the option**, not a statement about which
  table governs. **Out.** The `who` strings inside the panel (*"Quem tem contrato regido pela CLT…"*)
  **are** applicability statements and are **in** — and they render in the same element as CD and CE,
  so they are already covered by those two rows and add no surface.

**Widening a domain is a re-execution, not a membership operation.** Every clause of every standing
rule was run against the five newly admitted members, with a command, in §3.3 and §3.4 — LR1, LR2a,
LR2b, LR3, LR6.1 — and each one's verdict is written above with the number that produced it. The
green ones are green for a stated reason: **LR2a passes for CD and CE because their container is
their own width (254 vs 253 and 249)**, which is a property of the option card, not of the rule, and
that assumption is load-bearing enough to be written here rather than noticed later.

---

## 4. L3 — the consent surface's floor, in rendered geometry at 390

### 4.1 — What the norms fix, and what they leave to design

§2's fourteen-unit table is the answer's foundation and its conclusion is negative:
**no operative unit of the LGPD fixes a position, a height, a width, a display duration or a
z-order for a consent request.** The one word that comes closest — art. 9º caput's *ostensiva* —
qualifies **the information** about the treatment (I–VII), not the request, and the statute pairs it
with *acesso facilitado*, which is an availability property.

So the floor is **not a height**. It is a set of content-and-operability requirements, each of which
resolves to geometry only where it cannot be met at a given size — which is exactly how LR4 was
derived at `0005` §4, from art. 8º §4º, and it is the only derivation available.

**Measured against the shipped surface, art. 9º I–VII:**

| Unit | Required | On the first-level banner today | On the second-level dialog today |
|---|---|---|---|
| I — finalidade específica | yes | partly: *"melhorar sua experiência e entender como você usa o WorkLoad"* | yes: *Telemetria (Google Analytics)* / *Cookies Essenciais*, each with a purpose line |
| II — forma e duração | yes | **no** | **no** — no retention period anywhere |
| III — identificação do controlador | yes | **no** | **no** |
| IV — informações de contato | yes | **no** | **no** |
| V — uso compartilhado e a finalidade | yes | **no** | partly: *Google Analytics* is named |
| VI — responsabilidades dos agentes | yes | **no** | **no** |
| VII — direitos do titular, **com menção explícita ao art. 18** | yes | **no** | **no** |

```
$ grep -rn "privacidade\|Política\|política\|cookies\|Cookies" app components --include="*.tsx" -l
components/organisms/cookie-consent.tsx
```

**One file. There is no cookie policy and no privacy page in this application**, and no link to one
from either consent surface. Under **art. 9º § 1º** that is not a content wish: *"o consentimento
será considerado **nulo** caso as informações … não tenham sido apresentadas previamente"*. It is
finding **F3**, it is routed, and — this is the part that binds G3 — **it means the floor is above
what is rendered today, not below it.** The consent surface cannot be made legal by removing
information from it.

### 4.2 — The shipped surface, measured part by part

`g2-consent-floor.mjs`, 390×844, cold load, consent pending. **Identical in dark and light to the
tenth of a pixel.**

| Part | box | `getBoundingClientRect().width` | height | `font-size` | chars | line boxes | cpl |
|---|---|---|---|---|---|---|---|
| the banner root, `position: fixed` | **354.0 .. 820.0** | **342** | **466** | — | — | — | — |
| decorative icon (`aria-hidden`) | 395.3 .. 418.7 | 23.3 | 23.3 | — | — | — | — |
| `h2` *Respeitamos sua privacidade* | 459.0 .. 519.0 | 292 | 60 | 24px | 27 | 2 | 13.5 |
| `p` *Usamos cookies para melhorar…* | 523.0 .. 607.0 | 292 | 84 | 14px | 144 | 4 | **36.0** |
| `button` *Configurar* | 631.0 .. 675.0 | 103.5 | 44 | 14px | — | — | — |
| `button` *Recusar* | 687.0 .. 735.0 | **292** | **48** | 14px | — | — | — |
| `button` *Aceitar Tudo* | 747.0 .. 795.0 | **292** | **48** | 14px | — | — | — |

Three readings follow, and each one changes something:

1. **Equal prominence holds today, exactly.** *Recusar* and *Aceitar Tudo* have identical border
   boxes — **14 016 px² each** (`g2-consent-floor-3.txt`, step A, both themes). ANPD's *"conferir
   maior destaque apenas ao botão de aceite"* is the practice to avoid, and the app avoids it. §4.4
   turns that into a clause so a compaction cannot spend it.
2. **DS4 fails LR2a, by 18 px, and nobody had measured it.** `0006` §3.2 declares LR2a binding *"on
   every disclosure surface"* and names DS4 among the surfaces its correction supersedes; `0008` §4
   measured LR1 and LR2a for DS1 and the DS3 control and **not** for DS4. Measured here:
   `342 − 292 = 50` against a **32** budget. Same cause as CA/CB/CC (§3.3): `p-6` spends 24 px a
   side plus a 1 px border. Finding **F2b** in §12.
3. **The paragraph's 36.0 cpl is a residual, not a failure.** Its body text is 14px, so LR2b does not
   bind at 390 (`0006` §3.2) — but the residual is reported and never absorbed, and §4.4's clause 3
   forbids it going lower.

### 4.3 — The compaction ladder, with an overflow check on every step

`g2-consent-floor-2.mjs`. The height a banner "could" have is worthless without checking that its
controls still fit; the first pass of this measurement produced a plausible 206 px that had three
buttons summing 337.5 px of intrinsic width inside a 292 px container. Every step below carries
`overflowsX`, each button's `scrollWidth` against its rendered width, and whether any button's right
edge escapes its container.

| Step | banner height | LR2a spent | paragraph | controls block | any clipped label | any control outside its container |
|---|---|---|---|---|---|---|
| **A** — as shipped | **466** | 50 ✗ | 292 w, 4 boxes, 36.0 cpl | 164 | no | no |
| **B** — horizontal padding cut to the 32 px LR2a budget | 448 | **32 ✓** | 310 w, 4 boxes, 36.0 cpl | 164 | no | no |
| **C** — decorative icon removed | 368 | 32 ✓ | unchanged | 164 | no | no |
| **D** — heading removed | 304 | 32 ✓ | unchanged | 164 | no | no |
| **E/F** — controls rearranged into rows | 248 | 32 ✓ | unchanged | 108 | no | no |

**Both themes, identical.** Note what B does *not* buy: recovering 18 px of width leaves the
paragraph at **4 line boxes and 36.0 cpl**, because 310 px is still short of the width its 144
characters would need for 3 boxes. The LR2a fix is worth 18 px of height and **nothing** to the
measure — stated because the opposite is the natural assumption and it is wrong.

### 4.4 — The floor, constructed in the browser and measured

`g2-consent-floor-3.mjs` builds the surface up from the shipped one to the smallest state that meets
every clause below, and reads `getBoundingClientRect().height` off it. **This is the worked
measurement of the state I consider correct, taken before the number was written down.** Both themes,
identical.

| Step | What it is | banner height |
|---|---|---|
| A | as shipped | 466 |
| B | LR2a budget restored, decorative icon removed | 368 |
| C | binary choices at equal width on one row | 308 |
| **D** | **C plus the art. 9º / art. 18 information link the banner lacks today** | **336** |
| E | D with the heading removed — available only through `content-writer`, and not authorised here | 272 |

> ### LR4.4 — the first-level consent surface's floor. **Binding.**
>
> **Domain — a test, never a list.** Every rendered surface that **solicits, records or revises** a
> consent decision the app will store and act on, at the **first level** — that is, before the user
> has asked for more. Today the test returns one member, the banner at
> `components/organisms/cookie-consent.tsx:44`; the enumeration is the test's output.
>
> The surface must, **at 390×844, in both themes, with no interaction**:
>
> 1. **Carry the informing text**, and that text's `getBoundingClientRect().width` must satisfy
>    **LR2a** against the surface root — `root.width − bodyText.width ≤ 32`. Measured floor: at a
>    342 px root, `bodyText ≥ 310`.
> 2. **Offer a rejection and an acceptance whose rendered border-box areas satisfy
>    `area(reject) ≥ area(accept)`**, both fully inside the surface and fully inside the viewport,
>    with their accessible labels rendered and `scrollWidth ≤ ceil(width)` — no clipped label.
>    Worked measurement of the correct state: **14 016 px² = 14 016 px²** today.
> 3. **Offer an entry point to the second level** (granular, per-purpose), and that entry point is a
>    control with a rendered label, ≥ **24 × 24** CSS px (WCAG 2.2 AA SC 2.5.8). Measured today:
>    103.5 × 44.
> 4. **Carry a link to the art. 9º I–VII information, with explicit mention of the art. 18 rights**,
>    ≥ 24 px of rendered height, with its label unclipped. **Not satisfied today** (§4.1, finding F3).
> 5. **Not be `.sr-only`, `display:none`, `visibility:hidden`, `opacity:0`, `[hidden]`, or inside a
>    subtree whose owner is `aria-expanded="false"`** — LR3's four surviving bullets, which bind DS4
>    already.
>
> **The measured floor these five produce at 390, as a single number: `getBoundingClientRect().height`
> ≥ 336 CSS px, border box.** That is step D, measured, not computed. It is the floor for **this
> copy**; a shorter informing text would produce a smaller one, and shortening it is a `0003` change
> this gate does not authorise (§6).
>
> **Where this prose and step D disagree, step D wins.**

**What LR4.4 deliberately does not say.** It sets no position, no anchor edge, no `z-index`, no
display delay, no dismissal behaviour and no persistence beyond §4.6. Bottom-anchored, top-anchored,
in document flow, as a sheet, as a full-screen interstitial — all satisfy it if the five clauses
measure. That choice is `product-designer`'s at G3.

### 4.5 — What the floor does to finding O, arithmetically

The banner's bottom edge is pinned at **820** (`bottom-[max(24px, safe-area)]` at 844). For a
bottom-anchored surface, *height* and *top edge* are the same variable. So AC13 — `linesOccluded = 0`
in all 16 cells — sets a **ceiling** on the height, and LR4.4 sets a **floor**, and the two can be
compared directly.

| Route | Lowest occluded row, `bottom` (`spec.md` § Finding O, re-measured at run 2) | Maximum height of a bottom-anchored surface that clears it | LR4.4 floor | Gap |
|---|---|---|---|---|
| `/` | *Entrada às 08:00*, **694.1** | 820 − 694.1 = **125.9** | 336 | **−210.1** |
| `/custo-da-hora` | *Bruto* / *Ganhos Extras* rows, **543.0** | 820 − 543.0 = **277.0** | 336 | **−59.0** |

> **No bottom-anchored fixed consent surface can satisfy AC13 at 390 at any legally valid size.**
> Not at the floor, not below it — below it there is no valid consent to obtain.

And the mirror does not rescue it: the band above the answer panel is **65 → 96**, **31 px**, so a
top-anchored surface below the fixed header has 31 px and needs 336.

**This is the single most useful thing this gate hands G3, and it is a measurement, not an opinion.**
It does not choose the remedy. It removes one family of remedies — *shrink the banner where it is* —
and leaves every other family open: taking the surface out of the answer's band, taking it out of
the overlay model, making the answer panel the thing that does not move, or something none of those
describe.

### 4.6 — Placement, persistence and prominence, ruled one at a time

**Placement — no floor, and this is what makes O solvable.** No unit of arts. 5º, 6º, 8º or 9º
requires the consent request to occupy the first screen, to be above any fold, or to precede any
content. What art. 8º and art. 9º § 1º require is that consent be obtained **before the processing**
and **after the information**. Verified in the code rather than assumed:

```
components/organisms/analytics-wrapper.tsx:12
  const syncConsent = () => setShouldLoad(readTelemetryConsent() === true);
```

Google Analytics mounts **only** on an affirmative stored consent. Nothing is processed before the
user answers. **Therefore the consent surface may render below the first screen, or in document
flow, without any loss of validity** — the consequence is that a user who never scrolls never
consents, and telemetry never runs. That is a **commercial** consequence, and per `spec.md` § Out of
scope 9 no agent in this pipeline may price it in either direction. I record the legal permission;
the trade is the human's.

**Persistence — one floor, and it is already met.** Art. 8º § 5º requires revocation *"por
procedimento gratuito e facilitado"*. `cookie-consent.tsx:156-165` renders a fixed, labelled
shield control (*Configurações de Privacidade*, 44 × 44) **whenever the banner is not visible**, which
opens the second-level dialog. **That control is load-bearing for art. 8º § 5º**, and it is written
here because it looks like chrome and a remedy counting fixed pixels will find it: it appears in the
occlusion instrument's own output as `button 784..828`. Removing it to buy first-screen pixels is a
**consent** change, not a layout change, and it is a G2 rejection.

**Prominence — relative, never absolute.** ANPD's requirement is comparative: the rejection must not
be harder to see than the acceptance. It is **LR4.4 clause 2**, and it is expressed as
`area(reject) ≥ area(accept)` precisely so that a compaction which shrinks both equally still passes
and one that shrinks only *Recusar* fails.

### 4.7 — Does LR4 as written reach the banner? **Clause 1 does not; clause 2 does, and is restated**

The team lead's question, answered clause by clause rather than as a whole.

| LR4 clause, as written at `0005` §4 | Reaches the banner? |
|---|---|
| **1** — *"The dialog renders at ≥ min(480, viewport width − 32) CSS px … measured as the content-box width of the dialog element"*, justified by *"labelled toggle rows whose label and control must sit legibly on the same line"* | **No.** Its subject is *the dialog element* and its justification is *toggle rows*. The banner has no toggle row. Applying 480 to it would be importing a number derived from a different surface's content — the defect `0006` §3.1 corrected in LR2. **LR4 clause 1 governs the settings dialog only, and it stands unchanged.** Measured on the dialog at 390 this session: border box **358**, content box 292, `min(480, 390 − 32) = 358` → **passes exactly**, box 162.8..681.2, `fullyInViewport: true`, both themes. |
| **2** — *"Every control that expresses a choice … is fully within the viewport and fully within the dialog's own bounds, with its accessible label rendered"* | **Yes by substance, no by text** — it says *"the dialog's own bounds"*. A control outside its surface is an unusable choice wherever it renders. **Restated as LR4.2, below.** |
| **3** — *"If a granular consent surface cannot satisfy clauses 1 and 2, it must not be offered"* | **Yes, unchanged.** It bites here in a way `0005` did not anticipate: if a compaction leaves the second level unable to meet clause 1, the honest fallback is a first level with a binary choice and **no *Configurar***, which ANPD lists as a practice to avoid. Both branches are bad; that is the point of the clause, and it is why §4.5's arithmetic matters before a design exists. |

> ### LR4.2 — restated. **Binding, on every consent surface at every level.**
>
> Every control that expresses a choice — each toggle, *Salvar*, *Recusar*, *Aceitar Tudo*, the
> second-level entry point and the close control — is **fully within the viewport and fully within
> the bounds of the surface that contains it**, with its accessible label rendered and unclipped
> (`scrollWidth ≤ ceil(getBoundingClientRect().width)`), at 390×844 and 1440×900, in both themes.
>
> **One quantity across the clause**: `getBoundingClientRect()`, border box, everywhere — the same
> quantity LR1, LR2a and LR4.4 read.
>
> **Worked measurement of the correct state**, taken this session on the deployed head: the
> second-level dialog at 390, controls `44 × 44` (close), `44 × 44` (telemetry switch),
> `292 × 56` (*Salvar Preferências*), **`inViewport: true` for all three, both themes**; the
> first-level banner, controls `103.5 × 44`, `292 × 48`, `292 × 48`, none clipped, none outside.

---

## 5. L4 — the narrowest container a relocated surface may land in

A surface moved up lands in a narrower box. The question is where the narrowing stops being a
relocation and starts being a legibility loss, and it has to be answered **per font size**, because
that is the defect `0006` §3.1 corrected in LR2: *a characters-per-line floor is a function of column
width **and** font size; stated as a bare constant it is a rate quoted without its base.*

### 5.1 — Bounding the character width at **12px**, from this gate's own measurements

`0006` §4.1 bounded it at **14px** and its `k` may not be reused here: every surface this spec could
relocate — DS1, DS2, CA, CB, CC — renders at **12px**, and LR2b binds at 390 **only** for ≤ 12px.
So the bound is re-derived, from §3.3's rendered measurements.

Let `k` be the CSS px a character of this type occupies on average, and `cap(w) = w / k`.

From **CA**: 83 chars at `w = 258` took **2** line boxes, so `cap(258) ≥ 83/2 = 41.5`.
From **CB**: 142 chars at `w = 258` took **4**, so **3 were insufficient**: `cap(258) < 142/3 = 47.33`.

```
cap(258) ∈ [41.5, 47.33)        →        k ∈ (5.452, 6.217]  CSS px per character, at 12px
```

**Checked against two surfaces the bound did not use, which is what makes it a bound and not a
fit:** CC, 77 chars at `w = 308` in 2 boxes, needs `cap(308) ∈ [38.5, 77)` — the bound gives
`[49.5, 56.5)` ✓. DS1 at `w = 358`, measured **52.4–56.7 cpl** at `0008` §4 — the bound gives
`cap(358) ∈ [57.6, 65.7)`, and `cpl ≤ cap` always ✓.

### 5.2 — The width floors that follow

| Question | Answer | Derivation |
|---|---|---|
| Below what width can **no** 12px string reach 40 cpl? | **< 218.1 px** | `40 × 5.452`, the most favourable end |
| At what width is 40 cpl **attainable** for a string of suitable length? | **≥ 248.7 px** | `40 × 6.217`, the least favourable end |
| Between 218.1 and 248.7 | **undecided by the bound.** I will not write a number I have not measured (`0006` §4.4) | — |
| **LR1's own floor** | `getBoundingClientRect().width ≥ min(320, A)`. In the page content column at 390, `A ≈ 358`, so the bar is **320** | `0005` §3, unchanged |

**Attainability is per string, because cpl is quantised** (`0006` §3.1). Run for the three 12px
strings this spec could move:

| Surface | chars | Line boxes needed for ≥ 40 cpl | `cap` that requires | Width that guarantees it | Verdict at 390 |
|---|---|---|---|---|---|
| **CA** | 83 | ≤ 2 | ≥ 41.5 | ≥ 258 — **already met** | ✓ passes today at 41.5 |
| **CB** | 142 | ≤ 3 | ≥ 47.33 | **≥ 294.3** | ✗ today at 258 (35.5); ✓ if relocated to ≥ 294.3 |
| **CC** | 77 | ≤ 1 | ≥ 77 | **≥ 478.7** | **✗ at every width this app offers at 390.** The widest column is 358. |

**CC cannot reach 40 cpl at 390 at any available width**, and that is the same result `0006` §4.3
reached for C1, by the same arithmetic on a different font size. Its measured **38.5 is its floor
from now on** under LR2b's non-regression clause; it is not a criterion any remedy can satisfy and
none may be written against it.

> ### L4, settled
>
> A relocated disclosure surface must land in a container that gives its **body text**
> `getBoundingClientRect().width ≥ 320` CSS px at 390 (LR1, page content column `A ≈ 358`), spending
> **≤ 32 px** of its surface root on chrome (LR2a). At 12px that width is above the **294.3 px**
> sufficiency threshold, so LR2b remains reachable for every 12px string whose length permits it —
> **except CC**, which cannot reach it anywhere.
>
> **Concretely: the page content column (358) qualifies; the calculator card interior (308), the
> field interior (258) and the regime option card (254) do not.** A remedy that moves a surface into
> a card is a remedy that fails LR1, and `spec.md` AC6 already ranks LR1 above R: *a surface that
> becomes reachable and drops below the floors fails AC6, and AC6 wins.* This gate confirms that
> ordering.

---

## 6. L5 — a short line above the fold plus the full text in the footer

**Permitted, on one condition, and **not needed**, so it is not authorised here.**

The condition first, because it is the whole ruling. A fragment placed above the fold discharges
nothing unless it is **itself** a member of the domain — that is, it satisfies `0006` §2.1 clause
(a), (b) or the new (d) **on its own text**. LR6.1 pairs a claim with *"the disclosure that qualifies
it"*; a teaser that drops the norm, the rate or the gap is not that disclosure, and pairing the claim
with it would satisfy the letter of a rule whose subject has been swapped. A fragment that *does*
carry the norm or the gap is not a "split" at all — it is a second surface, and the footer's full
text is untouched (`0008` §6 **O4**: one obligation discharged twice is not redundancy).

**And the split is unnecessary, which is why no string is mandated.** The measured sizes say so:

| Candidate whole surface | height | body `font-size` | LR2b at 390 today |
|---|---|---|---|
| **DS1 P4** — *Tabelas de INSS e IRRF de 2026, em vigor desde … · Portaria …* | **34.8** | 12px | binds; passes at DS1's measured 52.4–56.7 |
| **DS1 P1** — *Tudo o que você digita fica salvo apenas neste navegador…* | 52.2 | 12px | binds; passes |
| **DS1 P2** — *Os valores são uma estimativa … não substituem seu holerite…* | 52.2 | 12px | binds; passes |
| DS1 P3 — the gap list | 139.1 | 12px | binds; passes |

**A 34.8 px whole surface exists.** A remedy that relocates one of these whole satisfies R with
**zero new copy**, zero rewording and zero `0003` interaction. Naming their heights is a statement
about the size of the object, not about where it goes — the placement stays G3's.

> ### L5, settled
>
> **This gate mandates no string. `spec.md` AC5's exemption list from G2 is EMPTY, deliberately, and
> `plan.md` states it as empty so a reviewer can tell "nothing exempted" from "nobody looked".**
>
> A split is permitted only if the above-fold fragment is independently in the domain and clears
> LR1, LR2a, LR2b, LR3, **LR3.5** and LR6.1 in its own right; in that case it is a new disclosure
> string, it belongs to `content-writer` and `0003`, and it arrives through a **G1 amendment**, not
> through this gate's exemption list. Shortening an existing surface to fit remains forbidden —
> `spec.md` § Non-goals, `0008` §6 O2, lesson **002**.

---

## 7. L6 — does **R** become a binding LR clause? **Its clause 2 does. Its clauses 1 and 3 do not.**

`spec.md`'s **R** has three clauses, and they have three different owners. Ruling on R as a single
object would either inflate my veto over a product-positioning decision or leave the concealment
half unprotected.

| R clause | What it says | Legal? | Who can overrule it |
|---|---|---|---|
| **1** — the whole border box inside the first viewport at 390×844, on load, without scrolling | the fold | **No.** No norm places a disclosure in a viewport band. `0008` §5.2 already **struck** a fold clause as measured-vacuous and §5.4 set the precedent for calling a good criterion the product's bar rather than mine. The human opened this spec precisely because it is a positioning question. Attaching my veto would be manufacturing an obligation — the thing `0008` §5.2 refused to do. | `tech-lead`, on a measurement |
| **2** — no `fixed`/`sticky` border box intersects it | concealment | **Yes.** LR3 is already the concealment rule and its last bullet reaches *"otherwise positioned off-screen"* by substance. An opaque overlay is the same substance in the same quantity. It becomes **LR3.5** (§8). | **nobody but the human** |
| **3** — paired with a claim inside the first viewport in the same frame, per LR6.1 | co-presence, spatialised | **No, as written** — LR6.1 is a frame index and §8.3 explains why it must stay one. The pairing itself is already binding as LR6.1; adding *"in the first viewport"* to it would compare a value read one way to a threshold derived another (`AGENTS.md` §5). | `tech-lead` |

**So a regression in R clause 1 or 3 is a `tech-lead` bounce; a regression in R clause 2 is a G2
rejection.** That is the answer L6 asks for, and it is deliberately split rather than given whole,
because the two halves of R are not the same kind of claim.

---

## 8. L7, L9, and the clause this gate creates

### 8.1 — LR3.5, and why the hole is spatial and belongs to LR3

`spec.md` names it exactly: *"if LR6.1 has that hole, it is the third time a rule of yours was stated
on one axis and breached on another — LR3 on time, LR2 on rendered width, now this."* It is the third
time, and the pattern is worth naming before the clause: **a rule stated in the quantity where the
defect of the day lived, and silent in every other quantity the same substance can be breached in.**

LR3's four surviving bullets are all **presence** predicates — `display`, `visibility`, `opacity`,
`[hidden]`, `aria-expanded`, `.sr-only`. Every one asks *is this box painted at all*. None asks
*is something painted on top of it*. The substance — *the user is not shown a claim without its
qualification, and a disclosure they cannot read is a disclosure not made* — is the same in both, and
`0005` §3's own words for the last bullet are *"or otherwise positioned off-screen"*, which is
already a geometric predicate. **The hole is in LR3, the quantity is geometry, and the fix belongs
there.**

> ### LR3.5 — not concealed by chrome the user did not summon. **Binding.**
>
> **This is a fifth bullet of LR3-as-corrected (`0008` §4.1). LR3's four surviving bullets stand word
> for word; LR6.1 is unchanged.**
>
> For every disclosure surface the `0006` §2.1 test returns — clause (a), (b), (c) **or (d)** — with
> no user interaction beyond scrolling:
>
> > **there exists a scroll position, reachable in the document as rendered, at which the surface's
> > whole border box lies inside the viewport and no element whose computed `position` is `fixed` or
> > `sticky` has a border box that intersects it.**
>
> - **The quantity is `getBoundingClientRect()`, border box, on both elements** — the same quantity
>   LR1, LR2a, LR4.2 and LR4.4 read. One quantity across the rule set.
> - **Exempt: the surface itself and its own ancestors and descendants.** A `fixed` consent surface
>   does not conceal its own paragraph.
> - **Exempt: an element mounted in response to a user action that activates it** — a dialog, a
>   sheet, a menu the user opened — provided it is dismissible by a control that satisfies LR4.2.
>   The second-level privacy dialog is exempt under this clause; the consent **banner**, the header
>   and the route nav are **not**, because nothing the user did summoned them.
> - **It is existential over scroll positions, not universal.** A surface passing under fixed chrome
>   during a scroll is not a breach; a surface that can never come to rest clear of it is. Stating it
>   universally would forbid every fixed header in existence and would be a clause satisfiable only
>   by breaching `DESIGN.md` — the inversion `AGENTS.md` §5 says to name rather than narrow around.
> - **Measured at 390×844 and 1440×900, both themes, both routes, every storage state `spec.md`
>   AC1 defines.**
>
> **Worked measurement of the intended state**, `g2-occluded-disclosures-2.mjs`, 390×844, seeded,
> consent answered, taken **before this clause was written**. The unoccluded band is
> `[65, 766]` — below the fixed header, above the fixed route nav — **701 px**, and for each surface
> the scroll range that clears it:
>
> | Surface, `/` seeded | `docTop` | height | scroll range that clears the chrome | max scroll | passes |
> |---|---|---|---|---|---|
> | DS2 | 2402.8 | 52.2 | 1688.9 .. 2337.8 | 2490 | ✓ |
> | DS7 art. 59 | 2521.9 | 126.0 | 1881.9 .. 2456.9 | 2490 | ✓ |
> | DS7 art. 71 | 2705.9 | 42.0 | 1981.9 .. 2490 | 2490 | ✓ |
> | DS1 P1 | 2967.9 | 52.2 | 2254.1 .. 2490 | 2490 | ✓ |
> | DS1 P2 | 3028.1 | 52.2 | 2314.3 .. 2490 | 2490 | ✓ |
> | DS1 P3 | 3088.3 | 139.1 | 2461.4 .. 2490 | 2490 | ✓ |
> | **DS1 P4** | **3235.4** | **34.8** | **2504.2 .. 2490 — empty** | **2490** | **✗** |
>
> Identical in light. On `/custo-da-hora`: P1 ✓, P2 ✓, P3 ✓, **P4 ✗ (needs 1228.6, max 1215)**, both
> themes. DS2 and DS7 do not render on `/custo-da-hora` — they belong to the journey view, which
> matches `0008` §1.4, and that is a property of the route, not a gap in the instrument.
>
> **Six of seven surfaces pass; DS1 P4 fails in 4 of 4 cells.** A clause with a live failing subject
> on the day it is written has been seen red. §12 **F1**.
>
> **How LR3.5 fails, stated so the guard cannot be vacuous.** The input that makes it fail is
> DS1 P4 today: paste the empty range and the two numbers whose subtraction produced it. A guard
> asserting LR3.5 must first assert **the size of the set it iterates** against the expected surface
> count for that cell — **seven on `/` seeded, four on `/custo-da-hora`** — because a selector that
> matches nothing and a clean sweep print the same thing (`AGENTS.md` §5).

### 8.2 — L7, settled

**Yes: a disclosure intersected by the fixed header or the fixed route nav is concealed**, under
LR3.5. `spec.md`'s **R clause 2** forbids it as a product rule; **the law forbids it too**, which is
the part L7 asked for, and which changes who may overrule it: **nobody but the human.** The proof is
not hypothetical — the fixed route nav conceals **DS1 P4**, the citation line that carries
`PRODUCT.md` §4's *"the year is part of the answer"*, in both routes and both themes, at every scroll
position the document allows.

### 8.3 — L9, settled: covering a **claim** engages neither, and that is not a licence

**LR6.1 does not get a spatial clause, and covering a claim is not, today, a legal failure.** Both
halves need saying, and the second half needs a caveat that is the real output of this ruling.

**Why not LR6.1.** Its quantity is `Math.round(performance.now())` at an animation frame, and its
clause is a subtraction of two frame indices. Occlusion changes neither operand: a covered claim and
a covered disclosure have exactly the frame indices they had uncovered. Bolting a geometric predicate
onto a temporal clause is the defect `AGENTS.md` §5 names — *never let a criterion compare a value
read one way to a threshold derived another way* — and it would make LR6.1's negative control
meaningless. **LR6.1 stands word for word.**

**Why not LR3 either, today.** LR3 and LR3.5 bind **disclosure surfaces**. The rows finding O
measures are not disclosure surfaces, and I checked each one against all four clauses of the test
rather than asserting it:

| Covered row | (a) | (b) | (c) | (d) | Ruling |
|---|---|---|---|---|---|
| *17:48*, *R$ 4.200,00*, *R$ 0,00*, *+R$ 0,00* | states a number **it computed** — but it is the **claim**, the thing a disclosure qualifies, not a disclosure | no | no | no | **claim, not disclosure** |
| *é quando sua jornada fecha*, *Entrada às 08:00*, *Resumo Financeiro*, *Bruto*, *Ganhos Extras* | no norm, no rate | no | no | no | **label** |
| *Faltam 8h 56m…*, *Visualizar o valor por período* | — | — | — | — | **assistive-only, §10** |

**Zero disclosure surfaces are occluded on the first screen — for the reason that makes this spec
exist: none of them is on the first screen at all.** So **finding O, as it stands today, is a
`PRODUCT.md` §1 and §8 defect and not a legal one**, and the human has already ruled §8 covers the
banner, which is what decides it. My veto does not attach to O today, and saying so keeps the veto
worth having (`0006` §2.4).

> **The caveat, and it is the operative half.** R and O compete for the same pixels — `spec.md`
> § The shared pixel budget says so and §4.5 measures it. **The moment R's remedy puts a disclosure
> into the band the fixed chrome covers, that disclosure is occluded and LR3.5 binds.** A remedy that
> satisfies AC1 by placing a surface between 354 and 820 on a cold load has turned a product defect
> into a legal one. **LR3.5 exists before G3 draws anything precisely so that it is a constraint on
> the design rather than a discovery at G6.**
>
> And `spec.md` § Disclosure obligations 5 is **upheld**: a claim the user cannot see is a claim the
> app has not made; **O is discharged by uncovering the claim, never by dropping the claim's
> disclosure along with it.** LR6.1 keeps every pair owed.

---

## 9. L8 — the legal figures on both routes, unchanged by a positioning-only change

**`lib/legal-tables.ts` is not re-verified here** (§0). What L8 asks is different and narrower:
that a change which moves boxes does not delete, reorder, conditionally mount or collapse a number
away from the citation that backs it. That is `0008` §7 **V8**, and this gate adopts it unchanged.

**How it is discharged, and the discharge is an instruction, not an assertion:**

1. **AC4's `diff`** — `evidence/g1-text.mjs` re-run against the head, 16 cells, diffed against
   `evidence/g1-text.txt`. A non-empty numeric diff is a rejection. The baseline contains
   `R$ 17,31`, `R$ 3.807,40`, `50%`, `220`, `art. 59`, `Súmula 60`, `Súmula 431` among others.
2. **The traceability audit at G6** — every user-visible number on both routes, in every cell, traced
   to the table in `lib/` that cites its norm. Not a re-derivation of the tables; a check that the
   remedy did not separate a number from its citation.
3. **DS1 P4 is the citation line**, and §12 **F1** is a finding that it is currently unreadable at
   rest. L8 and F1 are the same obligation seen from two sides: a citation the user cannot bring into
   view is a citation the app has not made.

**And the sweep found one number that fails the audit today**, which is what a verification is for:
**`Extra 100%`**, rendered at `components/organisms/day-summary.tsx:203` from
`DEFAULT_EXTRA_TIER_RATE = 100` at `hooks/use-work-calculator.ts:14`. It traces to **no table in
`lib/` and to no norm** — §2 R6 read CLT art. 59 caput and §§ 1º–6º and CF art. 7º XVI, and none of
them doubles the rate after the second hour. **CB says so in the app's own words**, and CB is absent
from the DOM. §12 **F4**.

---

## 10. L10 — the assistive-only rows

Both are `.sr-only`, and I read the module each renders from rather than the box:

| Row | Source | What it is |
|---|---|---|
| *Faltam 8h 56m para o fim da jornada* | `components/organisms/work-calculator.tsx:77`, rendered at `:234` into `<p className="sr-only" aria-live="polite" aria-atomic="true">` | the **assistive rendering of the claim** whose visual rendering is the progress ring at `:229-232`, which is `aria-hidden="true"` |
| *Visualizar o valor por período* | `components/molecules/period-selector.tsx:11`, `<legend className="sr-only">` | the accessible name of a control group — UI state, not a claim |

> ### L10, settled — three rulings, and they do not all point the same way
>
> **1. An `.sr-only` string is never a disclosure surface.** LR3's fourth bullet says it in terms:
> *"not `.sr-only` or otherwise positioned off-screen"*. A string that can never satisfy LR3 can never
> discharge an obligation, and `0005` §3's reason is the right one — *a disclosure only a screen
> reader can apprehend is a disclosure made to some users and not to others*; `PRODUCT.md` §4's
> promise is not satisfied per-modality. Neither row is in any LR domain.
>
> **2. Occlusion is meaningless for them, and the consequence cuts the other way from the intuition.**
> Paint order does not reach the accessibility tree. A `fixed` banner over an `sr-only` box conceals
> it from nobody. So on `/`, the **sighted** user loses *17:48* — the answer they came for — and the
> screen-reader user does not: `Faltam 8h 56m para o fim da jornada` is announced regardless. Finding
> O's harm is **modality-specific**, and that is sharper than "four rows covered".
>
> **3. The `product-manager` is right to count them, for a different reason than the one given.**
> The stated reason — *a box the instrument skips because it is 1 px today is a box it gets wrong the
> day it is 20* — is good. The binding one is stronger: `AGENTS.md` §5 requires that **the set be
> derived from the obligation, never from an appearance attribute.** A selector that drops boxes under
> N px narrows the domain by appearance, which is invisible from every artifact downstream and is true
> the day it is written, not the day the box grows. **Keep the universal quantifier; add the split.**

**And the split is what §11 needs**: report `linesOccluded` as `sighted + assistive`, so
`measured + exempt = expected` is checkable per cell. On the G1 baseline that is **`/`: 3 sighted +
1 assistive = 4 of 8**, and **`/custo-da-hora`: 5 sighted + 1 assistive = 6 of 9** (and **4 + 1 = 5
of 9** in `monthlyHours=0`). **AC13's sixteen zeroes are unaffected** — the assistive rows sit inside
the answer panel with the sighted ones, so uncovering one uncovers the other.

---

## 11. The AC13 correction — the criterion cannot fail as written

`AGENTS.md` §5, *How an instrument's reading is trusted*, binds me at the point of the verdict: before
any `pass` cites a guard, open its **source** and answer what it prints against an empty collection.
AC13's instrument is `evidence/g1-occlusion.mjs`, and I opened it.

```js
const lines = [...host.querySelectorAll("*")]
  .filter((e) => e.children.length === 0 && (e.textContent || "").trim())
  …
  .filter((l) => l.top < innerHeight && l.bottom > 0);
…
linesOnFirstScreen: lines.length,
linesOccluded: lines.filter((l) => l.over.length).length,
```

| Question | Answer |
|---|---|
| What does its selector match on the markup as it stands? | leaf elements with text inside the answer panel, clipped to the first viewport — 8 on `/`, 9 on `/custo-da-hora`, measured |
| What would it print against an **empty** collection? | `linesOnFirstScreen: 0, linesOccluded: 0` |
| What would it print if **every** member were exempt? | `linesOccluded: 0` |

Two of the three answers are identical, so **`linesOccluded === 0` does not discriminate.** AC13's
deciding clause — *"Sixteen zeroes, or it is a fail"* — is satisfied by a run in which the answer
panel rendered nothing, by an anchor that stopped matching after a rename, and by a `host` climb that
terminated one element too early. AC13 already requires the `lines` array to be pasted, which is how a
reader could *notice*; it is not what the criterion *decides on*.

This is not the test author's craft concern for `qa-engineer` to raise politely. It is this gate's
own correctness: **a guard that can report a pass while measuring zero instances of the rule's subject
is not evidence, and a gate signing against it has signed nothing.**

> ### Binding correction to `spec.md` **AC13**, and to any guard that implements it
>
> AC13 passes in a cell only when **all three** hold, per cell, pasted:
>
> 1. `linesOnFirstScreen` **equals** the expected count for that cell — **8** on `/`, **9** on
>    `/custo-da-hora` with a period control, **9** in `monthlyHours=0` — from the G1 baseline, and a
>    disagreement **corrects the baseline at the gate that found it**, never the assertion;
> 2. the count is reported **split** as `sighted + assistive` (§10), so `measured + exempt = expected`
>    is checkable;
> 3. `linesOccluded === 0`.
>
> **Zero is never a pass.** The same applies to any guard asserting **LR3.5**: assert the surface
> count first — seven on `/` seeded, four on `/custo-da-hora` — then the clause.
>
> **This is an instruction to `tech-lead`, who owns the criterion. I do not edit `spec.md`.**

---

## 12. Findings — routed, never patched

Reviewing agents never edit source files (`AGENTS.md` §4 rule 5). Each of these is an instruction to
`tech-lead`, with a **trigger, never a date** (`AGENTS.md` §5).

| # | Severity | Where | What the code does | What the norm or rule requires | Disposition |
|---|---|---|---|---|---|
| **F1** | **serious** | `components/organisms/calculator-views.tsx:85-98` (DS1 P4) against the fixed route nav | At maximum scroll, DS1 P4's box rests at **745.2..780.0** on `/` and **744.8..779.6** on `/custo-da-hora`, under a nav at **766..828**. The scroll needed to clear it is **2504.2** against a max of **2490** (`/`, short by 14.2) and **1228.6** against **1215** (`/custo-da-hora`, short by 13.6). 4 of 4 cells, both themes. | **LR3.5** (§8.1). And `PRODUCT.md` §4: DS1 P4 is the line that names the table and the year. | **In this spec's domain** — the team lead's own boundary gives `0010` *occluded height under fixed chrome*, and this is exactly that. The remedy is flow height **below the footer**, which is **not** `0008`'s budget (that is height **above `#salario-bruto`**) and spends none of it. If G3/G4 cannot take it, `tech-lead` routes it with an owner and the trigger: **the first spec that opens `calculator-views.tsx`'s footer or `app-header.tsx`'s route nav.** |
| **F2a** | **serious** | `components/organisms/cookie-consent.tsx:15` — `useState(true)` | The telemetry switch opens **pre-enabled**. A user who taps *Configurar* then *Salvar Preferências* without touching it is recorded as having consented to Google Analytics. | LGPD art. 5º XII — consent is *inequívoca*; art. 8º § 4º — a generic authorisation is **null**. ANPD, avoid list: *"Apresentar cookies não necessários ativados por padrão, exigindo a desativação manual"*; observe list: *"Desativar cookies baseados no consentimento por padrão"*. | **Out of this spec's scope** — `spec.md` § Out of scope 7 reserves what the surface asks and stores. Routed to `tech-lead` → **a consent spec**. Trigger: **the first spec that opens `cookie-consent.tsx`** — which this one may. If a task here touches that file, F2a becomes a precondition. |
| **F2b** | **moderate** | `components/organisms/cookie-consent.tsx:47` — `p-6` on the banner's inner row | DS4 spends **50 px** of its 342 px root on horizontal chrome against LR2a's **32 px** budget. Fails by 18. | **LR2a** (`0006` §3.2), declared binding *"on every disclosure surface, including … DS4"* and **never measured on DS4** until now. | In scope **if** the remedy touches the banner's box: fixing it is worth 18 px of height (§4.3 step B) and costs nothing. Otherwise routed with the trigger **the first spec that opens `cookie-consent.tsx`**. The same 50 px overspend affects CA, CB and CC (§3.3) and travels with F4. |
| **F3** | **serious** | the whole application — one `grep` returns one file | No cookie policy, no privacy page, and no link from either consent surface to the art. 9º I–VII information. **Five of seven units are unaddressed anywhere.** | LGPD art. 9º caput and **§ 1º** — consent is **null** where the information was not presented previously, clearly and unequivocally. ANPD: *"Fornecer um link de fácil acesso para que o titular possa exercer os seus direitos"*. | **Out of this spec's scope**, and **it raises the floor rather than lowering it** — LR4.4 clause 4 requires the link, measured at **+28 px** (§4.4, C→D). Routed to `tech-lead` → the same consent spec as F2a, and raised to the human in §16 **Q1**, because it is a nullity question and not a layout one. |
| **F4** | **serious** | `hooks/use-work-calculator.ts:13-14`; rendered at `components/organisms/day-summary.tsx:193` and `:203` | `DEFAULT_FIRST_TIER_RATE = 50` and `DEFAULT_EXTRA_TIER_RATE = 100`, rendered as **`Extra 50%`** and **`Extra 100%`**. The 100 traces to **no norm and no table**; the 50 traces to CF art. 7º XVI and CLT art. 59 § 1º but lives in a **hook**, uncited. The only strings that qualify them — **CA** and **CB** — are `ABSENT FROM DOM` on load while both claims render (§3.4). | `AGENTS.md` §8 — *business rules live in `lib/`*, *every legal constant carries its source*; §9 — *every user-visible number is traceable to a table in `lib/` that cites its norm*. `PRODUCT.md` §4 — *cite or omit*, *name the gap*. **LR3.5 is not what this breaches; LR3-as-corrected and LR6.1 are** (§3.4). | **Out of this spec's remedy**: `spec.md` § Non-goals forbids a reveal control and any new string, and rendering CA/CB unconditionally spends `0008`'s flow budget (AC15). Routed to `tech-lead` → **a new spec**, with the trigger **the first spec that opens `hooks/use-work-calculator.ts`, `journey-form.tsx`'s settings panel, or `day-summary.tsx`'s rate rows**. Raised to the human in §16 **Q2**, because `PRODUCT.md` §6 calls 50/100 *"the statutory floor"* and CB says the 100 is not one. |

**F1 is the only one this spec can and should absorb.** F2a, F2b, F3 and F4 are pre-existing, and
none of them is caused, worsened or touched by a positioning change. Rejecting this gate over them
would bounce a spec that cannot fix them and would delay the one remedy that is in reach.

---

## 13. Tables

**None.** This gate defines no bracket, rate, ceiling or parcela a deduzir, and changes none. The
tables in force are settled at `0002` G2 and re-verified at `0005` G6/G9, `0006` G6, `0008` G2 and
`0009`; **`0002`'s `legal.md` remains the rebuild contract for `lib/legal-tables.ts`** and no part of
it is superseded here.

Stated rather than omitted, so a reader can tell *nothing applies* from *nobody looked*.

## 14. Order of operations · Rounding

| Section | Why empty |
|---|---|
| **Order of operations** | No deduction, no base and no sequence is introduced or reordered. `lib/payroll.ts` is untouched. |
| **Rounding** | No monetary or duration quantity is computed. Every number this gate sets is **geometric**, and each names its quantity and box model in the clause that uses it: `getBoundingClientRect()`, **border box**, CSS px, at 390×844 — LR3.5, LR4.2, LR4.4, §5.2's width floors. **One quantity across the whole rule set**, which is the same quantity LR1 and LR2a already read. Character counts are `textContent.trim().length`; line boxes are a `Range` over the element's text content, `getClientRects()` deduplicated by rounded `top` (`0005` §3). Geometric values are reported to **one decimal place**, which is the precision the measurements were taken at and the precision every number in this document carries. |

## 15. Disclaimers the app must show

**None new.** This change computes nothing and names no new gap, so `spec.md` § Disclosure
obligations 1 is upheld: *the whole obligation is that the gaps already named stay named, in the same
words* — AC4 and AC5.

The four standing obligations are re-affirmed, with what this gate adds to each:

| `spec.md` obligation | Ruling |
|---|---|
| 2 — reachability must not be bought by saying less | **Upheld.** §6: no split is authorised, AC5's exemption list from G2 is **empty**, and a 34.8 px whole surface exists so none is needed. |
| 3 — a disclosure moved out of the footer is not removed from the other route | **Upheld, unchanged** — `0008` §6 **O4**. |
| 4 — if a surface becomes reachable only in some storage states, `design.md` says which | **Upheld**, and sharpened by §11: the states where it does not is a **count** in the G6 report, measured against an expected count, never a silence. |
| 5 — a claim the user cannot see is a claim the app has not made | **Upheld** (§8.3). O is discharged by uncovering the claim, never by dropping its disclosure. Whether it is *also* a legal obligation: **not today**, and **yes the moment a disclosure enters the covered band** — LR3.5. |

## 16. Open questions for the human

| # | Question | Why it is the human's and not mine |
|---|---|---|
| **Q1** | **The app has no cookie policy and no privacy page** (§4.1, §12 F3). Five of art. 9º's seven information units are not presented anywhere, and art. 9º § 1º makes consent obtained without them **null**. This is not a layout question and no remedy in this spec reaches it. | It needs a page that does not exist and content nobody has written; the decision is what the product commits to publishing and maintaining, which is `PRODUCT.md`'s and the human's. `PRODUCT.md` §7 forbids a *convenção coletiva* database for maintainability reasons — the same test applies here and only the human can apply it. |
| **Q2** | **`Extra 100%` is a default the app renders and no norm supports** (§12 F4), and **`PRODUCT.md` §6 calls 50/100 "the statutory floor"**, which CB — the app's own string, currently unreadable — denies. Changing the default changes a number on someone's screen; leaving it means the app renders an unsourced rate with its qualification behind a tap. | It is a `PRODUCT.md` §6 and §9 reading, and `PRODUCT.md` outranks any spec. Deciding it here would be amending §6 by inference to resolve a defect this gate found. |
| **Q3** | **The consent surface may legally leave the first screen** (§4.6) — nothing is processed before consent, so validity is unaffected. What that does to consent rate and to AdSense revenue is a number **nobody in this pipeline has**, and `spec.md` § Out of scope 9 forbids assuming it in either direction. §4.5 proves the alternative — shrinking it where it is — **cannot** satisfy AC13 at any valid size. | The legal permission is mine and it is granted. The trade is `PRODUCT.md` §8 and the human's, and the human has already ruled §8 covers the banner, which is the input G3 needs. |
| **Q4** | **The `0008` §8 Q3 residual is unchanged**: the CLT art. 66 warning was never reached by a seeded run. It was **reached here** — `g2-occluded-disclosures-2.txt` renders DS7's art. 59 and art. 71 warnings and measures both — but art. 66 still was not, and I did not substitute arithmetic for the reading. | Carried, not raised by me. It is `qa-engineer`'s at G6 and it does not block this gate. |

## 17. Known imprecisions

| Imprecision | Impact on the number | Accepted by | When |
|---|---|---|---|

**Empty. This gate accepts no legal imprecision and none is proposed.** The four findings in §12 are
**defects**, not accepted imprecisions: each is routed with an owner and a trigger, and F3 and F4 are
put to the human in §16 rather than absorbed.

## 18. What I will verify at G6 and G9

So `tech-lead` can plan for it and `qa-engineer` can share the instrument rather than build a second.
`0008` §7's V1–V8 stand; these are added.

| # | At G6, against the built code | At G9, against the deployed preview |
|---|---|---|
| **W1** | **LR3.5** on every surface the `0006` §2.1 test returns — clauses (a), (b), (c), **(d)** — in every AC1 cell, with the **surface count asserted before the clause** and the scroll range pasted per surface | the same, both themes |
| **W2** | **F1 discharged or routed**: DS1 P4's clearing range non-empty on both routes, or `plan.md` carrying it forward with an owner and a trigger | read off the real page, both themes |
| **W3** | **LR4.4** on the consent surface: the five clauses, the measured `height ≥ 336`, and `area(reject) ≥ area(accept)` | the same |
| **W4** | **LR4.2** on every consent control at both levels, both viewports, both themes | the same |
| **W5** | **AC13 as corrected** (§11): `linesOnFirstScreen` against its expected count, split `sighted + assistive`, then `linesOccluded === 0` | the same |
| **W6** | **AC5's exemption list is empty** and the disclosure `diff` is empty (§6) | read the rendered text off both routes in both themes |
| **W7** | **CA–CE unchanged**, and F4 still routed rather than quietly altered | the same |
| **W8** | **Every user-visible number still traces to a table in `lib/` that cites its norm** — `0008` §7 V8, unchanged. **This one can reject on its own.** | the same, read off the real page |

---

## 19. Verdict

**`pass`.**

L1–L10 are settled, every one by name. The gate adds **one** clause, **LR3.5**, and it adds it
because the sweep found a surface it fails on — DS1 P4, in 4 of 4 cells, at every scroll position the
document allows. It restates **LR4** clause 2 as **LR4.2** because that clause's substance was always
general and its text named one surface. It states **LR4.4**, and the floor it states is **336 px**,
built in a browser and measured before it was written down.

What this gate hands G3 is one arithmetic fact and one permission. The fact: **no bottom-anchored
fixed consent surface can satisfy AC13 at 390 at any legally valid size** — the ceiling AC13 sets is
125.9 px on `/` and 277.0 px on `/custo-da-hora`, and the floor the law sets is 336. The permission:
**the consent surface may leave the first screen**, because nothing is processed before consent is
given. Between them, the remedy space is narrower and clearer than it was, and neither is a placement.

**What this gate did not do**, so nobody looks for it: it set no position, mandated no string,
re-verified no table, and attached no veto to the fold. **AC5's exemption list from G2 is empty.**

**Next: `product-designer` (G3) and `content-writer` (G3), in parallel.** Both are bound by §4 (the
consent floor and §4.5's arithmetic), §5 (L4's width floors), §6 (no split, no new string), §8
(LR3.5, before anything is drawn) and §11 (AC13 as corrected). `content-writer` should read §6 first,
because its whole content is *do not write anything*.

---

# Addendum A — run 2 of G2, 2026-09-19

**Verdict: `pass`.** Two rulings, both requested by `tech-lead` after `product-designer` closed G3.
**Neither excludes any of the four movements.** M-O, M-R, M-B and M-D stand as written, and
`design.md`'s 32-cell measurement **stands under the reading this addendum confirms** — it does not
have to be re-taken.

This is an **addendum to a closed gate**, not a re-run and not a bounce. It settles: (A1) the
quantifier conflict between **LR4.2** and **§4.6**; (A2) **F2a**, the telemetry switch's initial
value, now a precondition because `design.md` M-O opens `components/organisms/cookie-consent.tsx`.
It also carries **three corrections to this file's own earlier rulings**, made inline at the gate
that found them, because a verdict can be right for the wrong reason and the reason is what travels.

## A0 — Sources re-fetched in this session

Nothing below rests on a number carried forward from run 1 or from a sibling spec's prose. The two
primary texts were fetched and read in this session, and the operative units are transcribed
verbatim where they decide something.

| Source | What was read | URL |
|---|---|---|
| **LGPD, Lei nº 13.709/2018**, in force since 2020-09-18 (arts. 52–54 since 2021-08-01) | art. 5º XII; art. 7º caput and I; art. 8º caput and §§ 1º–6º; art. 9º caput, I–VII and §§ 1º–3º; art. 18 caput and I–IX | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm |
| **ANPD, *Guia Orientativo — Cookies e Proteção de Dados Pessoais***, out/2022 | *O que observar*, first- and second-level banners (pp. 31–32); *O que evitar na elaboração de banners de cookies* (p. 33) | https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf/@@display-file/file |

Verbatim, the four units this addendum turns on:

> **art. 5º XII** — *"consentimento: manifestação **livre, informada e inequívoca** pela qual o titular
> concorda com o tratamento de seus dados pessoais para uma **finalidade determinada**;"*
>
> **art. 8º caput** — *"O consentimento previsto no inciso I do art. 7º desta Lei deverá ser fornecido
> por escrito ou por **outro meio que demonstre a manifestação de vontade do titular**."*
>
> **art. 8º § 2º** — *"Cabe ao controlador o **ônus da prova** de que o consentimento foi obtido em
> conformidade com o disposto nesta Lei."*
>
> **art. 8º § 3º** — *"É **vedado** o tratamento de dados pessoais mediante **vício de consentimento**."*

And from the ANPD guide, p. 33, *o que evitar*, verbatim:

> *"Apresentar cookies não necessários **ativados por padrão**, exigindo a desativação manual pelo
> titular;"*

and p. 32, *o que observar*, second-level banners, verbatim:

> *"**Desativar cookies baseados no consentimento por padrão**."*

---

## A1 — The LR4.2 / §4.6 conflict. **The existential reading is correct.**

### A1.1 — The conflict is real, and it is mine

`design.md` § 14 states it accurately and did not soften it. **LR4.2** (§4.7) requires every control
expressing a choice to be *"fully within the viewport … at 390×844 and 1440×900"*. **§4.6** rules
that *"the consent surface may render below the first screen, or in document flow, without any loss
of validity"*. Read universally over scroll positions, those two sentences of one document cannot
both hold of one in-flow surface. The defect is in **my text**, not in the design.

**Why it was never exercised before.** Run 1 measured LR4.2 against a `position: fixed` banner and a
`position: fixed` dialog. For a fixed box the two readings are **indistinguishable** — it is in the
viewport at every scroll position or at none — so every measurement run 1 took passes under both
quantifiers and none of them discriminates. The ambiguity is not a latent defect earlier gates
missed; it is **created by the first remedy that takes the surface out of the overlay model**, which
is M-O. Stating that is the difference between a rule that was wrong and a rule that was untested.

### A1.2 — The universal reading, executed against a known-good state, and it fails

`AGENTS.md` §5 and lesson **040**: run the criterion against a state you consider correct before
accepting it. Three states, the universal reading applied to each:

| State | Universal reading's verdict | Is that verdict correct? |
|---|---|---|
| The **shipped** fixed banner at 390 | pass | yes, but vacuously — it cannot fail |
| The **shipped** second-level dialog at 390, controls `44×44`, `44×44`, `292×56`, all `inViewport: true` (§4.7) | pass | yes, vacuously — `ModalDialog` is `fixed` |
| **Any** second-level dialog at a viewport shorter than its own content — e.g. a phone in landscape at 844×390, where a 358-wide dialog carrying two labelled rows and *Salvar Preferências* exceeds 390 px of height and must scroll internally | **fail** | **no.** LR4 clause 3 then fires — *"if a granular consent surface cannot satisfy clauses 1 and 2, it must not be offered"* — and the honest fallback is a first level with no *Configurar*, which the ANPD guide's p. 33 names twice: *"Utilizar um único botão no banner de primeiro nível, sem opção de gerenciamento"* and *"Não disponibilizar banner de segundo nível"*. |

**The third row is the disqualifying one, and it is the `AGENTS.md` §5 inversion by name:** a clause
that can only be satisfied by breaching another binding principle is **the clause** that is wrong. It
is corrected to express what it was reaching for, never by narrowing the domain back to the members
that happened to pass. The universal reading makes LR4.2 unsatisfiable by any scrolling container at
any viewport where content exceeds the viewport, which is the ordinary condition of this application.

### A1.3 — And the rule set already answered it, in the same quantity

**LR3.5** (§8.1) reads **the same quantity** — `getBoundingClientRect()`, border box — about **the
same predicate** — is this box inside the viewport — and its own text settles the quantifier:

> *"It is existential over scroll positions, not universal. A surface passing under fixed chrome
> during a scroll is not a breach; a surface that can never come to rest clear of it is. Stating it
> universally would forbid every fixed header in existence …"*

`AGENTS.md` §5, *How an instrument's reading is trusted*: **never let a criterion compare a value
read one way to a threshold derived another way. One quantity across a whole rule set; a sibling
clause that reads it differently says in its own text why and what that buys.** LR4.2 says nothing
about why it would differ, because its author never noticed it was choosing. Two clauses of one rule
set, one quantity, two quantifiers, is the defect — and the quantifier that survives is the one that
was argued for in writing.

### A1.4 — But "some scroll position" is too weak on its own, and that is the real output

Confirming the quantifier does not finish the ruling. The substance of LR4.2 is one sentence:

> **the user can see, compare and operate every control that expresses this consent decision.**

Per lesson **048** — promoted into `.agents/agents/labor-law-analyst.md` on 2026-09-19 and
archived under its own number, so it is cited by number and read in its promoted form — the
quantifier alone leaves three axes open, and a bare `∃ scroll position` is
false-passable in each. Each is closed below, and each has a **failing subject measured in this
spec**, so none is decoration.

- **Attainability.** `∃ scroll position` must mean *reachable in the document as rendered*, not
  *arithmetically implied*. Failing subject, measured by `design.md` §2 M-B: without M-B, in the
  consent-answered state, DS1 P3 needs `scrollY` **2529.6** against a max of **2516** on `/` and
  **1162.8** against **1149** on `/custo-da-hora`. A consent surface as the last block of a document
  whose bottom reserve (64) is smaller than the fixed tab bar's band (78) is **that same failure
  applied to a consent surface**, and its consequence is worse than a stranded citation line: it is
  the ANPD's *"Impossibilitar ou dificultar a rejeição de todos os cookies não necessários"* (p. 33)
  produced by geometry. **M-B is therefore not only F1's remedy; it is a precondition of M-O.**
- **Simultaneity.** LR4.2 and LR3.5 are both existential, and `(∃x. A) ∧ (∃x. B)` is **not**
  `∃x. (A ∧ B)`. A surface clear of the fixed chrome at one scroll position whose controls are fully
  in the viewport only at another is a surface that is never both, and no user ever sees a usable
  choice. Neither instrument asserts this today: `g3-lr42.mjs` computes `inViewport` as
  `r.top >= 0 && r.bottom <= innerHeight && …` with **no occlusion term at all**, and `g3-sweep.mjs`
  computes occlusion with no control term.
- **Co-visibility of the binary choice.** **LR4.4 clause 2** is a *comparison* —
  `area(reject) ≥ area(accept)` — and the ANPD's p. 33 item is comparative in terms: *"conferir maior
  destaque **apenas** ao botão de aceite"*. A comparison between two controls the user can never hold
  in one frame is not a comparison the user can make, and art. 5º XII's *livre* is a property of the
  moment of decision. At 390 this is trivially satisfiable — the surface is 466 px in an 844 px
  viewport — so the clause costs nothing; it is written so that a later compaction cannot spend it.

### A1.5 — Executed against `design.md`'s own numbers, re-derived rather than quoted

`AGENTS.md` §5: an instrument's output is a claim about the instrument until the quantity is
re-derived. `g3-lr42.mjs` never computes an intersection, so its `inViewport: true` is **not**
evidence about occlusion. I derived the intersection myself from the two artifacts' measured boxes.

**Fixed chrome at 390 under M-O**, from `evidence/g3-v4.txt` (`fixedChrome`, all 16 cells identical):
`header 0..65`, `nav 766..828`, `button 784..828` (the now-unconditional privacy shield). Three
boxes, `fixedSum: 171`.

**The surface and its controls at 390**, from `evidence/g3-lr42.txt`, both themes, byte-identical,
all at **one and the same `scrollY: 2512`**:

| Box | top..bottom | vs `header 0..65` | vs `nav 766..828` | vs `shield 784..828` |
|---|---|---|---|---|
| surface root | **282.0 .. 748.0** | clear by **217.0** | clear by **18.0** | clear by **36.0** |
| *Configurar* | 559.0 .. 603.0 | clear | clear by 163.0 | clear |
| *Recusar* | 615.0 .. 663.0 | clear | clear by 103.0 | clear |
| *Aceitar Tudo* | 675.0 .. 723.0 | clear | clear by **43.0** | clear |

> **At 390×844, in both themes, there exists one scroll position — 2512 — at which the whole consent
> surface is inside the viewport, intersected by none of the three fixed boxes, and all three of its
> controls are simultaneously inside the viewport, inside the surface, and unclipped.** Simultaneity
> and co-visibility both hold, at one position, and the tightest margin is **18.0 px**.

**At 1440×900**, same file, `scrollY: 808`, surface `641.3 .. 804.3`; the tab bar's top at 1440 is
**806** (`design.md` §6). Clearance is **1.7 px**. The controls clear it by 57.2. The clause passes —
and **1.7 px is a margin, not a result**, which is why A1.7 makes the 1440 cell a sweep at G6 rather
than the single probe it is today.

### A1.6 — The ruling

> ### LR4.2a — restated, superseding LR4.2 (§4.7). **Binding, on every consent surface at every level.**
>
> **This supersedes LR4.2's text. LR4.2's substance is unchanged; only its quantifier and its two
> missing axes are.** LR4.4, LR3.5, LR3 and LR6.1 are untouched.
>
> For every surface in LR4.4's domain and for every second-level surface it leads to, at **390×844**
> and **1440×900**, in **both themes**:
>
> **There exists a single scroll position, reachable by the document's own scrolling as rendered, at
> which all of the following hold at once:**
>
> 1. **every** control that expresses or revises a choice in that surface — each toggle, *Salvar*,
>    *Recusar*, *Aceitar Tudo*, the second-level entry point and the close control — has its whole
>    border box inside the viewport and inside the bounds of the surface that contains it;
> 2. each of those controls has its accessible label rendered and unclipped,
>    `scrollWidth <= ceil(getBoundingClientRect().width)`;
> 3. no element whose computed `position` is `fixed` or `sticky` — excepting the surface's own
>    ancestors and descendants, per LR3.5's exemptions — has a border box intersecting the surface's
>    border box **or** any of those controls' border boxes;
> 4. the controls expressing the **binary choice** (accept and reject) are inside the viewport in the
>    **same** frame, so that LR4.4 clause 2's comparison is one the user can actually make.
>
> **One quantity across the whole clause**: `getBoundingClientRect()`, **border box**, CSS px — the
> same quantity LR1, LR2a, LR3.5 and LR4.4 read.
>
> **The quantifier is existential over scroll positions and universal over controls**, and the
> difference is load-bearing: one position must serve all of them. `(∃x. A) ∧ (∃x. B)` is not
> `∃x. (A ∧ B)`, and it is the second that is required.
>
> **Worked measurement of the state I consider correct**, taken from `evidence/g3-lr42.txt` and
> `evidence/g3-v4.txt` and re-derived in A1.5, not quoted: **390×844, `scrollY` 2512, both themes** —
> surface `282.0..748.0`, controls `559.0..603.0`, `615.0..663.0`, `675.0..723.0`, fixed boxes
> `0..65`, `766..828`, `784..828`, **zero intersections**, tightest clearance **18.0 px**,
> `area(Recusar) = area(Aceitar Tudo) = 15 936 px²`, all labels unclipped. **Where this prose and
> that measurement disagree, the measurement wins.**
>
> **How it fails, so no guard implementing it can be vacuous.** The input that makes it red is the
> pre-M-B state: a consent surface as the last block with a 64 px bottom reserve against a 78 px tab
> bar band — the same arithmetic that produced `scrollY` 2529.6 of 2516 for DS1 P3 in
> `evidence/g3-wide.txt`. A guard **asserts the control count before the predicates**: **3** at the
> first level (*Configurar*, *Recusar*, *Aceitar Tudo*) and **3** at the second (close, telemetry
> switch, *Salvar Preferências*) — **6 in total per viewport per theme** — because a selector that
> matches nothing and a clean sweep print the same thing (`AGENTS.md` §5).

**§4.6 stands, and A1 is what makes it coherent with LR4.2a**: the consent surface may render below
the first screen and in document flow, and the controls it carries are nonetheless reachable,
comparable and operable, because a scroll position that satisfies all four clauses at once exists and
has been measured.

### A1.7 — Consequences for `design.md`, and there is no re-take

| Item | Ruling |
|---|---|
| The **existential reading** the design assumed | **Confirmed.** The 32-cell measurement was taken under the correct reading and `design.md`'s verdict is **not** re-taken. |
| **M-O** — the consent surface leaves the overlay model | **Stands.** It is the only remedy family §4.5 leaves open and LR4.2a admits it. |
| **M-R**, **M-D** | **Stand, untouched by this ruling.** |
| **M-B** — the bottom reserve goes 64 → 96 | **Stands, and is promoted from a remedy to a precondition of M-O** (A1.4, attainability). If M-B is dropped or deferred, M-O must be dropped with it, and that pairing is binding. |
| **S1, S2, S3** — the three `DESIGN.md` system changes | Unaffected. They remain human approval points. **S2 is the written form of M-B**, so the pairing above attaches to it. |

---

## A2 — F2a. The telemetry switch's opening value.

`design.md` M-O opens `components/organisms/cookie-consent.tsx`, so §12's trigger for **F2a** fires
and it is a **precondition of this spec**. The value is mine to state; the geometry is not.

### A2.1 — Every operative unit executed against the code, one at a time

Not "art. 5º XII says *inequívoca*". Each unit, with the number or the fact the code produces beside
it. The code at `HEAD`: `components/organisms/cookie-consent.tsx:15` `useState(true)`; the effect at
`:17-26` overwrites it from storage **only when `readTelemetryConsent() !== null`**; `saveConsent` at
`:28-34` writes `writeTelemetryConsent(telemetryEnabled)`; `lib/consent.ts:21` stores
`{telemetry, timestamp}`.

| Unit | What it requires | What the code produces | Verdict |
|---|---|---|---|
| **art. 7º I** | consent as the basis for the operation | GA is gated on the stored record (`analytics-wrapper.tsx:12`) | basis is consent, so 8º and 9º apply in full |
| **art. 8º caput** | *"por escrito ou por outro meio que **demonstre a manifestação de vontade do titular**"* | The save-without-touching path records `{"telemetry":true,…}` from a value **no act of the titular produced**. The only vontade the default demonstrates is the author's. | **FAILS at the caput.** This is the decisive unit and neither §12 F2a nor `0011` §20.1 cited it; both argued from inciso XII. The caput is stronger because it does not require reading an adjective — it asks what the *meio* demonstrates, and a control nobody touched demonstrates nothing. |
| **art. 5º XII — *livre*** | choice not constrained | the user could have toggled | passes |
| **art. 5º XII — *informada*** | informed by art. 9º I–VII | five of seven units absent (§4.1; `0011` §7.2) | fails, **independently** of the default |
| **art. 5º XII — *inequívoca*** | no agreement inferred from the absence of an act | `0011` §20.1, measured: open settings → *Salvar Preferências*, touch nothing → `{"telemetry":true,…}` and `script[src*="googletagmanager.com"]` = **1** | **FAILS** |
| **art. 5º XII — *finalidade determinada*** | one act, one purpose | `0011` §8 | fails on its own grounds, out of this spec |
| **art. 8º § 1º** | written form must be a highlighted clause | not a written contract | **not applicable** — stated so a reader can tell *does not apply* from *nobody looked* |
| **art. 8º § 2º** | the **controller bears the burden of proving** conformity | the record is `{telemetry, timestamp}` — it carries **no operand distinguishing an act from a default**. Even where the user *did* toggle, the controller cannot prove it. | **FAILS**, and it is why A2.2's rule is stated on the **record**, not on the state variable |
| **art. 8º § 3º** | *vedado o tratamento mediante vício de consentimento* | GA loads on that record | the processing is **prohibited**, not merely unsupported — a sharper consequence than "the consent is weak" |
| **art. 8º § 4º** | generic authorisations null | one switch, one purpose named | passes on scope here; `0011` §8 rules the purpose-granularity question |
| **art. 8º § 5º** | revocation *a qualquer momento*, *gratuito e facilitado* | see **Correction C1** below | the offer passes; the effect does not |
| **art. 8º § 6º** | re-inform on a change to art. 9º I, II, III or V | no version operand exists | `0011` F10; not this spec's |
| **art. 9º § 1º** | nullity where the information was not presented previously, or its content is misleading | `0011` §7, both triggers met and measured | every record written before the published page is **null**; **independent of the default** |
| **ANPD p. 33, *o que evitar*** | *"Apresentar cookies não necessários **ativados por padrão**, exigindo a desativação manual pelo titular"* | exactly what `:15` does | non-conformity with orientative guidance — **corroborating, not load-bearing** |
| **ANPD p. 32, *o que observar*** | *"Desativar cookies baseados no consentimento **por padrão**"* | not done | same |

**Which clause carries the substance:** **art. 8º caput** and **art. 8º § 2º**. The ANPD items and
art. 5º XII's *inequívoca* point the same way, and a borderline reading of the orientative guidance
never decides this alone.

### A2.2 — The ruling, stated in the quantity its substance can be breached in

The substance, as one sentence about what happens to the user:

> **the application recorded the user as agreeing to telemetry without the user having performed any
> act directed at telemetry, and processed on that record.**

Per lesson **048**, that sentence can be made true in **seven** measurable quantities. A fix stated
in one of them is silent in the other six, and `useState(false)` is a fix stated in the weakest one.

> ### LC1 — the opening state of every consent-bearing control. **Binding. Precondition of `0010`.**
>
> **Domain — a test, never a list.** Every rendered control whose activation or whose value
> contributes to a consent record this application stores and acts on, at any level. Today the test
> returns **one** member: the `role="switch"` at `components/organisms/cookie-consent.tsx:128`,
> whose `aria-checked` is bound at `:131`.
> The *Cookies Essenciais* row at `:108-119` is `aria-hidden` decoration with no `role` and no
> handler, so it is **not** a member — and `0011` F6 rules separately that what it *says* is false.
> The enumeration is the test's output, not its definition.
>
> **The rule is not a default value. It is a function of the stored record:**
>
> > **A consent-bearing control renders the value carried by a stored record that is *valid for its
> > purpose*, and renders the refusing value in every other case — including when no record exists,
> > when the record is unparseable, and when the record is null under art. 9º § 1º.**
>
> Measured, per axis. Each row is a state a guard must construct and a quantity it must read:
>
> | # | Axis | State to construct | Quantity | Required |
> |---|---|---|---|---|
> | **LC1.1** | rendered state | `localStorage` empty, settings dialog opened | `getAttribute("aria-checked")` on `[role="switch"]` | **`"false"`** |
> | **LC1.2** | recorded value | LC1.1's state, then press *Salvar Preferências*, **touching nothing else** | `JSON.parse(localStorage["workload_cookie_consent"]).telemetry` | **`false`** |
> | **LC1.3** | effect — script | after LC1.2 | `document.querySelectorAll('script[src*="googletagmanager.com"]').length` | **`0`** |
> | **LC1.4** | effect — transmission | after LC1.2, then drive **one** instrumented interaction | requests whose URL host matches `(^\|\.)google-analytics\.com$`, `(^\|\.)analytics\.google\.com$`, `(^\|\.)googletagmanager\.com$` | **`0`** |
> | **LC1.5** | residue | 1 000 ms after LC1.2 | entries in `document.cookie` matching `^_ga` | **`0`** |
> | **LC1.6** | the null-record state | a stored record art. 9º § 1º voids | as LC1.1–LC1.5 | **identical to the no-record state** — the record is treated as **absent**, the surface renders, nothing loads |
> | **LC1.7** | **the revised-decision state** | a record stored by a **valid affirmative** consent, settings reopened | `aria-checked` | **`"true"`** — the stored value, **not** `false` |
>
> **LC1.7 is why this is a rule and not a one-word patch, and it is the row a hasty fix breaks.**
> "Always open closed" silently flips a user's valid acceptance to a refusal on every reopen, which
> is a second art. 8º caput failure in the opposite direction — a recorded *manifestação de vontade*
> the user did not make. At `HEAD`, `cookie-consent.tsx:17-26` already implements LC1.7 correctly:
> it reads storage and returns. **So LC1 resolves, in this tree today, to changing `useState(true)`
> at `:15` to `useState(false)` and leaving `:17-26` untouched** — and it is stated as the rule
> above so that the effect is not "simplified" away with it.
>
> **The falsifiability control, and no `pass` may cite this rule without it.** LC1.3–LC1.5 must be
> measured in **three** states and all three printed: *before any consent exists*, *after an
> affirmative consent*, and *after the save-without-touching path*. **Two of the three must differ**,
> or the instrument is blind and the zeroes mean nothing. `0011` §7.3 already prints the
> discriminating pair — **0** requests with no consent stored, **2** after *Aceitar Tudo*, **+1** per
> instrumented interaction — so the control exists and does not have to be invented.

### A2.3 — What LC1 does **not** decide, and what it must not foreclose

`AGENTS.md` §4 rule 8 is not a licence to widen. Three things are adjacent and are **not** ruled here:

1. **The `version` field.** `0011` §7.5 requires a stored record to be treated as absent unless it
   carries a version identifier at least as new as the information the published page presents. That
   field **cannot** be a precondition of `0010`: there is no published page yet, so there is no
   version to compare against, and a version written now would be a version of nothing.
   **But LC1 must not be written in a form `0011` then has to undo.** LC1 is stated over *"a stored
   record valid for its purpose"* precisely so that `0011` narrows what *valid* means **inside
   `lib/consent.ts`** and `cookie-consent.tsx` is unchanged by that narrowing. One file diff, as
   `PRODUCT.md` §3 requires of every year-indexed change and as this record deserves.
2. **Purpose granularity** (art. 8º § 4º; `0011` §8) — whether one act may carry measurement and
   advertising. Out of `0010`.
3. **`components/organisms/ad-manager.tsx`** (`0011` F1) — it reads no consent at all. Out of `0010`,
   and latent by the human's ruling that ads are off.

### A2.4 — Does `0011` F3 (revocation ineffective in the same document) bind `0010`? **In one way, and it is a prohibition, not a task.**

`0011` §10.2 measured it: after a recorded revocation, `script[src*="googletagmanager.com"]` = **1**,
`typeof window.gtag` = `"function"`, one instrumented interaction → **1** request to
`google-analytics.com/g/collect` carrying `en=toggle_theme` — **indistinguishable from the consented
control**, against **0** before any consent existed. `lib/analytics.ts` and
`components/organisms/analytics-wrapper.tsx` are outside `0010`'s scope and it cannot fix this.

What it does do, and both halves matter:

- **M-O improves the *offer*.** `design.md` §7.3 makes the privacy shield **unconditional**, so the
  revocation control is present in every state rather than only while the banner is hidden.
  art. 8º § 5º's *facilitado* strictly improves. **Confirmed, and not disturbed.**
- **And that is precisely why `0010` may not say anything about the *effect*.** Making revocation
  more reachable while it remains ineffective for the rest of the document places **more** users in
  the state `0011` F3 measures.

> **Binding on `0010`:** no string asserting or implying that a revocation takes effect immediately
> may be **written, reworded, strengthened or newly rendered** by this spec. `copy.md` is an explicit
> no-op and AC5's exemption list is empty, so this is satisfied **by construction** and is recorded
> so that a later task cannot spend it without tripping this clause.
>
> **`cookie-consent.tsx:55-56` already contains one** — *"Você pode optar por desativar a telemetria
> a qualquer momento"* — which `0011` §20.2 entry 2 rules **measurably false** and owns the
> replacement of. **M-O moves its container; it does not edit its text.** Under `0008` §6 **O2** and
> lesson **002**, relocating a text node is not a rewrite and does not re-endorse its claim, so this
> is **not a rejection of `0010`**. It is a fact `tech-lead` must carry: **the sequencing constraint
> is that `0011`'s RV1–RV3 and this string's replacement ship together**, per `0011` §20.2's rule
> that *a string whose truth depends on a fix must ship with the fix, never before it.*

---

## A3 — Corrections to this file's own earlier rulings, inline, at the gate that found them

A verdict can be right for the wrong reason, and the reason is what travels. Three of run 1's stated
causes are wrong. The **rulings** survive in two of the three cases; the **reasons** do not, and a
later gate reconciling this file's prose against its own measurements would be doing my job.

### C1 — §4.6 *Persistence*: "one floor, and it is already met" verified the **offer** and signed for the **effect**

§4.6 ruled art. 8º § 5º **satisfied** on the strength of a standing, free, three-interaction control.
Every observation in it was true and **none of them was about the clause**. `0011` §10 drove the
control instead of reading it and measured the consequence: the revocation is *gratuito* and
*facilitado* and **not effective** until the next document.

> **§4.6's *Persistence* paragraph is corrected. What it verified is that art. 8º § 5º's
> *procedimento* is gratuito and facilitado — which remains true, and which M-O improves. It did
> **not** verify *a qualquer momento*, and that half is now a measured failure: `0011` F3,
> **critical**, `lib/analytics.ts:11` and `components/organisms/analytics-wrapper.tsx:19`.**
>
> **What survives unchanged:** the ruling that the privacy shield is **load-bearing for art. 8º § 5º**
> and that removing it to buy first-screen pixels is a **G2 rejection**. M-O makes it unconditional,
> which strengthens it.

This is lesson **053** by name, on the ruling that produced it. It is confirmed, not re-written.

### C2 — §4.6 *Placement*: "nothing is processed before the user answers" is true of Google and **false of the host**

§4.6's permission rests on `analytics-wrapper.tsx:12` mounting GA only on an affirmative stored
consent. That is correct **about Google Analytics**. `0011` F5 establishes that every request reaches
the host with the IP, the URL and the user-agent **before any consent surface renders** and
regardless of the answer — an operation with no line number, which is why four code-derived
inventories missed it.

> **§4.6's *Placement* reason is narrowed: *nothing whose basis is **consent** is processed before
> the user answers.* The host operation is processed, and its basis is not consent (`0011` §13), so
> its occurrence before the banner does not bear on the banner's validity.**
>
> **The permission is unchanged and still granted**: the consent surface may render below the first
> screen. Only its stated reason was wider than the measurement supports.

### C3 — §4.2 reading 1 and §4.7's LR4.4 clause 2: `area(reject) ≥ area(accept)` was calibrated at 390 and is **false at 1440**

§4.2 reading 1 states *"Equal prominence holds today, exactly"* — measured at 390, where both buttons
are `w-full` at **14 016 px²**. `design.md` §14 reports, from `evidence/g3-lr42.txt`, both themes:

| Viewport | `Recusar` | `Aceitar Tudo` | `area(reject) >= area(accept)` |
|---|---|---|---|
| 390×844 | 332 × 48 = **15 936** | 332 × 48 = **15 936** | ✓ holds exactly |
| **1440×900** | 102.8 × 48 = **4 935** | 131.2 × 48 = **6 296** | **✗ fails — accept is 27.6% larger** |

The cause is `w-full sm:w-auto` on both buttons: from `sm` up they take intrinsic width and
*Aceitar Tudo* has the longer label. `design.md` filtered it out on the ground that *"LR4.4's stated
domain is 390×844"*. **That ground is the defect `AGENTS.md` §5 names**: LR4.4's **domain** is a test
over surfaces and is not viewport-limited; *"at 390×844"* is its **measurement condition**, and it
says 390 only because `0010`'s whole subject is 390. A rule right where it was calibrated and untested
elsewhere is of unknown correctness everywhere else. **The ANPD item it implements has no viewport in
it**: *"conferir maior destaque apenas ao botão de aceite"* (p. 33).

> **LR4.4 clause 2's measurement condition is widened to `390×844` and `1440×900`, both themes** —
> the same two viewports LR4.2a and LR3.5 already read. **Re-executed here rather than assumed**, with
> the numbers above: it passes at 390 and **fails at 1440**.
>
> **And lesson 048 applies to the clause itself, for the third time in this rule set.** Clause 2's
> substance — *the refusal is not harder to see than the acceptance* — is stated in the quantity
> **area**, and is silent in the quantity **fill**: *Aceitar Tudo* is `Button variant="default"` (a
> filled accent surface) and *Recusar* is `variant="outline"`, at **every** viewport including 390.
> That axis is **recorded and deliberately left open at this gate** rather than closed: it is
> pre-existing, it is not caused, worsened or touched by any of the four movements, and closing it
> here would be manufacturing an obligation at a G3 addendum against a visual treatment this design
> does not change. It is written down so the next gate finds it stated, not discovered.

**Finding **F2c**, moderate** — `components/organisms/cookie-consent.tsx:60` (`flex flex-col
sm:flex-row items-center gap-3 w-full md:w-auto`) with `:68` and `:71` (`className="w-full
sm:w-auto"`). **What the code does:** at ≥ `sm`, `area(Recusar)` 4 935 px² < `area(Aceitar Tudo)`
6 296 px². **What the rule requires:** LR4.4 clause 2 as widened above. **Source:** ANPD guide p. 33.
**The worked case that exposes it:** `evidence/g3-lr42.txt`, `### 1440x900 dark` and `### 1440x900
light`, boxes `889,698.8 102.8x48` and `1003.8,698.8 131.2x48`.

**Disposition — routed, not a rejection, and the reasoning is stated rather than assumed.** It is
pre-existing; it is untouched by M-O/M-R/M-B/M-D; and `spec.md` § Out of scope 6 forbids a desktop
layout change, which is a scope conflict my veto could force and should not. Rejecting would bounce a
spec whose one legal precondition (**F2a**) it *can* discharge, to fix a defect it was not opened for
— the same reasoning §12 applied to F2b, applied consistently. **Owner: `tech-lead`. Trigger: this
spec, *if and only if* a task edits the control row at `:60-74`; otherwise the consent spec that
takes `0011` F2.** I note, without deciding it — geometry is not mine — that a remedy which equalises
the two buttons' rendered width **within the control row at every breakpoint** would satisfy the
clause without touching any desktop *layout*, and that whether that is available is
`product-designer`'s call, not mine.

### C4 — Not a correction: `lr2aSpend: 531.5` at 1440 is the **instrument** being wrong, not the surface

`evidence/g3-lr42.txt` reports `lr2aSpend: 531.5` at 1440 against LR4.4 clause 1's budget of 32.
**That is not a finding about the code.** LR2a's formula is `root.width − bodyText.width`, and it
measures *chrome* only where the body text is the sole item in its row. At `md` the banner is
`md:flex-row`: the icon and the three controls are **siblings** of the paragraph in that row, so the
531.5 is mostly siblings, not padding. Recorded because a G6 guard that applied clause 1 at 1440
would go red against a compliant surface, and the natural repair — tuning the budget until green — is
the wrong correction twice over.

> **LR4.4 clause 1's measurement condition stays 390×844**, and now it stays there **for a stated
> reason** rather than by omission: at 390 the surface is a column and the subtraction measures
> chrome; at `md` it is a row and the subtraction measures something else. A clause whose formula
> changes meaning with the layout direction is not widened without a new formula, and this gate does
> not write one. Lesson **046**'s shape, arriving on a geometric factor instead of a legal one.

---

## A4 — Instrument audit, before any `pass` cites these artifacts

`AGENTS.md` §5 binds me at the point of the verdict: open the source, and say what it prints against
an empty collection and against an all-exempt one. I opened `evidence/g3-lr42.mjs`.

| Question | Answer |
|---|---|
| What does its selector match on the markup as it stands? | `root.querySelectorAll("button")` where `root` is found by `textContent.includes("Respeitamos sua privacidade") && getComputedStyle(e).marginTop === "48px"` — **3** buttons, measured |
| What would it print against an **empty** collection? | `"controls": []` — and **no assertion at all**; it is a reporter, not a guard |
| What would it print if **every** member were exempt? | `"controls": []`, identically |

**Two of the three answers are identical, so a reader scanning `g3-lr42.txt` for `inViewport: false`
cannot distinguish "all controls pass" from "the selector matched nothing".** Three consequences,
each an instruction to `tech-lead` and to `qa-engineer`, none a patch:

1. **Assert the count first.** **3** at the first level, **3** at the second, **6 per viewport per
   theme**. Zero is never a pass.
2. **`inViewport` has no occlusion term.** `r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 &&
   r.right <= innerWidth` is silent about anything painted on top. LR4.2a clause 3 is **not**
   measured by this instrument, and A1.5's zero-intersection result is **my derivation from two
   artifacts' boxes**, not the instrument's output. A G6 guard computes the intersection directly.
3. **The root selector is anchored on a pt-BR string and a `marginTop` of `"48px"`.** Both are
   properties this spec's own M-O introduces and a later spec can change without noticing, at which
   point the probe matches nothing and prints a clean `[]`. Derive the root from the obligation — the
   element that contains the consent controls — not from its copy or its spacing token.

**And the second-level surface was not measured at G3 at all.** `g3-lr42.mjs` never opens the
settings dialog, so `design.md` measured **3 of the 6** controls LR4.2a's domain contains. That is
**not** a rejection: the dialog is `ModalDialog`, `position: fixed`, untouched by all four movements,
and §4.7 measured its three controls at 390 this gate (`44×44`, `44×44`, `292×56`, all
`inViewport: true`, both themes). It **is** a G6 obligation with an expected count, recorded in A5.

---

## A5 — What I will verify at G6 and G9, added to §18's W1–W8

| # | At G6, against the built code | At G9, against the deployed preview |
|---|---|---|
| **W9** | **LC1**, all seven rows, each state constructed and each quantity printed — including the three-state falsifiability control for LC1.3–LC1.5, and **LC1.7**, which a naive fix breaks | LC1.1 and LC1.7 read off the real page, both themes |
| **W10** | **LR4.2a** as one conjunction at one scroll position, over **6** controls per viewport per theme, **count asserted before the predicates**, with the fixed-box intersection **computed**, not inherited from `inViewport` | the same, both themes, both viewports |
| **W11** | **M-B is present wherever M-O is present.** If the bottom reserve is not 96, LR4.2a's attainability clause is re-measured and M-O does not ship without it | the surface's clearing scroll range, read off the real page |
| **W12** | **LR4.4 clause 2 at 1440**, with its numbers, and **F2c** either discharged or carried with its owner and trigger. The 1440 cell is a **sweep** over scroll positions, not the single probe `g3-lr42.mjs` takes today — the measured margin there is **1.7 px** | the same |
| **W13** | **No string asserting immediate revocation is written, reworded or newly rendered** (A2.4). AC5's exemption list is empty and `copy.md` is a no-op, so this is a `diff` returning nothing | read the rendered text off both routes in both themes |

## A6 — Open questions for the human, added to §16

| # | Question | Why it is the human's |
|---|---|---|
| **Q5** | **`0011` F3 is critical and `0010` ships before it.** Between the two, a user who revokes keeps transmitting to Google for the rest of the document, and M-O makes the revocation control **more** reachable in every state. `0010` cannot fix it — `lib/analytics.ts` and `analytics-wrapper.tsx` are outside its scope — and `0010`'s own remedy is worth shipping. Do the two ship together, or does `0010` ship first with the defect stated? | It is a sequencing and exposure trade across two specs, and only the human accepts a known legal imprecision (`AGENTS.md` §4 rule 8). My input: **LC1 is a precondition and must not be deferred**; F3 is `0011`'s and is **not** a precondition of `0010`, because `0010` neither causes nor worsens it. |

**Q1–Q4 stand unchanged.**

## A7 — Verdict of this addendum

**`pass`.**

- **A1** — the **existential reading is correct**, restated as **LR4.2a** with the three axes a bare
  quantifier leaves open. `design.md`'s 32 cells **stand**; no movement is excluded; **M-B is a
  precondition of M-O**.
- **A2** — **F2a is settled as LC1**: the control renders the value of a record valid for its
  purpose, and the refusing value otherwise. Seven axes, each with a state to construct and a
  quantity to read. In this tree today it resolves to `useState(false)` at
  `components/organisms/cookie-consent.tsx:15` with `:17-26` unchanged — **stated as the rule, because
  LC1.7 is the row a one-word fix breaks.**
- **A3** — three of run 1's stated causes corrected inline: **C1** (§4.6 verified the offer and signed
  for the effect — lesson **053**), **C2** (§4.6's premise is true of Google and false of the host),
  **C3** (LR4.4 clause 2 was calibrated at 390 and fails at 1440 — new finding **F2c**, moderate,
  routed). **C4** records an instrument defect, not a code one.
- **A4** — `g3-lr42.mjs` is a reporter, not a guard, and measured **3 of 6** controls. Three
  instructions to `tech-lead`; not a rejection.

**No new table, no bracket, no rate, no rounding rule, no order of operations.** §13 and §14 are
unchanged and still empty, for the reasons stated there.

**Next: `tech-lead` (G4).** `plan.md` is bound by §4, §5, §6, §8, §11 **and now by A1.6 (LR4.2a),
A2.2 (LC1), A2.4's prohibition, and A5's W9–W13.** **LC1 is a task, sequenced before or with the
geometry task, and its value comes from this file rather than from the developer.**

---

# Addendum B — run 3 of G2, 2026-09-19 — the T1c verdict-(c) route: **F1** and **L5**

**Verdict: `pass`.** This is an **addendum to a closed gate**, not a re-run and not a bounce. It
answers the two questions `tech-lead` routed here at the T1c ruling (`plan.md` §3C A3.3 verdict (c),
and §3A A1.2's conditional route on **L5**). It writes **no** table, **no** bracket, **no** rate,
**no** rounding rule and **no** order of operations; §13 and §14 stay empty for the reasons stated
there.

**No browser was run for this addendum.** Both questions are rulings, and the one that needs a
measurement (**B1**) is answered by stating the measurement it needs and refusing to rule ahead of
it. Two agents are measuring in this tree right now; adding a third instrument to a contested
geometry would be the fourth guess `plan.md` A3.4 forbids.

**Meaning versus measurement, stated first because that is what was asked.**

| Item | Meaning change? | Measurement change? |
|---|---|---|
| **LR3.5**'s conjunction (containment ∧ non-intersection) | **No.** Word for word as §8.1 published it. `tech-lead` re-derived §8.1's seven rows from those two conjuncts alone, including DS1 P4's empty `2504.2 .. 2490`; the text holds. | No. |
| **LR3.5a** — attainability of the clearing interval | **Yes — this addendum adds it**, because `plan.md` A3.0/B5 routed exactly this axis here and verdict (c) turns on an interval width. It is **provisional** (B1.5). | It changes **no** verdict in §8.1's published table. |
| **F1** | **Yes, in its subject only** — re-identified in B1.2, inline, at the gate that wrote it. Its clause, its severity and its remedy are unchanged. | **Its discharge is a measurement I do not have.** B1.3. |
| **L5** | **No.** The ruling stands verbatim. | **Its premise dies** — the 34.8 px surface it names does not exist on this head. B2.1. |

---

## B1 — Question 1: is **F1** discharged?

> **⚠ CORRECTED BY B6.2, same run.** B1 was written before `design.md` **§17** landed and reads
> *"no — unmeasured on this head"*. §17.4 is a measurement on this head and **F1 IS discharged as a
> breach**, with **D-3** (three unswept surfaces) and the **attribution** still open. **B1.2's
> subject re-identification, B1.3's five discharge clauses and B1.5's LR3.5a all stand** — B1.3 is
> the criterion B6.2 grades §17 against. Read B1 for the criterion, B6.2 for the verdict.

### B1.1 — What exists today, and why none of it discharges an obligation

Three bodies of numbers have been offered for DS1 P4. I opened each and asked the one question that
settles it: **in what state would this have printed something else?**

| Evidence | What it says | Why it cannot discharge F1 |
|---|---|---|
| **§8.1's seven-row table** (`g2-occluded-disclosures-2.mjs`, G2 run 1) | DS1 P4: `docTop 3235.4`, `h 34.8`, clearing range `2504.2 .. 2490` — **empty**, 4/4 cells | It is the measurement that **created** F1, and it was taken on the **pre-`0003` footer**. Every one of its seven rows is stale on this head, not only P4's. It is the finding, not its discharge. |
| **The T1b diagnostic probe** (`STATUS.md` Blockers) | `/`: `docTop 2841.4`, `h 121.7`, `maxScroll 2347`, `scrollNeededToClear 0` | Taken through an instrument **known defective on two independent counts** — the wrong element (T1a's finding) and the early exit at `scrollY = 0` (T1b's finding) — and in a **moving tree**: the T1a probe read `maxScroll 2491` and the T1b probe `2347` on the same route, a 144 px move belonging to neither. A probe whose `scrollNeededToClear` is `0` for a surface 2 841 px below the fold has answered a different question. |
| **`tech-lead`'s projection** that (c) is arithmetically expected | `[2197.1, 2347]` non-empty even with T3 reverted | `plan.md` A3.3 writes it as **explicitly not a finding**; lesson **050** forbids handing a projected number forward; and `tech-lead` correctly did not rule on it. I adopt that: **it is arithmetic on two probe numbers from a defective instrument in a moving tree.** |

**And the decisive one: three separate green LR3.5 runs today were guards measuring the wrong thing.**
A green result from this instrument has, so far, a 0/3 record as evidence. `AGENTS.md` §5 binds me at
the point of the verdict: a guard that can report a pass while measuring zero instances of the rule's
subject is not evidence, and **a gate that signs against it has signed nothing**. F1 is not
discharged. It is not confirmed either — it is **unmeasured on this head**, which is a third state
and the honest one.

### B1.2 — Correction, inline: **F1's subject is re-identified**, because the object it names no longer exists

`§12` **F1** names *"DS1 P4"* and describes it through §8.1's numbers: **34.8 px**, a `<p>` with one
`<a>`, `docTop 3235.4`. On this head, `components/organisms/calculator-views.tsx`'s fourth footer
paragraph is `F-1`: **398 chars, four `<a>` elements**, reading from `CURRENT_LEGAL_YEAR.sources`
(`rgpsBrackets[0]`, `incomeTaxBrackets[0]`, `rppsFederalBrackets[0]` and `[1]`), measured by `0003`
at **7 line boxes / 56.86 cpl at 390** and **4 / 99.50 at 1440**. That is a different box by a
factor of three and a half in height.

**F1 is amended here, at the gate that wrote it, and the amendment is a re-identification and nothing
more:**

> **F1 (amended).** Severity **serious**, unchanged. Clause **LR3.5**, unchanged. Location
> unchanged. **Subject:** *the fourth footer paragraph of
> `components/organisms/calculator-views.tsx` — the citation surface that names the tables and the
> year — in whatever body it carries on the head being measured*, today `F-1`. **The 34.8 px, the
> `docTop 3235.4`, the `2504.2 .. 2490` and the "4 of 4 cells" in §12's cell are the G2-run-1
> measurement of a superseded body and are retained as the finding's origin, not as its current
> state.** Remedy unchanged: **flow height below the footer**, which is not `0008`'s budget.

**This is a meaning statement, and it is the only one about F1 in this addendum.** It does not widen
F1, it does not change who owns it, and it does not pre-judge its discharge. It exists because a
finding whose subject has silently changed identity is a finding that can be closed by measuring the
wrong object — which is the same defect, one level up, as the three guards that measured the wrong
element.

### B1.3 — The discharge criterion, stated as quantities, before any run produces a number

F1 is discharged when **all five** clauses below are green **in the same run**, from
`plan.md` A3.3's `copyA`/`copyB` snapshot pair. Fewer than five is not a partial discharge; it is no
discharge.

- **D-1 — the instrument is trusted before its output is read.** A3.2's arithmetic calibration is
  green on all seven rows of §8.1's published table — **six to the digit, DS2 to 0,1 px, and DS1 P4's
  empty interval `2504.2 .. 2490` reproduced as empty** — and **control C1** (the same row with the
  containment conjunct disabled) comes back **green**. C1 is the falsifiability control: it is the
  state in which the predicate prints something else, and without it the other ten cases pass by
  construction. **If D-1 is red, nothing below is read at all** (`plan.md` A3.3 verdict (d)).
- **D-2 — the set size is asserted before the predicates**, per §8.1's own closing clause: **7
  surfaces on `/` seeded, 4 on `/custo-da-hora`**, per cell, all 16 sweep cells. A selector that
  matches nothing and a clean sweep print the same thing. **A cell that reports fewer than its
  expected count is red, whatever its predicates say.**
- **D-3 — the whole table is re-published, not the P4 row.** `0003`'s footer rewrite moved
  `docTop` and `maxScroll` for **every** surface, so §8.1's six passing rows are as stale as its
  failing one. B4 must print, per cell: `surfaceTag`, `surfaceHeight`, `docTop`, `viewportHeight`,
  `maxScroll`, `containmentOnly`, the **interval itself** (not a boolean), and the full `fixed` list
  for one cell per route. **A pass on row 7 obtained while rows 1–6 went unprinted is a pass on a
  sample, and §8.1's table is the whole domain.**
- **D-4 — every surface in the cell clears, not only the amended F1 subject** (lesson **054**, this
  spec's own). LR3.5 is a **per-surface** clause, so a green obtained by moving the failing surface
  out of the container and handing the empty interval to the paragraph that becomes last is **not a
  discharge — it is a rename, and it is a fresh breach of the same clause in the same cell.** F1's
  remedy was always container reserve, not surface identity; §12 says so in its own words
  (*"the remedy is flow height below the footer"*).
- **D-5 — `copyA` and `copyB` both reported, and the difference read.** `copyA` (this spec's T3
  reverted, `0003`'s footer in) green on the F1 subject means the premise *"can never come to rest
  clear"* was **discharged by `0003`**, not by this spec — and then **T3 is not F1's remedy and must
  not be recorded as one**. `copyA` red and `copyB` green means T3 **is** the remedy. Both are
  discharges of F1; they are **different findings about what discharged it**, and `AGENTS.md` §5's
  rule that a verdict can be right for the wrong reason makes the distinction the reportable part.

### B1.4 — What I need from T1c, named exactly

`plan.md` A3.3's **B4** and **B5** already collect all of it. I am adding **nothing** to the run and
requesting **no** extra instrument. What I need handed to me, in `reports/build.md`:

1. The **A3.2 calibration output**, all eleven cases, with **C1's green** shown separately (D-1).
2. The **B4 tables for both copies**, per route and per surface, with the **intervals** printed as
   intervals (D-3), and each cell's **surface count against its expected count** (D-2).
3. The **B5 list**: every surface whose widest interval is **< 1 CSS px**, with its width and name —
   including an explicit *"none"* if the list is empty, because an absent list and an empty list read
   identically (D-1's own logic, applied to the routed observation).
4. The `fixed` chrome list per route, so the route nav's `766 .. 828` band is on the record for this
   head rather than carried from G2 run 1.

**If verdict (c) fires, I rule on F1 from that output in an Addendum C and nowhere else.** Until
then F1 stands **open and unmeasured on this head**, and — this is the operative consequence for the
pipeline — **`legal.md` A1.7 is untouched: M-B (T3) still lands before M-O (T5), and T5 stays
blocked.** A3.3's own verdict (c) does not unblock T5, and nothing in this addendum does either.

### B1.5 — **LR3.5a** — the attainability axis, ruled because verdict (c) turns on an interval width

`plan.md` A3.0 and B5 routed this here by name: *whether a clearing range narrower than 1 CSS px
counts as reachable.* It is mine, it is a **meaning** addition to LR3.5, and I state it in the
quantity it can be breached in rather than as an adjective.

> ### LR3.5a — the clearing interval must be **attainable**, not merely non-empty. Provisional.
>
> Let `I` be the set of scroll positions LR3.5's conjunction admits for a surface in a cell, and let
> `[0, maxScroll]` be the document's scroll range in that cell. `I` satisfies LR3.5 only if it
> contains a position the user can come to rest on:
>
> - **Tier 1 — endpoint-anchored.** If `I` contains `0` or `maxScroll`, it is **attainable at any
>   non-zero width**, because a single gesture lands on it exactly: the load itself for `0`, and
>   scroll-to-end for `maxScroll`. No floor applies.
> - **Tier 2 — free interval.** If `I` contains neither endpoint, it is attainable only where its
>   widest component measures **≥ 1 CSS px** of `scrollY`.
> - **Tier 3 — empty.** `I = ∅` is the breach LR3.5 already names. Unchanged.
>
> **Quantity:** width of a component of `I`, in CSS px of `window.scrollY`, computed in closed form
> from the same `getBoundingClientRect()` border boxes LR3.5 reads — **one quantity across the rule
> set**, and the one `plan.md` A3.1 replaced the 60-sample loop with. Reported to **one decimal
> place**, this document's precision throughout.
>
> **Worked example, taken off the state I consider correct — §8.1's own six passing rows, on `/`
> seeded, 390×844:** DS2 **648,9**; DS7 art. 59 **575,0**; DS7 art. 71 **508,1** (anchored at
> `maxScroll 2490`); DS1 P1 **235,9** (anchored); DS1 P2 **175,7** (anchored); DS1 P3 **28,6**
> (anchored). **The narrowest passing interval in the intended state is 28,6 px and it is
> endpoint-anchored** — which is why the floor is placed on free intervals and not on all of them: a
> floor of, say, 30 px applied uniformly would have failed DS1 P3, a row §8.1 measured as passing and
> which no norm faults. DS1 P4's `2504.2 .. 2490` is Tier 3 and stays the failing subject.

**Three things this clause is not, said so it cannot be over-read:**

1. **No norm fixes the number.** No operative unit of LGPD arts. 5º XII, 6º IV/VI, 8º or 9º, and no
   unit of the CLT articles this app computes from, reaches the granularity of a scroll gesture. The
   1 CSS px is a **rule-set quantity**, of the same status as LR4.4's 336 px floor and derived the
   same way — from a worked measurement plus the platform fact that a 1:1 touch drag at 390 addresses
   `scrollY` at 1 CSS px granularity, while the coarsest common gestures (wheel notch, arrow key,
   Page Down) move 40–700 px. **That platform fact is stated as the calibration reason and has not
   been browser-measured this session**; it would have to be, before this clause decided anything.
2. **It is PROVISIONAL, because it has no failing subject.** My own rule: *a new axis clause is
   trusted only once it has a failing subject; a clause that has never been red is decoration.*
   Every row in §8.1's table is Tier 1 or Tier 3; **not one is Tier 2**. So LR3.5a **may not decide a
   verdict alone** and is not, today, a rejection ground. It becomes binding the moment `plan.md`
   B5's sweep returns a Tier-2 subject below the floor — and B5 is exactly the sweep that looks for
   one. Until then, **the clause carrying the substance is LR3.5's non-emptiness (Tier 3)**, and that
   is what any pass or reject on F1 is written against.
3. **It does not re-open §8.1's table.** Applied to all seven published rows it changes **zero**
   verdicts. A clause that re-litigated a measurement it was written after would be the inversion
   `AGENTS.md` §5 says to name.

---

## B2 — Question 2: **L5**, if no position satisfies **R** with the whole `F-1` paragraph

> **⚠ AMENDED BY B6.3, same run.** The condition **did not fire**: `design.md` §17.3 re-elected the
> witness — **DS1 P2** — exactly as B2.2 requires, and R is satisfied with zero new copy. B2.3's
> five prohibitions were **not reached** and stand as the standing rule for any later spec.

### B2.1 — What dies is the premise. What stands is the ruling.

**§6's premise is retired here, by me, at the gate that wrote it.** The sentence *"A 34.8 px whole
surface exists (DS1 P4), so R is satisfiable with zero new copy"* named a box that does not exist on
this head. `0003` replaced it with `F-1` — 398 chars, four `<a>`, 7 line boxes / 56,86 cpl at 390,
4 / 99,50 at 1440. **The 34,8 px is retired and does not return.**

**§6's ruling is not retired, and it does not depend on that premise.** L5's operative output is
three sentences, and each survives on its own footing:

| L5's output | Survives? | On what footing |
|---|---|---|
| *This gate mandates no string; **AC5's exemption list is EMPTY*** | **Yes** | It was never a consequence of P4's height. It is a consequence of `spec.md` § Non-goals and of the fact that nothing has been exempted. Empty because nothing qualified, not because nothing was looked at. |
| *A split is permitted only if the above-fold fragment is **independently in the domain*** and clears LR1, LR2a, LR2b, LR3, LR3.5 and LR6.1 in its own right | **Yes, verbatim** | It is a test on a fragment's own text, and no measurement of any container touches it. |
| *Shortening an existing surface to fit remains **forbidden*** | **Yes, and reinforced below** | `spec.md` § Non-goals, `0008` §6 **O2**, lesson **002**. |
| *R is satisfiable with zero new copy* | **Conditionally — the witness must be re-elected** | §6 elected P4 as the witness because it was the smallest. **R never named a disclosure**; `spec.md`'s R is *at least one disclosure reachable on the first screen*. The premise needs **a** whole surface, not **that** one. B2.2. |

### B2.2 — Step 1: re-elect the witness before concluding R is unsatisfiable

**Before anyone concludes that no position satisfies R, the question must be asked of every whole
candidate, not of `F-1` alone.** `product-designer`'s Q-A/Q-B measure `F-1` in the `aside` slot;
a *no* there is a *no about `F-1`*, and §6's table lists four other whole surfaces on the footer
route and three more on `/`:

| Candidate whole surface | §6's height (G2 run 1, **in the footer, pre-`0003`**) | Status on this head |
|---|---|---|
| **DS1 P1** — *Tudo o que você digita fica salvo apenas neste navegador…* | 52,2 | **must be re-measured** |
| **DS1 P2** — *Os valores são uma estimativa … não substituem seu holerite…* | 52,2 | **must be re-measured** |
| **DS1 P3** — the gap list (which now carries the RPPS-federal sentence) | 139,1 | **must be re-measured** |
| **DS2**, **DS7 art. 59**, **DS7 art. 71** — `/` only, journey view | 52,2 / 126,0 / 42,0 | **must be re-measured**; they do not exist on `/custo-da-hora` (`0008` §1.4) |
| **DS1 P4** = `F-1` | 34,8 | **superseded** — 7 line boxes at 390 |

**Those five heights are pre-`0003` and in the footer.** They are evidence of order of magnitude and
**not a substitute for measuring the destination** — Q-A's own words, and lesson **050**. I assert
none of them; I require them measured.

**The test each candidate must pass to be the witness**, in its destination, at 390×844 and
1440×900, both themes, all four storage states:

1. **LR1** — body text `getBoundingClientRect().width ≥ 320` CSS px. §5.2 already settles which
   containers can hold it at 390: **the page content column (≈358) qualifies; the card interior
   (308), the field interior (258) and the regime card (254) do not.** A destination inside a card
   fails LR1, and `spec.md` **AC6** ranks LR1 above R.
2. **LR2a** — ≤ 32 px of the surface root spent on chrome.
3. **LR2b** — ≥ 40 cpl, **and its non-regression clause**: a relocated surface may not fall below the
   cpl it measures today. For `F-1` that is **56,86 at 390**. *(Recorded, since it was raised: LR2b
   is a **lower** bound with no upper bound, so `F-1`'s **99,50 cpl at 1440** breaches nothing, and
   §5.1's `k ∈ (5.452, 6.217]` gives `cap(358) ∈ [57.6, 65.7)` — 56,86 sits inside it. **There is no
   LR2b argument against `F-1` at any width**, which matches the measured no-overflow result.)*
4. **LR3-as-corrected** — present in the DOM on load, no reveal control.
5. **LR3.5** (and LR3.5a, provisionally) — a non-empty, attainable clearing interval **in the
   destination**.
6. **LR6.1** — the claim it qualifies rendered in the same frame.

**The smallest candidate that passes all six is the witness, and §6's premise is restated with its
measured height.** Electing it costs **zero new copy, zero rewording and zero exemption**, which is
what §6's conclusion always claimed and what still holds.

**One routed observation, not a veto.** `F-1` is the only surface that carries the norm, the year and
the effective date — `PRODUCT.md` §4's *the year is part of the answer*. Electing DS1 P1 (a storage
statement) or DS1 P2 (an estimate caveat) as the above-fold witness **discharges R's letter and not
its purpose**. That is a **product-positioning** fact and it is **`tech-lead`'s and the human's**,
because §7 already ruled R clause 1 is not a legal obligation and attaching my veto to it would
manufacture one. **It is recorded so that a witness is elected deliberately rather than by being the
shortest.**

### B2.3 — Step 2: if **no** whole surface satisfies R in **any** placement

Then **R clause 1 is unsatisfiable on this head without new copy.** Three things follow, and only the
first is mine.

**(i) That is not a legal breach, and I do not reject on it.** §7 settled it: R clause 1 (the fold)
is **the product's bar**, overruled by `tech-lead` on a measurement; only R clause 2 (non-occlusion)
is legal, and it is LR3.5. A disclosure sitting in the footer, reachable by scrolling, breaches
nothing — **LR3.5 is satisfied by any reachable rest position, not by the first viewport.** The
spec exists because the human asked a positioning question, and a negative answer to a positioning
question is an answer.

**(ii) What remains forbidden, whatever is decided about the fold.** This is the operative half, and
it is mine:

- **Shortening `F-1`, or any other surface, to make it fit — FORBIDDEN.** `spec.md` § Non-goals,
  `0008` §6 **O2**, lesson **002**. Re-affirmed against the measured fact handed to me: `F-1` has
  **no space argument against it** — 7 lines / 56,86 cpl at 390, 4 / 99,50 at 1440, no overflow at
  any width, all six LR clauses clear in the footer. **A clause that fits is a clause that stays**,
  and its RPPS half in particular: it is the only place the app says the estatutário figures come
  from the **federal** RPPS and do not apply to servidor estadual or municipal, which is a gap
  disclosure under `PRODUCT.md` §4 and holds in **every** state, not only where a mismatch shows.
- **Splitting `F-1` — permitted only under §6's unchanged condition, and then it is not a split.**
  The above-fold fragment must be independently in the domain **on its own text** and clear all six
  clauses of B2.2 in its own right. If it does, `F-1` **stays whole in the footer** (`0008` §6 **O4**
  — one obligation discharged twice is not redundancy), the fragment is a **new string**, it belongs
  to `content-writer` and to `0003`'s registry, and it arrives through a **G1 amendment**. It does
  **not** arrive through AC5's exemption list, which stays **EMPTY**. **This gate still mandates no
  string.**
- **Moving any surface into the band the fixed chrome covers — FORBIDDEN.** §8.3's caveat, unchanged:
  a remedy that satisfies AC1 by placing a surface between **354 and 820** on a cold load converts a
  product defect into a legal one under LR3.5.
- **Dropping a disclosure to make room — FORBIDDEN.** `spec.md` § Disclosure obligations 5, §8.3: O
  is discharged by uncovering the claim, **never** by dropping the claim's disclosure along with it.
- **Relocating `F-1` without re-measuring the footer's new last element — FORBIDDEN** (lesson
  **054**, and **D-4** above). If `F-1` leaves, **DS1 P3 becomes the last flow element** of a
  container whose reserve is what F1 faulted. A green on the relocated surface bought by an empty
  interval on P3 is a rename, not a remedy, and I will read it as a fresh LR3.5 breach at G6.

**(iii) The three exits, ranked by legal cost only — none of them is mine to pick.**

| Exit | What it costs | Owner |
|---|---|---|
| **γ — reduce the fixed chrome's own footprint** so the first screen has room | **No copy, no claim, no exemption.** It is the only exit that *increases* the unoccluded band — §8.1 measured it at `[65, 766]`, **701 px of 844**, the rest being header and route nav. My rules constrain it least. | `product-designer` |
| **β — amend R clause 1 / AC1 down** (e.g. *reachable within one deliberate scroll* rather than *on load*) | A product promise. **Legally available**: R clause 1 is not a legal obligation (§7) and LR3.5 is indifferent to the fold. | `product-manager`, human |
| **α — a new above-fold surface** (new string, independently in the domain) | A new string and a **G1 amendment**; `content-writer` and `0003` open. | human, then `content-writer` |

**This is a ranking by legal cost, not a design recommendation**, and `tech-lead` routes it. What I
rule is that **all three are open and none of the forbidden five in (ii) is.**

### B2.4 — L5, restated

> ### L5, settled (run 3) — supersedes §6's premise, not §6's ruling
>
> **Still permitted, still conditioned, and still not authorised here.** The 34,8 px witness is
> retired; **R's premise is re-founded on whichever whole surface in the `0006` §2.1 domain is
> measured to clear LR1, LR2a, LR2b (incl. non-regression), LR3, LR3.5 (+LR3.5a) and LR6.1 in its
> destination.** If one does, R is satisfiable with **zero new copy** and this gate mandates no
> string. If none does, **R clause 1 is a product-positioning question with three open exits
> (B2.3 iii)** and **not** a legal breach — and the five prohibitions of B2.3 (ii) bind in every
> branch.
>
> **`spec.md` AC5's exemption list from G2 stays EMPTY** — deliberately, and stated as empty so a
> reviewer can tell *nothing exempted* from *nobody looked*. **Nothing in this addendum exempts
> anything, and no string is mandated, shortened, split or reworded by it.**

---

## B3 — What I will verify at G6 and G9, added to §18's W1–W8 and A5's W9–W13

| # | At G6, against the built code | At G9, against the deployed preview |
|---|---|---|
| **W14** | **F1's five discharge clauses D-1…D-5**, each with its printed quantity — the A3.2 calibration incl. **C1**, the asserted surface **count per cell** before any predicate, the **full seven-row/four-row table re-published** on this head, and the footer's **last flow element** identified by measurement rather than by name | the F1 subject's clearing interval read off the real page, both themes, both routes |
| **W15** | **LR3.5a's Tier-2 sweep**: the list of surfaces with a free interval, their widths, and an explicit **"none"** if empty. If a Tier-2 subject below 1 CSS px exists, LR3.5a stops being provisional and the platform fact in B1.5(1) gets browser-measured before it decides anything | the same |
| **W16** | **The elected R witness**, by name, with its six clause results in its destination, and **DS1 P3's LR3.5 interval in the state where `F-1` has left the footer** (lesson **054**) | both, both themes |
| **W17** | **No string shortened, split, reworded or added**: a `diff` over the four footer paragraphs and `0003`'s registry returning nothing, and AC5's exemption list still empty | the rendered footer text read off both routes in both themes |

## B4 — Open questions for the human, added to §16 and A6

| # | Question | Why it is the human's |
|---|---|---|
| **Q6** | **If no whole surface satisfies R above the fold, which exit?** γ (shrink the fixed chrome), β (amend AC1 to *reachable within one deliberate scroll*) or α (a new string via G1 amendment). | It is a product promise against a layout cost, and §7 already ruled R clause 1 is **not** my veto. My input: **γ costs nothing I govern; β is legally available and LR3.5 is indifferent to the fold; α opens `content-writer` and `0003`.** None of the three is blocked by any norm. |
| **Q7** | **If `F-1` moves above the fold, is the footer's remaining citation obligation still discharged?** `F-1` is the only surface naming the norms, the year and the effective dates. | Only if it is **duplicated** does `0008` §6 **O4** apply; if it is **moved**, the footer keeps P1–P3 and `DS1_EXPECTED_PARAGRAPHS` goes 4 → 3, which is Q-D's own check. That is a scope call, and the legal floor is satisfied either way as long as the surface renders **once** per state (never twice — a permanent slot *and* a banner is the duplication users learn to skip). |

**Q1–Q5 stand unchanged.**

## B5 — Verdict of this addendum

> **⚠ B5 states the verdicts as they stood before `design.md` §17 landed mid-session. Both are
> amended in B6, which is part of this same run and is the operative text. B5 is retained unedited
> so the correction is visible rather than absorbed.**

**`pass`.**

- **Question 1 — F1 is NOT discharged.** Not confirmed either: **unmeasured on this head**, which is
  the honest third state. Every green offered so far came from an instrument with a 0/3 record today,
  a superseded tree, or a projection `plan.md` itself forbids reporting as a finding. **F1's subject
  is re-identified (B1.2)** — a meaning change, inline, at this gate. **Its discharge is defined as
  five clauses D-1…D-5 (B1.3)** and it is ruled from `plan.md` A3.3's own B4/B5 output and nowhere
  else. **I need no new instrument and I am adding nothing to the run.** `legal.md` **A1.7 is
  untouched: T3 before T5, and T5 stays blocked.**
- **LR3.5a is added** — the attainability axis A3.0 routed here, three tiers, calibrated on §8.1's own
  narrowest passing interval (**28,6 px, endpoint-anchored**). **Provisional**: no Tier-2 subject
  exists, so it decides no verdict alone, and the substance stays with LR3.5's non-emptiness.
- **Question 2 — L5's premise dies, L5's ruling stands.** The witness is re-elected by measurement
  from the other whole surfaces in the domain; if none qualifies, **R clause 1 is a product question
  with three open exits and not a legal breach**, and **five things stay forbidden in every branch**,
  first among them shortening `F-1`, against which there is **no space argument** at any width.
  **AC5's exemption list stays EMPTY. This gate still mandates no string.**
- **No table, no bracket, no rate, no rounding rule, no order of operations.** §13 and §14 unchanged
  and still empty.

**Next: `frontend-dev` completes T1c and hands `reports/build.md`'s B4/B5 output; `tech-lead` routes
it back here for Addendum C if verdict (c) fires. `product-designer` continues A1.2's Q-A…Q-D and
reads B2.2's six-clause test and B2.3's five prohibitions as the frame for a *no* answer to Q-B.**

---

## B6 — Reconciliation: `design.md` **§17** landed while this addendum was being written. **Both answers change.**

`product-designer`'s scoped G3 re-run (`design.md` §17, run 2, 2026-09-19) was delivered mid-session,
after B1 and B2 were drafted. It is a **measurement on this head**, from an isolated production build
on its own confirmed-free port, with its predicate published. **A measurement outranks a
classification, and the classification loses** (`AGENTS.md` §5). B1 and B2 are amended here, inline,
at the gate that wrote them, and the amendment is marked rather than silently substituted.

### B6.1 — I re-derived §17's predicate against my own published table before reading any of its verdicts

§17.17 states the closed form it computed every LR3.5 cell with:

```
s ∈ [ docTop + h − navTop ,  min(docTop − headerBottom, maxScroll) ]
```

That is LR3.5's conjunction, not a restatement of it: the lower bound is *bottom above the route
nav*, the upper is *top below the header*, capped at `maxScroll` — containment **and**
non-intersection **and** attainability, for the only two fixed boxes that overlap the column
horizontally. **I ran it myself against §8.1's own rows, in this session, and it reproduces them:**

| §8.1 row | published interval | re-derived from §17's formula | agrees |
|---|---|---|---|
| **DS1 P4** (the known-red row) | `2504.2 .. 2490` — **empty**, width **−14,2** | `2504.2 .. 2490`, width **−14,2** | ✓ |
| DS1 P3 | `2461.4 .. 2490`, width 28,6 | `2461.4 .. 2490`, width **28,6** | ✓ |
| DS2 | `1688.9 .. 2337.8` | `1689.0 .. 2337.8` | ✓ to 0,1 px |

**D-1 is therefore satisfied by my own arithmetic and not by trusting the probe**, and it is
satisfied in the only way that counts: **the formula prints red on the row I know is red.** That is
the state in which this check would have printed something else, and it is the reason §17's greens
are readable as evidence where the e2e guard's three greens were not.

### B6.2 — **AMENDED: F1 IS discharged as a breach, on its own subject, on this head.** B1's *"not discharged, unmeasured"* is corrected.

B1 was written against the three bodies of evidence listed in B1.1, none of which could discharge an
obligation. **§17.4 is a fourth, and it can.** `evidence/g3r2-footer.txt`, `/` and
`/custo-da-hora`, consent-pending and consent-answered, footer intact and P2 moved, both themes —
**8 cells × 2 themes, DS1 P4 passes LR3.5 in every one.** The tightest cell is `/`,
consent-answered: clearing window **`[2197.1, 2215]`**, width **17,9 px**, upper bound **= `maxScroll`**.

| Discharge clause (B1.3) | State |
|---|---|
| **D-1** — instrument trusted, red on a known-red row | **GREEN**, by my own re-derivation in B6.1 |
| **D-2** — count asserted per cell | **GREEN for the DS1 set** — four paragraphs printed per cell, named, with `footerParagraphs = 3` after the move |
| **D-3** — the whole domain re-published | **OPEN.** §17.4 sweeps the **four DS1 paragraphs**. **DS2 and DS7 art. 59 / art. 71 on `/` were not re-measured.** They sit *above* the footer, so `0003`'s growth can only have widened their windows — **but I do not assert that, I require it swept.** Owed at T1c/G6, **W14** |
| **D-4** — the element that becomes last measured **as** last | **GREEN, and this is the strongest row in §17.** Both states that promote a different last block were measured: consent-pending (last block = the consent surface) and consent-answered (last block = the footer). Removing DS1 P2 moves `F-1`'s headroom by **+0,1 px** (18,0 → 18,1). **M-R does not hand the failure to a neighbour** (lesson **054**) |
| **D-5** — `copyA`/`copyB` both read, so *what* discharged it is attributed | **OPEN, and §17.17 says so itself:** *"This gate measured only the state with T3 in … it does not answer A3.3's `copyA` question."* |

> ### **F1 — ruling (amended, run 3)**
>
> **The breach does not reproduce on this head.** DS1 P4 / `F-1` has a non-empty, `maxScroll`-anchored
> clearing window in **16 of 16 measured cells**, and LR3.5 is satisfied on its subject. **F1 is
> discharged as a breach**, subject to **D-3** — the three surfaces §17 did not sweep — being green
> at T1c/G6. It is **not** carried forward as an open LR3.5 breach, and **`spec.md`'s R clause 1
> remains the only thing M-R is load-bearing for**, exactly as §17.3 says and as §7 (**L6**) already
> ruled.
>
> **What is NOT discharged is the attribution, and it is not a detail.** Nobody has measured a head
> with **T3 reverted**. If `0003`'s footer rewrite already discharged F1, then **T3 is not F1's
> remedy and may not be recorded as one** — §17.3's *"because M-B (T3, in source) raised the bottom
> reserve from 64 to 96"* is a **causal claim with no counterfactual measured**, and it is exactly the
> shape `AGENTS.md` §5 warns about: a verdict right for a reason that has not been tested, and the
> reason is what travels. **A3.3's `copyA` is the only instrument that settles it**, and it is still
> owed. *(This does not disturb `legal.md` **A1.7** — M-B is a precondition of M-O on **LR4.2a's
> attainability** axis, not on F1's, so A1.7 stands whatever `copyA` says.)*
>
> **And the discharge is robust to `design.md` §17.17's one open number.** The `maxScroll`
> disagreement — **2215** measured here against **2347** in A3.2's projection on `/` at 390 — moves
> the window between **`[2197.1, 2215]`** (width **17,9**) and **`[2197.1, 2347]`** (width **149,9**).
> **Both are non-empty and both are `maxScroll`-anchored**, so F1's discharge does not turn on which
> reading is right. `tech-lead` still reconciles it before the A3.3 run, because verdict (a)/(c)
> **does** turn on it; **F1's verdict does not.** I attribute the 132 px to nothing (lesson **050**).
>
> **F1's trigger, which replaces its §12 disposition.** The remedy's whole margin on `/` is **17,9 px
> of document below the footer's last paragraph.** F1 re-opens — automatically, without a new finding
> — on **any** of: the footer's bottom reserve dropping below **96**; `F-1` or whichever paragraph is
> last growing by **≥ 17,9 px**; the route nav's band growing beyond **766 .. 828**; or any flow
> element being appended below the footer. **Owner: the first spec that opens
> `components/organisms/calculator-views.tsx`'s footer or `components/organisms/app-header.tsx`'s
> route nav.** A margin this thin is a finding about fragility even when the cell is green, and
> naming the trigger is how it survives this spec closing.

### B6.3 — **L5's conditional route did NOT fire, and `design.md` §17.3's reason is the correct one**

Q-B answered **no** for `F-1` — *"the first screen's budget below the answer is 58,6 px and `F-1` is
121,7"*, with the deficit derived as a **comparison** (`navTop − contentTop < heroCardHeight + gap +
surfaceHeight`) rather than as a pixel delta. **But A1.2's route fires only if no position satisfies
R with the whole `F-1` paragraph *and* R is thereby unsatisfiable** — and §17.3 did exactly what
**B2.2** requires: it re-elected the witness from the other whole surfaces in §6's own table, measured
all three in the destination, and found two that pass.

**The election is confirmed against B2.2's six-clause test**, on §17's published numbers, clause by
clause — this is my check, not an adoption of theirs:

| Clause | DS1 P2 in the `aside` slot | Verdict |
|---|---|---|
| **LR1** — body `width ≥ 320` at 390 | `w` **358** (the page content column, the container §5.2 names as the one that qualifies) | ✓ |
| **LR2a** — chrome ≤ 32 px | **0** — direct child of the column, no padding | ✓ |
| **LR2b** — ≥ 40 cpl at 12px, **and non-regression** | **56,67 cpl**, 3 line boxes, 170 chars. Identical to its footer value, because the footer and the column are the same 358 px at 390 — **so the non-regression clause is satisfied by identity, not by margin** | ✓ |
| **LR3**-as-corrected — in the DOM on load, no reveal control | a plain `<p>`, rendered in all four storage states plus consent-answered | ✓ |
| **LR3.5** | **20/20 cells at 390**, whole box in viewport at `scrollY = 0`, **no** fixed intersection, clearance **+6,4** on `/` and **+171,7 … +255,1** on `/custo-da-hora`. Tier 1 (anchored at `0`) | ✓ |
| **LR6.1** — pairs the claim it qualifies | DS1 P2 is the **estimate** caveat — *não substituem seu holerite, não valem como registro oficial de ponto* — and the claim on the first screen is the hero card's figure. **It qualifies the number; DS1 P1 qualifies the storage.** §17.3's choice between two geometrically identical candidates is made on the claim, which is the right axis | ✓ |
| **Once per state** | *"One rendered instance per page"* — moved, not duplicated | ✓ |

> ### **L5 — ruling (run 3)**
>
> **The route did not fire, and L5 is unchanged: no split, no new string, no shortening, and AC5's
> exemption list stays EMPTY.** §6's **premise** is nonetheless retired as B2.1 states — the 34,8 px
> witness is dead — and **re-founded on a measured one: DS1 P2, 52,2 px, 3 line boxes, 56,67 cpl,
> passing all six clauses in its destination in 20 of 20 cells.** `F-1` ships **whole, unread,
> unedited, in the footer**, and it is **reachable there** (B6.2). **B2.3's five prohibitions were
> not needed and none was breached**; they stand as the standing rule for any later spec that reaches
> this branch, which is why they are not deleted.
>
> **B2.2's routed observation is answered and closed.** I recorded that electing P1 or P2 discharges
> R's letter while the norm-and-year surface stays below the fold. It does — and **that is lawful**,
> because LR3.5 is satisfied by any reachable rest position and `F-1`'s is non-empty in 16/16 cells.
> The disclosure that goes above the fold is the one that qualifies the **number**, which is the
> pairing LR6.1 is about. **No legal objection to the election.**

### B6.4 — **LR3.5a: still provisional — but it now has a Tier-2 subject, and that subject was reported in the wrong unit**

§17.17: *"No window this gate reports is narrower than 17,9 px, so A3.3's B5 sub-pixel-range
observation has no subject in any cell here."* **Confirmed — LR3.5a has no failing subject and stays
provisional**, deciding no verdict alone, exactly as B1.5 states.

**But §17.4's 1440 cell is the rule set's first Tier-2 subject**: on `/` at 1440×900 the relocated
DS1 P2 rides the `lg:sticky` aside, sits at `819.4 .. 854.2` against a tab bar at `806` **at rest**,
and first clears at **`scrollY` 49** — an interval anchored at neither `0` nor `maxScroll`. §17
reports its size as ***"310 of 400 sampled positions clear"***.

**That is a sample count, not LR3.5a's quantity, and the two are not interchangeable** — it is
lesson **065**'s exact defect (*a finite sweep's spacing is a threshold nobody declared*) and the one
`plan.md` A3.1 deleted the 60-sample loop over. **LR3.5a reads the width of a component of the
clearing interval, in CSS px of `scrollY`, computed in closed form.** 310/400 is consistent with a
wide interval and it is not a measurement of one.

> **Finding — `minor`, routed, not a patch.** `evidence/g3r2-p2.mjs`'s 1440 cell reports LR3.5's
> clearing set as a sampled count. **It must print the interval, in CSS px, from the same closed form
> §17.17 publishes** — `[docTop + h − navTop, min(docTop − headerBottom, maxScroll)]` — at 1440 on
> `/`, for the relocated DS1 P2. It does **not** block T4′, it does **not** re-open G3, and it does
> **not** change any verdict in §17: the cell passes under either unit. **Owner: `qa-engineer` at G6,
> as part of W15**, which already requires the Tier-2 list with widths. The verdict it would change
> is a future one, which is why it is recorded now rather than at the gate that trips over it.

### B6.5 — What changed, in one table, so a downstream agent reconciles nothing by hand

| Written in | Claim | Status after §17 |
|---|---|---|
| **B1.1–B1.4** | *F1 is not discharged; it is unmeasured on this head* | **CORRECTED.** It was true of the three evidence bodies B1.1 lists and is **false** of `design.md` §17.4, which landed after. **F1 is discharged as a breach** (B6.2), with **D-3** and the **attribution** open |
| **B1.2** | F1's subject is re-identified | **STANDS**, and §17.1 confirms it by measurement — `h` 34,8 → **121,7**, *"run 1's `h` 34.8 is dead"* |
| **B1.3** | D-1…D-5 | **STANDS as the criterion**, and is the frame B6.2 grades §17 against. D-1, D-2, D-4 green; **D-3 and D-5 open** |
| **B1.5** | LR3.5a, provisional | **STANDS**, confirmed by §17.17's 17,9 px floor; **one Tier-2 subject appears** and its unit is a finding (B6.4) |
| **B2.1** | §6's 34,8 px premise is retired | **STANDS** |
| **B2.2** | Re-elect the witness from the other whole surfaces before concluding R is unsatisfiable | **STANDS, and was executed** — §17.3 elected **DS1 P2**, confirmed clause by clause in B6.3 |
| **B2.3** | The five prohibitions, and the three exits | **NOT REACHED.** None breached; retained as the standing rule for any later spec |
| **B2.4 / L5** | No split, no string, exemption list EMPTY | **STANDS** |

**Verdict of this addendum is unchanged: `pass`.** Nothing in §17 requires a rejection, no table, no
bracket, no rate, no rounding rule and no order of operations is touched, and **AC5's exemption list
is still EMPTY**.

---

# Addendum C — run 4 of G2, 2026-09-19 — **D-5's subject question**: which document is LR3.5 about?

**Verdict: `pass`.** This is an **addendum to a closed gate**. It answers the single question
`tech-lead` routed here as **D-5** in `plan.md` §3E **A5.5**. It writes **no** table, **no** bracket,
**no** rate, **no** rounding rule and **no** order of operations; §13 and §14 stay empty for the
reasons stated there. **No string is mandated, shortened, split or reworded. AC5's exemption list
stays EMPTY.**

**No browser was run for this addendum.** Nothing here needed one: the question is a ruling on a
rule's subject, and every number it turns on is already on the record in `design.md` §17.17,
`reports/build.md` and `plan.md` §3E. I read source files and the git index, and I did the arithmetic
in closed form. Another agent's measurement was not disturbed.

**Meaning versus measurement, stated first because that is what was asked.**

| Item | Meaning change? | Measurement change? |
|---|---|---|
| **LR3.5**'s clause — the conjunction, the exemptions, the existential quantifier over scroll positions | **No.** Word for word as §8.1 published it and as Addendum B left it. | No. |
| **LR3.5's *"Measured at"* bullet** — the sweep domain | **No — it is restated, not widened.** The bullet already enumerates the cell axes (viewport, theme, route, storage state). **C2.4 adds the ad-slot configuration to that enumeration**, which is a statement about *where the existing clause is evaluated*, not about what it requires. | **Yes.** A cell is green only when the **narrowest shipped configuration** is green. |
| **LR3.5a** — the three tiers | **No.** Still provisional, still no failing subject. | **Yes, in one direction nobody had named**: the ads state can move a surface **between tiers**, not only along the width axis. **C3.3.** |
| **F1** | **No.** Discharged as a breach, exactly as **B6.2** ruled. Neither measured document breaches it. | No. |
| **D-5 — the attribution** | **Settled as a question of subject.** The subject is the shipped document (C2). | **⚠ SETTLED as a measurement too, by C11** — `frontend-dev`'s T1d landed mid-session and reads `found: false`. C6.2's *"still open"* is corrected there; C6.3's pre-registered value is **confirmed to the tenth of a pixel**. |

---

## C1 — Three premises I re-derived before ruling, because a ruling adopted on a premise is a ruling about the premise

`plan.md` §3E A5.2 hands me a table of five rows. I opened each source it names. **Two of the five
rows are wrong, and one of this amendment's stated mechanisms is incomplete.** None of the three
changes `tech-lead`'s conclusion — all three make it stronger — but a ruling that travels on a false
premise is the defect `AGENTS.md` §5 names, and the premise is what travels.

### C1.1 — **`.env` is not committed.** Correction to `plan.md` §3E A5.2, row 1.

A5.2's table reads *"`.env` (committed) | `false` | the default build of this product"*. Measured:

```
git ls-files | grep -i env   →  .agents/memory/lessons/013-…md, .env.example, next-env.d.ts
.gitignore:19-26             →  "# We block all .env files but allow .env.example"
                                .env  /  .env.local  /  …  /  !.env.example
```

**`.env` is untracked and explicitly ignored.** The file read on this machine — `NEXT_PUBLIC_GA_ID=G-5BP2MQK9TG`,
`NEXT_PUBLIC_ADSENSE_ID=ca-pub-8745764662929625`, `NEXT_PUBLIC_ENABLE_ADS=false` — is **one
developer's local environment**, not a committed statement of anything. The only committed statement
is **`.env.example`**, which is *what a clone is told to run*, and a clone is not the deployed product.

**The consequence is the one that matters for the question as it was put to me: nobody in this tree
has read the production environment.** The deployed Vercel build's `NEXT_PUBLIC_ENABLE_ADS` is set in
Vercel's project settings, which are not in this repository and which I did not fetch. So *"the page
the default build ships"* is, today, **an unread document** — and the local `.env` carries a **real
publisher ID** (`ca-pub-8745764662929625`), which is evidence of intent to serve ads in production
and against `false` being the production value. **I rule the subject below without needing to know
which it is**, and that is deliberate: a rule whose subject depends on a value nobody has read is a
rule that would have to be re-ruled the day someone reads it. **Open question Q8** (C9) asks the
human for the production value, and it is a question about *which cell is narrowest*, never about
*what LR3.5 means*.

### C1.2 — **The harness's publisher ID is a placeholder.** The measured ads-on page is a **third** document.

`playwright.config.ts:64-69`:

```
NEXT_PUBLIC_GA_ID: "G-TEST12345",
NEXT_PUBLIC_ENABLE_ADS: "true",
NEXT_PUBLIC_ADSENSE_ID: "ca-pub-0000000000000000",
```

`ca-pub-0000000000000000` is **not** the publisher any user is ever served
(`ca-pub-8745764662929625`). `components/organisms/ad-manager.tsx:15` interpolates it straight into
the `adsbygoogle.js` URL and `components/atoms/google-ad.tsx:29` into `data-ad-client`. So the
100 → 390 px creative `reports/build.md` measured is **whatever Google returns for an invalid client
id**, under a test fill path, from this machine's network.

**So the question as posed offers two documents, and there are three.** Ads-off; ads-on with the real
publisher (**never measured, by anyone, in any session**); and ads-on with a placeholder publisher
(the only ads-on document on the record). The third is the one every `maxScroll` of **2347**, **2331**,
**2637** and **1780** in `reports/build.md` was taken in. It is **nobody's page.**

### C1.3 — **Ads-on is more permissive in width and is *not* monotone in tier.** Completion of A5.3's mechanism.

A5.3 states: *"the 132 px sits below every disclosure, so ads-on raises `maxScroll` and widens every
clearing window by 132 px."* I verified the first half and found the second half incomplete.

**The mechanism, with every operand named and each carrying its source** — §8.1's own closed form,
which B6.1 already re-derived against the known-red row:

```
I      = [ docTop + h − navTop ,  min(docTop − headerBottom, maxScroll) ]
maxScroll(adHeight) = maxScroll_adsOff + 32 + adHeight
                      32       = AdManager wrapper `pb-8`   (ad-manager.tsx:23)
                      adHeight = GoogleAd `<ins>` border box (google-ad.tsx:28, floor `min-h-25` = 100)
```

**Moved the operand and checked both candidate values against measurements taken for another
purpose** — this is the mechanism test, not a coincidence at one calibration point:

| `adHeight` | predicted `maxScroll` on `/`, `copyB` | measured | source |
|---|---|---|---|
| 0 (ads off) | 2215 | **2215** | `reports/build.md` env-toggled control; `design.md` §17.17 |
| 100 (CSS floor, early settle) | 2215 + 132 = **2347** | **2347** | `reports/build.md`, four independent loads |
| 390 (creative resolved, ~2 s) | 2215 + 422 = **2637** | **2637** | `reports/build.md`, late settle |

**Three points, one formula, no free parameter.** The mechanism is identified, not coincidental.

**And now the half A5.3 does not have.** `I`'s upper bound is a `min`, so `maxScroll` stops being the
binding operand once it passes `docTop − headerBottom`:

- On `/`, `copyB`: `docTop − headerBottom = 2841.4 − 65 = 2776.4`.
- `maxScroll > 2776.4` ⟺ `adHeight > 2776.4 − 2215 − 32 = **529.4 px**`.
- Above that threshold DS1 P4's interval stops being anchored at `maxScroll` and becomes a **free
  interval** — **LR3.5a Tier 1 → Tier 2**, and Tier 2 is the tier that carries a floor.
- Its width there is `2776.4 − 2197.1 = 579.3 px`, so it **still passes** the 1 CSS px floor. **This
  is a mechanism, not a finding.** No creative above 390 px has been measured and I credit none
  (lesson **050**).

**Why it is in the ruling anyway.** `data-ad-format="auto"` with `data-full-width-responsive="true"`
(`google-ad.tsx:31-32`) and `min-h-25` as a **floor with no ceiling** means `adHeight` is chosen by
**AdSense**, per impression, per locale, per auction. 529.4 px is inside the range of standard
responsive units. **The tier of a legal clause's subject is therefore, in the ads-on document, an
output of an ad auction.** That is the fact C2 turns on.

---

## C2 — The ruling

> ### LR3.5's subject is the document the reader's browser renders, and where the product can ship more than one such document, **the clause binds in every one of them and is verified in the narrowest.**
>
> **Neither of the two documents the question offers is the subject.** Both are proxies. The shipped
> document is the subject; ads-off is the narrowest *measured* proxy for it and is therefore the cell
> a verdict is taken in. The harness's document is not the subject and cannot become one.

Four reasons, in the order of their weight. Only the third is new; the first two are my own standing
rules applied to a cell axis instead of to a surface.

### C2.1 — LR3.5's own text already says this, and always did

§8.1's clause reads: *"there exists a scroll position, **reachable in the document as rendered**, at
which…"*. **The document as rendered** — to a reader, in a browser, by this product. Not *the
document the suite builds*. A harness document is a rendering of the product only to the extent the
two documents coincide; where a declared build-time input makes them differ by **132 px of flow
below every disclosure**, they do not coincide, and the clause's own words select the reader's.

**This is why C2 is a measurement ruling and not a meaning ruling.** I am not adding an axis to
LR3.5. I am naming a cell axis the sweep already needed and did not enumerate — exactly the defect
lesson **048** names, arriving one level up: a rule evaluated at the points it was calibrated at
rather than across the domain its subject actually inhabits.

### C2.2 — The falsifiability test, applied to the guard rather than to the product

My own rule at the point of the verdict: **name the state in which this check would have printed
something else.** Run it on the LR3.5 e2e guard as `playwright.config.ts:66` pins it:

- It **can** print red — DS1 P4's interval can empty out under ads-on, and §8.1's published table
  is the state where it does. So it is **not vacuous**, and I do not call it so. That distinction is
  the whole difference between this finding and the three 0/3 greens of Addendum B1.1.
- But there is a **shipped state it can never enter.** `webServer.env` is unconditional — not read
  from a `.env`, not keyed on `CI`, not overridable per project. **No run of this suite, on any
  machine, in CI or locally, has ever evaluated LR3.5 against the ads-off document.**

**A guard that cannot enter a shipped state is not evidence about that state**, whatever its prose
says. It is **calibrated off-subject**: correct about a document, incomplete over the domain of
documents. That is a lesser fault than vacuity and it is stated as the lesser fault.

### C2.3 — The decisive one: the harness document's geometry has an operand this repository does not own and cannot bound

C1.3 established that `adHeight` — and therefore `maxScroll`, and therefore the upper bound of every
`maxScroll`-anchored clearing interval on the page, and therefore, above 529.4 px, the **LR3.5a tier**
of DS1 P4 — is set by AdSense at request time, against a publisher id
(`ca-pub-0000000000000000`) that is not the product's, over a network path
(`pagead2.googlesyndication.com`) that a network-isolated runner would not have at all.

Three documents, then, with three different heights: 100 px on an isolated runner, 390 px on this
machine today, unbounded in principle. **A clause whose verdict moves with an ad auction is not
falsifiable by anything this squad can run**, and a rule that cannot be falsified by its own reviewer
is not a rule. **A document whose tail height is a third party's output cannot be the subject of a
legal clause.** The ads-off document's height is determined, to the tenth of a pixel, by files in
this repository. That is the document a legal verdict can be taken in.

### C2.4 — The restatement, and it is deliberately general

LR3.5's *"Measured at"* bullet is restated. **The clause above it is untouched.**

> - **Measured at 390×844 and 1440×900, both themes, both routes, every storage state `spec.md`
>   AC1 defines — and in every ad-slot configuration the product can ship.** A cell is green only
>   when the **narrowest** shipped configuration is green. Where the configurations have been
>   measured, the narrowest is the one whose clearing interval for the cell's tightest surface is
>   smallest, or whose tier is lowest; where one has not been measured, **the cell is unmeasured, not
>   green** (Addendum B1.1's third state).

**Stated as "the narrowest", never as "ads off".** If the ad slot ever moves **above** a disclosure —
one line in `app/layout.tsx`, moving `<AdManager />` before `{children}` — then ads-**on** becomes the
narrower document and this same bullet selects it without being rewritten. A rule that named
`NEXT_PUBLIC_ENABLE_ADS=false` would have to be re-ruled that day. **That is the state in which this
ruling comes out the other way, and it is named because a rule with no such state was not ruled.**

**Every geometric number in this spec continues to carry its ads state, per `plan.md` A5.3.** That
requirement is unchanged and this ruling is why it exists: recorded beside the number, never
substituted for it.

---

## C3 — What the ruling costs each existing clause, checked one at a time rather than asserted

`plan.md` A5.6 checks this task by task. I checked it **clause by clause**, because the sibling
clauses are mine and a ruling that moves one of them silently is the defect this gate exists to
catch. Every LR clause in force, with the ads operand moved against it:

| Clause | Operand the ads slot could move | Verdict |
|---|---|---|
| **LR1** — body `width ≥ 320` at 390 | The wrapper is `mx-auto w-full max-w-3xl px-4`, a **static** sibling after `#main-content`; it sets no width on the content column. `<ins>` carries `overflow-hidden`. | **Unaffected.** |
| **LR2a** — chrome ≤ 32 px on the surface | Reads the disclosure's own ancestors. The ad slot is a sibling of `#main-content`, not an ancestor of any surface. | **Unaffected.** |
| **LR2b** — ≥ 40 cpl, and non-regression | Reads rendered line boxes at the surface's own width. The 358 px content column at 390 does not move with the ad slot. | **Unaffected.** |
| **LR3**-as-corrected — the four presence bullets | `display`/`visibility`/`opacity`/`[hidden]`/`aria-expanded`/`.sr-only` on the surface. Nothing in `ad-manager.tsx` or `google-ad.tsx` touches any of them. | **Unaffected.** |
| **LR3.5** — containment ∧ non-intersection | **`maxScroll` moves** (C1.3), and only `maxScroll`. `docTop` and `h` are identical to the decimal in both environments — 2841.4 / 121.7 — which is the signature of a delta rendered **after** `{children}`, and `reports/build.md` measured exactly that. | **Domain restated, clause unchanged (C2.4).** |
| **LR3.5a** — the three tiers | **Tier can move**, above `adHeight` 529.4 px on `/` (C1.3). Not measured; a mechanism, not a finding. | **Clause unchanged; C3.3 below.** |
| **LR4.2 / LR4.4** — the consent surface's controls and its 336 px floor | The consent surface is `fixed`, viewport-relative, mounted by `<CookieConsent />` **after** `<AdManager />` in `app/layout.tsx:66-67` but contributing **zero** to `scrollHeight` — `reports/build.md` confirms `footerBottom`/`mainBottom` unchanged between settle points in both copies. | **Unaffected.** |
| **LR6.1** — the frame-index subtraction | Both the claim and its disclosure are inside `#main-content` and commit in the same render; `AdManager`'s script injection happens in a `useEffect` after that commit. The subtraction's two operands move together or not at all. | **Unaffected.** |

**Eight clauses, eight rows, one moved operand.** Only LR3.5 and LR3.5a see it, and only through
`maxScroll`. **Nothing in this ruling reaches any other clause**, and saying which clauses it does
*not* reach is what keeps the restatement from being read as a widening.

### C3.1 — One axis I did **not** sweep, named as unswept rather than asserted clear

**Does the ads-on document introduce any `fixed` or `sticky` box?** `AdManager`'s wrapper and
`GoogleAd`'s `<ins>` are both static — that I read. But `<ins class="adsbygoogle">` is a mount point
for a **third-party subtree**, and AdSense's anchor and vignette formats render `position: fixed`
overlays. This slot declares `data-ad-format="auto"` (an in-page format), which does not request
them; it does not follow that `adsbygoogle.js` cannot inject one.

**I did not measure it, so I assert nothing** — neither that it happens nor that it cannot. What I
record is the shape: **if it ever does, ads-on becomes *more* restrictive for LR3.5's
non-intersection conjunct, not less**, and A5.3's *"strictly more forgiving"* would be false in a
second direction. That is one more operand this repository cannot bound, and it argues the same way
C2.3 does. **Owner: whoever takes Q8 (C9) or spec `0014`. Not a finding; an unswept axis, named so
the next reader can tell *not measured* from *measured clear*.**

### C3.2 — The early-settle rule is a consequence of this ruling, not a separate convention

`plan.md` A5.4(i) makes the **early** read binding for geometry. Under C2 that is not a house style:
the early read is the one closest to the **CSS floor** (`min-h-25`, 100 px), which is the only part
of the ads-on tail this repository actually declares. **The 290 px above it is the third party's and
is not the product's document at all.** A5.4(i) is upheld, and its reason is restated as this one.

### C3.3 — LR3.5a stays provisional, and C1.3 does **not** give it a failing subject

My own rule: a new axis clause is trusted only once it has a failing subject. **The Tier-2 crossing
at `adHeight` > 529.4 px is not one**: it is unmeasured, and at the crossing the interval is 579.3 px
wide, which clears the 1 CSS px floor by three orders of magnitude. **LR3.5a decides no verdict
alone, today, exactly as B1.5 and B6.4 left it.** What C1.3 adds is that the ads state is a *second*
way to produce a Tier-2 subject, beside `design.md` §17.4's relocated DS1 P2 at 1440 — so **W15's
Tier-2 sweep must record the ads state of the cell it swept**, per A5.3, or a "none" answer is a
statement about one configuration presented as a statement about the page. B6.4's unit finding
(`minor`, `qa-engineer`, W15) is unchanged.

---

## C4 — What this makes of a guard calibrated in the harness's document

`tech-lead` asked this directly, so it is answered directly and with the severity it actually carries.

**It is not invalid, it is not vacuous, and it is not wasted.** Its greens are true statements about
the ads-on document, and the ads-on document is a state the product can ship. It discriminates: C2.2
names the state it prints red in, and A5.1 proved the containment conjunct is live in the closed form
`tests/e2e/support/reachability.ts` now implements. **T1a–T1c's work stands.**

**What it cannot do is carry a green across to the shipped document by argument.** The transfer would
need the premise *ads-on is strictly more forgiving*, and C1.3 shows that premise is true of the
**width** and unproven of the **tier**, with the deciding operand owned by a third party. A green
obtained under a strictly-more-forgiving premise is only as good as the premise, and this one is
half-measured.

**So: incomplete over the domain, and its greens are non-transferable.** In the vocabulary this
spec has been using — *a predicate evaluated against a subject that is not the one the rule is
about*, which is what A5.3 already called it. I confirm that classification and add the two things it
was missing: the guard is **not** thereby vacuous, and it is **not** made transferable by the
132 px having been attributed.

**Not a rejection ground for this spec**, and the reason is the same one §12 gave F2a/F3/F4:
`playwright.config.ts` is outside this spec's file list, ads-on has its own stated reason (the suite
asserts ad behaviour), and **no reader is currently unprotected** — `copyB`'s ads-off cell reads
`[2197.1, 2215]`, non-empty, so the shipped page clears DS1 P4 too and **F1's discharge is robust in
both environments, exactly as B6.2 ruled and A5.3 observed.**

> **Finding F5 — `serious`, routed, not a patch, not a rejection.**
> **What.** `playwright.config.ts:66` pins `NEXT_PUBLIC_ENABLE_ADS: "true"` unconditionally, so the
> LR3.5 e2e guard has never evaluated the document the product ships. The shipped page carries
> **132 px less flow below every disclosure** (measured: `maxScroll` 2215 vs 2347 on `/` at 390), and
> DS1 P4's whole compliance margin there is **17,9 px**.
> **What the rule requires.** LR3.5, §8.1 as restated at C2.4: evaluated in the narrowest shipped
> ad-slot configuration.
> **Worked case that exposes it.** `/`, 390×844, dark, storage empty, consent pending. Ads-on:
> `[2197.1, 2347]`, width 149,9. Ads-off: `[2197.1, 2215]`, width **17,9**. Same head, same surface,
> same formula; the guard sees only the first. A regression consuming 20 px of flow below the footer
> would be **green in every suite run and red on the shipped page.**
> **Owner.** `tech-lead`, to route: either a second LR3.5 project in `playwright.config.ts` with
> ads off, or the LR3.5 describe reading the ads state and asserting the shipped configuration.
> **I do not choose between them — that is test design and it is not mine.**
> **Trigger.** The next spec that opens `playwright.config.ts` or `tests/e2e/first-screen-reachability.spec.ts`,
> **or** any spec that changes flow height below the footer in `components/organisms/calculator-views.tsx`
> — whichever comes first. **This is F1's own re-open trigger seen from the instrument side** (B6.2
> names the product side), and the two are the same 17,9 px.

---

## C5 — Which environment a G6 verdict is taken in

**Ads off**, and the rule is C2.4's: the **narrowest shipped configuration**, which today is ads-off
because the slot sits below every disclosure. Concretely, for **W14**, **W15** and **W16**:

1. **The LR3.5 verdict row for each cell is read from the ads-off build.** That is the number that
   decides `pass`/`reject`.
2. **The ads-on run is retained and reported beside it**, with `NEXT_PUBLIC_ENABLE_ADS` **and**
   `NEXT_PUBLIC_ADSENSE_ID` as the build saw them (A5.3, extended to the publisher id by C1.2 — a
   placeholder publisher is a different document from a real one and the field must say which).
3. **Where the two disagree on any verdict, the ads-off row is the verdict and the disagreement is
   the finding**, reported with both numbers.
4. **A cell measurable only ads-on is unmeasured, not green.** That is B1.1's third state and my own
   standing rule: a surface I cannot reach is a finding about its reachability, never an arithmetic
   substitute for the reading.
5. **At G9, against the deployed preview, the question does not arise in this form** — the preview
   *is* the shipped document, whatever Vercel sets. **What G9 must do instead is read
   `NEXT_PUBLIC_ENABLE_ADS` off the deployed page** (the presence, `display` and border-box height of
   `ad-manager.tsx`'s wrapper and its `ins.adsbygoogle`) **and record it**, because that reading is
   the answer to Q8 and it settles which local configuration is the preview's proxy. Added to **W14**.

**If instead the subject were the measured document — what protects the reader of the shipped one?**
**Nothing, and this is the whole of the answer.** Under that reading the ads-off page — 132 px
shorter below `F-1`, compliance margin 17,9 px — is evaluated by no instrument in this repository,
in this spec or in any other. The only reason a reader is protected today is `copyB`'s ads-off cell,
and **that cell was taken as a control for an attribution question, not as a compliance
measurement** (`reports/build.md`, the A4.3 env-toggled control run). A clause protected by a run
taken for another purpose, by an agent pursuing a different question, is protected **by accident**,
and it stops being protected the moment nobody happens to need that control again. That is not a
defensible reading of a clause whose substance is *the user can bring the citation into view*, and it
is why C2 rules the other way.

---

## C6 — D-5: the attribution, and why the subject question **is** the attribution

### C6.1 — The two environments give **opposite** attributions. That is the point.

| `copyA` (T3 reverted), DS1 P4 on `/`, 390×844 | `maxScroll` | `I` | width | what it attributes |
|---|---|---|---|---|
| ads **on** — **measured**, `reports/build.md` | 2331 | `[2213.1, 2331]` | +117,9 | `0003`'s footer rewrite alone discharged F1 → **T3 is not F1's remedy** |
| ads **off** — **⚠ MEASURED AFTER THIS TABLE WAS WRITTEN, see C11** | **2199** | **`[]`** | **empty, −14,1** | **T3 IS F1's remedy** |

`lower = docTop + h − navTop = 2857.4 + 121.7 − 766 = 2213.1`;
`upper = min(docTop − headerBottom, maxScroll) = min(2792.4, maxScroll)`.
`docTop` 2857.4 and `h` 121.7 are `copyA`'s own measured values (`plan.md` §3E A5.2), not `copyB`'s.

**So the environment question was never cosmetic: it selects the attribution.** `tech-lead` said the
attribution flips on it; it does, and C2 rules that it flips **towards the unmeasured row.**

### C6.2 — **D-5 stays OPEN**, and T1d is the right cell

> **⚠ CORRECTED BY C11, same run.** T1d was delivered while this addendum was being written and
> `reports/build.md` now carries its numbers. **D-5 is SETTLED: `copyA` ads-off is empty, `found: false`,
> and T3 IS F1's remedy in the shipped document.** C6.2's reasoning — that the shipped document's
> `copyA` cell is the one that attributes — **stands and is what C11 applies.** Read C6.2 for the
> criterion, **C11 for the verdict.**

C2 settles *which document attributes*; it does not produce the number. The shipped document's
`copyA` cell has never been taken, and **A4.3 rule 4's ban on crediting a derived value stands** —
attributing a delta names the operand that moves the number, never what the number reads. **T1d as
`plan.md` §3E writes it takes exactly the cell my ruling selects, and I request no change to it and
no additional instrument.**

**Nothing else moves.** F1 stays **discharged as a breach** (B6.2) — `copyB`, the head that ships,
clears DS1 P4 in **both** environments. `legal.md` **A1.7** is untouched. **T5 stays unblocked**, as
A5.6 rules, because M-B is a precondition of M-O on **LR4.2a's** attainability axis and not on F1's.
**This addendum blocks no task.**

### C6.3 — A **pre-registered** expected value for T1d, published before the measurement and explicitly not credited

> **⚠ CONFIRMED BY C11, same run.** The measurement landed and reads `maxScroll` **2199**, `ranges`
> **`[]`**, `found: false` — the pre-registration below, to the digit. It is left **unedited** so that
> the order is visible: the expectation was written before the number was read, which is the only
> thing that makes it evidence rather than a gloss.

Two independent mechanisms, both already verified against measured points, predict the same number.
Publishing it **before** the run is what makes T1d falsifiable; publishing it after would make it
decoration.

| Derivation | Operands, each with its source | Predicted `copyA` ads-off `maxScroll` on `/` |
|---|---|---|
| **(i) the ad slot** | `copyA` ads-on 2331 (measured) − `pb-8` 32 (`ad-manager.tsx:23`) − `min-h-25` 100 (`google-ad.tsx:28`) | **2199** |
| **(ii) T3 itself** | `copyB` ads-off 2215 (measured) − T3's net flow delta: `mb-8` **+32** on the footer (`plan.md` T3 / M-B) and `pt` `*8`→`*4` **−16** below `sm` (T3 / D1) = **+16** | **2199** |

**Two derivations, no shared intermediate, same value.** They also reconcile the operand that looked
inconsistent in the record and is not: `#main-content`'s computed `padding-bottom` reads **64 px** in
`copyB` while `design.md` §17.3 speaks of a reserve *"raised from 64 to 96"* — because **M-B put the
extra 32 on the footer's `mb-8`, not on the padding**, exactly as `plan.md` T3 says in its own words.
**No contradiction; nothing to route.** It is recorded because I nearly reported one, and checking
before writing is the rule that caught it.

> **Pre-registered expectation, NOT a finding and NOT credited** (A4.3 rule 4, lesson **050**):
> `copyA` ads-off `I` = `[2213.1, 2199]` — **empty, by 14,1 px** — `found: false`, which is A3.3's
> **(a)** shape and attributes F1's discharge to **T3**.
>
> **What makes this worth writing down is the other outcome.** If T1d reads `found: true`, then two
> independent derivations, each already confirmed against measured points, are **both** wrong — and
> *that* is a finding about the instrument or about an operand nobody has named, far larger than the
> attribution it was run to settle. **`frontend-dev` pastes the measurement and credits no branch**
> (T1d's own Done when); **`tech-lead` records the branch; I record the attribution** in a one-line
> amendment here, at the gate that ruled it.
>
> **Neither outcome re-opens F1, and neither blocks anything.**

---

## C7 — **CORRECTED, same run: what this ruling surfaced is NOT a new finding.** `0011` **F1** already holds it

> **⚠ This section was first written as a new finding, `F6`. I then checked whether it was one — my
> own rule that a finding which recurs is rarely one nobody got around to fixing — and it is not.
> `0011` **F1** already found, in its own words, that *"the ads path reads no consent at all"*, and
> `0014` **L4** is the open legal question about it, routed to `labor-law-analyst` at `0014`'s own
> G2. The correction is marked rather than substituted, and the finding is WITHDRAWN as a finding
> and recorded as a confirmation with one sentence added to it.**

Ruling that the ads-on page is *a document the product can ship* obliged me to ask whether it is a
document the product **may lawfully** ship. It is not my scope to settle, and it is not this spec's,
but the question was created by my own ruling and leaving it unwritten would be the silence
`PRODUCT.md` §4 forbids.

> ### Confirmation of `0011` **F1**, not a finding of this gate. **Severity is `0011`'s.**
>
> **What I measured, and it agrees with `0011` F1.** `components/organisms/analytics-wrapper.tsx:12`
> gates GA on `readTelemetryConsent() === true` — the fact **§5** of this document relied on to let
> the consent surface leave the first screen. `components/organisms/ad-manager.tsx:12-19` does not:
> its `useEffect` appends `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=…`
> to `document.head` under `if (!adClient || !enableAds) return`, and **`lib/consent.ts` is not
> imported anywhere in the ad path** — the same `git grep` `0014` § Decision 2 already ran and
> reported as returning no rows.
>
> **The one sentence this gate adds, which is the only part that is new.** C2 ruled the ads-on page
> is *a document the product can ship*. `0011` F1's subject is therefore **not latent**: it is the
> state a build with `NEXT_PUBLIC_ENABLE_ADS=true` delivers to every user, and `reports/build.md`
> measured that reach happening for real from inside this repository's own test run (100 → 390 px at
> ~2 s, live to `pagead2.googlesyndication.com`). **`0014` L4 asks whether it breaches anything
> *today*; C2 narrows what *today* means — it means "in whichever configuration production ships",
> which is **Q8**, and it means the answer is not deferred by the flag being `false` in one
> developer's untracked `.env`.**
>
> **Owner: unchanged — `0011` **F1**, with `0014` **L4** as its open legal question and
> `tech-lead` owning the sequencing `0014` § Decision 2 already routed to him.** `0010` opens
> nothing, routes nothing new, and is **not** rejected on it. **`plan.md` A5.4(ii)'s CI half stays
> where it is**; `0015` § Scope ruling already places the egress question there and bounds `0014`'s
> override to `ad-manager.tsx:10-19`, which is exactly this path. **Three specs already hold this
> between them and none of them needed a fourth entry.**

> **The gap that would have kept a severity off it, stated because it binds me at `0014` L4 too.**
> **planalto.gov.br was unreachable from this session** — `ECONNRESET` on four attempts across
> `l13709.htm`, `L13709.htm` and `l13709compilado.htm`. §2 R3/R4 of this document transcribed
> **art. 8º** and **art. 9º** of Lei nº 13.709/2018 against that source at G2 run 1, and a
> `WebSearch` restricted to `planalto.gov.br`/`gov.br` reproduced art. 8º's substance this session.
> **But art. 7º — the bases legais, the unit that decides whether an ad script needs consent at all —
> I did not fetch in this session and therefore do not state.** *If you cannot find a primary source,
> you do not write the number; you write the gap.* **`0014` L4 cannot be ruled until art. 7º and
> ANPD's cookie guidance are read from a primary source**, and that is recorded here as a
> precondition on my own future gate, not as an obligation on anyone at `0010`.

---

## C8 — What changed, in one table, so a downstream agent reconciles nothing by hand

| Written in | Claim | Status after this addendum |
|---|---|---|
| `plan.md` §3E **A5.2**, row 1 | *"`.env` (committed)"* | **CORRECTED. `.env` is gitignored** (`.gitignore:20`) and untracked. The production value is **unread by anyone**. C1.1, **Q8** |
| `plan.md` §3E **A5.2** | Two documents: ads-on and ads-off | **CORRECTED to three.** The harness's publisher is `ca-pub-0000000000000000`; the **real** ads-on document has never been measured. C1.2 |
| `plan.md` §3E **A5.3** | *"ads-on … widens every clearing window"*, *"strictly more forgiving"* | **COMPLETED.** True of the **width**; **not monotone in LR3.5a tier** above `adHeight` 529,4 px, and unproven for the non-intersection conjunct (C3.1). C1.3 |
| `plan.md` §3E **A5.3** | The binding measurement environment is ads off | **UPHELD, and re-founded.** Not *ads off* but **the narrowest shipped configuration**, which is ads-off today and would not be if the slot moved above a disclosure. C2.4 |
| `plan.md` §3E **A5.4(i)** | Early settle point binding for geometry | **UPHELD**, with its reason restated: the early read is the CSS floor, the only part of the tail this repo declares. C3.2 |
| `plan.md` §3E **A5.5** | D-5 is `labor-law-analyst`'s | **ANSWERED as to the subject (C2); OPEN as to the number (C6.2).** T1d unchanged, no instrument added |
| **B6.2 / F1** | F1 discharged as a breach; attribution open | **STANDS, both halves.** Neither measured document breaches; the attribution is the cell T1d takes |
| **B1.5 / B6.4 / LR3.5a** | Provisional, no failing subject | **STANDS.** C1.3 adds a second route to Tier 2 and no failing subject. W15 must record its cell's ads state |
| **§8.1 LR3.5** clause | The conjunction and its exemptions | **UNCHANGED, word for word.** Only the *"Measured at"* bullet is restated (C2.4) |
| **AC5's exemption list** | EMPTY | **STANDS. This gate still mandates no string.** |

---

## C9 — Open questions for the human, added to §16, A6 and B4

| # | Question | Why it is the human's |
|---|---|---|
| **Q8** | **What is `NEXT_PUBLIC_ENABLE_ADS` in the Vercel production and preview environments?** It is not in this repository (`.env` is gitignored), and the local `.env` carries a **real** publisher id (`ca-pub-8745764662929625`), which points the other way from `.env.example`'s `false`. | Only the human can read the Vercel project settings. **It does not change C2's ruling** — the rule is *the narrowest shipped configuration*, whichever that is — it tells the squad **which local build is the preview's proxy**, and it is the trigger condition for F6. G9 can also answer it by measurement (C5.5). |
| ~~**Q9**~~ | ~~Should `adsbygoogle.js` load before the user answers the consent banner?~~ | **WITHDRAWN, same run.** It is already `0014` **L4**, already routed to `labor-law-analyst` at `0014`'s G2, on a finding `0011` **F1** already holds. **Opening it here would have been a fourth entry on a question three specs already carry.** What survives from it is a **precondition on my own future gate**, recorded at C7: **`0014` L4 may not be ruled until LGPD art. 7º and ANPD's cookie guidance are read from a primary source** — unreachable this session. **Q3's ruling — that the consent surface may legally leave the first screen — rested on GA's gating and is untouched**, because nothing here changes what GA does. |

**Q1–Q7 stand unchanged.**

---

## C10 — Verdict

> **`pass`.**
>
> - **LR3.5's subject is the document the reader's browser renders.** Where the product can ship more
>   than one, **the clause binds in all of them and is verified in the narrowest** — ads-off today,
>   because the slot sits below every disclosure, and stated generally so it survives the slot moving.
> - **This changes what LR3.5 MEANS: not at all.** Its clause is word for word as §8.1 published it.
>   It changes **where it is measured**: the ad-slot configuration is a **cell axis**, listed beside
>   route, viewport, theme, storage and consent, and it was missing from the enumeration.
> - **The harness's guard is calibrated off-subject** — incomplete over the domain, greens
>   non-transferable — **and it is not vacuous**, which is the distinction that keeps the word
>   meaningful. **F5**, `serious`, routed to `tech-lead`, with F1's own 17,9 px as its trigger.
>   **Not a rejection ground for `0010`**: `playwright.config.ts` is outside this spec's file list and
>   **no reader is unprotected today**, because `copyB` clears DS1 P4 ads-off at `[2197.1, 2215]`.
> - **D-5 is SETTLED, on both halves** (C6 as amended by **C11**). The subject is the shipped
>   document, and the shipped document's `copyA` cell — **measured by T1d mid-session** — reads
>   `maxScroll` **2199**, `ranges` **`[]`**, `found: false` on both routes. **T3 IS F1's remedy**;
>   `0003`'s footer rewrite alone does **not** discharge it. `design.md` §17.3's causal claim is
>   **confirmed with its counterfactual measured**, and B6.2's warning against recording it unmeasured
>   is **discharged**. The pre-registration of C6.3 was reproduced to the digit.
> - **F5 is no longer hypothetical.** The ads-on reading of the very same cell,
>   `[2213.1, 2331]` `found: true`, attributes F1's discharge to `0003` — **the opposite, and wrong,
>   answer.** The harness's document did not merely widen a margin; it **inverted a causal
>   attribution**, which is the thing `AGENTS.md` §5 says travels. **C11.3.**
> - **F1 stays discharged as a breach. A1.7 is untouched. T5 stays unblocked. This addendum blocks
>   nothing.**
> - **C7 opened no finding.** What this ruling surfaced about the ads path is already `0011` **F1**,
>   with `0014` **L4** as its open legal question — **checked rather than assumed, and withdrawn at
>   the gate that drafted it.** What survives is a precondition on my own future gate: **`0014` L4
>   may not be ruled until LGPD art. 7º is read from a primary source**, which planalto.gov.br's
>   `ECONNRESET` prevented this session. **Q8** to the human; **Q9 withdrawn**.
> - **No table, no bracket, no rate, no rounding rule, no order of operations.** §13 and §14 unchanged
>   and still empty. **No string mandated, shortened, split or reworded; AC5's exemption list is still
>   EMPTY.**

**Next: `frontend-dev` on `T1d` (`plan.md` §3E), then `tech-lead` records the branch and routes the
one-line attribution back here.** `tech-lead` also routes **F5**. **Nothing else is routed** — C7's
subject is already held by `0011` **F1** and `0014` **L4**.


---

## C11 — Reconciliation: **T1d landed while this addendum was being written. D-5 is settled.**

`frontend-dev` delivered T1d mid-session (`reports/build.md`, the section titled *"the one cell that
decides the attribution"*, appended after the reading C6 was drafted against). **A measurement
outranks a classification, and the classification loses** (`AGENTS.md` §5). C6 is amended inline
above, at the gate that wrote it, with the markers visible rather than the text silently substituted
— the same discipline B6 used, and for the same reason.

**No browser was run for this section either.** I read the paste and did the arithmetic.

### C11.1 — I re-derived T1d's own numbers before reading its verdict

C6.3 published an expectation before the run. Here is the run, against it:

| Quantity, `/` at 390×844, `copyA`, ads off | C6.3 pre-registered | T1d measured | agrees |
|---|---|---|---|
| `maxScroll` | **2199** | **2199** | ✓ exact |
| `I` lower bound = `docTop + h − navTop` = `2857.4 + 121.7 − 766` | **2213.1** | **2213.1** (printed as the nav's blocked interval `(2029.4, 2213.1)`) | ✓ to 0,1 px |
| `I` | `[2213.1, 2199]` — **empty by 14,1 px** | `ranges` **`[]`**, `found: false` | ✓ |
| ad wrapper / `ins.adsbygoogle` present | absent (the build's own guard) | **false / false** | ✓ |

**And the same on `/custo-da-hora`, derived here and not taken from the paste's conclusion:**
`docTop` 2290.6 + `h` 121.7 − `navTop` 766 = **1646.3**; upper = `min(2290.6 − 65, 1632)` = **1632**;
`I` = `[1646.3, 1632]` — **empty by 14,3 px**, matching `ranges: []`, `found: false`.

**Three independent derivations now agree on one number** — the ad-slot arithmetic, T3's own flow
delta, and the running page — and **the only one that counts is the third.**

**D-1 is satisfied for this cell in the way that counts**, and I checked it rather than assumed it:
the probe prints **red on the cell my ruling predicted red** *and* **green on the control**
(`copyB` ads-off, `[2197.1, 2215]`, `found: true`, reproducing `3059`/`2215` integer-exact against
`design.md` §17.17 and the A4.3 control). **Two rows, two different answers, from one instrument in
one run.** That is the state in which this check would have printed something else, and it is why
T1d's `false` is readable as evidence.

### C11.2 — **D-5 — ruling**

> **`copyA` ads-off is empty on both routes. Branch (a). T3 IS F1's remedy.**
>
> - **With T3** (`copyB`, the head that ships): `[2197.1, 2215]`, `found: true`. **Clears.**
> - **Without T3** (`copyA`, this spec's own remedy reverted): `[]`, `found: false`. **Breaches.**
> - Both in the **shipped** ad-slot configuration, which C2 rules is the subject.
>
> **So `0003`'s footer rewrite alone does NOT discharge F1**, and `design.md` §17.3's *"because M-B
> (T3, in source) raised the bottom reserve from 64 to 96"* is **confirmed — with its counterfactual
> now measured.** B6.2's objection was that the claim was causal with no counterfactual; the
> counterfactual has been taken and the claim survives it. **B6.2's attribution caveat is
> DISCHARGED.** T3 **may** now be recorded as F1's remedy, and it is the record of this gate that it
> is one.
>
> **The margin is what it always was, and so is F1's re-open trigger.** 17,9 px on `/`, 17,7 px on
> `/custo-da-hora`, both anchored at `maxScroll`, LR3.5a **Tier 1**. **B6.2's trigger stands word for
> word** — the reserve dropping below 96, the last paragraph growing by ≥ 17,9 px, the route nav's
> band growing beyond `766 .. 828`, or any flow element appended below the footer. **T3 being the
> remedy makes that trigger load-bearing rather than precautionary**, because the margin is now known
> to be the whole of the compliance, not a surplus on top of `0003`'s.
>
> **F1 itself is unchanged: DISCHARGED as a breach** (B6.2), now in both environments and with its
> cause identified. **Nothing re-opens. Nothing is blocked.** `legal.md` **A1.7** untouched; **T5
> stays unblocked**.

### C11.3 — **F5 is upgraded from a hypothetical to a demonstrated inversion**, and its worked case is replaced

C4's F5 was written with a worked case about a **margin** — 149,9 px seen versus 17,9 px shipped —
and a *"would be green in every suite run"* in the conditional. **T1d makes it indicative, and worse
than a margin.** The same cell, same surface, same formula, same head:

| `copyA`, DS1 P4, `/` at 390×844 | `maxScroll` | `I` | `found` | what it attributes |
|---|---|---|---|---|
| **ads on** — the only environment this repo's suite can enter | 2331 | `[2213.1, 2331]` | **true** | *`0003` discharged F1; **T3 is not the remedy*** |
| **ads off** — the shipped document | **2199** | **`[]`** | **false** | ***T3 is the remedy*** |

> **F5 — worked case REPLACED (this supersedes C4's).** The harness's document does not merely widen
> a compliance margin; on this measured cell it **returns the opposite causal attribution**. Had the
> subject question been answered the other way — or not asked — this spec would have recorded
> **`0003` as F1's remedy and T3 as unnecessary**, and the next spec to open
> `calculator-views.tsx`'s footer would have had a written record telling it the 96 px reserve was
> not load-bearing. **That is a defect that ships as prose, not as pixels**, and it is exactly the
> shape `AGENTS.md` §5 names: *a verdict can be right for the wrong reason, and the reason is what
> travels.*
>
> **One thing F5 is NOT, corrected here because it was stated to me in those words and the wrong
> reason is what travels.** *"The ads-on guard has been reporting a pass the product does not earn"*
> is **false of the head that ships.** `copyA` is **T3 reverted** — a counterfactual head that exists
> only in an isolated copy and that no user has ever been served. The delivered head is `copyB`, and
> `copyB` ads-off reads **`[2197.1, 2215]`, `found: true`**, measured twice (the A4.3 control and
> T1d's own sanity control, integer-exact both times). **The product earns its pass in the shipped
> document, and it earned it before T1d ran.**
>
> **What the guard could not do is ATTRIBUTE the pass, and that is the whole of F5.** Ads-on it
> credits `0003`; ads-off it credits T3. **The defect is in the causal record, not in the
> compliance** — and that is a smaller claim than *the product does not earn its pass* and a
> different one, worth keeping apart because the larger claim would send a remedy at a surface that
> is not failing. **F5 is a finding about an instrument's blind spot, not about a live breach**, and
> §12 **F1** stays **discharged** exactly as B6.2 ruled.
>
> **Severity stays `serious`. Owner stays `tech-lead`. Trigger stays as C4 states it.** What changes
> is that F5 now has a **failing subject on the record** — my own rule, that a new clause is trusted
> only once it has been red — and the restatement at **C2.4** is therefore binding rather than
> precautionary. **It remains not a rejection ground for `0010`**, for C4's unchanged reasons: no
> reader is unprotected today, and `playwright.config.ts` is outside this spec's file list.

### C11.4 — One element T1d printed that §8.1's chrome list does not name, checked and cleared

T1d's `fixed` list reads, on both routes: `header 0..65 w390`, `nav 766..828 w308.1`, and
**`shield 784..828 w44`** — a third fixed box §8.1's *"below the fixed header, above the fixed route
nav"* band was derived without.

**I checked it rather than ignoring it**, because a chrome element absent from the enumeration is the
defect D-2 exists to catch, one level up. `784..828` is **contained within** the nav's `766..828`,
so the binding top edge of the bottom chrome is still **766** and the unoccluded band is still
**`[65, 766]`, 701 px**. **§8.1's band, every interval derived from it, and every number in Addenda B
and C are unchanged.** Recorded as *verified present and non-binding*, never as *not seen* — and
added to **W14**, so the G6 sweep prints the **full** `fixed` list per route rather than the two
boxes the band was named after.

### C11.5 — What changed, in one table

| Written in | Claim | Status after T1d |
|---|---|---|
| **C2** | LR3.5's subject is the shipped document, verified in the narrowest configuration | **STANDS**, and C11.3 is its first demonstrated consequence |
| **C6.1** | The two environments give opposite attributions | **CONFIRMED BY MEASUREMENT**, both rows now read |
| **C6.2** | D-5 stays open as a number | **CORRECTED — settled.** C11.2 |
| **C6.3** | Pre-registered `[2213.1, 2199]`, empty by 14,1 px | **CONFIRMED to the digit.** Left unedited so the order is visible |
| **C4 / F5** | `serious`, worked case about a 132 px margin | **STANDS, worked case REPLACED** by a demonstrated inversion of attribution. C11.3 |
| **B6.2** | F1 discharged, **attribution open**, T3 not to be recorded as the remedy | **ATTRIBUTION DISCHARGED. T3 IS the remedy.** F1's own discharge and its re-open trigger are unchanged |
| **§8.1** | Unoccluded band `[65, 766]`, 701 px | **UNCHANGED**, re-confirmed against a third fixed box it did not name. C11.4 |
| **C7**, **Q8**, **Q9** | Drafted as a new finding, then **WITHDRAWN same run** — already `0011` **F1** / `0014` **L4**; **Q9 withdrawn**, **Q8 stands** | **UNCHANGED.** T1d says nothing about them |
| **AC5's exemption list** | EMPTY | **STANDS. This gate still mandates no string.** |

**Verdict of this addendum is unchanged: `pass`.** No table, no bracket, no rate, no rounding rule and
no order of operations is touched by anything in C11.

**Next, amended by C11: `tech-lead` records branch (a) and routes F5; `frontend-dev` resumes
`T5 → T6 → T4′ → T7 → T8`.** T1d is done and D-5 is closed.
