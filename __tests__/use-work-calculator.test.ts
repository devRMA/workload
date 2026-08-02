import { act, renderHook } from "@testing-library/react";
import { differenceInCalendarDays } from "date-fns";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { calculateSuggestedExit, calculateWorkStats, useWorkCalculator } from "@/hooks/use-work-calculator";

const FULL_DAY_MINUTES = 8 * 60 + 48;
const MONDAY = "2025-01-06";
const SATURDAY = "2025-01-11";

describe("calculateSuggestedExit", () => {
  it("pushes the remaining minutes past the end of lunch", () => {
    expect(calculateSuggestedExit(`${MONDAY}T08:00`, `${MONDAY}T12:00`, `${MONDAY}T13:00`, FULL_DAY_MINUTES)).toBe(
      `${MONDAY}T17:48`,
    );
  });

  it("suggests nothing when the times are out of order", () => {
    expect(calculateSuggestedExit(`${MONDAY}T14:00`, `${MONDAY}T12:00`, `${MONDAY}T13:00`, FULL_DAY_MINUTES)).toBe("");
  });

  it("suggests nothing when a timestamp is unparseable", () => {
    expect(calculateSuggestedExit("not-a-date", "", "", FULL_DAY_MINUTES)).toBe("");
  });

  it("never suggests an exit before the end of lunch", () => {
    expect(calculateSuggestedExit(`${MONDAY}T08:00`, `${MONDAY}T18:00`, `${MONDAY}T19:00`, FULL_DAY_MINUTES)).toBe(
      `${MONDAY}T19:00`,
    );
  });

  const balanceAtSuggestedExit = (entry: string, lunchStart: string, lunchEnd: string, workMinutes: number) =>
    calculateWorkStats(
      entry,
      lunchStart,
      lunchEnd,
      calculateSuggestedExit(entry, lunchStart, lunchEnd, workMinutes),
      workMinutes,
    ).balance;

  it("lands on a zero balance for a daytime journey", () => {
    expect(balanceAtSuggestedExit(`${MONDAY}T08:00`, `${MONDAY}T12:00`, `${MONDAY}T13:00`, FULL_DAY_MINUTES)).toBe(0);
  });

  it("credits the reduced night hour so a night journey also lands on zero", () => {
    expect(balanceAtSuggestedExit(`${MONDAY}T21:00`, "2025-01-07T01:00", "2025-01-07T02:00", FULL_DAY_MINUTES)).toBe(0);
  });

  it("gets within a minute when the reduced night hour makes zero unreachable", () => {
    const balance = balanceAtSuggestedExit(`${MONDAY}T22:00`, "2025-01-07T00:00", "2025-01-07T00:30", 420);

    expect(Math.abs(balance)).toBeLessThanOrEqual(1);
  });
});

