# 0001 — Copy

> Owner: content-writer · Gate: `copy`

Every user-visible pt-BR string the product ships today, read out of the components and reproduced byte-identical. Nothing here is invented, improved or re-worded.

**Template deviation, stated up front.** `.specs/templates/copy.md` carries an `en` row per key and a parity check against `locales/en.ts` / `locales/pt-BR.ts`. Neither exists, and neither will: `PRODUCT.md` §7 rules out English, and there is no i18n layer — the strings live in the components. The `en` row is therefore dropped and the parity check is replaced with the checks that actually apply. Keys are grouped by screen instead of one block per key, because a per-key block over the string count below would be unreadable.

## Voice notes

The shipped voice, as observed rather than prescribed:

- Second person singular, informal (`você`), never `o usuário` and never an imperative that instructs the reader what to do about a result.
- A legal term appears only with its article attached in the same breath — "o piso legal é 50% … (art. 7º, XVI, da CF)" — so the reader can verify it without knowing it.
- Headings and labels are Title Case; sentences are sentence case and end in a full stop.
- An error names the problem *and* the next action, or names what the zero on screen actually is.
- Currency is `pt-BR` BRL (`R$ 1.234,56`), durations are `Xh Ym`, clock times are `HH:mm`, the live clock is `HH:mm:ss`, dates are `DD/MM/AAAA`.
- Em dash with spaces for an aside; middle dot for a metadata separator.

## Strings

Character counts are of the rendered string, including interpolated values at their default. A count marked `+` is the fixed part, before interpolation.

### Metadata — `app/layout.tsx`

The site-wide defaults. Not visible in the page body; visible in the tab, in search results and in a share card.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `meta.title.default` | WorkLoad \| Calculadora Inteligente de Horas e Salário | 53 | `PRODUCT.md` §2 |
| `meta.title.template` | %s \| WorkLoad | 13 | — |
| `meta.description` | Calcule sua jornada de trabalho, horas extras, adicional noturno e salário CLT de forma simples, rápida e precisa. | 114 | `PRODUCT.md` §6 |
| `meta.keywords` | calculadora de horas, horas extras, salário, CLT, jornada de trabalho, adicional noturno | 88 | array of six, verbatim |
| `meta.og.title` | WorkLoad \| Calculadora Inteligente de Horas | 43 | — |
| `meta.og.description` | Calcule sua jornada de trabalho, horas extras e salário CLT de forma rápida. | 76 | — |
| `meta.twitter.title` | WorkLoad \| Calculadora Inteligente | 34 | — |
| `meta.twitter.description` | Calcule sua jornada de trabalho e horas extras de forma simples. | 64 | — |
| `manifest.name` | WorkLoad - Calculadora de Horas | 31 | `app/manifest.ts` |
| `manifest.short_name` | WorkLoad | 8 | `app/manifest.ts` |
| `manifest.description` | Calcule sua jornada de trabalho de forma simples e intuitiva. | 61 | `app/manifest.ts` |
| `structured.description` | Calculadora inteligente de jornada e valor de trabalho. | 55 | `components/templates/calculator-page.tsx`, JSON-LD |
| `structured.author` | Rafael Augusto | 14 | `components/templates/calculator-page.tsx`, JSON-LD |

### Metadata — `/` (Jornada)

Route-level overrides, `app/page.tsx`.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `home.title` | Calculadora de Jornada, Horas Extras e Banco de Horas \| WorkLoad | 64 | `spec.md` Q1, Q2 |
| `home.description` | Veja a que horas você pode sair, quanto já trabalhou hoje e quanto tem de hora extra, com adicional noturno e os limites da CLT. | 128 | `legal.md` R1, R11 |
| `home.og.title` | Calculadora de Jornada, Horas Extras e Banco de Horas | 53 | — |
| `home.og.description` | Veja a que horas você pode sair, quanto já trabalhou hoje e quanto tem de hora extra. | 85 | — |

