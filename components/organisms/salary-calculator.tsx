"use client";

import { Calculator, ChevronDown, ChevronUp, Clock, Sun, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";
import { useSalaryCalculator } from "@/hooks/use-salary-calculator";
import { SALARY_PERIOD_LABELS } from "@/lib/salary-period";
import { formatCurrency, parseCurrency } from "@/lib/utils";
import { CollapsiblePanel } from "../molecules/collapsible-panel";
import { CurrencyField } from "../molecules/currency-field";
import { DurationField } from "../molecules/duration-field";
import { FormField } from "../molecules/form-field";
import { HeroPanel } from "../molecules/hero-panel";
import { PeriodSelector } from "../molecules/period-selector";
import { RegimeField } from "../molecules/regime-field";
import { StatBox } from "../molecules/stat-box";
import { CalculatorLayout } from "../templates/calculator-layout";
import { TaxDetailsPanel } from "./tax-details-panel";

const DETAILS_PANEL_ID = "tax-details";

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

  return (
    <CalculatorLayout
      className="selection:bg-blue-500/30"
      main={
        <>
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-xl shadow-neutral-200/50 dark:shadow-none border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold">Custo da Hora</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <CurrencyField
                id="salario-bruto"
                label="Salário Bruto (R$)"
                className="sm:col-span-2"
                icon={<span className="font-bold text-blue-500">R$</span>}
                placeholder="0,00"
                value={grossSalary}
                onValueChange={(rawValue) => setGrossSalary(parseCurrency(rawValue))}
              />
              <RegimeField className="sm:col-span-2" value={regime} onChange={setRegime} />
              <FormField
                id="horas-mensais"
                label="Carga Horária Mensal"
                type="number"
                min={0}
                icon={<Clock className="w-5 h-5" aria-hidden="true" />}
                placeholder="220"
                value={monthlyHours || ""}
                onChange={(event) => setMonthlyHours(Number(event.target.value))}
              />
              <DurationField
                id="jornada-diaria"
                label="Jornada Diária"
                hint="Horas e minutos por dia. Ex.: 08:48"
                icon={<Sun className="w-5 h-5" aria-hidden="true" />}
                minutes={dailyMinutes}
                onMinutesChange={setDailyMinutes}
              />
            </div>

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              aria-expanded={showDetails}
              aria-controls={DETAILS_PANEL_ID}
              className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className="flex flex-col items-start gap-0.5 text-left">
                <span className="font-medium">Impostos e Descontos</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  INSS, IRRF, dependentes, descontos e ganhos extras
                </span>
              </span>
              {showDetails ? (
                <ChevronUp className="shrink-0" aria-hidden="true" />
              ) : (
                <ChevronDown className="shrink-0" aria-hidden="true" />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatBox
              label="Salário Líquido"
              value={formatCurrency(stats.netSalary)}
              icon={<Wallet className="w-4 h-4" aria-hidden="true" />}
              variant="default"
            />
            <StatBox
              label="Total Recebido"
              value={formatCurrency(stats.totalValue)}
              subValue="Líquido + Extras"
              icon={<TrendingUp className="w-4 h-4" aria-hidden="true" />}
              variant="success"
            />
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
          value={formatCurrency(stats.periodValue)}
          tone="blue"
          footer={
            <>
              <p className="text-sm mb-2">Resumo Financeiro</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase font-bold">Bruto</p>
                  <p className="text-xl font-bold tabular-nums">{formatCurrency(grossSalary)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold">Ganhos Extras</p>
                  <p className="text-xl font-bold tabular-nums">+{formatCurrency(stats.totalExtraGains)}</p>
                </div>
              </div>
            </>
          }
        >
          <p className="mt-4 text-xl font-medium">
            {formatCurrency(stats.hourlyRate)} por hora · {formatCurrency(stats.minuteRate)} por minuto
          </p>
          <div className="mt-6">
            <PeriodSelector value={period} onChange={setPeriod} />
          </div>
        </HeroPanel>
      }
    />
  );
}
