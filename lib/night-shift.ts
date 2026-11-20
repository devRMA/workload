import { differenceInMinutes, isValid } from "date-fns";

// CLT art. 73: caput (20% premium), §1 (52m30s night hour), §2 (22:00–05:00).
// TST IRR Tema 288 / OJ 97: fonte oficial em NIGHT_OVERTIME_SOURCE.
const NIGHT_SHIFT_START_HOUR = 22;
const NIGHT_SHIFT_END_HOUR = 5;
const NIGHT_HOUR_MINUTES = 52.5;
const MINUTES_PER_HOUR = 60;
const NIGHT_PREMIUM_RATE = 0.2;

function workedStretches(entry: Date, lunchStart: Date, lunchEnd: Date, exit: Date) {
  return [
    [entry, lunchStart < exit ? lunchStart : exit],
    [lunchEnd, exit],
  ].filter(([start, end]) => end > start);
}

function* nightStretches(start: Date, end: Date) {
  const window = new Date(start);
  window.setHours(0, 0, 0, 0);
  window.setDate(window.getDate() - 1);

  while (window < end) {
    const nightStart = new Date(window);
    nightStart.setHours(NIGHT_SHIFT_START_HOUR, 0, 0, 0);
    const nightEnd = new Date(window);
    nightEnd.setDate(nightEnd.getDate() + 1);
    nightEnd.setHours(NIGHT_SHIFT_END_HOUR, 0, 0, 0);

    const from = nightStart > start ? nightStart : start;
    const to = nightEnd < end ? nightEnd : end;
    if (from < to) yield [from, to] as const;

    window.setDate(window.getDate() + 1);
  }
}

export function countNightMinutes(entryDate: Date, exitDate: Date, lunchStartDate: Date, lunchEndDate: Date): number {
  let nightMinutes = 0;
  for (const [start, end] of workedStretches(entryDate, lunchStartDate, lunchEndDate, exitDate)) {
    for (const [from, to] of nightStretches(start, end)) nightMinutes += differenceInMinutes(to, from);
  }
  return nightMinutes;
}

export function nightEquivalentMinutes(nightMinutesWorked: number): number {
  return Math.round(nightMinutesWorked * (MINUTES_PER_HOUR / NIGHT_HOUR_MINUTES));
}

export function nightBonusMinutes(nightMinutesWorked: number): number {
  return nightEquivalentMinutes(nightMinutesWorked) - nightMinutesWorked;
}

export interface NightOvertimeTiers {
  firstTierNightMinutes: number;
  extraTierNightMinutes: number;
}

export function splitNightOvertimeByTier({
  entryDate,
  lunchStartDate,
  lunchEndDate,
  exitDate,
  expectedMinutes,
  firstTierMinutes,
}: {
  entryDate: Date;
  lunchStartDate: Date;
  lunchEndDate: Date;
  exitDate: Date;
  expectedMinutes: number;
  firstTierMinutes: number;
}): NightOvertimeTiers {
  const tiers: NightOvertimeTiers = { firstTierNightMinutes: 0, extraTierNightMinutes: 0 };
  if (
    ![entryDate, lunchStartDate, lunchEndDate, exitDate].every(isValid) ||
    entryDate > lunchStartDate ||
    lunchStartDate > lunchEndDate ||
    exitDate <= entryDate
  ) {
    return tiers;
  }

  const firstTierEnd = expectedMinutes + firstTierMinutes;
  let workedBeforeStretch = 0;
  let nightActual = 0;

  for (const [start, end] of workedStretches(entryDate, lunchStartDate, lunchEndDate, exitDate)) {
    for (const [from, to] of nightStretches(start, end)) {
      const nightCreditBefore = nightEquivalentMinutes(nightActual);
      const creditedBefore = workedBeforeStretch + differenceInMinutes(from, start) - nightActual + nightCreditBefore;
      nightActual += differenceInMinutes(to, from);
      const creditedAfter = creditedBefore + nightEquivalentMinutes(nightActual) - nightCreditBefore;
      tiers.firstTierNightMinutes += Math.max(
        0,
        Math.min(creditedAfter, firstTierEnd) - Math.max(creditedBefore, expectedMinutes),
      );
      tiers.extraTierNightMinutes += Math.max(0, creditedAfter - Math.max(creditedBefore, firstTierEnd));
    }
    workedBeforeStretch += differenceInMinutes(end, start);
  }

  return tiers;
}

export function nightPremiumPay(nightMinutes: number, hourlyRate: number): number {
  return (nightMinutes / MINUTES_PER_HOUR) * hourlyRate * NIGHT_PREMIUM_RATE;
}

export function nightOvertimePremiumPay(
  nightOvertimeMinutes: number,
  hourlyRate: number,
  overtimeRatePercent: number,
): number {
  return nightPremiumPay(nightOvertimeMinutes, hourlyRate) * (overtimeRatePercent / 100);
}
