import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RegimeField } from "@/components/molecules/regime-field";

describe("RegimeField", () => {
  it("offers one option per work regime and checks the current one", () => {
    render(<RegimeField value="clt" onChange={vi.fn()} />);

    expect(screen.getByRole("group", { name: /Regime de Trabalho/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /^CLT/ })).toBeChecked();
    expect(screen.getByRole("radio", { name: /Empregado Público/ })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /Estatutário/ })).not.toBeChecked();
  });

  it("reports the regime the user picks", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<RegimeField value="clt" onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: /Estatutário/ }));

    expect(onChange).toHaveBeenCalledWith("estatutario");
  });

  it("explains what each regime changes only when asked", async () => {
    const user = userEvent.setup();
    render(<RegimeField value="clt" onChange={vi.fn()} />);

    const guideToggle = screen.getByRole("button", { name: /Qual é o meu regime\?/ });
    expect(guideToggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(/só o cálculo do INSS/)).toBeNull();

    await user.click(guideToggle);

    expect(guideToggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/22% sobre a parcela mais alta/)).toBeInTheDocument();
    expect(screen.getByText(/só o cálculo do INSS/)).toBeInTheDocument();
  });

  it("merges a custom className", () => {
    const { container } = render(<RegimeField value="clt" onChange={vi.fn()} className="my-custom" />);

    expect(container.firstElementChild?.className).toContain("my-custom");
  });
});
