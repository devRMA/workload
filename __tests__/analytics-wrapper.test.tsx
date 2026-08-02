import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AnalyticsWrapper } from "@/components/organisms/analytics-wrapper";
import { CONSENT_CHANGED_EVENT } from "@/lib/consent";

const CONSENT_KEY = "workload_cookie_consent";

vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => <div data-testid="google-analytics" data-ga-id={gaId} />,
}));

describe("AnalyticsWrapper", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("renders nothing when there is no stored consent", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "GA-TEST-ID");
    const { container } = render(<AnalyticsWrapper />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when consent is stored but telemetry is false", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "GA-TEST-ID");
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: false }));
    const { container } = render(<AnalyticsWrapper />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when NEXT_PUBLIC_GA_ID is unset even with consent granted", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "");
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: true }));
    const { container } = render(<AnalyticsWrapper />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders GoogleAnalytics when consent is granted and the env var is present", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "GA-TEST-ID");
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: true }));
    const { getByTestId } = render(<AnalyticsWrapper />);
    expect(getByTestId("google-analytics")).toHaveAttribute("data-ga-id", "GA-TEST-ID");
  });

  it("loads analytics as soon as consent is granted, without a reload", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "GA-TEST-ID");
    const { container, queryByTestId } = render(<AnalyticsWrapper />);
    expect(container).toBeEmptyDOMElement();

    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: true }));
    act(() => {
      window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    });

    expect(queryByTestId("google-analytics")).toBeInTheDocument();
  });

  it("stops listening for consent changes once unmounted", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "GA-TEST-ID");
    const removeEventListener = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<AnalyticsWrapper />);

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(CONSENT_CHANGED_EVENT, expect.any(Function));
    removeEventListener.mockRestore();
  });
});
