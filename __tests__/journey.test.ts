import { describe, expect, it } from "vitest";
import { findJourneyIssue, type JourneyTimestamps } from "@/lib/journey";

const DAY = "2025-01-06";

const JOURNEY: JourneyTimestamps = {
  entry: `${DAY}T08:00`,
  lunchStart: `${DAY}T12:00`,
  lunchEnd: `${DAY}T13:00`,
  exit: `${DAY}T17:48`,
};

describe("findJourneyIssue", () => {
  it("accepts a journey where every moment follows the previous one", () => {
    expect(findJourneyIssue(JOURNEY)).toBeNull();
  });

  it("accepts a night journey that ends on the next day", () => {
    expect(
      findJourneyIssue({
        entry: `${DAY}T22:00`,
        lunchStart: "2025-01-07T01:00",
        lunchEnd: "2025-01-07T02:00",
        exit: "2025-01-07T07:00",
      }),
    ).toBeNull();
  });

  it("accepts moments that share the same instant", () => {
    expect(
      findJourneyIssue({
        entry: `${DAY}T08:00`,
        lunchStart: `${DAY}T08:00`,
        lunchEnd: `${DAY}T08:00`,
        exit: `${DAY}T08:00`,
      }),
    ).toBeNull();
  });

  it("blames the entry when it cannot be read as a date", () => {
    expect(findJourneyIssue({ ...JOURNEY, entry: "" })).toEqual({
      field: "entry",
      message: "Informe uma data e uma hora válidas para a entrada.",
    });
  });

  it("blames the lunch start when it cannot be read as a date", () => {
    expect(findJourneyIssue({ ...JOURNEY, lunchStart: "nao-e-data" })).toEqual({
      field: "lunchStart",
      message: "Informe uma data e uma hora válidas para a saída do almoço.",
    });
  });

  it("blames the lunch end when it cannot be read as a date", () => {
    expect(findJourneyIssue({ ...JOURNEY, lunchEnd: "nao-e-data" })).toEqual({
      field: "lunchEnd",
      message: "Informe uma data e uma hora válidas para a volta do almoço.",
    });
  });

  it("blames the exit when it cannot be read as a date", () => {
    expect(findJourneyIssue({ ...JOURNEY, exit: "" })).toEqual({
      field: "exit",
      message: "Informe uma data e uma hora válidas para a saída.",
    });
  });

  it("blames the lunch start when it comes before the entry", () => {
    expect(findJourneyIssue({ ...JOURNEY, lunchStart: `${DAY}T07:00` })).toEqual({
      field: "lunchStart",
      message: "A saída para o almoço precisa vir depois da entrada.",
    });
  });

  it("blames the lunch end when it comes before the lunch start", () => {
    expect(findJourneyIssue({ ...JOURNEY, lunchEnd: `${DAY}T11:00` })).toEqual({
      field: "lunchEnd",
      message: "A volta do almoço precisa vir depois da saída para o almoço.",
    });
  });

  it("blames the exit when it comes before the lunch end", () => {
    expect(findJourneyIssue({ ...JOURNEY, exit: `${DAY}T12:30` })).toEqual({
      field: "exit",
      message: "A saída precisa vir depois da volta do almoço.",
    });
  });

  it("reports only the first moment that breaks the journey", () => {
    expect(
      findJourneyIssue({
        entry: `${DAY}T18:00`,
        lunchStart: `${DAY}T12:00`,
        lunchEnd: `${DAY}T11:00`,
        exit: "",
      }),
    ).toEqual({
      field: "lunchStart",
      message: "A saída para o almoço precisa vir depois da entrada.",
    });
  });
});
