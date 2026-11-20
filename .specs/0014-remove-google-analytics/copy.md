# 0014 — Copy

> Owner: content-writer · Gate: `copy` (G3) · Run 1, **addendum run 2 (B1)**
>
> **Input:** `spec.md` (G1, pass) and `legal.md` (G2, pass, verdict `pass`, run 1). `design.md` is
> still a template — `product-designer` runs in parallel. Every slot below is written against
> `spec.md`'s scope and `legal.md`'s rulings; **no character budget is stated as binding** because
> none exists yet. Reconciliation against `design.md`'s actual slots and budgets is **required
> before G4** and is flagged per string below.
>
> **Addendum, run 2 — reconciling blocker `B1`.** `tech-lead` raised `B1` at G4 run 1
> (`STATUS.md` § Blockers): `design.md` §8 shipped **six slots** (`S1`–`S6`) for the RR4 notice while
> this file shipped **one paragraph** with no title. Splitting that paragraph at its own sentence
> boundaries gives `40 / 121 / 155 (H3 done) or 153 (not done) / 28` characters — `S1` gets nothing and
> `S4` overruns its 140-character budget by 15/13 characters. The fix below is a **redistribution**,
> not a rewrite: every fact the run-1 paragraph asserted is still asserted, RR4's four required facts
> (`legal.md` §15.3) are each still present, and both H3 variants still ship intact, gated on **H3**
> exactly as before. Only `S4`'s wording is tightened (never shortened by dropping a fact) and `S1` is
> newly written, because no version of it existed anywhere. See § `residual-notice.*` — slot
> decomposition below; the original paragraph stays in place immediately above it as the record of
> what was asserted before the split, per `AGENTS.md`'s own instruction not to resolve a rejection by
> softening a claim into something unverifiable against what shipped first.

---

## Voice notes

Nothing here departs from the shipped tone. Two things this spec's copy does that the shipped
strings mostly do not, both because `legal.md` requires them and not because of a style choice:

- **The footer paragraph gets a clause with a legal edit history.** `legal.md` §7.4 binds the
  replacement to what it must *assert*, not to a wordlist, so the rewrite is deliberately close in
  register to the sentence it replaces — same short declarative clauses, same absence of hedging —
  so a returning reader cannot tell which half is new.
- **A one-time notice (RR4) is a new surface type for this app**: it renders once, to a subset of
  devices, and never returns. Nothing shipped today behaves this way. Its voice borrows from the
  footer's register (plain, declarative, no reassurance words) rather than from the deleted banner's
  (which used *"Respeitamos"*, an address to the reader) — because RR4 reports a fact about what
  happened, it does not ask for anything.

---

## Strings

### `calculator-views.footer.privacy` — `components/organisms/calculator-views.tsx:75-76`

**RR2 — replaces the retired claim. `legal.md` §7.4, §7.5 (RR2, RR2-g).**

| | Text | Chars |
|---|---|---|
| pt-BR (full paragraph, one `<p>`, unchanged tag) | Tudo o que você digita fica salvo apenas neste navegador. O que você digita não é enviado para nenhum servidor, e ninguém além de você vê seus horários ou seu salário. | 167 |

Decomposed, because RR2-g's guard checks each clause separately:

| Clause | Text | Chars | Status |
|---|---|---|---|
| (a) — ships verbatim, byte for byte | Tudo o que você digita fica salvo apenas neste navegador. | 57 | **Unchanged.** This is the exact string at `:75` today. `legal.md` §7.4(a): *"the sentence… is rendered unchanged, character for character, in every state."* Do not touch a character of it. |
| (b)+(c) — the replacement clause | O que você digita não é enviado para nenhum servidor, e ninguém além de você vê seus horários ou seu salário. | 109 | **New.** Replaces *"Nada é enviado para nenhum servidor, e ninguém além de você vê seus horários ou seu salário."* |

- **Constraint:** none stated in `design.md` (pending). The replacement must stay inside the same
  `<p>` as clause (a) — `legal.md` §7.4(d): rewriting in place inside the existing `<p>` satisfies
  the ≤8px adjacency rule *by construction*, and is the shape to reach for first. **Do not split into
  two `<p>` elements.**
