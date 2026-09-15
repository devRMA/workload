import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CalculatorPage } from "@/components/templates/calculator-page";
import type { CalculatorView } from "@/lib/calculator-view";

vi.mock("@/lib/analytics", () => ({
  safeGAEvent: vi.fn(),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: undefined, setTheme: vi.fn() }),
}));

function renderShell(view: CalculatorView = "work") {
  return render(
    <CalculatorPage view={view}>
      <p>Conteúdo da calculadora</p>
    </CalculatorPage>,
  );
}

describe("CalculatorPage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-06T09:30:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("wraps its children in the application shell", () => {
    renderShell();

    expect(screen.getByText("Conteúdo da calculadora")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Calculadora de jornada de trabalho, horas extras e banco de horas",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toContainElement(screen.getByText("Conteúdo da calculadora"));
  });

  it("offers a skip link that jumps straight to the main content", () => {
    renderShell();

    expect(screen.getByRole("link", { name: "Pular para o conteúdo principal" })).toHaveAttribute(
      "href",
      "#main-content",
    );
  });

  it("describes the journey route to search engines with its own structured data", () => {
    const { container } = renderShell("work");
    const script = container.querySelector('script[type="application/ld+json"]');
    const graph = JSON.parse(script?.textContent ?? "")["@graph"];

    expect(graph[0]).toMatchObject({
      "@type": "WebApplication",
      url: "https://workload.devrma.com/",
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    });
    expect(graph[0].name).toContain("horas extras");
    expect(graph[1]).toMatchObject({ "@type": "BreadcrumbList" });
    expect(graph[1].itemListElement).toHaveLength(1);
  });

  it("gives the hourly cost route a distinct application and a two-step breadcrumb", () => {
    const { container } = renderShell("salary");
    const graph = JSON.parse(container.querySelector('script[type="application/ld+json"]')?.textContent ?? "")[
      "@graph"
    ];

    expect(graph[0].url).toBe("https://workload.devrma.com/custo-da-hora");
    expect(graph[0].name).toContain("salário líquido");
    expect(graph[1].itemListElement.map((item: { name: string }) => item.name)).toEqual(["Início", "Custo da Hora"]);
  });
});
