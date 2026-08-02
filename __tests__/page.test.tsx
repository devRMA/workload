import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Home, { generateMetadata } from "@/app/page";

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

function searchParamsOf(view?: string | string[]) {
  return Promise.resolve(view === undefined ? {} : { view });
}

async function renderPage(view?: string | string[]) {
  return renderToString(await Home({ searchParams: searchParamsOf(view) }));
}

describe("Home", () => {
  it("renders the whole shell on the server instead of a blank document", async () => {
    const markup = await renderPage();

    expect(markup).toContain("WorkLoad");
    expect(markup).toContain("Jornada");
    expect(markup).toContain("Custo da Hora");
    expect(markup).toContain("Pular para o conteúdo principal");
    expect(markup).toContain("--:--:--");
  });

  it("describes the application for search engines", async () => {
    const markup = await renderPage();

    expect(markup).toContain("application/ld+json");
    expect(markup).toContain("WebApplication");
  });

  it("starts on the journey view", async () => {
    const markup = await renderPage();

    expect(markup).toContain("Painel da jornada");
    expect(markup).not.toContain("Painel do custo da hora");
  });

  it("serves the salary panel on the very first frame", async () => {
    const markup = await renderPage("salary");

    expect(markup).toContain("Painel do custo da hora");
    expect(markup).not.toContain("Painel da jornada");
  });
});

describe("generateMetadata", () => {
  it("describes the journey view by default", async () => {
    const metadata = await generateMetadata({ searchParams: searchParamsOf() });

    expect(metadata.title).toContain("Jornada");
    expect(metadata.description).toContain("hora extra");
    expect(metadata.alternates?.canonical).toBe("/");
    expect(metadata.openGraph).toMatchObject({ url: "/" });
  });

  it("describes the salary view", async () => {
    const metadata = await generateMetadata({ searchParams: searchParamsOf("salary") });

    expect(metadata.title).toContain("Salário Líquido");
    expect(metadata.alternates?.canonical).toBe("/?view=salary");
  });

  it("keeps the first value when the view is repeated in the query string", async () => {
    const metadata = await generateMetadata({ searchParams: searchParamsOf(["salary", "work"]) });

    expect(metadata.alternates?.canonical).toBe("/?view=salary");
  });

  it("falls back to the journey for an unknown or empty view", async () => {
    const unknown = await generateMetadata({ searchParams: searchParamsOf("anything-else") });
    const missing = await generateMetadata({ searchParams: searchParamsOf([]) });

    expect(unknown.alternates?.canonical).toBe("/");
    expect(missing.alternates?.canonical).toBe("/");
  });
});
