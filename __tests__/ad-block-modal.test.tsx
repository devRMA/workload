import { render, screen } from "@testing-library/react";
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
		const { container } = render(
			<AdBlockModal
				isOpen={false}
				onClose={mockOnClose}
				onConfirm={mockOnConfirm}
			/>,
		);
		expect(container.querySelector("h2")).toBeNull();
	});

	it("renders modal content when isOpen is true", () => {
		render(
			<AdBlockModal
				isOpen={true}
				onClose={mockOnClose}
				onConfirm={mockOnConfirm}
			/>,
		);
		expect(screen.getByText("Opa! Uma ajudinha?")).toBeDefined();
		expect(screen.getByText("Prometemos não ser chatos")).toBeDefined();
		expect(screen.getByText("Já desativei, pode contar comigo!")).toBeDefined();
		expect(screen.getByText("Continuar com AdBlock ativo")).toBeDefined();
	});

	it("calls onConfirm when confirm button is clicked", async () => {
		const user = userEvent.setup();
		render(
			<AdBlockModal
				isOpen={true}
				onClose={mockOnClose}
				onConfirm={mockOnConfirm}
			/>,
		);
		await user.click(screen.getByText("Já desativei, pode contar comigo!"));
		expect(mockOnConfirm).toHaveBeenCalledOnce();
	});

	it("calls onClose when continue button is clicked", async () => {
		const user = userEvent.setup();
		render(
			<AdBlockModal
				isOpen={true}
				onClose={mockOnClose}
				onConfirm={mockOnConfirm}
			/>,
		);
		await user.click(screen.getByText("Continuar com AdBlock ativo"));
		expect(mockOnClose).toHaveBeenCalled();
	});

	it("calls onClose when X button is clicked", async () => {
		const user = userEvent.setup();
		render(
			<AdBlockModal
				isOpen={true}
				onClose={mockOnClose}
				onConfirm={mockOnConfirm}
			/>,
		);
		const closeButtons = screen.getAllByRole("button");
		const xButton = closeButtons.find(
			(button) =>
				!button.textContent?.includes("desativei") &&
				!button.textContent?.includes("Continuar"),
		);
		if (xButton) {
			await user.click(xButton);
			expect(mockOnClose).toHaveBeenCalled();
		}
	});
});
