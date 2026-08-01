import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { VideoAdModal } from "@/components/molecules/video-ad-modal";

describe("VideoAdModal", () => {
	const mockOnClose = vi.fn();
	const mockOnComplete = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	it("does not render when isOpen is false", () => {
		const { container } = render(
			<VideoAdModal
				isOpen={false}
				onClose={mockOnClose}
				onComplete={mockOnComplete}
			/>,
		);
		expect(container.innerHTML).toBe("");
	});

	it("renders the alert step with the start video CTA", () => {
		render(
			<VideoAdModal
				isOpen={true}
				onClose={mockOnClose}
				onComplete={mockOnComplete}
			/>,
		);
		expect(screen.getByText("Vídeo da Semana")).toBeDefined();
		expect(screen.getByText("Ver vídeo e apoiar o projeto")).toBeDefined();
	});

	it("calls onClose without onComplete when dismissing from the alert step", () => {
		render(
			<VideoAdModal
				isOpen={true}
				onClose={mockOnClose}
				onComplete={mockOnComplete}
			/>,
		);
		fireEvent.click(screen.getByText("Agora não, obrigado"));
		expect(mockOnClose).toHaveBeenCalledOnce();
		expect(mockOnComplete).not.toHaveBeenCalled();
	});

	it("switches to the video step after starting the video", () => {
		render(
			<VideoAdModal
				isOpen={true}
				onClose={mockOnClose}
				onComplete={mockOnComplete}
			/>,
		);
		fireEvent.click(screen.getByText("Ver vídeo e apoiar o projeto"));
		expect(
			screen.getByText("Você poderá fechar em instantes..."),
		).toBeDefined();
	});

	it("reveals the close button only after the video finishes and completes the flow", () => {
		render(
			<VideoAdModal
				isOpen={true}
				onClose={mockOnClose}
				onComplete={mockOnComplete}
			/>,
		);
		fireEvent.click(screen.getByText("Ver vídeo e apoiar o projeto"));
		expect(screen.queryByRole("button")).toBeNull();

		act(() => {
			vi.advanceTimersByTime(15000);
		});

		expect(screen.queryByText("Você poderá fechar em instantes...")).toBeNull();

		fireEvent.click(screen.getByRole("button"));
		expect(mockOnComplete).toHaveBeenCalledOnce();
		expect(mockOnClose).toHaveBeenCalledOnce();
	});
});
