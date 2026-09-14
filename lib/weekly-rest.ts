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

// Lei 605/49 art. 7º, §2º e Súmula 172 do TST: DSR = extras do mês / dias úteis x repousos do mês.
export function restDayPayOnOvertime(overtimeAmount: number, { workingDays, restDays }: MonthRestSplit): number {
  if (workingDays <= 0) return 0;
  return (overtimeAmount / workingDays) * restDays;
}
