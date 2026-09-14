<div align="center">

# WorkLoad

**Sua jornada, suas horas extras e seu líquido — com a lei que sustenta cada número.**

Calculadora brasileira de jornada de trabalho, adicional noturno, horas extras, INSS, IRRF e salário líquido.
Roda no navegador, guarda tudo no seu aparelho, não pede cadastro.

[**workload.devrma.com**](https://workload.devrma.com)

[![CI](https://github.com/devRMA/workload/actions/workflows/ci.yml/badge.svg)](https://github.com/devRMA/workload/actions/workflows/ci.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-087EA4?logo=react&logoColor=white)](https://react.dev)
[![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Biome](https://img.shields.io/badge/Biome-lint%20%2B%20format-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev)
[![pnpm](https://img.shields.io/badge/pnpm-12-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)

</div>

---

## O que ele resolve

Três perguntas, cada uma respondida em menos de dez segundos, no celular:

| | |
|---|---|
| **"A que horas eu posso sair?"** | Entrada, almoço e jornada diária → o horário de saída, ao vivo. |
| **"Quanto de hora extra eu já tenho?"** | O saldo do dia, com adicional noturno e os limites da CLT. |
| **"Quanto cai na minha conta?"** | Bruto → INSS, IRRF, dependentes, descontos → o líquido. |

---

## A promessa

**Todo número que o WorkLoad mostra é rastreável a uma norma brasileira em vigor — e o app diz qual.**

Existem dezenas de calculadoras de hora extra em português. Quase nenhuma diz qual tabela usou, de que ano ela é, nem o que ficou de fora. Daí saem três compromissos:

- **Cita ou omite.** Número que não se rastreia até uma tabela citada não entra na tela.
- **Nomeia a lacuna.** Onde o cálculo deixa de fora algo que o holerite real inclui — convenção coletiva, benefício, desconto judicial — o app avisa, visivelmente, ao lado do número.
- **O ano faz parte da resposta.** Tabela fiscal muda. O rodapé mostra qual foi usada, desde quando vale e de onde veio.

---

## O que ele calcula

**Jornada** — entrada, almoço, projeção de saída, tempo decorrido ao vivo e saldo do dia.

**Adicional noturno** — CLT art. 73: o acréscimo de 20% *e* a hora reduzida de 52min30s, entre 22h e 5h. Os dois institutos são cumulativos, e os dois entram na conta.

**Horas extras** — sobre a hora **bruta**, como manda o art. 59, §1º. O piso é 50%; o degrau de 100% acima de 2h vem da convenção coletiva, não da lei, e o app diz isso.

**DSR sobre horas extras** — Lei 605/49 art. 7º, §2º e Súmula 172 do TST, com a premissa de feriados declarada na tela.

**Limites da CLT** — o teto de 2h extras (art. 59), o intervalo intrajornada (art. 71 e §1º), o interregno de 11h entre jornadas (art. 66) e o divisor incoerente que a Súmula 431 do TST resolve.

**Regimes** — CLT e Empregado Público contribuem pelo RGPS com seu teto; Estatutário segue a escada do **RPPS federal** (7,5% a 22%, sem teto) — e o app avisa que estados e municípios têm alíquotas próprias.

**Salário líquido** — INSS, IRRF, dependentes, descontos e ganhos extras, com o desconto simplificado e o redutor da Lei 15.270/2025 que isenta rendimentos até R$ 5.000.

**Qualquer período** — o mesmo pagamento por hora, dia, semana, mês ou ano.

> As tabelas em vigor vivem em [`lib/legal-tables.ts`](lib/legal-tables.ts), indexadas por ano-base, cada uma com a norma que a instituiu, a data de vigência e a fonte. Nenhum número fiscal existe fora dali — nem no cálculo, nem no texto da interface.

---

## Como é construído

**Design system, não literais soltos.** Todos os tokens — tipografia, espaçamento, raios, elevação, cor, movimento — vivem em `app/globals.css` como custom properties do Tailwind 4. Nenhum componente declara cor, raio, sombra ou duração. O sistema completo está em [`DESIGN.md`](DESIGN.md), com a razão de contraste medida de cada par.

**Atomic Design de verdade.** `atoms/` → `molecules/` → `organisms/` → `templates/`, cada componente no nível em que realmente está.

**Regra de negócio fora da tela.** Imposto, hora e limite legal moram em `lib/`. Hooks são cola com estado; componentes renderizam.

**TypeScript estrito.** Sem `any`. `unknown` só na fronteira de confiança, estreitado na linha seguinte.

**Acessibilidade medida, não presumida.** WCAG 2.2 AA nos dois temas, verificado por sonda que lê a cor computada contra o fundo composto. O resultado do cálculo é anunciado em região viva, por minuto — não a cada segundo.

**Movimento honesto.** `useReducedMotion` desliga as animações de JS, que o reset de CSS nunca alcançava. Diálogos usam `<dialog>` nativo com `@starting-style`.

**Offline e privado.** Tudo em `localStorage`. Sem conta, sem backend, sem upload do salário de ninguém.

---

## Qualidade

| Portão | Onde aperta |
|---|---|
| **Cobertura** | 100% em `lib/` e `hooks/` — o dinheiro e as horas. 90% em `app/` e `components/`. Falha abaixo disso. |
| **E2E** | Playwright em desktop, iPhone e Android, mais um spec de viewport largo cobrindo 2560 e 3840 sem overflow. |
| **Lighthouse CI** | Mobile e desktop, nas duas rotas, com orçamentos em `error` logo abaixo do pior valor medido (0,93 / 0,98 / 0,98 / 0,98). |
| **Lint e formato** | Biome, em menos de 100ms. |
| **Tipos** | `tsc --noEmit` limpo. |

Os testes verificam comportamento e nome acessível. Não afirmam classe do Tailwind — teste que espelha CSS quebra em toda mudança de design e não pega defeito nenhum.

---

## Rodando

Requer **Node 24+** e **pnpm 12+** (`corepack enable` resolve).

```bash
git clone git@github.com:devRMA/workload.git
cd workload
pnpm install
pnpm dev
```

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento na porta 3000 |
| `pnpm build` | Build de produção |
| `pnpm start` | Serve o build |
| `pnpm check` | Lint + tipos + testes — o portão local completo |
| `pnpm lint` / `pnpm lint:fix` | Biome, checar / corrigir |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` / `pnpm test:watch` | Testes unitários |
| `pnpm test:coverage` | Testes com cobertura e os limites aplicados |
| `pnpm e2e` / `pnpm e2e:ui` / `pnpm e2e:report` | Playwright |
| `pnpm lhci` / `pnpm lhci:desktop` | Lighthouse CI, mobile / desktop |

---

## Trabalhando com IA neste repositório

Este projeto é desenvolvido por uma squad de agentes, e a squad tem contrato escrito.

**Leia [`AGENTS.md`](AGENTS.md) antes de qualquer coisa.** Ele vale para Claude Code, Antigravity, Codex, Cursor, Copilot ou qualquer outra coisa que leia arquivo: o stack, os dez agentes, o pipeline de portões, as regras de código, as barras de qualidade e as convenções de git.

```
.agents/                 fonte da verdade — tudo o mais aponta para cá
├── agents/              os dez agentes (.claude/agents/ são symlinks)
├── skills/              skills instaladas (.claude/skills/ são symlinks)
├── commands/            /feature, /gate, /learn, /squad-status
├── memory/              as lições que a squad já pagou para aprender
└── tools/               os scripts que os agentes chamam

.specs/                  cada mudança, especificada antes e registrada depois
PRODUCT.md               para quem é, o que promete, o que nunca vai fazer
DESIGN.md                o design system como ele foi entregue
```

**Os dez agentes**, cada um dono de um domínio e proibido dos outros:

| Agente | Dono de |
|---|---|
| `product-manager` | O problema, o escopo, os critérios de aceite |
| `labor-law-analyst` | **Direito do trabalho e tributação. Bloqueante.** |
| `product-designer` | Hierarquia, layout, tipo, cor, elevação, movimento |
| `content-writer` | Cada palavra em pt-BR que o app mostra |
| `tech-lead` | Arquitetura, decomposição em tarefas, triagem de rejeição |
| `frontend-dev` | Execução — nenhuma decisão |
| `qa-engineer` | Correção, testes, cobertura, acabamento do código |
| `web-standards-auditor` | a11y, SEO, Core Web Vitals |
| `refactor-scout` | Guarda contra over-engineering |
| `release-manager` | Docs, commits, PRs empilhados, CI, preview |

O `labor-law-analyst` existe porque o produto é jurídico: ele fecha a lei **antes** de alguém desenhar tela, e volta para verificar o que foi construído. A rejeição dele não é derrubada por design, escopo ou prazo.

O contrato de reconstrução: **apague `app/`, `components/`, `lib/` e `hooks/`, entregue `.specs/` mais `PRODUCT.md` e `DESIGN.md`, e uma IA reconstrói uma calculadora materialmente equivalente — incluindo cada tabela legal, ao centavo.**

```bash
node .agents/tools/spec.mjs new "nome da feature"   # nova spec a partir dos templates
node .agents/tools/spec.mjs status                  # onde está cada spec
node .agents/tools/docs-check.mjs <NNNN-slug>       # portão de documentação
node .agents/tools/lesson.mjs new "a regra"         # registrar uma lição
```

---

## Aviso

O WorkLoad calcula e cita. Ele **não** é orientação jurídica nem contábil, não substitui o holerite e não vale como registro de ponto. O que ele deixa de calcular está declarado na própria tela — leia antes de usar o número para tomar decisão.

---

<div align="center">

Feito por [Rafael](https://devrma.com)

</div>
