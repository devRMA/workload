import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SalaryCalculator } from "@/components/organisms/salary-calculator";

vi.mock("@/lib/analytics", () => ({
	safeGAEvent: vi.fn(),
}));

describe("SalaryCalculator", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("shows the stored salary, the workload and the resulting hourly value", () => {
		render(<SalaryCalculator />);

		expect(
			screen.getByRole("heading", { name: "Custo da Hora" }),
		).toBeInTheDocument();
		expect(screen.getByLabelText("Salário Bruto (R$)")).toHaveValue("5.000,00");
		expect(screen.getByLabelText("Carga Horária Mensal")).toHaveValue(220);
		expect(screen.getByText("Valor da Hora")).toBeInTheDocument();
		expect(screen.getByText("Resumo Financeiro")).toBeInTheDocument();
	});

	it("summarises net salary, total received and total deductions", () => {
		render(<SalaryCalculator />);

		expect(screen.getByText("Salário Líquido")).toBeInTheDocument();
		expect(screen.getByText("Total Recebido")).toBeInTheDocument();
		expect(screen.getByText("Total Descontos")).toBeInTheDocument();
	});

	it("recalculates the hourly value when the salary changes", async () => {
		const user = userEvent.setup();
		render(<SalaryCalculator />);

		const salaryField = screen.getByLabelText("Salário Bruto (R$)");
		await user.clear(salaryField);
		await user.type(salaryField, "100000");

		expect(salaryField).toHaveValue("1.000,00");
	});

	it("leaves the workload field empty when no hours are stored", () => {
		localStorage.setItem("monthlyHours", "0");

		render(<SalaryCalculator />);

		expect(screen.getByLabelText("Carga Horária Mensal")).toHaveValue(null);
	});

	it("accepts a new workload", async () => {
		const user = userEvent.setup();
		render(<SalaryCalculator />);

		const hoursField = screen.getByLabelText("Carga Horária Mensal");
		await user.clear(hoursField);
		await user.type(hoursField, "200");

		expect(hoursField).toHaveValue(200);
	});

	it("reveals the taxes and deductions panel on demand", async () => {
		const user = userEvent.setup();
		render(<SalaryCalculator />);

		const detailsToggle = screen.getByRole("button", {
			name: "Impostos e Descontos",
		});
		expect(detailsToggle).toHaveAttribute("aria-expanded", "false");
		expect(screen.queryByLabelText("INSS (R$)")).toBeNull();

		await user.click(detailsToggle);

		expect(detailsToggle).toHaveAttribute("aria-expanded", "true");
		expect(screen.getByLabelText("INSS (R$)")).toBeInTheDocument();
		expect(screen.getByText("Outros Descontos")).toBeInTheDocument();
		expect(screen.getByText("Ganhos Extras (Líquido)")).toBeInTheDocument();
	});

	it("adds a deduction row through the panel", async () => {
		const user = userEvent.setup();
		render(<SalaryCalculator />);

		await user.click(
			screen.getByRole("button", { name: "Impostos e Descontos" }),
		);
		await user.click(
			screen.getByRole("button", { name: "Adicionar desconto" }),
		);

		expect(
			screen.getByPlaceholderText("Nome (ex: Plano de Saúde)"),
		).toBeInTheDocument();
	});
});
