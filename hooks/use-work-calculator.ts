import { addDays, addMinutes, differenceInCalendarDays, differenceInMinutes, format, isValid } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { findJourneyIssue } from "@/lib/journey";
import { readStoredFlag, readStoredNumber } from "@/lib/storage";

const NIGHT_SHIFT_START_HOUR = 22;
const NIGHT_SHIFT_END_HOUR = 5;
const NIGHT_HOUR_MINUTES = 52.5;
const MINUTES_PER_HOUR = 60;
const FIRST_TIER_LIMIT_MINUTES = 120;
const EXIT_REFINEMENT_PASSES = 6;

const DEFAULT_WORK_MINUTES = 8 * MINUTES_PER_HOUR + 48;
const DEFAULT_FIRST_TIER_RATE = 50;
const DEFAULT_EXTRA_TIER_RATE = 100;

const TIMESTAMP_FORMAT = "yyyy-MM-dd'T'HH:mm";

const STORAGE_KEYS = {
  workMinutes: "workMinutes",
  entry: "entry",
  lunchStart: "lunchStart",
  lunchEnd: "lunchEnd",
  exitOverride: "exitOverride",
  isManualExit: "isManualExit",
  firstTierRate: "firstTierRate",
  extraTierRate: "extraTierRate",
} as const;

export interface WorkStats {
  balance: number;
  nightMinutes: number;
  firstTierMinutes: number;
  extraTierMinutes: number;
  totalWorked: number;
}

const EMPTY_STATS: WorkStats = {
  balance: 0,
  nightMinutes: 0,
  firstTierMinutes: 0,
  extraTierMinutes: 0,
  totalWorked: 0,
};

function isChronological(...dates: readonly Date[]): boolean {
  return dates.every((date, index) => isValid(date) && (index === 0 || dates[index - 1] <= date));
}

function overlapInMinutes(firstStart: Date, firstEnd: Date, secondStart: Date, secondEnd: Date): number {
  const start = Math.max(firstStart.getTime(), secondStart.getTime());
  const end = Math.min(firstEnd.getTime(), secondEnd.getTime());
  return end > start ? differenceInMinutes(new Date(end), new Date(start)) : 0;
}

