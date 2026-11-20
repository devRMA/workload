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

export interface NormSource {
  readonly norm: string;
  readonly url: string;
  readonly effectiveFrom: string;
}

export interface DerivedSource {
  readonly derivedFrom: string;
  readonly effectiveFrom: string;
}

export type DataSetSource = NormSource | DerivedSource;

export interface LegalSources {
  readonly rgpsBrackets: readonly [NormSource];
  readonly rgpsCeilingDiscount: readonly [DerivedSource];
  readonly rppsFederalBrackets: readonly [NormSource, NormSource];
  readonly incomeTaxBrackets: readonly [NormSource];
  readonly topIncomeTaxRate: readonly [NormSource];
  readonly simplifiedDeduction: readonly [NormSource, DerivedSource];
  readonly dependentDeduction: readonly [NormSource];
  readonly exemptionCeiling: readonly [NormSource];
  readonly reduction: readonly [NormSource];
}

export interface LegalYear {
  readonly year: number;
  readonly rgpsBrackets: readonly ProgressiveBracket[];
  readonly rgpsCeilingDiscount: number;
  readonly rppsFederalBrackets: readonly ProgressiveBracket[];
  readonly incomeTaxBrackets: readonly IncomeTaxBracket[];
  readonly topIncomeTaxRate: IncomeTaxRate;
  readonly simplifiedDeduction: number;
  readonly dependentDeduction: number;
  readonly exemptionCeiling: number;
  readonly reduction: TaxReduction;
  readonly sources: LegalSources;
}

const RGPS_BRACKETS_2026: readonly ProgressiveBracket[] = [
  { ceiling: 1621.0, rate: 0.075 },
  { ceiling: 2902.84, rate: 0.09 },
  { ceiling: 4354.27, rate: 0.12 },
  { ceiling: 8475.55, rate: 0.14 },
];

const LEGAL_SOURCES_2026: LegalSources = {
  rgpsBrackets: [
    {
      norm: "Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II",
      url: "https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf",
      effectiveFrom: "2026-01-01",
    },
  ],
  rgpsCeilingDiscount: [
    {
      derivedFrom:
        "Calculado sobre a tabela do INSS de 2026 (Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II)",
      effectiveFrom: "2026-01-01",
    },
  ],
  rppsFederalBrackets: [
    {
      norm: "Emenda Constitucional nº 103/2019, art. 11",
      url: "https://www2.camara.leg.br/legin/fed/emecon/2019/emendaconstitucional-103-12-novembro-2019-789412-publicacaooriginal-159409-pl.html",
      effectiveFrom: "2020-03-01",
    },
    {
      norm: "Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo III",
      url: "https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf",
      effectiveFrom: "2026-01-01",
    },
  ],
  incomeTaxBrackets: [
    {
      norm: "Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025",
      url: "https://www2.camara.leg.br/legin/fed/lei/2025/lei-15191-11-agosto-2025-797839-publicacaooriginal-176105-pl.html",
      effectiveFrom: "2025-05-01",
    },
  ],
  topIncomeTaxRate: [
    {
      norm: "Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025",
      url: "https://www2.camara.leg.br/legin/fed/lei/2025/lei-15191-11-agosto-2025-797839-publicacaooriginal-176105-pl.html",
      effectiveFrom: "2025-05-01",
    },
  ],
  simplifiedDeduction: [
    {
      norm: "Lei nº 9.250/1995, art. 4º, §2º",
      url: "https://www2.camara.leg.br/legin/fed/lei/1995/lei-9250-26-dezembro-1995-362566-normaatualizada-pl.html",
      effectiveFrom: "2023-08-28",
    },
    {
      derivedFrom: "25% do teto da faixa isenta da tabela do IRRF de 2026",
      effectiveFrom: "2025-05-01",
    },
  ],
  dependentDeduction: [
    {
      norm: 'Lei nº 9.250/1995, art. 4º, III, alínea "i"',
      url: "https://www2.camara.leg.br/legin/fed/lei/1995/lei-9250-26-dezembro-1995-362566-normaatualizada-pl.html",
      effectiveFrom: "2015-04-01",
    },
  ],
  exemptionCeiling: [
    {
      norm: "Lei nº 9.250/1995, art. 3º-A, acrescido pela Lei nº 15.270/2025",
      url: "https://www2.camara.leg.br/legin/fed/lei/2025/lei-15270-26-novembro-2025-798354-publicacaooriginal-177117-pl.html",
      effectiveFrom: "2026-01-01",
    },
  ],
  reduction: [
    {
      norm: "Lei nº 9.250/1995, art. 3º-A, acrescido pela Lei nº 15.270/2025",
      url: "https://www2.camara.leg.br/legin/fed/lei/2025/lei-15270-26-novembro-2025-798354-publicacaooriginal-177117-pl.html",
      effectiveFrom: "2026-01-01",
    },
  ],
};

const LEGAL_YEAR_2026: LegalYear = {
  year: 2026,
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
  sources: LEGAL_SOURCES_2026,
};

export const LEGAL_YEARS: Record<number, LegalYear> = { 2026: LEGAL_YEAR_2026 };

export const CURRENT_LEGAL_YEAR = LEGAL_YEAR_2026;

export const NIGHT_OVERTIME_SOURCE = {
  norm: "Tema 288 do TST (OJ 97)",
  url: "https://www.tst.jus.br/documents/d/guest/livro-precedentes-trabalhistas-v182025",
} as const;
