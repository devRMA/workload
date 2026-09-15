import { render } from "@testing-library/react";
import { StrictMode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GoogleAd } from "@/components/atoms/google-ad";

const MOCK_ADSENSE_ID = "ca-pub-123456789";

describe("GoogleAd", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    (window as Record<string, unknown>).adsbygoogle = undefined;
  });

  it("renders the AdSense slot with the configured client", () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
    const { container } = render(<GoogleAd slot="12345" />);
    const insElement = container.querySelector("ins.adsbygoogle");

    expect(insElement?.getAttribute("data-ad-client")).toBe(MOCK_ADSENSE_ID);
    expect(insElement?.getAttribute("data-ad-slot")).toBe("12345");
    expect(insElement?.getAttribute("data-ad-format")).toBe("auto");
  });

  it("swallows the error when pushing to adsbygoogle throws", () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
    (window as Record<string, unknown>).adsbygoogle = {
      push: () => {
        throw new Error("blocked");
      },
    };

    expect(() => render(<GoogleAd slot="12345" />)).not.toThrow();
  });

  it("pushes the ad only once when StrictMode re-invokes the mount effect", () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
    render(
      <StrictMode>
        <GoogleAd slot="12345" />
      </StrictMode>,
    );

    expect((window as Record<string, unknown>).adsbygoogle as unknown[]).toHaveLength(1);
  });
});
