# 0013 — legal.md · G2

**pass**

> `labor-law-analyst`, gate **G2**, run **1**. Settles **L1–L12**. Overturns one `spec.md` default
> (**L12**) and confirms two (**L6**, **L7**). No scope override is requested and nothing is blocked
> to the human as a scope question; three items are routed as findings, and one document-level claim
> in `PRODUCT.md` is routed to the human because only the human may change it.

---

## 0. How everything below was measured

Two coordinates for every count and every rendered state (`AGENTS.md` §5, *How a claim about the tree
is measured*).

| | |
|---|---|
| **Tree state** | working tree of `fix/design-taste-preflight`, `HEAD` **5c0c6fa**, read 2026-09-19 14:30–14:45. Every `grep` count below was run **at the moment the claim was written**, not earlier in the session (lesson **060**). |
| **Application state** | six states rendered on purpose, named in §7 by the props that produce them. No adjective, no screenshot. |
| **Instrument** | Vitest + Testing Library (jsdom) in an **isolated copy** — `rsync -a --exclude node_modules --exclude .next --exclude .git` into the scratchpad, `cp -al` of `node_modules`. The repository working tree was not modified, reverted or restored by any run here. |
| **No browser, no port, no server** | `uptime` at 14:37 read load average **28,65** with four developers in the tree, and the team lead barred a browser run. Nothing in this file is a geometric measurement taken **in this session**; every geometric figure quoted carries the session it was taken in and the build it was taken on. §8 names the gate that takes the ones still missing. |
| **Primary sources** | fetched in this session with `curl` from `planalto.gov.br`. `WebFetch` returned `ECONNRESET` against that host; `curl -A "Mozilla/5.0"` returned **200** for each document and the operative text was extracted from the bytes fetched, not from memory. |

### 0.1 Editions and *vigência* — lesson **057**, discharged per source

| Unit | Edition identifier | Edition date | URL (fetched 2026-09-19) | Last instrument touching it, and its status |
|---|---|---|---|---|
| CF/1988, art. 7º, XVI | texto constitucional compilado até **EC nº 136/2025** | promulgação 1988-10-05 | `https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm` | **nunca emendado**. O compilado não traz nota de redação sobre o inciso XVI; as emendas ao art. 7º atingiram os incisos I (ADCT), XXIX (EC 28/2000) e XXXIV (EC 72/2013) |
| CF/1988, art. 7º, XXVI | idem | 1988-10-05 | idem | nunca emendado |
| CLT, art. 59, *caput* e §1º | Decreto-Lei nº 5.452/1943, texto compilado | redação em vigor desde **2017-11-11** | `https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm` | **Lei nº 13.467/2017**, com nota `(Vigência)`. **A MP nº 808/2017 não alterou o art. 59** — no mesmo documento ela aparece com `(Vigência encerrada)` sobre o art. 611-A, *caput* e incisos XII/XIII, o que confirma que a página marca explicitamente o que caducou. O texto do §1º em vigor é o de 50%; o texto histórico de **20%** também aparece na página e **não** é o vigente |
| CLT, art. 611-A, I | idem | 2017-11-11 | idem | **Lei nº 13.467/2017**. A redação da **MP nº 808/2017** consta com `(Vigência encerrada)`; o texto operativo é o da Lei 13.467 |
| CLT, art. 611-B, X | idem | 2017-11-11 | idem | Lei nº 13.467/2017, sem alteração posterior |
| LC nº 150/2015, art. 2º, §§1º–2º | texto compilado | 2015-06-02 | `https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp150.htm` | sem alteração |
| Lei nº 8.906/1994, art. 20, §§2º e 3º | texto compilado | §§2º e 3º: **1994-07-05** (texto originário) | `https://www.planalto.gov.br/ccivil_03/leis/l8906.htm` | **Lei nº 14.365/2022** deu nova redação ao ***caput***; **os §§2º e 3º não foram alterados** e permanecem com o texto originário. A página exibe as duas redações do *caput*, com a nota `(Redação dada pela Lei nº 14.365, de 2022)` sobre a segunda |

**A prova de que a edição lida é a edição que penso ter lido** (lesson 057, segunda obrigação): tomei
uma unidade de que **não** preciso — CLT art. 611-A, XIII — e a confrontei com a lista do instrumento
reeditante. Ela aparece três vezes na página: incluída pela Lei 13.467, `(Revogado Medida Provisória
nº 808, de 2017)`, `(Vigência encerrada)`, e reinstaurada. A página, portanto, marca revogações
caducadas e as desfaz — é a edição consolidada corrente, e não uma cópia congelada.

