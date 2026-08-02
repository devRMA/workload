import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CollapsiblePanel } from "@/components/molecules/collapsible-panel";

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

  it("exposes the id so a trigger can reference it", () => {
    render(
      <CollapsiblePanel id="painel" isOpen className="mt-6">
        <p>Conteúdo</p>
      </CollapsiblePanel>,
    );

    const panel = document.getElementById("painel");
    expect(panel).toHaveClass("overflow-hidden", "mt-6");
  });
});
