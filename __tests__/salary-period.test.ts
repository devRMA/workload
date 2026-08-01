import { describe, expect, it } from "vitest";
import {
	amountForPeriod,
	SALARY_PERIOD_LABELS,
	SALARY_PERIODS,
	type SalaryPeriod,
} from "@/lib/salary-period";

const MONTHLY_NET = 4498.49;
const MONTHLY_HOURS = 220;
const DAILY_HOURS = 8;

const forPeriod = (period: SalaryPeriod) =>
	amountForPeriod(MONTHLY_NET, period, MONTHLY_HOURS, DAILY_HOURS);

describe("SALARY_PERIODS", () => {
	it("lists every period from shortest to longest", () => {
		expect(SALARY_PERIODS).toEqual(["hour", "day", "week", "month", "year"]);
	});

	it("labels every period", () => {
		for (const period of SALARY_PERIODS) {
			expect(SALARY_PERIOD_LABELS[period]).toBeTruthy();
		}
	});
});

describe("amountForPeriod", () => {
	it("divides the monthly amount by the monthly hours", () => {
		expect(forPeriod("hour")).toBeCloseTo(20.4477, 4);
	});

	it("scales the hourly amount by the daily hours", () => {
		expect(forPeriod("day")).toBeCloseTo(forPeriod("hour") * 8, 6);
	});

	it("counts five working days in a week", () => {
		expect(forPeriod("week")).toBeCloseTo(forPeriod("day") * 5, 6);
	});

	it("returns the monthly amount untouched", () => {
		expect(forPeriod("month")).toBe(MONTHLY_NET);
	});

	it("counts thirteen paid months in a year", () => {
		expect(forPeriod("year")).toBeCloseTo(MONTHLY_NET * 13, 6);
	});

	it("honours a shorter daily journey", () => {
		expect(amountForPeriod(MONTHLY_NET, "day", MONTHLY_HOURS, 6)).toBeCloseTo(
			forPeriod("hour") * 6,
			6,
		);
	});

	it("avoids dividing by zero when the monthly hours are cleared", () => {
		const hourly = amountForPeriod(MONTHLY_NET, "hour", 0, DAILY_HOURS);

		expect(hourly).toBe(MONTHLY_NET);
		expect(Number.isFinite(hourly)).toBe(true);
	});
});
