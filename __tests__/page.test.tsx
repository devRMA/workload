import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Home, { metadata } from "@/app/page";

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

describe("Home", () => {
  it("serves the journey panel on the very first frame", () => {
    const markup = renderToString(<Home />);

    expect(markup).toContain("Painel da jornada");
    expect(markup).not.toContain("Painel do custo da hora");
  });
});

describe("metadata", () => {
  it("describes the journey view with its own canonical", () => {
    expect(metadata.title).toEqual({
      absolute: "Calculadora de Jornada, Horas Extras e Saldo do Dia | WorkLoad",
    });
    expect(metadata.description).toContain("hora extra");
    expect(metadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.openGraph).toMatchObject({
      title: "Calculadora de Jornada, Horas Extras e Saldo do Dia",
      url: "/",
    });
  });
});
