export type SalaryPeriod = "hour" | "day" | "week" | "month" | "year";

const WORK_DAYS_PER_WEEK = 5;
const PAID_MONTHS_PER_YEAR = 13;

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
  const hourlyAmount = monthlyAmount / (monthlyHours > 0 ? monthlyHours : 1);

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