### Metadata — `/custo-da-hora`

Route-level overrides, `app/custo-da-hora/page.tsx`.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `cost.title` | Calculadora de Valor da Hora e Salário Líquido CLT \| WorkLoad | 61 | `spec.md` Q3 |
| `cost.description` | Descubra quanto vale a sua hora de trabalho a partir do salário bruto, com INSS, IRRF, dependentes, descontos e ganhos extras. | 126 | `legal.md` R4, R6 |
| `cost.og.title` | Calculadora de Valor da Hora e Salário Líquido CLT | 50 | — |
| `cost.og.description` | Descubra quanto vale a sua hora de trabalho, já com INSS, IRRF e dependentes. | 77 | — |

### App shell

`components/templates/calculator-page.tsx`, `components/organisms/app-header.tsx`, `components/organisms/calculator-views.tsx`.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `shell.skipLink` | Pular para o conteúdo principal | 31 | — |
| `header.wordmark` | WorkLoad | 8 | — |
| `header.tagline` | Sua jornada de trabalho, clara e no seu controle | 48 | `PRODUCT.md` §2 |
| `header.themeToggle` | Alternar tema | 13 | `title` and `aria-label`, same string |
| `header.clockPlaceholder` | --:--:-- | 8 | `PLACEHOLDER_CLOCK`, before the client clock exists |
| `nav.label` | Calculadoras | 12 | `aria-label` on the tab bar |
| `nav.tab.work` | Jornada | 7 | — |
| `nav.tab.salary` | Custo da Hora | 13 | — |

### Footer — both views

`components/organisms/calculator-views.tsx`. Four paragraphs, always visible, never collapsed. This is where every disclosure obligation from `legal.md` that is not attached to a single number lands.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `footer.privacy` | Tudo o que você digita fica salvo apenas neste navegador. Nada é enviado para nenhum servidor, e ninguém além de você vê seus horários ou seu salário. | 150 | `PRODUCT.md` §5, "offline and private" |
| `footer.estimate` | Os valores são uma estimativa para você se organizar — não substituem seu holerite nem valem como registro oficial de ponto, e nada aqui é orientação jurídica ou contábil. | 171 | `legal.md` § Disclaimers, row 1 |
| `footer.omissions` | Não entram na conta: FGTS, benefícios e adicionais da sua convenção coletiva, o 13º salário e o terço de férias, a incidência de INSS e IRRF sobre as horas extras, a prorrogação da jornada noturna depois das 5h (Súmula 60 do TST), feriados, o valor do intervalo suprimido e o adicional de insalubridade ou periculosidade. O regime Estatutário usa a tabela do RPPS federal e não vale para servidor estadual ou municipal. | 419 | `legal.md` § Out of scope — every row a user could mistake for a promise |
| `footer.tables` | Tabelas de INSS e IRRF de 2026, em vigor desde 01/01/2026 · Portaria Interministerial MPS/MF nº 13, de 09/01/2026 | 113 | `legal.md` R4, R5, R6. Year, date and source all interpolated from `CURRENT_LEGAL_YEAR`; the source is the link text, href `sourceUrl` |

### Jornada — the form

