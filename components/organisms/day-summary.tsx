import { AlertTriangle, Coffee, MoonStar, Sunrise, Sunset, Zap } from "lucide-react";
import Link from "next/link";
import { VIEW_PATHS } from "@/lib/calculator-view";
import type { ComplianceWarning } from "@/lib/compliance";
import type { DayBreakdown, DaySegmentKind } from "@/lib/day-breakdown";
import { formatHoursAndMinutes, formatSignedHoursAndMinutes } from "@/lib/duration";
import { overtimePay } from "@/lib/payroll";
import { cn, formatCurrency, formatTimeLabel } from "@/lib/utils";
import { AlertBanner } from "../molecules/alert-banner";

const SEGMENT_BAR_CLASSES: Record<DaySegmentKind, string> = {
  morning: "bg-emerald-400",
  lunch: "bg-neutral-300 dark:bg-neutral-600",
  afternoon: "bg-emerald-600",
  overtime: "bg-amber-500",
};

interface JourneyTimes {
  entry: string;
  lunchStart: string;
  lunchEnd: string;
  exit: string;
}

interface DaySummaryProps {
  breakdown: DayBreakdown;
  times: JourneyTimes;
  balanceMinutes: number;
  firstTierMinutes: number;
  extraTierMinutes: number;
  nightMinutes: number;
  firstTierRate: number;
  extraTierRate: number;
  hourlyRate: number | null;
  warnings: readonly ComplianceWarning[];
}

function DayTimeline({ breakdown, times }: Pick<DaySummaryProps, "breakdown" | "times">) {
  const total = breakdown.segments.reduce((sum, segment) => sum + segment.minutes, 0);
  if (total === 0) return null;

  return (
    <div className="space-y-2">
      <div
        className="flex h-3 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800"
        aria-hidden="true"
      >
        {breakdown.segments.map(({ kind, minutes }) => (
          <div key={kind} className={SEGMENT_BAR_CLASSES[kind]} style={{ width: `${(minutes / total) * 100}%` }} />
        ))}
      </div>
      <div className="flex justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400 tabular-nums">
        <span>{formatTimeLabel(times.entry)}</span>
        <span>{breakdown.isInProgress ? "agora" : formatTimeLabel(times.exit)}</span>
      </div>
    </div>
  );
}

function TotalRow({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className={cn("text-sm", emphasis ? "font-bold" : "text-neutral-600 dark:text-neutral-400")}>{label}</span>
      <span className={cn("tabular-nums", emphasis ? "text-lg font-black" : "font-bold")}>{value}</span>
    </div>
  );
}

