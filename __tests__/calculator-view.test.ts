import { describe, expect, it } from "vitest";
import { VIEW_PATHS } from "@/lib/calculator-view";

describe("VIEW_PATHS", () => {
  it("gives each view its own static route", () => {
    expect(VIEW_PATHS).toEqual({ work: "/", salary: "/custo-da-hora" });
  });
});
