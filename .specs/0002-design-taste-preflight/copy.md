# 0002 · Copy

> Owner: content-writer · Gate: `copy` · Run 1

**Escopo desta passagem.** Duas reescritas, nada mais: (1) remover o travessão visível de onze
strings sem perder o que cada travessão qualificava; (2) retirar a expressão "banco de horas"
de sete locais e escrever o descritor que a substitui. Nenhuma string fora dessas duas listas
é tocada. Nenhum número muda. Nenhuma citação nova é inventada.

pt-BR apenas. Não existe camada de i18n neste projeto e o template deste artefato ainda traz
uma coluna `en` e um bloco "Parity check": ambos são de outra arquitetura e foram removidos
aqui de propósito (`AGENTS.md` §1, `PRODUCT.md` §7).

`design.md` estava em branco quando esta passagem foi escrita (G3 roda em paralelo). As
strings abaixo foram medidas contra as larguras reais do produto a 390px e contra o
comprimento das strings que elas substituem. Há **uma** dependência de design aberta, e só
uma: o slot do `HeroPanel` que recebe `MISSING_VALUE` (ver § Pendência de design).

---

## 1. Notas de voz

Nada aqui muda a voz. O produto fala como um instrumento: afirma, cita a norma pelo número,
não aconselha, não conversa. Três consequências práticas desta passagem:

- **Onde o travessão ligava um número à sua ressalva, a ressalva vira frase própria.** Frase
  curta e afirmativa depois do ponto final carrega tanto quanto uma oração depois do travessão,
  e o leitor de 390px em pé no relógio de ponto lê melhor duas frases curtas. Em nenhuma das
  onze a oração pós-travessão foi encurtada, condicionada ou movida para outro bloco.
- **Nenhum "pode", "talvez" ou "em tese" entra em cláusula de garantia.** Súmula 376, I é
  categórica e a frase continua categórica (S2).
- **Nenhuma string diz ao leitor o que fazer com o resultado.** Onde a cópia pede um dado que
  falta, ela pede o dado, não recomenda conduta (`PRODUCT.md` §7).

---

## 2. Reescrita 1: as onze strings com travessão

Regra geral acima de todas (G0, `legal.md` §4): o travessão não é ornamento em nove das onze.
A relação de qualificação tinha de permanecer legível como qualificação, no mesmo bloco
visível, sem interação para revelar. Nenhuma das onze foi resolvida trocando um travessão por
outro traço.

### 2.1 `lib/payroll.ts:24` · `WORK_REGIME_INFO[clt].impact`

| | |
|---|---|
| Antes | `INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14% e teto de contribuição em ${formatCurrency(RGPS_CEILING)} — acima disso o desconto trava em ${formatCurrency(TABLE.rgpsCeilingDiscount)} (tabela de ${TABLE.year}).` |
| Depois | `INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14%. O teto do salário de contribuição é ${formatCurrency(RGPS_CEILING)}: acima disso o desconto trava em ${formatCurrency(TABLE.rgpsCeilingDiscount)} (tabela de ${TABLE.year}).` |
| Renderiza | "INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14%. O teto do salário de contribuição é R$ 8.475,55: acima disso o desconto trava em R$ 988,09 (tabela de 2026)." |
| Caracteres | 166 renderizados (antes: 156). Slot: `RegimeField`, texto de apoio, parágrafo de múltiplas linhas. Sem orçamento apertado a 390px. |

**Regras satisfeitas: S1 + S10** (aplicam-se juntas, `legal.md` §15.3).

| Exigência | Onde está cumprida |
|---|---|
| S1: teto interpolado de `RGPS_CEILING` | `${formatCurrency(RGPS_CEILING)}`, nunca literal |
| S1: desconto interpolado de `TABLE.rgpsCeilingDiscount` | `${formatCurrency(TABLE.rgpsCeilingDiscount)}`, nunca literal |
| S1: ano interpolado de `TABLE.year`, na mesma frase das duas cifras | `(tabela de ${TABLE.year})` fecha a segunda frase, que contém as duas cifras |
| S1: nexo causal preservado | os dois pontos e "acima disso" ligam R$ 988,09 a cruzar R$ 8.475,55 |
| S1: progressividade | "alíquotas progressivas de 7,5% a 14%" mantido na íntegra |
| S10.1: "salário de contribuição" governando a cifra | "O teto do salário de contribuição é R$ 8.475,55" |
| S10.2: "teto" continua preso a R$ 8.475,55 | mesma frase |
| S10.3: "teto de contribuição" e "teto do INSS" ausentes de `lib/` | a expressão foi eliminada, não reescrita em volta (AC23) |
| S10.4: R$ 988,09 legível como consequência | "acima disso o desconto trava em" |
| S10.5 / S10.6 | nenhum número mexido; "progressivas" mantido |