`components/organisms/journey-form.tsx`.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `journey.title` | Sua Jornada | 11 | — |
| `journey.subtitle` | Informe seus horários para ver quando pode sair e quanto já trabalhou. | 70 | `spec.md` Q1, Q2 |
| `journey.settings.toggle` | Configurações da Jornada | 24 | `aria-label` |
| `journey.exitMode.legend` | Modo de cálculo da saída | 24 | `sr-only` legend |
| `journey.exitMode.auto` | AUTO | 4 | — |
| `journey.exitMode.manual` | MANUAL | 6 | — |
| `journey.exitMode.hint.auto` | Calculamos sua saída a partir da jornada. | 41 | — |
| `journey.exitMode.hint.manual` | Você informa o horário que bateu na saída. | 42 | — |
| `journey.dailyJourney.label` | Tempo de Trabalho Diário | 24 | — |
| `journey.dailyJourney.hint` | Define o tempo total de trabalho esperado por dia. Vale também para o cálculo do valor da sua hora. | 99 | — |
| `journey.dailyJourney.placeholder` | 08:48 | 5 | — |
| `journey.firstTier.label` | Adicional até 2h extras (%) | 27 | `legal.md` R8 |
| `journey.firstTier.hint` | O piso legal é 50% sobre a hora normal (art. 7º, XVI, da CF; art. 59, §1º, da CLT). | 83 | `legal.md` R8 — bound by `aria-describedby` |
| `journey.extraTier.label` | Adicional acima de 2h (%) | 25 | `legal.md` R8 |
| `journey.extraTier.hint` | Não existe lei que dobre o adicional depois da 2ª hora: o piso continua sendo 50%. Só use 100% se a sua convenção coletiva previr esse degrau. | 142 | `legal.md` R8 — bound by `aria-describedby` |
| `journey.field.entry` | Entrada | 7 | — |
| `journey.field.lunchStart` | Saída Almoço | 12 | — |
| `journey.field.lunchEnd` | Volta Almoço | 12 | — |
| `journey.field.exit.auto` | Saída Sugerida | 14 | — |
| `journey.field.exit.manual` | Saída Real | 10 | — |
| `journey.field.datePlaceholder` | DD/MM/AAAA | 10 | — |
| `journey.field.timePlaceholder` | HH:mm | 5 | — |
| `journey.field.timeLabel` | Hora para Entrada | 17 | `aria-label`, built as `Hora para ${label}` — one per field |
| `journey.reset.trigger` | Resetar Horários | 16 | button text and `aria-label`, same string |
| `journey.reset.title` | Resetar os horários? | 20 | — |
| `journey.reset.body` | Entrada, almoço, saída e as configurações da jornada voltam aos valores padrão. Não dá para desfazer. | 101 | — |
| `journey.reset.cancel` | Cancelar | 8 | — |
| `journey.reset.confirm` | Resetar horários | 16 | — |

### Jornada — validation

`lib/journey.ts`. The banner title is in `journey-form.tsx`; the message is the field's own. Each names the problem and the correction.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `journey.issue.title` | Confira seus horários | 21 | `role="alert"` banner title |
| `journey.issue.entry.invalid` | Informe uma data e uma hora válidas para a entrada. | 51 | — |
| `journey.issue.entry.order` | A entrada precisa ser o primeiro horário do dia. | 48 | — |
| `journey.issue.lunchStart.invalid` | Informe uma data e uma hora válidas para a saída do almoço. | 59 | — |
| `journey.issue.lunchStart.order` | A saída para o almoço precisa vir depois da entrada. | 52 | — |
| `journey.issue.lunchEnd.invalid` | Informe uma data e uma hora válidas para a volta do almoço. | 59 | — |
| `journey.issue.lunchEnd.order` | A volta do almoço precisa vir depois da saída para o almoço. | 60 | — |
| `journey.issue.exit.invalid` | Informe uma data e uma hora válidas para a saída. | 49 | — |
| `journey.issue.exit.order` | A saída precisa vir depois da volta do almoço. | 46 | — |

### Jornada — the hero

`components/organisms/work-calculator.tsx`, `components/organisms/hero-panel.tsx`, `components/molecules/copy-button.tsx`.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `hero.work.label.auto` | Saída Prevista | 14 | — |
| `hero.work.label.manual` | Saída Real | 10 | — |
| `hero.work.description.auto` | é quando sua jornada fecha | 26 | — |
| `hero.work.description.auto.past` | sua jornada já fechou | 21 | shown once the projected exit has passed |
| `hero.work.description.manual` | foi o horário que você registrou | 32 | — |
| `hero.work.ring.waiting` | aguardando horários | 19 | shown while the journey does not resolve to a time |
| `hero.work.ring.remaining` | faltam | 6 | — |
| `hero.work.ring.overtime` | hora extra | 10 | — |
| `hero.work.ring.balance` | balanço do dia | 14 | manual mode |
| `hero.work.entry` | Entrada às 08:00 | 16 | built as `Entrada às ${HH:mm}` |
| `hero.work.copy` | Copiar horário de saída | 23 | `aria-label` and `title` |
| `copy.status.copied` | Copiado! | 8 | `role="status"`, clears after 2s |
| `copy.status.failed` | Não foi possível copiar | 23 | `role="status"`, clears after 4s |

