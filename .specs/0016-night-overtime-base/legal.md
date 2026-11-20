# 0016 — Parecer jurídico: adicional noturno na base da hora extra noturna

> Owner: labor-law-analyst · Gate: `law` · Run: 1 · Data: 2026-11-19

## Veredito

**PASS.** Dentro do domínio estreito desta spec, a correção é juridicamente obrigatória e a fórmula abaixo é suficiente para orientar implementação e testes sem dupla contagem.

O adicional noturno integra a base de cálculo da hora extra **prestada no período noturno**. Portanto, os totais agregados de minutos noturnos e de minutos extraordinários não bastam: a calculadora precisa conhecer a interseção cronológica entre ambos e separá-la por faixa de adicional de hora extra. No estado-base, o controle B é pago a menor em R$ 4,00.

Este `pass` não transforma a calculadora em apuração trabalhista completa. Permanecem fora do domínio a prorrogação depois das 05:00, normas coletivas, feriados, compensação e a definição das faixas de hora extra, exatamente como `spec.md` declara.

## Fontes oficiais consultadas

### 1. Regra específica e vigência atual

- **TST, Livro de Precedentes Trabalhistas, v. 18/2025**, acessado pela página oficial de Jurisprudência do Tribunal em 19/11/2026: <https://www.tst.jus.br/documents/d/guest/livro-precedentes-trabalhistas-v182025>.
- **IRR Tema 288**, processo `RR-0011269-91.2024.5.03.0129`, com trânsito em julgado em **25/09/2025**. Tese firmada no livro oficial: **“ADICIONAL NOTURNO. BASE DE CÁLCULO DE HORAS EXTRAORDINÁRIAS. O adicional noturno integra a base de cálculo das horas extraordinárias prestadas no período noturno. (Reafirmação da OJ nº 97 da SBDI-1 do TST)”**.
- **OJ 97 da SBDI-1 do TST**, no livro oficial de Súmulas, OJs e PNs: <https://www.tst.jus.br/documents/10157/63003/Livro-Internet.pdf>. Texto: **“O adicional noturno integra a base de cálculo das horas extras prestadas no período noturno.”** A compilação registra inserção em 30/05/1997.

O Tema 288 é a confirmação oficial contemporânea de que a OJ 97 continua operante; não se trata de inferência a partir de uma compilação histórica.

### 2. Período, percentual mínimo e hora reduzida

- **CLT, art. 73, caput, §§ 1º e 2º**, texto oficial do Planalto: <https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm>. Para o trabalho urbano, o caput fixa adicional mínimo de 20%; o § 1º computa a hora noturna como 52min30s; o § 2º delimita o período entre 22:00 e 05:00.

Esses três operandos já pertencem ao produto e são preservados nesta spec. O percentual de 20% é piso legal; condição contratual ou coletiva mais favorável não está representada pela calculadora e não é criada aqui.

### 3. DSR

- **Súmula 172 do TST**: as horas extras habitualmente prestadas integram o cálculo do repouso remunerado.
- **Súmula 60, I, do TST** e **Lei nº 605/1949, art. 7º, “a”**: sustentam, no domínio já adotado pelo produto, a integração do adicional noturno habitual e a remuneração do repouso.

A parcela criada por esta correção não é um novo adicional autônomo: é a parte da remuneração da própria hora extra que faltava porque sua base estava incompleta. Por isso ela acompanha a hora extra na entrada variável já enviada ao DSR. A fórmula, o calendário e as hipóteses do DSR não mudam nesta spec.

## Regra de cálculo vinculante

Definições para cada faixa `i`:

- `H_i`: minutos extraordinários creditados na faixa;
- `N_i`: minutos de `H_i` que também pertencem ao período noturno creditado;
- `V`: salário-hora ordinário já derivado pelo produto;
- `p`: adicional noturno aplicável em forma decimal; no domínio atual, `0,20`;
- `e_i`: adicional de hora extra da faixa em forma decimal; por exemplo, `0,50` para 50% e `1,00` para 100%.

Devem valer `0 ≤ N_i ≤ H_i`, faixas disjuntas e cada minuto em no máximo uma faixa.

### Valor completo

Uma hora simultaneamente noturna e extraordinária vale:

```text
V × (1 + p) × (1 + e_i)
```

Separando minutos diurnos e noturnos da faixa:

```text
HE_i = ((H_i - N_i) / 60) × V × (1 + e_i)
     + (N_i / 60) × V × (1 + p) × (1 + e_i)
```

### Incremento compatível com a apresentação atual

O produto já calcula a hora extra sobre `V` e já exibe o adicional noturno ordinário de `p × V` sobre todos os minutos noturnos creditados. Mantendo essa linha separada, a correção adiciona **somente o produto cruzado** em cada faixa:

