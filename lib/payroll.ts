import { CURRENT_LEGAL_YEAR, type IncomeTaxRate, type LegalYear, type ProgressiveBracket } from "./legal-tables";
import { formatCurrency } from "./utils";

export type WorkRegime = "clt" | "estatutario";

interface WorkRegimeInfo {
  readonly value: WorkRegime;
  readonly label: string;
  readonly summary: string;
  readonly who: string;
  readonly impact: string;
}

const TABLE: LegalYear = CURRENT_LEGAL_YEAR;

const RGPS_CEILING = TABLE.rgpsBrackets[TABLE.rgpsBrackets.length - 1].ceiling;

export const WORK_REGIME_INFO: readonly WorkRegimeInfo[] = [
  {
    value: "clt",
    label: "CLT",
    summary: "Carteira assinada, inclusive em estatais",
    who: "Quem tem contrato regido pela CLT, seja em empresa privada ou em empresa pública e sociedade de economia mista (Correios, Caixa, Petrobras): carteira assinada, FGTS, aviso prévio e férias com 1/3.",
    impact: `INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14%. O teto do salário de contribuição é ${formatCurrency(RGPS_CEILING)}: acima disso o desconto trava em ${formatCurrency(TABLE.rgpsCeilingDiscount)} (tabela de ${TABLE.year}).`,
  },
  {
    value: "estatutario",
    label: "Estatutário",
    summary: "Servidor público efetivo, com regime próprio",
    who: "Servidor efetivo regido por estatuto (RJU) e vinculado a um regime próprio de previdência (RPPS), não ao INSS.",
    impact:
      "Aplicamos a tabela do RPPS federal: a contribuição não para no teto do salário de contribuição que vale para a CLT e as faixas seguem subindo até 22% sobre a parcela mais alta. Servidor estadual ou municipal tem alíquota própria (muitas vezes 14% linear), então este número não vale para ele.",
  },
];

export const WORK_REGIMES: readonly WorkRegime[] = WORK_REGIME_INFO.map(({ value }) => value);

const BRACKETS_BY_REGIME: Record<WorkRegime, readonly ProgressiveBracket[]> = {
  clt: TABLE.rgpsBrackets,
  estatutario: TABLE.rppsFederalBrackets,
};

export function isRealAmount(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

export function sanitizeAmount(value: number): number {
  return isRealAmount(value) ? value : 0;
}

export function overtimePay(minutes: number, hourlyRate: number, ratePercent: number): number {
  return (minutes / 60) * hourlyRate * (1 + ratePercent / 100);
}

export function grossHourlyRate(grossSalary: number, monthlyHours: number): number {
  return monthlyHours > 0 ? sanitizeAmount(grossSalary) / monthlyHours : 0;
}

function roundToCents(value: number): number {
  const centsWithoutBinaryDust = Number((value * 100).toPrecision(12));
  return Math.round(centsWithoutBinaryDust) / 100;
}

function sumProgressiveBrackets(amount: number, brackets: readonly ProgressiveBracket[]): number {
  let total = 0;
  let lowerBound = 0;

  for (const { ceiling, rate } of brackets) {
    if (amount <= lowerBound) break;
    total += (Math.min(amount, ceiling) - lowerBound) * rate;
    lowerBound = ceiling;
  }

  return roundToCents(total);
}

export function calculateSocialSecurity(grossSalary: number, regime: WorkRegime = "clt"): number {
  return sumProgressiveBrackets(sanitizeAmount(grossSalary), BRACKETS_BY_REGIME[regime]);
}

function findIncomeTaxRate(base: number): IncomeTaxRate {
  return TABLE.incomeTaxBrackets.find(({ ceiling }) => base <= ceiling) ?? TABLE.topIncomeTaxRate;
}

function taxReductionFor(grossSalary: number): number {
  if (grossSalary > TABLE.reduction.phaseOutCeiling) return 0;
  return TABLE.reduction.intercept - TABLE.reduction.slope * grossSalary;
}

export function calculateIncomeTax(grossSalary: number, socialSecurity: number, dependents = 0): number {
  const gross = sanitizeAmount(grossSalary);
  if (gross <= TABLE.exemptionCeiling) return 0;

  const legalDeduction =
    sanitizeAmount(socialSecurity) + TABLE.dependentDeduction * Math.trunc(sanitizeAmount(dependents));
  const deductible = Math.max(legalDeduction, TABLE.simplifiedDeduction);
  const base = sanitizeAmount(gross - deductible);
  const { rate, deduction } = findIncomeTaxRate(base);
  const tax = base * rate - deduction - taxReductionFor(gross);

  return roundToCents(sanitizeAmount(tax));
}
