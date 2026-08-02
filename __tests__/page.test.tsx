import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import { safeGAEvent } from "@/lib/analytics";

vi.mock("@/lib/analytics", () => ({
  safeGAEvent: vi.fn(),
}));

const themeState: { resolvedTheme: string | undefined; setTheme: () => void } = {
  resolvedTheme: undefined,
  setTheme: vi.fn(),
};

vi.mock("next-themes", () => ({
  useTheme: () => themeState,
}));

vi.mock("@/components/organisms/work-calculator", () => ({
  WorkCalculator: () => <p>Painel da jornada</p>,
}));

vi.mock("@/components/organisms/salary-calculator", () => ({
  SalaryCalculator: () => <p>Painel do custo da hora</p>,
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    themeState.resolvedTheme = undefined;
  });

  it("renders the whole shell on the server instead of a blank document", () => {
    const markup = renderToString(<Home />);

    expect(markup).toContain("WorkLoad");
    expect(markup).toContain("Jornada");
    expect(markup).toContain("Custo da Hora");
    expect(markup).toContain("Pular para o conteúdo principal");
    expect(markup).toContain("--:--:--");
  });

  it("describes the application for search engines", () => {
    const markup = renderToString(<Home />);

    expect(markup).toContain("application/ld+json");
    expect(markup).toContain("WebApplication");
  });

  it("shows the live clock once the client takes over", () => {
    render(<Home />);

    expect(screen.getByText(/^\d{2}:\d{2}:\d{2}$/)).toBeInTheDocument();
  });

  it("reports the session metadata on mount", () => {
    render(<Home />);

    expect(safeGAEvent).toHaveBeenCalledWith(
      "session_metadata",
      expect.objectContaining({ viewport_width: window.innerWidth }),
    );
  });

  it("starts on the journey view", () => {
    render(<Home />);

    expect(screen.getByText("Painel da jornada")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Jornada" })).toHaveAttribute("aria-current", "page");
  });

  it("offers the dark theme while the light one is active", async () => {
    themeState.resolvedTheme = "light";
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByTitle("Alternar tema"));

    expect(safeGAEvent).toHaveBeenCalledWith("toggle_theme", {
      theme: "dark",
    });
  });

  it("offers the light theme while the dark one is active", async () => {
    themeState.resolvedTheme = "dark";
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByTitle("Alternar tema"));

    expect(safeGAEvent).toHaveBeenCalledWith("toggle_theme", {
      theme: "light",
    });
  });
});