**Teste de leitura de G6** (`legal.md` §15.3), verificado frase a frase: (1) a base para em
R$ 8.475,55; (2) essa base **é** o salário de contribuição, dito com essas palavras; (3) o
máximo descontado é R$ 988,09; (4) a tabela é a de 2026.

**Traço:** `legal.md` §4.1 (S1), §15.2 e §15.3 (S10); Portaria Interministerial MPS/MF nº 13,
de 09/01/2026, arts. 2º e 7º.

### 2.2 `lib/compliance.ts:34` · `ComplianceWarning.detail` (`daily-overtime-limit`)

| | |
|---|---|
| Antes | "O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST) — a irregularidade está na extrapolação, e a sanção recai sobre o empregador." |
| Depois | "O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST). A irregularidade está na extrapolação, e a sanção recai sobre o empregador." |
| Caracteres | 207 (antes: 208). Slot: `AlertBanner`, corpo, abaixo do título "Você passou de 2h extras hoje". |

**Regra satisfeita: S2.** O travessão vira ponto final e **nada mais muda**. A oração que
aloca a irregularidade e a sanção ao empregador continua no mesmo bloco visível, imediatamente
depois da garantia de pagamento e imediatamente abaixo do título que enuncia o problema.

| Exigência S2 | Onde |
|---|---|
| Norma pelo número | "art. 59 da CLT" |
| O limite | "2 horas por dia" |
| Súmula pelo número | "Súmula 376 do TST" |
| Garantia de pagamento, categórica | "Todas as horas trabalhadas continuam devidas a você". Sem "pode", sem "talvez", sem "em tese" |
| Alocação ao empregador | "a sanção recai sobre o empregador", sujeito explícito, mesma unidade visual |

**Por que o ponto final e não a vírgula.** Uma vírgula depois de "(Súmula 376 do TST)"
encadearia a alocação como aposto da citação e enfraqueceria a leitura: a alocação é uma
afirmação própria, e é ela que tira a culpa do trabalhador. Frase inteira, sujeito inteiro.

**Traço:** `legal.md` §4.2 (S2); CLT art. 59 *caput*; Súmula 376, I, do TST.

### 2.3 `components/organisms/day-summary.tsx:221` · legenda do DSR

| | |
|---|---|
| Antes | "O DSR (Súmula 172 do TST) supõe que estes extras se repitam em todos os dias úteis do mês e conta só os domingos — feriados não entram." |
| Depois | "O DSR (Súmula 172 do TST) supõe que estes extras se repitam em todos os dias úteis do mês e conta só os domingos. Feriados não entram." |
| Caracteres | 134 (antes: 135). Slot: `text-caption`, imediatamente abaixo da linha "DSR sobre os extras". |

**Regra satisfeita: S3.** "Feriados não entram" ganha frase própria em vez de virar oração
subordinada de "só os domingos". Isso é o oposto de tratá-la como redundância: é a lacuna
nomeada (Lei nº 605/1949, art. 1º põe os feriados na base do repouso) e ela agora é a única
coisa na frase final, o que a torna mais difícil de pular, não menos.

| Exigência S3 | Onde |
|---|---|
| Súmula pelo número | "Súmula 172 do TST" |
| Suposição 1 (repetição em todos os dias úteis) | intacta, e não enfraquecida para "podem se repetir" |
| Suposição 2 (só domingos) | "conta só os domingos" |
| Consequência da suposição 2 | "Feriados não entram.", frase autônoma, mesma legenda visível |
| Direção da lacuna | nada na frase sugere que o DSR real possa ser menor; o valor mostrado continua lido como piso |

**Traço:** `legal.md` §6.2 (S3); Súmula 172 do TST; Lei nº 605/1949, art. 1º.

### 2.4 `components/organisms/calculator-views.tsx:79` · o aviso geral do rodapé

| | |
|---|---|
| Antes | "Os valores são uma estimativa para você se organizar — não substituem seu holerite nem valem como registro oficial de ponto, e nada aqui é orientação jurídica ou contábil." |
| Depois | "Os valores são uma estimativa para você se organizar. Não substituem seu holerite, não valem como registro oficial de ponto e nada aqui é orientação jurídica ou contábil." |
| Caracteres | 170 (antes: 171). Slot: rodapé, `text-caption`, mesmo parágrafo, sem interação. |

**Regra satisfeita: S4.** As quatro divulgações continuam no mesmo parágrafo visível do rodapé.

| # | Divulgação | Onde |
|---|---|---|
| D1 | estimativa, para o leitor se organizar | "Os valores são uma estimativa para você se organizar." |
| D2 | não substituem o holerite | "Não substituem seu holerite" |
| D3 | não valem como registro oficial de ponto | "não valem como registro oficial de ponto" |
| D4 | nada aqui é orientação jurídica ou contábil | frase final, intacta |