function countNightMinutes(entryDate: Date, exitDate: Date, lunchStartDate: Date, lunchEndDate: Date): number {
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

function nightEquivalentMinutes(nightMinutesWorked: number): number {
  return Math.round(nightMinutesWorked * (MINUTES_PER_HOUR / NIGHT_HOUR_MINUTES));
}

function nightBonusMinutes(nightMinutesWorked: number): number {
  return nightEquivalentMinutes(nightMinutesWorked) - nightMinutesWorked;
}

function splitOvertime(
  overtimeMinutes: number,
  isWeekend: boolean,
): Pick<WorkStats, "firstTierMinutes" | "extraTierMinutes"> {
  if (isWeekend) {
    return { firstTierMinutes: 0, extraTierMinutes: overtimeMinutes };
  }

  return {
    firstTierMinutes: Math.min(overtimeMinutes, FIRST_TIER_LIMIT_MINUTES),
    extraTierMinutes: Math.max(0, overtimeMinutes - FIRST_TIER_LIMIT_MINUTES),
  };
}

export function calculateWorkStats(
  entry: string,
  lunchStart: string,
  lunchEnd: string,
  displayExit: string,
  workMinutes: number,
): WorkStats {
  if (findJourneyIssue({ entry, lunchStart, lunchEnd, exit: displayExit })) return EMPTY_STATS;

  const entryDate = new Date(entry);
  const lunchStartDate = new Date(lunchStart);
  const lunchEndDate = new Date(lunchEnd);
  const exitDate = new Date(displayExit);

  const workedBeforeLunch = differenceInMinutes(lunchStartDate, entryDate);
  const workedAfterLunch = differenceInMinutes(exitDate, lunchEndDate);
  const workedMinutes = workedBeforeLunch + workedAfterLunch;

  const nightMinutesWorked = countNightMinutes(entryDate, exitDate, lunchStartDate, lunchEndDate);
  const totalWorked = workedMinutes + nightBonusMinutes(nightMinutesWorked);
  const balance = totalWorked - workMinutes;
  const dayOfWeek = entryDate.getDay();

  return {
    balance,
    nightMinutes: nightEquivalentMinutes(nightMinutesWorked),
    totalWorked,
    ...splitOvertime(Math.max(0, balance), dayOfWeek === 0 || dayOfWeek === 6),
  };
}

function creditedMinutes(entryDate: Date, lunchStartDate: Date, lunchEndDate: Date, exitDate: Date): number {
  const worked = differenceInMinutes(lunchStartDate, entryDate) + differenceInMinutes(exitDate, lunchEndDate);
  const nightWorked = countNightMinutes(entryDate, exitDate, lunchStartDate, lunchEndDate);

  return worked + nightBonusMinutes(nightWorked);
}

export function calculateSuggestedExit(
  entry: string,
  lunchStart: string,
  lunchEnd: string,
  workMinutes: number,
): string {
  const entryDate = new Date(entry);
  const lunchStartDate = new Date(lunchStart);
  const lunchEndDate = new Date(lunchEnd);

  if (!isChronological(entryDate, lunchStartDate, lunchEndDate)) return "";

  const workedBeforeLunch = differenceInMinutes(lunchStartDate, entryDate);
  let exitDate = addMinutes(lunchEndDate, Math.max(0, workMinutes - workedBeforeLunch));
  let surplus = creditedMinutes(entryDate, lunchStartDate, lunchEndDate, exitDate) - workMinutes;

  for (let pass = 0; pass < EXIT_REFINEMENT_PASSES && surplus !== 0; pass += 1) {
    const candidate = addMinutes(exitDate, -surplus);
    if (candidate < lunchEndDate) break;

    const candidateSurplus = creditedMinutes(entryDate, lunchStartDate, lunchEndDate, candidate) - workMinutes;
    if (Math.abs(candidateSurplus) >= Math.abs(surplus)) break;

    exitDate = candidate;
    surplus = candidateSurplus;
  }

  return format(exitDate, TIMESTAMP_FORMAT);
}

function todayAt(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return format(date, TIMESTAMP_FORMAT);
}

function readStoredTimestamp(key: string): string | null {
  const stored = localStorage.getItem(key);
  if (!stored?.includes("T") || !isValid(new Date(stored))) return null;
  return stored;
}

function shiftedByDays(stored: string | null, dayShift: number, fallback: string): string {
  if (stored === null) return fallback;
  return format(addDays(new Date(stored), dayShift), TIMESTAMP_FORMAT);
}

export function useWorkCalculator() {
  const [workMinutes, setWorkMinutes] = useState(DEFAULT_WORK_MINUTES);
  const [firstTierRate, setFirstTierRate] = useState(DEFAULT_FIRST_TIER_RATE);
  const [extraTierRate, setExtraTierRate] = useState(DEFAULT_EXTRA_TIER_RATE);
  const [entry, setEntry] = useState(() => todayAt("08:00"));
  const [lunchStart, setLunchStart] = useState(() => todayAt("12:00"));
  const [lunchEnd, setLunchEnd] = useState(() => todayAt("13:00"));
  const [exitOverride, setExitOverride] = useState("");
  const [isManualExit, setIsManualExit] = useState(false);
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    setWorkMinutes(readStoredNumber(STORAGE_KEYS.workMinutes, DEFAULT_WORK_MINUTES));
    setFirstTierRate(readStoredNumber(STORAGE_KEYS.firstTierRate, DEFAULT_FIRST_TIER_RATE));
    setExtraTierRate(readStoredNumber(STORAGE_KEYS.extraTierRate, DEFAULT_EXTRA_TIER_RATE));

    const storedEntry = readStoredTimestamp(STORAGE_KEYS.entry);
    const dayShift = storedEntry === null ? 0 : differenceInCalendarDays(new Date(), new Date(storedEntry));

    setEntry((current) => shiftedByDays(storedEntry, dayShift, current));
    setLunchStart((current) => shiftedByDays(readStoredTimestamp(STORAGE_KEYS.lunchStart), dayShift, current));
    setLunchEnd((current) => shiftedByDays(readStoredTimestamp(STORAGE_KEYS.lunchEnd), dayShift, current));
    setExitOverride((current) => shiftedByDays(readStoredTimestamp(STORAGE_KEYS.exitOverride), dayShift, current));
    setIsManualExit(readStoredFlag(STORAGE_KEYS.isManualExit, false));
    setIsRestored(true);
  }, []);

  useEffect(() => {
    if (!isRestored) return;

    localStorage.setItem(STORAGE_KEYS.workMinutes, workMinutes.toString());
    localStorage.setItem(STORAGE_KEYS.firstTierRate, firstTierRate.toString());
    localStorage.setItem(STORAGE_KEYS.extraTierRate, extraTierRate.toString());
    localStorage.setItem(STORAGE_KEYS.entry, entry);
    localStorage.setItem(STORAGE_KEYS.lunchStart, lunchStart);
    localStorage.setItem(STORAGE_KEYS.lunchEnd, lunchEnd);
    localStorage.setItem(STORAGE_KEYS.exitOverride, exitOverride);
    localStorage.setItem(STORAGE_KEYS.isManualExit, isManualExit.toString());
  }, [isRestored, workMinutes, firstTierRate, extraTierRate, entry, lunchStart, lunchEnd, exitOverride, isManualExit]);

  const suggestedExit = useMemo(
    () => calculateSuggestedExit(entry, lunchStart, lunchEnd, workMinutes),
    [entry, lunchStart, lunchEnd, workMinutes],
  );

  const displayExit = isManualExit ? exitOverride : suggestedExit;

  const stats = useMemo(
    () => calculateWorkStats(entry, lunchStart, lunchEnd, displayExit, workMinutes),
    [entry, lunchStart, lunchEnd, displayExit, workMinutes],
  );

  const issue = useMemo(
    () => findJourneyIssue({ entry, lunchStart, lunchEnd, exit: displayExit }),
    [entry, lunchStart, lunchEnd, displayExit],
  );

  const resetDefaults = () => {
    setWorkMinutes(DEFAULT_WORK_MINUTES);
    setFirstTierRate(DEFAULT_FIRST_TIER_RATE);
    setExtraTierRate(DEFAULT_EXTRA_TIER_RATE);
    setEntry(todayAt("08:00"));
    setLunchStart(todayAt("12:00"));
    setLunchEnd(todayAt("13:00"));
    setIsManualExit(false);
    setExitOverride("");
  };

  return {
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
    issue,
    resetDefaults,
  };
}
