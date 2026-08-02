"use client";

import { Clock, LogIn } from "lucide-react";
import { useMemo } from "react";
import { useSalaryCalculator } from "@/hooks/use-salary-calculator";
import { useWorkCalculator } from "@/hooks/use-work-calculator";
import { safeGAEvent } from "@/lib/analytics";
import { findComplianceWarnings } from "@/lib/compliance";
import { buildDayBreakdown } from "@/lib/day-breakdown";
import { formatClock, formatSignedHoursAndMinutes } from "@/lib/duration";
import { formatClockTime, formatTimeLabel } from "@/lib/utils";
import { ProgressRing } from "../atoms/progress-ring";
import { CopyButton } from "../molecules/copy-button";
import { HeroPanel } from "../molecules/hero-panel";
import { CalculatorLayout } from "../templates/calculator-layout";
import { DaySummary } from "./day-summary";
import { JourneyForm } from "./journey-form";

const PLACEHOLDER_CLOCK = "--:--:--";

interface TimerData {
  statusLabel: string;
  statusTime: string;
  isOvertime: boolean;
}

interface TimerInput {
  currentTime: Date | null;
  displayExit: string;
  isManualExit: boolean;
  balanceMinutes: number;
}

export function calculateTimerData({ currentTime, displayExit, isManualExit, balanceMinutes }: TimerInput): TimerData {
  const exitDate = new Date(displayExit);
  if (Number.isNaN(exitDate.getTime()))
    return { statusLabel: "aguardando horários", statusTime: PLACEHOLDER_CLOCK, isOvertime: false };

  if (isManualExit)
    return {
      statusLabel: "balanço do dia",
      statusTime: formatSignedHoursAndMinutes(balanceMinutes),
      isOvertime: balanceMinutes > 0,
    };

  if (currentTime === null) return { statusLabel: "faltam", statusTime: PLACEHOLDER_CLOCK, isOvertime: false };

  const remainingSeconds = Math.floor((exitDate.getTime() - currentTime.getTime()) / 1000);
  if (remainingSeconds < 0)
    return {
      statusLabel: "hora extra",
      statusTime: `+${formatClock(Math.abs(remainingSeconds))}`,
      isOvertime: true,
    };

  return { statusLabel: "faltam", statusTime: formatClock(remainingSeconds), isOvertime: false };
}

export function WorkCalculator() {
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
    currentTime,
    stats,
    issue,
    resetDefaults,
  } = useWorkCalculator();
  const { stats: salaryStats } = useSalaryCalculator();

  const breakdown = useMemo(
    () =>
      buildDayBreakdown({
        entry,
        lunchStart,
        lunchEnd,
        exit: displayExit,
        expectedMinutes: workMinutes,
        isManualExit,
        now: currentTime,
      }),
    [entry, lunchStart, lunchEnd, displayExit, workMinutes, isManualExit, currentTime],
  );

  const timerData = useMemo(
    () => calculateTimerData({ currentTime, displayExit, isManualExit, balanceMinutes: stats.balance }),
    [currentTime, displayExit, isManualExit, stats.balance],
  );

  const warnings = useMemo(
    () =>
      findComplianceWarnings({
        overtimeMinutes: stats.firstTierMinutes + stats.extraTierMinutes,
        workedMinutes: breakdown.workedMinutes,
        lunchMinutes: breakdown.lunchMinutes,
      }),
    [stats.firstTierMinutes, stats.extraTierMinutes, breakdown.workedMinutes, breakdown.lunchMinutes],
  );

  const exitLabel = formatTimeLabel(displayExit);
  const isInDebt = isManualExit && stats.balance < 0;
  const exitDescription = isManualExit
    ? "foi o horário que você registrou"
    : breakdown.overtimeMinutes > 0
      ? "sua jornada já fechou"
      : "é quando sua jornada fecha";

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
            issue={issue}
          />
          {issue ? null : (
            <DaySummary
              breakdown={breakdown}
              times={{ entry, lunchStart, lunchEnd, exit: displayExit }}
              balanceMinutes={stats.balance}
              firstTierMinutes={stats.firstTierMinutes}
              extraTierMinutes={stats.extraTierMinutes}
              nightMinutes={stats.nightMinutes}
              firstTierRate={firstTierRate}
              extraTierRate={extraTierRate}
              hourlyRate={salaryStats.hourlyRate > 0 ? salaryStats.hourlyRate : null}
              warnings={warnings}
            />
          )}
        </>
      }
      aside={
        <HeroPanel
          icon={Clock}
          label={isManualExit ? "Saída Real" : "Saída Prevista"}
          value={exitLabel}
          tone={isInDebt ? "rose" : "emerald"}
          badge={
            <span className="bg-white/20 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-bold tabular-nums">
              {currentTime === null ? PLACEHOLDER_CLOCK : formatClockTime(currentTime)}
            </span>
          }
          media={
            <ProgressRing progressPercent={breakdown.progressPercent} overtimePercent={breakdown.overtimePercent}>
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">{timerData.statusLabel}</span>
              <span className="text-2xl font-black tabular-nums">{timerData.statusTime}</span>
            </ProgressRing>
          }
          footer={
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <LogIn className="w-4 h-4 lg:w-5 lg:h-5" aria-hidden="true" />
                <span className="text-xs lg:text-sm font-bold tabular-nums">Entrada às {formatTimeLabel(entry)}</span>
              </div>
              <CopyButton
                value={exitLabel}
                label="Copiar horário de saída"
                onCopied={() =>
                  safeGAEvent("copy_to_clipboard", {
                    value: exitLabel,
                  })
                }
              />
            </div>
          }
        >
          <p className="text-sm font-medium text-white/80">{exitDescription}</p>
        </HeroPanel>
      }
    />
  );
}
