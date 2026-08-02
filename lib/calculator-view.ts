export type CalculatorView = "work" | "salary";

export const VIEW_PATHS: Record<CalculatorView, string> = {
  work: "/",
  salary: "/custo-da-hora",
};
