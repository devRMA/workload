import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "@/components/theme-provider";

describe("ThemeProvider", () => {
  it("renders its children through next-themes", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system">
        <div>child content</div>
      </ThemeProvider>,
    );
    expect(screen.getByText("child content")).toBeInTheDocument();
  });
});