### Jornada — the day summary

`components/organisms/day-summary.tsx`.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `day.title` | Seu Dia | 7 | — |
| `day.now` | agora | 5 | replaces the end time of the running stretch |
| `day.stretch.morning` | Manhã | 5 | — |
| `day.stretch.lunch` | Almoço | 6 | — |
| `day.stretch.afternoon` | Tarde | 5 | — |
| `day.night.label` | Hora noturna reduzida | 21 | `legal.md` R2 |
| `day.night.norm` | art. 73 da CLT | 14 | `legal.md` R2 |
| `day.total.workedNow` | Trabalhado até agora | 20 | while the journey is running |
| `day.total.worked` | Trabalhado no dia | 17 | once the exit is fixed |
| `day.total.expected` | Previsto no dia | 15 | — |
| `day.total.remaining` | Ainda falta | 11 | — |
| `day.balance.projected` | Saldo se você sair no horário | 29 | while time remains |
| `day.balance.final` | Saldo do dia | 12 | — |
| `day.tier.first` | Extra 50% | 9 | built as `Extra ${firstTierRate}%`; `legal.md` R8 |
| `day.tier.extra` | Extra 100% | 10 | built as `Extra ${extraTierRate}%`; `legal.md` R8 |
| `day.night.premium` | Adicional noturno 20% | 21 | `legal.md` R1 — renders currency, not a duration |
| `day.rest.label` | DSR sobre os extras | 19 | `legal.md` R9 |
| `day.rest.note` | O DSR (Súmula 172 do TST) supõe que estes extras se repitam em todos os dias úteis do mês e conta só os domingos — feriados não entram. | 135 | `legal.md` R9 and § Disclaimers — sits directly under the DSR line |
| `day.rate.cta` | Quer ver quanto isso vale em reais? Calcule o valor da sua hora → | 65 | shown only when no gross hourly rate is stored; links to `/custo-da-hora` |

### Jornada — compliance warnings

`lib/compliance.ts`. Each is an `AlertBanner` with `role="status"`: a title naming what happened and a body naming the article and who bears the irregularity.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `compliance.overtime.title` | Você passou de 2h extras hoje | 29 | `legal.md` R11 |
| `compliance.overtime.detail` | O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST) — a irregularidade está na extrapolação, e a sanção recai sobre o empregador. | 208 | `legal.md` R11 |
| `compliance.shortBreak.title` | Faltou o intervalo de 15 minutos | 32 | `legal.md` R12 |
| `compliance.shortBreak.detail` | Jornada acima de 4 horas e de até 6 horas exige um intervalo de no mínimo 15 minutos (art. 71, §1º, da CLT). O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória. | 184 | `legal.md` R12 |
| `compliance.lunch.title` | Seu intervalo ficou abaixo de 1 hora | 36 | `legal.md` R13 |
| `compliance.lunch.detail` | Jornada acima de 6 horas exige no mínimo 1 hora de intervalo (art. 71 da CLT), que norma coletiva pode reduzir para 30 minutos. O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória. | 203 | `legal.md` R13 |
| `compliance.rest.title` | Você descansou menos de 11 horas desde a jornada anterior | 57 | `legal.md` R14 |
| `compliance.rest.detail` | O art. 66 da CLT garante no mínimo 11 horas seguidas de descanso entre duas jornadas. O tempo suprimido costuma ser pago como hora extra, e a irregularidade recai sobre o empregador. | 182 | `legal.md` R14 |

