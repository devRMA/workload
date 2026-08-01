interface ProgressiveBracket {
	readonly ceiling: number;
	readonly rate: number;
}

interface IncomeTaxRate {
	readonly rate: number;
	readonly deduction: number;
}

interface IncomeTaxBracket extends IncomeTaxRate {
	readonly ceiling: number;
}

const SOCIAL_SECURITY_BRACKETS: readonly ProgressiveBracket[] = [
	{ ceiling: 1621.0, rate: 0.075 },
	{ ceiling: 2902.84, rate: 0.09 },
	{ ceiling: 4354.27, rate: 0.12 },
	{ ceiling: 8475.55, rate: 0.14 },
];

const INCOME_TAX_BRACKETS: readonly IncomeTaxBracket[] = [
	{ ceiling: 2428.8, rate: 0, deduction: 0 },
	{ ceiling: 2826.65, rate: 0.075, deduction: 182.16 },
	{ ceiling: 3751.05, rate: 0.15, deduction: 394.16 },
	{ ceiling: 4664.68, rate: 0.225, deduction: 675.49 },
];

const TOP_INCOME_TAX_RATE: IncomeTaxRate = { rate: 0.275, deduction: 908.73 };

const SIMPLIFIED_DEDUCTION = 607.2;
const EXEMPTION_CEILING = 5000;
const REDUCTION_PHASE_OUT_CEILING = 7350;
const REDUCTION_INTERCEPT = 978.62;
const REDUCTION_SLOPE = 0.133145;

export function sanitizeAmount(value: number): number {
	return Number.isFinite(value) && value > 0 ? value : 0;
}

function roundToCents(value: number): number {
	const centsWithoutBinaryDust = Number((value * 100).toPrecision(12));
	return Math.round(centsWithoutBinaryDust) / 100;
}

function sumProgressiveBrackets(
	amount: number,
	brackets: readonly ProgressiveBracket[],
): number {
	let total = 0;
	let lowerBound = 0;

	for (const { ceiling, rate } of brackets) {
		if (amount <= lowerBound) break;
		total += (Math.min(amount, ceiling) - lowerBound) * rate;
		lowerBound = ceiling;
	}

	return roundToCents(total);
}

export function calculateSocialSecurity(grossSalary: number): number {
	return sumProgressiveBrackets(
		sanitizeAmount(grossSalary),
		SOCIAL_SECURITY_BRACKETS,
	);
}

function findIncomeTaxRate(base: number): IncomeTaxRate {
	return (
		INCOME_TAX_BRACKETS.find(({ ceiling }) => base <= ceiling) ??
		TOP_INCOME_TAX_RATE
	);
}

function taxReductionFor(grossSalary: number): number {
	if (grossSalary > REDUCTION_PHASE_OUT_CEILING) return 0;
	return REDUCTION_INTERCEPT - REDUCTION_SLOPE * grossSalary;
}

export function calculateIncomeTax(
	grossSalary: number,
	socialSecurity: number,
): number {
	const gross = sanitizeAmount(grossSalary);
	if (gross <= EXEMPTION_CEILING) return 0;

	const deductible = Math.max(
		sanitizeAmount(socialSecurity),
		SIMPLIFIED_DEDUCTION,
	);
	const base = sanitizeAmount(gross - deductible);
	const { rate, deduction } = findIncomeTaxRate(base);
	const tax = base * rate - deduction - taxReductionFor(gross);

	return roundToCents(sanitizeAmount(tax));
}
