import { describe, expect, it } from "vitest";
import { findComplianceWarnings } from "@/lib/compliance";

const warningIds = (input: { overtimeMinutes: number; workedMinutes: number; lunchMinutes: number }) =>
  findComplianceWarnings(input).map(({ id }) => id);

describe("findComplianceWarnings", () => {
  it("stays quiet for a regular day", () => {
    expect(findComplianceWarnings({ overtimeMinutes: 0, workedMinutes: 528, lunchMinutes: 60 })).toEqual([]);
  });

  it("accepts exactly two hours of overtime", () => {
    expect(warningIds({ overtimeMinutes: 120, workedMinutes: 528, lunchMinutes: 60 })).toEqual([]);
  });

  it("warns as soon as the overtime passes two hours", () => {
    expect(warningIds({ overtimeMinutes: 121, workedMinutes: 528, lunchMinutes: 60 })).toEqual([
      "daily-overtime-limit",
    ]);
  });

  it("accepts a short break on a day of exactly six hours", () => {
    expect(warningIds({ overtimeMinutes: 0, workedMinutes: 360, lunchMinutes: 59 })).toEqual([]);
  });

  it("warns about the short break once the day passes six hours", () => {
    expect(warningIds({ overtimeMinutes: 0, workedMinutes: 361, lunchMinutes: 59 })).toEqual(["minimum-lunch-break"]);
  });

  it("accepts a full hour of break on a long day", () => {
    expect(warningIds({ overtimeMinutes: 0, workedMinutes: 361, lunchMinutes: 60 })).toEqual([]);
  });

  it("reports both problems when they happen on the same day", () => {
    expect(warningIds({ overtimeMinutes: 121, workedMinutes: 700, lunchMinutes: 30 })).toEqual([
      "daily-overtime-limit",
      "minimum-lunch-break",
    ]);
  });

  it("explains each warning with the article behind it", () => {
    const [overtime, lunch] = findComplianceWarnings({
      overtimeMinutes: 180,
      workedMinutes: 700,
      lunchMinutes: 0,
    });

    expect(overtime.title).toContain("2h extras");
    expect(overtime.detail).toContain("art. 59");
    expect(lunch.title).toContain("1 hora");
    expect(lunch.detail).toContain("art. 71");
  });
});
