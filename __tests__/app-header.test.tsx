import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppHeader } from "@/components/organisms/app-header";
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

function renderAtFixedTime() {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2025-01-06T09:30:00"));
  return render(<AppHeader />);
}

describe("AppHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    themeState.resolvedTheme = undefined;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("names the application and holds the clock still on the server", () => {
    const markup = renderToString(<AppHeader />);

    expect(markup).toContain("WorkLoad");
    expect(markup).toContain("Sua jornada de trabalho, clara e no seu controle");
    expect(markup).toContain("--:--:--");
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
    render(<AppHeader />);

    expect(safeGAEvent).toHaveBeenCalledWith(
      "session_metadata",
      expect.objectContaining({ viewport_width: window.innerWidth }),
    );
  });

  it("offers the dark theme while the light one is active", async () => {
    themeState.resolvedTheme = "light";
    const user = userEvent.setup();
    render(<AppHeader />);

    await user.click(screen.getByRole("button", { name: "Alternar tema" }));

    expect(themeState.setTheme).toHaveBeenCalledWith("dark");
    expect(safeGAEvent).toHaveBeenCalledWith("toggle_theme", { theme: "dark" });
  });

  it("offers the light theme while the dark one is active", async () => {
    themeState.resolvedTheme = "dark";
    const user = userEvent.setup();
    render(<AppHeader />);

    await user.click(screen.getByRole("button", { name: "Alternar tema" }));

    expect(themeState.setTheme).toHaveBeenCalledWith("light");
    expect(safeGAEvent).toHaveBeenCalledWith("toggle_theme", { theme: "light" });
  });
});
