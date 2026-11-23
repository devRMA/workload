"use client";

import {
  IconAlertTriangle,
  IconCalculator,
  IconCalendarWeek,
  IconChevronDown,
  IconChevronUp,
  IconClock,
  IconSun,
  IconTrendingDown,
  IconTrendingUp,
  IconWallet,
} from "@tabler/icons-react";
import { useState } from "react";
import { useSalaryCalculator } from "@/hooks/use-salary-calculator";
import { formatCompactDuration } from "@/lib/duration";
import { isRealAmount } from "@/lib/payroll";
import { checkDivisor, type DivisorCheck, type DivisorNorm, SALARY_PERIOD_LABELS } from "@/lib/salary-period";
import { formatCurrency, formatCurrencySimple, formatHours, parseCurrency } from "@/lib/utils";
import { AlertBanner } from "../atoms/alert-banner";
import { CollapsiblePanel } from "../atoms/collapsible-panel";
import { EstimateNotice } from "../atoms/estimate-notice";
import { Input } from "../atoms/input";
import { StatBox } from "../atoms/stat-box";
import { CurrencyInput } from "../molecules/currency-input";
import { DurationField } from "../molecules/duration-field";
import { Field } from "../molecules/field";
import { PeriodSelector } from "../molecules/period-selector";
import { RegimeField } from "../molecules/regime-field";
import { HeroPanel } from "../organisms/hero-panel";
import { CalculatorLayout } from "../templates/calculator-layout";
import { TaxDetailsPanel } from "./tax-details-panel";

const DETAILS_PANEL_ID = "tax-details";
const ANNUAL_PERIOD_DISCLOSURE_ID = "annual-period-disclosure";
const DIVISOR_ALERT_ID = "divisor-alert";
const MISSING_VALUE = "Sem carga horária";

const DIVISOR_NORMS: Record<DivisorNorm, string> = {
  "sumula-431": "(Súmula 431 do TST, para a semana de 40 horas)",
  "clt-64-caput": "(art. 64, caput, da CLT)",
  "clt-64-sole-paragraph": "(art. 64, parágrafo único, da CLT)",
};

const COLLECTIVE_AGREEMENT_DISCLOSURE =
  "Uma convenção ou acordo coletivo pode estabelecer outra jornada (art. 611-A, I, da CLT), e esta tela não tem como saber.";

const HOURLY_RATE_SCOPE_DISCLOSURE =
  "Bancário, turno ininterrupto de revezamento e escala 12x36 têm divisor próprio, fixado por norma da categoria (Súmula 124 e OJ 396 do TST, art. 59-A da CLT). Se for o seu caso, o valor da hora nesta tela é outro.";

function DailyJourney({ minutes }: { minutes: number }) {
  return <span className="numeric">{formatCompactDuration(minutes)}</span>;
}

function WeekDays({ days }: { days: number }) {
  return (
    <>
      <span className="numeric">{days}</span> {days === 1 ? "dia" : "dias"} por semana
    </>
  );
}

interface DivisorSentenceProps {
  dailyMinutes: number;
  workDaysPerWeek: number;
  divisor: number;
  norm: DivisorNorm;
  declaredMonthlyHours: number | null;
}

function DivisorSentence({ dailyMinutes, workDaysPerWeek, divisor, norm, declaredMonthlyHours }: DivisorSentenceProps) {
  return (
    <p>
      Para <DailyJourney minutes={dailyMinutes} /> por dia em <WeekDays days={workDaysPerWeek} />, o divisor é{" "}
      <span className="numeric">{formatCurrencySimple(divisor)}</span> horas por mês {DIVISOR_NORMS[norm]}.
      {declaredMonthlyHours === null ? null : (
        <>
          {" "}
          Você informou <span className="numeric">{formatCurrencySimple(declaredMonthlyHours)}</span> horas.
        </>
      )}
    </p>
  );
}

interface DivisorSurfaceProps {
  check: DivisorCheck;
  dailyMinutes: number;
  workDaysPerWeek: number;
  declaredMonthlyHours: number;
}