- **Evidence:** `legal.md` §7.1–§7.4 (L3 ruling); the operand and its scope word are §7.1's table,
  row 2 → row (b)+(c). The narrow, true claim's shape — subject *"o que você digita"*, predicate
  *"não é enviado… nem visto por outra pessoa"* — is §7.4(c) verbatim, restated in pt-BR.
- **Why this exact wording and not a synonym:** §7.4(b) forbids *any* sentence whose subject is the
  application and whose predicate is an absence of transmission, in any vocabulary — *"nada sai do
  seu aparelho"*, *"funciona sem internet"*, *"100% offline"* are named and refused explicitly. The
  chosen sentence's subject is **"o que você digita"**, not the app, which is the only shape §7.4(c)
  permits. See § Rejected phrasings for three variants that were tried and failed the §7.4(e) test.
- **Literal a test depends on verbatim:** `__tests__/calculator-views.test.tsx:68` —
  `expect(screen.getByText(/fica salvo apenas neste navegador/)).toBeInTheDocument()` — matches
  clause (a) only and is **kept**, per `legal.md` §7.5 / §16.3. It is **not** evidence that clause
  (b)+(c) shipped or that the retired string is gone; `tech-lead`/`frontend-dev` must add the other
  two assertions RR2-g names: presence of the replacement clause, and absence of the literal string
  `"Nada é enviado para nenhum servidor"` anywhere in `app components lib hooks`.
- **Not content-writer's to word:** the test **name** at `:65` — *"promises that nothing leaves the
  browser and that the numbers are an estimate"* — restates the retired claim in English inside a
  test description, not in rendered pt-BR. `legal.md` §4.2(b) requires it renamed with the string;
  it is `tech-lead`'s/`frontend-dev`'s at G4/G6, not a copy string.

---

### `cookie-consent.*` — deleted, not reworded

Every string below leaves the product with the component that carries it (`spec.md` Decision 1,
`legal.md` §5.3 L1 ruling). **None is replaced.** Listed so the plan knows exactly what leaves and
invents nothing in its place — `spec.md` § Non-goals 3 forbids a replacement surface, and
`legal.md` §12.3 confirms nothing here reopens `PRODUCT.md` §3/§8.

| File:line | Text | Discharge ground (`legal.md`) |
|---|---|---|
| `cookie-consent.tsx:53` | *Respeitamos sua privacidade* | The control it titled is gone. No claim to retire — a heading, no operand (`spec.md` S4 table). |
| `cookie-consent.tsx:55-56` | *Usamos cookies para melhorar sua experiência e entender como você usa o WorkLoad. Você pode optar por desativar a telemetria a qualquer momento.* | GA half discharged (F5, §9). The *"a qualquer momento"* revocability half was **already false** (`0011` §10.4) — retired with the defect, not despite it. |
| `cookie-consent.tsx:66` | *Configurar* | The choice it opened no longer exists. |
| `cookie-consent.tsx:69` | *Recusar* | Same. |
| `cookie-consent.tsx:72` | *Aceitar Tudo* | Same. |
| `cookie-consent.tsx:151` | *Salvar Preferências* | Same. |
| `cookie-consent.tsx:91` | `aria-label="Fechar configurações de privacidade"` | Same. |
| `cookie-consent.tsx:103` | *Privacidade* | Same. |
| `cookie-consent.tsx:110-111` | *Cookies Essenciais* / *Necessários para o funcionamento do site.* | **F7, `high`, discharged conditionally.** §9, §12.2: this app sets no first-party cookie of its own — the pair was false. Discharged **only together with** the non-claim row below; a silent deletion is refused by lesson 003 and by `legal.md` §12. |
| `cookie-consent.tsx:114` | *Sempre ativo* | Same string, same conditional discharge as the row above. |
| `cookie-consent.tsx:124` | *Telemetria (Google Analytics)* | GA half discharged (F2, §9). |
| `cookie-consent.tsx:126` | *Ajuda a entender como o site é usado.* | Same. |
| `cookie-consent.tsx:161` | `aria-label="Configurações de Privacidade"` | **F11 survives at `critical`, unchanged severity** (`legal.md` §14.2) — the *route* this control never actually provided is still owed, and remains `0011`'s to build. Deleting the control that led nowhere "removes no compliance" (§14.1). No copy string replaces it; `legal.md` §14.2(2) routes any needed channel into RR4 instead (below), not into a new standing control. |