**Nenhuma súmula do TST é carga desta análise.** §6 **L10**/**L11** julgam apenas a *co-presença* de
strings que citam Súmulas 60, 146 e 172; a verificação substantiva dessas súmulas é de
`.specs/0003-citation-registry/legal.md` §5 e **não é re-derivada aqui**. Essa fronteira está dita em
voz alta para que nenhum gate posterior leia este arquivo como tendo revalidado aquelas súmulas.

---

## 1. Scope of this analysis

**Cobre:**

1. A qualificação legal das duas taxas que `components/organisms/day-summary.tsx:193` e `:203`
   renderizam como rótulo de dinheiro (**M1**, **M2**), e do limite de 120 minutos que decide em qual
   das duas linhas um minuto cai (`hooks/use-work-calculator.ts:9`).
2. O conteúdo que a divulgação deve afirmar, por afirmação, com a norma de cada uma.
3. As condições de renderização dessa divulgação, por eixo mensurável.
4. A varredura do domínio de entrada — quais arranjos contratuais em vigor produzem qual número para
   a mesma jornada.
5. A proveniência dos dois valores no `localStorage` (**L12**), medida por execução.

**Não cobre, e o diz:**

- Qualquer aritmética. Nenhum valor monetário muda por conta deste arquivo; §9 reproduz os números
  atuais como *estado esperado inalterado*, não como proposta.
- O roteamento de sábado/domingo. É de `0012`, já corrigido lá, e **§6 L9** explica por que não
  reabro nem menciono o dia da semana.
- A verificação substantiva das Súmulas 60, 146 e 172 (ver §0.1).
- As tabelas de INSS/IRRF e o divisor — nenhuma entra nesta feature. `lib/legal-tables.ts` não é
  tocado e não precisa ser reconstruído a partir daqui; o contrato de rebuild deste spec é o conjunto
  de textos operativos transcritos em §2.

---

## 2. Rules — as unidades operativas, executadas uma a uma

Cada linha traz a unidade, o que ela enacta nas minhas palavras, a vigência, a URL e **o número que
ela produz** para o caso trabalhado de §9 (segunda-feira, 4h12m de extras, hora bruta R$ 68,1818).
Nenhuma unidade recebe "não se aplica" sem um número ao lado.

### 2.1 O piso

| # | Norma e unidade | O que exige | Vigência | Fonte | Número que produz em §9 |
|---|---|---|---|---|---|
| **N1** | **CF/1988, art. 7º, XVI** — *"remuneração do serviço extraordinário superior, no mínimo, em cinqüenta por cento à do normal"* | um **piso**, não um valor. Fixa o mínimo de todo serviço extraordinário, sem distinguir a primeira da quinta hora | 1988-10-05 | planalto.gov.br/ccivil_03/constituicao/constituicao.htm | **R$ 429,55** (4,2 h × 68,1818 × 1,5) |
| **N2** | **CLT, art. 59, §1º** (red. Lei 13.467/2017) — *"A remuneração da hora extra será, pelo menos, 50% (cinquenta por cento) superior à da hora normal."* | repete o piso em lei ordinária. *"pelo menos"* é o operador decisivo: a norma não produz 50%, produz ≥50% | 2017-11-11 | planalto.gov.br/ccivil_03/decreto-lei/del5452.htm | **R$ 429,55** |
| **N3** | **CLT, art. 611-B, X** — objeto **ilícito** de CCT/ACT é *"a supressão ou a redução"* de *"remuneração do serviço extraordinário superior, no mínimo, em 50% à do normal"* | fecha o piso por baixo: nenhum instrumento coletivo desce dele | 2017-11-11 | idem | **R$ 429,55** é o mínimo absoluto; nada abaixo é lícito |
| **N4** | **LC nº 150/2015, art. 2º, §1º** — *"A remuneração da hora extraordinária será, no mínimo, 50% superior ao valor da hora normal."* | mesmo piso para o empregado doméstico, por norma própria | 2015-06-02 | planalto.gov.br/ccivil_03/leis/lcp/lcp150.htm | **R$ 429,55** |

### 2.2 O teto de quantidade — e o que ele **não** é

| # | Norma e unidade | O que exige | Número que produz em §9 |
|---|---|---|---|
| **N5** | **CLT, art. 59, *caput*** (red. Lei 13.467/2017) — *"A duração diária do trabalho poderá ser acrescida de horas extras, em número não excedente de duas, por acordo individual, convenção coletiva ou acordo coletivo de trabalho."* | um **teto de quantidade**: no máximo duas horas extras por dia, e só mediante um dos três instrumentos nomeados | **nenhuma taxa.** O *caput* diz quantas horas, **nunca quanto a excedente custa**. Para 4h12m ele produz um **excesso de 2h12m sobre o teto** — o que é matéria do `lib/compliance.ts`, não do preço |

**Este é o ponto em que uma mecânica falsa nasce.** `FIRST_TIER_LIMIT_MINUTES = 120` é numericamente
igual ao teto do *caput* e **não é derivado dele**: o *caput* limita a quantidade lícita, a constante
decide um **preço**. Os dois coincidem no valor 120 e divergem no operando — um é `duas horas ×
60 min` como limite de licitude; o outro é `duas horas × 60 min` como fronteira de tarifa. Não há
unidade operativa que converta a primeira na segunda. Qualquer citação do art. 59, *caput*, ao lado
do degrau de tarifa é uma **atribuição errada** e está proibida em §6 **L6** e §8 **D-0013.C3**.

### 2.3 As unidades que dispensam ou adiam o acréscimo

| # | Unidade | O que enacta | Número que produz em §9 |
|---|---|---|---|
| **N6** | CLT, art. 59, **§2º** (red. MP 2.164-41/2001, ainda vigente na página compilada) | o acréscimo **pode ser dispensado** se o excesso for compensado em outro dia, no máximo de um ano, sem passar de dez horas diárias | **R$ 0,00** de adicional, se o dia for compensado |
| **N7** | CLT, art. 59, **§5º** (Lei 13.467/2017) | banco de horas por acordo individual escrito, compensação em até seis meses | **R$ 0,00**, mesmo operando de N6 |
| **N8** | CLT, art. 59, **§6º** (Lei 13.467/2017) — *"É lícito o regime de compensação de jornada estabelecido por acordo individual, tácito ou escrito, para a compensação no mesmo mês."* | compensação mensal por acordo **tácito** — a hipótese mais comum e a que o app nunca pergunta | **R$ 0,00**, mesmo operando |
| **N9** | CLT, art. 59, **§3º** (red. Lei 13.467/2017) | horas não compensadas pagas na rescisão, pela remuneração da data da rescisão | não é esta tela |
| **N10** | CLT, art. 59, **§4º** | **revogado** pela Lei 13.467/2017 | nenhum número |
| **N11** | CLT, art. 59-A (Lei 13.467/2017) | jornada 12×36 por acordo individual escrito, CCT ou ACT | para um trabalhador 12×36, as horas entre a 8ª e a 12ª **não são extras** e o app as precificaria como extras — ver §10 **F-3** |

### 2.4 As unidades que produzem uma taxa **acima** do piso

| # | Unidade | O que enacta | Vigência | Fonte | Número que produz em §9 |
|---|---|---|---|---|---|
| **N12** | **CF/1988, art. 7º, XXVI** — *"reconhecimento das convenções e acordos coletivos de trabalho"* | dá eficácia ao instrumento coletivo | 1988-10-05 | constituicao.htm | qualquer valor ≥ piso, **inclusive um degrau por faixa de hora** |
| **N13** | **CLT, art. 611-A, I** — a CCT e o ACT *"têm prevalência sobre a lei quando… dispuserem sobre: I — pacto quanto à jornada de trabalho, observados os limites constitucionais"* | autoriza o pacto coletivo sobre jornada; lido com N3, o instrumento só pode **subir** a taxa | 2017-11-11 | del5452.htm | **R$ 572,73** é lícito se a CCT do leitor tiver o degrau — e **R$ 429,55** é lícito se não tiver |
| **N14** | **Lei nº 8.906/1994, art. 20, §2º** — *"As horas trabalhadas que excederem a jornada normal são remuneradas por um adicional **não inferior a cem por cento** sobre o valor da hora normal, mesmo havendo contrato escrito."* | **uma lei** fixa 100% — para o **advogado empregado**, e **desde a primeira** hora excedente, não a partir da terceira | 1994-07-05 (texto originário; a Lei 14.365/2022 mudou só o *caput*) | planalto.gov.br/ccivil_03/leis/l8906.htm | **R$ 572,73** (4,2 h × 68,1818 × 2), por **lei**, sem nenhuma CCT |
| **N15** | **Lei nº 8.906/1994, art. 20, §3º** | para o advogado empregado, hora noturna é **20h–05h** com adicional de **25%** | 1994-07-05 | idem | contexto de §10 **F-4**; não altera M1/M2 |

**Varredura do domínio, e ela é o achado.** Executadas N1–N15, **nenhuma unidade operativa de
nenhuma norma em vigor escalona a taxa por quantidade de horas extras no mesmo dia.** Mas duas
unidades produzem **100%** para a mesma jornada, por caminhos diferentes, e é isso que desmonta a
leitura fácil de que "100% não vem de lei":

| Arranjo contratual do leitor | Operando que o app nunca coleta | Número devido em §9 | O app mostra |
|---|---|---|---|
| CLT, sem instrumento coletivo sobre o tema | — | **R$ 429,55** (N1/N2) | R$ 504,55 |
| CLT, com CCT/ACT de 50% até a 2ª e 100% depois | a CCT do leitor | **R$ 504,55** (N12/N13) | R$ 504,55 ✓ |
| CLT, com dia compensado por acordo tácito mensal | o acordo do §6º | **R$ 0,00** de adicional (N8) | R$ 504,55 |
| **Advogado empregado** | a categoria | **R$ 572,73** (N14) — por lei, e sem degrau | R$ 504,55 |
| Empregado doméstico | a categoria | **R$ 429,55** (N4) | R$ 504,55 |
| 12×36 (art. 59-A) | o regime | as horas não são extras (N11) | R$ 504,55 |

Seis arranjos, **quatro números distintos** para a mesma jornada. O app acerta em exatamente um
deles, e é aquele para o qual foi calibrado. **A ambiguidade é o achado**, e ela nomeia o operando
que falta — o instrumento/categoria do leitor — em vez de condenar a aritmética.

---

## 3. A pergunta que decide tudo: o que a linha afirma

`Extra 50%` e `Extra 100%` não afirmam *"o piso é 50%"*. Na posição tipográfica de rótulo, coladas a
um valor em reais, elas afirmam **"a sua hora extra custa isto"** — um fato sobre o contrato do
leitor. Nenhuma das duas é um fato sobre o contrato do leitor: uma é um **piso legal usado como
valor**, a outra é um **valor de instrumento coletivo que o app supôs existir**.

Daí saem, e não de outra coisa, as três afirmações que a divulgação deve carregar.

---

## 4. As três afirmações, e a contagem de atribuições

**Regra aplicada:** cada valor recebe a sua própria atribuição, *mesmo quando dois compartilham uma
norma*, e um valor pode precisar de mais de uma fonte. Conte antes de escrever.

| Afirmação | Quantas normas distintas ela precisa | Quais |
|---|---|---|
| **C1 — o piso** | **2** | CF art. 7º, XVI **e** CLT art. 59, §1º (a norma constitucional e a legal; a doméstica tem a sua, LC 150/2015 art. 2º §1º) |
| **C2 — o degrau de 100%** | **1 negativa + 1 positiva** | nenhuma unidade legal o produz **para o empregado em geral**; ele existe por CF art. 7º, XXVI + CLT art. 611-A, I |
| **C3 — a fronteira de 2 horas como fronteira de preço** | **1, e é uma negativa** | nenhuma. CLT art. 59, *caput*, fixa quantidade, não preço, e **não pode ser citado aqui** |

**Três afirmações, três atribuições distintas, uma única parcela final não pode carregá-las.** Uma
divulgação com um único parêntese de norma no fim do parágrafo atribui as três à mesma fonte e é, por
construção, errada em pelo menos duas. Isto é vinculante para `content-writer` e está em §8
**D-0013.C1–C3**.

---

## 5. L12 — provado por execução, não por leitura

`spec.md` §T2 exclui do domínio *"um valor restaurado do `localStorage` que o usuário digitou"*. A
exclusão pressupõe que o código saiba distinguir os dois casos. **Ele não sabe, e a prova é um
efeito, não um controle.**

`hooks/use-work-calculator.ts:162-174` grava `firstTierRate` e `extraTierRate` no `localStorage`
**incondicionalmente**, assim que `isRestored` vira `true` — isto é, no primeiro *mount*, antes de
qualquer digitação. `lib/storage.ts:7-13` (`readStoredNumber`) devolve o que estiver lá, sem
proveniência.

Medido, três estados, dos quais dois diferem — o estado do meio é o controle de falsificabilidade:

| Estado | `firstTierRate` no `localStorage` | `extraTierRate` no `localStorage` |
|---|---|---|
| **1** — antes de qualquer *mount* | `null` | `null` |
| **2** — após o *mount*, **sem nenhuma digitação** | **`50`** | **`100`** |
| **3** — após novo *mount* (equivalente ao reload) | `50` | `100` — e o hook devolve `firstTierRate=50 extraTierRate=100` |

`__tests__/zz-probe-0013-law.test.tsx`, cópia isolada, `npx vitest run`, 1 arquivo / 1 teste,
*passed*. O arquivo é andaime: **a saída colada acima é o artefato durável**, e nada dele é a guarda
do AC5.

**Ruling L12 — a resposta de `spec.md` é revertida, e por um motivo diferente do que a pergunta
supunha.** Não porque uma taxa digitada seja suposição do app: ela não é. Porque **o discriminador
não existe no código** — a partir do primeiro *mount*, o padrão do próprio app está gravado e é
indistinguível de um valor digitado, e o teste **T2** de `spec.md`, como está escrito, não é
executável contra nenhum estado do produto. O dever de divulgação é, portanto, **incondicional**, e é
assim que já era pela cláusula **D**. Consequência prática: **nenhuma**, sobre o conjunto de membros
— M1 e M2 continuam membros por qualquer leitura. Consequência sobre o texto do spec: a segunda
frase de **T2** deve ser reescrita por `product-manager` como *"um valor restaurado do `localStorage`
é membro, porque o produto não registra quem o escreveu"*, e isso é uma correção de artefato, não uma
mudança de escopo. **Ainda que houvesse discriminador, C3 sobreviveria intacta**: a fronteira de
120 minutos nunca foi digitada por ninguém e não é sequer editável.

---

## 6. Rulings L1–L12

| Id | Ruling |
|---|---|
| **L1** | O piso é **50%** — CF art. 7º, XVI; CLT art. 59, §1º; LC 150/2015 art. 2º, §1º para a doméstica; intocável por baixo via CLT art. 611-B, X. **Um piso pode ser usado como padrão de cálculo e não pode ser renderizado como fato nu.** `Extra 50%` afirma um valor; a norma produz um mínimo. Logo **M1 também deve divulgação** — não porque 50% seja errado, mas porque a linha afirma "é isto" onde a norma diz "no mínimo isto". |
| **L2** | **Nenhuma** unidade operativa de nenhuma norma em vigor escalona a taxa por faixa de horas no mesmo dia. Unidades executadas: CLT art. 59 *caput* e §§1º–6º, art. 59-A, art. 611-A I–XV, art. 611-B X; CF art. 7º XIII, XIV, XVI, XXVI; LC 150/2015 art. 2º §§1º–5º; Lei 8.906/1994 art. 20 §§2º–3º. **Mas 100% não é um número sem lei**: a Lei 8.906/1994, art. 20, §2º, fixa adicional *não inferior a cem por cento* para o advogado empregado — **em todas** as horas excedentes, sem degrau. O instrumento que produz o degrau em si é a **convenção ou o acordo coletivo** (CF art. 7º, XXVI; CLT art. 611-A, I). |
| **L3** | Sim: o instrumento é a convenção coletiva, que `PRODUCT.md` §7 recusa carregar. Consequência de redação, e é a mais importante deste arquivo: **o app pode nomear a classe do instrumento e não pode dizer o que qualquer instrumento diz**; e **não pode afirmar que 100% não vem de lei**, porque para o advogado empregado vem. A afirmação verdadeira é sobre **o degrau** e sobre **estes dois valores**, nunca sobre o número 100 em abstrato. |
| **L4** | A divulgação da primeira faixa deve afirmar: **(a)** que 50% é o **mínimo legal** de toda hora extra, com CF art. 7º, XVI **e** CLT art. 59, §1º; **(b)** que o app está usando esse mínimo porque **não recebeu a taxa do leitor**; **(c)** que o contrato ou a convenção do leitor pode fixar valor maior. **Posição do escopo:** o qualificador *mínimo* fica **adjacente ao "50%"** — *"o mínimo legal, 50%"* ou *"50%, que é o mínimo legal"* — nunca no fim do parágrafo, onde não sobrevive a como um rótulo é lido. |
| **L5** | A divulgação da segunda faixa deve afirmar: **(a)** que **nenhuma lei** fixa um valor maior **depois da segunda hora** para o empregado em geral; **(b)** que o valor que o app usa vem de **convenção ou acordo coletivo**, onde exista; **(c)** que o mínimo de 50% vale também para as horas além da segunda. **Proibido:** *"o adicional de 100% não vem da lei"* sem restringir ao degrau — N14 falsifica a forma ampla. |
| **L6** | **Confirmado o default de `spec.md`: o leitor deve ser informado dos dois — as taxas e a fronteira.** A fronteira de 120 minutos **decide preço**, e preço é o que o leitor está lendo. E carrega uma segunda obrigação, negativa: **o art. 59, *caput*, não pode ser citado como fonte do degrau.** Ele fixa teto de quantidade (duas horas lícitas por dia) e a constante fixa tarifa; os dois coincidem em 120 e divergem no operando. Mova um operando e eles divergem: para um acordo coletivo que autorize **três** horas extras, o teto do *caput* é lido junto com o instrumento, enquanto a fronteira de preço do app segue fixa em 120 — duas mecânicas, um só número no ponto de calibração. |
| **L7** | **Uma única divulgação pode cobrir as duas linhas** — os dois rótulos renderizam sob a mesma condição, no mesmo bloco, nos mesmos estados (medido, §7), então uma frase sem dêixis alcança ambos sem repetição. **Com uma condição que não é opcional:** ela carrega **três atribuições separadas** (§4), uma por afirmação. Uma parcela única de norma no fim do parágrafo reprova. E, por lição **047**, ela renderiza **exatamente uma vez** por estado — nunca a mesma frase no bloco e no painel ao mesmo tempo. |
| **L8** | Em **ST-C** o rótulo pode continuar renderizando: ele informa minutos e a taxa aplicada, e retirá-lo esconderia a suposição em vez de nomeá-la. **Mas a divulgação renderiza ali também.** A cláusula **D** tem por sujeito a *afirmação*, não o dinheiro: onde a taxa é afirmada sem dinheiro, a afirmação continua sendo feita. Medido: em ST-C os dois rótulos renderizam e **nenhum** valor em reais renderiza (§7). |
| **L9** | **Nenhum dever adicional.** Depois da correção de `0012`, nenhuma figura lê o dia da semana, e M1/M2 passam a ter o mesmo conteúdo legal em todos os sete dias — o que elimina, e não cria, uma obrigação. **E daí sai uma proibição de redação:** a string deste spec **não pode conter** *sábado*, *domingo*, *fim de semana* ou *final de semana*, nem fazer do dia da semana sujeito de qualquer frase. Isso respeita a ruling de `0012` sem re-derivá-la, e é verificável por `grep` — ver §8 **D-0013.C4**. |
| **L10** | **M3 satisfaz a cláusula D.** Medido em seis estados (§7): o parágrafo `day-summary.tsx:232-235` renderiza em **todos**, incondicionalmente, como o rótulo. Nomeia a fonte (CLT art. 73, *caput*) e diz que valor diferente é lícito (*"A sua convenção coletiva pode prever um adicional maior"*). Não afirma exclusividade, logo N15 (25% do advogado, por lei) não a falsifica. **M3 é a referência compatível deste spec, e é referência de forma — não de conteúdo**, porque carrega uma afirmação só e este spec carrega três. |
| **L11** | **M4 satisfaz a cláusula D.** O rótulo (`:224`) e o parágrafo (`:238`) compartilham **exatamente** a mesma condição, `restDayPay > 0`: medido, em ST-C os dois somem juntos e nos demais estados aparecem juntos — não há estado em que o rótulo afirme e o parágrafo cale. Nomeia as fontes e nomeia a suposição (*"supõe que estes valores se repitam"*, *"conta só os domingos"*, *"Feriados não entram"*). Ver §0.1 quanto ao que este ruling **não** verifica. |
| **L12** | **A resposta "não" de `spec.md` é revertida** — por execução, não por interpretação. Ver §5. O dever é incondicional. |

---

## 7. Os estados, renderizados antes de qualquer afirmação sobre eles

`components/organisms/day-summary.tsx` emite **quatro** membros do domínio (contados do módulo, não
do componente que os renderiza: §11 **R2** abaixo). A tabela tem **quatro** colunas de membro e
**seis** linhas de estado; as duas contagens que precisam bater — membros emitidos × membros medidos
— batem em 4.

Instrumento: `__tests__/zz-probe-0013-render.test.tsx` e `zz-probe-0013-night.test.tsx`, cópia
isolada, jsdom, 6 testes *passed*. Props idênticas entre estados salvo o que a coluna nomeia.

| Estado | Como foi alcançado | M1 `Extra 50%` | M2 `Extra 100%` | M3 rótulo | M4 rótulo | Parágrafo M3 | Parágrafo M4 | Valores em R$ |
|---|---|---|---|---|---|---|---|---|
| **ST-A** | 06/01/2025 (segunda) 08:00→22:00, almoço 12–13, hora R$ 68,1818 | sim | sim | sim | sim | **sim** | **sim** | 204,55 · 300,00 · 0,00 · 74,75 |
| **ST-B** | idem, 04/01/2025 (sábado) | sim | sim | sim | sim | sim | sim | idênticos a ST-A |
| **ST-C** | ST-A com `grossHourlyRate = null` | **sim** | **sim** | sim | não | sim | não | **nenhum** |
| **ST-D** | 06/01 14:00→07/01 02:00, almoço 18–19 — `nightMinutes = 274`, `nightBonusMinutes = 34` | sim | sim | sim | sim | sim | sim | 204,55 · 27,27 · 62,27 · 43,57 |
| **ST-E** | 06/01 08:00→17:00, **sem saldo extra** | sim | sim | sim | sim | sim | sim | idênticos a ST-A |
| **ST-F** | painel de ajustes fechado, dica fora do DOM | (0003 §16.2, build de produção, sessão anterior) | `#extra-tier-rate` count **0**, dica **ausente** | | | | | |

**O que isto estabelece, e é o fundamento de §8:** M1 e M2 renderizam em **todos** os estados,
inclusive onde não há dinheiro (**ST-C**) e onde não há extras (**ST-E**, em que a linha exibe
`0h 0m · R$ 0,00` no app real — 0003 §16.3 mediu exatamente essa string). Uma divulgação
condicionada a dinheiro presente, a extras não-nulos, ou a um gesto, **não é alcançável pelo leitor
de primeira viagem**, que é a única pessoa para quem ela foi escrita.

**ST-D foi alcançado na segunda tentativa, e registro isso em vez de apagá-lo.** A primeira fixture
(almoço 12–13 com entrada às 14:00) produzia um `breakdown` degenerado: `nightMinutes` saía 0 e os
quatro valores saíam idênticos a ST-A. Isso era um fato sobre a minha fixture, não sobre o código, e
seria uma leitura falsa se eu a tivesse reportado. Corrigida a fixture (almoço 18–19), o estado
rendeu 274 minutos noturnos e valores próprios.

---

## 8. A regra de divulgação **D-0013**, por eixo

**Substância, em uma frase — o que o leitor ganha:** *ao ler o preço das suas horas extras, o leitor
vê, sem abrir nada, que as duas taxas e o corte de duas horas são suposições do app, de onde vem cada
uma, e que a lei só garante um mínimo.*

Abaixo, cada quantidade em que essa frase pode ser falsificada. **Cláusulas que carregam a substância
decidem o veredito; tripwires, sozinhos, não decidem.**

### 8.1 Cláusulas de conteúdo — carregam a substância

| Id | Exige | Norma que a sustenta |
|---|---|---|
| **C1** | afirmar que **50% é o mínimo legal** de toda hora extra, com o qualificador *mínimo* **adjacente ao número**, e que o app o usa por não ter a taxa do leitor | CF art. 7º, XVI; CLT art. 59, §1º |
| **C2** | afirmar que o valor da **segunda faixa** vem de **convenção ou acordo coletivo**, onde exista, e não de lei **para o empregado em geral** | CF art. 7º, XXVI; CLT art. 611-A, I; negativa varrida em §2.4 |
| **C3** | afirmar que **o corte em duas horas é do app**, e **não citar o art. 59, *caput*** como sua fonte | §2.2 |
| **C4** | **não** conter *sábado*, *domingo*, *fim de semana*, *final de semana*, nem fazer do dia da semana sujeito de frase alguma | §6 **L9** e a ruling de `0012` |
| **C5** | **não** afirmar que o adicional de 100% não existe em lei, em forma ampla; **não** dizer o que qualquer CCT concreta prevê; **não** usar *aproximadamente*, *estimativa*, *em média*, *pode variar* como substitutos de nomear a lacuna | `PRODUCT.md` §4 e §7; N14 |
| **C6** | **três atribuições distintas**, uma por afirmação. Uma única parcela de norma no fim do parágrafo reprova (§4) | §4 |
| **C7** | sem dêixis a elemento vizinho — nomear *as taxas de hora extra desta tela*, nunca *o valor acima* | lição **049** |

### 8.2 Cláusulas de renderização — uma quantidade por eixo

| Eixo | Cláusula | Sujeito reprovado **hoje, nesta árvore** |
|---|---|---|
| **presença** | renderiza em **todo** estado em que `Extra {firstTierRate}%` ou `Extra {extraTierRate}%` estiver no DOM — sem depender de painel, gesto, dinheiro presente ou minutos não-nulos | **SIM.** M1 e M2, em ST-A…ST-E: rótulo presente, divulgação ausente em 6/6 estados medidos |
| **tempo** | chega **não depois** da afirmação que qualifica. Um elemento que só entra no DOM após um gesto reprova | **SIM.** `journey-form.tsx:142` e `:157` estão fora do DOM em ST-F (0003 §16.2: count **0**). São a única explicação existente hoje, e chegam tarde |
| **tamanho (caixa)** | medida no **border box** do elemento portador, via `getBoundingClientRect()`, no estado com o painel de ajustes **fechado** | **não varrido nesta sessão.** Referência da caixa do contêiner, medida por mim em build de produção (0003 §16.1/§16.3, sessão de 2026-09-19 10:08): **308,00 px @390** e **667,33 px @1440**, ambos os temas. Tripwire, não decide sozinho |
| **medida** | ~~caracteres por linha renderizada ≥ os de M3~~ — **RETIRADA em 2026-09-19, ver §8.3 (finding F-6)**. Substituída por **M-1** (igualdade dos operandos determinantes de cpl contra M3, provisória) e **M-2** (piso absoluto de largura e de `font-size`, **vinculante**) | ver §8.3.4: **M-2 tem sujeito vermelho real** — o footer de divulgação a 64 px de `DESIGN.md` *The Numeric Scale Rule*, que M-1 sozinha assinaria como `pass` |
| **modalidade** | entregue a **todo** leitor — texto renderizado, não `aria-label`, não `title`, não `sr-only` | nenhum sujeito reprovado nesta árvore: M3 e M4 são `<p>` de texto corrido |
| **ordem** | o caminho de leitura é o caminho da árvore | nenhum sujeito reprovado: `grep -n "sticky\|order-\|absolute\|fixed" components/organisms/day-summary.tsx` retorna **4 linhas**, todas `border`/`rounded`/`flex` — **nenhum** `order-*`, **nenhum** `sticky`, **nenhum** `absolute` no bloco |
| **espaço** | nada pintado por cima, nada fora da viewport | **não varrido nesta sessão** (sem browser). Tripwire; vai para G6 |
| **operabilidade** | — | **eixo deliberadamente deixado aberto**: a divulgação não carrega controle algum, porque `spec.md` § Out of scope 2 proíbe nova entrada e §6 **L4**/**L5** não exigem nenhuma. Se `product-designer` lhe der um controle, este eixo volta a ser obrigatório e a cláusula é escrita então |

