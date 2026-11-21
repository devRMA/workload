import { describe, expect, it } from "vitest";
import {
  amountForPeriod,
  checkDivisor,
  DAILY_HOURS_CAP,
  DEFAULT_MONTHLY_HOURS,
  type DivisorCheck,
  type DivisorNorm,
  MAX_WORK_DAYS_PER_WEEK,
  MIN_WORK_DAYS_PER_WEEK,
  PAID_DAYS_PER_MONTH,
  SALARY_PERIOD_LABELS,
  SALARY_PERIODS,
  type SalaryPeriod,
  SUMULA_431_WEEKLY_HOURS,
  WEEKLY_NORMAL_HOURS_CAP,
  WEEKS_PER_MONTH_DIVISOR,
  WORK_DAYS_AVAILABLE_PER_WEEK,
} from "@/lib/salary-period";

const MONTHLY_NET = 4498.49;
const MONTHLY_HOURS = 220;
const DAILY_HOURS = 8;
const WORK_DAYS_PER_WEEK = 5;

const forPeriod = (period: SalaryPeriod) =>
  amountForPeriod(MONTHLY_NET, period, MONTHLY_HOURS, DAILY_HOURS, WORK_DAYS_PER_WEEK);

describe("SALARY_PERIODS", () => {
  it("lists every period from shortest to longest", () => {
    expect(SALARY_PERIODS).toEqual(["hour", "day", "week", "month", "year"]);
  });

  it("labels every period", () => {
    for (const period of SALARY_PERIODS) {
      expect(SALARY_PERIOD_LABELS[period]).toBeTruthy();
    }
  });
});

describe("amountForPeriod", () => {
  it("divides the monthly amount by the monthly hours", () => {
    expect(forPeriod("hour")).toBeCloseTo(20.4477, 4);
  });

  it("scales the hourly amount by the daily hours", () => {
    expect(forPeriod("day")).toBeCloseTo(forPeriod("hour") * 8, 6);
  });

  it("returns the monthly amount untouched", () => {
    expect(forPeriod("month")).toBe(MONTHLY_NET);
  });

  it("counts thirteen paid months in a year", () => {
    expect(forPeriod("year")).toBeCloseTo(MONTHLY_NET * 13, 6);
  });

  it("honours a shorter daily journey", () => {
    expect(amountForPeriod(MONTHLY_NET, "day", MONTHLY_HOURS, 6, WORK_DAYS_PER_WEEK)).toBeCloseTo(
      forPeriod("hour") * 6,
      6,
    );
  });

  it("has no hourly, daily or weekly amount when the monthly hours are cleared", () => {
    expect(amountForPeriod(MONTHLY_NET, "hour", 0, DAILY_HOURS, WORK_DAYS_PER_WEEK)).toBe(0);
    expect(amountForPeriod(MONTHLY_NET, "day", 0, DAILY_HOURS, WORK_DAYS_PER_WEEK)).toBe(0);
    expect(amountForPeriod(MONTHLY_NET, "week", 0, DAILY_HOURS, WORK_DAYS_PER_WEEK)).toBe(0);
  });

  it("still reports the monthly and yearly amounts when the monthly hours are cleared", () => {
    expect(amountForPeriod(MONTHLY_NET, "month", 0, DAILY_HOURS, WORK_DAYS_PER_WEEK)).toBe(MONTHLY_NET);
    expect(amountForPeriod(MONTHLY_NET, "year", 0, DAILY_HOURS, WORK_DAYS_PER_WEEK)).toBeCloseTo(MONTHLY_NET * 13, 6);
  });

  it("follows the collected day count for the Semana figure, not a fixed five (AC8)", () => {
    expect(amountForPeriod(MONTHLY_NET, "week", MONTHLY_HOURS, DAILY_HOURS, 6)).toBeCloseTo(
      amountForPeriod(MONTHLY_NET, "day", MONTHLY_HOURS, DAILY_HOURS, 6) * 6,
      6,
    );
  });

  it("prices the defaults to the centavo, from the unrounded hourly (E3)", () => {
    expect(amountForPeriod(3000, "hour", 220, 8.8, 5)).toBe(3000 / 220);
    expect(amountForPeriod(3000, "day", 220, 8.8, 5)).toBeCloseTo(120, 10);
    expect(amountForPeriod(3000, "week", 220, 8.8, 5)).toBeCloseTo(600, 6);
    expect(amountForPeriod(3000, "week", 220, 8.8, 5)).not.toBeCloseTo(600.16, 2);
    expect(amountForPeriod(3000, "month", 220, 8.8, 5)).toBe(3000);
    expect(amountForPeriod(3000, "year", 220, 8.8, 5)).toBe(39000);
  });

  it("prices a week at 3000 ÷ 5 for every lawful day count, from a divisor computed for that day count", () => {
    const workDaysPerWeekRange = [1, 2, 3, 4, 5, 6];
    expect(workDaysPerWeekRange).toHaveLength(6);

    for (const workDaysPerWeek of workDaysPerWeekRange) {
      const divisor = DAILY_HOURS * workDaysPerWeek * WEEKS_PER_MONTH_DIVISOR;
      expect(amountForPeriod(3000, "week", divisor, DAILY_HOURS, workDaysPerWeek)).toBeCloseTo(600, 6);
    }
  });
});

