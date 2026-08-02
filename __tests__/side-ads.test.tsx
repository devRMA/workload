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

  it("auto-hides and calls onClose after 45 seconds", () => {
    render(<SideAds onClose={mockOnClose} />);
    act(() => {
      vi.advanceTimersByTime(45000);
    });
    expect(mockOnClose).toHaveBeenCalledOnce();
    expect(screen.queryByText("Espaço do Apoiador")).toBeNull();
  });

  it("closes the left ad and calls onClose when its close button is clicked", () => {
    render(<SideAds onClose={mockOnClose} />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    const closeButtons = screen.getAllByRole("button");
    fireEvent.click(closeButtons[0]);
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("closes the right ad and calls onClose when its close button is clicked", () => {
    render(<SideAds onClose={mockOnClose} />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    const closeButtons = screen.getAllByRole("button");
    fireEvent.click(closeButtons[1]);
    expect(mockOnClose).toHaveBeenCalledOnce();
  });
});
