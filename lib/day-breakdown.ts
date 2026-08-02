import { differenceInMinutes } from "date-fns";
import { findJourneyIssue } from "./journey";
import { countNightMinutes, nightBonusMinutes } from "./night-shift";

export type DaySegmentKind = "morning" | "lunch" | "afternoon" | "overtime";

export interface DaySegment {
  kind: DaySegmentKind;
  minutes: number;
}

export interface DayBreakdown {
  morningMinutes: number;
  lunchMinutes: number;
  afternoonMinutes: number;
  nightBonusMinutes: number;
  workedMinutes: number;
  expectedMinutes: number;
  remainingMinutes: number;
  overtimeMinutes: number;
  progressPercent: number;
  overtimePercent: number;
  segments: readonly DaySegment[];
  isInProgress: boolean;
}

export interface DayBreakdownInput {
  entry: string;
  lunchStart: string;
  lunchEnd: string;
  exit: string;
  expectedMinutes: number;
  isManualExit: boolean;
  now: Date | null;
}

const EMPTY_BREAKDOWN: DayBreakdown = {
  morningMinutes: 0,
  lunchMinutes: 0,
  afternoonMinutes: 0,
  nightBonusMinutes: 0,
  workedMinutes: 0,
  expectedMinutes: 0,
  remainingMinutes: 0,
  overtimeMinutes: 0,
  progressPercent: 0,
  overtimePercent: 0,
  segments: [],
  isInProgress: false,
};

function earliest(first: Date, second: Date): Date {
  return first < second ? first : second;
}

function minutesBetween(from: Date, to: Date): number {
  return Math.max(0, differenceInMinutes(to, from));
}

function percentOf(minutes: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, (minutes / total) * 100);
}

function isStillWorking({ isManualExit, now }: DayBreakdownInput): boolean {
  return !isManualExit && now !== null;
}

function workedUntil(input: DayBreakdownInput): Date {
  const { entry, exit, isManualExit, now } = input;
  if (isManualExit || now === null) return new Date(exit);
  return new Date(Math.max(new Date(entry).getTime(), now.getTime()));
}

export function buildDayBreakdown(input: DayBreakdownInput): DayBreakdown {
  const { entry, lunchStart, lunchEnd, exit, expectedMinutes } = input;
  if (findJourneyIssue({ entry, lunchStart, lunchEnd, exit })) return EMPTY_BREAKDOWN;

  const entryDate = new Date(entry);
  const lunchStartDate = new Date(lunchStart);
  const lunchEndDate = new Date(lunchEnd);
  const endOfWork = workedUntil(input);

  const morningMinutes = minutesBetween(entryDate, earliest(endOfWork, lunchStartDate));
  const lunchMinutes = minutesBetween(lunchStartDate, earliest(endOfWork, lunchEndDate));
  const afternoonMinutes = minutesBetween(lunchEndDate, endOfWork);

  const nightWorked = countNightMinutes(entryDate, endOfWork, lunchStartDate, earliest(endOfWork, lunchEndDate));
  const nightBonus = nightBonusMinutes(nightWorked);

  const workedMinutes = morningMinutes + afternoonMinutes + nightBonus;
  const overtimeMinutes = Math.max(0, workedMinutes - expectedMinutes);

  const segments: DaySegment[] = [
    { kind: "morning", minutes: morningMinutes },
    { kind: "lunch", minutes: lunchMinutes },
    { kind: "afternoon", minutes: Math.max(0, afternoonMinutes - overtimeMinutes) },
    { kind: "overtime", minutes: Math.min(afternoonMinutes, overtimeMinutes) },
  ];

  return {
    morningMinutes,
    lunchMinutes,
    afternoonMinutes,
    nightBonusMinutes: nightBonus,
    workedMinutes,
    expectedMinutes,
    remainingMinutes: Math.max(0, expectedMinutes - workedMinutes),
    overtimeMinutes,
    progressPercent: percentOf(workedMinutes, expectedMinutes),
    overtimePercent: percentOf(overtimeMinutes, expectedMinutes),
    segments: segments.filter(({ minutes }) => minutes > 0),
    isInProgress: isStillWorking(input),
  };
}
