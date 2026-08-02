import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it } from "vitest";
import { DaySummary } from "@/components/organisms/day-summary";
import type { DayBreakdown } from "@/lib/day-breakdown";

type DaySummaryProps = ComponentProps<typeof DaySummary>;

const MONDAY = "2025-01-06";

const TIMES = {
  entry: `${MONDAY}T08:00`,
  lunchStart: `${MONDAY}T12:00`,
  lunchEnd: `${MONDAY}T13:00`,
  exit: `${MONDAY}T17:48`,
};

const FINISHED_DAY: DayBreakdown = {
  morningMinutes: 240,
  lunchMinutes: 60,
  afternoonMinutes: 288,
  nightBonusMinutes: 0,
  workedMinutes: 528,
  expectedMinutes: 528,
  remainingMinutes: 0,
  overtimeMinutes: 0,
  progressPercent: 100,
  overtimePercent: 0,
  segments: [
    { kind: "morning", minutes: 240 },
    { kind: "lunch", minutes: 60 },
    { kind: "afternoon", minutes: 288 },
  ],
  isInProgress: false,
};

const BASE_PROPS: DaySummaryProps = {
  breakdown: FINISHED_DAY,
  times: TIMES,
  balanceMinutes: 0,
  firstTierMinutes: 0,
  extraTierMinutes: 0,
  nightMinutes: 0,
  firstTierRate: 50,
  extraTierRate: 100,
  hourlyRate: null,
  warnings: [],
};

function renderSummary(overrides: Partial<DaySummaryProps> = {}) {
  return render(<DaySummary {...BASE_PROPS} {...overrides} />);
}

describe("DaySummary", () => {
  it("lists every stretch of a finished day", () => {
    renderSummary();

    expect(screen.getByRole("heading", { name: "Seu Dia" })).toBeInTheDocument();
    expect(screen.getByText("Manhã")).toBeInTheDocument();
    expect(screen.getByText("08:00 → 12:00")).toBeInTheDocument();
    expect(screen.getByText("Almoço")).toBeInTheDocument();
    expect(screen.getByText("Tarde")).toBeInTheDocument();
    expect(screen.getByText("13:00 → 17:48")).toBeInTheDocument();
    expect(screen.getByText("Trabalhado no dia")).toBeInTheDocument();
  });

  it("leaves out the stretches that have not happened yet", () => {
    renderSummary({
      breakdown: {
        ...FINISHED_DAY,
        lunchMinutes: 0,
        afternoonMinutes: 0,
        workedMinutes: 120,
        segments: [{ kind: "morning", minutes: 120 }],
      },
    });

    expect(screen.getByText("Manhã")).toBeInTheDocument();
    expect(screen.queryByText("Almoço")).toBeNull();
    expect(screen.queryByText("Tarde")).toBeNull();
  });

  it("drops the timeline when nothing has been worked", () => {
    const { container } = renderSummary({
      breakdown: {
        ...FINISHED_DAY,
        morningMinutes: 0,
        lunchMinutes: 0,
        afternoonMinutes: 0,
        workedMinutes: 0,
        segments: [],
      },
    });

    expect(container.querySelector(".rounded-full.bg-neutral-100")).toBeNull();
    expect(screen.queryByText("Manhã")).toBeNull();
  });

  it("ends the running stretch at 'agora' instead of a clock time", () => {
    renderSummary({
      breakdown: {
        ...FINISHED_DAY,
        afternoonMinutes: 120,
        workedMinutes: 360,
        remainingMinutes: 168,
        segments: [
          { kind: "morning", minutes: 240 },
          { kind: "lunch", minutes: 60 },
          { kind: "afternoon", minutes: 120 },
        ],
        isInProgress: true,
      },
    });

    expect(screen.getByText("13:00 → agora")).toBeInTheDocument();
    expect(screen.getByText("08:00 → 12:00")).toBeInTheDocument();
    expect(screen.getByText("Trabalhado até agora")).toBeInTheDocument();
  });

  it("shows the reduced night hour only when it credited something", () => {
    renderSummary();
    expect(screen.queryByText("Hora noturna reduzida")).toBeNull();

    renderSummary({ breakdown: { ...FINISHED_DAY, nightBonusMinutes: 51 } });

    expect(screen.getByText("Hora noturna reduzida")).toBeInTheDocument();
    expect(screen.getByText("+0h 51m")).toBeInTheDocument();
  });

  it("announces what is left only while there is time left", () => {
    renderSummary();
    expect(screen.queryByText("Ainda falta")).toBeNull();
    expect(screen.getByText("Saldo do dia")).toBeInTheDocument();

    renderSummary({ breakdown: { ...FINISHED_DAY, workedMinutes: 468, remainingMinutes: 60 } });

    expect(screen.getByText("Ainda falta")).toBeInTheDocument();
    expect(screen.getByText("Saldo se você sair no horário")).toBeInTheDocument();
  });

  it("paints a positive balance apart from a negative one", () => {
    renderSummary({ balanceMinutes: 30 });
    expect(screen.getByText("+0h 30m")).toHaveClass("text-emerald-700");

    renderSummary({ balanceMinutes: -30 });
    expect(screen.getByText("-0h 30m")).toHaveClass("text-rose-600");
  });

  it("invites the reader to calculate the hourly value when it is unknown", () => {
    renderSummary({ firstTierMinutes: 60, extraTierMinutes: 30 });

    expect(screen.getByRole("link", { name: /Calcule o valor da sua hora/ })).toHaveAttribute("href", "/custo-da-hora");
    expect(screen.queryByText(/R\$/)).toBeNull();
  });

  it("prices both overtime tiers once the hourly value is known", () => {
    renderSummary({ firstTierMinutes: 60, extraTierMinutes: 30, nightMinutes: 45, hourlyRate: 20 });

    expect(screen.getByText("Extra 50%")).toBeInTheDocument();
    expect(screen.getByText(/30,00/)).toBeInTheDocument();
    expect(screen.getByText("Extra 100%")).toBeInTheDocument();
    expect(screen.getByText(/20,00/)).toBeInTheDocument();
    expect(screen.getByText("Adicional noturno")).toBeInTheDocument();
    expect(screen.getByText("0h 45m")).toBeInTheDocument();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renders the compliance warnings it is given", () => {
    renderSummary({
      warnings: [
        { id: "daily-overtime-limit", title: "Você passou de 2h extras hoje", detail: "O art. 59 da CLT limita." },
        { id: "minimum-lunch-break", title: "Seu intervalo ficou abaixo de 1 hora", detail: "O art. 71 da CLT exige." },
      ],
    });

    expect(screen.getByText("Você passou de 2h extras hoje")).toBeInTheDocument();
    expect(screen.getByText("O art. 59 da CLT limita.")).toBeInTheDocument();
    expect(screen.getByText("Seu intervalo ficou abaixo de 1 hora")).toBeInTheDocument();
  });
});