**Every one of these thirteen strings is deleted with its component. Do not port any of them into a
new surface** — `spec.md` § Non-goals 3.

---

### `residual-notice.*` — new, conditional. `legal.md` §15.3–§15.4 (RR4), §16.6 (AC13)

A one-time notice. Renders **once**, only on a device whose residue (`workload_cookie_consent` in
`localStorage`, or any cookie on this origin) was present **before** RR1's clearing ran on this load.
Never renders on a fresh device, and never renders again on the same device after its first showing.
Its slot, placement and whether it carries a visible dismiss control are `design.md`'s — the two
strings below are written to stand alone in either shape.

Two variants, selected by whether **H3** (deletion of the GA4 property, `legal.md` §11.2) has been
done at ship time. `legal.md` §15.4's table gives the substance in English cells; both are worded
here in full pt-BR, in the same paragraph shape, so swapping one clause is the only difference
between them.

| | Text | Chars |
|---|---|---|
| pt-BR, **if H3 is done** | Este site não usa mais Google Analytics. O registro da sua escolha sobre cookies e os cookies do Google que este site conseguia ler foram apagados deste aparelho. Os dados de medição que já estavam com o Google foram apagados a pedido de quem mantém o site, em [DD/MM/AAAA], e somem de vez 35 dias depois desse pedido. Dúvidas: contact@devrma.com. | 347 |
| pt-BR, **if H3 is not yet done** | Este site não usa mais Google Analytics. O registro da sua escolha sobre cookies e os cookies do Google que este site conseguia ler foram apagados deste aparelho. Os dados de medição coletados até aqui ainda estão com o Google. Este site não consegue apagá-los sozinho, e o pedido para apagá-los ainda não foi feito. Dúvidas: contact@devrma.com. | 345 |

- **`[DD/MM/AAAA]` is not a placeholder for content-writer to invent a date into.** It is filled with
  the recorded date of H3's act (`legal.md` §11.2, §18 H3 row) at the moment the "done" variant ships.
  Until that date exists, **only the "not yet done" variant may ship**, regardless of which is
  easier to build against — `legal.md` §15.4's own note: *"no artifact of this product may state
  that the data has been deleted"* before H3.
- **Constraint:** none stated in `design.md` (pending) — flagged for reconciliation. Both variants
  are one paragraph so they can render inside a single `<p>` regardless of the surface
  `product-designer` chooses. At 347/345 characters this is markedly longer than any other footer
  disclaimer in the app (the longest existing footer `<p>`, `calculator-views.tsx:86-91`, runs to
  roughly 370 characters over five clauses) — this is not a place to trim by cutting a clause: RR4's
  four facts (measurement stopped; what was deleted here; what that reaches at Google; where to ask)
  are each independently required by `legal.md` §15.3, none is optional content, and a shorter
  paraphrase that drops one of them fails the criterion it exists to satisfy (AC13).
- **Dismiss control, if `design.md` gives it one:** `aria-label="Fechar aviso"` (9 words / 12
  characters). Matches the register of the deleted `cookie-consent.tsx:91`'s
  `aria-label="Fechar configurações de privacidade"` without inheriting its subject.
- **Evidence:** `legal.md` §15.3 (RR4, the rule and its condition), §15.4 (the four cells, in both
  worlds), §15.5 (the nine measurable axes it must satisfy, `content-writer` writes to none of them
  directly — they are `product-designer`'s and `qa-engineer`'s), §11.2 (the 35-day figure and its
  source, S6), §11.3 / `0011` §26.2 (the channel, `contact@devrma.com`, rendered as literal text).
- **What it may not say, each refused with its reason already on the record** (`legal.md` §15.4):
  that the app is now private or offline; that nothing reaches any server; that the user's earlier
  consent was valid; that deleting the on-device cookies deleted what Google holds. None of the two
  variants above says any of these four things — checked against each clause below.

---

### `residual-notice.*` — slot decomposition (**B1**, addendum run 2)

