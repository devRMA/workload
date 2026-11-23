import { act, render, renderHook, screen } from "@testing-library/react";
import { differenceInCalendarDays } from "date-fns";
import { createElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DaySummary } from "@/components/organisms/day-summary";
import { calculateSuggestedExit, calculateWorkStats, useWorkCalculator } from "@/hooks/use-work-calculator";
import { buildDayBreakdown } from "@/lib/day-breakdown";

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

  const WEEKDAY_CLASS_DATES = [
    "2025-01-05",
    MONDAY,
    "2025-01-07",
    "2025-01-08",
    "2025-01-09",
    "2025-01-10",
    SATURDAY,
  ] as const;

  it("sweeps all seven weekday classes exactly once", () => {
    expect(WEEKDAY_CLASS_DATES).toHaveLength(7);
    expect(new Set(WEEKDAY_CLASS_DATES.map((date) => new Date(`${date}T08:00`).getDay()))).toEqual(
      new Set([0, 1, 2, 3, 4, 5, 6]),
    );
  });

  for (const date of WEEKDAY_CLASS_DATES) {
    it(`splits the same overtime the same way on ${date}`, () => {
      const stats = calculateWorkStats(
        `${date}T08:00`,
        `${date}T12:00`,
        `${date}T13:00`,
        `${date}T20:00`,
        FULL_DAY_MINUTES,
      );

      expect(stats.firstTierMinutes).toBe(120);
      expect(stats.extraTierMinutes).toBe(12);
    });
  }

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

  it("distinguishes when overtime occurs for shifts with identical credited totals", () => {
    const beforeOvertime = calculateWorkStats(
      `${MONDAY}T22:00`,
      `${MONDAY}T23:45`,
      "2025-01-07T05:00",
      "2025-01-07T13:00",
      480,
    );
    const duringOvertime = calculateWorkStats(
      `${MONDAY}T13:00`,
      `${MONDAY}T21:00`,
      `${MONDAY}T22:00`,
      `${MONDAY}T23:45`,
      480,
    );
    expect(beforeOvertime.totalWorked).toBe(600);
    expect(beforeOvertime.nightMinutes).toBe(120);
    expect(beforeOvertime.firstTierMinutes + beforeOvertime.extraTierMinutes).toBe(120);
    expect(duringOvertime.totalWorked).toBe(beforeOvertime.totalWorked);
    expect(duringOvertime.nightMinutes).toBe(beforeOvertime.nightMinutes);
    expect(duringOvertime.firstTierMinutes + duringOvertime.extraTierMinutes).toBe(
      beforeOvertime.firstTierMinutes + beforeOvertime.extraTierMinutes,
    );
    expect(beforeOvertime.firstTierNightMinutes).toBe(0);
    expect(duringOvertime.firstTierNightMinutes).toBe(120);
    expect(beforeOvertime.extraTierNightMinutes).toBe(0);
    expect(duringOvertime.extraTierNightMinutes).toBe(0);
  });

  it("allocates night overtime to the same tiers on weekends", () => {
    const stats = calculateWorkStats(
      `${SATURDAY}T13:00`,
      `${SATURDAY}T21:00`,
      `${SATURDAY}T22:00`,
      `${SATURDAY}T23:45`,
      480,
    );
    expect(stats).toEqual({
      balance: 120,
      nightMinutes: 120,
      firstTierMinutes: 120,
      extraTierMinutes: 0,
      firstTierNightMinutes: 120,
      extraTierNightMinutes: 0,
      totalWorked: 600,
    });
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
      firstTierNightMinutes: 0,
      extraTierNightMinutes: 0,
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

  it("ignores the old projected exit and a manual draft that was never entered", () => {
    vi.setSystemTime(new Date(`${MONDAY}T22:30:00`));
    localStorage.setItem("lastExit", `${MONDAY}T22:00`);
    const previousDay = renderHook(() => useWorkCalculator());
    act(() => {
      previousDay.result.current.setExitOverride(`${MONDAY}T22:00`);
      previousDay.result.current.setIsManualExit(true);
    });
    previousDay.unmount();

    vi.setSystemTime(new Date("2025-01-07T08:00:00"));
    const nextDay = renderHook(() => useWorkCalculator());

    expect(nextDay.result.current.minutesSincePreviousShift).toBeNull();
  });

  it("keeps the gap from an explicitly entered exit across a reload on the next day", () => {
    vi.setSystemTime(new Date(`${MONDAY}T22:30:00`));
    const previousDay = renderHook(() => useWorkCalculator());
    act(() => previousDay.result.current.recordExit(`${MONDAY}T22:00`));
    previousDay.unmount();

    vi.setSystemTime(new Date("2025-01-07T08:00:00"));
    const nextDay = renderHook(() => useWorkCalculator());
    expect(nextDay.result.current.minutesSincePreviousShift).toBe(600);
    act(() => nextDay.result.current.setEntry(`${MONDAY}T21:59`));
    expect(nextDay.result.current.minutesSincePreviousShift).toBeNull();
    act(() => nextDay.result.current.setEntry("2025-01-07T09:00"));
    nextDay.unmount();

    const reloaded = renderHook(() => useWorkCalculator());
    expect(reloaded.result.current.minutesSincePreviousShift).toBe(660);
  });

  it("does not promote a future or invalid exit into a previous shift", () => {
    const previousDay = renderHook(() => useWorkCalculator());
    act(() => previousDay.result.current.recordExit(`${MONDAY}T22:00`));
    expect(localStorage.getItem("enteredExit")).toBeNull();

    vi.setSystemTime(new Date(`${MONDAY}T23:00:00`));
    act(() => previousDay.result.current.recordExit(`${MONDAY}T11:00`));
    expect(localStorage.getItem("enteredExit")).toBeNull();
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

  it("delivers identical overtime stats and pay for manual and automatic exits at the same minute", () => {
    const exit = `${MONDAY}T23:45`;
    const now = new Date(exit);
    vi.setSystemTime(now);
    localStorage.setItem("workMinutes", "480");
    localStorage.setItem("entry", `${MONDAY}T13:00`);
    localStorage.setItem("lunchStart", `${MONDAY}T21:00`);
    localStorage.setItem("lunchEnd", `${MONDAY}T22:00`);
    const { result } = renderHook(() => useWorkCalculator());

    const summary = () => {
      const { stats, entry, lunchStart, lunchEnd, displayExit, workMinutes, isManualExit, currentTime } =
        result.current;
      const times = { entry, lunchStart, lunchEnd, exit: displayExit };
      return createElement(DaySummary, {
        ...stats,
        times,
        breakdown: buildDayBreakdown({ ...times, expectedMinutes: workMinutes, isManualExit, now: currentTime }),
        balanceMinutes: stats.balance,
        firstTierRate: result.current.firstTierRate,
        extraTierRate: result.current.extraTierRate,
        grossHourlyRate: 20,
        warnings: [],
      });
    };

    expect(result.current.isManualExit).toBe(false);
    expect(result.current.currentTime).toEqual(now);
    expect(result.current.displayExit).toBe(`${MONDAY}T22:00`);
    const automatic = result.current.stats;
    expect(automatic).toEqual({
      balance: 120,
      nightMinutes: 120,
      firstTierMinutes: 120,
      extraTierMinutes: 0,
      firstTierNightMinutes: 120,
      extraTierNightMinutes: 0,
      totalWorked: 600,
    });
    const { rerender } = render(summary());
    expect(screen.getByText("Extra 50%").parentElement).toHaveTextContent(/R\$\s64,00$/);
    expect(screen.getByText("Adicional noturno 20%").parentElement).toHaveTextContent(/R\$\s8,00$/);
    expect(screen.getByText("DSR de extras e noturno").parentElement).toHaveTextContent(/R\$\s10,67$/);

    act(() => result.current.recordExit(exit));
    expect(result.current.isManualExit).toBe(true);
    expect(result.current.displayExit).toBe(exit);
    expect(result.current.stats).toEqual(automatic);
    rerender(summary());
    expect(screen.getByText("Extra 50%").parentElement).toHaveTextContent(/R\$\s64,00$/);
    expect(screen.getByText("Adicional noturno 20%").parentElement).toHaveTextContent(/R\$\s8,00$/);
    expect(screen.getByText("DSR de extras e noturno").parentElement).toHaveTextContent(/R\$\s10,67$/);
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

  it("never writes a default over a stored value before the restore completes", () => {
    const storedValues: Record<string, string> = {
      workMinutes: "480",
      firstTierRate: "60",
      extraTierRate: "110",
      entry: `${MONDAY}T07:30`,
      lunchStart: `${MONDAY}T11:30`,
      lunchEnd: `${MONDAY}T12:30`,
      isManualExit: "true",
      exitOverride: `${MONDAY}T16:18`,
      enteredExit: `${MONDAY}T16:18`,
      previousEnteredExit: `${SATURDAY}T16:18`,
      lastExit: `${MONDAY}T16:18`,
    };
    for (const [key, value] of Object.entries(storedValues)) {
      localStorage.setItem(key, value);
    }
    const setItem = vi.spyOn(Storage.prototype, "setItem");

    renderHook(() => useWorkCalculator());

    const writes = setItem.mock.calls as [string, string][];
    for (const [key, seeded] of Object.entries(storedValues)) {
      const firstWrite = writes.find(([writtenKey]) => writtenKey === key);
      expect(firstWrite?.[1] ?? seeded, `${key} was written before the restore completed`).toBe(seeded);
      expect(localStorage.getItem(key), `${key} did not survive the restore byte for byte`).toBe(seeded);
    }
    setItem.mockRestore();
  });
});
