# 0100 — Interface de vidro

Base: `61ae049`, ponta do PR #39. No preview, o anel aparece antes de 17:48 e ocupa mais espaço do que a resposta. Em 390 px, a navegação cobre o início do formulário. O objetivo é recuperar cor e dar acesso imediato à edição, sem trocar a identidade ou reabrir a stack.

- Jornada centraliza o contador dentro do anel de progresso e coloca o horário de saída logo abaixo. Em 390 × 844, o anel, a saída e o atalho de edição ficam visíveis sem rolar.
- Nas larguras empilhadas, um link nativo em cada resultado leva ao formulário correspondente, com foco e sem esconder o título atrás do cabeçalho.
- A navegação continua identificada por texto e pelo estado atual. Não há espera de animação ao trocar de calculadora.
- As duas calculadoras funcionam nos temas claro e escuro; vidro tem fallback sólido. Não mudam fórmulas, fontes legais, dados, publicidade, campos ou URLs.
- Na camada decorativa do celular, rolar de início a meio trecho muda a forma do campo de cor e voltar ao topo restaura sua forma; cabeçalho, dock, resultados e campos não se deformam. Redução de movimento mantém o campo estático.
