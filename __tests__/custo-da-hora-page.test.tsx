import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import CostPerHour, { metadata } from "@/app/custo-da-hora/page";

vi.mock("@/lib/analytics", () => ({
  safeGAEvent: vi.fn(),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: undefined, setTheme: vi.fn() }),
}));

vi.mock("@/components/organisms/work-calculator", () => ({
  WorkCalculator: () => <p>Painel da jornada</p>,
}));

vi.mock("@/components/organisms/salary-calculator", () => ({
  SalaryCalculator: () => <p>Painel do custo da hora</p>,
}));

describe("CostPerHour", () => {
  it("renders the whole shell on the server instead of a blank document", () => {
    const markup = renderToString(<CostPerHour />);

    expect(markup).toContain("WorkLoad");
    expect(markup).toContain("Jornada");
    expect(markup).toContain("Custo da Hora");
    expect(markup).toContain("Pular para o conteúdo principal");
    expect(markup).toContain("--:--:--");
  });

  it("serves the salary panel on the very first frame", () => {
    const markup = renderToString(<CostPerHour />);

    expect(markup).toContain("Painel do custo da hora");
    expect(markup).not.toContain("Painel da jornada");
  });

  it("links back to the journey route", () => {
    const markup = renderToString(<CostPerHour />);

    expect(markup).toContain('href="/"');
    expect(markup).toContain('href="/custo-da-hora"');
  });
});

describe("metadata", () => {
  it("describes the salary view with its own canonical", () => {
    expect(metadata.title).toEqual({
      absolute: "Calculadora de Valor da Hora e Salário Líquido CLT | WorkLoad",
    });
    expect(metadata.description).toContain("salário bruto");
    expect(metadata.alternates).toEqual({ canonical: "/custo-da-hora" });
    expect(metadata.openGraph).toMatchObject({
      title: "Calculadora de Valor da Hora e Salário Líquido CLT",
      url: "/custo-da-hora",
    });
  });
});
