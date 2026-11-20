import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatBox } from "@/components/atoms/stat-box";

describe("StatBox", () => {
  it.each(["default", "success", "danger"] as const)(
    "renders the label and the value for the %s variant",
    (variant) => {
      const { getByText } = render(<StatBox label="Total" value="10h" variant={variant} />);

      expect(getByText("Total")).toBeInTheDocument();
      expect(getByText("10h")).toBeInTheDocument();
    },
  );

  it("renders subValue only when provided", () => {
    const { queryByText, rerender } = render(<StatBox label="Total" value="10h" />);
    expect(queryByText("extra info")).toBeNull();

    rerender(<StatBox label="Total" value="10h" subValue="extra info" />);
    expect(queryByText("extra info")).not.toBeNull();
  });

  it("renders the icon", () => {
    const { getByTestId } = render(<StatBox label="Total" value="10h" icon={<svg data-testid="stat-icon" />} />);
    expect(getByTestId("stat-icon")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(<StatBox label="Total" value="10h" className="my-custom" />);
    expect(container.firstElementChild?.className).toContain("my-custom");
  });
});
