import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdBlockModal } from "@/components/molecules/ad-block-modal";

describe("AdBlockModal", () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(<AdBlockModal isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    expect(container.querySelector("h2")).toBeNull();
  });

  it("renders modal content when isOpen is true", () => {
    render(<AdBlockModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    expect(screen.getByText("Opa! Uma ajudinha?")).toBeDefined();
    expect(screen.getByText("Prometemos não ser chatos")).toBeDefined();
    expect(screen.getByText("Já desativei, pode contar comigo!")).toBeDefined();
    expect(screen.getByText("Continuar com AdBlock ativo")).toBeDefined();
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup();
    render(<AdBlockModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    await user.click(screen.getByText("Já desativei, pode contar comigo!"));
    expect(mockOnConfirm).toHaveBeenCalledOnce();
  });

  it("calls onClose when continue button is clicked", async () => {
    const user = userEvent.setup();
    render(<AdBlockModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    await user.click(screen.getByText("Continuar com AdBlock ativo"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when X button is clicked", async () => {
    const user = userEvent.setup();
    render(<AdBlockModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    await user.click(
      screen.getByRole("button", {
        name: "Fechar aviso do bloqueador de anúncios",
      }),
    );
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("opens as a modal dialog named by its heading", () => {
    const { container } = render(<AdBlockModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    const dialog = container.querySelector("dialog") as HTMLDialogElement;
    expect(dialog.open).toBe(true);
    expect(dialog.getAttribute("aria-labelledby")).toBe("ad-block-modal-title");
    expect(screen.getByText("Opa! Uma ajudinha?").id).toBe("ad-block-modal-title");
  });

  it("calls onClose when the native close event fires", () => {
    const { container } = render(<AdBlockModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    fireEvent(container.querySelector("dialog") as Element, new Event("close"));
    expect(mockOnClose).toHaveBeenCalledOnce();
  });
});