**Nota de 2026-09-19:** o eixo **medida** deixou de ser tripwire — ver §8.3. O parágrafo abaixo é o texto original do G2 e é lido com essa ressalva.

**Três eixos ainda sem sujeito medido (tamanho, medida, espaço) são tripwires e estão marcados como
tais.** Uma cláusula que nunca ficou vermelha é decoração; estas três só se tornam vinculantes ao
receberem o número da execução que as calibra, em **G3** (medida) e **G6** (caixa, espaço). O
veredito, em qualquer caso de fronteira, é decidido por **C1–C3** e pelas cláusulas de **presença** e
**tempo** — que têm sujeito vermelho hoje.

**A guarda do AC5 é lida antes de qualquer `pass` a citá-la** (`AGENTS.md` §5). Três perguntas
respondidas por escrito por quem a escrever, antes de o G6 assinar: o que o seletor casa contra a
marcação **como ela está**; o que ele imprime contra uma coleção vazia; o que ele imprime se todos os
membros forem isentos. Duas respostas iguais significam que ele ainda não discrimina. E, por **L8**,
um seletor escopado ao corpo do parágrafo **não enxerga ST-C** e assinaria *pass* contra um painel que
não emite nada — o conjunto iterado é derivado dos **rótulos**, não das divulgações.

