import { describe, expect, it } from "vitest";
import robots from "@/app/robots";

describe("robots", () => {
  it("returns the expected robots rules", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://workload.devrma.com/sitemap.xml",
    });
  });
});