`design.md` §8 gives `PrivacyChangeNotice` six slots. The table below is the same four facts as the
paragraph above, cut at the slot boundaries `design.md` actually drew — cell 1 → `S2`, cell 2 → `S3`,
cell 3 → `S4` (two variants), cell 4 → `S5` — plus a title, `S1`, which is new: no version of it exists
in run 1 or anywhere else, because a one-paragraph surface has no separate accessible name to write.
`S6` (the dismiss control) is unchanged from run 1 and is repeated here only so this table is complete
on its own.

| Slot | Role (`design.md` §8) | Budget at 390 | Text | Chars | Margin to budget |
|---|---|---|---|---|---|
| **S1** | Title, `<h2 id="privacy-change-title">`, the region's accessible name | ≤ 26 (1 line); ceiling 52 (2 lines) | **Mudança de privacidade** | 22 | 4 |
| **S2** | Cell 1 — what changed | ≤ 130 | **Este site não usa mais Google Analytics.** | 40 | 90 |
| **S3** | Cell 2 — what was deleted on this device | ≤ 130 | **O registro da sua escolha sobre cookies e os cookies do Google que este site conseguia ler foram apagados deste aparelho.** | 121 | 9 |
| **S4**, H3 done | Cell 3 — what this does not reach at Google | ≤ 140 | **Os dados que o Google tinha foram apagados a pedido de quem mantém o site em [DD/MM/AAAA] e somem de vez 35 dias depois desse pedido.** | 133 (131 once `[DD/MM/AAAA]` is replaced by a ten-character date, which is two characters shorter than the bracketed placeholder) | 7 (9 once filled) |
| **S4**, H3 not done | Cell 3, other world | ≤ 140 | **Os dados coletados até aqui ainda estão com o Google. Este site não consegue apagá-los sozinho, e o pedido ainda não foi feito.** | 127 | 13 |
| **S5** | Cell 4 — where to ask | ≤ 130 | **Dúvidas: contact@devrma.com.** | 28 | 102 |
| **S6** | Dismiss control, `aria-label` | ≤ 30 | **Fechar aviso** | 12 | 18 — unchanged from run 1 |

**S1 — written as a name, not a sentence fragment.** The region's accessible name is what a screen
reader announces before any of `S2`–`S5`, so it has to stand alone, outside the sentence it introduces.
*"Mudança de privacidade"* is a noun phrase — it names the class of thing the section is about (the
component is `PrivacyChangeNotice`, this is the pt-BR of that name), not a clause borrowed from one of
the four facts. It does not repeat "Google Analytics" because the notice's scope is wider than that one
fact (`S3` and `S4` are about cookies and about Google-held data, not only about the measurement tool),
and repeating the narrowest fact in the title would misdescribe the other three. 22 characters, 4 under
the 26-character one-line budget — not against the ceiling, and not against zero either: it is the
shortest correct name, not a name trimmed to fit.

**S2, S3, S5 — unchanged from the run-1 paragraph's sentences.** Each already sat inside its slot's
budget with a double-digit margin (`S2` by 90, `S3` by 9, `S5` by 102) once the paragraph was cut at
these exact boundaries, so nothing about their wording needed to move for `B1`. `S3`'s margin (9
characters) is the tightest of the three untouched slots; it is still comfortably inside a single
ceiling-style budget (`design.md` §8 states one number per slot, not a set of disjoint windows, so
lesson **055**'s gap does not apply here — there is no forbidden band between two windows to land in,
only one ceiling to stay under).

**S4 — the only slot that required new wording, and why the fact survives the cut.** Both variants of
the run-1 sentence exceeded 140 characters (155 done / 153 not done). The words removed are exactly the
words that repeated something already said elsewhere or that could be said more plainly without
changing what is asserted:

- *"que já estavam com"* → *"que o Google tinha"* (done) / dropping *"de medição"* (both variants):
  the notice has already named Google Analytics as the only channel to Google (`S2`), so within this
  notice *"os dados que o Google tinha"* has no other referent to be confused with — it is not a
  broadened claim, it is the same claim without repeating a scope word the reader has already read
  two sentences earlier.
