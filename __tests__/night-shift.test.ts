import { describe, expect, it } from "vitest";
import {
  countNightMinutes,
  nightBonusMinutes,
  nightEquivalentMinutes,
  nightOvertimePremiumPay,
  nightPremiumPay,
  splitNightOvertimeByTier,
} from "@/lib/night-shift";

const MONDAY = "2025-01-06";
const TUESDAY = "2025-01-07";
const WEDNESDAY = "2025-01-08";

const dateAt = (timestamp: string) => new Date(timestamp);

describe("countNightMinutes", () => {
  it("counts nothing for a shift that never reaches the night window", () => {
    expect(
      countNightMinutes(
        dateAt(`${MONDAY}T08:00`),
        dateAt(`${MONDAY}T17:48`),
        dateAt(`${MONDAY}T12:00`),
        dateAt(`${MONDAY}T13:00`),
      ),
    ).toBe(0);
  });

  it("counts the whole window for a shift that spans it from end to end", () => {
    expect(
      countNightMinutes(
        dateAt(`${MONDAY}T20:00`),
        dateAt(`${TUESDAY}T05:00`),
        dateAt(`${MONDAY}T20:30`),
        dateAt(`${MONDAY}T21:30`),
      ),
    ).toBe(420);
  });

  it("counts only the slice that falls between 22h and 5h", () => {
    expect(
      countNightMinutes(
        dateAt(`${MONDAY}T20:00`),
        dateAt(`${TUESDAY}T07:00`),
        dateAt(`${MONDAY}T20:30`),
        dateAt(`${MONDAY}T21:30`),
      ),
    ).toBe(420);
  });

  it("discounts a lunch break taken inside the window", () => {
    expect(
      countNightMinutes(
        dateAt(`${MONDAY}T20:00`),
        dateAt(`${TUESDAY}T05:00`),
        dateAt(`${TUESDAY}T00:00`),
        dateAt(`${TUESDAY}T01:00`),
      ),
    ).toBe(360);
  });

  it("adds up every night window a long shift crosses", () => {
    expect(
      countNightMinutes(
        dateAt(`${MONDAY}T20:00`),
        dateAt(`${WEDNESDAY}T06:00`),
        dateAt(`${TUESDAY}T12:00`),
        dateAt(`${TUESDAY}T13:00`),
      ),
    ).toBe(840);
  });

  it("ignores a shift that starts exactly when the window closes", () => {
    expect(
      countNightMinutes(
        dateAt(`${MONDAY}T05:00`),
        dateAt(`${MONDAY}T22:00`),
        dateAt(`${MONDAY}T12:00`),
        dateAt(`${MONDAY}T13:00`),
      ),
    ).toBe(0);
  });
});

describe("nightEquivalentMinutes", () => {
  it("turns two reduced night hours into two full hours", () => {
    expect(nightEquivalentMinutes(105)).toBe(120);
  });

  it("keeps zero at zero", () => {
    expect(nightEquivalentMinutes(0)).toBe(0);
  });

  it("rounds the whole night window to the nearest minute", () => {
    expect(nightEquivalentMinutes(420)).toBe(480);
    expect(nightEquivalentMinutes(360)).toBe(411);
  });
});

describe("nightBonusMinutes", () => {
  it("credits only the difference the reduced hour creates", () => {
    expect(nightBonusMinutes(420)).toBe(60);
    expect(nightBonusMinutes(360)).toBe(51);
  });

  it("credits nothing when no night minute was worked", () => {
    expect(nightBonusMinutes(0)).toBe(0);
  });
});

describe("nightPremiumPay", () => {
  it("adds twenty percent on top of every night hour worked", () => {
    expect(nightPremiumPay(480, 13.6364)).toBeCloseTo(21.82, 2);
  });

  it("prices a fraction of a night hour proportionally", () => {
    expect(nightPremiumPay(30, 20)).toBe(2);
  });

  it("pays nothing without a night minute", () => {
    expect(nightPremiumPay(0, 20)).toBe(0);
  });
});

