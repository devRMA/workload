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

  it("starts with an empty salary waiting to be filled in", () => {
    render(<SalaryCalculator />);

    expect(screen.getByLabelText("Salário Bruto (R$)")).toHaveValue("0,00");
    expect(screen.getByText(/0,00 por minuto/)).toBeInTheDocument();
  });

  it("shows the stored salary, the workload and the resulting hourly value", () => {
    localStorage.setItem("grossSalary", "5000");
    render(<SalaryCalculator />);

    expect(screen.getByRole("heading", { name: "Custo da Hora" })).toBeInTheDocument();
    expect(screen.getByLabelText("Salário Bruto (R$)")).toHaveValue("5.000,00");
    expect(screen.getByLabelText("Carga Horária Mensal")).toHaveValue(220);
    expect(screen.getByText("Valor por Hora")).toBeInTheDocument();
    expect(screen.getByText("Resumo Financeiro")).toBeInTheDocument();
  });

  it("starts on CLT with the regime options tucked away", () => {
    render(<SalaryCalculator />);

    expect(screen.getByRole("button", { name: /Alterar/ })).toHaveTextContent("CLT");
    expect(screen.queryByRole("radio", { name: /Estatutário/ })).toBeNull();
  });

  it("caps the contribution at the general regime ceiling for CLT", async () => {
    const user = userEvent.setup();
    localStorage.setItem("grossSalary", "20000");
    render(<SalaryCalculator />);

    await user.click(screen.getByRole("button", { name: /Impostos e Descontos/ }));

    expect(screen.getByLabelText("INSS (R$)")).toHaveAttribute("placeholder", "988,09");
  });

  it("keeps contributing past the ceiling for estatutário", async () => {
    const user = userEvent.setup();
    localStorage.setItem("grossSalary", "20000");
    render(<SalaryCalculator />);

    await user.click(screen.getByRole("button", { name: /Alterar/ }));
    await user.click(screen.getByRole("radio", { name: /Estatutário/ }));
    await user.click(screen.getByRole("button", { name: /Impostos e Descontos/ }));

    expect(screen.getByLabelText("INSS (R$)")).toHaveAttribute("placeholder", "2.768,85");
  });

  it("deducts declared dependents from the income tax", async () => {
    const user = userEvent.setup();
    localStorage.setItem("grossSalary", "10000");
    render(<SalaryCalculator />);

    await user.click(screen.getByRole("button", { name: /Impostos e Descontos/ }));
    expect(screen.getByLabelText("IRRF (R$)")).toHaveAttribute("placeholder", "1.569,55");

    await user.type(screen.getByLabelText("Dependentes"), "2");

    expect(screen.getByLabelText("IRRF (R$)")).toHaveAttribute("placeholder", "1.465,27");
  });

  it("switches the headline value between periods", async () => {
    const user = userEvent.setup();
    render(<SalaryCalculator />);

    expect(screen.getByText("Valor por Hora")).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "Mês" }));
    expect(screen.getByText("Valor por Mês")).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "Ano" }));
    expect(screen.getByText("Valor por Ano")).toBeInTheDocument();
  });

  it("derives each period from the monthly net and the daily journey", async () => {
    const user = userEvent.setup();
    localStorage.setItem("grossSalary", "5000");
    render(<SalaryCalculator />);

    await user.click(screen.getByRole("radio", { name: "Dia" }));
    expect(screen.getByText(/179,94/)).toBeInTheDocument();

    const dailyJourney = screen.getByLabelText("Jornada Diária");
    await user.clear(dailyJourney);
    await user.type(dailyJourney, "0600");

    expect(screen.getByText(/122,69/)).toBeInTheDocument();
  });

  it("counts thirteen paid months in the yearly view", async () => {
    const user = userEvent.setup();
    localStorage.setItem("grossSalary", "5000");
    render(<SalaryCalculator />);

    await user.click(screen.getByRole("radio", { name: "Ano" }));

    expect(screen.getByText(/58\.480,37/)).toBeInTheDocument();
  });

  it("summarises net salary and total deductions", () => {
    render(<SalaryCalculator />);

    expect(screen.getByText("Salário Líquido")).toBeInTheDocument();
    expect(screen.getByText("Total Descontos")).toBeInTheDocument();
  });

  it("keeps the total received hidden while it would only repeat the net salary", () => {
    localStorage.setItem("grossSalary", "5000");
    render(<SalaryCalculator />);

    expect(screen.queryByText("Total Recebido")).toBeNull();
  });

  it("shows the total received once there are extra gains to add", () => {
    localStorage.setItem("grossSalary", "5000");
    localStorage.setItem("extraGains", JSON.stringify([{ id: "bonus", name: "Bônus", value: 300 }]));
    render(<SalaryCalculator />);

    expect(screen.getByText("Total Recebido")).toBeInTheDocument();
    expect(screen.getByText("Líquido + Extras")).toBeInTheDocument();
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

  it("asks for the workload instead of showing a made up hourly value", () => {
    localStorage.setItem("monthlyHours", "0");

    render(<SalaryCalculator />);

    expect(screen.getByRole("alert")).toHaveTextContent("Informe a carga horária mensal");
    expect(screen.getByText("—")).toBeInTheDocument();
    expect(screen.getByText("Informe a carga horária mensal para calcular")).toBeInTheDocument();
  });

  it("keeps the hourly value visible once the workload is known", () => {
    localStorage.setItem("grossSalary", "5000");
    render(<SalaryCalculator />);

    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByText(/0,34 por minuto/)).toBeInTheDocument();
  });

  it("spells out the hourly rate once the headline shows another period", async () => {
    const user = userEvent.setup();
    localStorage.setItem("grossSalary", "5000");
    render(<SalaryCalculator />);

    await user.click(screen.getByRole("radio", { name: "Mês" }));

    expect(screen.getByText(/20,45 por hora · R\$ 0,34 por minuto/)).toBeInTheDocument();
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

    const detailsToggle = screen.getByRole("button", { name: /^Impostos e Descontos/ });
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

    await user.click(screen.getByRole("button", { name: /^Impostos e Descontos/ }));
    await user.click(screen.getByRole("button", { name: "Adicionar desconto" }));

    expect(screen.getByPlaceholderText("Nome (ex: Plano de Saúde)")).toBeInTheDocument();
  });
});
