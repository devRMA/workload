import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { CurrencyInput } from "@/components/atoms/currency-input";
import { parseCurrency } from "@/lib/utils";

function CurrencyHarness({ initialValue = 0 }: { initialValue?: number }) {
  const [value, setValue] = useState<number | null>(initialValue);

  return (
    <CurrencyInput
      aria-label="Valor"
      value={value}
      onValueChange={(rawValue) => setValue(rawValue === "" ? null : parseCurrency(rawValue))}
    />
  );
}

describe("CurrencyInput", () => {
  it("formats the amount it is given", () => {
    render(<CurrencyInput aria-label="Valor" value={1234.5} onValueChange={vi.fn()} />);

    expect(screen.getByLabelText("Valor")).toHaveValue("1.234,50");
  });

  it("shows an empty field when there is no amount", () => {
    render(<CurrencyInput aria-label="Valor" value={null} onValueChange={vi.fn()} />);

    expect(screen.getByLabelText("Valor")).toHaveValue("");
  });

  it("reports what was typed so the caller can parse it", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<CurrencyInput aria-label="Valor" value={0} onValueChange={onValueChange} />);

    await user.type(screen.getByLabelText("Valor"), "5");

    expect(onValueChange).toHaveBeenCalledWith("0,005");
  });

  it("keeps the caret next to the digit that was just typed", async () => {
    const user = userEvent.setup();
    render(<CurrencyHarness initialValue={1234.56} />);

    const field = screen.getByLabelText<HTMLInputElement>("Valor");
    field.setSelectionRange(1, 1);
    await user.type(field, "9", { initialSelectionStart: 1, initialSelectionEnd: 1 });

    expect(field.value).toBe("19.234,56");
    expect(field.selectionStart).toBe(2);
  });

  it("leaves the caret alone while the field is not focused", () => {
    const { rerender } = render(<CurrencyInput aria-label="Valor" value={10} onValueChange={vi.fn()} />);

    rerender(<CurrencyInput aria-label="Valor" value={20} onValueChange={vi.fn()} />);

    expect(screen.getByLabelText("Valor")).toHaveValue("20,00");
  });
});
