import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CookieConsent } from "@/components/molecules/cookie-consent";

const CONSENT_KEY = "workload_cookie_consent";
const BANNER_DELAY_MS = 1500;

const mockReload = vi.fn();
Object.defineProperty(window, "location", {
	configurable: true,
	value: { ...window.location, reload: mockReload },
});

const openSettingsFromShieldButton = () => {
	fireEvent.click(
		screen.getByRole("button", { name: "Configurações de Privacidade" }),
	);
};

const getTelemetryToggle = () => screen.getByRole("switch");

describe("CookieConsent", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("does not render the banner before the delay elapses", () => {
		render(<CookieConsent />);
		expect(screen.queryByText("Respeitamos sua privacidade")).toBeNull();
	});

	it("renders the banner after the delay elapses when no consent is stored", () => {
		render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});
		expect(screen.getByText("Respeitamos sua privacidade")).toBeDefined();
	});

	it("clears the mount timer on unmount so it never fires", () => {
		const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
		const { unmount } = render(<CookieConsent />);
		unmount();
		expect(clearTimeoutSpy).toHaveBeenCalled();
	});

	it("does not show the banner and seeds the toggle as enabled when consent was stored as true", () => {
		localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: true }));
		render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});
		expect(screen.queryByText("Respeitamos sua privacidade")).toBeNull();

		openSettingsFromShieldButton();
		fireEvent.click(screen.getByText("Salvar Preferências"));

		expect(
			JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry,
		).toBe(true);
		expect(mockReload).toHaveBeenCalledOnce();
	});

	it("does not show the banner and seeds the toggle as disabled when consent was stored as false", () => {
		localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: false }));
		render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});
		expect(screen.queryByText("Respeitamos sua privacidade")).toBeNull();

		openSettingsFromShieldButton();
		fireEvent.click(screen.getByText("Salvar Preferências"));

		expect(
			JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry,
		).toBe(false);
		expect(mockReload).toHaveBeenCalledOnce();
	});

	it("persists accepting all cookies and reloads the page", () => {
		render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});

		fireEvent.click(screen.getByText("Aceitar Tudo"));

		expect(
			JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry,
		).toBe(true);
		expect(mockReload).toHaveBeenCalledOnce();
	});

	it("persists refusing cookies and reloads the page", () => {
		render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});

		fireEvent.click(screen.getByText("Recusar"));

		expect(
			JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry,
		).toBe(false);
		expect(mockReload).toHaveBeenCalledOnce();
	});

	it("opens the settings dialog from the banner's Configurar link", () => {
		render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});

		fireEvent.click(screen.getByText("Configurar"));

		expect(screen.getByText("Privacidade")).toBeDefined();
	});

	it("opens the settings dialog as a modal named by its heading", () => {
		const { container } = render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});
		fireEvent.click(screen.getByText("Configurar"));

		const dialog = container.querySelector("dialog") as HTMLDialogElement;
		expect(dialog.open).toBe(true);
		expect(dialog.getAttribute("aria-labelledby")).toBe(
			"privacy-settings-title",
		);
		expect(screen.getByText("Privacidade").id).toBe("privacy-settings-title");
	});

	it("closes the settings dialog from the backdrop without persisting anything", () => {
		const { container } = render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});
		fireEvent.click(screen.getByText("Configurar"));

		fireEvent.click(container.querySelector("dialog") as Element);

		expect(screen.queryByText("Privacidade")).toBeNull();
		expect(localStorage.getItem(CONSENT_KEY)).toBeNull();
		expect(mockReload).not.toHaveBeenCalled();
	});

	it("closes the settings dialog when the native close event fires", () => {
		const { container } = render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});
		fireEvent.click(screen.getByText("Configurar"));

		fireEvent(container.querySelector("dialog") as Element, new Event("close"));

		expect(screen.queryByText("Privacidade")).toBeNull();
		expect(localStorage.getItem(CONSENT_KEY)).toBeNull();
	});

	it("closes the settings dialog from the X button without persisting anything", () => {
		render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});
		fireEvent.click(screen.getByText("Configurar"));

		fireEvent.click(
			screen.getByRole("button", {
				name: "Fechar configurações de privacidade",
			}),
		);

		expect(screen.queryByText("Privacidade")).toBeNull();
		expect(localStorage.getItem(CONSENT_KEY)).toBeNull();
		expect(mockReload).not.toHaveBeenCalled();
	});

	it("announces the always-on state of the essential cookies", () => {
		render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});
		fireEvent.click(screen.getByText("Configurar"));

		expect(screen.getByText("Sempre ativo")).toBeDefined();
	});

	it("toggles telemetry off and saves the toggled value", () => {
		render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});
		fireEvent.click(screen.getByText("Configurar"));

		const toggle = getTelemetryToggle();
		expect(toggle.getAttribute("aria-checked")).toBe("true");
		expect(toggle.getAttribute("aria-labelledby")).toBe(
			"telemetry-consent-label",
		);
		fireEvent.click(toggle);
		expect(toggle.getAttribute("aria-checked")).toBe("false");

		fireEvent.click(screen.getByText("Salvar Preferências"));

		expect(
			JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry,
		).toBe(false);
		expect(mockReload).toHaveBeenCalledOnce();
	});

	it("toggles telemetry back on from a stored disabled consent and saves the toggled value", () => {
		localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: false }));
		render(<CookieConsent />);
		act(() => {
			vi.advanceTimersByTime(BANNER_DELAY_MS);
		});

		openSettingsFromShieldButton();

		const toggle = getTelemetryToggle();
		expect(toggle.getAttribute("aria-checked")).toBe("false");
		fireEvent.click(toggle);

		fireEvent.click(screen.getByText("Salvar Preferências"));

		expect(
			JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry,
		).toBe(true);
		expect(mockReload).toHaveBeenCalledOnce();
	});
});
