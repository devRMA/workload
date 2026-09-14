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

  it("respects explicit type prop", () => {
    const { container } = render(<Button type="submit">Submit</Button>);
    const button = container.querySelector("button");
    expect(button?.getAttribute("type")).toBe("submit");
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
