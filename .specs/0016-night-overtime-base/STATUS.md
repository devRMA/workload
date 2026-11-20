# 0016 — Status

**State:** done
**Next agent:** — revisão concluída; merge da stack permanece com o usuário
**Bounces:** G6 · 1

## Gates

| Gate | Agent | State | Run | Artifact |
|---|---|---|---|---|
| spec | product-manager | passed | 1 | `.specs/0016-night-overtime-base/spec.md` |
| law | labor-law-analyst | **passed** | 1 | `.specs/0016-night-overtime-base/legal.md` |
| design | product-designer | **passed** | 1 | `.specs/0016-night-overtime-base/design.md` |
| copy | content-writer | **passed** | 1 | `.specs/0016-night-overtime-base/copy.md` |
| plan | tech-lead | **passed** | 1 | `.specs/0016-night-overtime-base/plan.md` |
| build | frontend-dev | **passed** | 1 | tasks below |
| qa | qa-engineer | passed | 2 | `.specs/0016-night-overtime-base/reports/qa.md` |
| audit | web-standards-auditor | passed | 2 | `.specs/0016-night-overtime-base/reports/audit.md` |
| law-check | labor-law-analyst | passed | 2 | `.specs/0016-night-overtime-base/reports/legal.md` |
| ponytail | refactor-scout | passed | 2 | `.specs/0016-night-overtime-base/reports/ponytail.md` |
| docs | release-manager | passed | 1 | `.specs/0016-night-overtime-base/STATUS.md` · evidência G7 |
| release | release-manager | passed | 1 | `.specs/0016-night-overtime-base/reports/release.md` |
| preview | web-standards-auditor + labor-law-analyst | passed | 1 | `.specs/0016-night-overtime-base/reports/audit-preview.md` |

## Tasks

| Id | Title | State |
|---|---|---|
| T1 | Fechar norma, fórmula, domínio e arredondamento | **done** |
| T2 | Modelar a interseção cronológica por faixa | **done** |
| T3 | Integrar os operandos ao cálculo e à apresentação | **done** |
| T4 | Reconciliar a documentação reconstruível | **done** |
| T5 | Executar gates locais antes da revisão | **done** |

## Verificação integrada antes de G8

Em 20/11/2026, sobre o worktree local `review/stack-38-recovered`, base `5c0c6fa` com as correções da revisão da stack: lint e TypeScript passaram; a suíte de cobertura passou com 59 arquivos e 537 testes, incluindo 100% em `lib/` e `hooks/`. A build Turbopack com as flags de anúncios/Analytics do E2E passou (aviso já conhecido de fallback da fonte Atkinson Hyperlegible Next). O Playwright passou 161 de 161 cenários em Chromium e WebKit, sem retentativas, incluindo hidratação com consentimento já presente e os controles de medição do relógio e rodapé. Esses resultados são locais: não substituem CI e preview do novo head.

## Blockers

none

## Decisions log