### 8.3 Addendum — **F-6**: o eixo **medida**, reescrito. Veredito do G2 inalterado (`pass`)

**Data: 2026-09-19. Origem:** `product-designer` (G3, `design.md` §9.1), roteado por `tech-lead`.
**Alcance:** substitui a linha **medida (cpl)** da tabela do §8.2 e nada mais. Nenhuma outra cláusula,
colocação, string ou número deste documento é tocada. Nenhuma medição de browser foi feita nesta
sessão: todos os números abaixo são do run de produção do `product-designer` (`design.md` §9.1 e
§ Layout, `evidence/g3-geometry-shipped-string.json`) e das fontes documentais citadas.

#### 8.3.1 A objeção procede, e procede pela razão que o designer deu

`cpl` **não é uma grandeza primitiva**. É o valor de uma função dos operandos de composição:

`cpl ≈ f(largura do content box, font-size, font-family, font-weight, letter-spacing, word-spacing)`

Contar caixas de linha renderizadas não *mede* essa função — **amostra** a função, com um erro cujo
tamanho é a distribuição de comprimento de palavra da própria string e cujo `n` é o comprimento da
string (**3** linhas para M3, **12** para o parágrafo novo a 390). Max, média sobre todas as linhas e
média sobre as linhas cheias são três estimadores do mesmo estimando e **discordam em 2 de 4
larguras**. As sondas de 420 e 360 caracteres, geometricamente idênticas a M3 a **0,00 px**, pontuando
**54/54 contra 55**, são o controle que prova ruído e não sinal. É exatamente *A threshold that does
not move when n does* (`AGENTS.md` §5). **A cláusula como escrita no §8.2 está retirada.**

