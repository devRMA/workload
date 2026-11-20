import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressRing } from "@/components/atoms/progress-ring";

function renderRing(progressPercent: number, overtimePercent = 0) {
  const { container } = render(<ProgressRing progressPercent={progressPercent} overtimePercent={overtimePercent} />);

  return container.querySelectorAll("circle");
}

const dashOffsetOf = (circle: Element) => Number(circle.getAttribute("stroke-dashoffset"));

describe("ProgressRing", () => {
  it("hides the drawing from assistive technology", () => {
    const { container } = render(<ProgressRing progressPercent={50} overtimePercent={0} />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("closes the arc as the progress grows", () => {
    const [, empty] = renderRing(0);
    const [, half] = renderRing(50);
    const [, full] = renderRing(100);

    expect(dashOffsetOf(empty)).toBeGreaterThan(dashOffsetOf(half));
    expect(dashOffsetOf(half)).toBeGreaterThan(dashOffsetOf(full));
    expect(dashOffsetOf(full)).toBe(0);
  });

  it("clamps percentages that fall outside the 0-100 range", () => {
    const [, beyondFull] = renderRing(150);
    const [, full] = renderRing(100);
    const [, negative] = renderRing(-50);
    const [, empty] = renderRing(0);

    expect(dashOffsetOf(beyondFull)).toBe(dashOffsetOf(full));
    expect(dashOffsetOf(negative)).toBe(dashOffsetOf(empty));
  });

  it("clamps the overtime arc as well", () => {
    const [, , beyondFull] = renderRing(100, 150);
    const [, , full] = renderRing(100, 100);

    expect(dashOffsetOf(beyondFull)).toBe(dashOffsetOf(full));
  });
});
