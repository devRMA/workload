import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TaxDetailsPanel } from "@/components/organisms/tax-details-panel";
import { safeGAEvent } from "@/lib/analytics";

vi.mock("@/lib/analytics", () => ({
  safeGAEvent: vi.fn(),
}));

const baseProps = {
  dependents: 0,
  onDependentsChange: vi.fn(),
  manualInss: null,
  manualIrrf: null,
  autoInss: 500,
  autoIrrf: 250,
  extraDeductions: [],
  extraGains: [],
};

describe("TaxDetailsPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("suggests the calculated taxes as placeholders", () => {
    render(
      <TaxDetailsPanel
        {...baseProps}
        onManualInssChange={vi.fn()}
        onManualIrrfChange={vi.fn()}
        onAddExtra={vi.fn()}
        onUpdateExtra={vi.fn()}
        onRemoveExtra={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("INSS (R$)")).toHaveAttribute("placeholder", "500,00");
    expect(screen.getByLabelText("IRRF (R$)")).toHaveAttribute("placeholder", "250,00");
  });

  it("shows the manual taxes when they override the calculated ones", () => {
    render(
      <TaxDetailsPanel
        {...baseProps}
        manualInss={400}
        manualIrrf={180}
        onManualInssChange={vi.fn()}
        onManualIrrfChange={vi.fn()}
        onAddExtra={vi.fn()}
        onUpdateExtra={vi.fn()}
        onRemoveExtra={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("INSS (R$)")).toHaveValue("400,00");
    expect(screen.getByLabelText("IRRF (R$)")).toHaveValue("180,00");
  });

  it("reports a manual tax amount and clears it back to automatic", async () => {
    const onManualInssChange = vi.fn();
    const user = userEvent.setup();
    render(
      <TaxDetailsPanel
        {...baseProps}
        manualInss={400}
        onManualInssChange={onManualInssChange}
        onManualIrrfChange={vi.fn()}
        onAddExtra={vi.fn()}
        onUpdateExtra={vi.fn()}
        onRemoveExtra={vi.fn()}
      />,
    );

    const inssField = screen.getByLabelText("INSS (R$)");
    expect(inssField).toHaveValue("400,00");

    await user.clear(inssField);
    expect(onManualInssChange).toHaveBeenCalledWith(null);

    await user.type(inssField, "1");
    expect(onManualInssChange).toHaveBeenLastCalledWith(4000.01);
  });

  it("reports a manual income tax amount", async () => {
    const onManualIrrfChange = vi.fn();
    const user = userEvent.setup();
    render(
      <TaxDetailsPanel
        {...baseProps}
        onManualInssChange={vi.fn()}
        onManualIrrfChange={onManualIrrfChange}
        onAddExtra={vi.fn()}
        onUpdateExtra={vi.fn()}
        onRemoveExtra={vi.fn()}
      />,
    );

    await user.type(screen.getByLabelText("IRRF (R$)"), "7");

    expect(onManualIrrfChange).toHaveBeenLastCalledWith(0.07);
  });

  it("tracks the creation of a deduction", async () => {
    const onAddExtra = vi.fn();
    const user = userEvent.setup();
    render(
      <TaxDetailsPanel
        {...baseProps}
        onManualInssChange={vi.fn()}
        onManualIrrfChange={vi.fn()}
        onAddExtra={onAddExtra}
        onUpdateExtra={vi.fn()}
        onRemoveExtra={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Adicionar desconto" }));

    expect(onAddExtra).toHaveBeenCalledWith("deduction");
    expect(safeGAEvent).toHaveBeenCalledWith("add_deduction");
  });

  it("tracks the creation of a gain", async () => {
    const onAddExtra = vi.fn();
    const user = userEvent.setup();
    render(
      <TaxDetailsPanel
        {...baseProps}
        onManualInssChange={vi.fn()}
        onManualIrrfChange={vi.fn()}
        onAddExtra={onAddExtra}
        onUpdateExtra={vi.fn()}
        onRemoveExtra={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Adicionar ganho" }));

    expect(onAddExtra).toHaveBeenCalledWith("gain");
    expect(safeGAEvent).toHaveBeenCalledWith("add_gain");
  });

  it("edits and removes an existing deduction", async () => {
    const onUpdateExtra = vi.fn();
    const onRemoveExtra = vi.fn();
    const user = userEvent.setup();
    render(
      <TaxDetailsPanel
        {...baseProps}
        extraDeductions={[{ id: "one", name: "", value: 0 }]}
        onManualInssChange={vi.fn()}
        onManualIrrfChange={vi.fn()}
        onAddExtra={vi.fn()}
        onUpdateExtra={onUpdateExtra}
        onRemoveExtra={onRemoveExtra}
      />,
    );

    await user.type(screen.getByLabelText("Descrição do desconto"), "V");
    expect(onUpdateExtra).toHaveBeenCalledWith("one", "deduction", "name", "V");

    await user.type(screen.getByLabelText("Valor do desconto"), "5");
    expect(onUpdateExtra).toHaveBeenLastCalledWith("one", "deduction", "value", 0.05);

    await user.click(screen.getByRole("button", { name: "Remover desconto" }));
    expect(onRemoveExtra).toHaveBeenCalledWith("one", "deduction");
  });

  it("edits and removes an existing gain", async () => {
    const onUpdateExtra = vi.fn();
    const onRemoveExtra = vi.fn();
    const user = userEvent.setup();
    render(
      <TaxDetailsPanel
        {...baseProps}
        extraGains={[{ id: "two", name: "", value: 0 }]}
        onManualInssChange={vi.fn()}
        onManualIrrfChange={vi.fn()}
        onAddExtra={vi.fn()}
        onUpdateExtra={onUpdateExtra}
        onRemoveExtra={onRemoveExtra}
      />,
    );

    await user.type(screen.getByLabelText("Descrição do ganho"), "V");
    expect(onUpdateExtra).toHaveBeenCalledWith("two", "gain", "name", "V");

    await user.type(screen.getByLabelText("Valor do ganho"), "5");
    expect(onUpdateExtra).toHaveBeenLastCalledWith("two", "gain", "value", 0.05);

    await user.click(screen.getByRole("button", { name: "Remover ganho" }));
    expect(onRemoveExtra).toHaveBeenCalledWith("two", "gain");
  });
});
