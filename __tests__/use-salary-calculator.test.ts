import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	calculateInss,
	calculateIrrf,
	useSalaryCalculator,
} from "../hooks/use-salary-calculator";

describe("Salary Calculator Logic", () => {
	it("calculates INSS correctly for low bracket", () => {
		// Salary <= 1518
		expect(calculateInss(1500)).toBe(112.5); // 1500 * 0.075
	});

	it("calculates INSS correctly for higher brackets", () => {
		// Salary 5000:
		// 1518 * 0.075 = 113.85
		// (2793.88 - 1518) * 0.09 = 114.83
		// (4190.83 - 2793.88) * 0.12 = 167.63
		// (5000 - 4190.83) * 0.14 = 113.28
		// Total approx: 509.59
		expect(calculateInss(5000)).toBeCloseTo(509.59, 1);
	});

	it("calculates INSS correctly above ceiling", () => {
		// Ceiling is 8157.41
		const maxInss = calculateInss(8157.41);
		expect(calculateInss(10000)).toBe(maxInss);
	});

	it("calculates IRRF correctly with deduction", () => {
		// Salary 5000, INSS 509.59 -> Base 4490.41
		// Bracket 4664.68 -> 22.5% rate, 662.77 deduction
		// IRRF = 4490.41 * 0.225 - 662.77 = 1010.34 - 662.77 = 347.57
		expect(calculateIrrf(5000, 509.59)).toBeCloseTo(347.57, 1);
	});

	it("calculates IRRF correctly below exempt limit", () => {
		// Salary 2000, INSS 160 -> Base 1840 (Exempt)
		expect(calculateIrrf(2000, 160)).toBe(0);
	});
});

describe("useSalaryCalculator Hook", () => {
	it("initializes with default values", () => {
		const { result } = renderHook(() => useSalaryCalculator());
		expect(result.current.grossSalary).toBe(5000);
		expect(result.current.monthlyHours).toBe(220);
		expect(result.current.stats.hourlyRate).toBeCloseTo(18.83, 1);
	});

	it("adds and removes extra deductions", () => {
		const { result } = renderHook(() => useSalaryCalculator());

		act(() => {
			result.current.addExtra("deduction");
		});

		expect(result.current.extraDeductions.length).toBe(1);
		const id = result.current.extraDeductions[0].id;

		act(() => {
			result.current.updateExtra(id, "deduction", "value", 100);
		});

		expect(result.current.extraDeductions[0].value).toBe(100);

		act(() => {
			result.current.removeExtra(id, "deduction");
		});

		expect(result.current.extraDeductions.length).toBe(0);
	});

	it("adds and updates extra gains", () => {
		const { result } = renderHook(() => useSalaryCalculator());

		act(() => {
			result.current.addExtra("gain");
		});

		expect(result.current.extraGains.length).toBe(1);
		const id = result.current.extraGains[0].id;

		act(() => {
			result.current.updateExtra(id, "gain", "value", 500);
		});

		expect(result.current.extraGains[0].value).toBe(500);
		// Stats totalValue should increase
		expect(result.current.stats.totalValue).toBeGreaterThan(4500);
	});

	it("allows manual override for INSS and IRRF", () => {
		const { result } = renderHook(() => useSalaryCalculator());

		act(() => {
			result.current.setManualInss(0);
			result.current.setManualIrrf(0);
		});

		expect(result.current.stats.inss).toBe(0);
		expect(result.current.stats.irrf).toBe(0);
		expect(result.current.stats.netSalary).toBe(5000);
	});
});
