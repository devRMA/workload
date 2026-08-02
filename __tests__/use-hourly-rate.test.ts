import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useHourlyRate } from "@/hooks/use-hourly-rate";
import { HOURLY_RATE_KEY } from "@/lib/storage";

describe("useHourlyRate", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reads the stored hourly rate", () => {
    localStorage.setItem(HOURLY_RATE_KEY, "20.45");

    const { result } = renderHook(() => useHourlyRate());

    expect(result.current).toBe(20.45);
  });

  it("stays unknown while nothing was stored", () => {
    const { result } = renderHook(() => useHourlyRate());

    expect(result.current).toBeNull();
  });

  it("treats a zeroed rate as unknown instead of free work", () => {
    localStorage.setItem(HOURLY_RATE_KEY, "0");

    const { result } = renderHook(() => useHourlyRate());

    expect(result.current).toBeNull();
  });
});