### Custo da Hora — the form

`components/organisms/salary-calculator.tsx`.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `salary.title` | Custo da Hora | 13 | — |
| `salary.subtitle` | Descubra quanto vale cada hora do seu trabalho, já com os descontos. A hora extra da aba Jornada é calculada sobre a hora bruta, como manda o art. 59, §1º, da CLT. | 163 | `legal.md` R8 and § Disclaimers — separates the net hour cost from the gross overtime base |
| `salary.gross.label` | Salário Bruto (R$) | 18 | — |
| `salary.gross.placeholder` | 0,00 | 4 | — |
| `salary.monthlyHours.label` | Carga Horária Mensal | 20 | `legal.md` R10 |
| `salary.monthlyHours.placeholder` | 220 | 3 | — |
| `salary.dailyJourney.label` | Jornada Diária | 14 | — |
| `salary.dailyJourney.hint` | A mesma jornada diária usada na aba Jornada. | 44 | — |
| `salary.details.toggle` | Impostos e Descontos | 20 | — |
| `salary.details.summary` | INSS, IRRF, dependentes, descontos e ganhos extras | 50 | — |

### Custo da Hora — data alerts

`components/organisms/salary-calculator.tsx`. All three sit above the disclosure button, visible without expanding anything.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `salary.alert.noGross.title` | Informe o seu salário bruto | 27 | `legal.md` § Rounding, non-real amounts |
| `salary.alert.noGross.body` | Sem ele os valores abaixo continuam em R$ 0,00 — e esse zero não é o seu salário, é a falta do dado. | 100 | `legal.md` § Rounding, non-real amounts |
| `salary.alert.noHours.title` | Informe a carga horária mensal | 30 | `legal.md` R10 |
| `salary.alert.noHours.body` | Sem ela não dá para saber quanto vale a sua hora. Para a jornada de 8h48 por dia o divisor é 220 horas por mês. | 111 | `legal.md` R10 |
| `salary.alert.divisor.title` | A carga mensal não combina com a jornada diária | 47 | `legal.md` R10 |
| `salary.alert.divisor.body` | Pela Súmula 431 do TST, a jornada que você informou corresponde ao divisor 200 horas por mês, e não 220. Usar um divisor maior do que o devido reduz o valor de cada hora sua. | 174 | `legal.md` R10, E14 — both divisors interpolated |

### Custo da Hora — the regime picker

`components/molecules/regime-field.tsx` and `lib/payroll.ts`. The two `impact` strings interpolate every figure from `CURRENT_LEGAL_YEAR`; no fiscal number is a literal.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `regime.legend` | Regime de Trabalho | 18 | — |
| `regime.trigger.open` | Alterar | 7 | — |
| `regime.trigger.close` | Fechar | 6 | — |
| `regime.note` | O regime muda só o cálculo do INSS. O IRRF segue a mesma tabela para os dois. | 77 | `legal.md` R4, R5, R6 |
| `regime.clt.label` | CLT | 3 | — |
| `regime.clt.summary` | Carteira assinada, inclusive em estatais | 40 | — |
| `regime.clt.who` | Quem tem contrato regido pela CLT, seja em empresa privada ou em empresa pública e sociedade de economia mista (Correios, Caixa, Petrobras): carteira assinada, FGTS, aviso prévio e férias com 1/3. | 196 | `PRODUCT.md` §1 |
| `regime.clt.impact` | INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14% e teto de contribuição em R$ 8.475,55 — acima disso o desconto trava em R$ 988,09 (tabela de 2026). | 156 | `legal.md` R4, E2 — ceiling, discount and year all interpolated |
| `regime.estatutario.label` | Estatutário | 11 | — |
| `regime.estatutario.summary` | Servidor público efetivo, com regime próprio | 44 | — |
| `regime.estatutario.who` | Servidor efetivo regido por estatuto (RJU) e vinculado a um regime próprio de previdência (RPPS), não ao INSS. | 110 | `PRODUCT.md` §1 |
| `regime.estatutario.impact` | Aplicamos a tabela do RPPS federal: a contribuição não para no teto do INSS e as faixas seguem subindo até 22% sobre a parcela mais alta. Servidor estadual ou municipal tem alíquota própria (muitas vezes 14% linear), então este número não vale para ele. | 253 | `legal.md` R5 and § Disclaimers — the state/municipal caveat |