describe("calculateWorkStats", () => {
  const statsFor = (exit: string, workMinutes = FULL_DAY_MINUTES) =>
    calculateWorkStats(`${MONDAY}T08:00`, `${MONDAY}T12:00`, `${MONDAY}T13:00`, exit, workMinutes);

  it("balances to zero on an exact day", () => {
    const stats = statsFor(`${MONDAY}T17:48`);

    expect(stats.balance).toBe(0);
    expect(stats.totalWorked).toBe(528);
    expect(stats.firstTierMinutes).toBe(0);
    expect(stats.extraTierMinutes).toBe(0);
  });

  it("reports a negative balance when leaving early", () => {
    const stats = statsFor(`${MONDAY}T16:48`);

    expect(stats.balance).toBe(-60);
    expect(stats.firstTierMinutes).toBe(0);
    expect(stats.extraTierMinutes).toBe(0);
  });

  it("fills the first overtime tier before the next one", () => {
    const stats = statsFor(`${MONDAY}T19:00`);

    expect(stats.balance).toBe(72);
    expect(stats.firstTierMinutes).toBe(72);
    expect(stats.extraTierMinutes).toBe(0);
  });

  it("caps the first tier at two hours and spills the rest over", () => {
    const stats = statsFor(`${MONDAY}T20:00`);

    expect(stats.balance).toBe(132);
    expect(stats.firstTierMinutes).toBe(120);
    expect(stats.extraTierMinutes).toBe(12);
  });

  it("pays all weekend overtime at the higher tier", () => {
    const stats = calculateWorkStats(
      `${SATURDAY}T08:00`,
      `${SATURDAY}T12:00`,
      `${SATURDAY}T13:00`,
      `${SATURDAY}T20:00`,
      FULL_DAY_MINUTES,
    );

    expect(stats.firstTierMinutes).toBe(0);
    expect(stats.extraTierMinutes).toBe(132);
  });

  it("converts night minutes with the reduced night hour", () => {
    const stats = calculateWorkStats(
      `${MONDAY}T20:00`,
      "2025-01-07T00:00",
      "2025-01-07T01:00",
      "2025-01-07T05:00",
      480,
    );

    expect(stats.nightMinutes).toBe(411);
    expect(stats.totalWorked).toBe(531);
    expect(stats.balance).toBe(51);
  });

  it("excludes a lunch break taken inside the night window", () => {
    const stats = calculateWorkStats(`${MONDAY}T21:00`, `${MONDAY}T23:00`, "2025-01-07T00:00", "2025-01-07T04:00", 480);

    const minutesInsideNightWindow = 360;
    const lunchMinutesInsideNightWindow = 60;
    const paidNightMinutes = minutesInsideNightWindow - lunchMinutesInsideNightWindow;

    expect(stats.nightMinutes).toBe(Math.round(paidNightMinutes * (60 / 52.5)));
    expect(stats.nightMinutes).toBe(343);
  });

  it("counts no night minutes for a purely daytime shift", () => {
    expect(statsFor(`${MONDAY}T17:48`).nightMinutes).toBe(0);
  });

  it("returns zeroed stats when the times are out of order", () => {
    const stats = calculateWorkStats(
      `${MONDAY}T08:00`,
      `${MONDAY}T12:00`,
      `${MONDAY}T13:00`,
      `${MONDAY}T09:00`,
      FULL_DAY_MINUTES,
    );

    expect(stats).toEqual({
      balance: 0,
      nightMinutes: 0,
      firstTierMinutes: 0,
      extraTierMinutes: 0,
      totalWorked: 0,
    });
  });

  it("returns zeroed stats when a timestamp is unparseable", () => {
    expect(calculateWorkStats("nope", "nope", "nope", "nope", FULL_DAY_MINUTES).totalWorked).toBe(0);
  });
});