export function DaySummary({
  breakdown,
  times,
  balanceMinutes,
  firstTierMinutes,
  extraTierMinutes,
  nightMinutes,
  firstTierRate,
  extraTierRate,
  hourlyRate,
  warnings,
}: DaySummaryProps) {
  const stretches = [
    {
      kind: "morning" as const,
      icon: Sunrise,
      label: "Manhã",
      endsAt: times.lunchStart,
      minutes: breakdown.morningMinutes,
    },
    { kind: "lunch" as const, icon: Coffee, label: "Almoço", endsAt: times.lunchEnd, minutes: breakdown.lunchMinutes },
    {
      kind: "afternoon" as const,
      icon: Sunset,
      label: "Tarde",
      endsAt: times.exit,
      minutes: breakdown.afternoonMinutes,
    },
  ].filter(({ minutes }) => minutes > 0);

  const startsAt = [times.entry, times.lunchStart, times.lunchEnd];
  const isPositiveBalance = balanceMinutes >= 0;
  const firstTierPay = hourlyRate === null ? null : overtimePay(firstTierMinutes, hourlyRate, firstTierRate);
  const extraTierPay = hourlyRate === null ? null : overtimePay(extraTierMinutes, hourlyRate, extraTierRate);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 space-y-6">
      <h3 className="text-lg font-bold">Seu Dia</h3>

      <DayTimeline breakdown={breakdown} times={times} />

      <div className="space-y-3">
        {stretches.map(({ kind, icon: Icon, label, endsAt, minutes }, index) => (
          <div key={kind} className="flex items-center gap-3 text-sm">
            <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", SEGMENT_BAR_CLASSES[kind])} aria-hidden="true" />
            <Icon className="w-4 h-4 shrink-0 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
            <span className="font-medium">{label}</span>
            <span className="text-neutral-500 dark:text-neutral-400 tabular-nums">
              {formatTimeLabel(startsAt[index])} →{" "}
              {index === stretches.length - 1 && breakdown.isInProgress ? "agora" : formatTimeLabel(endsAt)}
            </span>
            <span className="ml-auto font-bold tabular-nums">{formatHoursAndMinutes(minutes)}</span>
          </div>
        ))}

        {breakdown.nightBonusMinutes > 0 ? (
          <div className="flex items-center gap-3 text-sm">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
            <MoonStar className="w-4 h-4 shrink-0 text-indigo-500" aria-hidden="true" />
            <span className="font-medium">Hora noturna reduzida</span>
            <span className="text-neutral-500 dark:text-neutral-400">art. 73 da CLT</span>
            <span className="ml-auto font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
              +{formatHoursAndMinutes(breakdown.nightBonusMinutes)}
            </span>
          </div>
        ) : null}
      </div>

      <div className="space-y-2 border-t border-neutral-100 dark:border-neutral-800 pt-6">
        <TotalRow
          label={breakdown.isInProgress ? "Trabalhado até agora" : "Trabalhado no dia"}
          value={formatHoursAndMinutes(breakdown.workedMinutes)}
          emphasis
        />
        <TotalRow label="Previsto no dia" value={formatHoursAndMinutes(breakdown.expectedMinutes)} />
        {breakdown.remainingMinutes > 0 ? (
          <TotalRow label="Ainda falta" value={formatHoursAndMinutes(breakdown.remainingMinutes)} />
        ) : null}
      </div>

      <div className="space-y-3 border-t border-neutral-100 dark:border-neutral-800 pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-bold">
            {breakdown.remainingMinutes > 0 ? "Saldo se você sair no horário" : "Saldo do dia"}
          </span>
          <span
            className={cn(
              "text-2xl font-black tabular-nums",
              isPositiveBalance ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
            )}
          >
            {formatSignedHoursAndMinutes(balanceMinutes)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Zap className="w-4 h-4 shrink-0 text-amber-500" aria-hidden="true" />
            <span>Extra {firstTierRate}%</span>
            <span className="ml-auto font-bold tabular-nums">{formatHoursAndMinutes(firstTierMinutes)}</span>
            {firstTierPay === null ? null : (
              <span className="w-24 text-right font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                {formatCurrency(firstTierPay)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Zap className="w-4 h-4 shrink-0 text-orange-600" aria-hidden="true" />
            <span>Extra {extraTierRate}%</span>
            <span className="ml-auto font-bold tabular-nums">{formatHoursAndMinutes(extraTierMinutes)}</span>
            {extraTierPay === null ? null : (
              <span className="w-24 text-right font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                {formatCurrency(extraTierPay)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MoonStar className="w-4 h-4 shrink-0 text-indigo-500" aria-hidden="true" />
            <span>Adicional noturno</span>
            <span className="ml-auto font-bold tabular-nums">{formatHoursAndMinutes(nightMinutes)}</span>
            {hourlyRate === null ? null : <span className="w-24" />}
          </div>
        </div>

        {hourlyRate === null ? (
          <Link
            href={VIEW_PATHS.salary}
            scroll={false}
            className="block w-full rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-3 text-center text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
          >
            Quer ver quanto isso vale em reais? Calcule o valor da sua hora →
          </Link>
        ) : null}
      </div>

      {warnings.map(({ id, title, detail }) => (
        <AlertBanner key={id} icon={AlertTriangle} tone="warning" title={title}>
          <p>{detail}</p>
        </AlertBanner>
      ))}
    </div>
  );
}