### Custo da Hora — taxes and extras

`components/organisms/tax-details-panel.tsx`, `components/molecules/extra-entry-list.tsx`, `components/molecules/extra-entry-row.tsx`.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `tax.dependents.label` | Dependentes | 11 | `legal.md` R6 |
| `tax.dependents.placeholder` | 0 | 1 | — |
| `tax.inss.label` | INSS (R$) | 9 | `legal.md` R4, R5 — the placeholder is the computed value, overridable |
| `tax.irrf.label` | IRRF (R$) | 9 | `legal.md` R6, R7 — same |
| `tax.deductions.label` | Outros Descontos | 16 | — |
| `tax.deductions.add` | Adicionar desconto | 18 | `aria-label`; the visible button text is `Adicionar` |
| `tax.deductions.row.name` | Descrição do desconto | 21 | `aria-label` |
| `tax.deductions.row.namePlaceholder` | Nome (ex: Plano de Saúde) | 25 | — |
| `tax.deductions.row.value` | Valor do desconto | 17 | `aria-label` |
| `tax.deductions.row.remove` | Remover desconto | 16 | `aria-label` |
| `tax.gains.label` | Ganhos Extras (Líquido) | 23 | `legal.md` § Out of scope — the label states the premise, since these never enter the tax base |
| `tax.gains.add` | Adicionar ganho | 15 | `aria-label` |
| `tax.gains.row.name` | Descrição do ganho | 18 | `aria-label` |
| `tax.gains.row.namePlaceholder` | Nome (ex: Vale Alimentação) | 27 | — |
| `tax.gains.row.value` | Valor do ganho | 14 | `aria-label` |
| `tax.gains.row.remove` | Remover ganho | 13 | `aria-label` |
| `tax.row.addButton` | Adicionar | 9 | visible text on both add buttons |
| `tax.row.valuePlaceholder` | Valor | 5 | — |

### Custo da Hora — the results

`components/organisms/salary-calculator.tsx`, `components/atoms/stat-box.tsx`, `components/molecules/period-selector.tsx`.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `stat.net.label` | Salário Líquido | 15 | `legal.md` E8 |
| `stat.total.label` | Total Recebido | 14 | shown only when there are extra gains |
| `stat.total.sub` | Líquido + Extras | 16 | — |
| `stat.deductions.label` | Total Descontos | 15 | — |
| `stat.deductions.sub` | INSS + IRRF + Outros | 20 | `legal.md` R4, R6 |
| `hero.salary.label` | Valor por Hora | 14 | built as `Valor por ${period}` |
| `hero.salary.missing` | — | 1 | the value slot when the monthly load is missing |
| `hero.salary.rate.hour` | R$ 0,06 por minuto | 18 | built as `${minuteRate} por minuto` when the period is Hora |
| `hero.salary.rate.other` | R$ 13,64 por hora · R$ 0,23 por minuto | 38 | built as `${hourlyRate} por hora · ${minuteRate} por minuto` for every other period |
| `hero.salary.noHours` | Informe a carga horária mensal para calcular | 44 | `legal.md` R10 |
| `hero.salary.footer.title` | Resumo Financeiro | 17 | — |
| `hero.salary.footer.gross` | Bruto | 5 | — |
| `hero.salary.footer.gains` | Ganhos Extras | 13 | — |
| `period.legend` | Visualizar o valor por período | 30 | `sr-only` legend |
| `period.hour` | Hora | 4 | — |
| `period.day` | Dia | 3 | — |
| `period.week` | Semana | 6 | — |
| `period.month` | Mês | 3 | — |
| `period.year` | Ano | 3 | `legal.md` § Known imprecisions — thirteen monthly nets |

