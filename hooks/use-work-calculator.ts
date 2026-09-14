import { addDays, addMinutes, differenceInCalendarDays, differenceInMinutes, format, isValid } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useCurrentTime } from "@/hooks/use-current-time";
import { buildDayBreakdown } from "@/lib/day-breakdown";
import { findJourneyIssue } from "@/lib/journey";
import { DAILY_MINUTES_KEY, readStoredFlag, readStoredNumber } from "@/lib/storage";

const MINUTES_PER_HOUR = 60;
const FIRST_TIER_LIMIT_MINUTES = 120;
const EXIT_REFINEMENT_PASSES = 6;

const DEFAULT_WORK_MINUTES = 8 * MINUTES_PER_HOUR + 48;
const DEFAULT_FIRST_TIER_RATE = 50;
const DEFAULT_EXTRA_TIER_RATE = 100;

const TIMESTAMP_FORMAT = "yyyy-MM-dd'T'HH:mm";

const STORAGE_KEYS = {
  workMinutes: DAILY_MINUTES_KEY,
  entry: "entry",
  lunchStart: "lunchStart",
  lunchEnd: "lunchEnd",
  exitOverride: "exitOverride",
  lastExit: "lastExit",
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

function breakdownOf(entry: string, lunchStart: string, lunchEnd: string, exit: string, expectedMinutes: number) {
  return buildDayBreakdown({ entry, lunchStart, lunchEnd, exit, expectedMinutes, isManualExit: true, now: null });
}

export function calculateWorkStats(
  entry: string,
  lunchStart: string,
  lunchEnd: string,
  displayExit: string,
  workMinutes: number,
): WorkStats {
  const breakdown = breakdownOf(entry, lunchStart, lunchEnd, displayExit, workMinutes);
  const dayOfWeek = new Date(entry).getDay();

  return {
    balance: breakdown.workedMinutes - breakdown.expectedMinutes,
    nightMinutes: breakdown.nightMinutes,
    totalWorked: breakdown.workedMinutes,
    ...splitOvertime(breakdown.overtimeMinutes, dayOfWeek === 0 || dayOfWeek === 6),
  };
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

  if (findJourneyIssue({ entry, lunchStart, lunchEnd, exit: lunchEnd })) return "";

  const creditedUntil = (exit: Date) =>
    breakdownOf(entry, lunchStart, lunchEnd, format(exit, TIMESTAMP_FORMAT), workMinutes).workedMinutes;

  const workedBeforeLunch = differenceInMinutes(lunchStartDate, entryDate);
  let exitDate = addMinutes(lunchEndDate, Math.max(0, workMinutes - workedBeforeLunch));
  let surplus = creditedUntil(exitDate) - workMinutes;

  for (let pass = 0; pass < EXIT_REFINEMENT_PASSES && surplus !== 0; pass += 1) {
    const candidate = addMinutes(exitDate, -surplus);
    if (candidate < lunchEndDate) break;

    const candidateSurplus = creditedUntil(candidate) - workMinutes;
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

function latestOf(timestamp: string, moment: Date): string {
  const parsed = new Date(timestamp);
  if (Number.isNaN(parsed.getTime()) || moment <= parsed) return timestamp;
  return format(moment, TIMESTAMP_FORMAT);
}

export function useWorkCalculator() {
  const currentTime = useCurrentTime();
  const [workMinutes, setWorkMinutes] = useState(DEFAULT_WORK_MINUTES);
  const [firstTierRate, setFirstTierRate] = useState(DEFAULT_FIRST_TIER_RATE);
  const [extraTierRate, setExtraTierRate] = useState(DEFAULT_EXTRA_TIER_RATE);
  const [entry, setEntry] = useState(() => todayAt("08:00"));
  const [lunchStart, setLunchStart] = useState(() => todayAt("12:00"));
  const [lunchEnd, setLunchEnd] = useState(() => todayAt("13:00"));
  const [exitOverride, setExitOverride] = useState("");
  const [isManualExit, setIsManualExit] = useState(false);
  const [previousExit, setPreviousExit] = useState<string | null>(null);
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

    const storedLastExit = readStoredTimestamp(STORAGE_KEYS.lastExit);
    setPreviousExit(dayShift > 0 ? storedLastExit : null);
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

  const countedExit = isManualExit || currentTime === null ? displayExit : latestOf(displayExit, currentTime);

  useEffect(() => {
    if (!isRestored || displayExit === "") return;
    localStorage.setItem(STORAGE_KEYS.lastExit, displayExit);
  }, [isRestored, displayExit]);

  const minutesSincePreviousShift = useMemo(
    () => (previousExit === null ? null : differenceInMinutes(new Date(entry), new Date(previousExit))),
    [previousExit, entry],
  );

  const stats = useMemo(
    () => calculateWorkStats(entry, lunchStart, lunchEnd, countedExit, workMinutes),
    [entry, lunchStart, lunchEnd, countedExit, workMinutes],
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
    currentTime,
    stats,
    minutesSincePreviousShift,
    issue,
    resetDefaults,
  };
}
