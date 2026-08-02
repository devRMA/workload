import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkSummary } from "@/components/organisms/work-summary";

describe("WorkSummary", () => {
  it("celebrates a positive balance", () => {
    render(
      <WorkSummary
        balanceMinutes={135}
        balanceSign={1}
        firstTierMinutes={120}
        extraTierMinutes={15}
        nightMinutes={0}
        firstTierRate={50}
        extraTierRate={100}
      />,
    );

    expect(screen.getByText("+2h 15m")).toBeInTheDocument();
    expect(screen.getByText("Horas extras acumuladas")).toBeInTheDocument();
  });

  it("reports a negative balance as a debt", () => {
    render(
      <WorkSummary
        balanceMinutes={-45}
        balanceSign={-1}
        firstTierMinutes={0}
        extraTierMinutes={0}
        nightMinutes={0}
        firstTierRate={50}
        extraTierRate={100}
      />,
    );

    expect(screen.getByText("-0h 45m")).toBeInTheDocument();
    expect(screen.getByText("Horas em débito hoje")).toBeInTheDocument();
  });

  it("names the overtime tiers after the configured rates", () => {
    render(
      <WorkSummary
        balanceMinutes={0}
        balanceSign={0}
        firstTierMinutes={60}
        extraTierMinutes={30}
        nightMinutes={90}
        firstTierRate={75}
        extraTierRate={110}
      />,
    );

    expect(screen.getByText("Extra 75%")).toBeInTheDocument();
    expect(screen.getByText("Extra 110%")).toBeInTheDocument();
    expect(screen.getByText("Adic. Noturno")).toBeInTheDocument();
    expect(screen.getByText("1h 0m")).toBeInTheDocument();
    expect(screen.getByText("0h 30m")).toBeInTheDocument();
    expect(screen.getByText("1h 30m")).toBeInTheDocument();
  });

  it("does not present the overtime tiers as statutory rates", () => {
    render(
      <WorkSummary
        balanceMinutes={0}
        balanceSign={0}
        firstTierMinutes={0}
        extraTierMinutes={0}
        nightMinutes={0}
        firstTierRate={50}
        extraTierRate={100}
      />,
    );

    expect(screen.queryByText("Extras (CLT)")).toBeNull();
    expect(screen.getByRole("heading", { name: "Extras e Adicionais" })).toBeInTheDocument();
  });
});

describe("WorkSummary balance sign", () => {
  it("reads an exactly balanced day as on target", () => {
    render(
      <WorkSummary
        balanceMinutes={0}
        balanceSign={0}
        firstTierMinutes={0}
        extraTierMinutes={0}
        nightMinutes={0}
        firstTierRate={50}
        extraTierRate={100}
      />,
    );

    expect(screen.getByText("+0h 0m")).toBeInTheDocument();
    expect(screen.queryByText("Horas em débito hoje")).toBeNull();
  });
});
