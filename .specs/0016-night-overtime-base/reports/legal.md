PASS

# G6 jurídico · execução 1

**REJECT na execução 1.** Revisão da árvore recuperada sobre `5c0c6fa`, em 20/11/2026. O cálculo reproduziu os exemplos de G2. Falta a rastreabilidade pública exigida em `.specs/0016-night-overtime-base/legal.md`, seção “Limites e divulgações”.

## Achado bloqueante

No controle B, o trabalhador vê R$ 64,00 na primeira faixa, R$ 8,00 de adicional ordinário e a explicação da base em `components/organisms/day-summary.tsx:233`. O rodapé em `components/organisms/calculator-views.tsx:94` dá acesso às fontes tributárias. A busca `rg -n 'Tema 288|OJ 97|Reafirmação|livro-precedentes-trabalhistas' app components lib` encontrou somente o comentário em `lib/night-shift.ts:4`. Quem lê a explicação não consegue chegar ao precedente a partir da página. G2 exige que a superfície que explica o cálculo permita rastrear a OJ 97 e sua reafirmação pelo Tema 288. O tech-lead deve encaminhar a referência oficial ao mecanismo de fontes da página e verificar o destino do link renderizado. A legenda pode conservar a redação aprovada. [TST, Tema 288, reafirmação da OJ 97](https://www.tst.jus.br/documents/d/guest/livro-precedentes-trabalhistas-v182025)

## Verificação dos valores

- Controles A e B de G2, segunda-feira, 06/01/2025, jornada prevista de 480 minutos e salário-hora R$ 20,00. Ambos têm 600 minutos creditados, 120 noturnos e 120 extras. A interseção da primeira faixa passa de 0 para 120. A hora extra passa de R$ 60,00 para R$ 64,00 e a linha noturna fica em R$ 8,00. O incremento é 120/60 × 20 × 0,20 × 0,50 = R$ 4,00. Em janeiro, R$ 68,00 × 4/27 e R$ 72,00 × 4/27 resultam em DSR de R$ 10,07 e R$ 10,67.
- Em `lib/night-shift.ts`, o relógio exclui a pausa e acumula o crédito noturno nos dois trechos. A matriz em `__tests__/night-shift.test.ts` mediu 13 células sem isenções, incluindo 21h59/22h00, 04h59/05h00, meia-noite, pausa total ou parcial e ausência de interseção. O quarto minuto noturno real libera dois créditos e o teste distribui um em cada faixa quando o limite cai nesse minuto.
- Conferência direta adicional com `node --experimental-strip-types --input-type=module`, importando `splitNightOvertimeByTier` da árvore entregue. Segunda-feira, 06/01/2025, pausa 15h–16h, saída 22h10, 480 minutos previstos e primeira faixa de 120. Entradas às 11h01, 11h00 e 10h59 deixam respectivamente 119, 120 e 121 minutos extras diurnos antes das 22h. Os 11 créditos seguintes se distribuem em (1, 10), (0, 11) e (0, 11) nas duas faixas, conforme esperado.
- `hooks/use-work-calculator.ts` fornece a repartição pelo dia da entrada e os testes comparam a saída automática e a manual no instante de B. `components/organisms/day-summary.tsx:136` aplica o percentual próprio de cada faixa apenas à parcela coincidente. O adicional ordinário fica separado e a soma integral segue para `lib/weekly-rest.ts` antes da formatação. As fontes dos operandos são a CLT, art. 73, e o precedente do TST no módulo noturno, os percentuais configurados nas faixas e a Súmula 172 no módulo de DSR. [CLT, art. 73](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm)
- A explicação aparece no controle B, junto aos valores. O rodapé explicita convenção coletiva, tributos sobre horas extras, feriados e prorrogação após 5h, citando a Súmula 60, II. A própria linha de DSR tem explicação dos domingos e da hipótese de habitualidade. A fonte do novo cálculo permanece o único bloqueio jurídico encontrado.

## Execuções locais

`node_modules/.bin/vitest run __tests__/night-shift.test.ts __tests__/day-breakdown.test.ts __tests__/day-summary.test.tsx __tests__/use-work-calculator.test.ts __tests__/citation-guards.test.ts __tests__/weekly-rest.test.ts` aprovou 96 testes em 6 arquivos.

`node_modules/.bin/vitest run __tests__/calculator-views.test.tsx __tests__/legal-tables.test.ts` aprovou 23 testes em 2 arquivos. As execuções verificam a árvore local e o DOM de testes. A inspeção da prévia publicada pertence a G9.

## G6 jurídico · execução 2 · PASS

Em 20/11/2026, o rodapé da Jornada renderizou o link “Tema 288 do TST (OJ 97)” com o endereço oficial de G2 e o contexto “Horas extras noturnas”. O teste em `__tests__/calculator-views.test.tsx` conferiu o nome acessível e o endereço literal. A fonte vem de `lib/legal-tables.ts`. Encerra-se o achado da execução 1. [TST, Tema 288](https://www.tst.jus.br/documents/d/guest/livro-precedentes-trabalhistas-v182025)

A contagem ordinária e a repartição entre faixas agora percorrem as mesmas janelas trabalhadas em `lib/night-shift.ts`. O crédito adicional de cada janela é a diferença entre as conversões do acumulado no fim e no início. Uma conferência independente, minuto a minuto, comparou os minutos noturnos reais e as duas faixas em 500 jornadas sobre 06/01/2025, com pausas variáveis, limites iniciais de 0 ou 120 e saídas até o segundo dia seguinte. Saída: `500/500 independent per-minute comparisons` (semente 761021). Estado: base `5c0c6fa`, SHA-256 do diff de `lib/night-shift.ts`, `lib/legal-tables.ts` e `components/organisms/calculator-views.tsx` igual a `ec409bdf0a0f2a98abf1e8aec3d2b9b87290ee02db1c3c93404ae48f05f4a451`.

Os oito arquivos das duas execuções Vitest acima foram reexecutados juntos. Resultado: 124/124 testes aprovados. Permanecem demonstrados o desconto da pausa, os limites 22h/5h, o resíduo na fronteira das faixas, o produto cruzado pelos respectivos percentuais e os controles A/B de R$ 68,00 e R$ 72,00 com DSR de R$ 10,07 e R$ 10,67.
