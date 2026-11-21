import { describe, expect, it } from "vitest";
import { DAILY_OVERTIME_LIMIT_MINUTES, splitOvertime } from "@/lib/overtime-tiers";

describe("splitOvertime", () => {
  it("puts the whole excess in the first tier below the two-hour ceiling", () => {
    expect(splitOvertime(72)).toEqual({ firstTierMinutes: 72, extraTierMinutes: 0 });
  });

  it("fills the first tier exactly at the two-hour ceiling", () => {
    expect(splitOvertime(120)).toEqual({ firstTierMinutes: 120, extraTierMinutes: 0 });
  });

  it("spills one minute past the ceiling into the second tier", () => {
    expect(splitOvertime(121)).toEqual({ firstTierMinutes: 120, extraTierMinutes: 1 });
  });

  it("caps the first tier and spills the rest over", () => {
    expect(splitOvertime(252)).toEqual({ firstTierMinutes: 120, extraTierMinutes: 132 });
  });

  it("splits nothing on a day with no overtime", () => {
    expect(splitOvertime(0)).toEqual({ firstTierMinutes: 0, extraTierMinutes: 0 });
  });

  it("never returns a negative second tier", () => {
    expect(splitOvertime(-30)).toEqual({ firstTierMinutes: -30, extraTierMinutes: 0 });
  });

  it("sits the ceiling where CLT art. 59 caput puts it", () => {
    expect(DAILY_OVERTIME_LIMIT_MINUTES).toBe(120);
  });
});
