export interface ComplianceWarning {
  id: string;
  title: string;
  detail: string;
}

const DAILY_OVERTIME_LIMIT_MINUTES = 120;
const LONG_DAY_MINUTES = 360;
const MINIMUM_LUNCH_MINUTES = 60;

export interface ComplianceInput {
  overtimeMinutes: number;
  workedMinutes: number;
  lunchMinutes: number;
}

export function findComplianceWarnings({
  overtimeMinutes,
  workedMinutes,
  lunchMinutes,
}: ComplianceInput): readonly ComplianceWarning[] {
  const warnings: ComplianceWarning[] = [];

  if (overtimeMinutes > DAILY_OVERTIME_LIMIT_MINUTES) {
    warnings.push({
      id: "daily-overtime-limit",
      title: "Você passou de 2h extras hoje",
      detail:
        "O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST) — a irregularidade está na extrapolação, e a sanção recai sobre o empregador.",
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

  return warnings;
}
