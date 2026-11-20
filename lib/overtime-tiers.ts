// CLT art. 59, caput, com a redação da Lei 13.467/2017: a jornada extra não excede duas horas por dia.
export const DAILY_OVERTIME_LIMIT_MINUTES = 120;

export interface OvertimeTierSplit {
  firstTierMinutes: number;
  extraTierMinutes: number;
}

// CF art. 7º, XVI e CLT art. 59, §1º: o acréscimo mínimo de 50% incide sobre toda hora extra, sem operando de dia da semana.
export function splitOvertime(overtimeMinutes: number): OvertimeTierSplit {
  return {
    firstTierMinutes: Math.min(overtimeMinutes, DAILY_OVERTIME_LIMIT_MINUTES),
    extraTierMinutes: Math.max(0, overtimeMinutes - DAILY_OVERTIME_LIMIT_MINUTES),
  };
}
