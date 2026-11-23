import { minutesToHours } from "@/lib/duration";

export type SalaryPeriod = "hour" | "day" | "week" | "month" | "year";

// CF art. 7º, VIII e Lei nº 4.090/1962, art. 1º: gratificação natalina, um salário a mais por ano.
const PAID_MONTHS_PER_YEAR = 13;

export const SALARY_PERIOD_LABELS: Record<SalaryPeriod, string> = {
  hour: "Hora",
  day: "Dia",
  week: "Semana",
  month: "Mês",
  year: "Ano",
};

export const SALARY_PERIODS = Object.keys(SALARY_PERIOD_LABELS) as readonly SalaryPeriod[];

// CLT art. 64, caput: "por 30 (trinta) vezes o número de horas dessa duração"; Lei 605/1949, art. 7º, §2º.
export const PAID_DAYS_PER_MONTH = 30;
// CLT art. 67 e Lei 605/1949, art. 1º: repouso semanal de 24 horas consecutivas; CF art. 7º, XV.
export const WORK_DAYS_AVAILABLE_PER_WEEK = 6;
export const WEEKS_PER_MONTH_DIVISOR = PAID_DAYS_PER_MONTH / WORK_DAYS_AVAILABLE_PER_WEEK;
// CF art. 7º, XIII: duração do trabalho normal não superior a quarenta e quatro horas semanais.
export const WEEKLY_NORMAL_HOURS_CAP = 44;
// CLT art. 59, §2º: "nem seja ultrapassado o limite máximo de dez horas diárias"; Súmula 85, I e II, do TST.
export const DAILY_HOURS_CAP = 10;
// Súmula 431 do TST: divisor 200 na semana de 40 horas do regime geral do art. 58, caput, da CLT.
export const SUMULA_431_WEEKLY_HOURS = 40;
// CF art. 7º, XIII, CLT art. 64 e Lei 605/1949, art. 7º, §2º. Não vem da Súmula 431, que fixa 200.
export const DEFAULT_MONTHLY_HOURS = WEEKLY_NORMAL_HOURS_CAP * WEEKS_PER_MONTH_DIVISOR;
// CLT art. 64, parágrafo único: o operando são os dias de trabalho por semana; CLT art. 67 limita a seis.
export const MIN_WORK_DAYS_PER_WEEK = 1;
export const MAX_WORK_DAYS_PER_WEEK = WORK_DAYS_AVAILABLE_PER_WEEK;
// Nenhuma norma da CLT fixa tolerância sobre um divisor: este valor é uma escolha de produto.
const DIVISOR_TOLERANCE_HOURS = 1;

export type DivisorNorm = "sumula-431" | "clt-64-caput" | "clt-64-sole-paragraph";

export type DivisorCheck =
  | { kind: "no-week-days" }
  | { kind: "too-many-week-days" }
  | { kind: "daily-cap-exceeded"; weeklyHours: number }
  | { kind: "weekly-cap-exceeded"; weeklyHours: number }
  | { kind: "workload-missing-without-week" }
  | { kind: "workload-missing"; divisor: number; norm: DivisorNorm }
  | { kind: "workload-mismatch"; divisor: number; norm: DivisorNorm }
  | { kind: "silent" };

export interface DivisorInput {
  dailyMinutes: number;
  workDaysPerWeek: number;
  declaredMonthlyHours: number;
}

export function checkDivisor({ dailyMinutes, workDaysPerWeek, declaredMonthlyHours }: DivisorInput): DivisorCheck {
  if (!Number.isInteger(workDaysPerWeek) || workDaysPerWeek < MIN_WORK_DAYS_PER_WEEK) {
    return { kind: "no-week-days" };
  }
  if (workDaysPerWeek > MAX_WORK_DAYS_PER_WEEK) return { kind: "too-many-week-days" };
  if (dailyMinutes <= 0) {
    return declaredMonthlyHours > 0 ? { kind: "silent" } : { kind: "workload-missing-without-week" };
  }

  const weeklyHours = minutesToHours(dailyMinutes * workDaysPerWeek);
  if (minutesToHours(dailyMinutes) > DAILY_HOURS_CAP) return { kind: "daily-cap-exceeded", weeklyHours };
  if (weeklyHours > WEEKLY_NORMAL_HOURS_CAP) return { kind: "weekly-cap-exceeded", weeklyHours };

  const divisor = Math.round(weeklyHours * WEEKS_PER_MONTH_DIVISOR * 100) / 100;
  const norm: DivisorNorm =
    weeklyHours === SUMULA_431_WEEKLY_HOURS
      ? "sumula-431"
      : workDaysPerWeek === WORK_DAYS_AVAILABLE_PER_WEEK
        ? "clt-64-caput"
        : "clt-64-sole-paragraph";

  if (declaredMonthlyHours <= 0) return { kind: "workload-missing", divisor, norm };
  if (Math.abs(declaredMonthlyHours - divisor) >= DIVISOR_TOLERANCE_HOURS) {
    return { kind: "workload-mismatch", divisor, norm };
  }
  return { kind: "silent" };
}

export function amountForPeriod(
  monthlyAmount: number,
  period: SalaryPeriod,
  monthlyHours: number,
  dailyHours: number,
  workDaysPerWeek: number,
): number {
  const hourlyAmount = monthlyHours > 0 ? monthlyAmount / monthlyHours : 0;

  switch (period) {
    case "hour":
      return hourlyAmount;
    case "day":
      return hourlyAmount * dailyHours;
    case "week":
      return hourlyAmount * dailyHours * workDaysPerWeek;
    case "month":
      return monthlyAmount;
    case "year":
      return monthlyAmount * PAID_MONTHS_PER_YEAR;
  }
}
