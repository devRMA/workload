import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CollapsiblePanel } from "@/components/atoms/collapsible-panel";

describe("CollapsiblePanel", () => {
  it("hides its content while closed", () => {
    render(
      <CollapsiblePanel id="painel" isOpen={false}>
        <p>Conteúdo</p>
      </CollapsiblePanel>,
    );

    expect(screen.queryByText("Conteúdo")).toBeNull();
  });

  it("reveals its content while open", () => {
    render(
      <CollapsiblePanel id="painel" isOpen>
        <p>Conteúdo</p>
      </CollapsiblePanel>,
    );

    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });
});
