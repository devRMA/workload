import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdBlockNotice } from "@/components/molecules/ad-block-notice";

describe("AdBlockNotice", () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(<AdBlockNotice isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders the notice content when isOpen is true", () => {
    render(<AdBlockNotice isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    expect(screen.getByText("Opa! Uma ajudinha?")).toBeDefined();
    expect(screen.getByText("Prometemos não ser chatos")).toBeDefined();
    expect(screen.getByText("Já desativei, pode contar comigo!")).toBeDefined();
    expect(screen.getByText("Continuar com AdBlock ativo")).toBeDefined();
  });

  it("renders as a dismissible footer notice instead of a blocking dialog", () => {
    const { container } = render(<AdBlockNotice isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);

    expect(container.querySelector("dialog")).toBeNull();

    const notice = screen.getByRole("complementary");
    expect(notice.getAttribute("aria-labelledby")).toBe("ad-block-notice-title");
    expect(screen.getByText("Opa! Uma ajudinha?").id).toBe("ad-block-notice-title");
    expect(notice.className).toContain("fixed");
    expect(notice.className).toContain("env(safe-area-inset-bottom)");
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup();
    render(<AdBlockNotice isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    await user.click(screen.getByText("Já desativei, pode contar comigo!"));
    expect(mockOnConfirm).toHaveBeenCalledOnce();
  });

  it("calls onClose when the dismiss button is clicked", async () => {
    const user = userEvent.setup();
    render(<AdBlockNotice isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    await user.click(screen.getByText("Continuar com AdBlock ativo"));
    expect(mockOnClose).toHaveBeenCalledOnce();
  });
});
