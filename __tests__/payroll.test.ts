import { describe, expect, it } from "vitest";
import { calculateIncomeTax, calculateSocialSecurity, overtimePay, sanitizeAmount } from "@/lib/payroll";

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

describe("overtimePay", () => {
  it("pays an hour with the legal fifty percent on top", () => {
    expect(overtimePay(60, 20, 50)).toBe(30);
  });

  it("doubles the hour on the higher tier", () => {
    expect(overtimePay(90, 20, 100)).toBe(60);
  });

  it("pays the plain hourly value when there is no additional rate", () => {
    expect(overtimePay(60, 20, 0)).toBe(20);
  });

  it("pays nothing without overtime minutes", () => {
    expect(overtimePay(0, 20, 50)).toBe(0);
  });

  it("prices a fraction of an hour proportionally", () => {
    expect(overtimePay(30, 20, 50)).toBe(15);
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
    expect(calculateSocialSecurity(8475.55)).toBe(calculateSocialSecurity(100000));
  });

  it("charges each bracket only on the portion inside it", () => {
    expect(calculateSocialSecurity(5000)).toBe(501.51);
  });

  it("returns zero for empty or invalid salaries", () => {
    expect(calculateSocialSecurity(0)).toBe(0);
    expect(calculateSocialSecurity(-1000)).toBe(0);
    expect(calculateSocialSecurity(Number.NaN)).toBe(0);
  });

  it("matches CLT for estatutário up to the general regime ceiling", () => {
    for (const salary of [1000, 5000, 8475.55]) {
      expect(calculateSocialSecurity(salary, "estatutario")).toBe(calculateSocialSecurity(salary, "clt"));
    }
  });

  it("keeps charging estatutário past the ceiling that caps CLT", () => {
    expect(calculateSocialSecurity(20000, "clt")).toBe(988.09);
    expect(calculateSocialSecurity(20000, "estatutario")).toBeGreaterThan(988.09);
  });

  it("applies every civil service tier at its own boundary", () => {
    expect(calculateSocialSecurity(14514.3, "estatutario")).toBe(1863.71);
    expect(calculateSocialSecurity(29028.57, "estatutario")).toBe(4258.56);
    expect(calculateSocialSecurity(56605.73, "estatutario")).toBe(9498.23);
  });

  it("charges the top civil service rate above the last boundary", () => {
    const atBoundary = calculateSocialSecurity(56605.73, "estatutario");
    const above = calculateSocialSecurity(66605.73, "estatutario");

    expect(above - atBoundary).toBeCloseTo(10000 * 0.22, 2);
  });
});

describe("calculateIncomeTax", () => {
  it("exempts salaries up to the exemption ceiling", () => {
    expect(calculateIncomeTax(3000, calculateSocialSecurity(3000))).toBe(0);
    expect(calculateIncomeTax(5000, calculateSocialSecurity(5000))).toBe(0);
  });

  it("clamps to zero when the reduction outgrows the tax", () => {
    expect(calculateIncomeTax(5000.01, calculateSocialSecurity(5000.01))).toBe(0);
  });

  it("reduces the tax partially inside the transition range", () => {
    expect(calculateIncomeTax(5200, calculateSocialSecurity(5200))).toBe(71.62);
  });

  it("phases the reduction out linearly across the transition range", () => {
    expect(calculateIncomeTax(6000, calculateSocialSecurity(6000))).toBe(385.1);
  });

  it("stops reducing once the phase-out ceiling is reached", () => {
    expect(calculateIncomeTax(7350, calculateSocialSecurity(7350))).toBe(884.13);
  });

  it("applies the top bracket above the phase-out ceiling", () => {
    expect(calculateIncomeTax(10000, calculateSocialSecurity(10000))).toBe(1569.55);
  });

  it("prefers the simplified deduction when it beats the contribution", () => {
    const contribution = calculateSocialSecurity(5500);
    expect(contribution).toBeLessThan(607.2);
    expect(calculateIncomeTax(5500, contribution)).toBe(calculateIncomeTax(5500, 0));
  });

  it("returns zero for empty or invalid salaries", () => {
    expect(calculateIncomeTax(0, 0)).toBe(0);
    expect(calculateIncomeTax(-5000, 0)).toBe(0);
    expect(calculateIncomeTax(Number.NaN, Number.NaN)).toBe(0);
  });

  it("deducts each dependent from the taxable base", () => {
    const contribution = calculateSocialSecurity(10000);

    expect(calculateIncomeTax(10000, contribution, 0)).toBe(1569.55);
    expect(calculateIncomeTax(10000, contribution, 2)).toBe(1465.27);
  });

  it("tips the deduction away from the simplified one at the first dependent", () => {
    const contribution = calculateSocialSecurity(5500);
    expect(contribution).toBeLessThan(607.2);

    expect(calculateIncomeTax(5500, contribution, 0)).toBe(calculateIncomeTax(5500, 0, 0));
    expect(calculateIncomeTax(5500, contribution, 1)).toBeLessThan(calculateIncomeTax(5500, contribution, 0));
  });

  it("ignores fractional and negative dependent counts", () => {
    const contribution = calculateSocialSecurity(10000);

    expect(calculateIncomeTax(10000, contribution, 2.9)).toBe(calculateIncomeTax(10000, contribution, 2));
    expect(calculateIncomeTax(10000, contribution, -3)).toBe(calculateIncomeTax(10000, contribution, 0));
  });

  it("taxes estatutário less because the contribution is deductible", () => {
    const cltTax = calculateIncomeTax(20000, calculateSocialSecurity(20000, "clt"));
    const civilServiceTax = calculateIncomeTax(20000, calculateSocialSecurity(20000, "estatutario"));

    expect(civilServiceTax).toBeLessThan(cltTax);
  });
});
