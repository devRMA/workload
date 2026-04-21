import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GoogleAd } from "@/components/molecules/google-ad";

const MOCK_ADSENSE_ID = "ca-pub-123456789";

describe("GoogleAd", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.unstubAllEnvs();
	});

	it("renders placeholder when NEXT_PUBLIC_ADSENSE_ID is not set", () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", "");
		const { container } = render(<GoogleAd />);
		expect(container.querySelector(".border-dashed")).toBeTruthy();
	});

	it("renders ad container when NEXT_PUBLIC_ADSENSE_ID is set", () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		const { container } = render(<GoogleAd slot="12345" />);
		const insElement = container.querySelector("ins.adsbygoogle");
		expect(insElement).toBeTruthy();
		expect(insElement?.getAttribute("data-ad-client")).toBe(MOCK_ADSENSE_ID);
		expect(insElement?.getAttribute("data-ad-slot")).toBe("12345");
	});

	it("applies default format and responsive values", () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		const { container } = render(<GoogleAd />);
		const insElement = container.querySelector("ins.adsbygoogle");
		expect(insElement?.getAttribute("data-ad-format")).toBe("auto");
		expect(insElement?.getAttribute("data-full-width-responsive")).toBe("true");
	});

	it("applies custom format and responsive values", () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		const { container } = render(
			<GoogleAd format="fluid" responsive="false" />,
		);
		const insElement = container.querySelector("ins.adsbygoogle");
		expect(insElement?.getAttribute("data-ad-format")).toBe("fluid");
		expect(insElement?.getAttribute("data-full-width-responsive")).toBe(
			"false",
		);
	});

	it("applies custom className", () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		const { container } = render(<GoogleAd className="my-custom-class" />);
		expect(container.querySelector(".my-custom-class")).toBeTruthy();
	});
});
