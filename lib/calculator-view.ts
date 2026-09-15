export type CalculatorView = "work" | "salary";

export const VIEW_PATHS: Record<CalculatorView, string> = {
  work: "/",
  salary: "/custo-da-hora",
};

export const VIEW_HEADINGS: Record<CalculatorView, string> = {
  work: "Calculadora de jornada de trabalho, horas extras e saldo do dia",
  salary: "Calculadora de valor da hora e salário líquido CLT",
};
