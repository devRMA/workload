"use client";

import {
	Briefcase,
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
import type { WorkRegime } from "@/lib/payroll";
import { SALARY_PERIOD_LABELS } from "@/lib/salary-period";
import {
	formatCurrency,
	formatCurrencySimple,
	parseCurrency,
} from "@/lib/utils";
import { CollapsiblePanel } from "../molecules/collapsible-panel";
import { FormField } from "../molecules/form-field";
import { HeroPanel } from "../molecules/hero-panel";
import { PeriodSelector } from "../molecules/period-selector";
import { SelectField } from "../molecules/select-field";
import { StatBox } from "../molecules/stat-box";
import { CalculatorLayout } from "../templates/calculator-layout";
import { TaxDetailsPanel } from "./tax-details-panel";

const DETAILS_PANEL_ID = "tax-details";

const REGIME_OPTIONS: readonly { value: WorkRegime; label: string }[] = [
	{ value: "clt", label: "CLT" },
	{ value: "empregado-publico", label: "Empregado Público" },
	{ value: "estatutario", label: "Estatutário" },
];

export function SalaryCalculator() {
	const {
		grossSalary,
		setGrossSalary,
		monthlyHours,
		setMonthlyHours,
		dailyHours,
		setDailyHours,
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
								<Calculator
									className="w-6 h-6 text-blue-600 dark:text-blue-400"
									aria-hidden="true"
								/>
							</div>
							<h2 className="text-2xl font-bold">Custo da Hora</h2>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
							<FormField
								id="salario-bruto"
								label="Salário Bruto (R$)"
								type="text"
								inputMode="numeric"
								icon={<span className="font-bold text-blue-500">R$</span>}
								placeholder="0,00"
								value={formatCurrencySimple(grossSalary)}
								onChange={(event) =>
									setGrossSalary(parseCurrency(event.target.value))
								}
							/>
							<SelectField
								id="regime-trabalho"
								label="Regime de Trabalho"
								labelIcon={<Briefcase className="w-4 h-4" aria-hidden="true" />}
								value={regime}
								options={REGIME_OPTIONS}
								onValueChange={setRegime}
							/>
							<FormField
								id="horas-mensais"
								label="Carga Horária Mensal"
								type="number"
								min={0}
								icon={<Clock className="w-5 h-5" />}
								placeholder="220"
								value={monthlyHours || ""}
								onChange={(event) =>
									setMonthlyHours(Number(event.target.value))
								}
							/>
							<FormField
								id="jornada-diaria"
								label="Jornada Diária (horas)"
								type="number"
								min={0}
								icon={<Sun className="w-5 h-5" />}
								placeholder="8"
								value={dailyHours || ""}
								onChange={(event) => setDailyHours(Number(event.target.value))}
							/>
						</div>

						<button
							type="button"
							onClick={() => setShowDetails(!showDetails)}
							aria-expanded={showDetails}
							aria-controls={DETAILS_PANEL_ID}
							className="w-full flex items-center justify-between p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
						>
							<span className="font-medium">Impostos e Descontos</span>
							{showDetails ? (
								<ChevronUp aria-hidden="true" />
							) : (
								<ChevronDown aria-hidden="true" />
							)}
						</button>

						<CollapsiblePanel
							id={DETAILS_PANEL_ID}
							isOpen={showDetails}
							className="mt-6"
						>
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
							icon={<Wallet className="w-4 h-4" />}
							variant="default"
						/>
						<StatBox
							label="Total Recebido"
							value={formatCurrency(stats.totalValue)}
							subValue="Líquido + Extras"
							icon={<TrendingUp className="w-4 h-4" />}
							variant="success"
						/>
						<StatBox
							label="Total Descontos"
							value={formatCurrency(
								stats.inss + stats.irrf + stats.totalExtraDeductions,
							)}
							subValue="INSS + IRRF + Outros"
							icon={<TrendingDown className="w-4 h-4" />}
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
							<p className="text-sm opacity-80 mb-2">Resumo Financeiro</p>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-xs opacity-60 uppercase font-bold">
										Bruto
									</p>
									<p className="text-xl font-bold">
										{formatCurrency(grossSalary)}
									</p>
								</div>
								<div>
									<p className="text-xs opacity-60 uppercase font-bold">
										Ganhos Extras
									</p>
									<p className="text-xl font-bold">
										+{formatCurrency(stats.totalExtraGains)}
									</p>
								</div>
							</div>
						</>
					}
				>
					<p className="mt-4 text-xl opacity-80 font-medium">
						{formatCurrency(stats.hourlyRate)} por hora ·{" "}
						{formatCurrency(stats.minuteRate)} por minuto
					</p>
					<div className="mt-6">
						<PeriodSelector value={period} onChange={setPeriod} />
					</div>
				</HeroPanel>
			}
		/>
	);
}
