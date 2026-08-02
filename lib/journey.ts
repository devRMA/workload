import { isValid } from "date-fns";

export type JourneyField = "entry" | "lunchStart" | "lunchEnd" | "exit";

export interface JourneyIssue {
  field: JourneyField;
  message: string;
}

export interface JourneyTimestamps {
  entry: string;
  lunchStart: string;
  lunchEnd: string;
  exit: string;
}

const ORDERED_FIELDS: readonly JourneyField[] = ["entry", "lunchStart", "lunchEnd", "exit"];

const FIELD_MESSAGES: Record<JourneyField, { invalid: string; order: string }> = {
  entry: {
    invalid: "Informe uma data e uma hora válidas para a entrada.",
    order: "A entrada precisa ser o primeiro horário do dia.",
  },
  lunchStart: {
    invalid: "Informe uma data e uma hora válidas para a saída do almoço.",
    order: "A saída para o almoço precisa vir depois da entrada.",
  },
  lunchEnd: {
    invalid: "Informe uma data e uma hora válidas para a volta do almoço.",
    order: "A volta do almoço precisa vir depois da saída para o almoço.",
  },
  exit: {
    invalid: "Informe uma data e uma hora válidas para a saída.",
    order: "A saída precisa vir depois da volta do almoço.",
  },
};

export function findJourneyIssue(timestamps: JourneyTimestamps): JourneyIssue | null {
  let previous: Date | null = null;

  for (const field of ORDERED_FIELDS) {
    const date = new Date(timestamps[field]);
    if (!isValid(date)) return { field, message: FIELD_MESSAGES[field].invalid };
    if (previous !== null && date < previous) return { field, message: FIELD_MESSAGES[field].order };
    previous = date;
  }

  return null;
}
