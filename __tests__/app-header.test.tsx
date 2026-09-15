import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppHeader } from "@/components/organisms/app-header";
import { safeGAEvent } from "@/lib/analytics";

vi.mock("@/lib/analytics", () => ({
  safeGAEvent: vi.fn(),
}));

const HEADING = "Calculadora de jornada de trabalho, horas extras e saldo do dia";

const themeState: { setTheme: () => void } = {
  setTheme: vi.fn(),
};

vi.mock("next-themes", () => ({
  useTheme: () => themeState,
}));

function renderAtFixedTime() {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2025-01-06T09:30:00"));
  return render(<AppHeader heading={HEADING} />);
}

describe("AppHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.documentElement.classList.remove("dark");
  });

  it("names the application and holds the clock still on the server", () => {
    const markup = renderToString(<AppHeader heading={HEADING} />);

    expect(markup).toContain("WorkLoad");
    expect(markup).toContain(HEADING);
    expect(markup).toContain("Sua jornada de trabalho, clara e no seu controle");
    expect(markup).toContain("--:--:--");
  });

  it("states what the page calculates in its only top-level heading", () => {
    renderAtFixedTime();

    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(HEADING);
  });

  it("shows the live clock once the client takes over", () => {
    renderAtFixedTime();

    expect(screen.getByText("09:30:00")).toBeInTheDocument();
  });

  it("hides the ticking clock from assistive technology", () => {
    renderAtFixedTime();

    expect(screen.getByText("09:30:00").closest("[aria-hidden='true']")).toBeInTheDocument();
  });

  it("reports the session metadata on mount", () => {
    render(<AppHeader heading={HEADING} />);

    expect(safeGAEvent).toHaveBeenCalledWith(
      "session_metadata",
      expect.objectContaining({ viewport_width: window.innerWidth }),
    );
  });

  it("server-renders both theme glyphs", () => {
    const markup = renderToString(<AppHeader heading={HEADING} />);

    expect(markup).toContain('data-theme-icon="moon"');
    expect(markup).toContain('data-theme-icon="sun"');
  });

  it("announces neither glyph, only the static toggle label", () => {
    render(<AppHeader heading={HEADING} />);

    for (const glyph of document.querySelectorAll("[data-theme-icon]")) {
      expect(glyph).toHaveAttribute("aria-hidden", "true");
    }
    expect(screen.getByRole("button", { name: "Alternar tema" })).toBeInTheDocument();
  });

  it("substitutes no glyph across a click", async () => {
    const user = userEvent.setup();
    render(<AppHeader heading={HEADING} />);
    const toggle = screen.getByRole("button", { name: "Alternar tema" });

    expect(document.querySelectorAll("[data-theme-icon]")).toHaveLength(2);

    await user.click(toggle);

    expect(document.querySelectorAll("[data-theme-icon]")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Alternar tema" })).toBe(toggle);
  });

  it("offers the dark theme while the light one is active", async () => {
    const user = userEvent.setup();
    render(<AppHeader heading={HEADING} />);

    await user.click(screen.getByRole("button", { name: "Alternar tema" }));

    expect(themeState.setTheme).toHaveBeenCalledWith("dark");
    expect(safeGAEvent).toHaveBeenCalledWith("toggle_theme", { theme: "dark" });
  });

  it("offers the light theme while the dark one is active", async () => {
    document.documentElement.classList.add("dark");
    const user = userEvent.setup();
    render(<AppHeader heading={HEADING} />);

    await user.click(screen.getByRole("button", { name: "Alternar tema" }));

    expect(themeState.setTheme).toHaveBeenCalledWith("light");
    expect(safeGAEvent).toHaveBeenCalledWith("toggle_theme", { theme: "light" });
  });

  it("toggles the theme from the keyboard", async () => {
    const user = userEvent.setup();
    render(<AppHeader heading={HEADING} />);

    await user.tab();
    expect(screen.getByRole("button", { name: "Alternar tema" })).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(themeState.setTheme).toHaveBeenCalledWith("dark");
    expect(safeGAEvent).toHaveBeenCalledWith("toggle_theme", { theme: "dark" });
  });

  it("carries no motion wrapper on the theme toggle — a theme swap must not animate", () => {
    render(<AppHeader heading={HEADING} />);

    const toggle = screen.getByRole("button", { name: "Alternar tema" });
    expect(toggle).not.toHaveAttribute("style");
  });
});
