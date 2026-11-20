export type SalaryPeriod = "hour" | "day" | "week" | "month" | "year";

const WORK_DAYS_PER_WEEK = 5;
const PAID_MONTHS_PER_YEAR = 13;
const WEEKS_IN_DIVISOR = 5;
const DIVISOR_TOLERANCE_HOURS = 1;

export const SALARY_PERIOD_LABELS: Record<SalaryPeriod, string> = {
  hour: "Hora",
  day: "Dia",
  week: "Semana",
  month: "Mês",
  year: "Ano",
};

export const SALARY_PERIODS = Object.keys(SALARY_PERIOD_LABELS) as readonly SalaryPeriod[];

export function amountForPeriod(
  monthlyAmount: number,
  period: SalaryPeriod,
  monthlyHours: number,
  dailyHours: number,
): number {
  const hourlyAmount = monthlyHours > 0 ? monthlyAmount / monthlyHours : 0;

  switch (period) {
    case "hour":
      return hourlyAmount;
    case "day":
      return hourlyAmount * dailyHours;
    case "week":
      return hourlyAmount * dailyHours * WORK_DAYS_PER_WEEK;
    case "month":
      return monthlyAmount;
    case "year":
      return monthlyAmount * PAID_MONTHS_PER_YEAR;
  }
}

// Súmula 431 do TST: o divisor mensal é a jornada semanal x 5 (44h/semana = 220, 40h/semana = 200).
function coherentMonthlyHours(dailyHours: number): number {
  return Math.round(dailyHours * WORK_DAYS_PER_WEEK * WEEKS_IN_DIVISOR * 100) / 100;
}

export function findDivisorMismatch(monthlyHours: number, dailyHours: number): number | null {
  const coherent = coherentMonthlyHours(dailyHours);
  if (coherent <= 0 || monthlyHours <= 0) return null;
  return Math.abs(monthlyHours - coherent) < DIVISOR_TOLERANCE_HOURS ? null : coherent;
}
