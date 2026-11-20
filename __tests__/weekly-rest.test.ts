import { describe, expect, it } from "vitest";
import { restDayPayOnOvertime, splitMonthDays } from "@/lib/weekly-rest";

describe("splitMonthDays", () => {
  it("splits a month into its Sundays and everything else", () => {
    expect(splitMonthDays(new Date("2026-01-15T08:00"))).toEqual({ workingDays: 27, restDays: 4 });
  });

  it("counts every Sunday of a month that both starts and ends on one", () => {
    expect(splitMonthDays(new Date("2026-03-10T08:00"))).toEqual({ workingDays: 26, restDays: 5 });
  });
});

describe("restDayPayOnOvertime", () => {
  it("shares the monthly overtime across the working days and pays it on every rest day", () => {
    expect(restDayPayOnOvertime(818.18, { workingDays: 25, restDays: 5 })).toBeCloseTo(163.64, 2);
  });

  it("pays nothing without overtime", () => {
    expect(restDayPayOnOvertime(0, { workingDays: 25, restDays: 5 })).toBe(0);
  });

  it("pays nothing when there is no working day to divide by", () => {
    expect(restDayPayOnOvertime(818.18, { workingDays: 0, restDays: 5 })).toBe(0);
  });
});
