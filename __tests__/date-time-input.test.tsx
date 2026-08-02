import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { DateTimeInput } from "@/components/molecules/date-time-input";

function InputHarness({
  initialValue = "2026-02-01T08:00",
  onChange,
}: {
  initialValue?: string;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <DateTimeInput
      label="Entrada"
      icon={LogIn}
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
    />
  );
}

describe("DateTimeInput", () => {
  it("labels the date field through the visible label and the time field explicitly", () => {
    render(<InputHarness />);

    expect(screen.getByLabelText("Entrada")).toHaveValue("01/02/2026");
    expect(screen.getByLabelText("Hora para Entrada")).toHaveValue("08:00");
  });

  it("reports a new date keeping the current time", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<InputHarness onChange={onChange} />);

    const dateField = screen.getByLabelText("Entrada");
    await user.clear(dateField);
    await user.type(dateField, "15032026");

    expect(onChange).toHaveBeenCalledWith("2026-03-15T08:00");
  });

  it("reports a new time keeping the current date", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<InputHarness onChange={onChange} />);

    const timeField = screen.getByLabelText("Hora para Entrada");
    await user.clear(timeField);
    await user.type(timeField, "0930");

    expect(onChange).toHaveBeenCalledWith("2026-02-01T09:30");
  });

  it("restores the previous date when an impossible one is typed", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<InputHarness onChange={onChange} />);

    const dateField = screen.getByLabelText("Entrada");
    await user.clear(dateField);
    await user.type(dateField, "31022026");
    await user.tab();

    expect(dateField).toHaveValue("01/02/2026");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("restores the previous time when an impossible one is typed", async () => {
    const user = userEvent.setup();
    render(<InputHarness />);

    const timeField = screen.getByLabelText("Hora para Entrada");
    await user.clear(timeField);
    await user.type(timeField, "2599");
    await user.tab();

    expect(timeField).toHaveValue("08:00");
  });

  it("falls back to today when there is no date yet", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<InputHarness initialValue="" onChange={onChange} />);

    expect(screen.getByLabelText("Entrada")).toHaveValue("");

    await user.type(screen.getByLabelText("Hora para Entrada"), "0715");

    expect(onChange).toHaveBeenCalledWith(`${format(new Date(), "yyyy-MM-dd")}T07:15`);
  });

  it("falls back to midnight when there is no time yet", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<InputHarness initialValue="" onChange={onChange} />);

    await user.type(screen.getByLabelText("Entrada"), "10032026");

    expect(onChange).toHaveBeenCalledWith("2026-03-10T00:00");
  });

  it("keeps an unrecognised date part visible instead of blanking it", () => {
    render(<InputHarness initialValue="indefinidoT08:00" />);

    expect(screen.getByLabelText("Entrada")).toHaveValue("indefinido");
  });

  it("uses the provided id for the date field", () => {
    render(
      <DateTimeInput label="Saída Real" icon={LogIn} id="saida-real" value="2026-02-01T18:00" onChange={vi.fn()} />,
    );

    expect(screen.getByLabelText("Saída Real")).toHaveAttribute("id", "saida-real");
  });
});
