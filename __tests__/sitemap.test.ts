import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
	it("returns the expected sitemap entries", () => {
		const result = sitemap();
		expect(result).toHaveLength(1);
		expect(result[0]?.url).toBe("https://workload.devrma.com");
		expect(result[0]?.changeFrequency).toBe("weekly");
		expect(result[0]?.priority).toBe(1);
		expect(result[0]?.lastModified).toBeInstanceOf(Date);
	});
});
