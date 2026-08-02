import { render, screen } from "@testing-library/react";
import { Zap } from "lucide-react";
import { describe, expect, it } from "vitest";
import { DurationRow } from "@/components/molecules/duration-row";

describe("DurationRow", () => {
  it("shows hours and minutes for the given amount", () => {
    render(<DurationRow icon={Zap} iconClassName="text-amber-500" label="Extra 50%" minutes={150} />);

    expect(screen.getByText("Extra 50%")).toBeInTheDocument();
    expect(screen.getByText("2h 30m")).toBeInTheDocument();
  });

  it("shows a zeroed duration when there is nothing to report", () => {
    render(<DurationRow icon={Zap} iconClassName="text-rose-500" label="Extra 100%" minutes={0} />);

    expect(screen.getByText("0h 0m")).toBeInTheDocument();
  });

  it("rounds fractional minutes", () => {
    render(<DurationRow icon={Zap} iconClassName="text-indigo-500" label="Adic. Noturno" minutes={59.6} />);

    expect(screen.getByText("0h 60m")).toBeInTheDocument();
  });
});
