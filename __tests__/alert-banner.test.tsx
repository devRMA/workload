import { IconAlertTriangle } from "@tabler/icons-react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AlertBanner } from "@/components/atoms/alert-banner";

describe("AlertBanner", () => {
  it("announces a danger banner as an alert", () => {
    render(<AlertBanner icon={IconAlertTriangle} tone="danger" title="Confira seus horários" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Confira seus horários");
  });

  it("announces a warning banner as a status", () => {
    render(<AlertBanner icon={IconAlertTriangle} tone="warning" title="Atenção" />);

    expect(screen.getByRole("status")).toHaveTextContent("Atenção");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("renders the supporting content below the title", () => {
    render(
      <AlertBanner icon={IconAlertTriangle} tone="danger" title="Confira seus horários">
        <p>A saída precisa vir depois da volta do almoço.</p>
      </AlertBanner>,
    );

    expect(screen.getByText("A saída precisa vir depois da volta do almoço.")).toBeInTheDocument();
  });

  it("hides the decorative icon from assistive technology", () => {
    const { container } = render(<AlertBanner icon={IconAlertTriangle} tone="danger" title="Confira seus horários" />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps the id on the element that carries the role", () => {
    const { container } = render(
      <AlertBanner id="journey-issue" icon={IconAlertTriangle} tone="danger" title="Confira seus horários">
        <p>A saída precisa vir depois da volta do almoço.</p>
      </AlertBanner>,
    );

    const banner = screen.getByRole("alert");
    expect(banner).toHaveAttribute("id", "journey-issue");
    expect(banner.contains(container.querySelector("svg"))).toBe(true);
    expect(banner.contains(screen.getByText("A saída precisa vir depois da volta do almoço."))).toBe(true);
  });

  it("merges custom className", () => {
    const { container } = render(
      <AlertBanner icon={IconAlertTriangle} tone="danger" title="Confira seus horários" className="mb-6" />,
    );

    expect(container.firstElementChild?.className).toContain("mb-6");
  });

  it("keeps the body text out of the icon's row", () => {
    const { container } = render(
      <AlertBanner icon={IconAlertTriangle} tone="danger" title="Confira seus horários">
        <p>A saída precisa vir depois da volta do almoço.</p>
      </AlertBanner>,
    );

    const iconRow = container.querySelector("svg")?.parentElement;
    expect(iconRow?.contains(screen.getByText("Confira seus horários"))).toBe(true);
    expect(iconRow?.contains(screen.getByText("A saída precisa vir depois da volta do almoço."))).toBe(false);
  });

  it("adds no focusable element to the banner", () => {
    const { container } = render(
      <AlertBanner icon={IconAlertTriangle} tone="danger" title="Confira seus horários">
        <p>A saída precisa vir depois da volta do almoço.</p>
      </AlertBanner>,
    );

    expect(container.querySelectorAll("a, button, input, select, textarea, [tabindex]")).toHaveLength(0);
  });
});
