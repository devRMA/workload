import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
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

  it("names the ladder's limit whenever the estatutário regime is the selected one, panel closed", () => {
    render(<RegimeField value="estatutario" onChange={vi.fn()} />);

    expect(
      screen.getByText(/A tabela do RPPS federal não se aplica a servidor estadual ou municipal/),
    ).toBeInTheDocument();
    expect(screen.queryByRole("radio")).toBeNull();
    expect(screen.getByText(/EC nº 103\/2019, art\. 9º, §4º/)).toBeInTheDocument();
  });

  it("keeps the legend out of the CLT state", () => {
    const { rerender } = render(<RegimeField value="clt" onChange={vi.fn()} />);

    expect(screen.queryByText(/A tabela do RPPS federal não se aplica/)).toBeNull();

    rerender(<RegimeField value={"empregado-publico" as never} onChange={vi.fn()} />);

    expect(screen.queryByText(/A tabela do RPPS federal não se aplica/)).toBeNull();
  });

  it("survives the selection gesture that closes the panel", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [value, setValue] = useState<Parameters<typeof RegimeField>[0]["value"]>("clt");
      return <RegimeField value={value} onChange={setValue} />;
    }

    render(<Harness />);

    await user.click(screen.getByRole("button", { name: /Alterar/ }));
    await user.click(screen.getByRole("radio", { name: /Estatutário/ }));

    expect(screen.getByRole("button", { name: /Alterar/ })).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByText(/A tabela do RPPS federal não se aplica a servidor estadual ou municipal/),
    ).toBeInTheDocument();
  });

  it("describes the regime group by the legend while it renders", () => {
    const { rerender } = render(<RegimeField value="estatutario" onChange={vi.fn()} />);

    expect(screen.getByRole("group", { name: "Regime de Trabalho" })).toHaveAttribute(
      "aria-describedby",
      "regime-federal-rpps-gap",
    );

    rerender(<RegimeField value="clt" onChange={vi.fn()} />);

    expect(screen.getByRole("group", { name: "Regime de Trabalho" })).not.toHaveAttribute("aria-describedby");
  });

  it("says something different from the card", async () => {
    const user = userEvent.setup();
    render(<RegimeField value="estatutario" onChange={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /Alterar/ }));

    const legend = screen.getByText(/A tabela do RPPS federal não se aplica a servidor estadual ou municipal/);
    const card = screen.getByRole("radio", { name: /Estatutário/ }).closest("label");
    const cardImpact = card?.querySelector(".text-ink")?.textContent ?? "";

    expect(cardImpact).not.toBe("");
    expect(cardImpact).not.toContain(legend.textContent);
    expect(legend.textContent).not.toContain(cardImpact);
  });

  it("reaches the estatutário radio from the keyboard and keeps the legend afterwards", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [value, setValue] = useState<Parameters<typeof RegimeField>[0]["value"]>("clt");
      return <RegimeField value={value} onChange={setValue} />;
    }

    render(<Harness />);

    screen.getByRole("button", { name: /Alterar/ }).focus();
    await user.keyboard("{Enter}");
    screen.getByRole("radio", { name: /Estatutário/ }).focus();
    await user.keyboard(" ");

    expect(
      screen.getByText(/A tabela do RPPS federal não se aplica a servidor estadual ou municipal/),
    ).toBeInTheDocument();
  });
});
