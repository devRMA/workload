import { describe, expect, it } from "vitest";
import { clearingScrollRanges } from "@/tests/e2e/support/reachability";

const VIEWPORT_HEIGHT = 844;
const MAX_SCROLL = 2490;
const SURFACE = { left: 16, right: 374 };
const CHROME = [
  { top: 0, bottom: 65, left: 0, right: 390, width: 390, height: 65 },
  { top: 766, bottom: 828, left: 0, right: 390, width: 390, height: 62 },
];

const ENDPOINT_TOLERANCE_PX = 0.15;

function expectEndpoint(actual: number, expected: number): void {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(ENDPOINT_TOLERANCE_PX);
}

describe("clearingScrollRanges — calibrated against legal.md §8.1's worked table", () => {
  it("DS2 clears at 1688.9 .. 2337.8", () => {
    const ranges = clearingScrollRanges({
      docTop: 2402.8,
      height: 52.2,
      ...SURFACE,
      viewportHeight: VIEWPORT_HEIGHT,
      maxScroll: MAX_SCROLL,
      fixed: CHROME,
    });
    expect(ranges).toHaveLength(1);
    expectEndpoint(ranges[0].from, 1688.9);
    expectEndpoint(ranges[0].to, 2337.8);
  });

  it("DS7 art. 59 clears at 1881.9 .. 2456.9", () => {
    const ranges = clearingScrollRanges({
      docTop: 2521.9,
      height: 126.0,
      ...SURFACE,
      viewportHeight: VIEWPORT_HEIGHT,
      maxScroll: MAX_SCROLL,
      fixed: CHROME,
    });
    expect(ranges).toHaveLength(1);
    expectEndpoint(ranges[0].from, 1881.9);
    expectEndpoint(ranges[0].to, 2456.9);
  });

  it("DS7 art. 71 clears at 1981.9 .. 2490", () => {
    const ranges = clearingScrollRanges({
      docTop: 2705.9,
      height: 42.0,
      ...SURFACE,
      viewportHeight: VIEWPORT_HEIGHT,
      maxScroll: MAX_SCROLL,
      fixed: CHROME,
    });
    expect(ranges).toHaveLength(1);
    expectEndpoint(ranges[0].from, 1981.9);
    expectEndpoint(ranges[0].to, 2490);
  });

  it("DS1 P1 clears at 2254.1 .. 2490", () => {
    const ranges = clearingScrollRanges({
      docTop: 2967.9,
      height: 52.2,
      ...SURFACE,
      viewportHeight: VIEWPORT_HEIGHT,
      maxScroll: MAX_SCROLL,
      fixed: CHROME,
    });
    expect(ranges).toHaveLength(1);
    expectEndpoint(ranges[0].from, 2254.1);
    expectEndpoint(ranges[0].to, 2490);
  });

  it("DS1 P2 clears at 2314.3 .. 2490", () => {
    const ranges = clearingScrollRanges({
      docTop: 3028.1,
      height: 52.2,
      ...SURFACE,
      viewportHeight: VIEWPORT_HEIGHT,
      maxScroll: MAX_SCROLL,
      fixed: CHROME,
    });
    expect(ranges).toHaveLength(1);
    expectEndpoint(ranges[0].from, 2314.3);
    expectEndpoint(ranges[0].to, 2490);
  });

  it("DS1 P3 clears at 2461.4 .. 2490", () => {
    const ranges = clearingScrollRanges({
      docTop: 3088.3,
      height: 139.1,
      ...SURFACE,
      viewportHeight: VIEWPORT_HEIGHT,
      maxScroll: MAX_SCROLL,
      fixed: CHROME,
    });
    expect(ranges).toHaveLength(1);
    expectEndpoint(ranges[0].from, 2461.4);
    expectEndpoint(ranges[0].to, 2490);
  });

  it("DS1 P4 has no clearing range — the empty set legal.md prints as 2504.2 .. 2490, empty", () => {
    const ranges = clearingScrollRanges({
      docTop: 3235.4,
      height: 34.8,
      ...SURFACE,
      viewportHeight: VIEWPORT_HEIGHT,
      maxScroll: MAX_SCROLL,
      fixed: CHROME,
    });
    expect(ranges).toEqual([]);
  });

  it("C1 — the containment conjunct is what makes DS1 P4 red", () => {
    const ranges = clearingScrollRanges({
      docTop: 3235.4,
      height: 34.8,
      ...SURFACE,
      viewportHeight: Number.POSITIVE_INFINITY,
      maxScroll: MAX_SCROLL,
      fixed: CHROME,
    });
    expect(ranges.length).toBeGreaterThan(0);
    expect(ranges[0].from).toBe(0);
  });

  it("C2 — the fixed-chrome conjunct is what bounds DS1 P3's range", () => {
    const ranges = clearingScrollRanges({
      docTop: 3088.3,
      height: 139.1,
      ...SURFACE,
      viewportHeight: VIEWPORT_HEIGHT,
      maxScroll: MAX_SCROLL,
      fixed: [],
    });
    expect(ranges).toHaveLength(1);
    expectEndpoint(ranges[0].from, 2383.4);
    expectEndpoint(ranges[0].to, 2490);
  });

  it("C3 — horizontal disjointness is respected", () => {
    const ranges = clearingScrollRanges({
      docTop: 3088.3,
      height: 139.1,
      ...SURFACE,
      viewportHeight: VIEWPORT_HEIGHT,
      maxScroll: MAX_SCROLL,
      fixed: [{ top: 766, bottom: 828, left: 380, right: 390, width: 10, height: 62 }],
    });
    const withoutFixed = clearingScrollRanges({
      docTop: 3088.3,
      height: 139.1,
      ...SURFACE,
      viewportHeight: VIEWPORT_HEIGHT,
      maxScroll: MAX_SCROLL,
      fixed: [],
    });
    expect(ranges).toEqual(withoutFixed);
  });

  it("C4 — the sample loop would have missed DS1 P3's window", () => {
    const [range] = clearingScrollRanges({
      docTop: 3088.3,
      height: 139.1,
      ...SURFACE,
      viewportHeight: VIEWPORT_HEIGHT,
      maxScroll: MAX_SCROLL,
      fixed: CHROME,
    });
    const width = range.to - range.from;
    expect(width).toBeCloseTo(28.6, 1);
    expect(width).toBeLessThan(MAX_SCROLL / 59);
  });
});
