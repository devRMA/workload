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

  it("asks for the workload instead of showing a made up hourly value, with the operands and the disclosure (R3)", () => {
    localStorage.setItem("grossSalary", "5000");
    localStorage.setItem("monthlyHours", "0");

    render(<SalaryCalculator />);

    const banner = screen.getByRole("alert");
    expect(banner).toHaveTextContent("Informe a carga horária mensal");
    expect(banner).toHaveTextContent("Sem ela não dá para saber quanto vale a sua hora");
    expect(banner).toHaveTextContent("8h48 por dia");
    expect(banner).toHaveTextContent("5 dias por semana");
    expect(banner).toHaveTextContent("220,00 horas por mês");
    expect(banner).toHaveTextContent("art. 611-A, I, da CLT");
    expect(screen.getByText("Sem carga horária")).toBeInTheDocument();
    expect(screen.getByText("Informe a carga horária mensal para calcular")).toBeInTheDocument();
  });

  it("refuses to pass a missing salary off as a confident zero", () => {
    render(<SalaryCalculator />);

    expect(screen.getAllByRole("alert")[0]).toHaveTextContent("Informe o seu salário bruto");
    expect(screen.getByText(/Esse zero não é o seu salário/)).toBeInTheDocument();
  });

  it("keeps the zero and the disclaimer that it is not the salary in the same banner", () => {
    render(<SalaryCalculator />);

    const banner = screen.getAllByRole("alert")[0];
    expect(banner).toHaveTextContent("R$ 0,00");
    expect(banner).toHaveTextContent("Esse zero não é o seu salário");
  });

  it("names the specific week that produces the divisor, never a general rule", () => {
    localStorage.setItem("grossSalary", "3000");
    localStorage.setItem("monthlyHours", "220");
    localStorage.setItem("workMinutes", "480");
    localStorage.setItem("workDaysPerWeek", "5");

    render(<SalaryCalculator />);

    const banner = screen.getByRole("status");
    expect(banner).toHaveTextContent("A carga mensal não combina com a sua semana");
    expect(banner).toHaveTextContent("8h00 por dia");
    expect(banner).toHaveTextContent("5 dias por semana");
    expect(banner).toHaveTextContent("200,00 horas por mês");
    expect(banner).toHaveTextContent("Súmula 431 do TST, para a semana de 40 horas");
    expect(banner).toHaveTextContent("Você informou 220,00 horas");
    expect(banner).toHaveTextContent("Os valores desta tela usam a carga que você informou");
    expect(banner).toHaveTextContent("art. 611-A, I, da CLT");
    expect(banner).not.toHaveTextContent("e não");
    expect(banner).not.toHaveTextContent("Usar um divisor maior do que o devido");
  });

  it("cites art. 64 and not Súmula 431 for a week the súmula's text does not cover (AC6)", () => {
    localStorage.setItem("grossSalary", "3000");
    localStorage.setItem("monthlyHours", "220");
    localStorage.setItem("workMinutes", "440");
    localStorage.setItem("workDaysPerWeek", "5");

    render(<SalaryCalculator />);

    const banner = screen.getByRole("status");
    expect(banner).toHaveTextContent("183,33 horas por mês");
    expect(banner).toHaveTextContent("(art. 64, parágrafo único, da CLT)");
    expect(banner).not.toHaveTextContent("Súmula 431");
  });

  it("renders the divisor with a pt-BR comma, never a dot (AC7, N3)", () => {
    localStorage.setItem("grossSalary", "3000");
    localStorage.setItem("monthlyHours", "220");
    localStorage.setItem("workMinutes", "440");
    localStorage.setItem("workDaysPerWeek", "5");

    render(<SalaryCalculator />);

    const banner = screen.getByRole("status");
    expect(banner).toHaveTextContent("183,33");
    expect(banner).not.toHaveTextContent("183.33");
  });

  it("cites art. 64, caput at a six-day week (D6)", () => {
    localStorage.setItem("grossSalary", "3000");
    localStorage.setItem("monthlyHours", "200");
    localStorage.setItem("workMinutes", "440");
    localStorage.setItem("workDaysPerWeek", "6");

    render(<SalaryCalculator />);

    const banner = screen.getByRole("status");
    expect(banner).toHaveTextContent("220,00 horas por mês");
    expect(banner).toHaveTextContent("(art. 64, caput, da CLT)");
  });

  it("uses the singular for a one-day week", () => {
    localStorage.setItem("grossSalary", "3000");
    localStorage.setItem("monthlyHours", "220");
    localStorage.setItem("workMinutes", "480");
    localStorage.setItem("workDaysPerWeek", "1");

    render(<SalaryCalculator />);

    const banner = screen.getByRole("status");
    expect(banner).toHaveTextContent("1 dia por semana");
    expect(banner).not.toHaveTextContent("1 dias");
  });

  it("refuses above the daily ceiling and states no divisor (AC2, E5, R7b)", () => {
    localStorage.setItem("grossSalary", "3000");
    localStorage.setItem("workMinutes", "720");
    localStorage.setItem("workDaysPerWeek", "5");

    render(<SalaryCalculator />);

    const banner = screen.getByRole("status");
    expect(banner).toHaveTextContent("Sem divisor acima de 10 horas por dia");
    expect(banner).toHaveTextContent("60 horas semanais");
    expect(banner).toHaveTextContent("art. 59, §2º, da CLT");
    expect(banner).toHaveTextContent("art. 59-A");
    expect(banner).not.toHaveTextContent("divisor é");
    expect(banner).not.toHaveTextContent("Súmula 431");
    expect(banner).not.toHaveTextContent("300");
  });

  it("refuses above the weekly ceiling and states no divisor (AC2, R7a)", () => {
    localStorage.setItem("grossSalary", "3000");
    localStorage.setItem("workMinutes", "528");
    localStorage.setItem("workDaysPerWeek", "6");

    render(<SalaryCalculator />);

    const banner = screen.getByRole("status");
    expect(banner).toHaveTextContent("Sem divisor para esta semana");
    expect(banner).toHaveTextContent("52,8 horas semanais");
    expect(banner).toHaveTextContent("art. 7º, XIII, da Constituição");
    expect(banner).not.toHaveTextContent("divisor é");
  });

  it("refuses a seven-day week as out of domain (R1)", () => {
    localStorage.setItem("grossSalary", "3000");
    localStorage.setItem("workDaysPerWeek", "7");

    render(<SalaryCalculator />);

    const banner = screen.getByRole("alert");
    expect(banner).toHaveTextContent("A semana tem um dia de descanso");
    expect(banner).toHaveTextContent("art. 67 da CLT");
    expect(banner).toHaveTextContent("art. 1º da Lei 605/49");
    expect(banner).toHaveTextContent("o máximo aqui é 6 dias");

    const daysField = screen.getByRole("spinbutton", { name: "Dias Trabalhados" });
    expect(daysField).toHaveAttribute("aria-invalid", "true");
    expect(daysField).toHaveAttribute("aria-describedby", "divisor-alert");
  });

  it("asks for the day count when it is cleared (R1)", async () => {
    const user = userEvent.setup();
    localStorage.setItem("grossSalary", "3000");

    render(<SalaryCalculator />);

    const daysField = screen.getByRole("spinbutton", { name: "Dias Trabalhados" });
    await user.clear(daysField);

    expect(screen.getByRole("alert")).toHaveTextContent("Informe os dias trabalhados por semana");
  });

  it("stays silent when the declared carga matches the collected week (Silêncio, AC5)", () => {
    localStorage.setItem("grossSalary", "5000");

    render(<SalaryCalculator />);

    expect(screen.queryByText("A carga mensal não combina com a sua semana")).toBeNull();
    expect(screen.queryByText(/divisor é/)).toBeNull();
    expect(screen.queryByRole("status")).toBeNull();
  });

  describe("the hourly-rate scope disclosure (D4)", () => {
    const D4_TEXT =
      "Bancário, turno ininterrupto de revezamento e escala 12x36 têm divisor próprio, fixado por norma da categoria (Súmula 124 e OJ 396 do TST, art. 59-A da CLT). Se for o seu caso, o valor da hora nesta tela é outro.";

    const STATES = [
      { name: "R1", storage: { workDaysPerWeek: "7" } },
      { name: "R2", storage: { workMinutes: "720" } },
      { name: "R3", storage: { monthlyHours: "0" } },
      { name: "R4", storage: { monthlyHours: "200" } },
      { name: "Silêncio", storage: {} },
    ] as const;

    it("covers exactly the five states of the Salário panel", () => {
      expect(STATES).toHaveLength(5);
    });

    it.each(STATES)("renders exactly once in $name", ({ storage }) => {
      localStorage.setItem("grossSalary", "3000");
      for (const [key, value] of Object.entries(storage)) {
        localStorage.setItem(key, value);
      }

      render(<SalaryCalculator />);

      expect(screen.getAllByText(D4_TEXT)).toHaveLength(1);
    });

    it("sits as the immediate next sibling of the field grid, inside the Salário card", () => {
      render(<SalaryCalculator />);

      const disclosure = document.getElementById("divisor-disclosure");
      expect(disclosure?.parentElement?.id).toBe("salary-panel");
      expect(disclosure?.previousElementSibling?.id).toBe("salary-fields");
    });

    it("renders once with no divisor banner in the silent-agreement state the ruling exists for", () => {
      localStorage.setItem("grossSalary", "3000");
      localStorage.setItem("workMinutes", "360");
      localStorage.setItem("workDaysPerWeek", "5");
      localStorage.setItem("monthlyHours", "150");

      render(<SalaryCalculator />);

      expect(screen.queryByRole("alert")).toBeNull();
      expect(screen.queryByRole("status")).toBeNull();
      expect(screen.getAllByText(D4_TEXT)).toHaveLength(1);
    });
  });

  it("collects the days worked per week, defaulting to five", () => {
    render(<SalaryCalculator />);

    expect(screen.getByRole("spinbutton", { name: "Dias Trabalhados" })).toHaveValue(5);
  });

  it("recomputes the divisor from a changed day count", async () => {
    const user = userEvent.setup();
    localStorage.setItem("grossSalary", "3000");
    localStorage.setItem("monthlyHours", "220");
    localStorage.setItem("workMinutes", "480");

    render(<SalaryCalculator />);

    expect(screen.getByRole("status")).toHaveTextContent("200,00 horas por mês");

    const daysField = screen.getByRole("spinbutton", { name: "Dias Trabalhados" });
    await user.clear(daysField);
    await user.type(daysField, "6");

    expect(screen.queryByText("A carga mensal não combina com a sua semana")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("Sem divisor para esta semana");
  });

  it("persists a changed day count", async () => {
    const user = userEvent.setup();
    render(<SalaryCalculator />);

    const daysField = screen.getByRole("spinbutton", { name: "Dias Trabalhados" });
    await user.clear(daysField);
    await user.type(daysField, "6");

    expect(localStorage.getItem("workDaysPerWeek")).toBe("6");
  });

  it("reaches the day count field right after the daily journey on the keyboard path", async () => {
    const user = userEvent.setup();
    render(<SalaryCalculator />);

    screen.getByLabelText("Jornada Diária").focus();
    await user.tab();

    expect(document.activeElement).toBe(screen.getByRole("spinbutton", { name: "Dias Trabalhados" }));
  });

  it("quotes the norm's own term for the overtime base", () => {
    render(<SalaryCalculator />);

    expect(screen.getByText(/calculada sobre a hora normal \(art\. 59, §1º, da CLT\)/)).toBeInTheDocument();
    expect(screen.queryByText(/como manda o art\. 59/)).toBeNull();
  });

  it("discloses the thirteenth month only when the year is the chosen period", async () => {
    const user = userEvent.setup();
    render(<SalaryCalculator />);

    expect(screen.queryByText(/O valor do Ano soma 12 meses/)).toBeNull();

    await user.click(screen.getByRole("radio", { name: "Ano" }));

    const disclosure = screen.getByText(/O valor do Ano soma 12 meses/);
    expect(disclosure).toHaveTextContent("art. 7º, VIII, da CF");
    expect(disclosure).toHaveTextContent("Lei nº 4.090/1962");
    expect(disclosure).toHaveTextContent("É uma aproximação");
  });

  it("describes the period group by the approximation while Ano is selected", async () => {
    const user = userEvent.setup();
    render(<SalaryCalculator />);

    expect(screen.getByRole("group", { name: "Visualizar o valor por período" })).not.toHaveAttribute(
      "aria-describedby",
    );

    await user.click(screen.getByRole("radio", { name: "Ano" }));

    expect(screen.getByRole("group", { name: "Visualizar o valor por período" })).toHaveAttribute(
      "aria-describedby",
      "annual-period-disclosure",
    );
  });

  it("reaches the Ano disclosure from the keyboard, not only the pointer", async () => {
    const user = userEvent.setup();
    render(<SalaryCalculator />);

    screen.getByRole("radio", { name: "Mês" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("radio", { name: "Ano" })).toBeChecked();
    expect(screen.getByText(/O valor do Ano soma 12 meses/)).toBeInTheDocument();
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
