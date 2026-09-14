import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdManager } from "@/components/organisms/ad-manager";

const MOCK_ADSENSE_ID = "ca-pub-123456789";
const SCRIPT_SELECTOR = 'script[src*="pagead2.googlesyndication.com"]';

const enableAdsEnv = () => {
  vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
  vi.stubEnv("NEXT_PUBLIC_ENABLE_ADS", "true");
};

describe("AdManager", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
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

  it("loads the AdSense script once and renders a single slot", () => {
    enableAdsEnv();
    const { container, rerender } = render(<AdManager />);
    rerender(<AdManager />);

    expect(document.querySelectorAll(SCRIPT_SELECTOR)).toHaveLength(1);
    expect(container.querySelectorAll("ins.adsbygoogle")).toHaveLength(1);
  });
});
