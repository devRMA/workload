import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "@/components/molecules/copy-button";

function setClipboard(clipboard: unknown) {
	Object.defineProperty(navigator, "clipboard", {
		configurable: true,
		writable: true,
		value: clipboard,
	});
}

describe("CopyButton", () => {
	afterEach(() => {
		setClipboard(undefined);
		vi.useRealTimers();
	});

	it("copies the value and reports success", async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		const onCopied = vi.fn();
		const user = userEvent.setup();
		setClipboard({ writeText });

		render(
			<CopyButton value="18:48" label="Copiar horário" onCopied={onCopied} />,
		);
		await user.click(screen.getByRole("button", { name: "Copiar horário" }));

		expect(writeText).toHaveBeenCalledWith("18:48");
		expect(onCopied).toHaveBeenCalledOnce();
		expect(screen.getByRole("status")).toHaveTextContent("Copiado!");
	});

	it("returns to the idle state after the confirmation delay", async () => {
		vi.useFakeTimers();
		setClipboard({ writeText: vi.fn().mockResolvedValue(undefined) });
		render(<CopyButton value="18:48" label="Copiar horário" />);

		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: "Copiar horário" }));
		});
		expect(screen.getByRole("status")).toHaveTextContent("Copiado!");

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		expect(screen.getByRole("status")).toBeEmptyDOMElement();
	});

	it("warns the user when the clipboard API is unavailable", async () => {
		const user = userEvent.setup();
		setClipboard(undefined);

		render(<CopyButton value="18:48" label="Copiar horário" />);
		await user.click(screen.getByRole("button", { name: "Copiar horário" }));

		expect(screen.getByRole("status")).toHaveTextContent(
			"Não foi possível copiar",
		);
	});

	it("warns the user when writing to the clipboard is rejected", async () => {
		const onCopied = vi.fn();
		const user = userEvent.setup();
		setClipboard({ writeText: vi.fn().mockRejectedValue(new Error("denied")) });

		render(
			<CopyButton value="18:48" label="Copiar horário" onCopied={onCopied} />,
		);
		await user.click(screen.getByRole("button", { name: "Copiar horário" }));

		expect(screen.getByRole("status")).toHaveTextContent(
			"Não foi possível copiar",
		);
		expect(onCopied).not.toHaveBeenCalled();
	});

	it("clears the failure warning after its own delay", async () => {
		vi.useFakeTimers();
		setClipboard(undefined);

		render(<CopyButton value="18:48" label="Copiar horário" />);
		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: "Copiar horário" }));
		});

		act(() => {
			vi.advanceTimersByTime(4000);
		});

		expect(screen.getByRole("status")).toBeEmptyDOMElement();
	});

	it("can be triggered from the keyboard", async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		const user = userEvent.setup();
		setClipboard({ writeText });

		render(<CopyButton value="18:48" label="Copiar horário" />);
		await user.tab();
		await user.keyboard("{Enter}");

		expect(writeText).toHaveBeenCalledWith("18:48");
	});
});