### Privacy and consent

`components/organisms/cookie-consent.tsx`. The banner appears 1500ms after load, only when no choice is stored; the launcher is permanent once it is.

| Key | pt-BR | Chars | Trace |
|---|---|---|---|
| `consent.banner.title` | Respeitamos sua privacidade | 27 | — |
| `consent.banner.body` | Usamos cookies para melhorar sua experiência e entender como você usa o WorkLoad. Você pode optar por desativar a telemetria a qualquer momento. | 144 | `PRODUCT.md` §5 |
| `consent.banner.settings` | Configurar | 10 | — |
| `consent.banner.reject` | Recusar | 7 | — |
| `consent.banner.accept` | Aceitar Tudo | 12 | — |
| `consent.dialog.title` | Privacidade | 11 | — |
| `consent.dialog.close` | Fechar configurações de privacidade | 35 | `aria-label` |
| `consent.essential.label` | Cookies Essenciais | 18 | — |
| `consent.essential.body` | Necessários para o funcionamento do site. | 41 | — |
| `consent.essential.state` | Sempre ativo | 12 | — |
| `consent.telemetry.label` | Telemetria (Google Analytics) | 29 | — |
| `consent.telemetry.body` | Ajuda a entender como o site é usado. | 37 | — |
| `consent.dialog.save` | Salvar Preferências | 19 | — |
| `consent.launcher` | Configurações de Privacidade | 28 | `aria-label` on the floating launcher |

**189 strings.**

## Rejected phrasings

Recorded from the decisions that produced the current wording. Language is pt-BR throughout.

| Considered | Why it lost |
|---|---|
| `Adicional noturno` (label alone, showing a duration) | Sat beside two lines that show money and showed a duration with a blank where the amount belongs. Read as "my night premium is 8h" or "it is worth R$ 0,00" — the most serious communication risk the product had. Replaced by `Adicional noturno 20%` rendering currency. |
| `Adicional acima de 2h (%)` with no hint | Reads as a statutory tier. There is no law that doubles the premium after the second hour. |
| `Descubra quanto vale cada hora do seu trabalho, já com os descontos.` alone | True of this screen, but the same screen feeds the overtime pricing on the other tab, which is computed on the gross hour. The second sentence was added rather than the first removed. |
| `Os valores são uma estimativa…` as the whole disclaimer | Covered the ponto record and said nothing about which variables are missing or which year the tables are from. Kept, and two paragraphs added around it. |
| `R$ 0,00` with no alert when the gross salary is missing | A zero in the same confident typography as a real figure. Replaced by a named alert above the results. |
| Silently rewriting the monthly load to the Súmula 431 divisor | Overwrites a number the user typed. Replaced by a warning that names the coherent divisor and what the mismatch costs. |
| `teto de contribuição em R$ 8.475,55` as a literal in the regime text | Correct for 2026 and false from January 2027, displayed with the same confidence. Replaced by interpolation from `CURRENT_LEGAL_YEAR`. |

## Checks

Replacing the template's locale-parity check, which does not apply.

- [x] Every string is pt-BR, fully accented, and reproduced byte-identical to the component it ships in.
- [x] Every legal or numeric claim traces to a rule or table in `legal.md`, and none exceeds `PRODUCT.md` §9.
- [x] No fiscal figure is a literal in a string — the regime text and the footer interpolate from `lib/legal-tables.ts`.
- [x] The table's year and effective date appear wherever a number derived from it is shown, per `PRODUCT.md` §4.
- [x] Every error names the problem and the next action, or names what the zero on screen is.
- [x] No string tells the reader what to do about a result.
- [x] Every string fits its slot budget in `design.md` § *Copy constraints* at 390px.
