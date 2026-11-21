import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ESTIMATE_NOTICE_ID, EstimateNotice } from "@/components/atoms/estimate-notice";

describe("EstimateNotice", () => {
  it("renders the estimate disclosure as one paragraph, unedited", () => {
    const { container } = render(<EstimateNotice />);
    const paragraphs = container.querySelectorAll("p");
    const text =
      "Os valores são uma estimativa para você se organizar. Não substituem seu holerite, não valem como registro oficial de ponto e nada aqui é orientação jurídica ou contábil.";

    expect(paragraphs).toHaveLength(1);
    expect(paragraphs[0]).toHaveAttribute("id", ESTIMATE_NOTICE_ID);
    expect(paragraphs[0].textContent?.replace(/\s+/g, " ").trim()).toBe(text);
    expect(text).toHaveLength(170);
  });

  it("adds nothing focusable to the first screen", () => {
    const { container } = render(<EstimateNotice />);

    expect(
      container.querySelectorAll("a, button, input, select, textarea, [tabindex], [contenteditable]"),
    ).toHaveLength(0);
    expect(container.querySelector("p")).not.toHaveAttribute("tabindex");
  });

  it("stays out of every live region and carries no role", () => {
    const { container } = render(<EstimateNotice />);
    const paragraph = container.querySelector("p");

    expect(paragraph).not.toHaveAttribute("aria-live");
    expect(paragraph).not.toHaveAttribute("role");
    expect(paragraph).not.toHaveAttribute("aria-label");
    expect(paragraph?.closest("[aria-live]")).toBeNull();
  });
});
