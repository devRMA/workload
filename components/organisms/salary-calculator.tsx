"use client";

import {
  AlertTriangle,
  Calculator,
  ChevronDown,
  ChevronUp,
  Clock,
  Sun,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useSalaryCalculator } from "@/hooks/use-salary-calculator";
import { minutesToHours } from "@/lib/duration";
import { isRealAmount } from "@/lib/payroll";
import { findDivisorMismatch, SALARY_PERIOD_LABELS } from "@/lib/salary-period";
import { formatCurrency, parseCurrency } from "@/lib/utils";
import { AlertBanner } from "../atoms/alert-banner";
import { CollapsiblePanel } from "../atoms/collapsible-panel";
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
const MISSING_VALUE = "—";

export function SalaryCalculator() {
  const {
    grossSalary,
    setGrossSalary,
    monthlyHours,
    setMonthlyHours,
    dailyMinutes,
    setDailyMinutes,
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
  const coherentMonthlyHours = findDivisorMismatch(monthlyHours, minutesToHours(dailyMinutes));
  const supportingRate =
    period === "hour"
      ? `${formatCurrency(stats.minuteRate)} por minuto`
      : `${formatCurrency(stats.hourlyRate)} por hora · ${formatCurrency(stats.minuteRate)} por minuto`;

  return (
    <CalculatorLayout
      main={
        <>
          <div className="bg-surface rounded-xl p-lg sm:p-xl shadow-card border border-line">
            <div className="flex items-center gap-md mb-xl">
              <div className="p-3 bg-accent-soft rounded-md">
                <Calculator className="text-accent-ink" size={24} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-title">Custo da Hora</h2>
                <p className="text-body-sm text-ink-muted text-pretty">
                  Descubra quanto vale cada hora do seu trabalho, já com os descontos. A hora extra da aba Jornada é
                  calculada sobre a hora bruta, como manda o art. 59, §1º, da CLT.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg mb-xl">
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
                  icon={<Clock className="w-5 h-5" aria-hidden="true" />}
                  placeholder="220"
                  value={monthlyHours || ""}
                  onChange={(event) => setMonthlyHours(Number(event.target.value))}
                />
              </Field>
              <DurationField
                id="jornada-diaria"
                label="Jornada Diária"
                hint="A mesma jornada diária usada na aba Jornada."
                icon={<Sun className="w-5 h-5" aria-hidden="true" />}
                minutes={dailyMinutes}
                onMinutesChange={setDailyMinutes}
              />
            </div>

            {hasGrossSalary ? null : (
              <AlertBanner icon={AlertTriangle} tone="danger" title="Informe o seu salário bruto" className="mb-lg">
                <p>
                  Sem ele os valores abaixo continuam em R$ 0,00 — e esse zero não é o seu salário, é a falta do dado.
                </p>
              </AlertBanner>
            )}

            {hasMonthlyHours ? null : (
              <AlertBanner icon={AlertTriangle} tone="danger" title="Informe a carga horária mensal" className="mb-lg">
                <p>
                  Sem ela não dá para saber quanto vale a sua hora. Para a jornada de 8h48 por dia o divisor é 220 horas
                  por mês.
                </p>
              </AlertBanner>
            )}

            {coherentMonthlyHours === null ? null : (
              <AlertBanner
                icon={AlertTriangle}
                tone="warning"
                title="A carga mensal não combina com a jornada diária"
                className="mb-lg"
              >
                <p>
                  Pela Súmula 431 do TST, a jornada que você informou corresponde ao divisor {coherentMonthlyHours}{" "}
                  horas por mês, e não {monthlyHours}. Usar um divisor maior do que o devido reduz o valor de cada hora
                  sua.
                </p>
              </AlertBanner>
            )}

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              aria-expanded={showDetails}
              aria-controls={DETAILS_PANEL_ID}
              className="w-full flex items-center justify-between gap-md p-md rounded-lg border border-line hover:bg-surface-sunken transition-colors duration-(--duration-fast) ease-standard ring-focus"
            >
              <span className="flex flex-col items-start gap-0.5 text-left">
                <span className="text-body font-medium">Impostos e Descontos</span>
                <span className="text-caption text-ink-subtle">INSS, IRRF, dependentes, descontos e ganhos extras</span>
              </span>
              {showDetails ? (
                <ChevronUp className="shrink-0" size={20} aria-hidden="true" />
              ) : (
                <ChevronDown className="shrink-0" size={20} aria-hidden="true" />
              )}
            </button>

            <CollapsiblePanel id={DETAILS_PANEL_ID} isOpen={showDetails} className="mt-lg">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md" aria-live="polite">
            <StatBox
              label="Salário Líquido"
              value={formatCurrency(stats.netSalary)}
              icon={<Wallet className="w-4 h-4" aria-hidden="true" />}
              variant="default"
            />
            {stats.totalExtraGains > 0 ? (
              <StatBox
                label="Total Recebido"
                value={formatCurrency(stats.totalValue)}
                subValue="Líquido + Extras"
                icon={<TrendingUp className="w-4 h-4" aria-hidden="true" />}
                variant="success"
              />
            ) : null}
            <StatBox
              label="Total Descontos"
              value={formatCurrency(stats.inss + stats.irrf + stats.totalExtraDeductions)}
              subValue="INSS + IRRF + Outros"
              icon={<TrendingDown className="w-4 h-4" aria-hidden="true" />}
              variant="danger"
            />
          </div>
        </>
      }
      aside={
        <HeroPanel
          icon={Clock}
          label={`Valor por ${SALARY_PERIOD_LABELS[period]}`}
          value={hasMonthlyHours ? formatCurrency(stats.periodValue) : MISSING_VALUE}
          tone="blue"
          footer={
            <>
              <p className="text-body-sm mb-xs">Resumo Financeiro</p>
              <div className="grid grid-cols-2 gap-md">
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
          <p className="mt-md text-body font-medium text-ink-onfill/90">
            {hasMonthlyHours ? supportingRate : "Informe a carga horária mensal para calcular"}
          </p>
          <div className="mt-lg">
            <PeriodSelector value={period} onChange={setPeriod} />
          </div>
        </HeroPanel>
      }
    />
  );
}
