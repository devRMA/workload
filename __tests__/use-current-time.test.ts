import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCurrentTime } from "@/hooks/use-current-time";

describe("useCurrentTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("exposes the current date once mounted", () => {
    const { result } = renderHook(() => useCurrentTime());

    expect(result.current).toBeInstanceOf(Date);
  });

  it("advances every second", () => {
    const { result } = renderHook(() => useCurrentTime());
    const firstTick = result.current;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(Number(result.current)).toBeGreaterThan(Number(firstTick));
  });

  it("stops ticking after unmount", () => {
    const { result, unmount } = renderHook(() => useCurrentTime());
    const lastTick = result.current;

    unmount();
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current).toBe(lastTick);
  });
});
