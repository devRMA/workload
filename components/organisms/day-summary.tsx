import { AlertTriangle, CalendarDays, Coffee, MoonStar, Sunrise, Sunset, Zap } from "lucide-react";
import Link from "next/link";
import { VIEW_PATHS } from "@/lib/calculator-view";
import type { ComplianceWarning } from "@/lib/compliance";
import type { DayBreakdown, DaySegmentKind } from "@/lib/day-breakdown";
import { formatHoursAndMinutes, formatSignedHoursAndMinutes } from "@/lib/duration";
import { nightPremiumPay } from "@/lib/night-shift";
import { overtimePay } from "@/lib/payroll";
import { cn, formatCurrency, formatTimeLabel } from "@/lib/utils";
import { restDayPayOnOvertime, splitMonthDays } from "@/lib/weekly-rest";
import { AlertBanner } from "../atoms/alert-banner";

const SEGMENT_BAR_CLASSES: Record<DaySegmentKind, string> = {
  morning: "bg-positive/70",
  lunch: "bg-line-strong",
  afternoon: "bg-positive",
  overtime: "bg-overtime",
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
  grossHourlyRate: number | null;
  warnings: readonly ComplianceWarning[];
}

function DayTimeline({ breakdown, times }: Pick<DaySummaryProps, "breakdown" | "times">) {
  const total = breakdown.segments.reduce((sum, segment) => sum + segment.minutes, 0);
  if (total === 0) return null;

  return (
    <div className="space-y-xs">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-sunken" aria-hidden="true">
        {breakdown.segments.map(({ kind, minutes }) => (
          <div key={kind} className={SEGMENT_BAR_CLASSES[kind]} style={{ width: `${(minutes / total) * 100}%` }} />
        ))}
      </div>
      <div className="flex justify-between text-caption numeric text-ink-subtle">
        <span>{formatTimeLabel(times.entry)}</span>
        <span>{breakdown.isInProgress ? "agora" : formatTimeLabel(times.exit)}</span>
      </div>
    </div>
  );
}

function TotalRow({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-md">
      <span className={cn("text-body-sm", emphasis ? "font-semibold text-ink" : "text-ink-muted")}>{label}</span>
      <span className={cn("numeric font-semibold", emphasis ? "text-heading" : "")}>{value}</span>
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
  grossHourlyRate,
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
  const firstTierPay = grossHourlyRate === null ? null : overtimePay(firstTierMinutes, grossHourlyRate, firstTierRate);
  const extraTierPay = grossHourlyRate === null ? null : overtimePay(extraTierMinutes, grossHourlyRate, extraTierRate);
  const nightPay = grossHourlyRate === null ? null : nightPremiumPay(nightMinutes, grossHourlyRate);
  const variablePay = (firstTierPay ?? 0) + (extraTierPay ?? 0) + (nightPay ?? 0);
  const restDayPay = restDayPayOnOvertime(variablePay, splitMonthDays(new Date(times.entry)));

  return (
    <div className="bg-surface rounded-xl p-lg sm:p-xl shadow-card border border-line space-y-lg">
      <h3 className="text-heading">Seu Dia</h3>

      <DayTimeline breakdown={breakdown} times={times} />

      <div className="space-y-sm">
        {stretches.map(({ kind, icon: Icon, label, endsAt, minutes }, index) => (
          <div key={kind} className="flex items-center gap-sm text-body-sm">
            <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", SEGMENT_BAR_CLASSES[kind])} aria-hidden="true" />
            <Icon className="w-4 h-4 shrink-0 text-ink-muted" aria-hidden="true" />
            <span className="font-medium">{label}</span>
            <span className="text-ink-muted numeric">
              {formatTimeLabel(startsAt[index])} →{" "}
              {index === stretches.length - 1 && breakdown.isInProgress ? "agora" : formatTimeLabel(endsAt)}
            </span>
            <span className="ml-auto numeric font-semibold">{formatHoursAndMinutes(minutes)}</span>
          </div>
        ))}

        {breakdown.nightBonusMinutes > 0 ? (
          <div className="flex items-center gap-sm text-body-sm">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-night" aria-hidden="true" />
            <MoonStar className="w-4 h-4 shrink-0 text-night-ink" aria-hidden="true" />
            <span className="font-medium">Hora noturna reduzida</span>
            <span className="text-ink-muted">art. 73 da CLT</span>
            <span className="ml-auto numeric font-semibold text-night-ink">
              +{formatHoursAndMinutes(breakdown.nightBonusMinutes)}
            </span>
          </div>
        ) : null}
      </div>

      <div className="space-y-xs border-t border-line-faint pt-lg">
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

      <div className="space-y-sm border-t border-line-faint pt-lg">
        <div className="flex items-baseline justify-between gap-md">
          <span className="text-body-sm font-semibold text-ink">
            {breakdown.remainingMinutes > 0 ? "Saldo se você sair no horário" : "Saldo do dia"}
          </span>
          <span className={cn("text-metric numeric", isPositiveBalance ? "text-positive-ink" : "text-negative-ink")}>
            {formatSignedHoursAndMinutes(balanceMinutes)}
          </span>
        </div>

        <div className="space-y-xs">
          <div className="flex items-center gap-sm text-body-sm">
            <Zap className="w-4 h-4 shrink-0 text-overtime-ink" aria-hidden="true" />
            <span>Extra {firstTierRate}%</span>
            <span className="ml-auto numeric font-semibold">{formatHoursAndMinutes(firstTierMinutes)}</span>
            {firstTierPay === null ? null : (
              <span className="w-24 text-right numeric font-semibold text-positive-ink">
                {formatCurrency(firstTierPay)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-sm text-body-sm">
            <Zap className="w-4 h-4 shrink-0 text-overtime-ink" aria-hidden="true" />
            <span>Extra {extraTierRate}%</span>
            <span className="ml-auto numeric font-semibold">{formatHoursAndMinutes(extraTierMinutes)}</span>
            {extraTierPay === null ? null : (
              <span className="w-24 text-right numeric font-semibold text-positive-ink">
                {formatCurrency(extraTierPay)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-sm text-body-sm">
            <MoonStar className="w-4 h-4 shrink-0 text-night-ink" aria-hidden="true" />
            <span>Adicional noturno 20%</span>
            <span className="ml-auto numeric font-semibold">{formatHoursAndMinutes(nightMinutes)}</span>
            {nightPay === null ? null : (
              <span className="w-24 text-right numeric font-semibold text-positive-ink">
                {formatCurrency(nightPay)}
              </span>
            )}
          </div>
          {restDayPay > 0 ? (
            <div className="flex items-center gap-sm text-body-sm">
              <CalendarDays className="w-4 h-4 shrink-0 text-positive-ink" aria-hidden="true" />
              <span>DSR sobre os extras</span>
              <span className="ml-auto w-24 text-right numeric font-semibold text-positive-ink">
                {formatCurrency(restDayPay)}
              </span>
            </div>
          ) : null}
        </div>

        {restDayPay > 0 ? (
          <p className="text-caption text-ink-subtle text-pretty">
            O DSR (Súmula 172 do TST) supõe que estes extras se repitam em todos os dias úteis do mês e conta só os
            domingos — feriados não entram.
          </p>
        ) : null}

        {grossHourlyRate === null ? (
          <Link
            href={VIEW_PATHS.salary}
            scroll={false}
            className="flex min-h-11 w-full items-center justify-center rounded-md border border-dashed border-line-strong p-sm text-center text-body-sm text-ink-muted transition-colors duration-(--duration-fast) ease-standard hover:border-accent hover:text-accent-ink ring-focus"
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
