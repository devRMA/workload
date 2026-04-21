import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	calculateSuggestedExit,
	calculateWorkStats,
	useWorkCalculator,
} from "../hooks/use-work-calculator";

describe("Work Calculator Logic", () => {
	const workMins = 8 * 60 + 48; // 528
	// Use a fixed Monday for testing to avoid weekend logic interference
	const mockDate = "2025-01-06"; // Jan 6, 2025 is a Monday

	it("calculates suggested exit correctly", () => {
		const entry = `${mockDate}T08:00`;
		const lunchStart = `${mockDate}T12:00`;
		const lunchEnd = `${mockDate}T13:00`;
		// 4 hours morning (240 mins)
		// 528 - 240 = 288 mins (4h 48m) afternoon
		// 13:00 + 4h 48m = 17:48
		const exit = calculateSuggestedExit(entry, lunchStart, lunchEnd, workMins);
		expect(exit).toBe(`${mockDate}T17:48`);
	});

	it("calculates regular work stats with exact exit", () => {
		const entry = `${mockDate}T08:00`;
		const lunchStart = `${mockDate}T12:00`;
		const lunchEnd = `${mockDate}T13:00`;
		const exit = `${mockDate}T17:48`;

		const stats = calculateWorkStats(
			entry,
			lunchStart,
			lunchEnd,
			exit,
			workMins,
		);
		expect(stats.balance).toBe(0);
		expect(stats.totalWorked).toBe(528);
		expect(stats.overtime75).toBe(0);
		expect(stats.overtime100).toBe(0);
	});

	it("calculates overtime", () => {
		const entry = `${mockDate}T08:00`;
		const lunchStart = `${mockDate}T12:00`;
		const lunchEnd = `${mockDate}T13:00`;
		const exit = `${mockDate}T20:00`; // 7h afternoon = 420 mins. Total = 660 mins. Overtime = 132 mins.

		const stats = calculateWorkStats(
			entry,
			lunchStart,
			lunchEnd,
			exit,
			workMins,
		);
		expect(stats.balance).toBe(132);
		expect(stats.overtime75).toBe(120); // First 2h
		expect(stats.overtime100).toBe(12); // Remaining
	});

	it("calculates night shift reduction correctly", () => {
		const entry = `${mockDate}T20:00`;
		const lunchStart = `2025-01-07T00:00`; // Next day
		const lunchEnd = `2025-01-07T01:00`;
		const exit = `2025-01-07T05:00`;

		// Total clock time worked:
		// 20:00 to 00:00 = 4h
		// 01:00 to 05:00 = 4h
		// Total = 8h (480 mins)
		// Night hours: 22:00-00:00 (2h) + 01:00-05:00 (4h) = 6h.
		// 6h night = 6 * 60 = 360 mins.
		// Equivalent: 360 * (60 / 52.5) = 411 mins approx.
		// Bonus: 411 - 360 = 51 mins.
		// Total worked = 480 + 51 = 531 mins.

		const stats = calculateWorkStats(entry, lunchStart, lunchEnd, exit, 480);
		expect(stats.nightMinutes).toBe(411);
		expect(stats.totalWorked).toBe(531);
		expect(stats.balance).toBe(51);
	});
});

describe("useWorkCalculator Hook", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-01-06T10:00:00Z"));
	});

	it("initializes with default values and saves to localStorage", () => {
		const { result } = renderHook(() => useWorkCalculator());
		expect(result.current.workMinutes).toBe(528);
		expect(localStorage.getItem("workMinutes")).toBe("528");
	});

	it("loads values from localStorage", () => {
		localStorage.setItem("workMinutes", "480");
		localStorage.setItem("entry", "2025-01-06T09:00");

		const { result } = renderHook(() => useWorkCalculator());
		expect(result.current.workMinutes).toBe(480);
		expect(result.current.entry).toBe("2025-01-06T09:00");
	});

	it("handles manual exit override", () => {
		const { result } = renderHook(() => useWorkCalculator());

		act(() => {
			result.current.setIsManualExit(true);
			result.current.setExitOverride("2025-01-06T18:00");
		});

		expect(result.current.displayExit).toBe("2025-01-06T18:00");
	});

	it("resets to defaults", () => {
		const { result } = renderHook(() => useWorkCalculator());

		act(() => {
			result.current.setWorkMinutes(480);
			result.current.resetDefaults();
		});

		expect(result.current.workMinutes).toBe(528);
		expect(result.current.isManualExit).toBe(false);
	});
});
