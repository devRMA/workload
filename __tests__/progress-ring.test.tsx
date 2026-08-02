import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressRing } from "@/components/atoms/progress-ring";

function renderRing(progressPercent: number, overtimePercent = 0) {
  const { container } = render(
    <ProgressRing progressPercent={progressPercent} overtimePercent={overtimePercent}>
      <span>faltam</span>
    </ProgressRing>,
  );

  return container.querySelectorAll("circle");
}

const dashOffsetOf = (circle: Element) => Number(circle.getAttribute("stroke-dashoffset"));

describe("ProgressRing", () => {
  it("shows whatever is placed at the centre of the ring", () => {
    renderRing(50);

    expect(screen.getByText("faltam")).toBeInTheDocument();
  });

  it("hides the drawing from assistive technology", () => {
    const { container } = render(
      <ProgressRing progressPercent={50} overtimePercent={0}>
        <span>faltam</span>
      </ProgressRing>,
    );

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps the track and the progress arc, and nothing else, without overtime", () => {
    expect(renderRing(50)).toHaveLength(2);
  });

  it("adds a second arc once there is overtime", () => {
    expect(renderRing(100, 25)).toHaveLength(3);
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

  it("accepts extra classes on the wrapper", () => {
    const { container } = render(
      <ProgressRing progressPercent={10} overtimePercent={0} className="mt-4">
        <span>faltam</span>
      </ProgressRing>,
    );

    expect(container.firstElementChild).toHaveClass("mt-4");
  });
});