**A alteração estrutural, declarada.** O "nem" vira uma segunda negação plena: "não substituem
seu holerite, **não valem** como registro oficial de ponto". Era a forma de partir a frase sem
deixar D3 pendurada num "nem" cujo verbo estava antes do travessão. D3 é a divulgação de maior
consequência e menor atenção (`legal.md` §6.1) e agora tem verbo próprio em vez de depender de
um paralelismo que o corte de pontuação teria afrouxado. "Não substituem" permanece indicativo:
nenhum "podem não substituir", nenhum "não pretende ser".

**Intocado, e dito aqui para que ninguém "ajude":** o parágrafo seguinte
(`calculator-views.tsx:83-88`), a lista "o que não entra na conta", não é tocado, encurtado nem
fundido com este. Ele é a base da permissão S9.2 (ver §3.6).

**Traço:** `legal.md` §6.1 (S4), D1 a D4; CLT art. 74 §2º e Portaria MTP nº 671/2021 para D3.

### 2.5 `components/organisms/salary-calculator.tsx:126` · o aviso do zero

| | |
|---|---|
| Antes | "Sem ele os valores abaixo continuam em R$ 0,00 — e esse zero não é o seu salário, é a falta do dado." |
| Depois | "Sem ele os valores abaixo continuam em R$ 0,00. Esse zero não é o seu salário, é a falta do dado." |
| Caracteres | 97 (antes: 100). Slot: `AlertBanner`, corpo, abaixo do título "Informe o seu salário bruto", acima dos campos zerados. |

**Regra satisfeita: S5.** Cai o travessão e cai o "e" que o acompanhava; a segunda metade vira
frase própria e continua sendo a frase inteira.

| Exigência S5 | Onde |
|---|---|
| O literal `R$ 0,00` | mantido, exatamente como aparece na tela |
| A negação | "Esse zero não é o seu salário" |
| A causa | "é a falta do dado", com o título do banner pedindo o salário bruto logo acima |

Nenhuma metade sobrevive sozinha: a primeira frase descreve o que a tela mostra, a segunda diz
que aquilo não é resposta. O banner continua ao lado dos campos que exibem os zeros.

**Traço:** `legal.md` §4.5 (S5); `PRODUCT.md` §4 ("cite ou omita").

### 2.6 `components/organisms/salary-calculator.tsx:34` · `MISSING_VALUE`

| | |
|---|---|
| Antes | `const MISSING_VALUE = "—";` |
| Depois | `const MISSING_VALUE = "Sem carga horária";` |
| Caracteres | 17 |
| Slot | `HeroPanel.value`, o mesmo lugar onde `formatCurrency(stats.periodValue)` aparece quando há valor. Rótulo acima: "Valor por mês" / "Valor por hora". |

**Regra satisfeita: S6.** A string ocupa um slot de moeda, então tinha de **recusar-se a
afirmar**, não estimar nem zerar.

| Requisito S6 | Como |
|---|---|
| Não numérico e não monetário à primeira vista | duas palavras, nenhum dígito, nenhum "R$" |
| pt-BR | sim, acentuado |
| Equivalente acessível | é texto, não glifo. O `<p aria-live="polite">` do `HeroPanel` anuncia "Sem carga horária" em vez do silêncio que o travessão produzia (fecha F6) |
| Distinto de qualquer valor real da mesma coluna | nenhum valor real do produto é composto de letras |
| Proibições | não é `R$ 0,00`, `0`, `0,00`, `-`, `R$` vazio, `N/A`, `n/d`, `--`, `...`, string vazia, nem ponto decorativo |

**Por que "Sem carga horária" e não "Informe a carga horária".** As duas satisfazem S6. A forma
imperativa repetiria palavra por palavra o título do `AlertBanner` que já está na mesma tela
("Informe a carga horária mensal") e transformaria o slot do número numa segunda instrução;
"Sem carga horária" nomeia o estado do campo, que é o que o slot de um valor faz, e deixa a
instrução onde ela já está e já é acionável. É também a forma mais curta das duas, e o slot é
o mais apertado da passagem (ver § Pendência de design).

**Traço:** `legal.md` §5 (S6) e F6; `PRODUCT.md` §4.

### 2.7 `lib/structured-data.ts:27` · `name` do JSON-LD

| | |
|---|---|
| Antes | `` name: `WorkLoad — ${VIEW_HEADINGS[view]}` `` |
| Depois | `` name: `WorkLoad: ${VIEW_HEADINGS[view]}` `` |
| Renderiza (`work`) | "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia" (73) |
| Renderiza (`salary`) | "WorkLoad: Calculadora de valor da hora e salário líquido CLT" (60) |

