import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CalculatorViews } from "@/components/organisms/calculator-views";
import { safeGAEvent } from "@/lib/analytics";

const ALLOWED_HOSTS = new Set([
  "planalto.gov.br",
  "www.planalto.gov.br",
  "in.gov.br",
  "www.in.gov.br",
  "gov.br",
  "www.gov.br",
  "camara.leg.br",
  "www2.camara.leg.br",
  "senado.leg.br",
  "www12.senado.leg.br",
  "legis.senado.leg.br",
  "normas.leg.br",
  "tst.jus.br",
  "www.tst.jus.br",
]);

vi.mock("@/lib/analytics", () => ({
  safeGAEvent: vi.fn(),
}));

vi.mock("@/components/organisms/work-calculator", () => ({
  WorkCalculator: () => <p>Painel da jornada</p>,
}));

vi.mock("@/components/organisms/salary-calculator", () => ({
  SalaryCalculator: () => <p>Painel do custo da hora</p>,
}));

describe("CalculatorViews", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("marks the active tab and links both views by URL", () => {
    render(<CalculatorViews activeView="salary" />);

    expect(screen.getByRole("link", { name: "Jornada" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Custo da Hora" })).toHaveAttribute("href", "/custo-da-hora");
    expect(screen.getByRole("link", { name: "Custo da Hora" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Jornada" })).not.toHaveAttribute("aria-current");
  });

  it("replaces the active panel without waiting for the old one", () => {
    const { rerender } = render(<CalculatorViews activeView="work" />);
    expect(screen.getByText("Painel da jornada")).toBeInTheDocument();

    rerender(<CalculatorViews activeView="salary" />);
    expect(screen.getByText("Painel do custo da hora")).toBeInTheDocument();
    expect(screen.queryByText("Painel da jornada")).not.toBeInTheDocument();
  });

  it("tracks the tab the visitor moves to", async () => {
    const user = userEvent.setup();
    render(<CalculatorViews activeView="work" />);

    await user.click(screen.getByRole("link", { name: "Custo da Hora" }));

    expect(safeGAEvent).toHaveBeenCalledWith("switch_tab", { tab: "salary" });
  });

  it("leaves the focus alone on the first render", () => {
    const { container } = render(<CalculatorViews activeView="work" />);

    expect(container.querySelector("#main-content")).not.toHaveFocus();
    expect(document.activeElement).toBe(document.body);
  });

  it("moves the focus to the panel once the view changes", () => {
    const { container, rerender } = render(<CalculatorViews activeView="work" />);

    rerender(<CalculatorViews activeView="salary" />);

    expect(container.querySelector("#main-content")).toHaveFocus();
  });

  it("promises that nothing leaves the browser", () => {
    render(<CalculatorViews activeView="work" />);

    expect(screen.getByText(/fica salvo apenas neste navegador/)).toBeInTheDocument();
    expect(screen.queryByText(/Não substituem seu holerite/)).toBeNull();
  });

  it.each([
    {
      view: "work",
      markers: [
        /fica salvo apenas neste navegador/,
        /Não entram na conta/,
        /Tabelas usadas nos cálculos/,
        /Horas extras noturnas/,
      ],
    },
    {
      view: "salary",
      markers: [/fica salvo apenas neste navegador/, /Não entram na conta/, /Tabelas usadas nos cálculos/],
    },
  ] as const)("keeps the expected footer paragraphs in order for $view", ({ view, markers }) => {
    render(<CalculatorViews activeView={view} />);

    const footer = screen.getByText(/fica salvo apenas neste navegador/).closest("footer");
    const paragraphs = footer?.querySelectorAll("p");

    expect(paragraphs).toHaveLength(markers.length);
    for (const [index, marker] of markers.entries()) {
      expect(paragraphs?.[index]).toHaveTextContent(marker);
    }
  });

  it("names what the calculation leaves out", () => {
    render(<CalculatorViews activeView="work" />);

    const omissions = screen.getByText(/Não entram na conta/);

    expect(omissions).toHaveTextContent("FGTS");
    expect(omissions).toHaveTextContent("convenção coletiva");
    expect(omissions).toHaveTextContent("13º salário");
    expect(omissions).toHaveTextContent("Súmula 60, II, do TST");
    expect(omissions).toHaveTextContent("RPPS federal");
    expect(screen.getByText(/prorrogação da jornada noturna depois das 5h/)).toHaveTextContent("Súmula 60, II, do TST");
  });

  it("names the norm behind each table and links it to an official host", () => {
    render(<CalculatorViews activeView="work" />);

    const footer = screen.getByText(/Tabelas usadas nos cálculos/).closest("footer");
    expect(footer).not.toBeNull();
    const links = footer ? Array.from(footer.querySelectorAll("a")) : [];

    expect(links.length).toBe(5);
    expect(links.map((link) => link.textContent)).toEqual([
      "Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II",
      "Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025",
      "Emenda Constitucional nº 103/2019, art. 11",
      "Anexo III da Portaria nº 13/2026",
      "Tema 288 do TST (OJ 97)",
    ]);
    for (const link of links) {
      const href = link.getAttribute("href") ?? "";
      expect(ALLOWED_HOSTS.has(new URL(href).hostname)).toBe(true);
    }
  });

  it("links the night overtime calculation to its official source on Jornada only", () => {
    const { rerender } = render(<CalculatorViews activeView="work" />);
    const name = "Tema 288 do TST (OJ 97)";
    const link = screen.getByRole("link", { name });
    expect(link).toHaveAttribute(
      "href",
      "https://www.tst.jus.br/documents/d/guest/livro-precedentes-trabalhistas-v182025",
    );
    expect(link.closest("p")).toHaveTextContent("Horas extras noturnas:");

    rerender(<CalculatorViews activeView="salary" />);
    expect(screen.queryByRole("link", { name })).not.toBeInTheDocument();
  });

  it("never credits one norm with both tables", () => {
    render(<CalculatorViews activeView="work" />);

    const inssLink = screen.getByRole("link", { name: /Portaria Interministerial/ });
    const irrfLink = screen.getByRole("link", { name: /Lei nº 11\.482\/2007/ });

    expect(inssLink).toHaveAttribute("href");
    expect(irrfLink).toHaveAttribute("href");
    expect(inssLink.getAttribute("href")).not.toBe(irrfLink.getAttribute("href"));
  });

  it("pairs every date with the norm that took force on it", () => {
    render(<CalculatorViews activeView="work" />);

    const paragraph = screen.getByText(/Tabelas usadas nos cálculos/);

    expect(paragraph).toHaveTextContent("Anexo II, em vigor desde 01/01/2026");
    expect(paragraph).toHaveTextContent("Lei nº 15.191/2025, em vigor desde 01/05/2025");
    expect(paragraph).toHaveTextContent("Portaria nº 13/2026, em vigor desde 01/01/2026");
    expect(paragraph.textContent).not.toContain(
      "Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025, em vigor desde 01/01/2026",
    );
  });

  it("mounts the consent surface after the footer inside the main content", () => {
    render(<CalculatorViews activeView="work" />);

    const consentRoot = screen.getByRole("button", { name: "Configurações de Privacidade" });
    const footer = screen.getByText(/fica salvo apenas neste navegador/).closest("footer");
    expect(footer).not.toBeNull();

    const position = (footer as HTMLElement).compareDocumentPosition(consentRoot);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("carries the whole citation line", () => {
    render(<CalculatorViews activeView="work" />);

    const paragraph = screen.getByText(/Tabelas usadas nos cálculos/);
    const collapsed = paragraph.textContent?.replace(/\s+/g, " ").trim() ?? "";

    expect(collapsed).toBe(
      "Tabelas usadas nos cálculos: INSS pela Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II, em vigor desde 01/01/2026. IRRF pela Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025, em vigor desde 01/05/2025. RPPS federal: as alíquotas vêm da Emenda Constitucional nº 103/2019, art. 11, e as faixas de 2026, do Anexo III da Portaria nº 13/2026, em vigor desde 01/01/2026.",
    );
    expect(collapsed.length).toBe(398);
  });
});