O defeito de direção que o designer encontrou também procede e é independente: `≥` é satisfeito
**encolhendo** o texto (11px eleva cpl). O operador apontava para o lado errado da obrigação.

#### 8.3.2 O que a cláusula sempre quis dizer — adotado, com o conjunto de operandos completado

**M-1 (co-composição, diferencial, independente de `n`) — provisória, ver §8.3.4.**

> A divulgação e o parágrafo conhecido-bom que **compartilha o seu bloco contêiner** (M3) têm valores
> computados **iguais**, medidos na mesma execução, no mesmo viewport e no mesmo tema, para **todo** o
> conjunto determinante de cpl: largura do **content box** (`getBoundingClientRect().width` menos
> `padding-inline` e `border-inline-width` computados), `font-size`, `font-family`, `font-weight`,
> `letter-spacing`, `word-spacing`. Acrescenta-se `line-height` igual — que não é medida, é entrelinha,
> e é mantido porque protege uma propriedade do leitor e não custa nada.

**Por que igualdade, e não o `≥`:** a propriedade que a cláusula defende é *"composto como o
conhecido-bom é composto"*, não *"pelo menos tão denso quanto"*. Igualdade não se move com `n`, não é
manipulável em nenhuma das duas direções e é invariante de tema e de viewport. **Adotada.**

