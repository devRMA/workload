import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Home, { metadata } from "@/app/page";

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

describe("Home", () => {
  it("serves the journey panel on the very first frame", () => {
    const markup = renderToString(<Home />);

    expect(markup).toContain("Painel da jornada");
    expect(markup).not.toContain("Painel do custo da hora");
  });
});

describe("metadata", () => {
  it("describes the journey view with its own canonical", () => {
    expect(metadata.title).toEqual({
      absolute: "Calculadora de Jornada, Horas Extras e Saldo do Dia | WorkLoad",
    });
    expect(metadata.description).toContain("hora extra");
    expect(metadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.openGraph).toMatchObject({
      title: "Calculadora de Jornada, Horas Extras e Saldo do Dia",
      url: "/",
    });
  });

  it("points the social card at the declared origin, not at the deployment host", async () => {
    const openGraphImage = await import("@/app/opengraph-image");
    const twitterImage = await import("@/app/twitter-image");

    expect(metadata.openGraph?.images).toEqual([
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: openGraphImage.alt,
        type: "image/png",
      },
    ]);
    expect(metadata.twitter?.images).toEqual([
      {
        url: "/twitter-image",
        width: 1200,
        height: 630,
        alt: twitterImage.alt,
      },
    ]);
  });
});
