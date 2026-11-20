# 0016 — Auditoria G6

**REJECT · Execução 1 · 2026-11-20**

## Bloqueio

A legenda em `components/organisms/day-summary.tsx` explica a integração, mas a pessoa não consegue chegar à fonte do cálculo. Em `.specs/0016-night-overtime-base/legal.md`, “Limites e divulgações” exige rastreabilidade da OJ 97 e do Tema 288 do TST a partir dessa superfície. A inspeção de `app/`, `components/`, `hooks/` e `lib/` encontrou referência somente no comentário de `lib/night-shift.ts`. Os quatro links do rodapé renderizado de Jornada levam às fontes de RGPS, IRRF ou RPPS.

A correção pode usar o rodapé existente de Jornada para um link descritivo ao Tema 288/OJ 97, com a URL oficial no mecanismo de fontes de `lib/legal-tables.ts`. A legenda pode conservar o texto aprovado e a posição entre o adicional noturno e o DSR.

## Evidência

Snapshot de G6 sobre `5c0c6fa99f15f7c46e1bfb668006550981d0dc03`, com os ajustes locais de revisão e a implementação 0016, antes da correção de fonte. Cópia independente `/tmp/workload-audit-0016.nvFJ3K`, porta 37216. `pnpm build` e `pnpm start --port 37216 --hostname 127.0.0.1` passaram. A build emitiu aviso de fallback da Atkinson Hyperlegible Next.

Playwright Chromium de produção em `/`, com data de 06/01/2025 em America/Sao_Paulo, jornada de 480 minutos, saída manual, taxa de 50% na primeira faixa, movimento reduzido, telemetria recusada e flags públicas de terceiros ausentes. `node audit.mjs` completou 14 células, com 14 medidas e zero isentas.

| Estado | Larguras CSS em cada tema | Legenda por célula | Resultado |
|---|---|---|---|
| B, 13:00–23:45, pausa 21:00–22:00, R$ 20/h | 390, 768, 1440, 2560, 3840 | 1 | R$ 64,00 na faixa, R$ 8,00 na linha noturna anterior à legenda, DSR logo depois |
| A, 22:00–13:00 do dia seguinte, pausa 23:45–05:00, R$ 20/h | 390 | 0 | R$ 60,00 na faixa |
| B sem salário informado | 390 | 0 | Convite para calcular o valor da hora |

Em cada célula, `scrollWidth` igualou `clientWidth` e nenhum controle renderizado ultrapassou as bordas horizontais. Em B a legenda ocupou duas linhas a 390 px e uma nas demais larguras, conforme a altura medida em relação à altura de linha computada. A árvore de acessibilidade móvel expôs a legenda como parágrafo completo nos dois temas. O rodapé respondeu a Shift+Tab com foco visível. O axe executou 27 regras aplicáveis por célula, com zero violações, e o navegador registrou zero erros e avisos. O link do Tema 288/OJ 97 precisa de nova verificação em produção após a correção.

## Execução 2 · PASS · 2026-11-20

A Jornada agora exibe “Horas extras noturnas: Tema 288 do TST (OJ 97).” no rodapé, com o link oficial definido em `lib/legal-tables.ts`. A legenda conserva o texto e a posição aprovados.

Repeti `pnpm build` e `pnpm start --port 37217 --hostname 127.0.0.1` em `/tmp/workload-audit-0016-run2.w7bwox`, snapshot de G6 sobre o mesmo commit-base com a correção de fonte. O teste `node audit.mjs` repetiu as 14 células da execução 1. Em todas, o link apareceu uma vez com o nome acessível esperado e foco visível após Tab. Enter abriu uma nova aba com o endereço exato. A requisição ao endereço externo foi interceptada localmente para verificar o destino sem consultar o servidor. Com JavaScript desativado, as duas rotas confirmaram a presença do link em Jornada e sua ausência em Custo da Hora.

Em todas as células após hidratação, a largura do rodapé por Playwright e por `getBoundingClientRect()` foi idêntica. Pares viewport/largura do rodapé em CSS px: 390/358, 768/720, 1440/768, 2560/864, 3840/864. Essa medição usa as flags públicas de terceiros ausentes. O axe executou 28 regras aplicáveis por célula e registrou zero violações. As 14 células também registraram zero avisos ou erros de console e zero overflow horizontal.

[Fonte oficial do TST](https://www.tst.jus.br/documents/d/guest/livro-precedentes-trabalhistas-v182025)
