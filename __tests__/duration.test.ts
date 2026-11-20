import { describe, expect, it } from "vitest";
import {
  formatClock,
  formatHoursAndMinutes,
  formatPaddedDuration,
  formatSignedHoursAndMinutes,
  isRealDuration,
  minutesToHours,
  parsePaddedDuration,
} from "@/lib/duration";

describe("splitting minutes into hours and minutes", () => {
  it("splits minutes into whole hours and a rounded remainder", () => {
    expect(formatPaddedDuration(0)).toBe("00:00");
    expect(formatPaddedDuration(59)).toBe("00:59");
    expect(formatPaddedDuration(60)).toBe("01:00");
    expect(formatPaddedDuration(528)).toBe("08:48");
    expect(formatPaddedDuration(90.4)).toBe("01:30");
  });

  it("carries a rounded-up remainder into the hour instead of reporting 60 minutes", () => {
    expect(formatHoursAndMinutes(59.6)).toBe("1h 0m");
    expect(formatPaddedDuration(59.6)).toBe("01:00");
    expect(formatPaddedDuration(119.6)).toBe("02:00");
  });
});

describe("formatHoursAndMinutes", () => {
  it("reads as hours and minutes", () => {
    expect(formatHoursAndMinutes(0)).toBe("0h 0m");
    expect(formatHoursAndMinutes(125)).toBe("2h 5m");
  });
});

describe("formatSignedHoursAndMinutes", () => {
  it("always carries a sign", () => {
    expect(formatSignedHoursAndMinutes(0)).toBe("+0h 0m");
    expect(formatSignedHoursAndMinutes(75)).toBe("+1h 15m");
    expect(formatSignedHoursAndMinutes(-75)).toBe("-1h 15m");
  });
});

describe("formatPaddedDuration and parsePaddedDuration", () => {
  it("round-trips a padded duration", () => {
    expect(formatPaddedDuration(528)).toBe("08:48");
    expect(formatPaddedDuration(0)).toBe("00:00");
    expect(parsePaddedDuration("08:48")).toBe(528);
    expect(parsePaddedDuration(formatPaddedDuration(479))).toBe(479);
  });
});

describe("formatClock", () => {
  it("pads every part of the clock", () => {
    expect(formatClock(0)).toBe("00:00:00");
    expect(formatClock(3661)).toBe("01:01:01");
    expect(formatClock(86399)).toBe("23:59:59");
    expect(formatClock(1.9)).toBe("00:00:01");
  });
});

describe("minutesToHours", () => {
  it("converts minutes to fractional hours", () => {
    expect(minutesToHours(0)).toBe(0);
    expect(minutesToHours(528)).toBeCloseTo(8.8, 10);
  });
});

describe("isRealDuration", () => {
  it("accepts durations inside a day", () => {
    expect(isRealDuration("00:00")).toBe(true);
    expect(isRealDuration("08:48")).toBe(true);
    expect(isRealDuration("23:59")).toBe(true);
  });

  it("rejects impossible hours and minutes", () => {
    expect(isRealDuration("24:00")).toBe(false);
    expect(isRealDuration("08:60")).toBe(false);
    expect(isRealDuration("ab:cd")).toBe(false);
  });
});
