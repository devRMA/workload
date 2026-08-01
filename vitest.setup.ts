import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
	cleanup();
});

vi.mock("next/font/google", () => ({
	Inter: () => ({ className: "font-inter" }),
}));

HTMLDialogElement.prototype.showModal = function showModal(
	this: HTMLDialogElement,
) {
	this.open = true;
};

HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
	this.open = false;
	this.dispatchEvent(new Event("close"));
};

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});
