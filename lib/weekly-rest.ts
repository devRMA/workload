import { eachDayOfInterval, endOfMonth, startOfMonth } from "date-fns";

const SUNDAY = 0;

export interface MonthRestSplit {
  workingDays: number;
  restDays: number;
}

export function splitMonthDays(reference: Date): MonthRestSplit {
  const days = eachDayOfInterval({ start: startOfMonth(reference), end: endOfMonth(reference) });
  const restDays = days.filter((day) => day.getDay() === SUNDAY).length;

  return { workingDays: days.length - restDays, restDays };
}

// Lei 605/1949, art. 7º, "a", Súmula 172 e Súmula 60, I, do TST: DSR = remuneração variável do mês / dias úteis x repousos do mês; o §2º já remunera o repouso do mensalista, por isso só o reflexo é calculado.
export function restDayPayOnOvertime(overtimeAmount: number, { workingDays, restDays }: MonthRestSplit): number {
  if (workingDays <= 0) return 0;
  return (overtimeAmount / workingDays) * restDays;
}
