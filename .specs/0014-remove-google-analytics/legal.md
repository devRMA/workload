# 0014 — Legal basis

> Owner: labor-law-analyst · Gate: `law` (G2) · Run 1 · **Blocking — no design, copy, plan or code
> starts before this passes.**

**Verdict: `pass`.**

L1–L11 are settled by name in §§5–15. The gate adds **four binding rules** (RR1–RR4), **six
disclosure obligations with rendering conditions** (DR1–DR6), **one bounded override fired** (L4 →
AC12), **three human preconditions** (H3, H4, H5), and **corrects six statements in `spec.md` and in
the artifacts it inherits** (§4), each inline at the gate that found it.

Two questions the team-lead routed are answered in their own words and not softened:

- **H1 is not legally wrong**, and it is not merely convenient. It is legally *sound* **on one
  condition**, stated in §5.4 and made operative by §8: the AdSense injection path leaves with the
  consent machinery. Without that condition H1 would leave, in the repository, a code path that
  cannot be lawfully executed in any environment and no code anywhere able to make it lawful. With
  it, H1 is the cleanest available discharge of `0011` §8.4. **The decision is not reversed and does
  not need to be.**
- **L3 is ruled on what the sentence asserts.** *"Nada é enviado para nenhum servidor"* is **still
  false after the removal**, on a ground independent of Google Analytics, and it is retired. §7.

---

## 0. Scope of this analysis

### Covered

| # | Assertion, operation or obligation | Settled in |
|---|---|---|
| C1 | Whether an application may retire its only consent surface together with the purpose it gated, and what is owed at that moment | §5 (**L1**) |
| C2 | Whether the residue on the user's device must be deleted, by what trigger, and whether deleting it silently is a defect | §6 (**L2**) |
| C3 | Whether `components/organisms/calculator-views.tsx:75-76` is true after the removal, and what its replacement must say and where | §7 (**L3**) |
| C4 | Whether the env-gated AdSense path breaches anything today, and what a future ads spec inherits | §8 (**L4**) |
| C5 | Which of `0011`'s eleven findings are discharged, which survive, and which change ground or severity | §9 (**L5**) |
| C6 | What `0011` §6.1's OP-test returns after the removal, and which information cells empty | §10 (**L6**) |
| C7 | What is owed about the data Google already holds, and by which route | §11 (**L7**) |
| C8 | Whether `PRODUCT.md` §9 gains rows, what they must say, and the unlock sequence | §12 (**L8**) |
| C9 | Whether any international transfer of this application's causing remains, and how the host's receipt is characterised | §13 (**L9**) |
| C10 | Whether the standing privacy affordance may be deleted before `0011`'s page ships | §14 (**L10**) |
| C11 | Whether anything must be said to a returning user whose device carried an accepted consent | §15 (**L11**) |

### Explicitly not covered

1. **Every number the calculator computes.** No table, rate, bracket, divisor, ceiling or rounding
   rule in `lib/` is opened here. `lib/analytics.ts` and `lib/consent.ts` compute none. `spec.md`
   § Out of scope 2 protects this and nothing in this analysis reaches it.
2. **The geometry of what the vacated fixed-chrome region becomes.** `0010`'s budget, `spec.md`
   § Out of scope 8, `spec.md` **Q1**. §15.5 states one geometric floor for a surface this gate
   *creates*, and inherits it from the repository's own already-calibrated legibility rule set
   rather than inventing a number.
3. **The words.** Every clause below states what must be said and in which measurable quantity it
   can be breached. `content-writer` writes pt-BR at G3 from these cells and from nothing else.
4. **`0010` and `0011` themselves.** Neither is rewritten here. Where this gate corrects a statement
   in `0011` — §4.5 — the correction is recorded in this file and routed, never edited into theirs.
5. **Whether the human accepts the residual host exposure** (`0011` §26.7 **Q6**). Unchanged, and
   §13.4 records that this removal makes it cheaper, not different.

### What this gate would have rejected on, and did not have to

Recorded so the `pass` is falsifiable.

- a spec stating a norm, an article, a period or a rate — it states none, deliberately;
- a spec proposing to delete *"Nada é enviado para nenhum servidor"* with nothing in its place — it
  refuses that in § Non-goals 5 and routes the ruling here;
- a spec that scored only the cold-load state — it labels that cell the empty-collection control in
  its own text;
- a spec that treated the residue as out of scope because the flag can be unset — it measured both
  builds and refused the flag remedy with a number.

**What it *would* have been rejected on, had the gate stopped one level earlier:** the residue rule
stated as `^_ga` and scored on that pattern (§6.4), and AC1 stated over three Google hosts (§16.1).
Both pass today and both are blind to a state the product can reach. They are corrected, not waived.

---

## 1. How the sources in this file were obtained

Every norm below was fetched in **this** session, from the official publisher, and read in its own
text. **Every compiled or consolidated source is cited by its edition, not by its URL** — the rule
this squad wrote yesterday as lesson **057**, applied here and, in one case, paying for itself.

| Source | Publisher | Edition identifier and date | Result |
|---|---|---|---|
| **S1 — Lei nº 13.709/2018 (LGPD)**, consolidated text | Planalto | consolidated text as served 2026-09-19; amendments present in the text: MP nº 1.317/2025, Lei nº 15.352/2026, Lei nº 15.452/2026 | `curl`, **HTTP 200, 310 252 bytes**, `md5 d40afa1e3829ca9b5fd83805f7d8f61f`. Arts. 5º I/X/XII/XIV/XV, 6º, 7º, 8º §§ 1º–6º, 9º caput e §§ 1º–3º, 15, 16, 18 caput e §§ 1º–8º read verbatim. |
| **S2 — Resolução CD/ANPD nº 19, de 23 de agosto de 2024**, Anexo I | ANPD / Imprensa Nacional | **DOU de 23/08/2024, alterado pela RETIFICAÇÃO de 18/08/2025** — this is the edition in force and it is the one quoted | two fetches: the DOU original (`in.gov.br`, HTTP 200, 165 048 bytes, `md5 44f79c7ccbd990aeb06d6561e63084b3`) **and** the publisher's consolidated page carrying the rectification (`gov.br/anpd`, HTTP 200, 705 904 bytes). Anexo I arts. 3º III/V, 5º, 6º, 7º, 9º, 16 read verbatim in **both**. |
| **S3 — Lei nº 12.965/2014 (Marco Civil da Internet)**, consolidated text | Planalto | consolidated; art. 7º X carries the redação da Lei nº 13.709/2018, in force | `curl` with a browser UA, **HTTP 200, 119 976 bytes**, `md5 82e5df26f140b7c0583ee3114c63c3f8`. Art. 7º I–XIII read verbatim. |
| **S4 — GA4 first-party cookies** | Google, Analytics Help 11397207 | fetched 2026-09-19 | **Two** first-party cookies documented: `_ga` (2 years) and `_ga_<container-id>` (2 years). The page adds that a property **linked to Google Ads** sets further cookies, which it does not name. §6.4 turns on that sentence. |
| **S5 — GA4 data-deletion requests** | Google, Analytics Help 9940393 | fetched 2026-09-19 | Editor role or above; deletes **text collected by event parameters**, replaced with `(data deleted)`; **does not** delete numeric parameters or auto-collected fields; **7-day** grace period; **7 to 63 days** to process; data must be **more than 12 days old**. |
| **S6 — deleting an Analytics account or property** | Google, Analytics Help 9305176 | fetched 2026-09-19 | Deleted entities sit in the Trash for **35 days** and are then permanently deleted; *"Once deleted, the property is gone and we are not able to retrieve any historical data"*; data is not processed while in the Trash. |

### 1.1 — The edition check, run rather than assumed, and what it caught

**Resolução CD/ANPD nº 19/2024 has been rectified since it was last cited by this squad.** The
publisher's own page states, verbatim: *"Este texto não substitui a publicação no DOU de 23/08/2024,
**alterado pela RETIFICAÇÃO de 18/08/2025**."*

The rectification's content, located rather than assumed — the ANPD publishes the change inline, with
the superseded line immediately above the new one:

> 15.4. … b) encaminhar a solicitação para a Parte Designada o quanto antes, a fim de viabilizar a
> resposta no prazo previsto no item ~~15.2~~ **15.3**. *(Redação dada pela Retificação publicada no
> DOU de 18/08/2025)*

It is a cross-reference inside **Anexo II** — the cláusulas-padrão contratuais — and it touches **no
article of Anexo I**. The units this gate relies on (Anexo I arts. 3º III, 3º V, 6º and 9º) are
identical in the DOU original and in the rectified consolidated text, and both were fetched and
compared. **The check is recorded because a citation that turns out right against a superseded
edition is a defect at full severity, not a near miss** — and because `0011` **S10** cites this
instrument by the DOU original with no mention of the rectification. That is §4.5.

**The falsifiability control for the edition check itself:** the rectification is real and I can
point at the unit it changed (Anexo II, cláusula 15.4 b, `15.2` → `15.3`). An edition check that can
name no changed unit has not read the change log.

### 1.2 — The tree state every code coordinate in this file is read in

`AGENTS.md` §5: *every enumeration and every measured number carries the state it was read in.*

- **Tree state: `5c0c6fa`**, the commit `spec.md` declares. Every file and line below was read with
  `git show 5c0c6fa:<path>` or `git grep … 5c0c6fa`, never from the checkout.
- **The working tree is not that state and it is not mine to read.** `git status --short` over
  `app components lib hooks __tests__ tests` returns **40 modified files and 8 untracked ones** at
  the moment of this gate — several specs' work in flight, including a modification to
  `components/organisms/cookie-consent.tsx:15` that changes `useState(true)` to `useState(false)`.
  A first pass of this gate read that line from the checkout and was about to record that
  `0011` **F2** does not reproduce. **It does reproduce, at the declared state**, and the near miss
  is recorded here rather than left out, because the correction that matters is the method: a legal
  finding read off a shared checkout mid-gate is a finding about another agent's uncommitted work.