describe("useWorkCalculator", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(`${MONDAY}T10:00:00`));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts from the legal overtime defaults", () => {
    const { result } = renderHook(() => useWorkCalculator());

    expect(result.current.workMinutes).toBe(FULL_DAY_MINUTES);
    expect(result.current.firstTierRate).toBe(50);
    expect(result.current.extraTierRate).toBe(100);
  });

  it("restores stored values", () => {
    localStorage.setItem("workMinutes", "480");
    localStorage.setItem("firstTierRate", "75");
    localStorage.setItem("entry", `${MONDAY}T09:00`);

    const { result } = renderHook(() => useWorkCalculator());

    expect(result.current.workMinutes).toBe(480);
    expect(result.current.firstTierRate).toBe(75);
    expect(result.current.entry).toBe(`${MONDAY}T09:00`);
  });

  it("ignores stored timestamps that are not usable", () => {
    localStorage.setItem("entry", "08:00");
    localStorage.setItem("lunchStart", `${MONDAY}Tnonsense`);

    const { result } = renderHook(() => useWorkCalculator());

    expect(result.current.entry).toBe(`${MONDAY}T08:00`);
    expect(result.current.lunchStart).toBe(`${MONDAY}T12:00`);
  });

  it("brings a journey stored on an earlier day back at the same hours", () => {
    localStorage.setItem("entry", "2025-01-02T09:15");
    localStorage.setItem("lunchStart", "2025-01-02T12:30");
    localStorage.setItem("lunchEnd", "2025-01-02T13:30");
    localStorage.setItem("exitOverride", "2025-01-02T18:20");

    const { result } = renderHook(() => useWorkCalculator());

    expect(result.current.entry).toBe(`${MONDAY}T09:15`);
    expect(result.current.lunchStart).toBe(`${MONDAY}T12:30`);
    expect(result.current.lunchEnd).toBe(`${MONDAY}T13:30`);
    expect(result.current.exitOverride).toBe(`${MONDAY}T18:20`);
  });

  it("keeps the overnight gap of a stored night journey", () => {
    localStorage.setItem("entry", "2025-01-01T22:00");
    localStorage.setItem("lunchStart", "2025-01-02T01:00");
    localStorage.setItem("lunchEnd", "2025-01-02T02:00");
    localStorage.setItem("exitOverride", "2025-01-02T06:00");
    localStorage.setItem("isManualExit", "true");

    const { result } = renderHook(() => useWorkCalculator());

    expect(result.current.entry).toBe(`${MONDAY}T22:00`);
    expect(result.current.lunchStart).toBe("2025-01-07T01:00");
    expect(result.current.isManualExit).toBe(true);
    expect(result.current.displayExit).toBe("2025-01-07T06:00");
    expect(differenceInCalendarDays(new Date(result.current.displayExit), new Date(result.current.entry))).toBe(1);
  });

  it("persists the manual exit so a reload keeps it", () => {
    const { result, unmount } = renderHook(() => useWorkCalculator());

    act(() => {
      result.current.setIsManualExit(true);
      result.current.setExitOverride(`${MONDAY}T19:30`);
    });
    unmount();

    const reloaded = renderHook(() => useWorkCalculator());

    expect(reloaded.result.current.isManualExit).toBe(true);
    expect(reloaded.result.current.exitOverride).toBe(`${MONDAY}T19:30`);
  });

  it("reports no issue for the default journey", () => {
    const { result } = renderHook(() => useWorkCalculator());

    expect(result.current.issue).toBeNull();
  });

  it("reports the moment that breaks the journey order", () => {
    const { result } = renderHook(() => useWorkCalculator());

    act(() => {
      result.current.setLunchStart(`${MONDAY}T07:00`);
    });

    expect(result.current.issue?.field).toBe("lunchStart");
    expect(result.current.stats.totalWorked).toBe(0);
  });

  it("does not overwrite stored values before restoring them", () => {
    localStorage.setItem("workMinutes", "400");

    renderHook(() => useWorkCalculator());

    expect(localStorage.getItem("workMinutes")).toBe("400");
  });

  it("persists changes made after the restore", () => {
    const { result } = renderHook(() => useWorkCalculator());

    act(() => {
      result.current.setWorkMinutes(480);
      result.current.setFirstTierRate(75);
      result.current.setExtraTierRate(110);
    });

    expect(localStorage.getItem("workMinutes")).toBe("480");
    expect(localStorage.getItem("firstTierRate")).toBe("75");
    expect(localStorage.getItem("extraTierRate")).toBe("110");
  });

  it("prefers the manual exit over the suggested one", () => {
    const { result } = renderHook(() => useWorkCalculator());

    expect(result.current.displayExit).toBe(result.current.suggestedExit);

    act(() => {
      result.current.setIsManualExit(true);
      result.current.setExitOverride(`${MONDAY}T18:00`);
    });

    expect(result.current.displayExit).toBe(`${MONDAY}T18:00`);
  });

  it("exposes the client clock once the browser has one", () => {
    const { result } = renderHook(() => useWorkCalculator());

    expect(result.current.currentTime).toEqual(new Date(`${MONDAY}T10:00:00`));
  });

  it("keeps the balance at zero while the suggested exit is still ahead", () => {
    const { result } = renderHook(() => useWorkCalculator());

    expect(result.current.displayExit).toBe(`${MONDAY}T17:48`);
    expect(result.current.stats.balance).toBe(0);
    expect(result.current.stats.firstTierMinutes).toBe(0);
  });

  it("grows the balance with the clock once the suggested exit has passed", () => {
    vi.setSystemTime(new Date(`${MONDAY}T19:00:00`));

    const { result } = renderHook(() => useWorkCalculator());

    expect(result.current.displayExit).toBe(`${MONDAY}T17:48`);
    expect(result.current.stats.balance).toBe(72);
    expect(result.current.stats.firstTierMinutes).toBe(72);
  });

  it("stops counting at the registered exit in manual mode, whatever the clock says", () => {
    vi.setSystemTime(new Date(`${MONDAY}T19:00:00`));
    localStorage.setItem("isManualExit", "true");
    localStorage.setItem("exitOverride", `${MONDAY}T16:00`);

    const { result } = renderHook(() => useWorkCalculator());

    expect(result.current.stats.balance).toBe(-108);
  });

  it("restores every default, including the overtime rates", () => {
    const { result } = renderHook(() => useWorkCalculator());

    act(() => {
      result.current.setWorkMinutes(480);
      result.current.setFirstTierRate(75);
      result.current.setExtraTierRate(120);
      result.current.setIsManualExit(true);
      result.current.setExitOverride(`${MONDAY}T22:00`);
    });

    act(() => {
      result.current.resetDefaults();
    });

    expect(result.current.workMinutes).toBe(FULL_DAY_MINUTES);
    expect(result.current.firstTierRate).toBe(50);
    expect(result.current.extraTierRate).toBe(100);
    expect(result.current.isManualExit).toBe(false);
    expect(result.current.exitOverride).toBe("");
    expect(result.current.entry).toBe(`${MONDAY}T08:00`);
    expect(result.current.lunchStart).toBe(`${MONDAY}T12:00`);
    expect(result.current.lunchEnd).toBe(`${MONDAY}T13:00`);
  });
});
