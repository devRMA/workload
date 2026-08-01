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

	it("keeps the dialog closed and empty when isOpen is false", () => {
		const { container } = render(
			<VideoAdModal
				isOpen={false}
				onClose={mockOnClose}
				onComplete={mockOnComplete}
			/>,
		);
		const dialog = container.querySelector("dialog") as HTMLDialogElement;
		expect(dialog.open).toBe(false);
		expect(dialog.textContent).toBe("");
	});

	it("closes when the native close event fires on the alert step", () => {
		const { container } = render(
			<VideoAdModal
				isOpen={true}
				onClose={mockOnClose}
				onComplete={mockOnComplete}
			/>,
		);

		fireEvent(container.querySelector("dialog") as Element, new Event("close"));

		expect(mockOnClose).toHaveBeenCalledOnce();
		expect(mockOnComplete).not.toHaveBeenCalled();
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
		expect(screen.getByText("Anúncio em exibição...")).toBeDefined();
		expect(screen.getByText("Vídeo da Semana").id).toBe("video-ad-modal-title");
	});

	it("dismisses the video during playback without crediting the view", () => {
		render(
			<VideoAdModal
				isOpen={true}
				onClose={mockOnClose}
				onComplete={mockOnComplete}
			/>,
		);
		fireEvent.click(screen.getByText("Ver vídeo e apoiar o projeto"));

		fireEvent.click(screen.getByRole("button", { name: "Fechar vídeo" }));

		expect(mockOnClose).toHaveBeenCalledOnce();
		expect(mockOnComplete).not.toHaveBeenCalled();
	});

	it("credits the view once the video finishes and then closes", () => {
		render(
			<VideoAdModal
				isOpen={true}
				onClose={mockOnClose}
				onComplete={mockOnComplete}
			/>,
		);
		fireEvent.click(screen.getByText("Ver vídeo e apoiar o projeto"));

		act(() => {
			vi.advanceTimersByTime(15000);
		});

		expect(screen.queryByText("Anúncio em exibição...")).toBeNull();

		fireEvent.click(screen.getByRole("button", { name: "Fechar vídeo" }));
		expect(mockOnComplete).toHaveBeenCalledOnce();
		expect(mockOnClose).toHaveBeenCalledOnce();
	});
});
