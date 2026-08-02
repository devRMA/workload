import { describe, expect, it } from "vitest";
import { buildDayBreakdown, type DayBreakdownInput } from "@/lib/day-breakdown";

const MONDAY = "2025-01-06";
const TUESDAY = "2025-01-07";
const FULL_DAY_MINUTES = 8 * 60 + 48;

const BASE_INPUT: DayBreakdownInput = {
  entry: `${MONDAY}T08:00`,
  lunchStart: `${MONDAY}T12:00`,
  lunchEnd: `${MONDAY}T13:00`,
  exit: `${MONDAY}T17:48`,
  expectedMinutes: FULL_DAY_MINUTES,
  isManualExit: true,
  now: null,
};

const breakdownFor = (overrides: Partial<DayBreakdownInput> = {}) => buildDayBreakdown({ ...BASE_INPUT, ...overrides });

const minutesByKind = (input: Partial<DayBreakdownInput> = {}) =>
  Object.fromEntries(breakdownFor(input).segments.map(({ kind, minutes }) => [kind, minutes]));

describe("buildDayBreakdown", () => {
  it("splits a finished day into morning, lunch and afternoon", () => {
    const breakdown = breakdownFor();

    expect(breakdown).toMatchObject({
      morningMinutes: 240,
      lunchMinutes: 60,
      afternoonMinutes: 288,
      nightBonusMinutes: 0,
      workedMinutes: 528,
      expectedMinutes: FULL_DAY_MINUTES,
      remainingMinutes: 0,
      overtimeMinutes: 0,
      progressPercent: 100,
      overtimePercent: 0,
      isInProgress: false,
    });
  });

  it("zeroes everything when a timestamp is unusable", () => {
    expect(breakdownFor({ entry: "not-a-date" })).toEqual({
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
    });
  });

  it("zeroes everything when the times are out of order", () => {
    expect(breakdownFor({ exit: `${MONDAY}T09:00` }).workedMinutes).toBe(0);
  });

  it("stops at the registered exit in manual mode, even with a clock running", () => {
    const breakdown = breakdownFor({ now: new Date(`${MONDAY}T22:00`) });

    expect(breakdown.workedMinutes).toBe(528);
    expect(breakdown.isInProgress).toBe(false);
  });

  it("stops at the suggested exit in automatic mode while the clock is unknown", () => {
    const breakdown = breakdownFor({ isManualExit: false, now: null });

    expect(breakdown.workedMinutes).toBe(528);
    expect(breakdown.isInProgress).toBe(false);
  });

  it("stops at the current moment in automatic mode", () => {
    const breakdown = breakdownFor({ isManualExit: false, now: new Date(`${MONDAY}T10:00`) });

    expect(breakdown).toMatchObject({
      morningMinutes: 120,
      lunchMinutes: 0,
      afternoonMinutes: 0,
      workedMinutes: 120,
      remainingMinutes: 408,
      isInProgress: true,
    });
    expect(breakdown.progressPercent).toBeCloseTo((120 / FULL_DAY_MINUTES) * 100);
  });

  it("counts nothing while the clock is still before the entry", () => {
    const breakdown = breakdownFor({ isManualExit: false, now: new Date(`${MONDAY}T06:00`) });

    expect(breakdown).toMatchObject({
      morningMinutes: 0,
      lunchMinutes: 0,
      afternoonMinutes: 0,
      workedMinutes: 0,
      progressPercent: 0,
    });
    expect(breakdown.segments).toEqual([]);
  });

  it("leaves the afternoon empty while the lunch break is still running", () => {
    const breakdown = breakdownFor({ isManualExit: false, now: new Date(`${MONDAY}T12:30`) });

    expect(breakdown).toMatchObject({
      morningMinutes: 240,
      lunchMinutes: 30,
      afternoonMinutes: 0,
    });
  });

  it("keeps only the stretches that actually happened out of the segments", () => {
    expect(minutesByKind()).toEqual({ morning: 240, lunch: 60, afternoon: 288 });
    expect(minutesByKind({ isManualExit: false, now: new Date(`${MONDAY}T10:00`) })).toEqual({ morning: 120 });
  });

  it("takes the overtime out of the afternoon so the segments never count it twice", () => {
    const breakdown = breakdownFor({ exit: `${MONDAY}T19:00` });
    const total = breakdown.segments.reduce((sum, segment) => sum + segment.minutes, 0);

    expect(breakdown.overtimeMinutes).toBe(72);
    expect(minutesByKind({ exit: `${MONDAY}T19:00` })).toEqual({
      morning: 240,
      lunch: 60,
      afternoon: 288,
      overtime: 72,
    });
    expect(total).toBe(breakdown.morningMinutes + breakdown.lunchMinutes + breakdown.afternoonMinutes);
  });

  it("credits the reduced night hour on a shift that runs into the small hours", () => {
    const breakdown = breakdownFor({
      entry: `${MONDAY}T20:00`,
      lunchStart: `${TUESDAY}T00:00`,
      lunchEnd: `${TUESDAY}T01:00`,
      exit: `${TUESDAY}T05:00`,
      expectedMinutes: 480,
    });

    expect(breakdown.nightBonusMinutes).toBe(51);
    expect(breakdown.workedMinutes).toBe(531);
    expect(breakdown.overtimeMinutes).toBe(51);
  });

  it("never lets the progress pass one hundred percent", () => {
    const breakdown = breakdownFor({ expectedMinutes: 100 });

    expect(breakdown.overtimeMinutes).toBe(428);
    expect(breakdown.progressPercent).toBe(100);
    expect(breakdown.overtimePercent).toBe(100);
  });

  it("reports no progress instead of dividing by a journey of zero minutes", () => {
    const breakdown = breakdownFor({ expectedMinutes: 0 });

    expect(breakdown.progressPercent).toBe(0);
    expect(breakdown.overtimePercent).toBe(0);
    expect(breakdown.overtimeMinutes).toBe(528);
  });
});