- *"de vez"* and *"desse pedido"* are both **kept** in the H3-done variant. Permanence (*"de vez"*) is
  one of the four facts (`legal.md` §15.4 cell 3: *"permanently removed"*), not a stylistic flourish.
  *"Desse pedido"* is the anchor for *"35 dias depois"* — lesson **049**'s test, run here on an anchor
  rather than a pointer word: read the sentence with no other candidate antecedent in scope, and check
  whether *"depois"* would still have something to point at without it. It would not — a bare *"35
  dias depois"* at the end of a sentence that has already named an act (*"apagados"*) and a request
  (*"a pedido"*) leaves a reader to guess which of the two the clock starts from. So this word stays,
  and the trim comes entirely from elsewhere in the sentence.
- One comma is dropped (*"o site, em"* → *"o site em"*) — punctuation, not content.
- The not-done variant lost *"de medição"* only (its *"o pedido ainda não foi feito"* clause already
  fit before the cut) — no clause was removed, one adjective was.

No fact from `legal.md` §15.4's cell 3 is missing from either rewrite: what is held, what happened to
it (or did not), the actor, the date (done variant only) and the ceiling on when it becomes permanent
(done variant only, *"de vez"*) are all still stated. Both rewrites land with a real margin (7/9
characters for the done variant once the date is filled in, 13 for the not-done variant) — not at
140, because a slot resized by one future word (a longer date format, a `qa-engineer` correction) must
not immediately overrun again.

**If a future H3-done date ever pushes past 140.** `[DD/MM/AAAA]` and any real date rendered in that
format are both ten characters inside the brackets' place (`19/09/2026` = 10, `[DD/MM/AAAA]` = 12
including its own brackets) — the filled string is never longer than the draft measured here, so no
future date breaks this budget. If `legal.md` or a later gate ever requires a longer date format, that
is a new measurement against a fact this file did not write, not a trim.

---

## Rejected phrasings

| Considered | Why it lost |
|---|---|
| *"Nada sai do seu aparelho, e ninguém além de você vê seus horários ou seu salário."* | Subject is still **the application as a whole** (*"nada sai"* has no scoped operand), predicate is still an absence of transmission. Fails the §7.4(e) test: it remakes the retired claim in different words. Refused by `legal.md` §7.4(b) by name — *"nada sai do seu aparelho"* is one of the four listed examples. |
| *"Este site funciona 100% offline, e ninguém além de você vê seus horários ou seu salário."* | *"100% offline"* is named explicitly in `legal.md` §7.4(b) as a forbidden restatement of the same claim. |
| *"O que você digita não sai do seu aparelho, e ninguém além de você vê seus horários ou seu salário."* | Scoped correctly (subject is *"o que você digita"*, not the app) but *"sai do aparelho"* is a spatial metaphor that does not name the operation the sentence is correcting — a reader cannot tell whether it means "leaves the screen" or "is transmitted over the network." The shipped clause uses *"não é enviado para nenhum servidor"*, reusing the retired sentence's own precise term (*servidor*) so the correction reads as a narrowing of the same claim, not a new one. |
| RR4, single-sentence version: *"Paramos de usar o Google Analytics."* | Discharges only cell 1 of RR4's four required cells (`legal.md` §15.3). Silent on what was deleted, what remains at Google, and where to ask — each independently required. Rejected as under-informative, not as too long. |
| RR4 dismiss label *"Entendi"* | Matches nothing else shipped in this app; the one existing dismiss control in the surface being deleted (`cookie-consent.tsx:91`) names the *action* (*"Fechar configurações de privacidade"*), not an acknowledgement. `"Fechar aviso"` keeps that shape. |
| **S1** *"Fim do Google Analytics"* (23 chars) | Names only the fact in `S2`. The notice's other two facts (`S3`, cookies deleted from this device; `S4`, what remains at Google) are not about Google Analytics as a tool, they are about cookies and about a separate company's retention — a title that names the narrowest fact misdescribes the two-thirds of the notice that are not about it. |
| **S1** *"Aviso de privacidade"* (21 chars) | Reads as the name of a standing page or a permanent control — exactly the surface `legal.md` §14.2 rules this notice is **not** (it renders once and never returns). Also collides in register with the retired banner's own heading style (*"Configurações de Privacidade"*), which is the surface this one replaces, not extends. |
| **S1** *"O que mudou aqui"* | A question-shaped fragment, not a name — fails the "write it as a name" instruction directly: it reads as the opening clause of a sentence with no verb supplied, not as a noun phrase a screen reader can announce as a heading. |
| **S4**, done, unmodified original (155 chars) | Exceeds `design.md` §8's 140-character ceiling by 15. Kept as the record of what was asserted before the cut — see § `residual-notice.*` above. |
| **S4**, not done, unmodified original (153 chars) | Exceeds the ceiling by 13. Same disposition. |