**Por que a lista do designer está incompleta — a construção em que a proposta passa e a obrigação é
violada.** Um `<p>` com `text-caption font-semibold tracking-wide` mantém largura de border box,
`font-size` e `line-height` **iguais** a M3 e muda cpl materialmente; `px-2` mantém o **border** box
igual e estreita o **content** box em 16 px. Sob a redação proposta os dois passam. Por isso a
cláusula nomeia os operandos e lê o **content** box, não o border box — e por isso, aqui, os dois
coincidem: `design.md` § Tokens registra que o parágrafo não declara margem, padding nem largura.

**Exemplo trabalhado — medição do estado que considero correto** (build de produção, ST-A, painel
fechado, ambos os temas, 8/8 células, `design.md` §9.1 e § Layout):

| Viewport | Raiz | Content box | `font-size` | `line-height` | `letter-spacing` | Δ contra M3 |
|---|---|---|---|---|---|---|
| 320 | 16px | 238,00 px | 12,00 px | 17,40 px | +0,012em | — (M3 não medido a 320) |
| 390 | 16px | **308,00 px** | **12,00 px** | **17,40 px** | +0,012em | **0,00 px**, igual |
| 1440 | 16px | **667,33 px** | **12,00 px** | **17,40 px** | +0,012em | **0,00 px**, igual |
| 2560 / 3840 | 18px | **961,00 px** | **13,50 px** | **19,575 px** | +0,012em | **0,00 px**, igual |

Onde a prosa e o exemplo trabalhado divergirem, **o exemplo trabalhado vence**.

#### 8.3.3 A cláusula que a proposta **não** contém — e é ela que carrega a substância

Respondendo à segunda pergunta que me foi feita — *largar `n` custa alguma propriedade voltada ao
leitor?* A resposta não é "não". É: **a forma diferencial, sob qualquer operador, já era cega ao único
defeito que este projeto de fato embarcou**.

`DESIGN.md`, *The Numeric Scale Rule*: uma chave `--spacing-3xl` redefiniu silenciosamente
`max-w-3xl` e *"rendered the legal disclosure footer as a 64px column at every viewport for two whole
specs while every check in the repository passed"*. **Nesse estado, M3 e o parágrafo novo medem ambos
64 px, e Δ = 0,00 px em 8/8 células.** O invariante assina `pass`. Aplicada ao meu próprio check, a
pergunta de falseabilidade — *nomeie o estado em que este check imprimiria outra coisa* — não tem
resposta: contra o estado para o qual o eixo existe, M-1 sozinho é um **pass por construção**.

**M-2 (piso absoluto) — vinculante desde já.**

> Em **todo** estado em que renderiza, em **ambos** os temas:
> 1. a largura do **content box** da divulgação é **igual** à largura do content box do seu bloco
>    contêiner, Δ = **0,00 px** — o parágrafo ocupa a medida inteira do bloco, nunca uma coluna;
> 2. e não é inferior a **238,00 px @320**, **308,00 px @390**, **667,33 px @1440**, **961,00 px
>    @2560 e @3840** (medições do estado correto, acima — não aritmética sobre valor de token);
> 3. o `font-size` computado é ≥ **12,00 px** com raiz 16px e ≥ **13,50 px** com raiz 18px — isto é,
>    ≥ `0,75 × raiz`, e **nunca** abaixo de 12,00 px em absoluto (`--text-caption`, `DESIGN.md`
>    *Caption*, que é o piso da rampa para texto corrido).

A cláusula 1 é a que sobrevive a uma mudança de raiz ou de contêiner **e ainda assim fica vermelha no
incidente dos 64 px**; a cláusula 2 é o piso calibrado; a 3 fecha a direção que o `≥` original
invertia. **A substância do eixo está na M-2. M-1 é o refinamento que garante que a divulgação não é
composta pior que a sua vizinha.**

#### 8.3.4 Vinculante ou provisória — respondido por sujeito, não por preferência

| Cláusula | Estado | Sujeito reprovado |
|---|---|---|
| **M-2** | **vinculante** | **SIM, e real nesta árvore:** o footer de divulgação a 64 px por dois specs inteiros, registrado em `DESIGN.md` *The Numeric Scale Rule*. Vermelho na M-2, **verde na M-1** — é o caso que separa as duas |
| **M-1** | **provisória** | Nenhum sujeito reprovado medido nesta árvore. Torna-se vinculante quando a execução que a mede imprimir, no mesmo run, a linha conhecido-ruim: o mesmo parágrafo forçado a `text-[11px]` **e** a `px-2`, imprimindo **desigual** nos dois casos. Antes disso, **nenhum `pass` nem `fail` pode citar M-1** — a mesma disciplina que `tech-lead` aplicou ao guard do AC11 com `1, 0, 0, 0` |

**Domínio, porque sem ele M-1 fica vermelha por um não-defeito.** M-1 só alcança divulgações que
**compartilham o bloco contêiner** com um conhecido-bom embarcado. `journey-form.tsx:142` e `:157`
estão no domínio de conteúdo de **D-0013** (afirmam **C1**, §6 **L7**), mas em outro contêiner: **M-1
não as alcança; M-2 alcança.** O `font-size` computado e a largura de content box desses dois hints
**não foram medidos nesta sessão** — `design.md` §9.2 registra apenas altura (34,78 e 69,56). Isso é
**item de G6**, não um finding: não afirmo que reprovam.

#### 8.3.5 Efeito sobre este spec

**Nenhum.** Contra os números já publicados em `design.md`, a divulgação entregue passa em **M-2**
(238,00 / 308,00 / 667,33 / 961,00 px, 12,00 / 13,50 px) e em **M-1** (Δ = 0,00 px e igualdade de tipo
em 8/8 células), faltando apenas a linha conhecido-ruim que torna M-1 vinculante. O eixo **medida**
deixa de ser não-scoreável e passa a ter **uma cláusula vinculante com sujeito vermelho**. O veredito
do **G2 continua `pass`**; G5 não é bloqueado; T1, T2 e T3 não mudam.

**Para o G6, o que é exigido citar:** M-2 nas três alíneas, com as quatro larguras e os dois temas; e
M-1 **apenas se** o run imprimir a linha conhecido-ruim.

#### 8.3.6 Roteado adiante — **F-7**, o teto que nenhuma das duas formas tem

Nem `≥`, nem igualdade, nem M-2 limitam a medida **por cima**. O estado entregue mede **máx. 146 cpl e
média 117,8 cpl a 2560–3840** (`design.md` §9.1). `DESIGN.md` limita **Body** a `68ch` e **não declara
teto algum para Caption**, que é o passo desta divulgação. A WCAG 2.2 SC 1.4.8 *Visual Presentation*
põe o teto em *"no more than 80 characters or glyphs"*, e é **AAA**
(https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html); o alvo do projeto é **AA**
(`AGENTS.md`), então **não é uma falha de conformidade** — é uma lacuna do sistema de tipo.

