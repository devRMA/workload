# 0016 — Copy: adicional noturno na hora extra noturna

> Owner: content-writer · Gate: `copy` · Run: 1 · Data: 2026-11-19

## Veredito

**PASS.** Os três rótulos monetários atuais continuam verdadeiros e não mudam:

- `Extra {percentual}%` continua nomeando a remuneração completa da faixa; quando houver interseção noturna, seu valor incorpora o produto cruzado exigido pela OJ 97, sem criar uma parcela paralela;
- `Adicional noturno 20%` continua nomeando somente o adicional noturno ordinário sobre todos os minutos noturnos creditados;
- `DSR sobre os extras` continua nomeando o resultado da fórmula existente, agora alimentada pela remuneração variável integral.

Uma explicação contextual curta é necessária para tornar visível a regra que mudou sem expor `OJ 97`, `produto cruzado` ou outra linguagem contábil. Ela é uma legenda, não uma quarta linha monetária.

## Textos novos

| Key | pt-BR | Chars | Trace |
|---|---|---:|---|
| `day.nightOvertime.note` | A hora extra feita à noite é calculada sobre a hora já com o adicional noturno. | 79 | `legal.md` § Regra de cálculo vinculante e § Obrigações para os gates seguintes |
| `footer.nightOvertime` | Horas extras noturnas: Tema 288 do TST (OJ 97). | 47 | `legal.md` § Limites e divulgações. “Tema 288 do TST (OJ 97)” é o texto do link oficial. |

## Condição de renderização

A legenda aparece diretamente abaixo das linhas de hora extra e adicional noturno somente quando as duas condições forem verdadeiras:

1. existe salário-hora bruto, portanto há valor monetário calculado na superfície;
2. existe ao menos um minuto creditado na interseção entre período noturno e hora extra, em qualquer faixa.

Ela não aparece numa jornada apenas noturna, numa jornada apenas extraordinária, numa jornada sem valor monetário ou quando a interseção é zero. A condição é derivada do que a instância afirma, não de um rótulo, ícone, classe ou horário agregado.

O parágrafo com a fonte aparece no rodapé da Jornada, inclusive nos estados sem salário ou sem interseção.

## Posição e leitura

- A legenda fica no mesmo bloco visual e imediatamente depois das três linhas monetárias, antes do DSR.
- O texto usa `text-caption` e a mesma cor secundária das demais explicações; não recebe ícone, valor próprio nem referência normativa inline.
- Leitura esperada: primeiro o valor completo da hora extra, depois o adicional noturno ordinário, então a explicação de por que a hora extra noturna é maior. O usuário não precisa somar nem identificar uma parcela de R$ 4,00.
- A legenda não pode chamar a integração de `outro adicional noturno`, porque isso duplicaria semanticamente a linha `Adicional noturno 20%`.

## Auditoria das strings preservadas

As strings abaixo foram reabertas no estado do snapshot em `components/organisms/day-summary.tsx` e `components/organisms/calculator-views.tsx` e testadas contra todo o domínio vinculante de `legal.md`, não apenas contra o defeito de R$ 4,00.

| String preservada | Decisão |
|---|---|
| `Extra {firstTierRate}%` / `Extra {extraTierRate}%` | Permanece verdadeira se cada valor incluir apenas o produto cruzado da interseção pertencente à própria faixa. Os minutos exibidos continuam sendo todos os minutos da faixa. |
| `Adicional noturno 20%` | Permanece verdadeira somente se continuar exibindo o adicional ordinário uma vez; o produto cruzado não pode ser somado novamente a esta linha. |
| `DSR sobre os extras` | Permanece verdadeira porque a integração é remuneração da própria hora extra e entra na base integral já enviada ao DSR. |
| `Hora noturna reduzida` / `art. 73 da CLT` | Permanecem verdadeiras; a spec conserva a hora de 52min30s e a janela 22:00–05:00. |
| `a prorrogação da jornada noturna depois das 5h (Súmula 60, II, do TST)` | Permanece obrigatória no rodapé; impede que a correção estreita sugira completude após 05:00. |

## Verificações para G4–G6

- Teste de componente encontra exatamente uma legenda no controle B e nenhuma no controle A.
- O teste afirma primeiro a existência dos valores monetários e a contagem de minutos de interseção; um seletor vazio nunca aprova a condição.
- O controle B mantém os rótulos `Extra 50%` e `Adicional noturno 20%`, exibe R$ 64,00 e R$ 8,00 nas respectivas linhas e a legenda uma única vez. O R$ 64,00 é R$ 60,00 de hora extra ordinária mais R$ 4,00 de integração, sem arredondamento intermediário.
- O controle A mantém R$ 60,00 e R$ 8,00 e não exibe a legenda.
- A legenda continua ausente quando `grossHourlyRate` é `null`, mesmo que haja interseção, porque não existe valor monetário na superfície a explicar.

## Decisão final do gate

G3-copy aprovou a legenda na execução 1. G6 confirmou o acesso à fonte oficial pelo rodapé da Jornada na execução 2. [.specs/0016-night-overtime-base/reports/audit.md](reports/audit.md)
