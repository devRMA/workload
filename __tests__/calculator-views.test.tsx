import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CalculatorViews } from "@/components/organisms/calculator-views";
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

describe("CalculatorViews", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("marks the active tab and links both views by URL", () => {
    render(<CalculatorViews activeView="salary" />);

    expect(screen.getByRole("link", { name: "Jornada" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Custo da Hora" })).toHaveAttribute("href", "/custo-da-hora");
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

  it("leaves the focus alone on the first render", () => {
    const { container } = render(<CalculatorViews activeView="work" />);

    expect(container.querySelector("#main-content")).not.toHaveFocus();
    expect(document.activeElement).toBe(document.body);
  });

  it("moves the focus to the panel once the view changes", () => {
    const { container, rerender } = render(<CalculatorViews activeView="work" />);

    rerender(<CalculatorViews activeView="salary" />);

    expect(container.querySelector("#main-content")).toHaveFocus();
  });

  it("promises that nothing leaves the browser and that the numbers are an estimate", () => {
    render(<CalculatorViews activeView="work" />);

    expect(screen.getByText(/fica salvo apenas neste navegador/)).toBeInTheDocument();
    expect(screen.getByText(/não substituem seu holerite/)).toBeInTheDocument();
  });
});