Não é finding deste spec, e digo por quê em vez de deixar implícito: atinge M3 e M4 de forma idêntica,
o contêiner é capado por `--container-app` em `DESIGN.md`, `spec.md` § Out of scope 4 proíbe tocar M3
e M4, e a 390 — o leitor para quem o produto é construído, `DESIGN.md` *"um polegar livre num corredor
mal iluminado"* — a medida é **49,1 cpl**, dentro de qualquer faixa defensável. A substância de
**D-0013** não é violada hoje.

**F-7. Dono: `product-designer`. Gatilho: o próximo spec que tocar a medida do card ou o passo
Caption. Juntar a F-5. Não bloqueante.**

#### 8.3.7 A regra geral que este finding deixa

Uma cláusula diferencial medida **na mesma execução** cancela o caminho de medição — que é por isso
que ela é atraente — e, pela mesma razão, **cancela todo defeito que move os dois sujeitos juntos**.
Antes de aceitar um diferencial como substituto de um absoluto, nomeie a falha para a qual o eixo
existe e verifique se ela move um sujeito ou os dois.

**Arquivada como lição 069**, com o caso trabalhado dos 64 px deste finding:
`.agents/memory/lessons/069-pair-every-differential-clause-with-an-absolute-floor-that-has-a-failing-subject-because-a-same-run-difference-is-blind.md`.
É a forma vinculante da regra; este parágrafo é o registro de onde ela saiu.


---

## 9. Worked example, ordem das operações e arredondamento — **estado esperado inalterado**

Nada aqui é proposta. É o número que **deve continuar** saindo depois deste spec, para que **AC7**
seja falsificável.

**Entrada:** 06/01/2025 (segunda), 08:00→22:00, almoço 12:00–13:00, jornada esperada 8h48m.
**Salário bruto R$ 15.000,00; divisor 220** ⇒ hora bruta **R$ 68,1818...** (`0007` é dono do divisor;
aqui ele é operando, não objeto).

**Ordem, passo a passo, com a base de cada um:**

1. minutos trabalhados − minutos previstos ⇒ **252 min** de excedente (`lib/day-breakdown.ts`)
2. repartição, base = minutos excedentes: `min(252, 120) = 120` na 1ª faixa; `max(0, 252−120) = 132` na 2ª (`hooks/use-work-calculator.ts:46-49`)
3. preço da 1ª faixa, base = hora bruta: `120/60 × 68,1818 × (1 + 50/100)` = **204,5454…**
4. preço da 2ª faixa, base = hora bruta: `132/60 × 68,1818 × (1 + 100/100)` = **300,0000**
5. arredondamento **no ponto de exibição e em nenhum outro** — `lib/utils.ts:59` `formatCurrency` → `Intl.NumberFormat('pt-BR')` com 2 casas, *half-expand*. Os passos 3 e 4 permanecem em ponto flutuante até aqui
6. saídas: **R$ 204,55** e **R$ 300,00**; dia = **R$ 504,55**

**Reproduzido por renderização nesta sessão** (§7, ST-A): `["R$ 204,55","R$ 300,00","R$ 0,00","R$ 74,75"]`.
O `R$ 0,00` é o adicional noturno (0 minutos noturnos) e o `R$ 74,75` é o DSR — ambos fora do escopo
deste spec e listados para que o *snapshot* de **AC7** tenha as quatro strings e não duas.

**Arredondamento, direção e precisão — inalterados:** duas casas, *half-expand*, **uma única vez**,
na formatação. `204,5454…` → `R$ 204,55` prova a direção (a terceira casa é 5 seguida de 4, e o
resto excede meia centésima). Nenhum passo intermediário arredonda, e **nenhuma tarefa deste spec
pode introduzir um**.

**Os números que as normas produzem para a mesma entrada**, para que a divulgação seja verificável
contra algo: piso N1/N2 = **R$ 429,55**; advogado empregado N14 = **R$ 572,73**; dia compensado
N6/N7/N8 = **R$ 0,00** de adicional. O app exibe R$ 504,55, que é **117,5%** do piso.

---

## 10. Divergences from the code, e findings roteados

Cada um é instrução para `tech-lead`, nunca edição minha.

| Id | Severidade | Onde | O que há | O que a norma exige | Rota |
|---|---|---|---|---|---|
| **DV-1** | **major** | `components/organisms/day-summary.tsx:193`, `:203` | taxa afirmada como rótulo de dinheiro, em 6/6 estados medidos, sem nenhuma string co-renderizada que nomeie a fonte ou a lacuna | `PRODUCT.md` §4 *name the gap*; §2.4 mostra quatro números lícitos distintos para a mesma entrada | **é o objeto deste spec.** Remediado pela fatia 3 de § Scope |
| **DV-2** | **major**, **dívida carregada de `0003` §16.4, re-medida hoje** | `hooks/use-work-calculator.ts:9` (`FIRST_TIER_LIMIT_MINUTES = 120`), usado em `:47` e `:48` | um limiar que decide preço vive em `hooks/`. Re-medido agora: `grep -rn "TIER" lib` retorna **0 linhas** — não há nada em `lib/` a que o número 120 se ligue | `AGENTS.md` §8 (*regras de negócio vivem em `lib/`*) e §9 (*todo número visível rastreia a uma tabela em `lib/` que cita sua norma*). Consequência colateral: em `hooks/` a constante **não pode** nem carregar comentário de norma, pois a isenção é só de `lib/` | **`tech-lead`.** Estado: **ainda aberto**, exatamente como registrado em 0003; gatilho: o próximo spec que mover a repartição de faixas. **Não é remediável dentro de `spec.md` § Out of scope 1**, que proíbe mexer em aritmética — e eu não peço override, porque mover a constante sem mudar valor é refactor, não cálculo |
| **DV-3** | **moderate** | `components/organisms/journey-form.tsx:157` | *"O degrau de 100% vem de convenção coletiva, não da lei."* | **duas leituras defensáveis**, e a ambiguidade é o achado: se o sujeito é *o degrau*, verdadeiro; se é *os 100%*, falso — Lei 8.906/1994, art. 20, §2º, fixa ≥100% por lei para o advogado empregado. O app não coleta a categoria, então não pode escolher a leitura pelo leitor | **`tech-lead`.** `spec.md` § Out of scope 3 protege essa string, e **eu não a reabro**: o dever imediato é que a nova string **não repita a forma ampla** (§8 **C5**). Se G4 acionar a exceção do AC9, esta é a correção a fazer |
| **F-3** | **informativo** | `hooks/use-work-calculator.ts` | para um trabalhador em 12×36 (CLT art. 59-A), as horas entre a 8ª e a 12ª **não são extras**, e o app as precifica como extras | CLT art. 59-A | **roteado, não absorvido.** É a classe "operando silencioso" que `spec.md` § Out of scope 6 já registra como **F1**; anexe-o lá, com dono |
| **F-4** | **informativo** | `components/organisms/day-summary.tsx:213` e `lib/night-shift.ts` | a janela noturna do app é 22h–05h a 20%; para o advogado empregado é **20h–05h a 25%** (Lei 8.906/1994, art. 20, §3º) | — | **roteado.** A string de M3 **não** é falsa (não afirma exclusividade) e **não** está no escopo deste spec; registrado para que um spec futuro sobre categorias não o redescubra |
| **DV-4** | **major, e só o humano pode resolver** | `PRODUCT.md` §6, linha *"Horas extras — configurable rates, defaulting to the statutory floor of **50% / 100%**"* | o documento que supera o julgamento de todo agente afirma que **100% é piso legal** | **não é.** Nenhuma unidade varrida em §2 fixa 100% como piso para o empregado em geral; a única lei que fixa 100% é a Lei 8.906/1994, art. 20, §2º, para uma categoria, e sem degrau | **humano**, via `tech-lead`. `PRODUCT.md` é o documento que `content-writer` e `product-designer` vão ler em G3, e enquanto essa linha existir ela autoriza, por escrito, exatamente a frase que §8 **C5** proíbe. **Correção sugerida, não aplicada por mim:** *"defaulting to the statutory floor of 50% and to a 100% second tier the app assumes"* |