**Regra satisfeita: S7.** Aqui o travessão era separador de marca e descritor, sem trabalho
jurídico; vira dois pontos. **A interpolação não é tocada**: o descritor continua vindo de
`VIEW_HEADINGS[view]` (C6), que é onde a correção de reivindicação acontece (§3.5). Editar o
descritor aqui criaria duas fontes de verdade para uma reivindicação e é defeito declarado
(`spec.md` AC20, `legal.md` §14.2).

**Traço:** `legal.md` §4.7 (S7). Descritor `salary` liberado em §4.7.2; descritor `work`
liberado por S9 (§3).

### 2.8 e 2.9 `app/opengraph-image.tsx:3` e `app/twitter-image.tsx:3` · `alt`

| | |
|---|---|
| Antes (as duas) | "WorkLoad — calculadora de jornada, horas extras e banco de horas" |
| Depois (as duas) | "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia" |
| Caracteres | 73 (antes: 64) |

**Regras satisfeitas: S8** (separador) **e S9** (descritor, §3). As duas ficam **idênticas
entre si**, e idênticas a `"WorkLoad: " + VIEW_HEADINGS.work`, que é exatamente o que o
JSON-LD emite: a diferença de caixa que existia entre o `alt` ("calculadora") e o `h1`
("Calculadora") desaparece, e o diff de quatro pontas de AC22 fecha por comparação literal, não
por interpretação de "mesmo descritor".

**Traço:** `legal.md` §4.8 (S8), §14 (S9).

### 2.10 e 2.11 `app/custo-da-hora/opengraph-image.tsx:3` e `app/custo-da-hora/twitter-image.tsx:3` · `alt`

| | |
|---|---|
| Antes (as duas) | "WorkLoad — calculadora de valor da hora e salário líquido CLT" |
| Depois (as duas) | "WorkLoad: Calculadora de valor da hora e salário líquido CLT" |
| Caracteres | 60 (antes: 61) |

**Regra satisfeita: S8.** Descritor **liberado sem alteração** em `legal.md` §4.7.2: o app
calcula o valor da hora e o líquido pelas tabelas de `lib/legal-tables.ts`, e "CLT" já afasta
o caminho estatutário. Muda o separador e a caixa inicial do descritor, nada mais. As duas
continuam idênticas entre si e agora coincidem com o `name` JSON-LD da mesma view.

**Traço:** `legal.md` §4.7.2, §4.8 (S8).

---

## 3. Reescrita 2: a retirada de "banco de horas"

### 3.1 O que substitui a reivindicação

O descritor único, usado em C3, C4 e C6 e do qual C1, C2 e C5 são recortes:

> **Calculadora de jornada de trabalho, horas extras e saldo do dia** (63)

Cada item nomeia uma capacidade verificada contra o módulo que a calcula (`legal.md` §14.3):
jornada e horas extras em `lib/day-breakdown.ts`, saldo do dia em
`hooks/use-work-calculator.ts:67`. Nenhum item nomeia instrumento jurídico, período de
compensação, acúmulo ou histórico.

**"saldo do dia", nunca "saldo de horas"** (S9.1). A palavra `saldo` aparece uma única vez em
cada descritor e é seguida **imediatamente** por "do dia", sem substantivo no meio. O produto
já chama essa linha exatamente assim na tela ("Saldo do dia", `day-summary.tsx:172`), então o
descritor e a interface passam a dizer a mesma palavra, e o leitor que chega pela busca
encontra o rótulo que leu no título.

**"adicional noturno" ficou fora dos descritores** (S9.2). Não por proibição: é permitido
nomeá-lo. Ficou fora por comprimento, e sem custo de cobertura, porque a `description` da
página (`app/page.tsx:8`, fora de escopo e não tocada) já diz "com adicional noturno e os
limites da CLT". Nenhum descritor qualifica o adicional como completo, nomeia Súmula 60 ou
fala em prorrogação. Se uma passagem futura quiser trazê-lo para o descritor, a permissão
continua valendo **enquanto** a cláusula da Súmula 60 permanecer no rodapé
(`calculator-views.tsx:83-88`), que S4 congela.

**S9.3, verificado palavra a palavra:** os descritores não contêm, em nenhuma flexão, `banco de
horas`, `banco`, `compensação`, `compensar`, `horas a compensar`, `acúmulo`, `acumulado`,
`crédito de horas`, `débito de horas`, `saldo do mês`, `saldo mensal`, `histórico`, `ponto`,
`registro de ponto`, `controle de ponto`, `folha de ponto`, `espelho de ponto`. Nenhum tempo
verbal sugere que o saldo passe de um dia para o outro: não há verbo, só substantivos com
escopo diário.

