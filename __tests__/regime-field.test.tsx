import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RegimeField } from "@/components/molecules/regime-field";

describe("RegimeField", () => {
  it("shows the current regime without exposing the options", () => {
    render(<RegimeField value="clt" onChange={vi.fn()} />);

    expect(screen.getByRole("group", { name: /Regime de Trabalho/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Alterar/ })).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("radio")).toBeNull();
  });

  it("reveals both regimes and checks the current one", async () => {
    const user = userEvent.setup();
    render(<RegimeField value="clt" onChange={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /Alterar/ }));

    expect(screen.getByRole("radio", { name: /^CLT/ })).toBeChecked();
    expect(screen.getByRole("radio", { name: /Estatutário/ })).not.toBeChecked();
    expect(screen.getByText(/só o cálculo do INSS/)).toBeInTheDocument();
  });

  it("reports the regime the user picks and collapses again", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<RegimeField value="clt" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: /Alterar/ }));
    await user.click(screen.getByRole("radio", { name: /Estatutário/ }));

    expect(onChange).toHaveBeenCalledWith("estatutario");
    expect(screen.getByRole("button", { name: /Alterar/ })).toHaveAttribute("aria-expanded", "false");
  });

  it("falls back to the first regime when the stored one no longer exists", () => {
    render(<RegimeField value={"empregado-publico" as never} onChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: /Alterar/ })).toHaveTextContent("CLT");
  });

  it("merges a custom className", () => {
    const { container } = render(<RegimeField value="clt" onChange={vi.fn()} className="my-custom" />);

    expect(container.firstElementChild?.className).toContain("my-custom");
  });
});
