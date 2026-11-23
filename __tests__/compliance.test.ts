import { describe, expect, it } from "vitest";
import { findComplianceWarnings } from "@/lib/compliance";

type ComplianceInput = Parameters<typeof findComplianceWarnings>[0];

const REGULAR_DAY: ComplianceInput = {
  overtimeMinutes: 0,
  workedMinutes: 528,
  lunchMinutes: 60,
  minutesSincePreviousShift: null,
};

const warnings = (overrides: Partial<ComplianceInput> = {}) => findComplianceWarnings({ ...REGULAR_DAY, ...overrides });

const warningIds = (overrides: Partial<ComplianceInput> = {}) => warnings(overrides).map(({ id }) => id);

describe("findComplianceWarnings", () => {
  it("stays quiet for a regular day", () => {
    expect(warnings()).toEqual([]);
  });

  it("accepts exactly two hours of overtime", () => {
    expect(warningIds({ overtimeMinutes: 120 })).toEqual([]);
  });

  it("warns as soon as the overtime passes two hours", () => {
    expect(warningIds({ overtimeMinutes: 121 })).toEqual(["daily-overtime-limit"]);
  });

  it("accepts a short break on a day of exactly six hours", () => {
    expect(warningIds({ workedMinutes: 360, lunchMinutes: 59 })).toEqual([]);
  });

  it("warns about the short break once the day passes six hours", () => {
    expect(warningIds({ workedMinutes: 361, lunchMinutes: 59 })).toEqual(["minimum-lunch-break"]);
  });

  it("accepts a full hour of break on a long day", () => {
    expect(warningIds({ workedMinutes: 361, lunchMinutes: 60 })).toEqual([]);
  });

  it("reports both problems when they happen on the same day", () => {
    expect(warningIds({ overtimeMinutes: 121, workedMinutes: 700, lunchMinutes: 30 })).toEqual([
      "daily-overtime-limit",
      "minimum-lunch-break",
    ]);
  });

  it("explains each warning with the article behind it", () => {
    const [overtime, lunch] = warnings({ overtimeMinutes: 180, workedMinutes: 700, lunchMinutes: 0 });

    expect(overtime.title).toContain("2h extras");
    expect(overtime.detail).toContain("art. 59");
    expect(lunch.title).toContain("1 hora");
    expect(lunch.detail).toContain("art. 71");
  });

  it("allocates the irregularity to the employer without an em-dash", () => {
    const [overtime] = warnings({ overtimeMinutes: 180, workedMinutes: 700, lunchMinutes: 0 });

    expect(overtime.detail).toContain("Súmula 376, I, do TST");
    expect(overtime.detail).toContain("a sanção recai sobre o empregador");
    expect(overtime.detail).not.toContain("—");
  });

  it("accepts a day of exactly four hours without any break", () => {
    expect(warningIds({ workedMinutes: 240, lunchMinutes: 0 })).toEqual([]);
  });

  it("demands fifteen minutes once the day passes four hours", () => {
    const [shortBreak] = warnings({ workedMinutes: 241, lunchMinutes: 14 });

    expect(shortBreak.id).toBe("short-day-break");
    expect(shortBreak.detail).toContain("art. 71, §1º");
  });

  it("accepts the fifteen minute break on a day of up to six hours", () => {
    expect(warningIds({ workedMinutes: 360, lunchMinutes: 15 })).toEqual([]);
  });

  it("stays quiet about the interregno when the previous journey is unknown", () => {
    expect(warningIds({ minutesSincePreviousShift: null })).toEqual([]);
  });

  it("accepts exactly eleven hours between two journeys", () => {
    expect(warningIds({ minutesSincePreviousShift: 660 })).toEqual([]);
  });

  it("warns when less than eleven hours separate two journeys", () => {
    const [rest] = warnings({ minutesSincePreviousShift: 659 });

    expect(rest.id).toBe("rest-between-shifts");
    expect(rest.detail).toContain("art. 66");
  });

  it("names the norm that lets a norma coletiva cut the interval to 30 minutes", () => {
    const [lunch] = warnings({ workedMinutes: 361, lunchMinutes: 59 });

    expect(lunch.id).toBe("minimum-lunch-break");
    expect(lunch.detail).toContain("art. 611-A, III, da CLT");
  });

  it("cites the paragraph the 50% indemnity comes from", () => {
    const [shortBreak] = warnings({ workedMinutes: 241, lunchMinutes: 14 });
    const [lunch] = warnings({ workedMinutes: 361, lunchMinutes: 59 });

    expect(shortBreak.detail).toContain("art. 71, §4º, da CLT");
    expect(lunch.detail).toContain("art. 71, §4º, da CLT");
  });

  it("sources the interjornada payment instead of hedging it", () => {
    const [rest] = warnings({ minutesSincePreviousShift: 659 });

    expect(rest.detail).toContain("Orientação Jurisprudencial nº 355 da SBDI-1 do TST");
    expect(rest.detail).toContain("por analogia");
  });

  it("carries every warning detail without an em-dash", () => {
    const [overtime] = warnings({ overtimeMinutes: 180, workedMinutes: 700, lunchMinutes: 0 });
    const [shortBreak] = warnings({ workedMinutes: 241, lunchMinutes: 14 });
    const [lunch] = warnings({ workedMinutes: 361, lunchMinutes: 59 });
    const [rest] = warnings({ minutesSincePreviousShift: 659 });

    for (const warning of [overtime, shortBreak, lunch, rest]) {
      expect(warning.detail).not.toContain("—");
    }
  });
});
