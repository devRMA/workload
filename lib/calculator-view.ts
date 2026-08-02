export type CalculatorView = "work" | "salary";

const DEFAULT_VIEW: CalculatorView = "work";

export function toCalculatorView(rawView: string | null): CalculatorView {
  return rawView === "salary" ? "salary" : DEFAULT_VIEW;
}