describe("the norm-fixed constants, read from the exported values themselves", () => {
  it("matches legal.md § Run 3 — the constants", () => {
    expect(PAID_DAYS_PER_MONTH).toBe(30);
    expect(WORK_DAYS_AVAILABLE_PER_WEEK).toBe(6);
    expect(WEEKS_PER_MONTH_DIVISOR).toBe(5);
    expect(WEEKLY_NORMAL_HOURS_CAP).toBe(44);
    expect(DAILY_HOURS_CAP).toBe(10);
    expect(SUMULA_431_WEEKLY_HOURS).toBe(40);
    expect(DEFAULT_MONTHLY_HOURS).toBe(220);
    expect(MIN_WORK_DAYS_PER_WEEK).toBe(1);
    expect(MAX_WORK_DAYS_PER_WEEK).toBe(6);
  });
});

interface SweptRow {
  dailyMinutes: number;
  workDaysPerWeek: number;
  kind: DivisorCheck["kind"];
  divisor?: number;
  norm?: DivisorNorm;
  weeklyHours?: number;
}

const SWEPT_ROWS: readonly SweptRow[] = [
  { dailyMinutes: 240, workDaysPerWeek: 5, kind: "workload-missing", divisor: 100, norm: "clt-64-sole-paragraph" },
  { dailyMinutes: 360, workDaysPerWeek: 5, kind: "workload-missing", divisor: 150, norm: "clt-64-sole-paragraph" },
  { dailyMinutes: 360, workDaysPerWeek: 6, kind: "workload-missing", divisor: 180, norm: "clt-64-caput" },
  { dailyMinutes: 440, workDaysPerWeek: 5, kind: "workload-missing", divisor: 183.33, norm: "clt-64-sole-paragraph" },
  { dailyMinutes: 440, workDaysPerWeek: 6, kind: "workload-missing", divisor: 220, norm: "clt-64-caput" },
  { dailyMinutes: 480, workDaysPerWeek: 5, kind: "workload-missing", divisor: 200, norm: "sumula-431" },
  { dailyMinutes: 480, workDaysPerWeek: 6, kind: "weekly-cap-exceeded", weeklyHours: 48 },
  { dailyMinutes: 528, workDaysPerWeek: 5, kind: "workload-missing", divisor: 220, norm: "clt-64-sole-paragraph" },
  { dailyMinutes: 528, workDaysPerWeek: 6, kind: "weekly-cap-exceeded", weeklyHours: 52.8 },
  { dailyMinutes: 600, workDaysPerWeek: 4, kind: "workload-missing", divisor: 200, norm: "sumula-431" },
  { dailyMinutes: 720, workDaysPerWeek: 3, kind: "daily-cap-exceeded", weeklyHours: 36 },
  { dailyMinutes: 720, workDaysPerWeek: 5, kind: "daily-cap-exceeded", weeklyHours: 60 },
  { dailyMinutes: 528, workDaysPerWeek: 7, kind: "too-many-week-days" },
];