---

## 11. Traceability — os números visíveis e a tabela de cada um

Domínio derivado por comando meu, agora, não da enumeração de `spec.md` (`AGENTS.md` §5).

- **R1** — `grep -rn "formatCurrency" components app | grep -v import` → **18 linhas / 4 arquivos**: `salary-calculator.tsx` (10), `tax-details-panel.tsx` (2), `day-summary.tsx` (4), `currency-input.tsx` (2). Reproduz o R1 de `spec.md` na árvore de trabalho.
- **R2** — das 18, passam **T1 ∧ T2 ∧ T3** exatamente **4**, e todas em `day-summary.tsx`: `:197`, `:207`, `:217`, `:226`. As 14 restantes reprovam **T1** (nenhuma quantidade escolhida pelo app é afirmada na mesma linha) ou **T3** (a string não está na linha do dinheiro): as duas de `currency-input.tsx` e as duas de `tax-details-panel.tsx` são *placeholders* de entrada; `salary-calculator.tsx:75,79` são a `DivisorSentence` de `0007`, que já cita a norma em linha e não é linha de dinheiro; `:254-255`, `:382`, `:389`, `:397`, `:409`, `:417`, `:421` renderizam valor sem afirmar taxa alguma ao lado.
- **R3** — `grep -rn "%" components app --include *.tsx`, filtrado de classes Tailwind → **8 linhas**: 4 em `journey-form.tsx` (rótulos e dicas, dentro do painel), 3 em `day-summary.tsx` (`:193`, `:203`, `:213`), 1 em `app/layout.tsx` (`template: "%s | WorkLoad"`). **Nenhum outro ponto da árvore afirma uma taxa junto de dinheiro.**

| Número visível | Rastreia a | Cita a norma? |
|---|---|---|
| `Extra 50%` (`:193`) | `DEFAULT_FIRST_TIER_RATE`, `hooks/use-work-calculator.ts:13` | **não** — e **não pode**, porque está em `hooks/` |
| `Extra 100%` (`:203`) | `DEFAULT_EXTRA_TIER_RATE`, `hooks/use-work-calculator.ts:14` | **não** |
| a faixa de 120 min | `FIRST_TIER_LIMIT_MINUTES`, `hooks/use-work-calculator.ts:9` | **não** |
| `Adicional noturno 20%` (`:213`) | `NIGHT_PREMIUM_RATE`, `lib/night-shift.ts:8` | sim |
| DSR (`:226`) | `lib/weekly-rest.ts` | sim |

**Três números visíveis sem tabela em `lib/`.** Pelo meu próprio critério isso é reprovação
automática — e é **DV-2**, que já está na dívida de `0003` §16.4, com dono e gatilho. **Não reprovo
este spec por ele**, e digo o motivo em voz alta para que nenhum gate leia isto como omissão: o
remédio de DV-2 é mover uma constante, `spec.md` § Out of scope 1 proíbe tocar em aritmética nesta
fatia, e a divulgação que este spec entrega é precisamente o que torna o número honesto **enquanto**
a constante não muda de casa. Se `tech-lead` quiser resolver DV-2 aqui, é um alargamento de escopo
que passa pelo humano, não por mim.

---

## 12. Disclosures required — o que deve ser dito, por quem

`content-writer` escreve as palavras; eu digo o que precisa ser afirmado. Cada linha mapeia para as
**DO** de `spec.md`.

| DO | Afirmação exigida | Cláusulas que a governam | Estados em que renderiza |
|---|---|---|---|
| **DO1** | 50% é o **mínimo legal** de toda hora extra (CF art. 7º, XVI; CLT art. 59, §1º); o app o usa por não ter a taxa do leitor; contrato ou convenção podem fixar mais | **C1**, C6, C7 | **todos** em que `Extra {firstTierRate}%` está no DOM |
| **DO2** | o valor da segunda faixa vem de **convenção ou acordo coletivo** (CF art. 7º, XXVI; CLT art. 611-A, I), não de lei para o empregado em geral; o mínimo de 50% continua valendo depois da segunda hora | **C2**, C5, C6 | idem, para `Extra {extraTierRate}%` |
| **DO3** | **o corte em duas horas é do app**; sem citar o art. 59, *caput*, como sua fonte | **C3**, C6 | idem |
| **DO4** | as três acima valem inclusive onde **não há dinheiro na tela** | **presença**, **L8** | ST-C incluído — medido |

**Custo, dito em vez de evitado:** esta divulgação renderiza em toda tela de jornada, inclusive
naquelas em que nada está errado, e leitores aprendem a pular o que é permanente. A única mitigação
honesta é que ela renderize **exatamente uma vez** por estado — nunca a mesma frase no bloco e na
dica do painel simultaneamente (lição **047**), o que é justamente o que **AC9** e **AC10** já
forçam a reconciliar em G4.

---

## 13. Open questions for the human

1. **`PRODUCT.md` §6 afirma que 100% é piso legal (DV-4).** Não é. Só o humano altera `PRODUCT.md`, e
   a linha precisa cair **antes de G3**, porque `content-writer` e `product-designer` a leem como
   verdade vinculante e ela autoriza por escrito a frase que **C5** proíbe.
2. **DV-2 — `FIRST_TIER_LIMIT_MINUTES` em `hooks/`.** Três números visíveis sem tabela em `lib/`. A
   dívida é de `0003`; a pergunta é se ela é paga aqui (alargando este spec) ou no próximo spec que
   mover a repartição. Minha recomendação é **não** aqui: a fatia ficaria impossível de falsificar,
   que é exatamente o que § Out of scope 1 protege.
3. **Nenhuma imprecisão legal conhecida está sendo aceita por este gate.** Se a fatia 3 não for
   construída, os três números de §11 continuam na tela sem norma e sem divulgação, e aí **há** uma
   imprecisão a aceitar — por escrito, no spec, com quem aceitou e por quê.

---

## 14. Preconditions for G3

- `product-designer`: o slot é do **bloco de remuneração variável** de `day-summary.tsx`, sob a mesma
  condição de renderização dos rótulos (nunca sob `restDayPay > 0`, nunca sob dinheiro presente).
  Calibra o número da cláusula de **medida** contra o parágrafo de M3, na mesma execução. **AC10**
  obriga a nomear também o slot de `W1` de `0012`; a posição relativa entre os dois **continua
  indecidida e é chamada de indecidida** — é sequenciamento, portanto de `tech-lead`, e não minha.
- `content-writer`: **C1–C7** são vinculantes por inteiro. Três atribuições, não uma. Sem dêixis. Sem
  o dia da semana. Sem a forma ampla *"100% não vem da lei"*.
