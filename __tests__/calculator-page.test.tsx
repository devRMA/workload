import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CalculatorPage } from "@/components/templates/calculator-page";

vi.mock("@/lib/analytics", () => ({
  safeGAEvent: vi.fn(),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: undefined, setTheme: vi.fn() }),
}));

function renderShell() {
  return render(
    <CalculatorPage>
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
    expect(screen.getByRole("heading", { name: "WorkLoad" })).toBeInTheDocument();
    expect(screen.getByRole("main")).toContainElement(screen.getByText("Conteúdo da calculadora"));
  });

  it("offers a skip link that jumps straight to the main content", () => {
    renderShell();

    expect(screen.getByRole("link", { name: "Pular para o conteúdo principal" })).toHaveAttribute(
      "href",
      "#main-content",
    );
  });

  it("describes the application to search engines with valid structured data", () => {
    const { container } = renderShell();
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).not.toBeNull();
    expect(JSON.parse(script?.textContent ?? "")).toEqual({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "WorkLoad",
      url: "https://workload.devrma.com",
      description: "Calculadora inteligente de jornada e valor de trabalho.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      author: {
        "@type": "Person",
        name: "Rafael Augusto",
      },
    });
  });

  it("keeps the decorative background out of the accessibility tree", () => {
    const { container } = renderShell();

    expect(container.querySelectorAll(".pointer-events-none .blur-\\[120px\\]")).toHaveLength(3);
  });
});
