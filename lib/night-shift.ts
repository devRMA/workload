import { differenceInMinutes } from "date-fns";

const NIGHT_SHIFT_START_HOUR = 22;
const NIGHT_SHIFT_END_HOUR = 5;
const NIGHT_HOUR_MINUTES = 52.5;
const MINUTES_PER_HOUR = 60;

function overlapInMinutes(firstStart: Date, firstEnd: Date, secondStart: Date, secondEnd: Date): number {
  const start = Math.max(firstStart.getTime(), secondStart.getTime());
  const end = Math.min(firstEnd.getTime(), secondEnd.getTime());
  return end > start ? differenceInMinutes(new Date(end), new Date(start)) : 0;
}

export function countNightMinutes(entryDate: Date, exitDate: Date, lunchStartDate: Date, lunchEndDate: Date): number {
  let nightMinutes = 0;
  const window = new Date(entryDate);
  window.setHours(0, 0, 0, 0);
  window.setDate(window.getDate() - 1);

  while (window <= exitDate) {
    const nightStart = new Date(window);
    nightStart.setHours(NIGHT_SHIFT_START_HOUR, 0, 0, 0);
    const nightEnd = new Date(window);
    nightEnd.setDate(nightEnd.getDate() + 1);
    nightEnd.setHours(NIGHT_SHIFT_END_HOUR, 0, 0, 0);

    const worked = overlapInMinutes(nightStart, nightEnd, entryDate, exitDate);
    const lunched = overlapInMinutes(nightStart, nightEnd, lunchStartDate, lunchEndDate);
    nightMinutes += Math.max(0, worked - lunched);

    window.setDate(window.getDate() + 1);
  }

  return nightMinutes;
}

export function nightEquivalentMinutes(nightMinutesWorked: number): number {
  return Math.round(nightMinutesWorked * (MINUTES_PER_HOUR / NIGHT_HOUR_MINUTES));
}

export function nightBonusMinutes(nightMinutesWorked: number): number {
  return nightEquivalentMinutes(nightMinutesWorked) - nightMinutesWorked;
}
