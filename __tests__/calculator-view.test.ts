import { describe, expect, it } from "vitest";
import { toCalculatorView } from "@/lib/calculator-view";

describe("toCalculatorView", () => {
  it("only accepts the salary view, falling back to the journey", () => {
    expect(toCalculatorView("salary")).toBe("salary");
    expect(toCalculatorView("work")).toBe("work");
    expect(toCalculatorView("anything-else")).toBe("work");
    expect(toCalculatorView(null)).toBe("work");
  });
});
