import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import CostPerHour, { metadata } from "@/app/custo-da-hora/page";

vi.mock("@/lib/analytics", () => ({
  safeGAEvent: vi.fn(),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: undefined, setTheme: vi.fn() }),
}));

vi.mock("@/components/organisms/work-calculator", () => ({
  WorkCalculator: () => <p>Painel da jornada</p>,
}));

vi.mock("@/components/organisms/salary-calculator", () => ({
  SalaryCalculator: () => <p>Painel do custo da hora</p>,
}));

vi.mock("@/lib/og-image", () => ({
  OG_IMAGE_SIZE: { width: 1200, height: 630 },
  OG_IMAGE_CONTENT_TYPE: "image/png",
  renderOgImage: (view: string) => ({ view }),
}));

describe("CostPerHour", () => {
  it("serves the salary panel on the very first frame", () => {
    const markup = renderToString(<CostPerHour />);

    expect(markup).toContain("Painel do custo da hora");
    expect(markup).not.toContain("Painel da jornada");
  });
});

describe("metadata", () => {
  it("describes the salary view with its own canonical", () => {
    expect(metadata.title).toEqual({
      absolute: "Calculadora de Valor da Hora e Salário Líquido CLT | WorkLoad",
    });
    expect(metadata.description).toContain("salário bruto");
    expect(metadata.alternates).toEqual({ canonical: "/custo-da-hora" });
    expect(metadata.openGraph).toMatchObject({
      title: "Calculadora de Valor da Hora e Salário Líquido CLT",
      url: "/custo-da-hora",
    });
  });

  it("points the social card at the declared origin, not at the deployment host", async () => {
    const openGraphImage = await import("@/app/custo-da-hora/opengraph-image");
    const twitterImage = await import("@/app/custo-da-hora/twitter-image");

    expect(metadata.openGraph?.images).toEqual([
      {
        url: "/custo-da-hora/opengraph-image",
        width: 1200,
        height: 630,
        alt: openGraphImage.alt,
        type: "image/png",
      },
    ]);
    expect(metadata.twitter?.images).toEqual([
      {
        url: "/custo-da-hora/twitter-image",
        width: 1200,
        height: 630,
        alt: twitterImage.alt,
      },
    ]);
  });
});
