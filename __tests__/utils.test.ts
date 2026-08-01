import { describe, expect, it } from "vitest";
import {
	cn,
	formatCurrency,
	formatCurrencySimple,
	parseCurrency,
} from "@/lib/utils";

describe("cn", () => {
	it("merges class names", () => {
		expect(cn("px-2", "py-1")).toBe("px-2 py-1");
	});

	it("handles conditional classes", () => {
		expect(cn("base", false && "hidden")).toBe("base");
	});

	it("resolves tailwind conflicts", () => {
		const result = cn("px-2", "px-4");
		expect(result).toBe("px-4");
	});
});

describe("formatCurrency", () => {
	it("formats positive values in BRL", () => {
		const result = formatCurrency(1234.56);
		expect(result).toContain("1.234,56");
	});

	it("formats zero", () => {
		const result = formatCurrency(0);
		expect(result).toContain("0,00");
	});

	it("formats negative values", () => {
		const result = formatCurrency(-50);
		expect(result).toContain("50,00");
	});
});

describe("formatCurrencySimple", () => {
	it("formats without currency symbol", () => {
		const result = formatCurrencySimple(1234.56);
		expect(result).toBe("1.234,56");
	});

	it("formats zero", () => {
		expect(formatCurrencySimple(0)).toBe("0,00");
	});
});

describe("parseCurrency", () => {
	it("parses formatted string to number", () => {
		expect(parseCurrency("1.234,56")).toBe(1234.56);
	});

	it("parses simple numeric string", () => {
		expect(parseCurrency("500")).toBe(5);
	});

	it("returns 0 for empty string", () => {
		expect(parseCurrency("")).toBe(0);
	});

	it("strips non-digit characters", () => {
		expect(parseCurrency("R$ 1.000,00")).toBe(1000);
	});

	it("returns zero instead of Infinity for absurdly long input", () => {
		expect(parseCurrency("9".repeat(400))).toBe(0);
	});
});
