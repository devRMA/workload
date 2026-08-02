import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { MaskedInput } from "@/components/atoms/masked-input";

const TIME_GROUPS = [2, 2] as const;
const DATE_GROUPS = [2, 2, 4] as const;

const isRealTime = (masked: string) => {
  const [hours, minutes] = masked.split(":").map(Number);
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
};

function TimeHarness({ onCommit }: { onCommit?: (value: string) => void }) {
  const [value, setValue] = useState("08:00");

  return (
    <>
      <MaskedInput
        aria-label="Hora"
        value={value}
        separator=":"
        groupSizes={TIME_GROUPS}
        isValid={isRealTime}
        onCommit={(committed) => {
          setValue(committed);
          onCommit?.(committed);
        }}
      />
      <button type="button" onClick={() => setValue("23:59")}>
        Definir externamente
      </button>
    </>
  );
}

describe("MaskedInput", () => {
  it("inserts the separator while digits are typed", async () => {
    const user = userEvent.setup();
    render(<TimeHarness />);
    const input = screen.getByLabelText("Hora");

    await user.clear(input);
    await user.type(input, "0");
    expect(input).toHaveValue("0");

    await user.type(input, "8");
    expect(input).toHaveValue("08");

    await user.type(input, "4");
    expect(input).toHaveValue("08:4");

    await user.type(input, "5");
    expect(input).toHaveValue("08:45");
  });

  it("ignores non-digit characters and extra digits", async () => {
    const user = userEvent.setup();
    render(<TimeHarness />);
    const input = screen.getByLabelText("Hora");

    await user.clear(input);
    await user.type(input, "1a2b3c49");

    expect(input).toHaveValue("12:34");
  });

  it("commits the value as soon as the mask is complete and valid", async () => {
    const onCommit = vi.fn();
    const user = userEvent.setup();
    render(<TimeHarness onCommit={onCommit} />);
    const input = screen.getByLabelText("Hora");

    await user.clear(input);
    await user.type(input, "1015");

    expect(onCommit).toHaveBeenCalledWith("10:15");
  });

  it("never commits an invalid complete value", async () => {
    const onCommit = vi.fn();
    const user = userEvent.setup();
    render(<TimeHarness onCommit={onCommit} />);
    const input = screen.getByLabelText("Hora");

    await user.clear(input);
    await user.type(input, "9999");

    expect(input).toHaveValue("99:99");
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("restores the committed value when blurred while incomplete", async () => {
    const user = userEvent.setup();
    render(<TimeHarness />);
    const input = screen.getByLabelText("Hora");

    await user.clear(input);
    await user.type(input, "07");
    await user.tab();

    expect(input).toHaveValue("08:00");
  });

  it("restores the committed value when blurred while invalid", async () => {
    const user = userEvent.setup();
    render(<TimeHarness />);
    const input = screen.getByLabelText("Hora");

    await user.clear(input);
    await user.type(input, "2588");
    await user.tab();

    expect(input).toHaveValue("08:00");
  });

  it("keeps a valid value after blurring", async () => {
    const user = userEvent.setup();
    render(<TimeHarness />);
    const input = screen.getByLabelText("Hora");

    await user.clear(input);
    await user.type(input, "1830");
    await user.tab();

    expect(input).toHaveValue("18:30");
  });

  it("follows the value when it changes outside the field", async () => {
    const user = userEvent.setup();
    render(<TimeHarness />);

    await user.click(screen.getByRole("button", { name: "Definir externamente" }));

    expect(screen.getByLabelText("Hora")).toHaveValue("23:59");
  });

  it("supports masks with more than one separator", async () => {
    const onCommit = vi.fn();
    const user = userEvent.setup();
    render(
      <MaskedInput
        aria-label="Data"
        value=""
        separator="/"
        groupSizes={DATE_GROUPS}
        isValid={() => true}
        onCommit={onCommit}
      />,
    );
    const input = screen.getByLabelText("Data");

    await user.type(input, "01022026");

    expect(input).toHaveValue("01/02/2026");
    expect(onCommit).toHaveBeenCalledWith("01/02/2026");
  });
});
