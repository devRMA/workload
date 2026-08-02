import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { calculateTimerData, WorkCalculator } from "@/components/organisms/work-calculator";
import { safeGAEvent } from "@/lib/analytics";

vi.mock("@/lib/analytics", () => ({
  safeGAEvent: vi.fn(),
}));

const DAY = "2025-01-06";
const ENTRY = `${DAY}T08:00`;
const LUNCH_START = `${DAY}T12:00`;
const LUNCH_END = `${DAY}T13:00`;
const SUGGESTED_EXIT = `${DAY}T17:48`;

function storeJourney() {
  localStorage.setItem("entry", ENTRY);
  localStorage.setItem("lunchStart", LUNCH_START);
  localStorage.setItem("lunchEnd", LUNCH_END);
}

function setClipboard(clipboard: unknown) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    writable: true,
    value: clipboard,
  });
}

describe("calculateTimerData", () => {
  const baseInput = {
    currentTime: new Date(`${DAY}T10:00:00`),
    displayExit: SUGGESTED_EXIT,
    isManualExit: false,
    balanceMinutes: 0,
  };

  it("counts down to the exit", () => {
    expect(calculateTimerData(baseInput)).toEqual({
      statusLabel: "faltam",
      statusTime: "07:48:00",
      isOvertime: false,
    });
  });

  it("counts up once the exit has passed", () => {
    expect(calculateTimerData({ ...baseInput, currentTime: new Date(`${DAY}T18:48:00`) })).toEqual({
      statusLabel: "hora extra",
      statusTime: "+01:00:00",
      isOvertime: true,
    });
  });

  it("waits for the client clock before counting", () => {
    expect(calculateTimerData({ ...baseInput, currentTime: null })).toEqual({
      statusLabel: "faltam",
      statusTime: "--:--:--",
      isOvertime: false,
    });
  });

  it("waits when the exit is not a real moment", () => {
    expect(calculateTimerData({ ...baseInput, displayExit: "" })).toEqual({
      statusLabel: "aguardando horários",
      statusTime: "--:--:--",
      isOvertime: false,
    });
  });

  it("shows the day balance in manual mode", () => {
    expect(calculateTimerData({ ...baseInput, isManualExit: true, balanceMinutes: 75 })).toEqual({
      statusLabel: "balanço do dia",
      statusTime: "+1h 15m",
      isOvertime: true,
    });
  });

  it("shows a negative day balance in manual mode", () => {
    expect(calculateTimerData({ ...baseInput, isManualExit: true, balanceMinutes: -30 })).toEqual({
      statusLabel: "balanço do dia",
      statusTime: "-0h 30m",
      isOvertime: false,
    });
  });

  it("treats an exactly balanced day as on target, not overtime", () => {
    expect(calculateTimerData({ ...baseInput, isManualExit: true, balanceMinutes: 0 })).toMatchObject({
      statusTime: "+0h 0m",
      isOvertime: false,
    });
  });
});