---

## Traces

Every legal or numeric claim above, matched to its `legal.md` passage:

| String | Claim | `legal.md` section |
|---|---|---|
| `calculator-views.footer.privacy` clause (b)+(c) | What is and is not transmitted, and to whom | §7.1–§7.4 (L3), RR2 |
| `cookie-consent.*` deletions | Each string's discharge ground | §9 (L5), findings F2/F3/F5/F7/F10 |
| `residual-notice.*` / **S2** | GA is no longer in use | §10 (L6), T3 "ends" |
| `residual-notice.*` / **S3** | What RR1 removes, and when | §6 (L2), RR1, §6.4 RR1-m |
| `residual-notice.*` / **S4**, H3 done | The 35-day permanent-deletion figure, and that the deletion is at the controller's request and on a recorded date | §11.2, source S6 |
| `residual-notice.*` / **S4**, H3 not done | The deletion request is insufficient / not yet made | §11.2, source S5; §18 H3 |
| `residual-notice.*` / **S5** | The channel | §11.3; `0011` legal.md §26.2 |
| `residual-notice.*`, rendering condition (`S1`–`S6` as a surface) | Once, on residue-present devices only, never again | §15.3 RR4 |

**S1 carries no row above, by the same rule that exempted `cookie-consent.tsx:53`'s heading** (§
`cookie-consent.*` table above: *"a heading, no operand"*). *"Mudança de privacidade"* names a topic;
it asserts no fact about law, tax or money on its own — the facts are `S2`–`S5`'s, each traced. **S6**
likewise carries no trace: an instruction to close a control states no fact.

No string in this file asserts a fact with no row above. Any future string added to this file that
asserts anything about law, tax or money must gain one.

---

## Error and empty states

**None introduced.** This spec adds no field, no toggle, no form, no input `spec.md` § Acceptance
criteria confirms this: *"this spec adds no field, no toggle and no setting."* The only new surface,
`residual-notice.*`, has no input to be wrong and no impossible value to reach — it is a rendering
condition on stored state, not a user action. There is no "silence is a defect" case to write here
because there is no failure mode the user can cause.

---

## Disclosures

Every disclosure `legal.md` required, with the wording and the slot it lands in:

| # | Obligation | Wording | Slot |
|---|---|---|---|
| 1 | The host still receives every request; the app must not imply it is serverless (`legal.md` §7.3, §13.2, MCI art. 7º VIII) | Discharged by **not claiming the opposite** — clause (b) of the footer replacement names no absence of server contact for the app as a whole. No new sentence states the host's receipt; `legal.md` §0 "Explicitly not covered" leaves that enumeration to `0011`'s privacy page. | `calculator-views.footer.privacy` (by omission, correctly) |
| 2 | The true half of the footer must survive the correction (`0011` §22 D2) | Clause (a), verbatim, unchanged | `calculator-views.footer.privacy` |
| 3 | The standing privacy control is deleted; F11 (no route to any policy) is unaffected, not worsened | No new standing control is built (`spec.md` Non-goal 3). The one route this spec does add is RR4's contact channel, and only to the devices RR4 reaches. | `residual-notice.*` / **S5** |
| 4 | The user is told, once, that their stored consent record and cookies were deleted, and what that does not reach | `residual-notice.*` **S3** and **S4** (both variants) | `residual-notice.*` / **S3**, **S4** |
| 5 | What Google already holds is not reached by anything client-side; the honest ceiling is stated, not implied | `residual-notice.*` **S4**, in **both** variants — including the "not yet done" one, which says plainly the request has not been made | `residual-notice.*` / **S4** |
| 6 | The two retired claims get recorded non-claims, not silence (lesson 003, `legal.md` §12.2) | Drafted below, blocked on **H4** | `PRODUCT.md` §9 (G7, not this gate) |

### `PRODUCT.md` §9 — two non-claim rows, drafted for G7, blocked on H4