**Custo de busca, registrado e não resolvido.** "banco de horas" sai de cinco superfícies
indexadas e nada aqui recupera o termo. É a decisão do `spec.md` (§ Scope, § Out of scope) e
esta passagem não inventa palavra-chave compensatória.

### 3.2 C1 · `app/page.tsx:6`, `metadata.title.absolute`

| | |
|---|---|
| Antes | "Calculadora de Jornada, Horas Extras e Banco de Horas | WorkLoad" (64) |
| Depois | "Calculadora de Jornada, Horas Extras e Saldo do Dia | WorkLoad" (62) |

Mantém a caixa alta de título que a string já usava, e o comprimento cabe na aba e no título de
resultado de busca (62 contra 64 antes). É um **recorte** do descritor de 3.1: nenhum item novo,
nenhuma ampliação. "Saldo do Dia" preserva "do Dia" colado a "Saldo" (S9.1, o grep é
insensível a caixa).

### 3.3 C2 · `app/page.tsx:11`, `metadata.openGraph.title`

| | |
|---|---|
| Antes | "Calculadora de Jornada, Horas Extras e Banco de Horas" (53) |
| Depois | "Calculadora de Jornada, Horas Extras e Saldo do Dia" (51) |

### 3.4 C3 e C4 · os dois `alt` da raiz

Ver §2.8/2.9. "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia" (73),
idênticos entre si.

### 3.5 C6 · `lib/calculator-view.ts:9`, `VIEW_HEADINGS.work`

| | |
|---|---|
| Antes | "Calculadora de jornada de trabalho, horas extras e banco de horas" (65) |
| Depois | "Calculadora de jornada de trabalho, horas extras e saldo do dia" (63) |

É o local de maior alavancagem dos sete: alimenta o `h1` visível **e**, via
`lib/structured-data.ts:27`, o `name` do JSON-LD. Dois caracteres mais curto que a string atual,
então o `h1` não ganha linha a 390px em relação ao que já quebra hoje.

### 3.6 C5 · `lib/og-image.tsx:14`, `OG_CONTENT.work.title`

| | |
|---|---|
| Antes | "Jornada, horas extras e banco de horas" (38) |
| Depois | "Jornada de trabalho, horas extras e saldo do dia" (48) |

**Subconjunto estrito de C3/C4** (S9.4): mesmos três itens, sem a marca e sem a palavra
"Calculadora", que o bitmap já traz na identidade visual. Nada foi ampliado. Se uma revisão de
design precisar encurtar este título dentro do bitmap de 1200x630, o corte permitido é **o item
"saldo do dia" inteiro** ("Jornada de trabalho e horas extras", 34 caracteres), nunca as
palavras "do dia".

