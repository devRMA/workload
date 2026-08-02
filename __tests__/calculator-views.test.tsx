import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CalculatorViews, CalculatorViewsFromUrl, toCalculatorView } from "@/components/organisms/calculator-views";
import { safeGAEvent } from "@/lib/analytics";

vi.mock("@/lib/analytics", () => ({
  safeGAEvent: vi.fn(),
}));

vi.mock("@/components/organisms/work-calculator", () => ({
  WorkCalculator: () => <p>Painel da jornada</p>,
}));

vi.mock("@/components/organisms/salary-calculator", () => ({
  SalaryCalculator: () => <p>Painel do custo da hora</p>,
}));

const searchParams = { current: new URLSearchParams() };

vi.mock("next/navigation", () => ({
  useSearchParams: () => searchParams.current,
}));

describe("toCalculatorView", () => {
  it("only accepts the salary view, falling back to the journey", () => {
    expect(toCalculatorView("salary")).toBe("salary");
    expect(toCalculatorView("work")).toBe("work");
    expect(toCalculatorView("anything-else")).toBe("work");
    expect(toCalculatorView(null)).toBe("work");
  });
});

describe("CalculatorViews", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchParams.current = new URLSearchParams();
  });

  it("marks the active tab and links both views by URL", () => {
    render(<CalculatorViews activeView="salary" />);

    expect(screen.getByRole("link", { name: "Jornada" })).toHaveAttribute("href", "/?view=work");
    expect(screen.getByRole("link", { name: "Custo da Hora" })).toHaveAttribute("href", "/?view=salary");
    expect(screen.getByRole("link", { name: "Custo da Hora" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Jornada" })).not.toHaveAttribute("aria-current");
  });

  it("renders the panel matching the active view", async () => {
    const { rerender } = render(<CalculatorViews activeView="work" />);
    expect(screen.getByText("Painel da jornada")).toBeInTheDocument();

    rerender(<CalculatorViews activeView="salary" />);
    expect(await screen.findByText("Painel do custo da hora")).toBeInTheDocument();
  });

  it("tracks the tab the visitor moves to", async () => {
    const user = userEvent.setup();
    render(<CalculatorViews activeView="work" />);

    await user.click(screen.getByRole("link", { name: "Custo da Hora" }));

    expect(safeGAEvent).toHaveBeenCalledWith("switch_tab", { tab: "salary" });
  });

  it("reads the active view from the query string", () => {
    searchParams.current = new URLSearchParams("view=salary");
    render(<CalculatorViewsFromUrl />);

    expect(screen.getByText("Painel do custo da hora")).toBeInTheDocument();
  });

  it("falls back to the journey when the query string has no view", () => {
    render(<CalculatorViewsFromUrl />);

    expect(screen.getByText("Painel da jornada")).toBeInTheDocument();
  });
});
