import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("dates both routes by the last content change, not by the clock", () => {
    const first = sitemap();
    const second = sitemap();

    expect(first[0]?.lastModified).toEqual(second[0]?.lastModified);
  });

  it("lists both calculator routes", () => {
    const result = sitemap();

    expect(result).toHaveLength(2);
    expect(result.map((entry) => entry.url)).toEqual([
      "https://workload.devrma.com",
      "https://workload.devrma.com/custo-da-hora",
    ]);
  });

  it("ranks the journey above the hourly cost and refreshes both weekly", () => {
    const [journey, hourlyCost] = sitemap();

    expect(journey?.priority).toBe(1);
    expect(hourlyCost?.priority).toBe(0.9);
    expect(journey?.changeFrequency).toBe("weekly");
    expect(hourlyCost?.changeFrequency).toBe("weekly");
    expect(journey?.lastModified).toEqual(new Date("2026-09-14"));
    expect(hourlyCost?.lastModified).toEqual(new Date("2026-09-14"));
  });
});
