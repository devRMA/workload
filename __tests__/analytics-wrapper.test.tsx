import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AnalyticsWrapper } from "@/components/organisms/analytics-wrapper";

const CONSENT_KEY = "workload_cookie_consent";

vi.mock("@next/third-parties/google", () => ({
	GoogleAnalytics: ({ gaId }: { gaId: string }) => (
		<div data-testid="google-analytics" data-ga-id={gaId} />
	),
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
		expect(getByTestId("google-analytics")).toHaveAttribute(
			"data-ga-id",
			"GA-TEST-ID",
		);
	});
});