**Not shipped at this gate.** `legal.md` §18 H4: amending §9 is a human approval point, and the
words are drafted now only so G7 does not start from nothing. `release-manager` places them; nobody
edits `PRODUCT.md` §9 before **H4** clears.

| Non-claim | Why it may not be made |
|---|---|
| **"Nada é enviado para nenhum servidor" / qualquer afirmação de que este site não transmite nada** | Toda visita é recebida por quem hospeda o site, que registra o IP, o horário, a URL e o navegador de quem acessa, antes de qualquer tela aparecer. Só o que você digita — seus horários e seu salário — fica no aparelho. |
| **"Cookies Essenciais"** | Este site não define nenhum cookie próprio, e funciona da mesma forma com o armazenamento do navegador vazio. Não havia cookie essencial a declarar. |

Format matches the existing `PRODUCT.md` §9 non-claim table (`Banco de horas`, spec `0002`) exactly,
so `release-manager` can paste both rows without reshaping the table.

---

## Numbers and units

- **No currency, percentage or tax-table value appears in any string this spec writes.** This spec
  touches no `lib/` computation (`spec.md` § Out of scope 2).
- **The one date this file carries is `[DD/MM/AAAA]`**, in **S4**'s "H3 done" variant — filled with
  H3's recorded act date, not a placeholder for invented content. See the string's own note above.
  The bracketed placeholder (12 characters) is never shorter than the date it will be replaced by
  (10 characters in `DD/MM/AAAA` form), so filling it can only tighten S4's margin to its budget, never
  widen the overrun risk.
- **The one duration this file carries is "35 dias"**, `legal.md` §11.2, source S6 (Google, Analytics
  Help 9305176: Trash retention before permanent deletion). Written as *"35 dias depois desse
  pedido"* in **S4** (H3 done), matching how the app states other durations in plain language elsewhere
  in the footer (`calculator-views.tsx:87`, *"os dados … 5h"*) — a number and a unit, no abbreviation.
- **No year-of-table citation applies.** RR2 and RR4 assert facts about this application's own
  behaviour and about Google's stated retention policy, not about a tax or legal table with an
  effective year (`PRODUCT.md` §4's rule does not trigger here).

---

## Metadata

**Unchanged.** This spec does not touch `app/layout.tsx`'s title, description, or any string in
`app/manifest.ts` — the only edit `app/layout.tsx` receives is the removal of the `CookieConsent`
import and mount (`spec.md` § Scope S2), which carries no copy.

---

## Checks

- [x] Every string is pt-BR — there is no i18n layer and the strings live in the components
- [x] It reads as a native original, written for a worker who is not a lawyer — no LGPD, "consent",
      "processing" or "controller" appears in any user-facing string; `legal.md`'s legal vocabulary
      stays in `legal.md` and in this file's own Traces section, never in a rendered string
- [x] Every legal claim traces to a passage of `legal.md`; every other factual claim to `PRODUCT.md`
      — see § Traces
- [x] Every literal a test depends on verbatim is listed, with its `file:line` —
      `__tests__/calculator-views.test.tsx:68`, under `calculator-views.footer.privacy`
- [x] No string contains an em dash or en dash (`__tests__/copy-guards.test.ts`, "no user-visible
      em-dash or en-dash survives") — checked by hand against every string in this file, including
      every `S1`–`S6` string added in the run-2 addendum; `npx vitest run __tests__/copy-guards.test.ts`
      re-run at run 2 (8/8 passing, unaffected by this file since the guard reads shipped `.tsx`
      sources, not `.specs/`, but run anyway per this gate's own instruction to check every guard
      before reporting)
- [x] Character budgets reconciled against `design.md` — **closed at run 2 (B1)**. `design.md` §8's
      six slots each carry a string, a character count and a stated margin to that slot's ceiling —
      see § `residual-notice.*` — slot decomposition. `S1` (new), `S2`, `S3`, `S5`, `S6` are unchanged
      in substance from run 1; `S4` is reworded, both variants, to clear its ceiling by 7/13 characters
      instead of overrunning it by 15/13. No fact from `legal.md` §15.3/§15.4 was dropped in the
      rewrite — see that section's own accounting of every word removed.