```text
integração_i = (N_i / 60) × V × p × e_i
```

Logo:

```text
remuneração variável antes do DSR
  = Σ[(H_i / 60) × V × (1 + e_i)]
  + (minutos noturnos creditados totais / 60) × V × p
  + Σ[(N_i / 60) × V × p × e_i]
```

Somar `p × V × (1 + e_i)` inteiro novamente à linha de hora extra duplicaria o adicional noturno ordinário já exibido. O termo novo é `p × e_i`, não `p × (1 + e_i)`.

## Domínio temporal e atribuição por faixa

1. A interseção nasce dos intervalos efetivamente trabalhados, não de `min(totalNoturno, totalExtra)` e não da mera presença de qualquer minuto noturno na jornada.
2. Intervalos não remunerados são retirados antes da interseção. Um intervalo que cruza 22:00, meia-noite, 05:00, o início da hora extra ou a fronteira entre faixas divide os trechos, mas nunca cria minutos.
3. O trabalho extraordinário começa no instante em que a jornada **creditada** excede a jornada prevista. A hora reduzida noturna participa dessa linha do tempo porque o produto já a reconhece como tempo creditado.
4. Depois de identificado o início da hora extra, os minutos são consumidos cronologicamente: primeiro até 120 minutos na primeira faixa e, depois, na faixa seguinte, conforme a política entregue por `0012`. A presente spec não altera limite nem percentuais.
5. `N_i` é a parte creditada de cada faixa que cai na janela noturna vigente. Uma solução que multiplica toda a faixa por `1,20` por existir noite em qualquer ponto é inválida.
6. A passagem da meia-noite não reinicia a jornada, a contagem de hora extra nem a faixa. Os limites são inclusivo em 22:00 e exclusivo em 05:00: trabalho a partir de 22:00 pertence à janela; a partir de 05:00 não pertence ao domínio atual.
7. Saída manual e jornada em andamento observada no mesmo instante devem construir a mesma linha do tempo e retornar os mesmos `H_i` e `N_i`.

### Hora reduzida e conservação dos minutos

O produto representa tempo creditado em minutos inteiros e hoje converte o total noturno pela razão `60 / 52,5`, com arredondamento para o minuto inteiro. A implementação pode mudar a estrutura interna, mas deve conservar simultaneamente:

- o total de minutos noturnos creditados que a regra canônica já produz para a mesma jornada;
- `Σ N_i` igual ao total noturno creditado que realmente ficou dentro de hora extra;
- `Σ H_i` igual ao total de hora extra creditada;
- nenhuma conversão e nenhum arredondamento independente por pequeno fragmento que faça a soma dos fragmentos divergir do total canônico.

Quando a janela noturna for dividida por intervalo, início da hora extra ou fronteira de faixa, a razão exata deve ser carregada através das divisões e o resíduo do único arredondamento de minutos deve ser distribuído deterministicamente em ordem cronológica. Não se arredonda cada fragmento isoladamente. Os controles A/B usam 105 minutos reais = 120 minutos creditados, eliminando ambiguidade nesse caso jurídico central.

## Ordem de arredondamento monetário

As fontes jurídicas fixam a base e os percentuais, não uma operação de arredondamento intermediário por faixa. Para evitar perda cumulativa e preservar a base do DSR, esta spec adota a seguinte ordem vinculante:

1. determinar `H_i` e `N_i` em minutos creditados conforme a seção anterior;
2. calcular hora extra ordinária, adicional noturno ordinário e produto cruzado por faixa com precisão integral, sem arredondar cada multiplicação;
3. somar os valores integrais que compõem cada linha visível e a remuneração variável;
4. enviar a remuneração variável integral, já com o produto cruzado, à fórmula existente de DSR;
5. arredondar para centavos somente no limite monetário já adotado para apresentação ou resultado final; nunca arredondar o termo cruzado antes de somá-lo à sua faixa e nunca reconstruir a base do DSR pela soma de strings monetárias já formatadas.

Se a implementação usar centavos inteiros internamente, ela precisa demonstrar equivalência com essa ordem nos testes de fronteira. A regra central é haver um único arredondamento monetário por resultado exibido, sem cascata de arredondamentos intermediários.

## Caso discriminante obrigatório

Estado comum: segunda-feira, 06/01/2025; jornada prevista de 480 minutos; `V = R$ 20,00`; primeira faixa `e = 0,50`; `p = 0,20`; saída manual; valor antes do DSR.

### Controle A — noite antes da hora extra

```text
entrada       06/01/2025 22:00
intervalo     06/01/2025 23:45 → 07/01/2025 05:00
saída         07/01/2025 13:00
```

Resultado vinculante:

- 105 minutos noturnos reais = 120 creditados;
- 600 minutos creditados totais;
- `H_50 = 120`, `N_50 = 0`;
- hora extra: `120/60 × 20 × 1,50 = R$ 60,00`;
- adicional noturno ordinário: `120/60 × 20 × 0,20 = R$ 8,00`;
- integração: `0`;
- **remuneração variável = R$ 68,00**.

### Controle B — noite coincidente com a hora extra

```text
entrada       06/01/2025 13:00
intervalo     06/01/2025 21:00 → 06/01/2025 22:00
saída         06/01/2025 23:45
```

Resultado vinculante:

- os mesmos 105 minutos noturnos reais = 120 creditados;
- os mesmos 600 minutos creditados totais e 120 minutos extras;
- `H_50 = 120`, `N_50 = 120`;
- hora extra já existente: `R$ 60,00`;
- adicional noturno ordinário já existente: `R$ 8,00`;
- integração OJ 97: `120/60 × 20 × 0,20 × 0,50 = R$ 4,00`;
- **remuneração variável = R$ 72,00**.

Os controles têm os mesmos totais de trabalho, noite e hora extra. A diferença de R$ 4,00 decorre somente da posição cronológica. Um teste que não afirma `N_50 = 0` e `N_50 = 120` não demonstra a regra.

## Matriz mínima para G4/G5/G6

Além dos controles A/B, o plano e a revisão jurídica devem exigir:

- interseção começando um minuto antes, exatamente em e um minuto depois da fronteira de 120 minutos entre faixas;
- minuto anterior a 22:00 versus minuto iniciado às 22:00;
- minuto iniciado às 04:59 versus minuto iniciado às 05:00;
- jornada que cruza meia-noite sem reiniciar faixa;
- intervalo totalmente dentro, parcialmente dentro e fora da possível interseção;
- jornada com noite, mas sem hora extra; jornada com hora extra, mas sem noite; ambas devem ter produto cruzado zero;
- saída manual e saída ao vivo no mesmo timestamp;
- percentuais distintos nas duas faixas, provando que cada `N_i` recebe seu próprio `e_i`;
- conservação explícita: soma dos minutos por faixa, soma dos minutos noturnos extraordinários e contagem exata de células antes da iteração.

## Limites e divulgações

- A correção vale apenas para horas extras efetivamente prestadas na janela noturna que o produto calcula. Não se aplica o adicional noturno a toda hora extra da jornada.
- O adicional noturno de 20% é o mínimo urbano da CLT. Norma coletiva ou contrato pode ser mais favorável; não há banco de convenções nesta spec.
- A **Súmula 60, II**, reconhece adicional noturno na prorrogação diurna quando cumprida integralmente a jornada noturna. O produto permanece limitado a 22:00–05:00 por decisão explícita de escopo. Nenhuma tela ou relatório pode sugerir que o valor depois das 05:00 está juridicamente completo; a limitação já existente deve permanecer explícita e testada.
- O limite de 120 minutos e os percentuais das faixas não são validados como regra geral por este parecer. São operandos do produto, cuja propriedade está em `0012`; esta spec apenas aplica OJ 97 a cada faixa que receber.
- O salário-hora `V` vem do divisor já governado por `0007`; este parecer não reabre sua derivação.
- A fonte deve ser registrada ou referenciada pelo mecanismo entregue por `0003`, sem criar um segundo registro paralelo. A Jornada cumpre essa obrigação no próprio rodapé, que liga o texto “Tema 288 do TST (OJ 97)” à fonte oficial registrada em `NIGHT_OVERTIME_SOURCE` em `lib/legal-tables.ts`.

## Obrigações para os gates seguintes

- **G3 design/copy:** pode incorporar o produto cruzado ao valor da linha de hora extra ou explicá-lo sem nova linha, mas não pode apresentar os R$ 4,00 como um segundo adicional noturno ordinário. A linguagem deve dizer que a hora extra feita à noite é calculada sobre a hora já acrescida do adicional noturno, em pt-BR leigo.
- **G4 tech-lead:** deve modelar a linha do tempo e a interseção por faixa como dado de domínio; `min(totalNoturno, totalExtra)` está proibido. Deve especificar conservação, arredondamento e todos os casos da matriz.
- **G5 frontend-dev:** não decide arredondamento, limites ou alocação residual; implementa o plano aprovado e preserva a entrada integral do DSR.
- **G6 law-check:** reexecuta controles A/B, fronteiras de 120 minutos, 22:00/05:00, meia-noite, intervalo e manual/ao vivo. O gate rejeita se qualquer valor correto depender apenas dos totais agregados.

## Decisão final do gate

G2 passa na execução 1. Não há imprecisão jurídica pendente que exija decisão humana para esta correção estreita. G6 confirmou a fórmula e a rastreabilidade na execução 2. A revisão na prévia publicada fica em G9. [.specs/0016-night-overtime-base/reports/legal.md](reports/legal.md)