- **Nothing in the repository was mutated by this gate**, and no measurement in this file required a
  browser. Where a quantity had to be rendered to be known, this gate says so and defers it with an
  owner and a gate, rather than substituting arithmetic for a reading (§15.5, §16.1).

---

## 2. Rules in play

| # | Rule | Where it bites in this change |
|---|---|---|
| **PR1** | **art. 15 I** — *término do tratamento* on verification that the finalidade was achieved or the data ceased to be necessary | It is what makes the removal itself a legal event, not only a product decision. §5, §6, §11. |
| **PR2** | **art. 16 caput** — data is **eliminated** after the end of its treatment, subject to four conservation hypotheses | The residue on the device and the data at Google. §6, §11. |
| **PR3** | **art. 5º XIV** — *eliminação: exclusão de dado … **independentemente do procedimento empregado*** | "They are Google's cookies" is not an answer for cookies this origin can read and delete. §6. |
| **PR4** | **art. 8º § 6º** — on **alteração de informação referida nos incisos I, II, III ou V do art. 9º**, the controller **shall inform the titular, com destaque, do teor das alterações** | It is the unit that decides L11, and the only one in this file that adds a surface. §15. |
| **PR5** | **art. 6º VI** — *transparência: informações **claras, precisas** e facilmente acessíveis sobre a realização do tratamento* | It is the ground F9 stands on **after** art. 9º § 1º stops biting. §7. |
| **PR6** | **art. 9º caput** — *acesso facilitado*, *clara, adequada e ostensiva* — and it is **not** conditioned on consent | It survives the removal untouched and is `0011`'s to discharge. §10, §14. |
| **PR7** | **art. 7º § 5º + art. 8º § 4º** — specific consent to share with another controller; generic authorisations are **null** | The AdSense path. §8. |
| **PR8** | **art. 18 § 6º** — the controller informs the agents it shared data with of the elimination **so they repeat it** | The route to Google's copy. §11. |
| **PR9** | **Res. CD/ANPD nº 19/2024, Anexo I art. 6º** — *a coleta internacional de dados **não caracteriza** transferência internacional* | The host, after the only transfer leaves. §13. |
| **PR10** | **MCI art. 7º VIII and XI** — *informações claras e completas sobre coleta, uso, armazenamento…*; *publicidade e clareza de eventuais políticas de uso* | An independent statutory duty that does not depend on any LGPD unit. §7, §14. |

---

## 3. The threshold question, ruled before anything else

**Does the LGPD still apply to this application after Google Analytics is removed?** `0011` §4 ruled
that it does, on art. 3º and art. 5º I, for treatments the app performs. Re-executed here against the
**post-removal** state rather than inherited, because a spec that removes the only third party is
exactly the spec where an agent assumes the law leaves with it:

- **art. 5º X** defines *tratamento* as *"toda operação realizada com dados pessoais, como as que se
  referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão,
  distribuição, processamento, **arquivamento, armazenamento**, eliminação…"*. Writing nineteen
  calculator keys to `localStorage` is *armazenamento*. It survives the removal in full.
- **art. 5º I** — the stored set includes the user's gross salary, their number of dependants, their
  weekly working days and their manual INSS/IRRF overrides. `0011` §12 ruled the set personal and
  none of it sensitive; nothing here changes that.
- **art. 3º** — the treatment is carried out in national territory and offers a service to
  individuals located in Brazil.

> **The LGPD applies undiminished.** What the removal changes is **which operations exist**, not
> whether the Law reaches them, and not one obligation in this file is conditioned on Google
> Analytics existing. An agent downstream reading "Google Analytics is gone, so the privacy work is
> done" has misread this section on purpose.

---

## 4. Corrections made at the gate that found them

Six, each with the command that produced the correct value. `AGENTS.md` §5 and this agent's standing
rule: where a measurement contradicts a statement, the statement loses and is corrected **here**,
never left for a downstream agent to reconcile.

### 4.1 — `spec.md` cites the footer string at the wrong lines

`spec.md` § Scope S4, § Legal dependencies **L3**, § Non-goals 5 and **AC8** all cite
`components/organisms/calculator-views.tsx:79-80`. At the declared state the string is at **`:75-76`**:

```
$ git grep -n "Nada é enviado" 5c0c6fa -- components
5c0c6fa:components/organisms/calculator-views.tsx:75:  Tudo o que você digita fica salvo apenas neste navegador. Nada é enviado para nenhum servidor, e ninguém
```

`:79-80` is the string's position in the **working tree**, which is four lines further down because of
another spec's uncommitted edit (§1.2). `0011` §20.2 entry 5, §21 **F9** and §23 cite `:75-76` and are
right. **Every coordinate in this file is `:75-76`; `tech-lead` plans against that.**

### 4.2 — The guard `spec.md` AC8 relies on cannot see the claim L3 is about

**AC8 states that `__tests__/calculator-views.test.tsx:68` "pins that same text".** The coordinate is
right and the claim about it is wrong. At `5c0c6fa`:

```
65:  it("promises that nothing leaves the browser and that the numbers are an estimate", () => {
68:    expect(screen.getByText(/fica salvo apenas neste navegador/)).toBeInTheDocument();
```

The regex matches **the first sentence only**. **Name the state in which this guard would print
something else:** deleting or rewriting *"fica salvo apenas neste navegador"* — the half that is
**true** and that `0011` §22 **D2** forbids removing. It prints exactly the same thing whether the
retired claim is present, rewritten or gone. As the guard for AC8 it is **vacuous by construction**,
and a criterion whose evidence path cannot fail is not a criterion.

The complete domain of the claim at the declared state, derived by listing the tree and not from any
document's list:

```
$ git grep -n "Nada é enviado\|nenhum servidor\|nothing leaves the browser" 5c0c6fa -- .
5c0c6fa:.specs/0001-foundation/copy.md:87:        | `footer.privacy` | Tudo o que você digita … Nada é enviado para nenhum servidor, …
5c0c6fa:.specs/0005-…/reports/legal.md:109,593                   (measurement rows, historical)
5c0c6fa:__tests__/calculator-views.test.tsx:65:                   it("promises that nothing leaves the browser …")
5c0c6fa:components/organisms/calculator-views.tsx:75
```

**Four live members, not one**, and only the fourth is in `spec.md`'s scope table:

| # | Member | What it does | Consequence of L3 |
|---|---|---|---|
| a | `components/organisms/calculator-views.tsx:75-76` | renders the claim | §7.4 governs it |
| b | `__tests__/calculator-views.test.tsx:65` | the **test name** re-asserts the retired claim in English | renamed with the string; a test description asserting a retired claim misleads the next reader of a failing run (`AGENTS.md` §8) |
| c | `__tests__/calculator-views.test.tsx:68` | the guard, blind to the claim | replaced by a guard that asserts the replacement **and** the absence of the retired proposition — §7.5 **RR2** |
| d | `.specs/0001-foundation/copy.md:87` | `footer.privacy`, the **rebuild source** for the string | corrected or annotated, or `AGENTS.md` §5's rebuild contract re-publishes the retired claim from `.specs/` alone. Owner: `release-manager` at **G7**, routed in `STATUS.md` |

### 4.3 — `spec.md` AC5's 28-file union is short by at least one file that L3 reaches

```
$ git grep -n "fica salvo apenas neste navegador" 5c0c6fa -- tests
5c0c6fa:tests/e2e/disclosure-legibility.spec.ts:32:  await assertLr3(page, route, footer, "Tudo o que você digita fica salvo apenas neste navegador");
```

`tests/e2e/disclosure-legibility.spec.ts` is **not** in E-UNION's 28 names. It carries a literal
prefix of the paragraph L3 reopens, so a replacement that alters that prefix forces an edit outside
the union and **AC5 fails on a file nobody put in scope**.

**This gate removes the collision rather than widening the union**, and the remedy is free because it
was owed anyway: **RR2 requires the first sentence to ship verbatim**, which is what `0011` D2
protects. With the first sentence unchanged, `disclosure-legibility.spec.ts:32` keeps matching, no
file outside the union changes, and AC5 stands as written. *If `content-writer` proposes a first
sentence that is not verbatim, AC5's union gains that file by name and `tech-lead` records it — it
is not absorbed.*

### 4.4 — `spec.md`'s residue rule under-returns against its own domain test

§6.4. The rule is stated correctly as a property; its measurable form (`^_ga`) is the output of the
rule against one account configuration and is not the rule.

### 4.5 — Two citations in `0011` `legal.md` that this gate could not verify as cited

Routed, not edited (`AGENTS.md` §4 rule 5; `spec.md` § Out of scope 3).

| `0011` | What it says | What this session found |
|---|---|---|
| **S10** | Resolução CD/ANPD nº 19/2024 cited as the **DOU text of 23/08/2024** | The edition in force is that text **as rectified on 18/08/2025** (§1.1). The units `0011` §26.4.4 relies on are unaffected, so **its ruling stands and its citation does not**. |
| **§21 F9, §23** | *"pinned by `__tests__/calculator-views.test.tsx:68`"* | The line exists and pins the **other** sentence (§4.2). F9's substance is unaffected; the evidence path it names is vacuous for the claim it describes. |

### 4.6 — One statement in `spec.md` that this gate confirms rather than corrects

