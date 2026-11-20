import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it } from "vitest";
import { DaySummary } from "@/components/organisms/day-summary";
import { calculateWorkStats } from "@/hooks/use-work-calculator";
import { buildDayBreakdown, type DayBreakdown } from "@/lib/day-breakdown";

type DaySummaryProps = ComponentProps<typeof DaySummary>;

const MONDAY = "2025-01-06";
const NIGHT_OVERTIME_NOTE = "A hora extra feita à noite é calculada sobre a hora já com o adicional noturno.";

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
  nightMinutes: 0,
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
  firstTierNightMinutes: 0,
  extraTierNightMinutes: 0,
  nightMinutes: 0,
  firstTierRate: 50,
  extraTierRate: 100,
  grossHourlyRate: null,
  warnings: [],
};

function renderSummary(overrides: Partial<DaySummaryProps> = {}) {
  return render(<DaySummary {...BASE_PROPS} {...overrides} />);
}

function pricedJourney(times: DaySummaryProps["times"]) {
  const stats = calculateWorkStats(times.entry, times.lunchStart, times.lunchEnd, times.exit, 480);
  return {
    ...stats,
    times,
    balanceMinutes: stats.balance,
    breakdown: buildDayBreakdown({ ...times, expectedMinutes: 480, isManualExit: true, now: null }),
    grossHourlyRate: 20,
  };
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

  it("shows the balance with its sign", () => {
    renderSummary({ balanceMinutes: 30 });
    expect(screen.getByText("+0h 30m")).toBeInTheDocument();

    renderSummary({ balanceMinutes: -30 });
    expect(screen.getByText("-0h 30m")).toBeInTheDocument();
  });

  it("invites the reader to calculate the hourly value when it is unknown", () => {
    renderSummary({ firstTierMinutes: 60, extraTierMinutes: 30, firstTierNightMinutes: 60, nightMinutes: 60 });

    expect(screen.getByRole("link", { name: /Calcule o valor da sua hora/ })).toHaveAttribute("href", "/custo-da-hora");
    expect(screen.queryByText(/R\$/)).toBeNull();
    expect(screen.queryByText(NIGHT_OVERTIME_NOTE)).toBeNull();
  });

  it("prices both overtime tiers once the gross hourly value is known", () => {
    renderSummary({ firstTierMinutes: 60, extraTierMinutes: 30, nightMinutes: 45, grossHourlyRate: 20 });

    expect(screen.getByText("Extra 50%")).toBeInTheDocument();
    expect(screen.getByText(/30,00/)).toBeInTheDocument();
    expect(screen.getByText("Extra 100%")).toBeInTheDocument();
    expect(screen.getByText(/20,00/)).toBeInTheDocument();
    expect(screen.getByText("0h 45m")).toBeInTheDocument();
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByText(NIGHT_OVERTIME_NOTE)).toBeNull();
  });

  it("pays the night premium of twenty percent as money, not as a duration", () => {
    renderSummary({ nightMinutes: 480, grossHourlyRate: 13.6364 });

    expect(screen.getByText("Adicional noturno 20%")).toBeInTheDocument();
    expect(screen.getByText("8h 0m")).toBeInTheDocument();
    expect(screen.getByText(/21,82/)).toBeInTheDocument();
    expect(screen.queryByText(NIGHT_OVERTIME_NOTE)).toBeNull();
  });

  it("raises the overtime line and DSR only when the night credits overlap overtime", () => {
    const daytimeExtra = pricedJourney({
      entry: `${MONDAY}T22:00`,
      lunchStart: `${MONDAY}T23:45`,
      lunchEnd: "2025-01-07T05:00",
      exit: "2025-01-07T13:00",
    });
    const nightExtra = pricedJourney({
      entry: `${MONDAY}T13:00`,
      lunchStart: `${MONDAY}T21:00`,
      lunchEnd: `${MONDAY}T22:00`,
      exit: `${MONDAY}T23:45`,
    });
    expect(daytimeExtra).toMatchObject({
      totalWorked: 600,
      nightMinutes: 120,
      firstTierMinutes: 120,
      extraTierMinutes: 0,
      firstTierNightMinutes: 0,
      extraTierNightMinutes: 0,
    });
    expect(nightExtra).toMatchObject({
      totalWorked: 600,
      nightMinutes: 120,
      firstTierMinutes: 120,
      extraTierMinutes: 0,
      firstTierNightMinutes: 120,
      extraTierNightMinutes: 0,
    });
    const { rerender } = renderSummary(daytimeExtra);

    expect(screen.getByText("Extra 50%").parentElement).toHaveTextContent(/2h 0mR\$\s60,00$/);
    expect(screen.getByText("Adicional noturno 20%").parentElement).toHaveTextContent(/2h 0mR\$\s8,00$/);
    expect(screen.getByText("DSR sobre os extras").parentElement).toHaveTextContent(/R\$\s10,07$/);
    expect(screen.queryByText(NIGHT_OVERTIME_NOTE)).toBeNull();

    rerender(<DaySummary {...BASE_PROPS} {...nightExtra} />);

    expect(screen.getByText("Extra 50%").parentElement).toHaveTextContent(/2h 0mR\$\s64,00$/);
    expect(screen.getByText("Adicional noturno 20%").parentElement).toHaveTextContent(/2h 0mR\$\s8,00$/);
    expect(screen.getByText("DSR sobre os extras").parentElement).toHaveTextContent(/R\$\s10,67$/);
    expect(screen.getAllByText(NIGHT_OVERTIME_NOTE)).toHaveLength(1);
  });

  it("prices each derived tier below, at and above the 120-minute limit", () => {
    const expectedCases = 3;
    const cases = [
      ["23:44", 119, 0, "63,47", "0,00"],
      ["23:45", 120, 0, "64,00", "0,00"],
      ["23:46", 120, 1, "64,00", "0,73"],
    ] as const;
    expect(cases).toHaveLength(expectedCases);
    let measured = 0;
    const exempt = 0;
    for (const [exit, first, extra, firstPay, extraPay] of cases) {
      const day = pricedJourney({
        entry: `${MONDAY}T13:00`,
        lunchStart: `${MONDAY}T21:00`,
        lunchEnd: `${MONDAY}T22:00`,
        exit: `${MONDAY}T${exit}`,
      });
      expect(day).toMatchObject({
        firstTierMinutes: first,
        extraTierMinutes: extra,
        firstTierNightMinutes: first,
        extraTierNightMinutes: extra,
      });
      const { unmount } = renderSummary(day);
      expect(screen.getByText("Extra 50%").parentElement?.textContent).toMatch(new RegExp(`R\\$\\s${firstPay}$`));
      expect(screen.getByText("Extra 100%").parentElement?.textContent).toMatch(new RegExp(`R\\$\\s${extraPay}$`));
      unmount();
      measured += 1;
    }
    expect(measured + exempt).toBe(expectedCases);
  });

  it("applies each tier's rate to its own night overtime minutes", () => {
    renderSummary({
      firstTierMinutes: 120,
      extraTierMinutes: 30,
      firstTierNightMinutes: 120,
      extraTierNightMinutes: 30,
      nightMinutes: 150,
      grossHourlyRate: 20,
    });

    expect(screen.getByText("Extra 50%").parentElement).toHaveTextContent(/R\$\s64,00$/);
    expect(screen.getByText("Extra 100%").parentElement).toHaveTextContent(/R\$\s22,00$/);
    expect(screen.getByText("Adicional noturno 20%").parentElement).toHaveTextContent(/R\$\s10,00$/);
    expect(screen.getByText("DSR sobre os extras").parentElement).toHaveTextContent(/R\$\s14,22$/);
    expect(screen.getAllByText(NIGHT_OVERTIME_NOTE)).toHaveLength(1);
  });

  it("rounds the overtime line and DSR only after composing their full values", () => {
    renderSummary({ firstTierMinutes: 1, firstTierNightMinutes: 1, nightMinutes: 1, grossHourlyRate: 21.41 });

    expect(screen.getByText("Extra 50%").parentElement).toHaveTextContent(/R\$\s0,57$/);
    expect(screen.getByText("Adicional noturno 20%").parentElement).toHaveTextContent(/R\$\s0,07$/);
    expect(screen.getByText("DSR sobre os extras").parentElement).toHaveTextContent(/R\$\s0,10$/);
  });

  it("adds the DSR over the habitual overtime and says what it assumes", () => {
    renderSummary({ firstTierMinutes: 120, grossHourlyRate: 13.6364 });

    expect(screen.getByText("DSR sobre os extras")).toBeInTheDocument();
    expect(screen.getByText(/Súmula 172 do TST/)).toBeInTheDocument();
    expect(screen.getByText(/Feriados não entram/)).toBeInTheDocument();
  });

  it("keeps the DSR assumption and its holiday gap in the same caption", () => {
    renderSummary({ firstTierMinutes: 120, grossHourlyRate: 13.6364 });

    const caption = screen.getByText(/Súmula 172 do TST/);
    expect(caption).toHaveTextContent("Súmula 172 do TST");
    expect(caption).toHaveTextContent("Feriados não entram");
  });

  it("leaves the DSR out of a day without any variable pay", () => {
    renderSummary({ grossHourlyRate: 20 });

    expect(screen.queryByText("DSR sobre os extras")).toBeNull();
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
