"use client";

import { format } from "date-fns";
import { Clock, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { useCurrentTime } from "@/hooks/use-current-time";
import { useWorkCalculator } from "@/hooks/use-work-calculator";
import { safeGAEvent } from "@/lib/analytics";
import { CopyButton } from "../molecules/copy-button";
import { HeroPanel } from "../molecules/hero-panel";
import { CalculatorLayout } from "../templates/calculator-layout";
import { JourneyForm } from "./journey-form";
import { WorkSummary } from "./work-summary";

const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;
const PLACEHOLDER_CLOCK = "--:--:--";
const PLACEHOLDER_TIME = "--:--";

interface TimerData {
	label: string;
	time: string;
	isOvertime: boolean;
	progress: number;
	entryLabel: string;
	exitLabel: string;
}

function safeFormat(dateString: string, formatString: string): string {
	const parsed = new Date(dateString);
	if (Number.isNaN(parsed.getTime())) return PLACEHOLDER_TIME;
	return format(parsed, formatString);
}

function toProgress(elapsed: number, total: number): number {
	if (total <= 0) return 0;
	return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

function formatClock(totalSeconds: number): string {
	const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
	const minutes = Math.floor(
		(totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
	);
	const seconds = Math.floor(totalSeconds % SECONDS_PER_MINUTE);
	return [hours, minutes, seconds]
		.map((part) => part.toString().padStart(2, "0"))
		.join(":");
}

interface TimerInput {
	currentTime: Date | null;
	displayExit: string;
	entry: string;
	workMinutes: number;
	isManualExit: boolean;
	balanceMinutes: number;
	balanceSign: number;
	totalWorkedMinutes: number;
}

export function calculateTimerData({
	currentTime,
	displayExit,
	entry,
	workMinutes,
	isManualExit,
	balanceMinutes,
	balanceSign,
	totalWorkedMinutes,
}: TimerInput): TimerData {
	const labels = {
		entryLabel: safeFormat(entry, "HH:mm"),
		exitLabel: safeFormat(displayExit, "HH:mm"),
	};

	const exitDate = new Date(displayExit);
	if (Number.isNaN(exitDate.getTime()))
		return {
			...labels,
			label: "Aguardando...",
			time: "00:00:00",
			isOvertime: false,
			progress: 0,
		};

	if (isManualExit)
		return {
			...labels,
			label: "BALANÇO FINAL",
			time: `${balanceSign < 0 ? "-" : "+"}${formatClock(Math.abs(balanceMinutes) * SECONDS_PER_MINUTE)}`,
			isOvertime: balanceSign > 0,
			progress: toProgress(totalWorkedMinutes, workMinutes),
		};

	if (currentTime === null)
		return {
			...labels,
			label: "FALTAM",
			time: PLACEHOLDER_CLOCK,
			isOvertime: false,
			progress: 0,
		};

	const remainingSeconds = Math.floor(
		(exitDate.getTime() - currentTime.getTime()) / 1000,
	);
	const isOvertime = remainingSeconds < 0;
	const time = formatClock(Math.abs(remainingSeconds));
	const label = isOvertime ? "HORA EXTRA" : "FALTAM";

	const entryDate = new Date(entry);
	if (Number.isNaN(entryDate.getTime()))
		return { ...labels, label, time, isOvertime, progress: 0 };

	const elapsedSeconds = Math.floor(
		(currentTime.getTime() - entryDate.getTime()) / 1000,
	);

	return {
		...labels,
		label,
		time,
		isOvertime,
		progress: toProgress(elapsedSeconds, workMinutes * SECONDS_PER_MINUTE),
	};
}

export function WorkCalculator() {
	const currentTime = useCurrentTime();
	const {
		workMinutes,
		setWorkMinutes,
		firstTierRate,
		setFirstTierRate,
		extraTierRate,
		setExtraTierRate,
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

	const balanceSign = Math.sign(stats.balance);

	const timerData = useMemo(
		() =>
			calculateTimerData({
				currentTime,
				displayExit,
				entry,
				workMinutes,
				isManualExit,
				balanceMinutes: stats.balance,
				balanceSign,
				totalWorkedMinutes: stats.totalWorked,
			}),
		[
			currentTime,
			displayExit,
			entry,
			workMinutes,
			isManualExit,
			stats,
			balanceSign,
		],
	);

	const handleManualToggle = (manual: boolean) => {
		if (manual && !isManualExit) setExitOverride(suggestedExit);
		setIsManualExit(manual);
		safeGAEvent("toggle_manual_mode", {
			value: manual ? "manual" : "auto",
		});
	};

	const handleExitChange = (value: string) => {
		setExitOverride(value);
		setIsManualExit(true);
	};

	const handleReset = () => {
		resetDefaults();
		safeGAEvent("reset_defaults");
	};

	return (
		<CalculatorLayout
			className="selection:bg-emerald-500/30"
			main={
				<>
					<JourneyForm
						workMinutes={workMinutes}
						onWorkMinutesChange={setWorkMinutes}
						firstTierRate={firstTierRate}
						onFirstTierRateChange={setFirstTierRate}
						extraTierRate={extraTierRate}
						onExtraTierRateChange={setExtraTierRate}
						entry={entry}
						onEntryChange={setEntry}
						lunchStart={lunchStart}
						onLunchStartChange={setLunchStart}
						lunchEnd={lunchEnd}
						onLunchEndChange={setLunchEnd}
						exitValue={isManualExit ? exitOverride : suggestedExit}
						onExitChange={handleExitChange}
						isManualExit={isManualExit}
						onManualExitChange={handleManualToggle}
						onReset={handleReset}
					/>
					<WorkSummary
						balanceMinutes={stats.balance}
						balanceSign={balanceSign}
						firstTierMinutes={stats.firstTierMinutes}
						extraTierMinutes={stats.extraTierMinutes}
						nightMinutes={stats.nightMinutes}
						firstTierRate={firstTierRate}
						extraTierRate={extraTierRate}
					/>
				</>
			}
			aside={
				<HeroPanel
					icon={Clock}
					label={timerData.label}
					value={timerData.time}
					tone={timerData.isOvertime ? "rose" : "emerald"}
					badge={
						<span className="bg-white/20 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-bold tabular-nums">
							{currentTime === null
								? PLACEHOLDER_CLOCK
								: format(currentTime, "HH:mm:ss")}
						</span>
					}
					footer={
						<div className="flex items-center justify-between gap-4">
							<div>
								<div className="flex items-center gap-2 opacity-80 mb-1">
									<LogOut
										className="w-4 h-4 lg:w-5 lg:h-5"
										aria-hidden="true"
									/>
									<span className="text-xs lg:text-sm uppercase font-bold lg:font-medium">
										Saída {isManualExit ? "Real" : "Sugerida"}
									</span>
								</div>
								<p className="text-3xl lg:text-5xl font-black">
									{timerData.exitLabel}
								</p>
							</div>
							<CopyButton
								value={timerData.exitLabel}
								label="Copiar horário"
								onCopied={() =>
									safeGAEvent("copy_to_clipboard", {
										value: timerData.exitLabel,
									})
								}
							/>
						</div>
					}
				>
					<div className="space-y-1.5 lg:space-y-2">
						<div className="h-1.5 lg:h-2 w-full bg-white/20 rounded-full overflow-hidden">
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: `${timerData.progress}%` }}
								className="h-full bg-white"
							/>
						</div>
						<div className="flex justify-between text-[10px] lg:text-xs font-bold opacity-60">
							<span>ENTRADA {timerData.entryLabel}</span>
							<span>SAÍDA {timerData.exitLabel}</span>
						</div>
					</div>
				</HeroPanel>
			}
		/>
	);
}
