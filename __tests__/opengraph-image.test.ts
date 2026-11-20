import { describe, expect, it, vi } from "vitest";
import { VIEW_HEADINGS } from "@/lib/calculator-view";

vi.mock("@/lib/og-image", () => ({
  OG_IMAGE_SIZE: { width: 1200, height: 630 },
  OG_IMAGE_CONTENT_TYPE: "image/png",
  renderOgImage: (view: string) => ({ view }),
}));

describe("opengraph images", () => {
  it("renders the journey card at the size the social networks expect", async () => {
    const journey = await import("@/app/opengraph-image");

    expect(journey.size).toEqual({ width: 1200, height: 630 });
    expect(journey.contentType).toBe("image/png");
    expect(journey.alt).toContain("horas extras");
    expect(journey.default()).toEqual({ view: "work" });
  });

  it("renders a distinct card for the hourly cost route", async () => {
    const hourlyCost = await import("@/app/custo-da-hora/opengraph-image");

    expect(hourlyCost.alt).toContain("salário líquido");
    expect(hourlyCost.default()).toEqual({ view: "salary" });
  });

  it("gives X the same card as the other networks, per route", async () => {
    const journey = await import("@/app/twitter-image");
    const hourlyCost = await import("@/app/custo-da-hora/twitter-image");

    expect(journey.contentType).toBe("image/png");
    expect(journey.default()).toEqual({ view: "work" });
    expect(hourlyCost.default()).toEqual({ view: "salary" });
  });

  it("emits the same descriptor as the JSON-LD name on both networks", async () => {
    const openGraph = await import("@/app/opengraph-image");
    const twitter = await import("@/app/twitter-image");

    expect(openGraph.alt).toBe(`WorkLoad: ${VIEW_HEADINGS.work}`);
    expect(openGraph.alt).toBe(twitter.alt);
  });
});
