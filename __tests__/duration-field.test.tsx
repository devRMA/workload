import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DurationField } from "@/components/molecules/duration-field";

describe("DurationField", () => {
  it("shows the minutes as a padded duration", () => {
    render(<DurationField id="journey" label="Jornada Diária" minutes={528} onMinutesChange={vi.fn()} />);

    expect(screen.getByLabelText("Jornada Diária")).toHaveValue("08:48");
  });

  it("commits the typed duration as minutes", async () => {
    const onMinutesChange = vi.fn();
    const user = userEvent.setup();
    render(<DurationField id="journey" label="Jornada Diária" minutes={528} onMinutesChange={onMinutesChange} />);

    const field = screen.getByLabelText("Jornada Diária");
    await user.clear(field);
    await user.type(field, "0730");

    expect(onMinutesChange).toHaveBeenLastCalledWith(450);
  });

  it("keeps impossible durations out of the calculation", async () => {
    const onMinutesChange = vi.fn();
    const user = userEvent.setup();
    render(<DurationField id="journey" label="Jornada Diária" minutes={528} onMinutesChange={onMinutesChange} />);

    const field = screen.getByLabelText("Jornada Diária");
    await user.clear(field);
    await user.type(field, "2599");

    expect(onMinutesChange).not.toHaveBeenCalled();
  });

  it("describes the field with the hint when one is given", () => {
    render(
      <DurationField id="journey" label="Jornada Diária" hint="Ex.: 08:48" minutes={480} onMinutesChange={vi.fn()} />,
    );

    expect(screen.getByLabelText("Jornada Diária")).toHaveAccessibleDescription("Ex.: 08:48");
  });

  it("renders both icons and merges the className", () => {
    const { container } = render(
      <DurationField
        id="journey"
        label="Jornada Diária"
        className="my-custom"
        icon={<svg data-testid="input-icon" />}
        labelIcon={<svg data-testid="label-icon" />}
        minutes={480}
        onMinutesChange={vi.fn()}
      />,
    );

    expect(screen.getByTestId("input-icon")).toBeInTheDocument();
    expect(screen.getByTestId("label-icon")).toBeInTheDocument();
    expect(container.firstElementChild?.className).toContain("my-custom");
    expect(screen.getByLabelText("Jornada Diária")).not.toHaveAttribute("aria-describedby");
  });
});
