# 0100 — Direção visual

Modo Operate. Evolução da identidade Instrumento Honesto, com os dials existentes 3/2/5. O foco cromático é o resultado, com acabamento do tom semântico mais vivo ao tom original; sem tingir o canvas ou animar números. O anel secundário tem fundo próprio mais escuro para preservar a distinção visual do arco âmbar.

A moldura flutuante e o dock recebem o vidro: luz na borda interna, translucidez moderada e fallback sólido quando não houver suporte a blur, com menos transparência ou mais contraste. Formulários permanecem sólidos. Links apontam para a edição e os ajustes da jornada ganham um rótulo visível.

| Oportunidade | Frequência e propósito | Receita |
|---|---|---|
| Atalhos de edição e seleção no dock | Frequente; feedback imediato de toque | CSS, escala 0,97, retorno em 160 ms na curva `--ease-out`; sem deslocamento em movimento reduzido |

Rejeitados: revelar a página na entrada (retarda a tarefa), interpolar números (dificulta a leitura) e animar a textura de vidro (sem significado). A troca de rota não espera saída ou entrada e usa a rolagem padrão do Next.js para não abrir a próxima calculadora abaixo do seu resultado. A edição usa âncoras nativas com foco no título.

Decisão de design: aprovada em revisão independente a partir de capturas de 390 e 1440 px do deploy de `61ae049`. O vidro web é uma aproximação, não Liquid Glass nativo.

## Revisão: vidro óptico

A direção solicitada amplia a camada funcional de acordo com [Materials](https://developer.apple.com/design/human-interface-guidelines/materials), [Motion](https://developer.apple.com/design/human-interface-guidelines/motion) e [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) da Apple. Um campo cobalt limitado ao primeiro trecho da página acompanha a rolagem do celular com deslocamento e deformação reversíveis. O cabeçalho usa vidro fosco mais espesso; o dock tem silhueta e reflexo especular próprios, ícone sobre rótulo no celular e deslocamento óptico do conteúdo onde o navegador compõe filtros SVG no backdrop. O Safari mantém o blur e a deformação do campo cromático mesmo sem compor o mapa de deslocamento. O efeito nunca entra nos números, nos campos, nem na árvore de acessibilidade. Sem JS por frame, sem novos ativos remotos. Movimento reduzido desliga a deformação, e transparência reduzida ou contraste elevado tornam a navegação opaca.

## Revisão: o mostrador volta

O anel pequeno ao lado do contador separava informações que a referência do usuário agrupava. O progresso volta a circundar o tempo restante; o horário de saída fica imediatamente abaixo, maior e centralizado. Cabeçalho, horário corrente, ações e rodapé preservam seus papéis. A cor da Jornada aproxima-se do verde-esmeralda da referência, e a refração permanece na navegação, com borda iluminada estática inspirada em [glassmorphism](https://skills.sh/iart-ai/web-animation-skills/glassmorphism), sem instalá-la. Modo Operate, 3/3/5: composição estável, movimento só para feedback e progresso, densidade de ferramenta diária.
