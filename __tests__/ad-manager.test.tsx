import { act, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdManager } from "@/components/organisms/ad-manager";
import { CONSENT_CHANGED_EVENT } from "@/lib/consent";

const MOCK_ADSENSE_ID = "ca-pub-123456789";
const SCRIPT_SELECTOR = 'script[src*="pagead2.googlesyndication.com"]';
const CONSENT_KEY = "workload_cookie_consent";

const enableAdsEnv = () => {
  vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
  vi.stubEnv("NEXT_PUBLIC_ENABLE_ADS", "true");
};

describe("AdManager", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    localStorage.clear();
    for (const script of document.querySelectorAll(SCRIPT_SELECTOR)) script.remove();
    (window as Record<string, unknown>).adsbygoogle = undefined;
  });

  it("renders nothing when the AdSense id is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", "");
    vi.stubEnv("NEXT_PUBLIC_ENABLE_ADS", "true");
    const { container } = render(<AdManager />);

    expect(container.innerHTML).toBe("");
    expect(document.querySelector(SCRIPT_SELECTOR)).toBeNull();
  });

  it("renders nothing when ads are disabled", () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
    vi.stubEnv("NEXT_PUBLIC_ENABLE_ADS", "false");
    const { container } = render(<AdManager />);

    expect(container.innerHTML).toBe("");
    expect(document.querySelector(SCRIPT_SELECTOR)).toBeNull();
  });

  it("renders no ad and loads no script before consent", () => {
    enableAdsEnv();
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: true }));
    const { container } = render(<AdManager />);

    expect(document.querySelector(SCRIPT_SELECTOR)).toBeNull();
    expect(container).toBeEmptyDOMElement();
  });

  it("loads the AdSense script once and renders a single slot after consent", () => {
    enableAdsEnv();
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: true, ads: true }));
    const { container, rerender } = render(<AdManager />);
    rerender(<AdManager />);

    expect(document.querySelectorAll(SCRIPT_SELECTOR)).toHaveLength(1);
    expect(container.querySelectorAll("ins.adsbygoogle")).toHaveLength(1);
  });

  it("loads the script when consent is granted without a reload", () => {
    enableAdsEnv();
    const { container } = render(<AdManager />);

    act(() => {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: true, ads: true }));
      window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    });

    expect(document.querySelectorAll(SCRIPT_SELECTOR)).toHaveLength(1);
    expect(container.querySelectorAll("ins.adsbygoogle")).toHaveLength(1);

    act(() => {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: false, ads: false }));
      window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    });
    expect(container).toBeEmptyDOMElement();
  });

  it("keeps the initial markup empty even when browser consent already exists", () => {
    enableAdsEnv();
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: true, ads: true }));

    expect(renderToString(<AdManager />)).toBe("");
  });
});
