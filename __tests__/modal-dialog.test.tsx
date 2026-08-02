import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ModalDialog } from "@/components/atoms/modal-dialog";

const renderDialog = (isOpen: boolean, onClose: () => void) =>
  render(
    <ModalDialog isOpen={isOpen} onClose={onClose} labelledBy="dialog-title">
      <h2 id="dialog-title">Título</h2>
      <button type="button">Ação</button>
    </ModalDialog>,
  );

const getDialog = (container: HTMLElement) => container.querySelector("dialog") as HTMLDialogElement;

describe("ModalDialog", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = "";
  });

  it("keeps the dialog closed and its content unmounted while isOpen is false", () => {
    const { container } = renderDialog(false, mockOnClose);

    expect(getDialog(container).open).toBe(false);
    expect(screen.queryByText("Título")).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("opens the dialog as modal and names it from the referenced heading", () => {
    const { container } = renderDialog(true, mockOnClose);
    const dialog = getDialog(container);

    expect(dialog.open).toBe(true);
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.getAttribute("aria-labelledby")).toBe("dialog-title");
    expect(screen.getByText("Título")).toBeDefined();
  });

  it("locks background scroll while open and releases it when closed", () => {
    const { container, rerender } = renderDialog(true, mockOnClose);
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <ModalDialog isOpen={false} onClose={mockOnClose} labelledBy="dialog-title">
        <h2 id="dialog-title">Título</h2>
      </ModalDialog>,
    );

    expect(getDialog(container).open).toBe(false);
    expect(document.body.style.overflow).toBe("");
  });

  it("releases background scroll when it unmounts while still open", () => {
    const { unmount } = renderDialog(true, mockOnClose);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("");
  });

  it("calls onClose when the native close event fires", () => {
    const { container } = renderDialog(true, mockOnClose);

    fireEvent(getDialog(container), new Event("close"));

    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when the backdrop is clicked", () => {
    const { container } = renderDialog(true, mockOnClose);

    fireEvent.click(getDialog(container));

    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("keeps the dialog open when its content is clicked", () => {
    renderDialog(true, mockOnClose);

    fireEvent.click(screen.getByText("Ação"));

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("merges the caller className into the scrollable content wrapper", () => {
    const { container } = render(
      <ModalDialog isOpen={true} onClose={mockOnClose} labelledBy="dialog-title" className="max-w-lg">
        <h2 id="dialog-title">Título</h2>
      </ModalDialog>,
    );

    const wrapper = container.querySelector("dialog > div") as HTMLElement;
    expect(wrapper.className).toContain("overscroll-contain");
    expect(wrapper.className).toContain("max-w-lg");
  });
});
