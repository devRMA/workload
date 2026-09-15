export interface ComplianceWarning {
  id: string;
  title: string;
  detail: string;
}

const DAILY_OVERTIME_LIMIT_MINUTES = 120;
const SHORT_DAY_MINUTES = 240;
const LONG_DAY_MINUTES = 360;
const MINIMUM_SHORT_BREAK_MINUTES = 15;
const MINIMUM_LUNCH_MINUTES = 60;
const MINIMUM_REST_BETWEEN_SHIFTS_MINUTES = 660;

interface ComplianceInput {
  overtimeMinutes: number;
  workedMinutes: number;
  lunchMinutes: number;
  minutesSincePreviousShift: number | null;
}

export function findComplianceWarnings({
  overtimeMinutes,
  workedMinutes,
  lunchMinutes,
  minutesSincePreviousShift,
}: ComplianceInput): readonly ComplianceWarning[] {
  const warnings: ComplianceWarning[] = [];

  if (overtimeMinutes > DAILY_OVERTIME_LIMIT_MINUTES) {
    warnings.push({
      id: "daily-overtime-limit",
      title: "Você passou de 2h extras hoje",
      detail:
        "O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST). A irregularidade está na extrapolação, e a sanção recai sobre o empregador.",
    });
  }

  if (
    workedMinutes > SHORT_DAY_MINUTES &&
    workedMinutes <= LONG_DAY_MINUTES &&
    lunchMinutes < MINIMUM_SHORT_BREAK_MINUTES
  ) {
    warnings.push({
      id: "short-day-break",
      title: "Faltou o intervalo de 15 minutos",
      detail:
        "Jornada acima de 4 horas e de até 6 horas exige um intervalo de no mínimo 15 minutos (art. 71, §1º, da CLT). O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória.",
    });
  }

  if (workedMinutes > LONG_DAY_MINUTES && lunchMinutes < MINIMUM_LUNCH_MINUTES) {
    warnings.push({
      id: "minimum-lunch-break",
      title: "Seu intervalo ficou abaixo de 1 hora",
      detail:
        "Jornada acima de 6 horas exige no mínimo 1 hora de intervalo (art. 71 da CLT), que norma coletiva pode reduzir para 30 minutos. O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória.",
    });
  }

  if (minutesSincePreviousShift !== null && minutesSincePreviousShift < MINIMUM_REST_BETWEEN_SHIFTS_MINUTES) {
    warnings.push({
      id: "rest-between-shifts",
      title: "Você descansou menos de 11 horas desde a jornada anterior",
      detail:
        "O art. 66 da CLT garante no mínimo 11 horas seguidas de descanso entre duas jornadas. O tempo suprimido costuma ser pago como hora extra, e a irregularidade recai sobre o empregador.",
    });
  }

  return warnings;
}
