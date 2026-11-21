pass — scoped glass-interface browser audit; this is not a complete G6 standards verdict.

Environment: working tree based on `61ae0497f187da532ae0a8f52d194a87deb593b5`, production `pnpm build` / `pnpm start` initially on `http://localhost:3192` and, after a navigation fix, the isolated final build on `http://localhost:3193`, with the E2E configuration's ad and GA test flags and IDs. Routes `/` and `/custo-da-hora`, initial stored state, light and dark system color schemes. Chromium via Playwright 1.63; axe-core 4.13. Final-build axe evidence: `.specs/0017-glass-interface/evidence/final/report.json` and screenshots in the same ignored directory; earlier layout and contrast samples are in `.specs/0017-glass-interface/evidence/after/`.

Accessibility: `preview.mjs` measured each route at 390 × 844 and 1440 × 900 in both themes: all eight cells had 0 critical, 0 serious, 0 moderate and 0 minor axe violations, and 0 console errors or page errors. Axe marked color contrast incomplete in every cell (8 nodes for Jornada, 12–13 for Custo). Zero axe violations is not a WCAG conformance finding. The focused checks below do not replace a full keyboard, screen-reader, live-region or disclosure audit.

Contrast: sampled representative painted pixels in the 390 px light screenshots; both themes use the same invariant result colors. Ratios are approximate sRGB pixel calculations, not an exhaustive gradient or state measurement. For green `rgb(3,114,60)` and blue `rgb(36,91,224)`, respectively: opaque white text 6.04:1 and 5.76:1; 90% white text composited on the same sample 5.22:1 and 4.99:1 (WCAG 1.4.3 normal-text minimum 4.5:1); 70% white edit border 3.81:1 and 3.65:1 (1.4.11 non-text minimum 3:1). The amber ring is not included in these measurements. These are representative, not measured minima; the red result state and actual overtime ring state were not rendered in this run, so their contrast remains unverified.

Motion and material: at 390 px in both themes on `/`, a held edit link computed `scale: 0.97` with `0.16s` transition normally, and `scale: 1` with no scale transition under `prefers-reduced-motion: reduce`. With `prefers-contrast: more`, both routes and themes computed an opaque surface and `backdrop-filter: none` after the transition settled. On the final build, CDP emulation of `prefers-reduced-transparency: reduce` also yielded opaque surfaces and `backdrop-filter: none` for both routes and themes. At 390 px, keyboard Enter on each result edit link focused its destination heading at approximately 88 px from the top in both themes.

Layout: for both routes and themes at 320, 390, 1440, 2560 and 3840 CSS px, document `scrollWidth` equaled `clientWidth`; no rendered `a`, `button`, `input` or `select` extended beyond either horizontal viewport edge in the initial state. This does not test every expanded or error state.

Console: no errors or React warnings captured in the eight axe/screenshot cells or the 320 px checks.

Core Web Vitals / metadata / full keyboard path: not audited in this assigned run; no Lighthouse LCP, INP or CLS verdict is claimed. No complete G6 verdict should be inferred from the scoped pass above.

Complemento da verificação em `3193`: Chromium, fuso America/Sao_Paulo, relógio em 20/11/2026 às 20:00 e consentimento recusado. Para o débito, saída manual às 16:00; para a hora extra, jornada automática padrão; para salário, valor inicial. Os extremos de cada preenchimento foram convertidos em pixels sRGB com Canvas. Menor razão de texto branco a 90% e de contorno branco a 70% nos extremos: verde **4,55:1 / 3,37:1**, vermelho **5,81:1 / 3,94:1**, azul **4,84:1 / 3,59:1**.

No estado de hora extra, o SVG foi ocultado apenas na captura para ler os pixels sob o anel. Em 320, 390, 768, 1024, 1440 e 3840 px, a menor razão entre o âmbar `rgb(255,197,99)` e a trilha composta ficou entre **3,08:1 e 3,19:1**. No pior ponto (768 px), fundo `rgb(5,95,53)`, trilha composta `rgb(55,127,93)`. O contador em texto também informa a hora extra.

Findings: no blocking defect established within the measured scope. This audit does not make a full WCAG or performance claim.

## Revisão óptica

Build de produção em `3198`, sobre a mesma base, com os IDs de teste de publicidade e analytics do Playwright. Em `.specs/0017-glass-interface/evidence/liquid/report.json`, 8 células: duas rotas × dois temas × dois viewports; zero violações axe e zero erros no console, com contraste incompleto. Em 390 × 844 no fim das duas rotas e nos dois temas, último link legal termina em y=748, dock começa em y=766, e o teste de ponteiro alcançou o link.

Leitura manual do rótulo inativo do dock em Chromium, consentimento recusado, 390 × 844, em y=0, y=160, y=360 e fim em ambas as rotas. O rótulo foi ocultado na captura para ler cada pixel da área atrás dele; o primeiro plano veio da cor CSS convertida para sRGB. Mínimos de **14,85:1** em claro (tinta RGB 30,35,44; fundo 248,248,249) e **11,94:1** em escuro (tinta RGB 242,243,246; fundo 44,48,55). Isso não cobre todos os pares ou estados.

A 160 px de rolagem em 390 × 844, Chromium e WebKit mudaram a matriz do campo. A suíte verifica que o dock não muda de posição, voltar ao topo restaura a forma e `prefers-reduced-motion` mantém o campo estático. Comparação do recorte do dock no Chromium: duas capturas de controle idênticas; desativar apenas o deslocamento SVG mudou 2.120 de 15.190 pixels e restaurá-lo voltou ao controle. No WebKit, a diferença entre repetições sem intervenção não permitiu demonstrar refração do conteúdo; blur e deformação do campo são os recursos verificados. Não houve teste em iPhone físico nem nova verificação de Lighthouse.

## Retorno do anel

No build local em `3201`, após restaurar o anel, o relatório `.specs/0017-glass-interface/evidence/dial/report.json` cobre as duas rotas em 390 × 844 e 1440 × 900, em claro e escuro: zero violações axe e zero erros de console, com contraste incompleto nas oito células. Os valores de contraste acima são de revisões anteriores e não valem para o novo preenchimento e trilha. Em Chromium e WebKit, 320 × 568, fuso America/Sao_Paulo e horários semeados, contagem restante, hora extra e saldo manual negativo couberam no anel; o estado inválido exibiu “aguardando horários” sem transbordar a página.

No mesmo build, uma amostra Canvas sRGB dos extremos dos preenchimentos da jornada em Chromium teve o menor contraste no extremo verde claro: fundo RGB 0,119,87; branco a 90% contra o fundo, 4,81:1; arco âmbar RGB 255,197,99 contra trilha composta RGB 42,128,105, 3,06:1. A amostra mede a composição de tokens, não cada pixel da página.