describe("splitNightOvertimeByTier", () => {
  it("conserves cumulative night credits across the timeline and both tier boundaries", () => {
    const expectedCases = 13;
    const cases = [
      ["night before overtime", "22:00", "23:45", "+05:00", "+13:00", 480, 600, 105, 120, 0, 0],
      ["night during overtime at the tier limit", "13:00", "21:00", "22:00", "23:45", 480, 600, 105, 120, 120, 0],
      ["below the tier limit", "13:00", "21:00", "22:00", "23:44", 480, 599, 104, 119, 119, 0],
      ["above the tier limit", "13:00", "21:00", "22:00", "23:46", 480, 601, 106, 121, 120, 1],
      ["minute starting at 21:59", "21:59", "21:59", "21:59", "22:00", 0, 1, 0, 0, 0, 0],
      ["minute starting at 22:00", "22:00", "22:00", "22:00", "22:01", 0, 1, 1, 1, 1, 0],
      ["minute starting at 04:59", "+04:59", "+04:59", "+04:59", "+05:00", 0, 1, 1, 1, 1, 0],
      ["minute starting at 05:00", "+05:00", "+05:00", "+05:00", "+05:01", 0, 1, 0, 0, 0, 0],
      ["crossing midnight in overtime", "22:00", "22:00", "22:00", "+00:01", 0, 138, 121, 138, 120, 18],
      ["break fully in night overtime", "22:00", "22:01", "22:02", "22:05", 1, 5, 4, 5, 4, 0],
      ["break partly in night overtime", "20:59", "21:59", "22:01", "22:05", 60, 65, 4, 5, 5, 0],
      ["night without overtime", "22:00", "22:00", "22:00", "23:45", 120, 120, 105, 120, 0, 0],
      ["overtime without night", "08:00", "12:00", "13:00", "19:00", 480, 600, 0, 0, 0, 0],
    ] as const;
    const onJourneyDay = (time: string) =>
      dateAt(time.startsWith("+") ? `${TUESDAY}T${time.slice(1)}` : `${MONDAY}T${time}`);
    expect(cases).toHaveLength(expectedCases);
    let measured = 0;
    const exempt = 0;

    for (const [
      name,
      entry,
      lunchStart,
      lunchEnd,
      exit,
      expectedMinutes,
      worked,
      nightReal,
      night,
      first,
      extra,
    ] of cases) {
      const entryDate = onJourneyDay(entry);
      const lunchStartDate = onJourneyDay(lunchStart);
      const lunchEndDate = onJourneyDay(lunchEnd);
      const exitDate = onJourneyDay(exit);
      const actualMinutes =
        (lunchStartDate.getTime() - entryDate.getTime() + exitDate.getTime() - lunchEndDate.getTime()) / 60_000;
      const nightActual = countNightMinutes(entryDate, exitDate, lunchStartDate, lunchEndDate);
      const nightCredited = nightEquivalentMinutes(nightActual);
      const workedCredited = actualMinutes - nightActual + nightCredited;
      expect(nightActual, name).toBe(nightReal);
      expect(nightCredited, name).toBe(night);
      expect(workedCredited, name).toBe(worked);

      const overtimeMinutes = Math.max(0, workedCredited - expectedMinutes);
      const firstTierMinutes = Math.min(120, overtimeMinutes);
      const extraTierMinutes = overtimeMinutes - firstTierMinutes;
      const tiers = splitNightOvertimeByTier({
        entryDate,
        lunchStartDate,
        lunchEndDate,
        exitDate,
        expectedMinutes,
        firstTierMinutes,
      });
      expect(tiers, name).toEqual({ firstTierNightMinutes: first, extraTierNightMinutes: extra });
      expect(tiers.firstTierNightMinutes, name).toBeGreaterThanOrEqual(0);
      expect(tiers.firstTierNightMinutes, name).toBeLessThanOrEqual(firstTierMinutes);
      expect(tiers.extraTierNightMinutes, name).toBeGreaterThanOrEqual(0);
      expect(tiers.extraTierNightMinutes, name).toBeLessThanOrEqual(extraTierMinutes);
      expect(tiers.firstTierNightMinutes + tiers.extraTierNightMinutes, name).toBe(first + extra);
      measured += 1;
    }

    expect(measured + exempt).toBe(expectedCases);
  });

  it("splits one real minute's two night credits across the tiers", () => {
    expect(nightEquivalentMinutes(3)).toBe(3);
    expect(nightEquivalentMinutes(4)).toBe(5);
    expect(
      splitNightOvertimeByTier({
        entryDate: dateAt(`${MONDAY}T22:00`),
        lunchStartDate: dateAt(`${MONDAY}T22:01`),
        lunchEndDate: dateAt(`${MONDAY}T22:02`),
        exitDate: dateAt(`${MONDAY}T22:05`),
        expectedMinutes: 0,
        firstTierMinutes: 4,
      }),
    ).toEqual({ firstTierNightMinutes: 4, extraTierNightMinutes: 1 });
  });

  it("clips the working span at the exit before or during a planned break", () => {
    const input = {
      entryDate: dateAt(`${MONDAY}T22:00`),
      lunchStartDate: dateAt(`${MONDAY}T22:03`),
      lunchEndDate: dateAt(`${MONDAY}T22:30`),
      exitDate: dateAt(`${MONDAY}T22:02`),
      expectedMinutes: 0,
      firstTierMinutes: 2,
    };
    expect(splitNightOvertimeByTier(input)).toEqual({ firstTierNightMinutes: 2, extraTierNightMinutes: 0 });
    expect(splitNightOvertimeByTier({ ...input, exitDate: dateAt(`${MONDAY}T22:15`) })).toEqual({
      firstTierNightMinutes: 2,
      extraTierNightMinutes: 1,
    });
  });

  it("does not credit a minute that straddles the end of the night window", () => {
    const entryDate = dateAt(`${TUESDAY}T04:59:30`);
    const exitDate = dateAt(`${TUESDAY}T05:01`);
    expect(countNightMinutes(entryDate, exitDate, entryDate, entryDate)).toBe(0);
    expect(
      splitNightOvertimeByTier({
        entryDate,
        exitDate,
        lunchStartDate: entryDate,
        lunchEndDate: entryDate,
        expectedMinutes: 0,
        firstTierMinutes: 1,
      }),
    ).toEqual({ firstTierNightMinutes: 0, extraTierNightMinutes: 0 });
  });

  it("returns empty tiers for invalid dates, reversed times and an empty shift", () => {
    const input = {
      entryDate: dateAt(`${MONDAY}T22:00`),
      lunchStartDate: dateAt(`${MONDAY}T22:15`),
      lunchEndDate: dateAt(`${MONDAY}T22:30`),
      exitDate: dateAt(`${MONDAY}T22:45`),
      expectedMinutes: 0,
      firstTierMinutes: 120,
    };
    const empty = { firstTierNightMinutes: 0, extraTierNightMinutes: 0 };
    expect(splitNightOvertimeByTier({ ...input, exitDate: dateAt("invalid") })).toEqual(empty);
    expect(splitNightOvertimeByTier({ ...input, lunchStartDate: dateAt(`${MONDAY}T21:59`) })).toEqual(empty);
    expect(splitNightOvertimeByTier({ ...input, lunchEndDate: dateAt(`${MONDAY}T22:14`) })).toEqual(empty);
    expect(splitNightOvertimeByTier({ ...input, exitDate: input.entryDate })).toEqual(empty);
    expect(
      splitNightOvertimeByTier({ ...input, lunchStartDate: input.entryDate, lunchEndDate: input.exitDate }),
    ).toEqual(empty);
  });
});

describe("nightOvertimePremiumPay", () => {
  it("applies only the overtime percentage to the ordinary night premium without rounding", () => {
    expect(nightOvertimePremiumPay(0, 20, 50)).toBe(0);
    expect(nightOvertimePremiumPay(120, 20, 0)).toBe(0);
    expect(nightOvertimePremiumPay(120, 20, 50)).toBe(4);
    expect(nightOvertimePremiumPay(120, 20, 100)).toBe(8);
    expect(nightOvertimePremiumPay(1, 21.41, 50)).toBeCloseTo(0.03568333333333334, 12);
  });
});