`spec.md` § Decision 1 says the switch *"opens `true` (`:15`, `useState(true)` — `0011` F2)"`.
**Confirmed at the declared state**, `git show 5c0c6fa:components/organisms/cookie-consent.tsx`
line 15. It is the working tree that disagrees, and §1.2 says why that is not a finding here.

---

## 5. L1 — retiring the only consent surface together with the purpose it gated

### 5.1 — The question, stated so it can be answered by units rather than by instinct

Not *"may we delete a component"* — that is nobody's legal question. The question is: **when the only
treatment resting on consent ends, does any unit of the LGPD require the controller to keep asking,
and what does the same Law require *at the moment of ending*?**

### 5.2 — Every operative unit executed, one at a time, with the answer beside it

| Unit | What it says | Applied to this removal |
|---|---|---|
| **art. 7º, caput and I–X** | Treatment *"somente poderá ser realizado nas seguintes hipóteses"* | The article is **permissive**: it lists bases on which treatment may occur. Not one inciso imposes a duty to **offer** a basis. Removing the treatment removes the need for the basis; it breaches no inciso. |
| **art. 8º caput, §§ 1º–4º** | How consent must be given, and what voids it | Every unit presupposes *"o consentimento previsto no inciso I do art. 7º"*. With no art. 7º I treatment, none has a subject. Silent. |
| **art. 8º § 5º** | Revocation *a qualquer momento, gratuito e facilitado* | **The strongest candidate for a duty to keep the surface, and it fails on its own words.** The right is to revoke *o consentimento*. Where the treatment has ceased and the record is eliminated (§6), there is no consent to revoke and no processing a revocation could stop. A control offering to revoke nothing is not a discharge of § 5º — it is the *Cookies Essenciais* defect (`0011` **F7**) in a new place. |
| **art. 8º § 6º** | Inform of **alteração de informação** referida nos incisos I, II, III ou V do art. 9º | **Bites. This is the unit that is owed** — §15. |
| **art. 9º caput and I–VII** | The information duty | **Survives entirely, and was never discharged by the surface being deleted.** `0011` §7.2 measured five of seven units absent from the banner and the two present as insufficient. Deleting a surface that presents 0 of 7 adequately removes no compliance. Owed by `0011`'s page. |
| **art. 9º § 1º** | Nullity of consent on misleading or non-prior information | Conditioned on *"na hipótese em que o consentimento é requerido"*. After the removal no consent is required, so **§ 1º stops biting prospectively**. It does **not** retroactively validate anything: `0011` §7.4's ruling that every record written to date is **null** is untouched, and §11 is its consequence. |
| **art. 9º § 2º** | *Mudanças da finalidade não compatíveis* → inform previously, titular may revoke | There is no new finalidade. Silent — and the unit a fast reading would use in § 6º's place, which is why it is executed here. |
| **art. 9º § 3º** | Where treatment is a **condition** for providing the service, inform *com destaque* | Never applied and applies less now: the calculator computed identically with the record absent, measured at `0011` §13.1. Silent. |
| **art. 15 I** | Término on verification that the finalidade was achieved **or the data ceased to be necessary** | **Bites, and it is the unit that makes this a legal event.** The owner's ruling that the data was never used is precisely *"os dados deixaram de ser necessários … ao alcance da finalidade específica almejada"*. |
| **art. 16 caput, I–IV** | Elimination after término, four conservation hypotheses | **Bites.** Executed inciso by inciso in §6.2. |
| **art. 18 I–IX, §§ 1º–8º** | The titular's rights | Unchanged in existence; **narrowed in subject**. §11 and §10. |

### 5.3 — The ruling

> **An application may retire its only consent surface together with the single purpose it gated.
> No unit of the LGPD requires a controller to keep asking for a permission it no longer needs, and
> a surface that gates nothing while naming a recipient the application no longer has is itself a
> defect under art. 6º VI and art. 9º § 1º's *conteúdo enganoso* standard.**
>
> **Five things are owed at the moment it happens**, and none of them is a softer version of any
> other:
>
> 1. **Elimination of the residue on the device** — art. 15 I + art. 16 caput. §6, **RR1**.
> 2. **Elimination of the data already at Google** — same units, plus art. 8º § 3º, because the
>    consents that carried it are null. §11, **H3**.
> 3. **The art. 8º § 6º notice to the users whose information is changing.** §15, **RR4**.
> 4. **Correction of the claim the removal makes newly assessable** — art. 6º VI. §7, **RR2**.
> 5. **A recorded non-claim for each retired public claim**, so the product keeps a record that it
>    was wrong. §12, lesson **003**.

### 5.4 — H1, answered in the terms the team-lead asked for

**H1 is not legally wrong.** §5.2 executes every candidate unit and none of them requires the
machinery to survive its purpose. The specification survives in `0011` §§8.4, 9.3, 10.4, 26.5 C1–C7
and `0010` LC1, and this spec touches none of it.

**But H1 is sound only with §8's override.** Stated as a conditional so the reasoning is checkable:

- With `lib/consent.ts` deleted **and** the AdSense injection removed, the repository contains no
  code path capable of causing a consent-based treatment. Shipping ads then requires new code, which
  requires a spec, which passes G2 again. The obligation returns **visibly**.
- With `lib/consent.ts` deleted and the AdSense injection **retained**, the repository contains a
  path that injects a third-party script for an *independent controller* (`0011` §16, Google's own
  words) with no consent, gated only by an environment variable — and **no code anywhere able to
  make it lawful**, since the module that would record the consent has been deleted. `0011` §8.4
  already ruled that *"the gate that protects the user must be the consent, not an environment
  variable that one deploy can flip without passing any gate at all"*. That ruling was written while
  the module existed. It is stronger, not weaker, once it does not.

> **The spec that owns what a future ads spec inherits is `0011`** — F1 is its finding, §8.4 is its
> ruling, §26.5 C1–C7 is its consent-for-transfer standard, and §23 is where the `ad-manager.tsx`
> row already sits. `0014` does not inherit it, does not discharge it and does not re-grade it.
> Recorded in `STATUS.md` against R1 and R4.

---

## 6. L2 — the residue on the user's device

### 6.1 — The rule, and why it is not a list

`spec.md` Decision 2 states the rule as a property and its two current members as the rule's output.
That shape is correct and this gate keeps it. What this gate adds is the **norm** the property is an
application of, and the measurable form the property is breached in.

> **RR1 — elimination of residue.** Every datum that a treatment this application caused left on the
> user's device, and that this application's origin can still reach, is **eliminated** at the first
> execution of the application on that device after the treatment ends — whether it was written by
> this application's code or by a script it injected, and regardless of any act by the user.

### 6.2 — art. 16's four conservation hypotheses, executed one at a time

art. 16 makes elimination the rule and conservation the exception. Each exception, against each
member of the residue:

| Inciso | The consent record | The `_ga` family |
|---|---|---|
| **I** — *cumprimento de obrigação legal ou regulatória pelo controlador* | **Closed.** The only candidate obligation is the art. 8º § 2º burden to prove consent. It cannot apply: `0011` §7.4 rules every record **null**, and a null consent is not a consent there is a burden to prove. Keeping the record would preserve evidence of a nullity, not of a conformity. | **Closed.** No obligation attaches to an identifier cookie. |
| **II** — *estudo por órgão de pesquisa* | Closed. There is none. | Closed. |
| **III** — *transferência a terceiro* | Closed, and §13 leaves no transfer to carry it. | Closed. |
| **IV** — *uso exclusivo do controlador, vedado o acesso por terceiro, desde que anonimizados* | **Closed twice.** The controller has no access to `localStorage` at all (`0011` §9.4), and the data is not anonymised. | **Closed.** `_ga` is an identifier; anonymising it is deleting it. |

**All four closed for both members. Elimination is mandatory, not preferable.**

### 6.3 — Why "they are Google's cookies" is not an answer

**art. 5º XIV**, verbatim from S1: *"eliminação: exclusão de dado ou de conjunto de dados armazenados
em banco de dados, **independentemente do procedimento empregado**"*. The `_ga` family is written
under **this application's own origin** and is readable and deletable by this application's own
document. The procedure is available; art. 5º XIV removes the argument that the procedure's origin
matters.

### 6.4 — The domain test, and where `^_ga` under-returns

`spec.md` scores the residue on `document.cookie` entries matching `^_ga`. Against the GA4
configuration this site actually runs, that is complete: **S4 documents exactly two first-party
cookies, `_ga` and `_ga_<container-id>`, both 2 years, both matching the pattern.**

It is not complete against the rule. S4's own next sentence: *a property **linked to Google Ads**
sets further measurement cookies*, which it does not name — the documented member of that family is
`_gcl_au`, and **`_gcl_au` does not match `^_ga`**. Whether this property was ever linked to Google
Ads is an account fact invisible to the repository. A device may also carry cookies from a
configuration the site no longer runs.

> **The measurable form of RR1 is not a pattern over cookie names. It is a count of cookies.**
>
> **RR1-m.** After one load of the delivered build on a device seeded with any residue, the number of
> entries in `document.cookie` on the application's own origin is **0** — *all* of them, not the ones
> matching a pattern — and `localStorage.getItem("workload_cookie_consent")` is `null`.
>
> **This is checkable, strictly stronger than the pattern, and it cannot drift with an account
> setting**, because `0011` **F7** already measured the premise it rests on: **this application sets
> no first-party cookie of its own.** Re-verified at the declared state:
>
> ```
> $ git grep -nE "document\.cookie" 5c0c6fa -- app components lib hooks
> (no rows)
> $ git grep -n "cookies()" 5c0c6fa -- app lib
> (no rows)
> ```
>
> **Name the state in which RR1-m prints something else:** the S-c device before the clearing runs —
> `spec.md` E6 measured `["_ga","_ga_TEST12345"]` there, on **both** builds. Known-bad `2`,
> known-good `0`, both already printed in this spec's own evidence. The guard is falsifiable in both
> directions before it is written.
>
> **If a later spec ever makes this application set a cookie of its own, RR1-m's premise dies and the
> clause must be re-derived, not tuned.** That is its trigger, and it is an event, not a date.

### 6.5 — The trigger

**The first execution of the application on that device after the change** — not on a user act, not
on a route, not on a consent check, and **in every state including the one where nothing looks
wrong**. art. 16 attaches no grace period, and the only moment this application can reach the device
is a load.

### 6.6 — Is deleting it silently a defect?

**Yes, for the devices that carry residue, and no for the rest** — and the reason is not politeness,
it is that the deletion is one half of an event art. 8º § 6º requires be communicated. Ruled in §15;
the notice's condition is stated there over the residue set, which makes the two clauses one code
path and one measurement.

### 6.7 — The ceiling, stated where it cannot be mistaken for the remedy

Deleting every cookie on this origin deletes every cookie on this origin. It does not reach one byte
of what Google holds. §11 is that obligation and it is **not** discharged by RR1.

---

## 7. L3 — *"Nada é enviado para nenhum servidor"*

### 7.1 — What the sentence asserts, which is the question the team-lead asked

The ruling is on the **proposition**, not the words. The paragraph at `calculator-views.tsx:75-76`
makes three assertions:

| # | Assertion | Scope word | Operand it is about |
|---|---|---|---|
| 1 | *Tudo o que você digita fica salvo apenas neste navegador.* | *o que você digita* | the values the user types |
| 2 | **Nada é enviado para nenhum servidor.** | ***Nada*** — none | **the application, entire** |
| 3 | *…e ninguém além de você vê seus horários ou seu salário.* | *seus horários ou seu salário* | the values the user types |

Assertion 2 is the only one whose subject is the application rather than the user's data, and it is
the only one with **no scope word at all**. *Nada* is unqualified and *nenhum servidor* is
unqualified. Read by any reader, in any state, it says: **this application causes nothing to reach
any server.**

### 7.2 — Executed against the post-removal state

| Operation surviving the removal | Does it cause data to reach a server? |
|---|---|
| The user's inputs in `localStorage` (T1) | **No.** Device only. Assertion 1 and 3 are true of it. |
| **Serving the page (T5)** | **Yes, unconditionally.** Every request for the document, every asset and every navigation reaches the host, which necessarily receives the **IP address**, the approximate time, the **URL** and the **user-agent** — before any surface renders and regardless of any choice. `0011` §6.1 **T5** and **F6**. It has no line number in this repository, which is why a code-derived reading of the sentence loses it. |

> **Assertion 2 is false after the removal.** Not *less false*, not *false only if you are pedantic*:
> the application is delivered over HTTP by a server that receives an identifier of every reader on
> every load, and the sentence tells that reader the opposite. The claim is false for the user who
> never touches an input, on the very first paint, in every state.

### 7.3 — Which norm it breaches now, and why the ground changes

`0011` **F9** graded this **critical** under **art. 9º § 1º** — *conteúdo enganoso* — because a
misleading statement presented alongside a consent request **voids the consent**. After the removal
no consent is requested, so **art. 9º § 1º stops biting** and F9 cannot keep its original ground.

Three units survive and each reaches the sentence independently:

- **LGPD art. 6º VI** — *transparência: garantia, aos titulares, de informações **claras, precisas** e
  facilmente acessíveis sobre a realização do tratamento e os respectivos agentes de tratamento*. A
  statement that the application transmits nothing, on an application whose host receives every
  request, is not *precisa*.
- **LGPD art. 9º caput** — the information owed must be *clara, adequada e ostensiva*. A false
  sentence is not an inadequate one; it is worse than the silence it replaces.
- **MCI art. 7º VIII** — *informações **claras e completas** sobre coleta, uso, armazenamento,
  tratamento e proteção de seus dados pessoais*. Independent of the LGPD and of any consent.

> **Ruling on L3.** *"Nada é enviado para nenhum servidor"* does **not** become true when Google
> Analytics is removed. It is retired. **F9 survives the removal, re-grounded on art. 6º VI, art. 9º
> caput and MCI art. 7º VIII, and re-graded from `critical` to `high`** — it no longer voids a
> consent, because there is no consent; it remains a false statement to the user about where their
> data goes. The re-grading is recorded in §9 and routed to `0011`, whose finding it is.

### 7.4 — What the replacement must say, and where the qualifier must sit

Bound **by what it must say**, because a forbidden-word list closes the words it names and never the
claim (`AGENTS.md` §5).

> **RR2 — the footer privacy paragraph.**
>
> **(a) The true half ships verbatim.** The sentence *"Tudo o que você digita fica salvo apenas neste
> navegador."* is **rendered unchanged, character for character**, in every state. `0011` §22 **D2**:
> *a correction that removes it to dispose of F9 is a rejection, not a pass*. It is also what keeps
> §4.3's file union honest and two existing guards non-vacuous.
>
> **(b) The retired proposition, stated as a proposition.** No string anywhere in this application
> may assert, **of the application as a whole**, that it transmits nothing, sends nothing, uploads
> nothing, contacts no server, or works without reaching one. The prohibition is on the claim, not on
> a vocabulary: *"nada sai do seu aparelho"*, *"funciona sem internet"*, *"não mandamos nada para
> lugar nenhum"* and *"100% offline"* each re-make it in permitted words and each is refused.
>
> **(c) What may be asserted instead, and it must be asserted** — D2's substance may not be lost with
> the false half. The permitted claim is the **narrow, true one**, and its **scope word must sit
> adjacent to the noun it limits**: the subject is *the values the user types* — their times, their
> salary, their result — and the predicate is that those values are neither transmitted nor readable
> by anyone else. A sentence whose subject is *the application* and whose predicate is an absence of
> transmission is refused by (b) whatever words it uses.
>
> **(d) The adjacency quantity.** The qualifier is adjacent to the claim when it sits **inside the
> same border box** as the claim — the same `<p>` — or its border box `top` minus the claim's border
> box `bottom` is **≤ 8 CSS px** at `document.documentElement.clientWidth` ∈ {390, 1440}, with no
> element carrying a different claim between them in DOM order. The 8 px is not invented: it is the
> footer's own measured inter-paragraph gap on the built artifact (`0011` §20.2, measured at
> `font-size: 12px` / `line-height: 17.4px`, border-box widths 358 px at 390 and 768 px at 1440).
> **Rewriting in place inside the existing `<p>` satisfies (d) by construction**, which is the shape
> `content-writer` should reach for first.
>
> **(e) The test that proves (b) is complete.** Try to write a string using only permitted words that
> still makes the retired claim. If you can, (b) is incomplete and your string names the missing
> clause — bring it back to this gate rather than shipping it.

### 7.5 — The guard, because the one AC8 names cannot fail

> **RR2-g.** The assertion that carries RR2 asserts **three** things, and is seen to fail against the
> unfixed state before it is trusted: (i) the verbatim first sentence is present; (ii) the
> replacement clause is present; (iii) the retired proposition is **absent** — the literal string
> *"Nada é enviado para nenhum servidor"* does not appear in the rendered footer, and
> `git grep` over `app components lib hooks` returns no row for it.
>
> **Known-bad:** the state at `5c0c6fa`, where (iii) fails. **Known-good:** the delivered state.
> **The existing assertion at `__tests__/calculator-views.test.tsx:68` is kept** — it guards (i),
> which is D2's protected half — **and is not counted as evidence for (ii) or (iii)**, which is what
> §4.2 found it silently doing.

### 7.6 — `README.md:8`, re-executed rather than inherited

`0011` §20.2 entry 6 ruled *"Roda no navegador, guarda tudo no seu aparelho, não pede cadastro."*
**true as written**. That ruling was made against a tree that ran Google Analytics. Re-executed here
against the post-removal facts, clause by clause, because a string marked unchanged is a claim:

| Clause | True after the removal? | Why |
|---|---|---|
| *Roda no navegador* | **Yes** | The calculation makes no network call; measured `0011` §6.1 and unchanged. |
| *guarda tudo no seu aparelho* | **Yes** | Of what the user types. `localStorage` only; the host stores no input. |
| *não pede cadastro* | **Yes** | No account exists; `PRODUCT.md` §7 forbids one. |

**None of the three asserts an absence of transmission**, which is the proposition RR2(b) retires.
The boundary search re-run at the declared state:

```
$ git grep -nEI "servidor|navegador|privacidade|cookie|telemetria|rastrea|coleta|dados" 5c0c6fa -- README.md
5c0c6fa:README.md:8:Roda no navegador, guarda tudo no seu aparelho, não pede cadastro.
```

> **`README.md:8` does not change, and this is a ruling, not an omission.** `content-writer` must not
> "fix" it by symmetry with the footer. `spec.md` **AC8**'s requirement that the search be re-run and
> pasted is satisfied by the block above; it is re-run once more at G6.

---

## 8. L4 — the AdSense path, and the bounded override

### 8.1 — Does it breach anything **today**?

**No, and the answer is stated plainly rather than stretched to reach the conclusion.** At the
declared state `components/organisms/ad-manager.tsx:10-19` injects nothing unless
`NEXT_PUBLIC_ADSENSE_ID` is set **and** `NEXT_PUBLIC_ENABLE_ADS === "true"`. The human has ruled ads
off in production (`0011` §24 **Q5**). No script loads, no cookie is set, no request leaves, and
`components/atoms/google-ad.tsx` — read at the declared state — pushes to a queue and renders an
`<ins>`; with no script present it causes no network activity whatsoever. **There is no present
treatment and therefore no present breach.** `0011` **F1** is `high` and **latent**, and this gate
does not re-rank it.

### 8.2 — What changes, and it is not the severity

What changes is **satisfiability**. Executed as a question about states of the repository:

| State | Can the AdSense injection execute? | Can it execute **lawfully**? |
|---|---|---|
| `5c0c6fa`, ads off | No | — |
| `5c0c6fa`, ads on by a flag flip | **Yes** | **No** — art. 7º § 5º requires a *consentimento específico* to share with another controller (Google's own words: *"both you and Google operate as independent controllers"*), art. 8º § 4º voids a generic authorisation, and `0011` §26.5 C1/C7 require a distinct act and a versioned record. The module exists but is not read. |
| **After `0014` without the override**, ads on by a flag flip | **Yes** | **No, and now unreachably so.** No module in the repository can record a consent. There is no edit to `ad-manager.tsx` short of rebuilding `lib/consent.ts` that makes the path lawful. |
| **After `0014` with the override** | **No, in any environment** | n/a |

> A code path that **cannot be lawfully executed in any state of the repository**, guarded only by an
> environment variable that passes no gate, is not a latent feature. It is a defect whose only
> protection is that nobody has typed `true`.

### 8.3 — The ruling

> **L4 fires `spec.md` § Out of scope 1's bounded override, and AC12 binds.**
>
> `components/organisms/ad-manager.tsx:10-19` must inject no script in any environment. Verified by
> AC12's own quantity: the count of `script[src*="pagead2.googlesyndication.com"]` is **0** with
> `NEXT_PUBLIC_ENABLE_ADS="true"` and `NEXT_PUBLIC_ADSENSE_ID` set.
>
> **The override is bounded exactly as `spec.md` bounds it and this gate widens it by nothing:** no
> ad markup is removed, no slot, no layout reserve, no `PRODUCT.md` §8 wording, no
> `components/atoms/google-ad.tsx`, and **`0011` F1 remains `0011`'s finding, at `high`, latent.**
> §8.1 verifies that removing the injection alone is *sufficient* — with no script, the `<ins>` and
> the queue push cause no request — so nothing further is needed and nothing further is authorised.

### 8.4 — What a future ads spec inherits, named with its owner

**`0011` owns it.** Its specification is already written and `0014` touches none of it: §8.4 (one act
may not carry both purposes), §9.3 (the record's fields), §10.4 RV1–RV3 (what revocation must do),
§26.5 C1–C7 (what makes the art. 33 VIII transfer consent specific and highlighted), §22 D1–D10, and
`0010` **LC1.1–LC1.7** (the opening state of every consent-bearing control, all seven axes).

**What a future ads spec must re-earn, and cannot inherit:** the art. 33 route. `0011` §26.4.3 ruled
that T4's only open mechanism is **art. 33 VIII** — a specific, highlighted consent — precisely
because II a, II b and II c are closed in fact for a natural-person controller. That route's operand
is a consent surface. **Deleting the surface does not close the route; it defers it**, and a spec
that turns ads on without rebuilding the surface has no mechanism at all. Recorded as precondition
**P-ADS** in §18 and in `STATUS.md`.

---

## 9. L5 — `0011`'s eleven findings, graded

A finding is discharged by the gate that raised it; `spec.md` **L5** routes the grading here and
`0011` records the result. Each row states the **ground**, because a finding can be right for the
wrong reason and the reason is what travels.

| `0011` | Sev at `0011` | After `0014` | Ground |
|---|---|---|---|
| **F1** — ads path reads no consent | high, latent | **Survives, `0011`'s, severity unchanged.** Its *exposure* is closed by §8.3's override; its *obligation* is not discharged and returns when ads ship. | art. 7º § 5º, art. 8º § 4º. §8.4. |
| **F2** — `useState(true)`, pre-enabled switch | **critical** | **Discharged by removal.** The control ceases to exist. **And `0010` LC1's domain test then returns zero members** — see §17.1, which is a sequencing consequence, not a discharge. | art. 5º XII. |
| **F3** — revocation ineffective in the same document | **critical** | **Discharged.** Nothing transmits in any state. The *rule* RV1–RV3 survives as `0011`'s specification for a future surface. | art. 8º § 5º, art. 18 IX. |
| **F4** — nothing deletes the `_ga` cookies | high | **Not discharged by the GA removal. Discharged by RR1**, and only once RR1 ships. Its scope widens: the obligation is now elimination under art. 16, not restoration after revocation. | art. 18 VI, art. 5º XIV, **art. 16 caput**. §6. |
| **F5** — seven device operands transmitted, excessive | medium | **Discharged.** No operand is transmitted. | art. 6º III. |
| **F6** — the host is invisible in every surface | high | **Survives, unchanged, and becomes the only remaining third party.** `0014` does not worsen it; §7 stops the app contradicting it. | art. 9º I, II, V. §13. |
| **F7** — *Cookies Essenciais* is false | high | **Discharged by deletion of the string — conditionally.** Silent deletion would erase the record that the product asserted it. Discharged only together with §12's recorded non-claim. | art. 9º § 1º → after removal, art. 6º VI. |
| **F8** — transfer with no art. 33 route | high | **GA half discharged** (no transfer remains). **AdSense half survives**, latent, with F1. **Host half was already outside art. 33** by `0011` §26.4.4. | art. 33; Res. 19/2024. §13. |
| **F9** — *"Nada é enviado para nenhum servidor"* | **critical** | **Survives, re-grounded and re-graded to `high`.** §7.3. Discharged only by RR2 + RR2-g. | art. 6º VI, art. 9º caput, MCI art. 7º VIII. |
| **F10** — the record carries no version, no granularity | high | **Discharged.** No record is written, and the existing ones are eliminated. | art. 8º § 2º. |
| **F11** — no route to any policy from any surface | **critical** | **Survives at `critical`, `0011`'s, and its severity does not fall because the affordance left.** §14. | art. 9º caput, MCI art. 7º XI. |

**Count:** six discharged (F2, F3, F5, F7\*, F8-GA, F10), four surviving (F1, F6, F9, F11), one
discharged conditionally on a clause of this gate (F4 → RR1). \*F7 conditionally, on §12.

---

## 10. L6 — `0011` §6.1's OP-test, re-run

The test is `0011`'s and its wording is unchanged: *an operation is in the page's domain when it is an
operação under art. 5º X, performed with data relating to an identified or identifiable natural
person, **and this application causes it***.

**Output after `0014`, with §8.3's override in force:**

| # | Operation | Status | Basis |
|---|---|---|---|
| **T1** | Keeping the calculator's inputs on the device | **Remains, unchanged** | art. 7º IX |
| **T2** | Recording the cookie choice | **Ends.** No writer remains, and existing records are eliminated by RR1. | — |
| **T3** | Audience measurement — Google Analytics | **Ends** | — |
| **T4** | Advertising — Google AdSense | **Ends**, because §8.3 removes the code path that was the condition of its membership (`0011` §6.7: *the condition is on the code, not on the flag*) | — |
| **T5** | Serving the page | **Remains, unchanged and now unconditional-and-alone** | art. 7º IX; and it is a *coleta internacional*, §13 |

**The OP-test returns two operations: T1 and T5.**

### 10.1 — Which of `0011` U1–U10's cells empty, and which do not

**U1–U10 remains the enumerated count.** `0011` §6.9 fixes ten units and `spec.md` Q3 records that;
what moves is the grid, from 10 × 5 to 10 × 2.

| Unit | Effect |
|---|---|
| **U1, U2, U5, U6** (per-operation) | The T2, T3 and T4 rows are **deleted**, not emptied — §6.5, §6.6 and §6.7 of `0011` lose their subject. T1's and T5's rows (§6.4, §6.8) are unchanged word for word. |
| **U2 *duração*** | The retention table loses four rows: T2's derived **24 months** (whose operand was Google's `_ga` lifetime — `0011` §14.3 dies with it), T3's cookies, T3's data at Google, T4's cookies. **T5's host-log period survives and remains `0011`'s H7b.** |
| **U3, U4** (controller, channel) | Unchanged, and now **more** load-bearing: §11's and §15's routes are the only address the user has. |
| **U5** for T1 | *"Nothing is shared"* — unchanged and now true of the whole application's data, not only of T1. |
| **U7** (art. 18 rights) | The nine incisos are unchanged in number. Their **content** narrows: VII names **Vercel Inc.** alone; VIII's *consequências da negativa* loses its consent subject and becomes a statement that there is nothing to refuse and that the host still receives the request. |
| **U8** (the browser-only claim) | **Rewritten to RR2's replacement**, not deleted. §7. |
| **U9** (how to refuse and change one's mind) | **Empties of its subject.** There is nothing to refuse. It is replaced by the art. 18 route of §11 — a cell that changes content, not a cell that goes. |
| **U10** (last-changed date) | Unchanged, and it is the cell that carries §15's version operand. |
| **D8, D9, D10** (`0011` §22/§26.6) | D8 and D9 lose their subject with Google. **D10's Vercel half survives in full**; its Google half goes. |

**This is a delta handed to `0011`, not a rewrite performed here** (`spec.md` § Out of scope 3, 4).
Routed in `STATUS.md`.

---

## 11. L7 — the data Google already holds

### 11.1 — Why this is an obligation and not a disclosure

Two units, each sufficient on its own:

- **art. 15 I + art. 16 caput.** The treatment has ended. Data is *eliminated* after the end of its
  treatment. §6.2's four conservation hypotheses are as closed for the copy at Google as for the copy
  on the device — with one addition: inciso **III** (*transferência a terceiro*) cannot be invoked to
  keep data **at** the third party, because it authorises a transfer, not a retention by the
  recipient on the exporter's behalf.
- **art. 8º § 3º.** *"É vedado o tratamento de dados pessoais mediante vício de consentimento."*
  `0011` §7.4 ruled every record written to date **null** on both triggers of art. 9º § 1º. Data
  collected under a null consent has **no basis at all** — not a weak one — so its continued storage
  at Google is prohibited independently of art. 16.

> **The controller must cause the elimination of the measurement data held by Google. A disclosure
> does not discharge it, and a user request is not a precondition of it** — art. 16 operates on the
> end of treatment, not on a requerimento. art. 18 VI is the *user's* route to the same result; it is
> additional, not alternative.

**art. 18 § 6º** closes the loop and is quoted because it is the unit that makes the instruction a
duty rather than a courtesy: *"O responsável deverá informar, **de maneira imediata**, aos agentes de
tratamento com os quais tenha realizado uso compartilhado de dados a correção, **a eliminação**, a
anonimização ou o bloqueio dos dados, **para que repitam idêntico procedimento**…"*.

### 11.2 — What the controller can actually do, measured against Google's own published mechanisms

| Mechanism | What it reaches | What it does not | Source |
|---|---|---|---|
| **GA4 data-deletion request** | text collected by **event parameters**; replaced by `(data deleted)`; 7-day grace period; **7–63 days** to process; data must be **> 12 days old** | numeric parameters, **auto-collected fields**, reserved values. The seven `session_metadata` operands include numeric ones (`screen_width`, `device_pixel_ratio`) that this route **does not delete**. | S5 |
| **Deleting the property (or the account)** | **everything.** Trash for **35 days**, then permanent; *"Once deleted, the property is gone and we are not able to retrieve any historical data"*; not processed while in the Trash | nothing — it is the complete remedy | S6 |

> **Ruling on L7.** The deletion request is **not sufficient**, by Google's own documentation: it does
> not reach auto-collected or numeric fields, and two of the seven operands this app transmitted are
> numeric. **The obligation is discharged by deleting the GA4 property** — and the account, if it was
> created for this site and holds nothing else. It completes **35 days** after the act.
>
> **H3** — the human performs it and records the date. It is an account action, invisible to the
> repository, and no code in this spec can substitute for it.
>
> **This does not block G2 and it does block the claim.** Until H3 is done, no artifact of this
> product may state that the data has been deleted. §15.4 gives both notice texts so the wording does
> not have to wait for the act, and §12's non-claim row records the gap if the act never happens.

### 11.3 — The user's route, and where it lives

art. 18 I, II, IV, VI and VII, exercised by *requerimento expresso* (§ 3º), **sem custos** (§ 5º),
answered within **15 days** for confirmation and access (art. 19 II), with art. 18 § 4º II obliging a
reasoned answer where the controller cannot act immediately.

**The address is the channel the human supplied to `0011`** and recorded verbatim there at §26.2. It
is reachable today, which is what makes §15's notice shippable before `0011`'s page exists. The page,
when it ships, carries the same route in full — `0011` §22 **D6**, whose substance this section
widens rather than replaces: D6 must now also state that the collection **has ceased entirely**, and
whether H3 was performed.

---

## 12. L8 — `PRODUCT.md` §9

### 12.1 — The rule §9 sets for itself

> *"Anything not in this table is not a claim the product may make, in the UI or in the README."*

**Both strings this spec retires were already outside the table.** Neither *"Nada é enviado para
nenhum servidor"* nor *"Cookies Essenciais / Necessários para o funcionamento do site"* appears in
§9's evidence table at the declared state. They were unbacked claims before this spec opened, which
is why the remedy is a **non-claim row** and not the removal of an evidence row.

### 12.2 — The two rows, their substance, and their unlock sequence

Lesson **003**: a public claim is retired with a recorded non-claim **and** an unlock sequence, never
silently. `content-writer` and `release-manager` write the prose; the substance is fixed here.

| Non-claim | Why it may not be made | Unlock sequence |
|---|---|---|
| **"Nada é enviado para nenhum servidor" / any claim that this application transmits nothing** | The application is served over the network by a host that receives the IP, the time, the URL and the user-agent of every request, before any surface renders and regardless of any choice — `0011` §6.1 **T5**, **F6**. The claim was false while Google Analytics ran (`0011` §7.3, measured) and is **still false after it is removed**, for a reason the removal cannot reach. §7. | It returns only if the product is served in a way that causes **no** request to any host the reader does not control — and then only after a measurement of a cold load showing **zero** requests to any non-origin host, an evidence row in §9 citing that measurement, and a human amendment of §9. Until then, the permitted claim is the narrow one of **RR2(c)**. |
| **"Cookies Essenciais / Necessários para o funcionamento do site"** | The application sets **no first-party cookie of its own** — re-measured at the declared state in §6.4 — and the calculator computes identically with storage empty (`0011` §13.1). Both halves of the string were false: there were no essential cookies, and nothing was necessary for the site to function. `0011` **F7**. | It returns only if the product acquires a cookie it actually sets **and** that cookie is genuinely necessary for the service to function, with the necessity demonstrated by a measurement of the service failing without it — then an evidence row, then a human amendment, then the words. |

### 12.3 — What this is not

`PRODUCT.md` **§3 and §8 are untouched**, per **H2**, and nothing in this section reaches them. §9's
non-claim table is a different instrument: §3 and §8 describe what the product **will** do when ads
ship; §9 records what it **may say today**. Amending §9 is a human approval point (`AGENTS.md` §4);
it is `0011`'s **H6** widened by one row, and it is raised here as **H4** so the two do not collide.

---

## 13. L9 — what transfer remains, and how the host is characterised

### 13.1 — The sweep, over every recipient the post-removal application can reach

Derived by listing the tree at the declared state, not from any document:

```
$ git grep -nEo "https?://[a-zA-Z0-9._-]+" 5c0c6fa -- app components lib hooks
components/organisms/ad-manager.tsx:15: https://pagead2.googlesyndication.com
lib/structured-data.ts:22:             https://schema.org
app/layout.tsx:16:                     https://workload.devrma.com
lib/legal-tables.ts:48:                https://www.legisweb.com.br
$ git grep -nE "fetch\(|XMLHttpRequest|navigator\.sendBeacon|new Image\(" 5c0c6fa -- app components lib hooks
(no rows)
```

| Candidate | Is it a treatment this application causes? | Ruling |
|---|---|---|
| `pagead2.googlesyndication.com` | It would be — and §8.3 removes the path. | **Gone.** |
| `schema.org` | **No.** It is the `@context` value inside a JSON-LD string. No browser fetches it. | Not an operation. |
| `www.legisweb.com.br` | **No.** It is the `href` of a source citation in the footer, navigated only by a deliberate user act, and the link carries `rel="noreferrer"` (`calculator-views.tsx:95` at the declared state), which suppresses the `Referer`. `0011` §6.1 excludes operations a third party performs on its own account and the user's own navigation. | Not an operation **this application causes**. Named so the exclusion is on the record with its reason. |
| `workload.devrma.com` | The application's own origin, served by **Vercel Inc.** | **T5**, and it is the whole of §13.2. |
| **The web font** | `app/layout.tsx:2` uses `next/font/google`, which self-hosts the font file at build time. **Not measured at this gate**, and that is why §16.1 widens AC1 rather than asserting it. | Open until measured; the widened AC1 is what closes it, in either direction. |

### 13.2 — The host, characterised

Res. CD/ANPD nº 19/2024, Anexo I, in the edition in force (§1.1), verbatim:

> **art. 3º V** — *"coleta internacional de dados: coleta de dados pessoais do titular efetuada
> **diretamente** pelo agente de tratamento localizado no exterior"*
>
> **art. 6º** — *"A coleta internacional de dados **não caracteriza** transferência internacional de
> dados. Parágrafo único. A coleta internacional de dados observará as disposições da Lei nº 13.709,
> de 14 de agosto de 2018, quando verificada uma das hipóteses indicadas no art. 3º da Lei."*

> **Ruling on L9.** After the removal — and with §8.3's override in force — **no international
> transfer of this application's causing remains.** The host's receipt of each request is a **coleta
> internacional** under Anexo I art. 3º V and is, by art. 6º, **not** a *transferência internacional*
> and therefore outside art. 33 entirely. **The LGPD continues to apply to it in full** (art. 6º
> parágrafo único; LGPD art. 3º), and the reader must still be told it happens — §15 and `0011` D7.

### 13.3 — The competing reading, carried forward unchanged

`0011` §26.4.4 named it and this gate does not disturb it: **Anexo I art. 3º III** defines
*transferência* as *"operação … por meio da qual um agente de tratamento transmite, compartilha ou
**disponibiliza acesso** a dados pessoais a outro agente de tratamento"*. On that reading, choosing a
foreign host *disponibiliza acesso*, T5 **is** a transfer, and every art. 33 route is closed for it.

**The reading taken is art. 6º, for T5 only, and the assumed operand is the same one `0011`
assumed:** that no Brazilian intermediary holds the request before Vercel does — true of a static
deployment served from Vercel's own edge, false if a Brazilian CDN or proxy is interposed. **If that
ever changes, this ruling changes with it**, and the trigger is the next spec that changes the
hosting or puts a proxy in front of it.

### 13.4 — What `0014` changes about `0011`'s **Q6**

**It makes it cheaper, not different.** Q6 asks the human whether to accept the residual exposure of
the art. 3º III reading rather than change hosts. Before `0014`, a *"no"* would have had to account
for Google as well. After it, the host is the only recipient the answer is about. **Q6 remains open,
remains the human's, and remains `0011`'s.**

---

## 14. L10 — the standing privacy affordance

### 14.1 — What it discharges today, measured rather than assumed

`components/organisms/cookie-consent.tsx:161` is the `aria-label="Configurações de Privacidade"`
control. What it opens is the settings dialog, whose two rows are: *Cookies Essenciais* — which
`0011` **F7** measured to be **false** — and *Telemetria (Google Analytics)* — whose subject this spec
removes. `0011` **F11** measured **0** links to any policy from the banner and **0** from the dialog.

> **The control reaches no information about the treatment of anyone's data. It therefore discharges
> no part of art. 9º caput's *acesso facilitado* and no part of MCI art. 7º XI's *publicidade e
> clareza de eventuais políticas de uso*. Deleting a route that arrives nowhere removes no
> compliance.**

### 14.2 — The ruling

> **There is no legal floor conditioning the removal of `cookie-consent.tsx:161` on `0011`'s page
> shipping.** The sequencing is `tech-lead`'s and this gate imposes no constraint on it.
>
> **Two things follow and neither is optional:**
>
> 1. **`0011` F11 survives at `critical` and its severity does not fall because the affordance left.**
>    art. 9º caput and MCI art. 7º XI bind on T1 and T5 regardless of consent, and they are unmet
>    today, before and after this spec. The route is owed; what is deleted never was the route.
> 2. **Because no page and no privacy surface will exist between `0014` and `0011`, §15's notice
>    carries the controller's channel itself** rather than a link to a page that does not exist. That
>    is the only place this gate lets the sequencing touch a legal obligation, and it resolves it by
>    making the notice self-sufficient.

---

## 15. L11 — what must be said to a returning user

### 15.1 — The unit, and why it is art. 8º § 6º and not art. 9º § 2º

Both were executed; only one bites.

**art. 9º § 2º** — *"se houver **mudanças da finalidade** para o tratamento … **não compatíveis com o
consentimento original**, o controlador deverá informar previamente o titular sobre as mudanças de
finalidade, podendo o titular revogar o consentimento"*. **Silent.** There is no new finalidade; a
finalidade is being extinguished, and extinction is not a change the original consent fails to cover.

**art. 8º § 6º**, verbatim from S1:

> *"Em caso de **alteração de informação referida nos incisos I, II, III ou V do art. 9º** desta Lei,
> o controlador deverá **informar ao titular, com destaque de forma específica do teor das
> alterações**, podendo o titular, **nos casos em que o seu consentimento é exigido**, revogá-lo caso
> discorde da alteração."*

Executed against what changes:

| art. 9º inciso | Does it change? |
|---|---|
| **I** *finalidade específica* | **Yes.** Audience measurement ceases to be a purpose of this application. |
| **II** *forma e duração* | **Yes.** Two cookies and their two-year horizon cease; a `localStorage` entry is eliminated. |
| **III** *identificação do controlador* | No. |
| **V** *uso compartilhado e a finalidade* | **Yes.** The sharing with Google LLC ceases. |

**Three of the four enumerated incisos change.** And the duty to inform is **not** conditioned on
consent: the paragraph conditions only the **revocation** half — *"nos casos em que o seu
consentimento é exigido"*. A qualifier attached to one half of a sentence is a qualifier the other
half does not carry, and reading it onto the first half makes the express carve-out redundant.

### 15.2 — The competing reading, named because it is defensible

art. 8º § 6º sits inside the article governing consent, and a reader may hold that its whole subject
is a consent relationship, so that where the treatment simply ends, the art. 9º standing information
— `0011`'s page — discharges everything and no notice is owed.

**The reading taken, and the operand assumed on the user's behalf:** the informing duty is
unconditional, on the textual argument above. **The operand assumed is that these users were in fact
presented with information under incisos I and V** — and they were, however inadequately: the banner
at `:55-56` states a purpose and the dialog at `:124` names the recipient. For a user who was never
shown either, there is nothing to *alter*, and the notice is not owed — which is exactly the
condition §15.3 measures.

**What breaks under the other reading:** the product renders one dismissible line, once, to a subset
of returning users, which it did not have to. **What breaks under this one if it is wrong in the
other direction:** a user who accepted a transfer to the United States months ago is never told it
stopped, never told the record was deleted from their device, and never told that what Google holds
needs a separate request — and they learn it, if at all, from a page that does not exist yet.
**Where two units each yield a defensible answer, this gate takes the protective one; the price here
is one line and the cost of the alternative is the whole of §11.**

### 15.3 — The rule

> **RR4 — the change notice.**
>
> **Substance, as one sentence about what the user gets:** *a reader whose device carried something
> the removed purpose put there is told, once, that the measurement stopped, what was deleted from
> their device, what that deletion does not reach, and where to ask about the rest.*
>
> **Condition — one operand, measured, not inferred.** The notice renders on a load where the residue
> set of **RR1** was non-empty **before** the clearing ran — that is, where
> `localStorage["workload_cookie_consent"]` was present **or** at least one cookie existed on the
> application's own origin. It renders **exactly once**: after it is shown, it does not return.
>
> **State count, and it must match.** The first-load state space of this rule has **two** members —
> *residue present* and *residue absent*. The notice renders in exactly **one**, and the guard
> asserts both rows: **1** in the residue state and **0** in the clean state. A guard that measures
> only the clean state prints a pass against a build that renders nothing.
>
> **It is not a gap disclosure and must not be written as one.** Its subject is a transition, which is
> genuinely state-dependent. The gap disclosures of this spec — what the host receives, what Google
> still holds — are state-independent and live in RR2, DR2 and `0011`'s page. Scoping *those* to a
> condition would be the inversion this agent's own rule forbids; scoping *this* one is what art.
> 8º § 6º's own words require.

### 15.4 — What it must say, in both worlds

`content-writer` writes the words at G3. The cells, and the second column exists because **H3** may
not be done when this ships:

| Cell | If **H3 is done** (the GA property deleted) | If **H3 is not yet done** |
|---|---|---|
| **What changed** | This application no longer uses Google Analytics; no data about your use is collected or sent to anyone. | identical |
| **What was deleted here** | The record of your cookie choice and the Google cookies this site could read were removed from this device. | identical |
| **What this reaches at Google** | The measurement data held by Google has been deleted at the controller's request, on *(date)*, and is permanently removed 35 days after that act (S6). | **The measurement data collected before this change is still held by Google and this application cannot delete it.** The request has not been made. |
| **Where to ask** | the controller's channel (`0011` §26.2), and `0011`'s privacy page once it ships | identical |

**What it may not say**, and each is refused for a reason already on the record: that the app is now
private or offline (§12, RR2(b)); that nothing reaches any server (§7); that the user's earlier
consent was valid (`0011` §7.4 rules it null); that deleting the cookies deleted what Google holds
(§6.7).

### 15.5 — The axes, each as a quantity with a floor

Per this agent's standing rule, the substance of RR4 is stated in every measurable quantity in which
it can be made false. **Every quantity below is inherited from an instrument this repository already
ships and has already calibrated** — nothing here is a new number, and §16.3 says which one is not yet
calibrated and who calibrates it.

| Axis | Clause | Quantity, and where it comes from |
|---|---|---|
| **Presence** | The notice is present in the DOM in the residue state | count = 1; count = 0 in the clean state |
| **Rendering** | It satisfies LR3 as coded in `tests/e2e/support/legibility.ts` at the declared state: `visibility: visible`, `opacity ≠ 0`, `display ≠ none`, no `hidden`, not inside a closed `<details>`, not inside `[aria-expanded="false"]`, `rect.right > 0 && rect.bottom > 0` | `assertLr3Rendering` |
| **Space** | Its border box is not covered by any `position: fixed` element | `document.elementFromPoint` at its centre returns it or a descendant |
| **Time** | It is present on the **first paint** of the surface that carries it, not after a tap | LR3's *"in every state"* reading, `0010` §3.4 |
| **Size** | Its rendered `width ≥ min(320, available content width)` | `assertLr1`, already shipped |
| **Measure** | Where it wraps to more than one line box and its body text is ≤ 12 px, characters per line box **≥ 40** | `assertLr2b`, already shipped; `0006` §3.2's floor |
| **Modality** | It is in the accessibility tree and in the visual tree — not `aria-hidden`, not visually hidden | both |
| **Operability** | If it carries a dismissal control, that control is reachable by keyboard and its accessible name states what it does | role and name, keyboard path |
| **Order** | The reader's path to it is the element tree's path — no `order-*` and no `sticky` between the reader and it | DOM order equals visual order |

> **Calibration status, stated rather than implied.** Eight of the nine rows read quantities this
> repository already measures with instruments that ship under `tests/`. **None of them has been
> measured against this notice, because the notice does not exist.** They are calibrated at **G5**
> against the built surface and **re-measured at G6 by this gate**; where the prose and the worked
> measurement ever disagree, the measurement wins and this section is corrected, not the
> implementation's reading of it.
>
> **The clause with a failing subject, which is what makes an axis binding rather than decorative:**
> the *space* axis has one. `0010` measured the consent banner occluding the answer in **16 of 16**
> cells at **466 px** — a surface satisfying presence, rendering, size and measure while covering the
> thing the user came for. RR4's notice is the same class of surface and would fail the same axis in
> the same way if it is placed the same way.

---

## 16. Corrections to the acceptance criteria

Each names the state that would pass the criterion while the product is still broken — the test
`AGENTS.md` §5 requires be answered in writing.

### 16.1 — AC1 counts three hosts and is blind to the fourth

**As written**, AC1 counts requests to `google-analytics.com`, `analytics.google.com` and
`googletagmanager.com`. **What state passes it while broken:** any build that replaces Google
Analytics with a different collector — Plausible, Umami, a Vercel-native counter, a single beacon to
the origin's own `/api`. § Non-goals 1 and 2 forbid every one of them, and **AC1 cannot see any of
them.** It is also blind to whether the web font is fetched from a Google host at runtime (§13.1),
which is the one recipient this gate could not rule on from the source alone.

> **AC1 gains one clause, and the clause is the one that scores the Outcome.** In each of the three
> device states, the count of network requests whose URL host is **anything other than the
> application's own origin** is **0**. The named-host count stays as the narrower, faster check.
>
> **Known-bad, from `spec.md`'s own evidence:** the consented state on `HEAD` returns
> `hosts: ["www.googletagmanager.com/gtag/js", "www.google-analytics.com/g/collect"]` — two non-origin
> hosts, so the widened clause prints ≥ 2 and discriminates on the same artifact.
> **Known-good:** `[]`, which is what `spec.md` E5 already printed for the GA-off build over the
> narrow host set and what the widened set must be shown to print too.
>
> **And it is the criterion that settles §13.1's open row in either direction**: if the font is
> fetched at runtime, the widened AC1 prints it, and that is a finding for `0011`'s page — not a
> reason to narrow the criterion back.

### 16.2 — AC4 scores `^_ga` and the rule is *every cookie*

§6.4. **AC4's cookie clause reads:** the number of entries in `document.cookie` on the application's
own origin is **0**. Known-bad `2` (measured, `spec.md` E6, on both builds); known-good `0` (measured,
same page, same run). The pattern form is kept only as a label on the seeded fixture.

### 16.3 — AC8 names a guard that cannot fail

§4.2 and §7.5. **AC8 is satisfied only by RR2-g**, which asserts the verbatim first sentence, the
replacement clause, **and the absence of the retired proposition**. The existing assertion at
`__tests__/calculator-views.test.tsx:68` is retained for the first of those three and is not counted
as evidence for the other two.

### 16.4 — AC5's union and the e2e literal

§4.3. The union stands at 28 **because RR2(a) requires the first sentence verbatim**. If
`content-writer` proposes otherwise, `tests/e2e/disclosure-legibility.spec.ts` joins the union by
name and `tech-lead` records it.

### 16.5 — AC12 binds

§8.3. Its *"if L4 does not rule, this criterion does not apply"* clause is spent: **L4 rules and
AC12 applies.**

### 16.6 — One criterion this gate adds

> **AC13 — the change notice.** On the delivered build at 390×844, in **both** themes: on a device
> seeded with the S-c residue, the count of elements matching RR4's notice is **1** on the first
> load and **0** on the second; on a fresh device it is **0** on every load. The guard asserts both
> the seeded and the clean row, and a run measuring only the clean row is a vacuous pass.
>
> **Known-good is not reachable before the change** — the notice does not exist — and that is stated
> rather than implied. Known-bad is the whole of today: **0** in every state, on both builds.

---

## 17. Divergences from the code, and sequencing consequences

Every row is an instruction to `tech-lead`, to be planned at G4. **This gate edited nothing.**
Coordinates are at `5c0c6fa` (§1.2).

| File and line | What it does | What this analysis requires | Clause |
|---|---|---|---|
| `components/organisms/calculator-views.tsx:75-76` | asserts *"Nada é enviado para nenhum servidor"* | First sentence verbatim; the absolute retired; the narrow claim asserted in its place, adjacent | **RR2**, §7.4 |
| `__tests__/calculator-views.test.tsx:65` | the test **name** re-asserts the retired claim | renamed with the string | §4.2 (b) |
| `__tests__/calculator-views.test.tsx:68` | matches only the true half | kept for (i); joined by assertions for (ii) and (iii) | **RR2-g**, §7.5 |
| `.specs/0001-foundation/copy.md:87` | `footer.privacy` holds the retired claim, and is a **rebuild source** | corrected or annotated at **G7**, or `AGENTS.md` §5's rebuild contract re-publishes it | §4.2 (d) |
| `lib/consent.ts` (whole file) · `components/organisms/cookie-consent.tsx` (whole file) | the consent machinery | deleted with the purpose — **L1 permits it**, §5.3, conditioned on the row below | §5 |
| `components/organisms/ad-manager.tsx:10-19` | env-gated injection of an independent controller's script | **injects no script in any environment** | **L4**, §8.3, AC12 |
| no file — the absence is the defect | nothing eliminates the residue | **RR1**, at the first execution after the change, unconditional | §6 |
| no file — the surface does not exist | nothing is said to the returning user | **RR4**, one notice, once, on the residue condition | §15 |
| no file — an account action | the data at Google survives the removal | **H3**, the property deleted | §11 |
| `PRODUCT.md` §9 | neither retired claim has a non-claim row | two rows, with unlock sequences | **H4**, §12 |

### 17.1 — Three sequencing items this gate found and does not own

`tech-lead` owns the order; this gate owns saying that the order has a legal consequence.

1. **`0010` LC1 becomes vacuous the moment `cookie-consent.tsx` is deleted.** LC1's domain test —
   *every rendered control whose activation contributes to a consent record this application stores
   and acts on* — returns **one** member today and **zero** after. A guard written for it then passes
   against any markup whatsoever. **An untracked `tests/e2e/consent-opening-state.spec.ts` exists in
   the working tree at the moment of this gate**, which is `0010`'s instrument being built right now.
   After `0014` it must be **deleted, not left green**: `AGENTS.md` §5 forbids signing a pass against
   a guard measuring zero instances of its subject. Routed; it is `0010`'s and `tech-lead`'s.
2. **`playwright.config.ts:22-35`'s `storageState` seed and `tests/e2e/support/legibility.ts:127`'s
   init script** both exist to get the banner out of the way. With no banner, the state every e2e
   geometry assertion runs in changes — `spec.md` **Q2**, **R2**. No legal clause of this gate depends
   on that state; RR4's notice, however, **introduces a new first-screen surface on seeded devices**,
   and any suite that seeds residue will now render it. `tech-lead` sequences; this gate names it so
   it is not discovered as a mysterious failure at G6.
3. **`0011` §23's row for `ad-manager.tsx` is superseded in mechanism and not in obligation** by
   §8.3. `0011` planned to consent-gate the injection; `0014` removes it. The obligation to
   consent-gate returns with the feature. **P-ADS**, §18.

---

## 18. Open questions and preconditions for the human

| # | What is needed | Why this gate cannot supply it | Blocks |
|---|---|---|---|
| **H3** | **Deletion of the GA4 property** (and the account, if it exists only for this site), with the **date** of the act recorded. | art. 15 I + art. 16 caput + art. 8º § 3º make it an obligation, not an option (§11.1), and Google's own documentation shows the deletion-request route is **insufficient** (S5). It is an account action, invisible to the repository, and no code in this spec substitutes for it. | **Nothing in the build.** It blocks **what may be said** — §15.4's second column is the text that ships until it is done, and §12's non-claim row records the gap if it never is. |
| **H4** | **The `PRODUCT.md` §9 amendment**: two non-claim rows, with the substance and unlock sequences of §12.2. | `AGENTS.md` §4 human approval point. It is `0011`'s **H6** widened by one row; raised here so the two do not collide. **§3 and §8 are not touched** — H2 stands. | **G7 docs.** Not this gate, not G3. |
| **H5** | **Acceptance, in writing, if RR4 is not to ship.** | §15.2 names the competing reading of art. 8º § 6º under which no notice is owed. This gate takes the protective reading. Only the human may accept a known legal imprecision, and `AGENTS.md` §4 rule 8 requires the acceptance be written into the spec with the norm, the imprecision, who accepted it and why. | Nothing, if RR4 ships. Everything about RR4, if it does not. |
| **P-ADS** *(precondition, not a question)* | A future ads spec may not enable `components/organisms/ad-manager.tsx` until a consent surface satisfying `0011` §8.4, §9.3, §10.4 RV1–RV3, §26.5 **C1–C7** and `0010` **LC1.1–LC1.7** exists and is measured. | `0011` §26.4.3 rules art. 33 VIII the only open transfer mechanism for T4, and its operand is that surface. Removing the path defers the obligation; it does not discharge it. | The ads feature, whenever it is opened. Owner: **`0011`**, then whichever spec opens ads. |

**Carried forward unchanged from `0011`, and named so nobody reads this file as closing them:**
**H5** (maintainability), **H7b** (host log retention), **H8b** (the Analytics processor terms — now
**moot in substance**, since there is no Analytics relationship left to characterise, and it survives
only as a historical question about the data H3 deletes), **Q2/H4-second-half** (personalised
AdSense — moot while §8.3 holds), **Q6** (the art. 3º III reading of the host — §13.4).

---

## 19. What a second analyst must be able to do with this file

`AGENTS.md` §5's rebuild contract, stated for a file that contains no tax table:

- **Reach the same verdict on each of L1–L11** from S1–S6 alone, without opening the repository —
  every unit this file turns on is quoted verbatim in it, with its article number, its edition and
  the md5 of the file actually read.
- **Reproduce the edition check.** §1.1 names the rectification, its date, the unit it changed and the
  two fetches that were compared. An analyst who fetches only `in.gov.br` gets the superseded text and
  will not know it.
- **Re-derive every code coordinate** with `git show 5c0c6fa:<path>` — and know, from §1.2, why
  reading the checkout instead gives a different answer today.
- **Fail this gate where it is wrong.** §0's *what this gate would have rejected on*; the known-bad
  and known-good beside every measurable clause; §15.2's named competing reading with what breaks in
  each direction; §13.3's assumed operand and the event that falsifies it.

**Verdict stands: `pass`.** Eleven dependencies are settled, four rules are binding with their
quantities, five acceptance criteria are corrected at the gate that found them, and nothing
downstream has to invent a norm, a period, a role or a sentence.
