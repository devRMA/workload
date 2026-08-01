import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	calculateSuggestedExit,
	calculateWorkStats,
	useWorkCalculator,
} from "@/hooks/use-work-calculator";

const FULL_DAY_MINUTES = 8 * 60 + 48;
const MONDAY = "2025-01-06";
const SATURDAY = "2025-01-11";

describe("calculateSuggestedExit", () => {
	it("pushes the remaining minutes past the end of lunch", () => {
		expect(
			calculateSuggestedExit(
				`${MONDAY}T08:00`,
				`${MONDAY}T12:00`,
				`${MONDAY}T13:00`,
				FULL_DAY_MINUTES,
			),
		).toBe(`${MONDAY}T17:48`);
	});

	it("returns the entry unchanged when the times are out of order", () => {
		expect(
			calculateSuggestedExit(
				`${MONDAY}T14:00`,
				`${MONDAY}T12:00`,
				`${MONDAY}T13:00`,
				FULL_DAY_MINUTES,
			),
		).toBe(`${MONDAY}T14:00`);
	});

	it("returns the entry unchanged when a timestamp is unparseable", () => {
		expect(
			calculateSuggestedExit("not-a-date", "", "", FULL_DAY_MINUTES),
		).toBe("not-a-date");
	});
});

describe("calculateWorkStats", () => {
	const statsFor = (exit: string, workMinutes = FULL_DAY_MINUTES) =>
		calculateWorkStats(
			`${MONDAY}T08:00`,
			`${MONDAY}T12:00`,
			`${MONDAY}T13:00`,
			exit,
			workMinutes,
		);

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
		const stats = calculateWorkStats(
			`${MONDAY}T21:00`,
			`${MONDAY}T23:00`,
			"2025-01-07T00:00",
			"2025-01-07T04:00",
			480,
		);

		const minutesInsideNightWindow = 360;
		const lunchMinutesInsideNightWindow = 60;
		const paidNightMinutes =
			minutesInsideNightWindow - lunchMinutesInsideNightWindow;

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
		expect(
			calculateWorkStats("nope", "nope", "nope", "nope", FULL_DAY_MINUTES)
				.totalWorked,
		).toBe(0);
	});
});

describe("useWorkCalculator", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.useFakeTimers();
		vi.setSystemTime(new Date(`${MONDAY}T10:00:00`));
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
