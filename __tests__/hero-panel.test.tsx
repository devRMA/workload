import { IconClock } from "@tabler/icons-react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroPanel } from "@/components/organisms/hero-panel";

function readValueCqi(element: HTMLElement): number {
  return Number.parseFloat(/([\d.]+)cqi/.exec(element.style.getPropertyValue("--hero-value-size"))?.[1] ?? "");
}

describe("HeroPanel", () => {
  it("renders the label and the highlighted value", () => {
    render(<HeroPanel icon={IconClock} label="FALTAM" value="01:23:45" tone="emerald" />);

    expect(screen.getByText("FALTAM")).toBeInTheDocument();
    expect(screen.getByText("01:23:45")).toBeInTheDocument();
  });

  it("renders badge, children and footer when provided", () => {
    render(
      <HeroPanel
        icon={IconClock}
        label="Valor da Hora"
        value="R$ 25,00"
        tone="blue"
        badge={<span>10:00:00</span>}
        footer={<p>Resumo Financeiro</p>}
        editLink={{ href: "#editar-salario", label: "Editar salário" }}
      >
        <p>por minuto</p>
      </HeroPanel>,
    );

    expect(screen.getByText("10:00:00")).toBeInTheDocument();
    expect(screen.getByText("por minuto")).toBeInTheDocument();
    expect(screen.getByText("Resumo Financeiro")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Editar salário" })).toHaveAttribute("href", "#editar-salario");
  });

  it("shrinks the font as the value gets longer so it never wraps", () => {
    const { rerender } = render(<HeroPanel icon={IconClock} label="Valor" value="R$ 25,00" tone="blue" />);
    const shortValueCqi = readValueCqi(screen.getByText("R$ 25,00"));

    rerender(<HeroPanel icon={IconClock} label="Valor" value="R$ 926.150,68" tone="blue" />);
    const longValueCqi = readValueCqi(screen.getByText("R$ 926.150,68"));

    expect(shortValueCqi).toBeGreaterThan(0);
    expect(longValueCqi).toBeLessThan(shortValueCqi);
  });

  it("asks for no inline size when there is no value to show", () => {
    const { container } = render(<HeroPanel icon={IconClock} label="Valor" value="" tone="blue" />);
    const valueElement = container.querySelector<HTMLElement>("p[aria-live]");

    expect(valueElement?.style.getPropertyValue("--hero-value-size")).toBe("");
  });

  it("sets a sentence value in the statement step instead of the numeral step", () => {
    render(<HeroPanel icon={IconClock} label="Valor por mês" value="Sem carga horária" tone="blue" />);
    const valueElement = screen.getByText("Sem carga horária");

    expect(valueElement.style.getPropertyValue("--hero-value-size")).toBe("");
  });

  it("still announces a sentence value politely", () => {
    render(<HeroPanel icon={IconClock} label="Valor por mês" value="Sem carga horária" tone="blue" />);
    const valueElement = screen.getByText("Sem carga horária");

    expect(valueElement).toHaveAttribute("aria-live", "polite");
  });

  it("adds no separated block to the panel when there is no footer", () => {
    const { container, rerender } = render(
      <HeroPanel icon={IconClock} label="HORA EXTRA" value="00:10:00" tone="rose" />,
    );
    const content = container.firstElementChild?.firstElementChild as HTMLElement;

    expect(content.children).toHaveLength(2);

    rerender(
      <HeroPanel icon={IconClock} label="HORA EXTRA" value="00:10:00" tone="rose" footer={<p>Resumo Financeiro</p>} />,
    );

    expect(content.children).toHaveLength(3);
    expect(content.lastElementChild).toContainElement(screen.getByText("Resumo Financeiro"));
  });
});
