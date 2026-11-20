# 0016 — Auditoria G9

**PASS · 2026-11-20**

O link oficial do Tema 288/OJ 97 está no rodapé da Jornada, recebe foco visível por Tab e abre o endereço esperado por Enter em nova aba. Interceptei esse endereço localmente para verificar o destino pelo navegador. A prévia do PR #39, identificada pelo marcador SSR da fonte e pelos mesmos arquivos JS/CSS da implantação imutável associada a `dcc6e91146a86b13b1cc228654a945762a3fc745`, entregou a fonte em Jornada com JavaScript desabilitado. A rota Custo da Hora ficou fora do escopo desse link. [Prévia auditada](https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app/) · [Implantação imutável](https://workload-fibo4n1o5-devrmas-projects.vercel.app/)

`node preview-audit.mjs` repetiu o controle B em 390, 768, 1440, 2560 e 3840 px e os controles A e B sem salário em 390 px, nos dois temas. Todas as 14 células passaram com zero violações axe, erros ou avisos de console e overflow horizontal. A legenda apareceu uma vez em B, entre o adicional noturno e o DSR, e ficou ausente nos dois controles negativos. O foco no rodapé e a equivalência de sua largura entre DOM e Playwright foram verificados em todas as células.

Com JavaScript desabilitado, comparei título, descrição, canônica, título Open Graph e JSON-LD de ambas as rotas com a build local de G6. Os valores coincidiram. `robots.txt`, `sitemap.xml` e `manifest.webmanifest` responderam HTTP 200 e foram idênticos à build local. O SEO 0,66 da prévia vem da única auditoria SEO reprovada, `is-crawlable`, cujo único item é `X-Robots-Tag: noindex`. Confirmei o cabeçalho na resposta da prévia e a sua ausência no domínio canônico. A busca por `noindex` e `x-robots-tag` em `app/` e `next.config.ts` retornou vazia.

## Controle de desempenho

Usei `PLAYWRIGHT_TEST_BASE_URL=<host> CHROME_PATH=/usr/bin/google-chrome pnpm exec lhci collect --settings.chromeFlags=--no-sandbox` no mesmo runner, sequencialmente, três amostras por rota por host e simulação mobile original da configuração. A prévia anterior imutável veio da implantação GitHub 6468815637 atrelada ao commit-base `5c0c6fa99f15f7c46e1bfb668006550981d0dc03`. Seu HTML responde 200 com “Súmula 60 do TST” e sem o Tema 288. O registro 0006 aponta para o alias mutável hoje ocupado pela prévia revisada. O alias congelado de 0005 retornou 404. O domínio canônico também respondeu 200 e serviu cópia anterior, com “Banco de Horas” no título e sem Tema 288. [Controle imutável](https://workload-71j29i3yj-devrmas-projects.vercel.app/) · [Domínio canônico](https://workload.devrma.com/)

| Artefato | Rota | Performance | LCP simulado (ms) | Atraso de renderização (ms) |
|---|---|---|---|---|
| Prévia atual | / | 0,74 / 0,75 / 0,73 | 5659 / 6109 / 6135 | 5034 / 5509 / 5467 |
| Prévia atual | /custo-da-hora | 0,76 / 0,73 / 0,77 | 6273 / 6425 / 5728 | 5650 / 5773 / 5114 |
| Prévia anterior | / | 0,72 / 0,76 / 0,72 | 6111 / 5762 / 6509 | 5452 / 5131 / 5881 |
| Prévia anterior | /custo-da-hora | 1,00 / 0,78 / 0,78 | 1896 / 5562 / 5895 | 1265 / 4942 / 5273 |
| Produção | / | 0,71 / 0,74 / 0,75 | 6192 / 5619 / 5630 | 5421 / 4985 / 4990 |
| Produção | /custo-da-hora | 0,75 / 0,93 / 0,75 | 5640 / 3096 / 5623 | 4995 / 2447 / 4986 |

A prévia atual falhou o orçamento de performance 0,93 nas seis amostras, e ambos os controles falharam em cinco de seis. Nas amostras que falharam, LCP e interactive coincidiram, com predominância do atraso de renderização. O elemento foi o número principal nas duas rotas, inclusive nos controles. O HTML SSR da Jornada continha o número principal nas duas prévias. A causa exata da demora permanece aberta. O CLS foi zero em todas as amostras da prévia atual, e os escores de acessibilidade e boas práticas foram 1,00.

`node g9-observed.mjs` observou o LCP com PerformanceObserver em Chromium, 390 × 844, CPU 4× e rede sem simulação. Na Jornada e em Custo da Hora, respectivamente, a prévia atual, a prévia anterior e produção observaram o elemento em 424/428 ms, 428/380 ms e 840/740 ms. São observações únicas por rota, separadas dos valores simulados acima.

Os dois controles reproduzem o déficit de desempenho, com a mesma fase dominante e a mesma função visual do nó LCP. O achado segue para o tech-lead no diagnóstico de atraso de renderização de 0004. O gate de 0016 passa pela regra de controle de G9.

## Verificação jurídica — passou

Em Chromium, 390 × 900 CSS px, jornada prevista de 480 minutos, saída manual, salário de R$ 4.400,00 e divisor 220 h. Segunda-feira, 06/01/2025, fuso America/Sao_Paulo. Os mesmos controles de `.specs/0016-night-overtime-base/spec.md` passaram nos temas claro e escuro (quatro verificações).

| Controle | Horas extras | Adicional noturno ordinário | DSR |
|---|---:|---:|---:|
| A: extras diurnas | R$ 60,00 | R$ 8,00 | R$ 10,07 |
| B: extras noturnas | R$ 64,00 | R$ 8,00 | R$ 10,67 |

A explicação da base da extra apareceu uma vez em B e não apareceu em A. Nos quatro cenários, o rodapé apontou para o [Tema 288 do TST, que reafirma a OJ 97](https://www.tst.jus.br/documents/d/guest/livro-precedentes-trabalhistas-v182025).
