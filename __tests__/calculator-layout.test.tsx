import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CalculatorLayout } from "@/components/templates/calculator-layout";

describe("CalculatorLayout", () => {
	it("renders both regions", () => {
		render(
			<CalculatorLayout
				main={<h2>Sua Jornada</h2>}
				aside={<p>Painel destaque</p>}
			/>,
		);

		expect(
			screen.getByRole("heading", { name: "Sua Jornada" }),
		).toBeInTheDocument();
		expect(screen.getByText("Painel destaque")).toBeInTheDocument();
	});

	it("applies the calculator accent class", () => {
		const { container } = render(
			<CalculatorLayout
				className="selection:bg-blue-500/30"
				main={<p>Formulário</p>}
				aside={<p>Destaque</p>}
			/>,
		);

		expect(container.firstElementChild).toHaveClass("selection:bg-blue-500/30");
	});
});
