import { render } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Input } from "@/components/atoms/input";

describe("Input", () => {
  it("renders without an icon", () => {
    const { container } = render(<Input placeholder="no icon" />);
    expect(container.querySelector("svg")).toBeNull();
    const input = container.querySelector("input");
    expect(input?.className).not.toContain("pl-12");
  });

  it("renders with an icon and applies the icon padding class", () => {
    const { container } = render(<Input icon={<svg data-testid="input-icon" />} placeholder="with icon" />);
    expect(container.querySelector('[data-testid="input-icon"]')).not.toBeNull();
    const input = container.querySelector("input");
    expect(input?.className).toContain("pl-12");
  });

  it("forwards the ref to the underlying input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("merges custom className", () => {
    const { container } = render(<Input className="my-custom" />);
    expect(container.querySelector("input")?.className).toContain("my-custom");
  });

  it("passes the type prop through", () => {
    const { container } = render(<Input type="email" />);
    expect(container.querySelector("input")?.getAttribute("type")).toBe("email");
  });
});
