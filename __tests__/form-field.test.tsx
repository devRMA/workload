import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormField } from "@/components/molecules/form-field";

describe("FormField", () => {
  it("associates the label with the input by id", () => {
    const { getByLabelText } = render(<FormField id="hours-field" label="Hours" />);
    expect(getByLabelText("Hours")).toBeInTheDocument();
  });

  it("renders the labelIcon and icon", () => {
    const { getByTestId } = render(
      <FormField
        id="hours-field"
        label="Hours"
        labelIcon={<svg data-testid="label-icon" />}
        icon={<svg data-testid="input-icon" />}
      />,
    );
    expect(getByTestId("label-icon")).toBeInTheDocument();
    expect(getByTestId("input-icon")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(<FormField id="hours-field" label="Hours" className="my-custom" />);
    expect(container.firstElementChild?.className).toContain("my-custom");
  });
});
