import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useGrossHourlyRate } from "@/hooks/use-gross-hourly-rate";
import { GROSS_SALARY_KEY, LEGACY_HOURLY_RATE_KEY, MONTHLY_HOURS_KEY } from "@/lib/storage";

describe("useGrossHourlyRate", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("derives the gross hourly rate from the stored salary and divisor", () => {
    localStorage.setItem(GROSS_SALARY_KEY, "3000");
    localStorage.setItem(MONTHLY_HOURS_KEY, "220");

    const { result } = renderHook(() => useGrossHourlyRate());

    expect(result.current).toBeCloseTo(13.6364, 4);
  });

  it("stays unknown while no salary was stored", () => {
    const { result } = renderHook(() => useGrossHourlyRate());

    expect(result.current).toBeNull();
  });

  it("treats a zeroed salary as unknown instead of free work", () => {
    localStorage.setItem(GROSS_SALARY_KEY, "0");
    localStorage.setItem(MONTHLY_HOURS_KEY, "220");

    const { result } = renderHook(() => useGrossHourlyRate());

    expect(result.current).toBeNull();
  });

  it("drops the net rate an older version left behind instead of pricing overtime with it", () => {
    localStorage.setItem(LEGACY_HOURLY_RATE_KEY, "12.5064");

    const { result } = renderHook(() => useGrossHourlyRate());

    expect(localStorage.getItem(LEGACY_HOURLY_RATE_KEY)).toBeNull();
    expect(result.current).toBeNull();
  });
});
