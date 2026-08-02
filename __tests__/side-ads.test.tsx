import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SideAds } from "@/components/molecules/side-ads";

describe("SideAds", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it("does not render ads before the initial delay", () => {
    render(<SideAds onClose={mockOnClose} />);
    expect(screen.queryByText("Espaço do Apoiador")).toBeNull();
  });

  it("shows both side ads after 2 seconds", () => {
    render(<SideAds onClose={mockOnClose} />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getAllByText("Espaço do Apoiador")).toHaveLength(2);
  });

  it("keeps the ads on screen until the user closes them", () => {
    render(<SideAds onClose={mockOnClose} />);
    act(() => {
      vi.advanceTimersByTime(600000);
    });
    expect(screen.getAllByText("Espaço do Apoiador")).toHaveLength(2);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("clears the reveal timer on unmount so it never fires", () => {
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const { unmount } = render(<SideAds onClose={mockOnClose} />);
    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it("closes the left ad and calls onClose when its close button is clicked", () => {
    render(<SideAds onClose={mockOnClose} />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    fireEvent.click(screen.getByRole("button", { name: "Fechar anúncio do lado esquerdo" }));
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("closes the right ad and calls onClose when its close button is clicked", () => {
    render(<SideAds onClose={mockOnClose} />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    fireEvent.click(screen.getByRole("button", { name: "Fechar anúncio do lado direito" }));
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("reveals the close buttons on keyboard focus", () => {
    render(<SideAds onClose={mockOnClose} />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    for (const closeButton of screen.getAllByRole("button")) {
      expect(closeButton.className).toContain("focus-visible:opacity-100");
    }
  });
});
