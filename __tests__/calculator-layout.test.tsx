import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CalculatorLayout } from "@/components/templates/calculator-layout";

describe("CalculatorLayout", () => {
  it("renders both regions", () => {
    render(<CalculatorLayout main={<h2>Sua Jornada</h2>} aside={<p>Painel destaque</p>} />);

    expect(screen.getByRole("heading", { name: "Sua Jornada" })).toBeInTheDocument();
    expect(screen.getByText("Painel destaque")).toBeInTheDocument();
  });
});
