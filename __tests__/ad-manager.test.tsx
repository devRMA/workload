import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdManager } from "@/components/organisms/ad-manager";

const MOCK_ADSENSE_ID = "ca-pub-123456789";
const SIDE_AD_KEY = "workload_side_ads_last_view";
const VIDEO_AD_KEY = "workload_video_ad_last_view";
const VIDEO_AD_DELAY_MS = 120000;
const REQUIRED_IDLE_MS = 30000;

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockReload = vi.fn();
Object.defineProperty(window, "location", {
  configurable: true,
  value: { ...window.location, reload: mockReload },
});

const enableAdsEnv = () => {
  vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
  vi.stubEnv("NEXT_PUBLIC_ENABLE_ADS", "true");
};

const advanceBy = (milliseconds: number) => {
  act(() => {
    vi.advanceTimersByTime(milliseconds);
  });
};

describe("AdManager", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    vi.useFakeTimers();
    mockFetch.mockResolvedValue({ ok: true });
  });

  it("returns null when NEXT_PUBLIC_ADSENSE_ID is not set", () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", "");
    const { container } = render(<AdManager />);
    expect(container.innerHTML).toBe("");
  });

  it("checks cooldowns in localStorage on mount", () => {
    enableAdsEnv();
    const spy = vi.spyOn(Storage.prototype, "getItem");
    render(<AdManager />);
    expect(spy).toHaveBeenCalledWith(SIDE_AD_KEY);
    expect(spy).toHaveBeenCalledWith(VIDEO_AD_KEY);
  });

  it("shows side ads after 2 seconds when no previous view exists", () => {
    enableAdsEnv();
    render(<AdManager />);

    expect(screen.queryByText("Espaço do Apoiador")).toBeNull();

    advanceBy(2000);

    expect(screen.getAllByText("Espaço do Apoiador")).toHaveLength(2);
  });

  it("shows the video modal once the user has been idle for the whole delay", () => {
    enableAdsEnv();
    render(<AdManager />);

    expect(screen.queryByText("Vídeo da Semana")).toBeNull();

    advanceBy(VIDEO_AD_DELAY_MS);

    expect(screen.getByText("Vídeo da Semana")).toBeDefined();
  });

  it("reschedules the video modal while the user is still interacting", () => {
    enableAdsEnv();
    render(<AdManager />);

    advanceBy(VIDEO_AD_DELAY_MS - 10000);
    fireEvent.keyDown(document.body, { key: "a" });
    advanceBy(10000);

    expect(screen.queryByText("Vídeo da Semana")).toBeNull();

    advanceBy(REQUIRED_IDLE_MS);

    expect(screen.getByText("Vídeo da Semana")).toBeDefined();
  });

  it("reschedules the video modal while a form field holds the focus", () => {
    enableAdsEnv();
    const formField = document.createElement("input");
    document.body.appendChild(formField);
    formField.focus();

    render(<AdManager />);

    advanceBy(VIDEO_AD_DELAY_MS);
    expect(screen.queryByText("Vídeo da Semana")).toBeNull();

    formField.blur();
    advanceBy(REQUIRED_IDLE_MS);

    expect(screen.getByText("Vídeo da Semana")).toBeDefined();
    formField.remove();
  });

  it("hides side ads when viewed less than a week ago", () => {
    enableAdsEnv();
    localStorage.setItem(SIDE_AD_KEY, Date.now().toString());
    render(<AdManager />);

    advanceBy(2000);

    expect(screen.queryByText("Espaço do Apoiador")).toBeNull();
  });

  it("hides video ad when viewed less than a week ago", () => {
    enableAdsEnv();
    localStorage.setItem(VIDEO_AD_KEY, Date.now().toString());
    render(<AdManager />);

    advanceBy(VIDEO_AD_DELAY_MS);

    expect(screen.queryByText("Vídeo da Semana")).toBeNull();
  });

  it("shows the adblock notice without blocking the page when fetch fails", async () => {
    enableAdsEnv();
    mockFetch.mockRejectedValueOnce(new Error("blocked"));

    const { container } = render(<AdManager />);

    await vi.waitFor(() => {
      expect(screen.getByText("Opa! Uma ajudinha?")).toBeDefined();
    });
    expect(container.querySelector("dialog[open]")).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the adblock notice without reloading when dismissed", async () => {
    enableAdsEnv();
    mockFetch.mockRejectedValueOnce(new Error("blocked"));

    render(<AdManager />);

    await vi.waitFor(() => {
      expect(screen.getByText("Opa! Uma ajudinha?")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Continuar com AdBlock ativo"));

    expect(screen.queryByText("Opa! Uma ajudinha?")).toBeNull();
    expect(mockReload).not.toHaveBeenCalled();
  });

  it("reloads the page and closes the notice when confirming adblock is disabled", async () => {
    enableAdsEnv();
    mockFetch.mockRejectedValueOnce(new Error("blocked"));

    render(<AdManager />);

    await vi.waitFor(() => {
      expect(screen.getByText("Opa! Uma ajudinha?")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Já desativei, pode contar comigo!"));

    expect(mockReload).toHaveBeenCalledOnce();
  });

  it("persists the side ads cooldown and hides them when closed", () => {
    enableAdsEnv();
    render(<AdManager />);

    advanceBy(2000);
    expect(screen.getAllByText("Espaço do Apoiador")).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "Fechar anúncio do lado esquerdo" }));

    expect(localStorage.getItem(SIDE_AD_KEY)).not.toBeNull();
    expect(screen.queryByText("Espaço do Apoiador")).toBeNull();
  });

  it("marks the video ad as watched and closes it once playback completes", () => {
    enableAdsEnv();
    render(<AdManager />);

    advanceBy(VIDEO_AD_DELAY_MS);
    expect(screen.getByText("Vídeo da Semana")).toBeDefined();

    fireEvent.click(screen.getByText("Ver vídeo e apoiar o projeto"));
    advanceBy(15000);

    fireEvent.click(screen.getByRole("button", { name: "Fechar vídeo" }));

    expect(localStorage.getItem(VIDEO_AD_KEY)).not.toBeNull();
    expect(screen.queryByText("Vídeo da Semana")).toBeNull();
  });

  it("never nags about adblock while ads are switched off", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
    vi.stubEnv("NEXT_PUBLIC_ENABLE_ADS", "false");
    mockFetch.mockRejectedValueOnce(new Error("blocked"));

    render(<AdManager />);

    await vi.waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalled();
    });
    expect(screen.queryByText("Opa! Uma ajudinha?")).toBeNull();
  });
});