O `subtitle` de `OG_CONTENT.work` ("A que horas você pode sair, quanto já trabalhou e quanto tem
de hora extra.") não contém a reivindicação retirada e **não é tocado**.

### 3.7 C7 · as quatro asserções em `__tests__/`

Não são strings de usuário; são os valores que os testes fixam e que precisam andar junto, sem
que nenhum `it()`, `expect()` ou asserção seja removida ou marcada como `skip` (AC24).

| Arquivo | Linha | Valor novo |
|---|---|---|
| `__tests__/app-header.test.tsx` | 12 (`HEADING`) | "Calculadora de jornada de trabalho, horas extras e saldo do dia" |
| `__tests__/page.test.tsx` | 33 (`title.absolute`) | "Calculadora de Jornada, Horas Extras e Saldo do Dia | WorkLoad" |
| `__tests__/page.test.tsx` | 38 (`openGraph.title`) | "Calculadora de Jornada, Horas Extras e Saldo do Dia" |
| `__tests__/calculator-page.test.tsx` | 39 (`name` do JSON-LD / `h1`) | "Calculadora de jornada de trabalho, horas extras e saldo do dia" |

### 3.8 O que **não** é editado

`app/manifest.ts` já está dentro da permissão e **não deve ser tocado** (`legal.md` §14.2):
`name` "WorkLoad - Calculadora de Horas", `description` "Calcule sua jornada de trabalho de
forma simples e intuitiva.". Também sem ocorrência e sem edição: `app/layout.tsx`,
`app/sitemap.ts`, `app/robots.ts`, `public/**`, `README.md`. E `lib/structured-data.ts:27`
herda C6: a única edição lá é o separador (§2.7).

---

## 3-A. Emenda do run 3: `lib/payroll.ts:32`

Esta seção entra no run 3, depois de B2. Ela não pertence a nenhuma das duas reescritas acima:
a string não tem travessão e não menciona "banco de horas". Ela entra porque `legal.md` **S10.3**
proíbe "teto do INSS" em todo o `lib/`, e porque a reescrita de `payroll.ts:24` feita por este
mesmo spec criaria dois nomes para R$ 8.475,55 na mesma tela (AC26).

**Correção do run 2.** A seção 5 dizia `lib/payroll.ts:31` e a marcava como "fora de escopo".
As duas coisas estavam erradas: a linha é a **32** e ela está dentro do limite que S10.3 nomeia.
A linha da seção 5 foi corrigida junto com esta emenda.

### 3-A.1 `lib/payroll.ts:32` · `WORK_REGIME_INFO[estatutario].impact`

| | |
|---|---|
| Antes | "Aplicamos a tabela do RPPS federal: a contribuição não para no teto do INSS e as faixas seguem subindo até 22% sobre a parcela mais alta. Servidor estadual ou municipal tem alíquota própria (muitas vezes 14% linear), então este número não vale para ele." |
| Depois | "Aplicamos a tabela do RPPS federal: a contribuição não para no teto do salário de contribuição que vale para a CLT e as faixas seguem subindo até 22% sobre a parcela mais alta. Servidor estadual ou municipal tem alíquota própria (muitas vezes 14% linear), então este número não vale para ele." |
| Caracteres | 292 (antes: 253). Slot: `RegimeField`, texto de apoio, parágrafo de múltiplas linhas, mesmo slot da 2.1. Sem orçamento apertado a 390px. |

**Só a oração do teto muda.** "RPPS federal", "22% sobre a parcela mais alta" e o limite de
alcance estadual/municipal seguem palavra por palavra como estavam (AC25). Nenhuma cifra entra:
a string continua sem número de moeda, e continua sem interpolação.

| Exigência | Onde está cumprida |
|---|---|
| S10.3: "teto do INSS" ausente de `lib/` | a expressão foi substituída, não contornada |
| S10.1 / AC26: um nome só para R$ 8.475,55 nas duas strings | "teto do salário de contribuição", o mesmo sintagma que governa a cifra em `payroll.ts:24` |
| AC25: "RPPS federal", "22%" e o recorte estadual/municipal preservados | orações intactas |
| Sem travessão (AC1) | nenhum travessão entra; os dois pontos e a vírgula já existentes bastam |
| Verdade sobre o regime | o RPPS federal **não tem** teto: a frase diz que a contribuição não para no teto que vale para a CLT e que as faixas seguem subindo |

**Por que "que vale para a CLT".** Sem esse recorte, "o teto do salário de contribuição" ficaria
lido como se existisse um teto no próprio RPPS federal, que é justamente o que a frase nega. O
recorte mantém o sintagma exigido por S10.1 intacto e diz de quem é o teto, em palavras de quem
não é advogado. O leitor estatutário lê a mesma expressão que o leitor CLT lê na opção vizinha,
que é o que AC26 pede.

**Traço:** `legal.md` §15.3, regras S10.1 e S10.3; `spec.md` AC25 e AC26; a tabela do RPPS
federal e suas faixas até 22% vêm de `legal.md` §15 (mesma Portaria Interministerial MPS/MF
nº 13, de 09/01/2026, para a referência de 2026). Nenhuma afirmação nova sobre alíquota,
faixa ou cifra entra nesta emenda.

---

## 4. Erros e estados vazios

Esta passagem **não cria nem remove nenhum estado de erro**. Ela reescreve dois dos estados de
ausência que já existem, e os dois continuam nomeando o problema e a ação seguinte:

| Estado alcançável | Onde | O que o usuário lê | Problema nomeado | Ação seguinte |
|---|---|---|---|---|
| Salário bruto não informado | `salary-calculator.tsx:126`, `AlertBanner` | Título "Informe o seu salário bruto" + "Sem ele os valores abaixo continuam em R$ 0,00. Esse zero não é o seu salário, é a falta do dado." | o zero na tela é ausência de dado, não resultado | informar o salário bruto, dito no título do próprio banner |
| Carga horária mensal não informada | `salary-calculator.tsx:34` (`HeroPanel.value`) e o banner logo acima | Slot do valor: "Sem carga horária". Banner: "Informe a carga horária mensal" + "Sem ela não dá para saber quanto vale a sua hora. Para a jornada de 8h48 por dia o divisor é 220 horas por mês." | não há valor calculável para o período | informar a carga horária, com o divisor 220 dado como referência |

Os demais estados de erro do produto (intervalo de horário invertido, jornada que cruza o
interregno de 11h, valor não interpretável) não são tocados por esta passagem, não contêm
travessão e não contêm a reivindicação retirada. Nenhuma string sua foi alterada.

---

## 5. Divulgações

Todas as obrigações que `legal.md` §9 lista continuam visíveis **sem interação**, no mesmo
bloco em que estavam. Esta é a lista de verificação, com a redação desta passagem:

| Onde | Redação | Regra |
|---|---|---|
| `calculator-views.tsx:79` (rodapé) | "Os valores são uma estimativa para você se organizar. Não substituem seu holerite, não valem como registro oficial de ponto e nada aqui é orientação jurídica ou contábil." | S4 (D1 a D4) |
| `calculator-views.tsx:83-88` (rodapé) | **inalterada**, inclusive a cláusula da prorrogação noturna depois das 5h (Súmula 60 do TST) | S4; base da permissão S9.2 |
| `calculator-views.tsx:90-99` (rodapé) | **inalterada** (ano da tabela e norma; defeitos F3/F4 vivem em `.specs/0003-citation-registry/`) | fora de escopo |
| `day-summary.tsx:221` (legenda do DSR) | "O DSR (Súmula 172 do TST) supõe que estes extras se repitam em todos os dias úteis do mês e conta só os domingos. Feriados não entram." | S3 |
| `salary-calculator.tsx:126` (banner) | "Sem ele os valores abaixo continuam em R$ 0,00. Esse zero não é o seu salário, é a falta do dado." | S5 |
| `salary-calculator.tsx:34` (`HeroPanel.value`) | "Sem carga horária" | S6 |
| `lib/payroll.ts:24` (`RegimeField`) | "INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14%. O teto do salário de contribuição é R$ 8.475,55: acima disso o desconto trava em R$ 988,09 (tabela de 2026)." | S1 + S10 |
| `lib/payroll.ts:32` (`RegimeField`, estatutário) | "Aplicamos a tabela do RPPS federal: a contribuição não para no teto do salário de contribuição que vale para a CLT e as faixas seguem subindo até 22% sobre a parcela mais alta. Servidor estadual ou municipal tem alíquota própria (muitas vezes 14% linear), então este número não vale para ele." | S10.3 (§3-A) |
| `lib/compliance.ts:34` (aviso) | "O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST). A irregularidade está na extrapolação, e a sanção recai sobre o empregador." | S2 |

Nenhuma divulgação foi movida para tooltip, `title`, `aria-label`, acordeão ou modal. Nenhuma
mudou de parágrafo. Nenhuma foi encurtada.

---

## 6. Números e unidades

Nenhum número muda nesta passagem (LD7, AC15). Como eles aparecem na cópia reescrita:

| Tipo | Forma | Onde |
|---|---|---|
| Moeda | `formatCurrency`, "R$ 8.475,55", "R$ 988,09", "R$ 0,00"; ponto de milhar, vírgula decimal, dois decimais sempre | `payroll.ts:24`, `salary-calculator.tsx:126` |
| Percentual | vírgula decimal, "7,5% a 14%" | `payroll.ts:24` |
| Horas | "2 horas por dia" por extenso no aviso; "8h48" na forma compacta que o produto já usa | `compliance.ts:34`, banner da carga horária |
| Ano da tabela | "(tabela de 2026)", interpolado de `TABLE.year`, na mesma frase das duas cifras que ele produz | `payroll.ts:24` |

**O ano é parte da resposta** (`PRODUCT.md` §4): toda cifra derivada de tabela que esta
passagem reescreve continua acompanhada do ano da tabela na mesma frase. As três interpolações
de `payroll.ts:24` continuam interpolações; nenhuma virou literal.

---

## 7. Metadados

| Campo | Arquivo | Valor |
|---|---|---|
| `title.absolute` | `app/page.tsx:6` | "Calculadora de Jornada, Horas Extras e Saldo do Dia | WorkLoad" (62) |
| `description` | `app/page.tsx:8` | **inalterada** |
| `openGraph.title` | `app/page.tsx:11` | "Calculadora de Jornada, Horas Extras e Saldo do Dia" (51) |
| `openGraph.description` | `app/page.tsx:12` | **inalterada** |
| `alt` (raiz, og e twitter) | `app/opengraph-image.tsx:3`, `app/twitter-image.tsx:3` | "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia" (73) |
| `alt` (custo-da-hora, og e twitter) | `app/custo-da-hora/*` | "WorkLoad: Calculadora de valor da hora e salário líquido CLT" (60) |
| Título no bitmap OG (`work`) | `lib/og-image.tsx:14` | "Jornada de trabalho, horas extras e saldo do dia" (48) |
| `h1` / `name` JSON-LD (`work`) | `lib/calculator-view.ts:9` | "Calculadora de jornada de trabalho, horas extras e saldo do dia" (63) |
| `name` JSON-LD (gabarito) | `lib/structured-data.ts:27` | `WorkLoad: ${VIEW_HEADINGS[view]}` |
| Manifest | `app/manifest.ts` | **não tocado**, já conforme |

---

## 8. Pendência de design (única)

**O slot `HeroPanel.value` não comporta uma string de 17 caracteres com a fórmula de tamanho
atual.** `components/organisms/hero-panel.tsx` calcula
`clamp(2.5rem, 208/value.length cqi, 6rem)` com `whitespace-nowrap`. Para "Sem carga horária"
o termo do meio cai para cerca de 12cqi, mas o **piso de 2.5rem (40px)** prevalece, e 17
caracteres a 40px passam de 370px de largura. A caixa de conteúdo do painel a 390px tem cerca
de 294px, então a string transborda e ameaça AC14.

Isto é decisão de tipo, não de texto, e é de `product-designer`: o piso do `clamp` precisa cair
para o caso não numérico (um passo da ordem de 1.125rem resolve com folga), ou o slot precisa
permitir quebra em duas linhas para valores sem dígitos. **A cópia não encurta por causa
disso**: qualquer alternativa mais curta ou vira glifo (proibido por S6) ou vira uma palavra
vaga como "Sem valor", que num slot de moeda pode ser lida como "o valor é nulo", que é
exatamente a confusão que S6 existe para impedir.

Se o design decidir o contrário, a segunda melhor opção compatível com S6 é **"Informe a carga
horária"** (23), mais longa, não mais curta. Não há saída curta que continue conforme.

---

## 9. Frases consideradas e recusadas

| Considerada | Onde | Por que perdeu |
|---|---|---|
| "Calculadora de jornada, horas extras e saldo de horas" | descritor `work` | "saldo de horas" é o sinônimo coloquial do banco de horas e traria a reivindicação de volta pela porta dos fundos (S9.1) |
| "Calculadora de jornada e banco de horas do dia" | descritor `work` | mantém o nome do instrumento colado a algo que não é o instrumento; proibido em `spec.md` § Non-goals |
| "WorkLoad – calculadora de jornada..." (traço médio) | os quatro `alt` | trocar um traço por outro é a mesma evasão; AC1 proíbe os dois |
| "Os valores são uma estimativa para você se organizar (não substituem seu holerite...)" | `calculator-views.tsx:79` | parênteses rebaixam D2 a D4 a aparte; D3 é a divulgação de maior consequência e não pode ser lida como nota lateral |
| "...conta só os domingos, sem contar feriados." | `day-summary.tsx:221` | oração reduzida, encostada na anterior, lida como reforço de "só os domingos"; a lacuna nomeada merece frase própria (S3) |
| "Sem ele os valores abaixo continuam em R$ 0,00." | `salary-calculator.tsx:126` | metade da frase; deixa o zero passar por resultado calculado (S5 proíbe explicitamente) |
| "—" com `aria-label` | `MISSING_VALUE` | glifo com nome acessível parafusado; S6 pede forma textual e proíbe depender do leitor de tela para o sentido básico |
| "Sem valor" / "Sem dados" | `MISSING_VALUE` | num slot de moeda, "sem valor" é lido como "vale zero"; "sem dados" é vago e não diz qual dado falta |
| "teto do INSS em R$ 8.475,55" | `payroll.ts:24` | é o mesmo colapso de "teto de contribuição" em roupa coloquial; S10.3 proíbe nominalmente |

---

## 10. Verificação antes do G6

- [x] Nenhum travessão (`—`) ou traço médio (`–`) em qualquer string nova. Neste documento o
      caractere aparece apenas dentro das colunas "Antes" e da tabela de frases recusadas, como
      prova do que está sendo removido, nunca como pontuação da minha prosa.
- [x] Onze ocorrências resolvidas, uma linha cada, antes e depois (§2).
- [x] Sete locais da reivindicação resolvidos, uma linha cada (§3), e `lib/structured-data.ts`
      **não** é um deles.
- [x] Nenhuma ocorrência de "banco de horas" nas strings novas (AC19).
- [x] `grep -niE 'compensaç|acúmul|acumul|banco|saldo do mês|saldo mensal|histórico'` nas cinco
      strings descritoras: nada (AC21).
- [x] `saldo` sempre seguido imediatamente de "do dia" (S9.1).
- [x] C3, C4 e o `name` JSON-LD/`h1` idênticos em descritor; C3 e C4 idênticos entre si; C5
      subconjunto estrito (AC22, S9.4).
- [x] "teto de contribuição" e "teto do INSS" ausentes das strings novas (AC23, S10.3).
- [x] Três interpolações de `payroll.ts:24` preservadas como interpolações (S1, `legal.md` §8).
- [x] Nenhuma divulgação movida, encurtada ou condicionada a interação (`legal.md` §9).
- [x] Nenhuma string diz ao usuário o que fazer com o resultado.
- [ ] Orçamento do slot `HeroPanel.value` confirmado por `product-designer` (§8).
