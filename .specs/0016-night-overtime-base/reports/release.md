# Stack #38 — revisão local para G8

**Estado:** validada localmente e autorizada para publicação. CI e prévia dos novos heads são verificados após o push; o merge não faz parte da revisão. A árvore de trabalho principal não foi alterada.

## Revisão por PR

| PR | Head de referência | Resultado |
|---|---|---|
| #32 | `f4c0c64` | Modernização coerente. Corrigidos fallback de cache de navegadores e reutilização da build com flags diferentes entre E2E e Lighthouse. |
| #33 | `c6f179c` | Tabelas por ano-base e extras sobre hora bruta fazem sentido. Corrigidos alerta de 11h baseado em saída projetada, integração de adicional noturno na base da extra (Tema 288/OJ 97) e atribuição do IRRF à norma errada. |
| #34 | `179669c` | Base comum de jornada e retirada de anúncios que interrompiam cálculo fazem sentido. AdSense agora exige consentimento próprio; aceitação antiga de Analytics não é suficiente. O slot aparece só após hidratação e consentimento. |
| #35 | `ccb21fe` | Tokens compartilhados fazem sentido. A colisão da escala de containers do Tailwind é corrigida no topo; validar a stack em conjunto. |
| #36 | `3448b41` | Links, metadata e feedback acessível fazem sentido. Canônicos conferidos e cards gerados como PNG 1200×630 no build analisado. Ícones de manifest antigos já são tratados em trabalho local separado. |
| #37 | `366eab5` | A política documentada de anúncios condicionados a consentimento passa a corresponder à implementação. A revisão não incorporou o trabalho local de privacidade e remoção de Analytics. |
| #39 | `5c0c6fa` | Preflight e correções de tokens necessários. O relógio agora preserva a largura na hidratação e o teste mede deslocamento com observador e controle positivo. O guard do rodapé mede a geometria diretamente, sem depender de box transitório; a matriz também confere a população de parágrafos. |

O número #38 é da stack, não de uma camada. Faixas de sábado, revisão fiscal integral, política de privacidade e a meta de LCP em produção têm specs separadas; não foram declaradas entregues por esta revisão.

## Evidência integrada

- `pnpm lint`, `pnpm typecheck`, `pnpm test:coverage`: 59 arquivos, 537 testes; `lib/` e `hooks/` a 100%.
- `pnpm build`: Turbopack passou com flags de E2E e, em cópia separada, sem anúncios e Analytics para Lighthouse. Aviso de fallback da fonte Atkinson Hyperlegible Next.
- `CI=true PORT=3296 pnpm e2e --retries=0 --reporter=dot`: 161 testes passaram em Chromium/WebKit.
- `lhci collect` seguido de `lhci assert`: 6 execuções locais, 3 em cada rota, todas as asserções satisfeitas na build sem anúncios/Analytics. Nenhum upload. Essa medição não substitui a comparação de LCP em produção.
- Gates de QA, jurídico, auditoria e simplicidade passaram na segunda rodada. `docs-check` em 0001 e 0016 sem falhas ou avisos.

## Publicação

Os commits assinados distribuem CI no #32, consentimento no #34 e cálculo, citações e hidratação no #39. O cálculo e as citações ficam no #39 porque a alteração integrada usa a base de cálculo do #34, a renderização do rodapé e a documentação incorporadas nas camadas seguintes. Os PRs intermediários herdam as correções sem reescrever os commits existentes. O conteúdo do topo, antes desta atualização documental, coincide com a árvore validada localmente (`a95d16a`). Conferir CI nos novos heads e a prévia do Vercel antes de recomendar merge.
