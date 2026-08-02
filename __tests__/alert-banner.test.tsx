import { render, screen } from "@testing-library/react";
import { AlertTriangle } from "lucide-react";
import { describe, expect, it } from "vitest";
import { AlertBanner } from "@/components/molecules/alert-banner";

describe("AlertBanner", () => {
  it("announces a danger banner as an alert", () => {
    render(<AlertBanner icon={AlertTriangle} tone="danger" title="Confira seus horários" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Confira seus horários");
  });

  it("announces a warning banner as a status", () => {
    const { container } = render(<AlertBanner icon={AlertTriangle} tone="warning" title="Atenção" />);

    expect(screen.getByRole("status")).toHaveTextContent("Atenção");
    expect(container.firstElementChild?.className).toContain("border-amber-300");
  });

  it("renders the supporting content below the title", () => {
    render(
      <AlertBanner icon={AlertTriangle} tone="danger" title="Confira seus horários">
        <p>A saída precisa vir depois da volta do almoço.</p>
      </AlertBanner>,
    );

    expect(screen.getByText("A saída precisa vir depois da volta do almoço.")).toBeInTheDocument();
  });

  it("hides the decorative icon from assistive technology", () => {
    const { container } = render(<AlertBanner icon={AlertTriangle} tone="danger" title="Confira seus horários" />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes the given id so a field can point to it", () => {
    render(<AlertBanner id="journey-issue" icon={AlertTriangle} tone="danger" title="Confira seus horários" />);

    expect(screen.getByRole("alert")).toHaveAttribute("id", "journey-issue");
  });

  it("merges custom className", () => {
    const { container } = render(
      <AlertBanner icon={AlertTriangle} tone="danger" title="Confira seus horários" className="mb-6" />,
    );

    expect(container.firstElementChild?.className).toContain("mb-6");
  });
});
