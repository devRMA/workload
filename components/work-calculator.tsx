"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { format } from "date-fns";
import {
	Check,
	Clock,
	Coffee,
	Copy,
	LogIn,
	LogOut,
	MoonStar,
	RotateCcw,
	Settings,
	TrendingDown,
	TrendingUp,
	Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useWorkCalculator } from "@/hooks/use-work-calculator";
import { DateTimeInput } from "./molecules/date-time-input";

const safeFormat = (dateStr: string, formatStr: string) => {
	try {
		const d = new Date(dateStr);
		if (Number.isNaN(d.getTime())) return "--:--";
		return format(d, formatStr);
	} catch (_e) {
		return "--:--";
	}
};

const formatBalance = (mins: number) => {
	const absMins = Math.abs(mins);
	const h = Math.floor(absMins / 60);
	const m = absMins % 60;
	return `${mins < 0 ? "-" : "+"}${h}h ${m}m`;
};

export default function WorkCalculator() {
	const [mounted, setMounted] = useState(false);
	const [copied, setCopied] = useState(false);
	const [currentTime, setCurrentTime] = useState(new Date());

	const {
		workMinutes,
		setWorkMinutes,
		entry,
		setEntry,
		lunchStart,
		setLunchStart,
		lunchEnd,
		setLunchEnd,
		exitOverride,
		setExitOverride,
		isManualExit,
		setIsManualExit,
		suggestedExit,
		displayExit,
		stats,
		resetDefaults,
	} = useWorkCalculator();

	useEffect(() => {
		setMounted(true);
		const timer = setInterval(() => setCurrentTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	const copyToClipboard = () => {
		const timeOnly = safeFormat(displayExit, "HH:mm");
		navigator.clipboard.writeText(timeOnly);
		setCopied(true);
		sendGAEvent("event", "copy_to_clipboard", { value: timeOnly });
		setTimeout(() => setCopied(false), 2000);
	};

	const handleManualToggle = (manual: boolean) => {
		if (manual && !isManualExit) {
			const timePart = suggestedExit.split("T")[1] || "00:00";
			const datePart = suggestedExit.split("T")[0];
			setExitOverride(`${datePart}T${timePart}`);
		}
		setIsManualExit(manual);
		sendGAEvent("event", "toggle_manual_mode", {
			value: manual ? "manual" : "auto",
		});
	};

	const timerData = useMemo(() => {
		try {
			const exitDate = new Date(displayExit);
			if (Number.isNaN(exitDate.getTime()))
				return {
					label: "Aguardando...",
					time: "00:00:00",
					isOvertime: false,
					progress: 0,
				};

			if (isManualExit) {
				const balanceSecs = stats.balance * 60;
				const isOvertime = balanceSecs >= 0;
				const absSecs = Math.abs(balanceSecs);
				const h = Math.floor(absSecs / 3600);
				const m = Math.floor((absSecs % 3600) / 60);
				const s = Math.floor(absSecs % 60);
				return {
					label: "BALANÇO FINAL",
					time: `${isOvertime ? "+" : "-"}${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`,
					isOvertime,
					progress: (stats.totalWorked / workMinutes) * 100,
				};
			}

			const diffInSecs = Math.floor(
				(exitDate.getTime() - currentTime.getTime()) / 1000,
			);
			const isOvertime = diffInSecs < 0;
			const absSecs = Math.abs(diffInSecs);
			const h = Math.floor(absSecs / 3600);
			const m = Math.floor((absSecs % 3600) / 60);
			const s = absSecs % 60;
			const formatted = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

			const entryDate = new Date(entry);
			if (Number.isNaN(entryDate.getTime()))
				return {
					label: isOvertime ? "HORA EXTRA" : "FALTAM",
					time: formatted,
					isOvertime,
					progress: 0,
				};

			const totalWorkSecs = workMinutes * 60;
			const elapsedSecs = Math.floor(
				(currentTime.getTime() - entryDate.getTime()) / 1000,
			);
			const progress = Math.min(
				100,
				Math.max(0, (elapsedSecs / totalWorkSecs) * 100),
			);

			return {
				label: isOvertime ? "HORA EXTRA" : "FALTAM",
				time: formatted,
				isOvertime,
				progress,
			};
		} catch (_e) {
			return {
				label: "Erro",
				time: "00:00:00",
				isOvertime: false,
				progress: 0,
			};
		}
	}, [currentTime, displayExit, entry, workMinutes, isManualExit, stats]);

	const [localWorkDuration, setLocalWorkDuration] = useState(
		`${Math.floor(workMinutes / 60)
			.toString()
			.padStart(2, "0")}:${(workMinutes % 60).toString().padStart(2, "0")}`,
	);

	useEffect(() => {
		setLocalWorkDuration(
			`${Math.floor(workMinutes / 60)
				.toString()
				.padStart(2, "0")}:${(workMinutes % 60).toString().padStart(2, "0")}`,
		);
	}, [workMinutes]);

	const [showSettings, setShowSettings] = useState(false);

	if (!mounted) return null;

	return (
		<div className="w-full selection:bg-emerald-500/30">
			<div className="max-w-7xl 2xl:max-w-[1600px] 4k:max-w-[2400px] mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 4k:gap-24 items-start">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="lg:col-span-7 space-y-8 4k:space-y-20"
					>
						<div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-xl shadow-neutral-200/50 dark:shadow-none border border-neutral-200 dark:border-neutral-800 4k:p-24 4k:rounded-[4rem]">
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 4k:mb-20">
								<div className="flex items-center gap-4">
									<h2 className="text-2xl font-bold 4k:text-7xl">
										Sua Jornada
									</h2>
									<button
										type="button"
										onClick={() => setShowSettings(!showSettings)}
										className={`p-2 rounded-xl transition-colors ${showSettings ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400"}`}
										aria-label="Configurações da Jornada"
									>
										<Settings
											className={`w-5 h-5 4k:w-10 4k:h-10 transition-transform duration-500 ${showSettings ? "rotate-90" : ""}`}
										/>
									</button>
								</div>
								<div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-2xl 4k:p-3 4k:rounded-[2rem]">
									<button
										type="button"
										aria-pressed={!isManualExit}
										onClick={() => handleManualToggle(false)}
										className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all 4k:px-12 4k:py-6 4k:text-3xl 4k:rounded-3xl ${!isManualExit ? "bg-white dark:bg-neutral-700 shadow-md text-emerald-500" : "text-neutral-400 hover:text-neutral-600"}`}
									>
										AUTO
									</button>
									<button
										type="button"
										aria-pressed={isManualExit}
										onClick={() => handleManualToggle(true)}
										className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all 4k:px-12 4k:py-6 4k:text-3xl 4k:rounded-3xl ${isManualExit ? "bg-white dark:bg-neutral-700 shadow-md text-emerald-500" : "text-neutral-400 hover:text-neutral-600"}`}
									>
										MANUAL
									</button>
								</div>
							</div>

							<AnimatePresence>
								{showSettings && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										className="overflow-hidden mb-8"
									>
										<div className="bg-neutral-50 dark:bg-neutral-800/30 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800/50 4k:p-12 4k:rounded-[2rem]">
											<div className="flex items-center justify-between gap-6">
												<div className="flex-1">
													<label
														htmlFor="daily-journey"
														className="flex items-center gap-2 text-sm font-bold text-neutral-500 mb-2 4k:text-2xl 4k:mb-4"
													>
														<Zap className="w-4 h-4 text-emerald-500 4k:w-8 4k:h-8" />
														Tempo de Trabalho Diário
													</label>
													<p className="text-xs text-neutral-400 mb-4 4k:text-xl">
														Define o tempo total de trabalho esperado por dia
														para o cálculo de banco de horas.
													</p>
												</div>
												<div className="w-32 4k:w-64">
													<input
														id="daily-journey"
														type="text"
														inputMode="numeric"
														placeholder="08:48"
														value={localWorkDuration}
														onChange={(e) => {
															let val = e.target.value.replace(/\D/g, "");
															if (val.length > 4) val = val.slice(0, 4);
															if (val.length >= 3) {
																val = `${val.slice(0, 2)}:${val.slice(2)}`;
															}
															setLocalWorkDuration(val);
															if (val.length === 5) {
																const [h, m] = val.split(":").map(Number);
																if (h >= 0 && h < 24 && m >= 0 && m < 60) {
																	setWorkMinutes(h * 60 + m);
																}
															}
														}}
														onBlur={() => {
															if (localWorkDuration.length !== 5) {
																setLocalWorkDuration(
																	`${Math.floor(workMinutes / 60)
																		.toString()
																		.padStart(2, "0")}:${(workMinutes % 60)
																		.toString()
																		.padStart(2, "0")}`,
																);
															}
														}}
														className="flex h-12 4k:h-24 w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2 text-center text-lg font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono"
													/>
												</div>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 4k:gap-12 mb-8 4k:mb-16">
								<DateTimeInput
									label="Entrada"
									icon={LogIn}
									value={entry}
									onChange={setEntry}
								/>
								<DateTimeInput
									label="Saída Almoço"
									icon={Coffee}
									value={lunchStart}
									onChange={setLunchStart}
								/>
								<DateTimeInput
									label="Volta Almoço"
									icon={RotateCcw}
									className="[&_svg]:rotate-180"
									value={lunchEnd}
									onChange={setLunchEnd}
								/>
								<DateTimeInput
									label="Saída Real"
									icon={LogOut}
									id="saida-real"
									value={isManualExit ? exitOverride : suggestedExit}
									onChange={(v) => {
										setExitOverride(v);
										setIsManualExit(true);
									}}
									className={isManualExit ? "text-emerald-500" : ""}
								/>
							</div>

							<div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
								<button
									type="button"
									aria-label="Resetar Horários"
									onClick={() => {
										resetDefaults();
										sendGAEvent("event", "reset_defaults");
									}}
									className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-emerald-500 transition-colors 4k:text-2xl 4k:gap-4"
								>
									<RotateCcw
										className="w-4 h-4 4k:w-8 4k:h-8"
										aria-hidden="true"
									/>
									Resetar Horários
								</button>
								<div className="text-[10px] text-neutral-300 uppercase tracking-widest font-bold 4k:text-xl">
									WorkLoad
								</div>
							</div>
						</div>

						{/* Mobile Result Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="lg:hidden"
						>
							<div
								className={`rounded-3xl p-8 text-white shadow-xl overflow-hidden relative transition-colors duration-700 ${timerData.isOvertime ? "bg-rose-500 shadow-rose-500/20" : "bg-emerald-500 shadow-emerald-500/20"}`}
							>
								<div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
								<div className="relative z-10 space-y-6">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2 opacity-80">
											<Clock className="w-5 h-5" />
											<span className="text-sm font-bold tracking-wider uppercase">
												{timerData.label}
											</span>
										</div>
										<div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
											{format(currentTime, "HH:mm:ss")}
										</div>
									</div>
									<div className="space-y-4">
										<p className="text-4xl sm:text-6xl font-black tracking-tighter tabular-nums text-center break-words">
											{timerData.time}
										</p>
										<div className="space-y-1.5">
											<div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
												<motion.div
													initial={{ width: 0 }}
													animate={{ width: `${timerData.progress}%` }}
													className="h-full bg-white"
												/>
											</div>
											<div className="flex justify-between text-[10px] font-bold opacity-60">
												<span>ENTRADA {safeFormat(entry, "HH:mm")}</span>
												<span>SAÍDA {safeFormat(displayExit, "HH:mm")}</span>
											</div>
										</div>
									</div>
									<div className="pt-6 border-t border-white/10 flex items-center justify-between">
										<div>
											<p className="text-xs opacity-70 uppercase font-bold mb-1">
												Saída {isManualExit ? "Real" : "Sugerida"}
											</p>
											<p className="text-3xl font-black">
												{safeFormat(displayExit, "HH:mm")}
											</p>
										</div>
										<button
											type="button"
											aria-label="Copiar horário"
											onClick={copyToClipboard}
											className="p-4 bg-white/10 rounded-2xl active:scale-95 transition-transform"
										>
											{copied ? (
												<Check className="w-6 h-6" aria-hidden="true" />
											) : (
												<Copy className="w-6 h-6" aria-hidden="true" />
											)}
										</button>
									</div>
								</div>
							</div>
						</motion.div>

						<div className="flex justify-center">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
								<div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm 4k:p-16 text-center flex flex-col items-center justify-center">
									<div className="flex items-center justify-center gap-3 mb-6">
										<h3 className="text-lg font-bold 4k:text-4xl">
											Balanço do Dia
										</h3>
										<div
											className={`p-2 rounded-xl 4k:p-4 ${stats.balance >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}
										>
											{stats.balance >= 0 ? (
												<TrendingUp
													className="w-5 h-5 4k:w-10 4k:h-10"
													aria-hidden="true"
												/>
											) : (
												<TrendingDown
													className="w-5 h-5 4k:w-10 4k:h-10"
													aria-hidden="true"
												/>
											)}
										</div>
									</div>
									<div className="space-y-1">
										<p
											className={`text-4xl font-black tracking-tight 4k:text-7xl ${stats.balance >= 0 ? "text-emerald-500" : "text-rose-500"}`}
										>
											{formatBalance(stats.balance)}
										</p>
										<p className="text-sm text-neutral-500 4k:text-2xl">
											{stats.balance >= 0
												? "Horas extras acumuladas"
												: "Horas em débito hoje"}
										</p>
									</div>
								</div>

								<div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm 4k:p-16 text-center flex flex-col items-center justify-center">
									<h3 className="text-lg font-bold mb-6 4k:text-4xl">
										Extras (CLT)
									</h3>
									<div className="w-full max-w-[240px] mx-auto space-y-4 4k:space-y-8 4k:max-w-none">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2 text-sm text-neutral-500 4k:text-2xl">
												<Zap className="w-4 h-4 text-amber-500 4k:w-8 4k:h-8" />
												Extra 75%
											</div>
											<span className="font-bold 4k:text-3xl">
												{Math.floor(stats.overtime75 / 60)}h{" "}
												{Math.round(stats.overtime75 % 60)}m
											</span>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2 text-sm text-neutral-500 4k:text-2xl">
												<Zap className="w-4 h-4 text-rose-500 4k:w-8 4k:h-8" />
												Extra 100%
											</div>
											<span className="font-bold 4k:text-3xl">
												{Math.floor(stats.overtime100 / 60)}h{" "}
												{Math.round(stats.overtime100 % 60)}m
											</span>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2 text-sm text-neutral-500 4k:text-2xl">
												<MoonStar className="w-4 h-4 text-indigo-500 4k:w-8 4k:h-8" />
												Adic. Noturno
											</div>
											<span className="font-bold 4k:text-3xl">
												{Math.floor(stats.nightMinutes / 60)}h{" "}
												{stats.nightMinutes % 60}m
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Desktop Result Card */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						className="hidden lg:block lg:col-span-5 sticky top-32 4k:top-64"
					>
						<div
							className={`rounded-3xl p-12 text-white shadow-2xl overflow-hidden relative 4k:p-24 4k:rounded-[4rem] transition-colors duration-700 ${timerData.isOvertime ? "bg-rose-500 shadow-rose-500/30" : "bg-emerald-500 shadow-emerald-500/30"}`}
						>
							<div className="absolute -top-10 -right-10 w-40 h-40 4k:w-80 4k:h-80 bg-white/10 rounded-full blur-3xl" />
							<div className="absolute -bottom-10 -left-10 w-40 h-40 4k:w-80 4k:h-80 bg-black/10 rounded-full blur-3xl" />
							<div className="relative z-10 space-y-8 4k:space-y-16">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3 opacity-80 4k:gap-6">
										<Clock className="w-6 h-6 4k:w-12 4k:h-12" />
										<span className="text-lg font-medium tracking-wide uppercase 4k:text-4xl">
											{timerData.label}
										</span>
									</div>
									<div className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold 4k:text-2xl 4k:px-8 4k:py-3">
										{format(currentTime, "HH:mm:ss")}
									</div>
								</div>
								<div className="space-y-4 4k:space-y-8 text-center">
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="text-6xl xl:text-8xl font-black tracking-tighter 4k:text-[14rem] tabular-nums"
									>
										{timerData.time}
									</motion.p>
									<div className="space-y-2">
										<div className="h-2 w-full bg-white/20 rounded-full overflow-hidden 4k:h-4">
											<motion.div
												initial={{ width: 0 }}
												animate={{ width: `${timerData.progress}%` }}
												className="h-full bg-white"
											/>
										</div>
										<div className="flex justify-between text-xs font-bold opacity-60 4k:text-xl">
											<span>{safeFormat(entry, "HH:mm")}</span>
											<span>{safeFormat(displayExit, "HH:mm")}</span>
										</div>
									</div>
								</div>
								<div className="pt-8 border-t border-white/10 4k:pt-16">
									<div className="flex items-center justify-between mb-4 4k:mb-8">
										<div className="flex items-center gap-2 opacity-80 4k:gap-4">
											<LogOut
												className="w-5 h-5 4k:w-10 4k:h-10"
												aria-hidden="true"
											/>
											<span className="text-sm font-medium uppercase 4k:text-2xl">
												{isManualExit ? "Saída Informada" : "Saída Sugerida"}
											</span>
										</div>
										<button
											type="button"
											onClick={copyToClipboard}
											aria-label="Copiar horário"
											className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors 4k:p-4 4k:rounded-xl"
											title="Copiar horário"
										>
											{copied ? (
												<Check
													className="w-5 h-5 4k:w-10 4k:h-10"
													aria-hidden="true"
												/>
											) : (
												<Copy
													className="w-5 h-5 4k:w-10 4k:h-10"
													aria-hidden="true"
												/>
											)}
										</button>
									</div>
									<p className="text-5xl font-black 4k:text-8xl">
										{safeFormat(displayExit, "HH:mm")}
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