function DivisorSurface({ check, dailyMinutes, workDaysPerWeek, declaredMonthlyHours }: DivisorSurfaceProps) {
  switch (check.kind) {
    case "no-week-days":
      return (
        <AlertBanner
          id={DIVISOR_ALERT_ID}
          icon={IconAlertTriangle}
          tone="danger"
          title="Informe os dias trabalhados por semana"
          className="mb-6"
        >
          <p>Sem eles não dá para conferir a sua carga horária mensal.</p>
        </AlertBanner>
      );
    case "too-many-week-days":
      return (
        <AlertBanner
          id={DIVISOR_ALERT_ID}
          icon={IconAlertTriangle}
          tone="danger"
          title="A semana tem um dia de descanso"
          className="mb-6"
        >
          <p>
            A lei garante 24 horas seguidas de descanso por semana (art. 67 da CLT; art. 1º da Lei 605/49), então o
            máximo aqui é 6 dias.
          </p>
        </AlertBanner>
      );
    case "daily-cap-exceeded":
      return (
        <AlertBanner
          id={DIVISOR_ALERT_ID}
          icon={IconAlertTriangle}
          tone="warning"
          title="Sem divisor acima de 10 horas por dia"
          className="mb-6"
        >
          <p>
            <DailyJourney minutes={dailyMinutes} /> por dia em <WeekDays days={workDaysPerWeek} /> dá{" "}
            <span className="numeric">{formatHours(check.weeklyHours)}</span> horas semanais. A jornada diária não passa
            de 10 horas (art. 59, §2º, da CLT). Acima disso, só a escala 12x36 do art. 59-A, que esta tela não calcula.
            Revise a jornada diária.
          </p>
        </AlertBanner>
      );
    case "weekly-cap-exceeded":
      return (
        <AlertBanner
          id={DIVISOR_ALERT_ID}
          icon={IconAlertTriangle}
          tone="warning"
          title="Sem divisor para esta semana"
          className="mb-6"
        >
          <p>
            <DailyJourney minutes={dailyMinutes} /> por dia em <WeekDays days={workDaysPerWeek} /> dá{" "}
            <span className="numeric">{formatHours(check.weeklyHours)}</span> horas semanais. A jornada normal vai até
            44 horas por semana (art. 7º, XIII, da Constituição), e acima disso não há divisor a conferir. Revise a
            jornada diária ou os dias por semana.
          </p>
        </AlertBanner>
      );
    case "workload-missing-without-week":
      return (
        <AlertBanner
          id={DIVISOR_ALERT_ID}
          icon={IconAlertTriangle}
          tone="danger"
          title="Informe a carga horária mensal"
          className="mb-6"
        >
          <p>Sem ela não dá para saber quanto vale a sua hora.</p>
        </AlertBanner>
      );
    case "workload-missing":
      return (
        <AlertBanner
          id={DIVISOR_ALERT_ID}
          icon={IconAlertTriangle}
          tone="danger"
          title="Informe a carga horária mensal"
          className="mb-6"
        >
          <div className="space-y-2">
            <p>Sem ela não dá para saber quanto vale a sua hora.</p>
            <DivisorSentence
              dailyMinutes={dailyMinutes}
              workDaysPerWeek={workDaysPerWeek}
              divisor={check.divisor}
              norm={check.norm}
              declaredMonthlyHours={null}
            />
            <p>{COLLECTIVE_AGREEMENT_DISCLOSURE}</p>
          </div>
        </AlertBanner>
      );
    case "workload-mismatch":
      return (
        <AlertBanner
          id={DIVISOR_ALERT_ID}
          icon={IconAlertTriangle}
          tone="warning"
          title="A carga mensal não combina com a sua semana"
          className="mb-6"
        >
          <div className="space-y-2">
            <DivisorSentence
              dailyMinutes={dailyMinutes}
              workDaysPerWeek={workDaysPerWeek}
              divisor={check.divisor}
              norm={check.norm}
              declaredMonthlyHours={declaredMonthlyHours}
            />
            <p>Os valores desta tela usam a carga que você informou.</p>
            <p>{COLLECTIVE_AGREEMENT_DISCLOSURE}</p>
          </div>
        </AlertBanner>
      );
    case "silent":
      return null;
  }
}

