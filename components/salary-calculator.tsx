"use client";

import { sendGAEvent } from "@next/third-parties/google";
import {
	Calculator,
	ChevronDown,
	ChevronUp,
	Clock,
	PlusCircle,
	Trash2,
	TrendingDown,
	TrendingUp,
	Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSalaryCalculator } from "@/hooks/use-salary-calculator";
import {
	formatCurrency,
	formatCurrencySimple,
	parseCurrency,
} from "@/lib/utils";
import { Button } from "./atoms/button";
import { FormField } from "./molecules/form-field";
import { StatBox } from "./molecules/stat-box";

export default function SalaryCalculator() {
	const {
		grossSalary,
		setGrossSalary,
		monthlyHours,
		setMonthlyHours,
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

	const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = parseCurrency(e.target.value);
		setGrossSalary(val);
	};

	return (
		<div className="w-full selection:bg-blue-500/30">
			<div className="max-w-7xl 2xl:max-w-[1600px] 4k:max-w-[2400px] mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 4k:gap-24 items-start">
					{/* Main Form Area */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="lg:col-span-7 space-y-8 4k:space-y-20"
					>
						<div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-xl shadow-neutral-200/50 dark:shadow-none border border-neutral-200 dark:border-neutral-800 4k:p-24 4k:rounded-[4rem]">
							<div className="flex items-center gap-4 mb-8 4k:mb-20">
								<div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl 4k:p-6 4k:rounded-[2rem]">
									<Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400 4k:w-12 4k:h-12" />
								</div>
								<h2 className="text-2xl font-bold 4k:text-7xl">
									Custo da Hora
								</h2>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 4k:gap-12 mb-8">
								<FormField
									id="salario-bruto"
									label="Salário Bruto (R$)"
									type="text"
									inputMode="numeric"
									icon={<span className="font-bold text-blue-500">R$</span>}
									placeholder="0,00"
									value={formatCurrencySimple(grossSalary)}
									onChange={handleSalaryChange}
								/>
								<FormField
									id="horas-mensais"
									label="Carga Horária Mensal"
									type="number"
									icon={<Clock className="w-5 h-5 4k:w-8 4k:h-8" />}
									placeholder="220"
									value={monthlyHours || ""}
									onChange={(e) => setMonthlyHours(Number(e.target.value))}
								/>
							</div>

							<button
								type="button"
								onClick={() => setShowDetails(!showDetails)}
								className="w-full flex items-center justify-between p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors 4k:p-8"
							>
								<span className="font-medium 4k:text-3xl">
									Impostos e Descontos
								</span>
								{showDetails ? (
									<ChevronUp className="4k:w-8 4k:h-8" />
								) : (
									<ChevronDown className="4k:w-8 4k:h-8" />
								)}
							</button>

							<AnimatePresence>
								{showDetails && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										className="overflow-hidden mt-6"
									>
										<div className="space-y-6 4k:space-y-12 bg-neutral-50 dark:bg-neutral-800/30 p-6 rounded-2xl 4k:p-12 4k:rounded-[2rem]">
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 4k:gap-12">
												<FormField
													id="inss-manual"
													label="INSS (R$)"
													type="text"
													inputMode="numeric"
													icon={
														<span className="font-bold text-red-500">R$</span>
													}
													placeholder={formatCurrencySimple(autoInss)}
													value={
														manualInss !== null
															? formatCurrencySimple(manualInss)
															: ""
													}
													onChange={(e) =>
														setManualInss(
															e.target.value
																? parseCurrency(e.target.value)
																: null,
														)
													}
												/>
												<FormField
													id="irrf-manual"
													label="IRRF (R$)"
													type="text"
													inputMode="numeric"
													icon={
														<span className="font-bold text-red-500">R$</span>
													}
													placeholder={formatCurrencySimple(autoIrrf)}
													value={
														manualIrrf !== null
															? formatCurrencySimple(manualIrrf)
															: ""
													}
													onChange={(e) =>
														setManualIrrf(
															e.target.value
																? parseCurrency(e.target.value)
																: null,
														)
													}
												/>
											</div>

											{/* Extra Deductions */}
											<div>
												<div className="flex items-center justify-between mb-4">
													<label
														htmlFor="extra-deductions-list"
														className="text-sm font-medium text-neutral-500 4k:text-2xl"
													>
														Outros Descontos
													</label>
													<Button
														variant="outline"
														size="sm"
														onClick={() => {
															addExtra("deduction");
															sendGAEvent("event", "add_deduction");
														}}
														className="gap-2"
													>
														<PlusCircle className="w-4 h-4" /> Adicionar
													</Button>
												</div>
												<div id="extra-deductions-list" className="space-y-3">
													{extraDeductions.map((item) => (
														<div key={item.id} className="flex gap-3">
															<input
																type="text"
																aria-label="Descrição do desconto"
																placeholder="Nome (ex: Plano de Saúde)"
																value={item.name}
																onChange={(e) =>
																	updateExtra(
																		item.id,
																		"deduction",
																		"name",
																		e.target.value,
																	)
																}
																className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
															/>
															<input
																type="text"
																inputMode="numeric"
																aria-label="Valor do desconto"
																placeholder="Valor"
																value={formatCurrencySimple(item.value)}
																onChange={(e) =>
																	updateExtra(
																		item.id,
																		"deduction",
																		"value",
																		parseCurrency(e.target.value),
																	)
																}
																className="w-32 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
															/>
															<Button
																variant="danger"
																size="icon"
																type="button"
																onClick={() =>
																	removeExtra(item.id, "deduction")
																}
															>
																<Trash2 className="w-4 h-4" />
															</Button>
														</div>
													))}
												</div>
											</div>

											{/* Extra Gains */}
											<div>
												<div className="flex items-center justify-between mb-4">
													<label
														htmlFor="extra-gains-list"
														className="text-sm font-medium text-neutral-500 4k:text-2xl"
													>
														Ganhos Extras (Líquido)
													</label>
													<Button
														variant="outline"
														size="sm"
														onClick={() => {
															addExtra("gain");
															sendGAEvent("event", "add_gain");
														}}
														className="gap-2 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
													>
														<PlusCircle className="w-4 h-4" /> Adicionar
													</Button>
												</div>
												<div id="extra-gains-list" className="space-y-3">
													{extraGains.map((item) => (
														<div key={item.id} className="flex gap-3">
															<input
																type="text"
																aria-label="Descrição do ganho"
																placeholder="Nome (ex: Vale Alimentação)"
																value={item.name}
																onChange={(e) =>
																	updateExtra(
																		item.id,
																		"gain",
																		"name",
																		e.target.value,
																	)
																}
																className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
															/>
															<input
																type="text"
																inputMode="numeric"
																aria-label="Valor do ganho"
																placeholder="Valor"
																value={formatCurrencySimple(item.value)}
																onChange={(e) =>
																	updateExtra(
																		item.id,
																		"gain",
																		"value",
																		parseCurrency(e.target.value),
																	)
																}
																className="w-32 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
															/>
															<Button
																variant="danger"
																size="icon"
																type="button"
																onClick={() => removeExtra(item.id, "gain")}
															>
																<Trash2 className="w-4 h-4" />
															</Button>
														</div>
													))}
												</div>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Results */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 4k:gap-8">
							<StatBox
								label="Salário Líquido"
								value={formatCurrency(stats.netSalary)}
								icon={<Wallet className="w-4 h-4 4k:w-8 4k:h-8" />}
								variant="default"
							/>
							<StatBox
								label="Total Recebido"
								value={formatCurrency(stats.totalValue)}
								subValue="Líquido + Extras"
								icon={<TrendingUp className="w-4 h-4 4k:w-8 4k:h-8" />}
								variant="success"
							/>
							<StatBox
								label="Total Descontos"
								value={formatCurrency(
									stats.inss + stats.irrf + stats.totalExtraDeductions,
								)}
								subValue="INSS + IRRF + Outros"
								icon={<TrendingDown className="w-4 h-4 4k:w-8 4k:h-8" />}
								variant="danger"
							/>
						</div>
					</motion.div>

					{/* Highlight Card */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						className="lg:col-span-5 sticky top-32 4k:top-64"
					>
						<div className="rounded-3xl p-8 sm:p-12 text-white shadow-2xl bg-blue-600 shadow-blue-500/30 overflow-hidden relative 4k:p-24 4k:rounded-[4rem]">
							<div className="absolute -top-10 -right-10 w-40 h-40 4k:w-80 4k:h-80 bg-white/10 rounded-full blur-3xl" />
							<div className="relative z-10 space-y-8 4k:space-y-16">
								<div className="flex items-center gap-3 opacity-80 4k:gap-6">
									<Clock className="w-6 h-6 4k:w-12 4k:h-12" />
									<span className="text-lg font-medium tracking-wide uppercase 4k:text-4xl">
										Valor da Hora
									</span>
								</div>

								<div className="text-center">
									<p className="text-6xl xl:text-8xl font-black tracking-tighter 4k:text-[14rem] tabular-nums">
										{formatCurrency(stats.hourlyRate)}
									</p>
									<p className="mt-4 text-xl opacity-80 font-medium 4k:text-4xl">
										{formatCurrency(stats.minuteRate)} por minuto
									</p>
								</div>

								<div className="pt-8 border-t border-white/10 4k:pt-16">
									<p className="text-sm opacity-80 mb-2 4k:text-2xl 4k:mb-6">
										Resumo Financeiro
									</p>
									<div className="grid grid-cols-2 gap-4 4k:gap-8">
										<div>
											<p className="text-xs opacity-60 uppercase font-bold 4k:text-xl">
												Bruto
											</p>
											<p className="text-xl font-bold 4k:text-4xl">
												{formatCurrency(grossSalary)}
											</p>
										</div>
										<div>
											<p className="text-xs opacity-60 uppercase font-bold 4k:text-xl">
												Ganhos Extras
											</p>
											<p className="text-xl font-bold 4k:text-4xl">
												+{formatCurrency(stats.totalExtraGains)}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