describe("checkDivisor — the input domain, swept (legal.md § The input domain, swept)", () => {
  it("sweeps exactly the thirteen rows legal.md rules on", () => {
    expect(SWEPT_ROWS).toHaveLength(13);
  });

  it.each(SWEPT_ROWS)(
    "($dailyMinutes min, $workDaysPerWeek dias por semana) → $kind",
    ({ dailyMinutes, workDaysPerWeek, kind, divisor, norm, weeklyHours }) => {
      const result = checkDivisor({ dailyMinutes, workDaysPerWeek, declaredMonthlyHours: 0 });

      expect(result.kind).toBe(kind);
      if (divisor !== undefined) expect(result).toMatchObject({ divisor, norm });
      if (weeklyHours !== undefined) expect(result).toMatchObject({ weeklyHours });
    },
  );
});

describe("checkDivisor — rows the table cannot carry", () => {
  it("refuses a cleared day count", () => {
    expect(checkDivisor({ dailyMinutes: 480, workDaysPerWeek: 0, declaredMonthlyHours: 220 })).toEqual({
      kind: "no-week-days",
    });
  });

  it("refuses a non-integer day count", () => {
    expect(checkDivisor({ dailyMinutes: 480, workDaysPerWeek: 5.5, declaredMonthlyHours: 220 })).toEqual({
      kind: "no-week-days",
    });
  });

  it("refuses a negative day count", () => {
    expect(checkDivisor({ dailyMinutes: 480, workDaysPerWeek: -1, declaredMonthlyHours: 220 })).toEqual({
      kind: "no-week-days",
    });
  });

  it("stays silent on a cleared journey while a carga is declared", () => {
    expect(checkDivisor({ dailyMinutes: 0, workDaysPerWeek: 5, declaredMonthlyHours: 220 })).toEqual({
      kind: "silent",
    });
  });

  it("asks for the carga when both the journey and the carga are cleared", () => {
    expect(checkDivisor({ dailyMinutes: 0, workDaysPerWeek: 5, declaredMonthlyHours: 0 })).toEqual({
      kind: "workload-missing-without-week",
    });
  });
});

describe("checkDivisor — boundaries, tolerance and money", () => {
  it("prices exactly at the 10-hour daily boundary and refuses just above it", () => {
    expect(checkDivisor({ dailyMinutes: 600, workDaysPerWeek: 4, declaredMonthlyHours: 0 })).toMatchObject({
      kind: "workload-missing",
    });
    expect(checkDivisor({ dailyMinutes: 601, workDaysPerWeek: 4, declaredMonthlyHours: 0 })).toMatchObject({
      kind: "daily-cap-exceeded",
    });
  });

  it("prices exactly at the 44-hour weekly boundary and refuses just above it", () => {
    expect(checkDivisor({ dailyMinutes: 528, workDaysPerWeek: 5, declaredMonthlyHours: 0 })).toMatchObject({
      kind: "workload-missing",
    });
    expect(checkDivisor({ dailyMinutes: 529, workDaysPerWeek: 5, declaredMonthlyHours: 0 })).toMatchObject({
      kind: "weekly-cap-exceeded",
    });
  });

  it("stays silent inside the tolerance and warns just outside it", () => {
    expect(checkDivisor({ dailyMinutes: 528, workDaysPerWeek: 5, declaredMonthlyHours: 219.5 })).toEqual({
      kind: "silent",
    });
    expect(checkDivisor({ dailyMinutes: 528, workDaysPerWeek: 5, declaredMonthlyHours: 219 })).toMatchObject({
      kind: "workload-mismatch",
    });
  });

  it("stays silent at the shipped defaults (AC5)", () => {
    expect(checkDivisor({ dailyMinutes: 528, workDaysPerWeek: 5, declaredMonthlyHours: 220 })).toEqual({
      kind: "silent",
    });
  });

  it("reports a real mismatch, rendered (E4)", () => {
    expect(checkDivisor({ dailyMinutes: 440, workDaysPerWeek: 5, declaredMonthlyHours: 220 })).toEqual({
      kind: "workload-mismatch",
      divisor: 183.33,
      norm: "clt-64-sole-paragraph",
    });
  });

  it("refuses above the daily ceiling with no divisor field on the returned object (E5)", () => {
    const result = checkDivisor({ dailyMinutes: 720, workDaysPerWeek: 5, declaredMonthlyHours: 220 });

    expect(result).toEqual({ kind: "daily-cap-exceeded", weeklyHours: 60 });
    expect(result).not.toHaveProperty("divisor");
  });
});