export function SalaryCalculator() {
  const {
    grossSalary,
    setGrossSalary,
    monthlyHours,
    setMonthlyHours,
    dailyMinutes,
    setDailyMinutes,
    workDaysPerWeek,
    setWorkDaysPerWeek,
    dependents,
    setDependents,
    regime,
    setRegime,
    period,
    setPeriod,
    manualInss,
    setManualInss,
    manualIrrf,
    setManualIrrf,
    extraDeductions,
    extraGains,
    autoInss,
    autoIrrf,
    stats,
    addExtra,
    updateExtra,
    removeExtra,
  } = useSalaryCalculator();

  const [showDetails, setShowDetails] = useState(false);
  const hasMonthlyHours = monthlyHours > 0;
  const hasGrossSalary = isRealAmount(grossSalary);
  const divisorCheck = checkDivisor({ dailyMinutes, workDaysPerWeek, declaredMonthlyHours: monthlyHours });
  const isWeekDaysInvalid = divisorCheck.kind === "no-week-days" || divisorCheck.kind === "too-many-week-days";
  const supportingRate =
    period === "hour"
      ? `${formatCurrency(stats.minuteRate)} por minuto`
      : `${formatCurrency(stats.hourlyRate)} por hora · ${formatCurrency(stats.minuteRate)} por minuto`;

  return (
    <CalculatorLayout
      main={
        <>
          <div id="salary-panel" className="bg-surface rounded-xl p-6 sm:p-8 shadow-card border border-line">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-accent-soft rounded-md">
                <IconCalculator className="text-accent-ink" size={24} stroke={1.75} aria-hidden="true" />
              </div>
              <div>
                <h2
                  id="editar-salario"
                  tabIndex={-1}
                  className="text-title scroll-mt-[calc(var(--header-height)+var(--spacing)*6)]"
                >
                  Custo da Hora
                </h2>
                <p className="text-body-sm text-ink-muted text-pretty">
                  Descubra quanto vale cada hora do seu trabalho, já com os descontos. A hora extra da aba Jornada é
                  calculada sobre a hora normal (art. 59, §1º, da CLT), que é a sua hora bruta, sem descontos.
                </p>
              </div>
            </div>

            <div id="salary-fields" className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <Field id="salario-bruto" label="Salário Bruto (R$)" className="sm:col-span-2">
                <CurrencyInput
                  id="salario-bruto"
                  icon={<span className="font-semibold text-ink-muted">R$</span>}
                  placeholder="0,00"
                  value={grossSalary}
                  onValueChange={(rawValue) => setGrossSalary(parseCurrency(rawValue))}
                />
              </Field>
              <RegimeField className="sm:col-span-2" value={regime} onChange={setRegime} />
              <Field id="horas-mensais" label="Carga Horária Mensal">
                <Input
                  id="horas-mensais"
                  type="number"
                  min={0}
                  icon={<IconClock className="w-5 h-5" aria-hidden="true" />}
                  placeholder="220"
                  value={monthlyHours || ""}
                  onChange={(event) => setMonthlyHours(Number(event.target.value))}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <DurationField
                  id="jornada-diaria"
                  label="Jornada Diária"
                  hint="A mesma jornada diária usada na aba Jornada."
                  icon={<IconSun className="w-5 h-5" aria-hidden="true" />}
                  minutes={dailyMinutes}
                  onMinutesChange={setDailyMinutes}
                />
                <Field id="dias-semana" label="Dias Trabalhados">
                  <Input
                    id="dias-semana"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={6}
                    step={1}
                    icon={<IconCalendarWeek className="w-5 h-5" aria-hidden="true" />}
                    placeholder="5"
                    value={workDaysPerWeek || ""}
                    onChange={(event) => setWorkDaysPerWeek(Number(event.target.value))}
                    aria-invalid={isWeekDaysInvalid}
                    aria-describedby={isWeekDaysInvalid ? DIVISOR_ALERT_ID : undefined}
                  />
                </Field>
              </div>
            </div>

            <p id="divisor-disclosure" className="text-body-sm text-ink-muted text-pretty mb-6">
              {HOURLY_RATE_SCOPE_DISCLOSURE}
            </p>

            {hasGrossSalary ? null : (
              <AlertBanner icon={IconAlertTriangle} tone="danger" title="Informe o seu salário bruto" className="mb-6">
                <p>Sem ele os valores abaixo continuam em R$ 0,00. Esse zero não é o seu salário, é a falta do dado.</p>
              </AlertBanner>
            )}

            <DivisorSurface
              check={divisorCheck}
              dailyMinutes={dailyMinutes}
              workDaysPerWeek={workDaysPerWeek}
              declaredMonthlyHours={monthlyHours}
            />

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              aria-expanded={showDetails}
              aria-controls={DETAILS_PANEL_ID}
              className="w-full flex items-center justify-between gap-4 p-4 rounded-lg border border-line hover:bg-surface-sunken transition-colors duration-(--duration-fast) ease-standard ring-focus"
            >
              <span className="flex flex-col items-start gap-0.5 text-left">
                <span className="text-body font-medium">Impostos e Descontos</span>
                <span className="text-caption text-ink-subtle">INSS, IRRF, dependentes, descontos e ganhos extras</span>
              </span>
              {showDetails ? (
                <IconChevronUp className="shrink-0" size={20} aria-hidden="true" />
              ) : (
                <IconChevronDown className="shrink-0" size={20} aria-hidden="true" />
              )}
            </button>

            <CollapsiblePanel id={DETAILS_PANEL_ID} isOpen={showDetails} className="mt-6">
              <TaxDetailsPanel
                dependents={dependents}
                onDependentsChange={setDependents}
                manualInss={manualInss}
                onManualInssChange={setManualInss}
                manualIrrf={manualIrrf}
                onManualIrrfChange={setManualIrrf}
                autoInss={autoInss}
                autoIrrf={autoIrrf}
                extraDeductions={extraDeductions}
                extraGains={extraGains}
                onAddExtra={addExtra}
                onUpdateExtra={updateExtra}
                onRemoveExtra={removeExtra}
              />
            </CollapsiblePanel>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-live="polite">
            <StatBox
              label="Salário Líquido"
              value={formatCurrency(stats.netSalary)}
              icon={<IconWallet className="w-4 h-4" aria-hidden="true" />}
              variant="default"
            />
            {stats.totalExtraGains > 0 ? (
              <StatBox
                label="Total Recebido"
                value={formatCurrency(stats.totalValue)}
                subValue="Líquido + Extras"
                icon={<IconTrendingUp className="w-4 h-4" aria-hidden="true" />}
                variant="success"
              />
            ) : null}
            <StatBox
              label="Total Descontos"
              value={formatCurrency(stats.inss + stats.irrf + stats.totalExtraDeductions)}
              subValue="INSS + IRRF + Outros"
              icon={<IconTrendingDown className="w-4 h-4" aria-hidden="true" />}
              variant="danger"
            />
          </div>
        </>
      }
      aside={
        <>
          <HeroPanel
            icon={IconClock}
            label={`Valor por ${SALARY_PERIOD_LABELS[period]}`}
            value={hasMonthlyHours ? formatCurrency(stats.periodValue) : MISSING_VALUE}
            tone="blue"
            editLink={{ href: "#editar-salario", label: "Editar salário" }}
            footer={
              <>
                <p className="text-body-sm mb-2">Resumo Financeiro</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-overline uppercase">Bruto</p>
                    <p className="text-heading numeric">{formatCurrency(grossSalary)}</p>
                  </div>
                  <div>
                    <p className="text-overline uppercase">Ganhos Extras</p>
                    <p className="text-heading numeric">+{formatCurrency(stats.totalExtraGains)}</p>
                  </div>
                </div>
              </>
            }
          >
            <p className="mt-4 text-body font-medium text-ink-onfill/90">
              {hasMonthlyHours ? supportingRate : "Informe a carga horária mensal para calcular"}
            </p>
            <div className="mt-6">
              <PeriodSelector
                value={period}
                onChange={setPeriod}
                describedById={period === "year" ? ANNUAL_PERIOD_DISCLOSURE_ID : undefined}
              />
            </div>
            {period === "year" ? (
              <p id={ANNUAL_PERIOD_DISCLOSURE_ID} className="mt-3 text-caption text-ink-onfill/90 text-pretty">
                O valor do Ano soma 12 meses mais o 13º salário (art. 7º, VIII, da CF; Lei nº 4.090/1962). É uma
                aproximação: o 13º tem INSS e IRRF próprios, descontados à parte.
              </p>
            ) : null}
          </HeroPanel>
          <EstimateNotice />
        </>
      }
    />
  );
}
