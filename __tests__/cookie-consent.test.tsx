import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CookieConsent } from "@/components/molecules/cookie-consent";

const CONSENT_KEY = "workload_cookie_consent";
const CONSENT_CHANGED_EVENT = "workload:consent-changed";
const BANNER_DELAY_MS = 1500;

const mockReload = vi.fn();
Object.defineProperty(window, "location", {
  configurable: true,
  value: { ...window.location, reload: mockReload },
});

let consentEventDetails: { telemetry: boolean }[] = [];
const captureConsentEvent: EventListener = (event) => {
  consentEventDetails.push((event as CustomEvent<{ telemetry: boolean }>).detail);
};

const openSettingsFromShieldButton = () => {
  fireEvent.click(screen.getByRole("button", { name: "Configurações de Privacidade" }));
};

const getTelemetryToggle = () => screen.getByRole("switch");

const showBanner = () => {
  act(() => {
    vi.advanceTimersByTime(BANNER_DELAY_MS);
  });
};

describe("CookieConsent", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
    consentEventDetails = [];
    window.addEventListener(CONSENT_CHANGED_EVENT, captureConsentEvent);
  });

  afterEach(() => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, captureConsentEvent);
    vi.useRealTimers();
  });

  it("does not render the banner before the delay elapses", () => {
    render(<CookieConsent />);
    expect(screen.queryByText("Respeitamos sua privacidade")).toBeNull();
  });

  it("renders the banner after the delay elapses when no consent is stored", () => {
    render(<CookieConsent />);
    showBanner();
    expect(screen.getByRole("heading", { level: 2, name: "Respeitamos sua privacidade" })).toBeDefined();
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
    showBanner();
    expect(screen.queryByText("Respeitamos sua privacidade")).toBeNull();

    openSettingsFromShieldButton();
    fireEvent.click(screen.getByText("Salvar Preferências"));

    expect(JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry).toBe(true);
    expect(consentEventDetails).toEqual([{ telemetry: true }]);
  });

  it("does not show the banner and seeds the toggle as disabled when consent was stored as false", () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: false }));
    render(<CookieConsent />);
    showBanner();
    expect(screen.queryByText("Respeitamos sua privacidade")).toBeNull();

    openSettingsFromShieldButton();
    fireEvent.click(screen.getByText("Salvar Preferências"));

    expect(JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry).toBe(false);
    expect(consentEventDetails).toEqual([{ telemetry: false }]);
  });

  it("persists accepting all cookies and announces the change without reloading", () => {
    render(<CookieConsent />);
    showBanner();

    fireEvent.click(screen.getByText("Aceitar Tudo"));

    expect(JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry).toBe(true);
    expect(consentEventDetails).toEqual([{ telemetry: true }]);
    expect(mockReload).not.toHaveBeenCalled();
  });

  it("persists refusing cookies and announces the change without reloading", () => {
    render(<CookieConsent />);
    showBanner();

    fireEvent.click(screen.getByText("Recusar"));

    expect(JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry).toBe(false);
    expect(consentEventDetails).toEqual([{ telemetry: false }]);
    expect(mockReload).not.toHaveBeenCalled();
  });

  it("opens the settings dialog from the banner's Configurar link", () => {
    render(<CookieConsent />);
    showBanner();

    fireEvent.click(screen.getByText("Configurar"));

    expect(screen.getByText("Privacidade")).toBeDefined();
  });

  it("opens the settings dialog as a modal named by its heading", () => {
    const { container } = render(<CookieConsent />);
    showBanner();
    fireEvent.click(screen.getByText("Configurar"));

    const dialog = container.querySelector("dialog") as HTMLDialogElement;
    expect(dialog.open).toBe(true);
    expect(dialog.getAttribute("aria-labelledby")).toBe("privacy-settings-title");
    expect(screen.getByText("Privacidade").id).toBe("privacy-settings-title");
  });

  it("closes the settings dialog from the backdrop without persisting anything", () => {
    const { container } = render(<CookieConsent />);
    showBanner();
    fireEvent.click(screen.getByText("Configurar"));

    fireEvent.click(container.querySelector("dialog") as Element);

    expect(screen.queryByText("Privacidade")).toBeNull();
    expect(localStorage.getItem(CONSENT_KEY)).toBeNull();
    expect(consentEventDetails).toEqual([]);
  });

  it("closes the settings dialog when the native close event fires", () => {
    const { container } = render(<CookieConsent />);
    showBanner();
    fireEvent.click(screen.getByText("Configurar"));

    fireEvent(container.querySelector("dialog") as Element, new Event("close"));

    expect(screen.queryByText("Privacidade")).toBeNull();
    expect(localStorage.getItem(CONSENT_KEY)).toBeNull();
  });

  it("closes the settings dialog from the X button without persisting anything", () => {
    render(<CookieConsent />);
    showBanner();
    fireEvent.click(screen.getByText("Configurar"));

    fireEvent.click(
      screen.getByRole("button", {
        name: "Fechar configurações de privacidade",
      }),
    );

    expect(screen.queryByText("Privacidade")).toBeNull();
    expect(localStorage.getItem(CONSENT_KEY)).toBeNull();
    expect(consentEventDetails).toEqual([]);
  });

  it("announces the always-on state of the essential cookies", () => {
    render(<CookieConsent />);
    showBanner();
    fireEvent.click(screen.getByText("Configurar"));

    expect(screen.getByText("Sempre ativo")).toBeDefined();
  });

  it("toggles telemetry off, saves the toggled value and closes the dialog", () => {
    render(<CookieConsent />);
    showBanner();
    fireEvent.click(screen.getByText("Configurar"));

    const toggle = getTelemetryToggle();
    expect(toggle.getAttribute("aria-checked")).toBe("true");
    expect(toggle.getAttribute("aria-labelledby")).toBe("telemetry-consent-label");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-checked")).toBe("false");

    fireEvent.click(screen.getByText("Salvar Preferências"));

    expect(JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry).toBe(false);
    expect(consentEventDetails).toEqual([{ telemetry: false }]);
    expect(screen.queryByText("Privacidade")).toBeNull();
  });

  it("toggles telemetry back on from a stored disabled consent and saves the toggled value", () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: false }));
    render(<CookieConsent />);
    showBanner();

    openSettingsFromShieldButton();

    const toggle = getTelemetryToggle();
    expect(toggle.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(toggle);

    fireEvent.click(screen.getByText("Salvar Preferências"));

    expect(JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "{}").telemetry).toBe(true);
    expect(consentEventDetails).toEqual([{ telemetry: true }]);
  });

  it("keeps the privacy shortcut readable and focusable", () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: true }));
    render(<CookieConsent />);
    showBanner();

    const shortcut = screen.getByRole("button", { name: "Configurações de Privacidade" });
    expect(shortcut.className).not.toContain("opacity-30");
    expect(shortcut.className).toContain("focus-visible:ring-2");
  });
});
