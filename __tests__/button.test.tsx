import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/atoms/button";

describe("Button", () => {
  it("renders with default variant and size", () => {
    const { container } = render(<Button>Click me</Button>);
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe("Click me");
    expect(button?.getAttribute("type")).toBe("button");
  });

  it("renders with outline variant", () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("border");
  });

  it("renders with ghost variant", () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("hover:bg-neutral-100");
  });

  it("renders with danger variant", () => {
    const { container } = render(<Button variant="danger">Danger</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("text-red-600");
  });

  it("renders with sm size", () => {
    const { container } = render(<Button size="sm">Small</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("h-11");
  });

  it("renders with lg size", () => {
    const { container } = render(<Button size="lg">Large</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("h-14");
  });

  it("renders with icon size", () => {
    const { container } = render(<Button size="icon">X</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("h-11");
    expect(button?.className).toContain("w-11");
  });

  it("respects explicit type prop", () => {
    const { container } = render(<Button type="submit">Submit</Button>);
    const button = container.querySelector("button");
    expect(button?.getAttribute("type")).toBe("submit");
  });

  it("applies custom className", () => {
    const { container } = render(<Button className="my-custom">Custom</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("my-custom");
  });

  it("forwards the ref to the underlying button element", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("blocks the click handler when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    const button = container.querySelector("button") as HTMLButtonElement;
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
