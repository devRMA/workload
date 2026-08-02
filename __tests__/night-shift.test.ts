import { describe, expect, it } from "vitest";
import { countNightMinutes, nightBonusMinutes, nightEquivalentMinutes } from "@/lib/night-shift";

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
