export interface ProgressiveBracket {
  readonly ceiling: number;
  readonly rate: number;
}

export interface IncomeTaxRate {
  readonly rate: number;
  readonly deduction: number;
}

export interface IncomeTaxBracket extends IncomeTaxRate {
  readonly ceiling: number;
}

export interface TaxReduction {
  readonly intercept: number;
  readonly slope: number;
  readonly phaseOutCeiling: number;
}

export interface LegalYear {
  readonly year: number;
  readonly effectiveFrom: string;
  readonly source: string;
  readonly sourceUrl: string;
  readonly rgpsBrackets: readonly ProgressiveBracket[];
  readonly rgpsCeilingDiscount: number;
  readonly rppsFederalBrackets: readonly ProgressiveBracket[];
  readonly incomeTaxBrackets: readonly IncomeTaxBracket[];
  readonly topIncomeTaxRate: IncomeTaxRate;
  readonly simplifiedDeduction: number;
  readonly dependentDeduction: number;
  readonly exemptionCeiling: number;
  readonly reduction: TaxReduction;
}

const RGPS_BRACKETS_2026: readonly ProgressiveBracket[] = [
  { ceiling: 1621.0, rate: 0.075 },
  { ceiling: 2902.84, rate: 0.09 },
  { ceiling: 4354.27, rate: 0.12 },
  { ceiling: 8475.55, rate: 0.14 },
];

const LEGAL_YEAR_2026: LegalYear = {
  year: 2026,
  effectiveFrom: "2026-01-01",
  source: "Portaria Interministerial MPS/MF nº 13, de 09/01/2026",
  sourceUrl: "https://www.legisweb.com.br/legislacao/?id=489284",
  rgpsBrackets: RGPS_BRACKETS_2026,
  rgpsCeilingDiscount: 988.09,
  rppsFederalBrackets: [
    ...RGPS_BRACKETS_2026,
    { ceiling: 14514.3, rate: 0.145 },
    { ceiling: 29028.57, rate: 0.165 },
    { ceiling: 56605.73, rate: 0.19 },
    { ceiling: Number.POSITIVE_INFINITY, rate: 0.22 },
  ],
  incomeTaxBrackets: [
    { ceiling: 2428.8, rate: 0, deduction: 0 },
    { ceiling: 2826.65, rate: 0.075, deduction: 182.16 },
    { ceiling: 3751.05, rate: 0.15, deduction: 394.16 },
    { ceiling: 4664.68, rate: 0.225, deduction: 675.49 },
  ],
  topIncomeTaxRate: { rate: 0.275, deduction: 908.73 },
  simplifiedDeduction: 607.2,
  dependentDeduction: 189.59,
  exemptionCeiling: 5000,
  reduction: { intercept: 978.62, slope: 0.133145, phaseOutCeiling: 7350 },
};

export const LEGAL_YEARS: Record<number, LegalYear> = { 2026: LEGAL_YEAR_2026 };

export const CURRENT_LEGAL_YEAR = LEGAL_YEAR_2026;