describe("WorkCalculator", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(`${DAY}T10:00:00`));
    storeJourney();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the journey form, the countdown and the day summary side by side", () => {
    render(<WorkCalculator />);

    expect(screen.getByRole("heading", { name: "Sua Jornada" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Seu Dia" })).toBeInTheDocument();
    expect(screen.getByText("faltam")).toBeInTheDocument();
    expect(screen.getByText("07:48:00")).toBeInTheDocument();
    expect(screen.getByText("Saída Prevista")).toBeInTheDocument();
    expect(screen.getByText("é quando sua jornada fecha")).toBeInTheDocument();
    expect(screen.getByText("Entrada às 08:00")).toBeInTheDocument();
  });

  it("counts the day only up to the current moment", () => {
    render(<WorkCalculator />);

    expect(screen.getByText("08:00 → agora")).toBeInTheDocument();
    expect(screen.getByText("Trabalhado até agora")).toBeInTheDocument();
    expect(screen.getAllByText("2h 0m")).toHaveLength(2);
    expect(screen.getByText("6h 48m")).toBeInTheDocument();
  });

  it("keeps counting overtime after the suggested exit has passed", () => {
    vi.setSystemTime(new Date(`${DAY}T19:00:00`));
    render(<WorkCalculator />);

    expect(screen.getByText("hora extra")).toBeInTheDocument();
    expect(screen.getByText("+01:12:00")).toBeInTheDocument();
    expect(screen.getByText("sua jornada já fechou")).toBeInTheDocument();
    expect(screen.getByText("+1h 12m")).toBeInTheDocument();
  });

  it("warns when the overtime passes the legal daily limit", () => {
    vi.setSystemTime(new Date(`${DAY}T20:30:00`));
    render(<WorkCalculator />);

    expect(screen.getByText("Você passou de 2h extras hoje")).toBeInTheDocument();
  });

  it("replaces the day summary with an explanation when the journey is out of order", async () => {
    const user = userEvent.setup();
    render(<WorkCalculator />);

    const lunchStartTimeField = screen.getByLabelText("Hora para Saída Almoço");
    await user.clear(lunchStartTimeField);
    await user.type(lunchStartTimeField, "0700");

    expect(screen.getByRole("alert")).toHaveTextContent("A saída para o almoço precisa vir depois da entrada.");
    expect(screen.queryByRole("heading", { name: "Seu Dia" })).toBeNull();
  });

  it("copies the exit time and tracks the event", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    setClipboard({ writeText });
    render(<WorkCalculator />);

    await user.click(screen.getByRole("button", { name: "Copiar horário de saída" }));

    expect(writeText).toHaveBeenCalledWith("17:48");
    expect(safeGAEvent).toHaveBeenCalledWith("copy_to_clipboard", { value: "17:48" });
    setClipboard(undefined);
  });

  it("switches to the day balance when manual mode is chosen", async () => {
    const user = userEvent.setup();
    render(<WorkCalculator />);

    await user.click(screen.getByRole("radio", { name: "MANUAL" }));

    expect(safeGAEvent).toHaveBeenCalledWith("toggle_manual_mode", { value: "manual" });
    expect(screen.getByText("balanço do dia")).toBeInTheDocument();
    expect(screen.getByText("foi o horário que você registrou")).toBeInTheDocument();
    expect(screen.getAllByText("Saída Real").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("radio", { name: "AUTO" }));

    expect(safeGAEvent).toHaveBeenCalledWith("toggle_manual_mode", { value: "auto" });
  });

  it("turns manual as soon as the exit is edited, and mourns the missing hours", async () => {
    const user = userEvent.setup();
    const { container } = render(<WorkCalculator />);

    const exitTimeField = screen.getByLabelText("Hora para Saída Sugerida");
    await user.clear(exitTimeField);
    await user.type(exitTimeField, "1600");

    expect(screen.getByRole("radio", { name: "MANUAL" })).toBeChecked();
    expect(screen.getAllByText("-1h 48m")).toHaveLength(2);
    expect(container.querySelector(".bg-rose-700")).toBeInTheDocument();
  });

  it("prices the overtime once the salary tab knows the hourly value", () => {
    localStorage.setItem("grossSalary", "5000");
    vi.setSystemTime(new Date(`${DAY}T19:00:00`));
    render(<WorkCalculator />);

    expect(screen.queryByRole("link", { name: /Calcule o valor da sua hora/ })).toBeNull();
    expect(screen.getByText(/36,81/)).toBeInTheDocument();
  });

  it("offers the salary tab while the hourly value is unknown", () => {
    render(<WorkCalculator />);

    expect(screen.getByRole("link", { name: /Calcule o valor da sua hora/ })).toBeInTheDocument();
  });

  it("restores the defaults and tracks the reset", async () => {
    const user = userEvent.setup();
    render(<WorkCalculator />);

    await user.click(screen.getByRole("button", { name: "Resetar Horários" }));
    await user.click(screen.getByRole("button", { name: "Resetar horários" }));

    expect(safeGAEvent).toHaveBeenCalledWith("reset_defaults");
  });
});
