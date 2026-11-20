import { describe, expect, it } from "vitest";
import {
  CURRENT_LEGAL_YEAR,
  LEGAL_YEARS,
  type LegalYear,
  type NormSource,
  type ProgressiveBracket,
} from "@/lib/legal-tables";
import { calculateSocialSecurity } from "@/lib/payroll";

const years = Object.values(LEGAL_YEARS);

const isStrictlyIncreasing = (values: readonly number[]) =>
  values.every((value, index) => index === 0 || values[index - 1] < value);

const ceilings = (brackets: readonly ProgressiveBracket[]) => brackets.map(({ ceiling }) => ceiling);
const rates = (brackets: readonly ProgressiveBracket[]) => brackets.map(({ rate }) => rate);

describe("LEGAL_YEARS", () => {
  it("indexes every table by the year it declares", () => {
    for (const [key, table] of Object.entries(LEGAL_YEARS)) {
      expect(table.year).toBe(Number(key));
    }
  });

  it("climbs every social security ladder without repeating a ceiling or a rate", () => {
    for (const table of years) {
      for (const brackets of [table.rgpsBrackets, table.rppsFederalBrackets]) {
        expect(isStrictlyIncreasing(ceilings(brackets))).toBe(true);
        expect(isStrictlyIncreasing(rates(brackets))).toBe(true);
      }
    }
  });

  it("keeps the federal RPPS ladder starting where the RGPS one does", () => {
    for (const table of years) {
      expect(table.rppsFederalBrackets.slice(0, table.rgpsBrackets.length)).toEqual(table.rgpsBrackets);
    }
  });

  it("climbs the income tax brackets without repeating a ceiling, a rate or a deduction", () => {
    for (const table of years) {
      expect(isStrictlyIncreasing(table.incomeTaxBrackets.map(({ ceiling }) => ceiling))).toBe(true);
      expect(isStrictlyIncreasing(table.incomeTaxBrackets.map(({ rate }) => rate))).toBe(true);
      expect(table.topIncomeTaxRate.rate).toBeGreaterThan(
        table.incomeTaxBrackets[table.incomeTaxBrackets.length - 1].rate,
      );
    }
  });

  it("discounts exactly the published maximum at the RGPS ceiling", () => {
    for (const table of years) {
      const ceiling = ceilings(table.rgpsBrackets)[table.rgpsBrackets.length - 1];
      expect(calculateSocialSecurity(ceiling)).toBe(table.rgpsCeilingDiscount);
    }
  });

  it("uses the 2026 tables published by the Portaria Interministerial MPS/MF nº 13/2026", () => {
    const table: LegalYear = CURRENT_LEGAL_YEAR;

    expect(table.year).toBe(2026);
    expect(table.rgpsCeilingDiscount).toBe(988.09);
    expect(ceilings(table.rgpsBrackets)).toEqual([1621.0, 2902.84, 4354.27, 8475.55]);
    expect(table.exemptionCeiling).toBe(5000);
    expect(table.reduction).toEqual({ intercept: 978.62, slope: 0.133145, phaseOutCeiling: 7350 });
  });

  it("gives every legal data set at least one source", () => {
    const table = CURRENT_LEGAL_YEAR;
    const entries = Object.entries(table.sources);

    expect(entries.length).toBe(9);
    for (const [, sources] of entries) {
      expect(sources.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("attributes the RPPS ladder to two norms, the rates and the faixas", () => {
    const [rates, faixas] = CURRENT_LEGAL_YEAR.sources.rppsFederalBrackets;

    expect(CURRENT_LEGAL_YEAR.sources.rppsFederalBrackets.length).toBe(2);
    expect(rates.norm).toContain("Emenda Constitucional nº 103/2019");
    expect(faixas.norm).toContain("Anexo III");
  });

  it("marks a derived value as derived instead of attributing it to a norm", () => {
    const [ceilingDiscount] = CURRENT_LEGAL_YEAR.sources.rgpsCeilingDiscount;
    const [, simplifiedDeductionOperand] = CURRENT_LEGAL_YEAR.sources.simplifiedDeduction;

    expect("norm" in ceilingDiscount).toBe(false);
    expect(ceilingDiscount.derivedFrom).not.toBe("");
    expect("norm" in simplifiedDeductionOperand).toBe(false);
    expect(simplifiedDeductionOperand.derivedFrom).not.toBe("");
  });

  it("dates each source by the norm that sets it, not by the record's year", () => {
    const { sources } = CURRENT_LEGAL_YEAR;

    expect(sources.incomeTaxBrackets[0].effectiveFrom).toBe("2025-05-01");
    expect(sources.dependentDeduction[0].effectiveFrom).toBe("2015-04-01");
    expect(sources.rppsFederalBrackets[0].effectiveFrom).toBe("2020-03-01");
  });

  it("names seven distinct norms across nine attributions", () => {
    const norms = Object.values(CURRENT_LEGAL_YEAR.sources)
      .flat()
      .filter((entry): entry is NormSource => "norm" in entry)
      .map((entry) => entry.norm);

    expect(norms.length).toBe(9);
    expect(new Set(norms).size).toBe(7);
  });
});
