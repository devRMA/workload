import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdManager } from "@/components/organisms/ad-manager";

const MOCK_ADSENSE_ID = "ca-pub-123456789";
const AD_VIEW_KEY = "workload_last_ad_view";
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

vi.mock("next/script", () => ({
	default: ({ children, ...props }: Record<string, unknown>) => (
		<script {...props}>{children as string}</script>
	),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("AdManager", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
		vi.unstubAllEnvs();
		mockFetch.mockResolvedValue({ ok: true });
	});

	it("returns null when NEXT_PUBLIC_ADSENSE_ID is not set", () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", "");
		const { container } = render(<AdManager />);
		expect(container.innerHTML).toBe("");
	});

	it("checks weekly limit in localStorage on mount", () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		const spy = vi.spyOn(Storage.prototype, "getItem");
		render(<AdManager />);
		expect(spy).toHaveBeenCalledWith(AD_VIEW_KEY);
	});

	it("shows ad when no previous view exists", async () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		render(<AdManager />);
		expect(screen.getByText("Anúncio da Semana")).toBeDefined();
	});

	it("hides ad when viewed less than a week ago", () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		localStorage.setItem(AD_VIEW_KEY, Date.now().toString());
		render(<AdManager />);
		expect(screen.queryByText("Anúncio da Semana")).toBeNull();
	});

	it("shows ad when last view was more than a week ago", () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		const oldTimestamp = Date.now() - ONE_WEEK_MS - 1000;
		localStorage.setItem(AD_VIEW_KEY, oldTimestamp.toString());
		render(<AdManager />);
		expect(screen.getByText("Anúncio da Semana")).toBeDefined();
	});

	it("hides ad and saves timestamp when dismiss button is clicked", async () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		const user = userEvent.setup();
		render(<AdManager />);

		const dismissButton = screen.getByText("Remover (já vi por hoje)");
		await user.click(dismissButton);

		expect(localStorage.getItem(AD_VIEW_KEY)).toBeTruthy();
		expect(screen.queryByText("Anúncio da Semana")).toBeNull();
	});

	it("shows adblock modal when fetch fails", async () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		mockFetch.mockRejectedValueOnce(new Error("blocked"));

		render(<AdManager />);
		await vi.waitFor(() => {
			expect(screen.getByText("Opa! Uma ajudinha?")).toBeDefined();
		});
	});

	it("closes adblock modal when continue button is clicked", async () => {
		vi.stubEnv("NEXT_PUBLIC_ADSENSE_ID", MOCK_ADSENSE_ID);
		mockFetch.mockRejectedValueOnce(new Error("blocked"));
		const user = userEvent.setup();

		render(<AdManager />);
		await vi.waitFor(() => {
			expect(screen.getByText("Opa! Uma ajudinha?")).toBeDefined();
		});

		await user.click(screen.getByText("Continuar com AdBlock ativo"));

		await vi.waitFor(() => {
			expect(screen.queryByText("Opa! Uma ajudinha?")).toBeNull();
		});
	});
});