| When | Agent | Decision |
|---|---|---|
| 2026-11-19 | product-manager | G1 foi produzido no snapshot isolado `/tmp/workload-stack-review.GANNze`, com lógica remota no topo `5c0c6fa` e ajustes locais da revisão que não alteram esta fórmula; o defeito foi reproduzido contra essa lógica-base. |
| 2026-11-19 | product-manager | O número `0016` foi usado por solicitação explícita da orquestração, embora `.specs/README.md` reserve `0100+` para trabalho novo. A exceção fica registrada para não ser confundida com documentação puramente retrospectiva. |
| 2026-11-19 | product-manager | `.specs/0003-citation-registry/` detém a arquitetura de atribuição, `.specs/0007-sumula-431-citation-scope/` detém divisor/salário-hora e `.specs/0012-saturday-overtime-tier/` detém o roteamento de faixas; esta spec altera somente a integração do adicional noturno na hora extra noturna. |
| 2026-11-19 | product-manager | Os controles discriminantes fixam A em R$ 68,00 e movem B de R$ 68,00 para R$ 72,00; igualdade dos totais impede soluções por agregados sem cronologia. |
| 2026-11-19 | product-manager | G1 passa na execução 1 e entrega ao `labor-law-analyst`; nenhuma alteração de código-fonte foi autorizada neste gate. |
| 2026-11-19 | labor-law-analyst | **G2 passou na execução 1.** O Tema 288 do IRR do TST, com trânsito em julgado em 25/09/2025, reafirma a OJ 97: o adicional noturno integra a base da hora extra prestada no período noturno. Fixados domínio, fórmula por faixa, produto cruzado sem dupla contagem, conservação da hora reduzida, arredondamento monetário somente no limite do resultado, entrada integral do DSR e controles A/B de R$ 68,00/R$ 72,00. A prorrogação após 05:00, normas coletivas e a propriedade das faixas permanecem explicitamente fora do escopo. Próximo gate: G3 design + copy em paralelo. |
| 2026-11-19 | content-writer | **G3-copy passou na execução 1.** Os rótulos monetários atuais permanecem byte-idênticos; o valor de cada faixa de hora extra recebe apenas seu produto cruzado. Uma legenda condicional — “A hora extra feita à noite é calculada sobre a hora já com o adicional noturno.” — aparece junto às linhas somente quando há valor monetário e interseção noite∩extra, sem criar uma nova parcela nem duplicar o adicional ordinário. |
| 2026-11-19 | product-designer | **G3 design passou na execução 1.** O produto cruzado entra no valor monetário da faixa de hora extra correspondente; a linha de adicional noturno conserva somente o adicional ordinário. Não há nova linha, ícone, token, layout, interação ou mudança em `DESIGN.md`. O controle B apresenta R$ 64,00 na faixa e R$ 8,00 na linha noturna; o controle A permanece R$ 60,00 e R$ 8,00. O gate paralelo de copy continua pendente. |
| 2026-11-19 | tech-lead | **G4 passou na execução 1.** A interseção será alocada cronologicamente em `lib/night-shift.ts` por deltas do crédito noturno cumulativo, sem `min` de totais, sem arredondamento por fragmento e sem usar `calculateSuggestedExit` como fronteira. `WorkStats` transporta os minutos noturnos de cada faixa; `DaySummary` incorpora somente o produto cruzado à faixa correspondente, preserva o adicional ordinário e entrega a remuneração integral ao DSR existente. Próximo gate: G5 `frontend-dev`. |
| 2026-11-19 | frontend-dev | **G5 passou na execução 1.** T2–T5 implementadas no snapshot isolado `/tmp/workload-stack-review.GANNze` sobre a base `5c0c6fa` com os ajustes locais da revisão. Na suíte dirigida, 88 testes em 4 arquivos passaram (base de 77). Os controles A/B mantêm 600 minutos trabalhados, 120 extras e 120 noturnos e confirmam a remuneração variável de R$ 68,00 / R$ 72,00 e DSR de R$ 10,07 / R$ 10,67 em janeiro de 2025. Manual e automático coincidem no instante do controle B. `pnpm lint`, `pnpm typecheck` e `pnpm test:coverage` passaram (533 testes em 60 arquivos, `lib/**` e `hooks/**` a 100%). Os dois `docs-check.mjs` passaram com zero falhas e zero avisos. `CI=true PORT=3196 pnpm build` passou com um aviso de fallback da fonte Atkinson Hyperlegible Next. Próximo gate: G6. |
| 2026-11-20 | tech-lead | **G6 rejeitou na execução 1.** QA e Ponytail encaminharam a divergência da contagem canônica em uma transição histórica de fuso e o custo da varredura por minuto. QA também encaminhou lacunas nos controles A/B e 119/120/121. Auditoria e jurídico apontaram a falta de acesso à fonte oficial pela Jornada. A correção usou as janelas compartilhadas, reforçou os testes e levou o link ao rodapé. |
| 2026-11-20 | qa-engineer, web-standards-auditor, labor-law-analyst, refactor-scout | **G6 passou na execução 2.** Os quatro relatórios registram a aprovação dos achados da rodada anterior no código revisado. |
| 2026-11-20 | release-manager | **G7 passou na execução 1.** A documentação registra o bounce e descreve as janelas compartilhadas, a fonte no rodapé e os testes entregues. Próximo gate G8, com release e preview pendentes. |
| 2026-11-20 | release-manager | Publicação autorizada pelo usuário. Os commits preservam a ordem e o histórico das branches; CI e preview dos novos heads ainda precisam ser confirmados no GitHub. Nenhum merge autorizado. |
| 2026-11-20 | release-manager | **G8 passou.** Os sete heads publicados ficaram verdes e `CLEAN`; `gh stack view --json` confirmou a ordem sem necessidade de rebase. |
| 2026-11-20 | web-standards-auditor, labor-law-analyst | **G9 passou** na implantação de `dcc6e91`. Valores e divulgações conferidos nos dois temas. O déficit de desempenho foi reproduzido nas duas referências sem esta alteração. |
| 2026-11-20 | tech-lead | **G10 concluído.** A evidência e o estado final foram reconciliados com o índice. O achado de desempenho permanece em `.specs/0004-lcp-render-delay/`. Nenhuma alteração foi feita em `main`. |

## Evidência G7

```text
$ node .agents/tools/docs-check.mjs 0001-foundation
0 falha(s), 0 aviso(s)

$ node .agents/tools/docs-check.mjs 0016-night-overtime-base
0 falha(s), 0 aviso(s)
```

Revisão editorial no checkout local sobre `5c0c6fa`, com as correções de G6. O cálculo documentado corresponde a `lib/night-shift.ts` e `components/organisms/day-summary.tsx`. O nome e o destino do link correspondem a `lib/legal-tables.ts` e `components/organisms/calculator-views.tsx`. O diff de 0016 preserva os valores fiscais, os tokens de `DESIGN.md` e a fórmula de DSR. A memória não tem lição com três confirmações pendente de promoção.
