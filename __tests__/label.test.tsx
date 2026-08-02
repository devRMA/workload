import { render } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Label } from "@/components/atoms/label";

describe("Label", () => {
  it("renders its children", () => {
    const { getByText } = render(<Label>label content</Label>);
    expect(getByText("label content")).toBeInTheDocument();
  });

  it("associates with a control via htmlFor", () => {
    const { getByText } = render(<Label htmlFor="field-id">field label</Label>);
    expect(getByText("field label")).toHaveAttribute("for", "field-id");
  });

  it("forwards the ref to the underlying label", () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>label</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it("merges custom className", () => {
    const { getByText } = render(<Label className="my-custom">label</Label>);
    expect(getByText("label").className).toContain("my-custom");
  });
});
