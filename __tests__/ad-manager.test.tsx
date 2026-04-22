import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdManager } from "@/components/organisms/ad-manager";

const MOCK_ADSENSE_ID = "ca-pub-123456789";
const SIDE_AD_KEY = "workload_side_ads_last_view";
const VIDEO_AD_KEY = "workload_video_ad_last_view";
const _ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const mockFetch = vi.fn();
global.fetch = mockFetch;

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
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		vi.stubEnv("NEXT_PUBLIC_ENABLE_ADS", "true");
		const spy = vi.spyOn(Storage.prototype, "getItem");
		render(<AdManager />);
		expect(spy).toHaveBeenCalledWith(SIDE_AD_KEY);
		expect(spy).toHaveBeenCalledWith(VIDEO_AD_KEY);
	});

	it("shows side ads after 2 seconds when no previous view exists", async () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		vi.stubEnv("NEXT_PUBLIC_ENABLE_ADS", "true");
		render(<AdManager />);

		expect(screen.queryByText("Espaço do Apoiador")).toBeNull();

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		expect(screen.getAllByText("Espaço do Apoiador")).toHaveLength(2);
	});

	it("shows video modal after 30 seconds", async () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		vi.stubEnv("NEXT_PUBLIC_ENABLE_ADS", "true");
		render(<AdManager />);

		expect(screen.queryByText("Vídeo da Semana")).toBeNull();

		act(() => {
			vi.advanceTimersByTime(120000);
		});

		expect(screen.getByText("Vídeo da Semana")).toBeDefined();
	});

	it("hides video ad when viewed less than a week ago", () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		vi.stubEnv("NEXT_PUBLIC_ENABLE_ADS", "true");
		localStorage.setItem(VIDEO_AD_KEY, Date.now().toString());
		render(<AdManager />);

		act(() => {
			vi.advanceTimersByTime(120000);
		});

		expect(screen.queryByText("Vídeo da Semana")).toBeNull();
	});

	it("shows adblock modal when fetch fails", async () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		mockFetch.mockRejectedValueOnce(new Error("blocked"));

		render(<AdManager />);

		await vi.waitFor(() => {
			expect(screen.getByText("Opa! Uma ajudinha?")).toBeDefined();
		});
	});
});
