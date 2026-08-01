import { describe, expect, it } from "vitest";
import {
	calculateIncomeTax,
	calculateSocialSecurity,
	sanitizeAmount,
} from "@/lib/payroll";

describe("sanitizeAmount", () => {
	it("keeps positive finite amounts untouched", () => {
		expect(sanitizeAmount(1234.56)).toBe(1234.56);
	});

	it("collapses zero, negatives and non-finite values to zero", () => {
		expect(sanitizeAmount(0)).toBe(0);
		expect(sanitizeAmount(-500)).toBe(0);
		expect(sanitizeAmount(Number.NaN)).toBe(0);
		expect(sanitizeAmount(Number.POSITIVE_INFINITY)).toBe(0);
	});
});

describe("calculateSocialSecurity", () => {
	it("applies the first bracket rate below the minimum wage", () => {
		expect(calculateSocialSecurity(1000)).toBe(75);
	});

	it("matches the official contribution at every bracket boundary", () => {
		expect(calculateSocialSecurity(1621)).toBe(121.58);
		expect(calculateSocialSecurity(2902.84)).toBe(236.94);
		expect(calculateSocialSecurity(4354.27)).toBe(411.11);
		expect(calculateSocialSecurity(8475.55)).toBe(988.09);
	});

	it("caps the contribution at the ceiling", () => {
		expect(calculateSocialSecurity(20000)).toBe(988.09);
		expect(calculateSocialSecurity(8475.55)).toBe(
			calculateSocialSecurity(100000),
		);
	});

	it("charges each bracket only on the portion inside it", () => {
		expect(calculateSocialSecurity(5000)).toBe(501.51);
	});

	it("returns zero for empty or invalid salaries", () => {
		expect(calculateSocialSecurity(0)).toBe(0);
		expect(calculateSocialSecurity(-1000)).toBe(0);
		expect(calculateSocialSecurity(Number.NaN)).toBe(0);
	});
});

describe("calculateIncomeTax", () => {
	it("exempts salaries up to the exemption ceiling", () => {
		expect(calculateIncomeTax(3000, calculateSocialSecurity(3000))).toBe(0);
		expect(calculateIncomeTax(5000, calculateSocialSecurity(5000))).toBe(0);
	});

	it("clamps to zero when the reduction outgrows the tax", () => {
		expect(calculateIncomeTax(5000.01, calculateSocialSecurity(5000.01))).toBe(
			0,
		);
	});

	it("reduces the tax partially inside the transition range", () => {
		expect(calculateIncomeTax(5200, calculateSocialSecurity(5200))).toBe(71.62);
	});

	it("phases the reduction out linearly across the transition range", () => {
		expect(calculateIncomeTax(6000, calculateSocialSecurity(6000))).toBe(385.1);
	});

	it("stops reducing once the phase-out ceiling is reached", () => {
		expect(calculateIncomeTax(7350, calculateSocialSecurity(7350))).toBe(
			884.13,
		);
	});

	it("applies the top bracket above the phase-out ceiling", () => {
		expect(calculateIncomeTax(10000, calculateSocialSecurity(10000))).toBe(
			1569.55,
		);
	});

	it("prefers the simplified deduction when it beats the contribution", () => {
		const contribution = calculateSocialSecurity(5500);
		expect(contribution).toBeLessThan(607.2);
		expect(calculateIncomeTax(5500, contribution)).toBe(
			calculateIncomeTax(5500, 0),
		);
	});

	it("returns zero for empty or invalid salaries", () => {
		expect(calculateIncomeTax(0, 0)).toBe(0);
		expect(calculateIncomeTax(-5000, 0)).toBe(0);
		expect(calculateIncomeTax(Number.NaN, Number.NaN)).toBe(0);
	});
});
