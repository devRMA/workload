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
    currentTime: new Date("2025-01-06T10:00:00"),
    displayExit: SUGGESTED_EXIT,
    entry: ENTRY,
    workMinutes: 528,
    isManualExit: false,
    balanceMinutes: 0,
    balanceSign: 0,
    totalWorkedMinutes: 528,
  };

  it("counts down to the exit", () => {
    const timer = calculateTimerData(baseInput);

    expect(timer).toMatchObject({
      label: "FALTAM",
      time: "07:48:00",
      isOvertime: false,
      entryLabel: "08:00",
      exitLabel: "17:48",
    });
    expect(timer.progress).toBeCloseTo((120 / 528) * 100);
  });

  it("counts up once the exit has passed", () => {
    const timer = calculateTimerData({
      ...baseInput,
      currentTime: new Date("2025-01-06T18:48:00"),
    });

    expect(timer).toMatchObject({
      label: "HORA EXTRA",
      time: "01:00:00",
      isOvertime: true,
    });
    expect(timer.progress).toBe(100);
  });

  it("waits for the client clock before counting", () => {
    const timer = calculateTimerData({ ...baseInput, currentTime: null });

    expect(timer).toMatchObject({
      label: "FALTAM",
      time: "--:--:--",
      progress: 0,
    });
  });

  it("shows the final balance in manual mode", () => {
    const timer = calculateTimerData({
      ...baseInput,
      isManualExit: true,
      balanceMinutes: 75,
      balanceSign: 1,
    });

    expect(timer).toMatchObject({
      label: "BALANÇO FINAL",
      time: "+01:15:00",
      isOvertime: true,
      progress: 100,
    });
  });

  it("shows a negative final balance in manual mode", () => {
    const timer = calculateTimerData({
      ...baseInput,
      isManualExit: true,
      balanceMinutes: -30,
      balanceSign: -1,
    });

    expect(timer).toMatchObject({
      label: "BALANÇO FINAL",
      time: "-00:30:00",
      isOvertime: false,
    });
  });

  it("treats an exactly balanced day as on target, not overtime", () => {
    const timer = calculateTimerData({
      ...baseInput,
      isManualExit: true,
      balanceMinutes: 0,
      balanceSign: 0,
    });

    expect(timer).toMatchObject({
      label: "BALANÇO FINAL",
      time: "+00:00:00",
      isOvertime: false,
    });
  });

  it("never lets the manual progress leave the 0-100 range", () => {
    const overworked = calculateTimerData({
      ...baseInput,
      isManualExit: true,
      totalWorkedMinutes: 900,
    });
    expect(overworked.progress).toBe(100);

    const withoutJourney = calculateTimerData({
      ...baseInput,
      isManualExit: true,
      workMinutes: 0,
    });
    expect(withoutJourney.progress).toBe(0);
  });

  it("never lets the countdown progress leave the 0-100 range", () => {
    const withoutJourney = calculateTimerData({ ...baseInput, workMinutes: 0 });
    expect(withoutJourney.progress).toBe(0);

    const beforeEntry = calculateTimerData({
      ...baseInput,
      currentTime: new Date("2025-01-06T06:00:00"),
    });
    expect(beforeEntry.progress).toBe(0);
  });

  it("waits when the exit is not a real moment", () => {
    const timer = calculateTimerData({ ...baseInput, displayExit: "" });

    expect(timer).toMatchObject({
      label: "Aguardando...",
      time: "00:00:00",
      progress: 0,
      exitLabel: "--:--",
    });
  });

  it("keeps the countdown without progress when the entry is unusable", () => {
    const timer = calculateTimerData({ ...baseInput, entry: "invalido" });

    expect(timer).toMatchObject({
      label: "FALTAM",
      progress: 0,
      entryLabel: "--:--",
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

  it("renders the journey form and the countdown side by side", () => {
    render(<WorkCalculator />);

    expect(screen.getByRole("heading", { name: "Sua Jornada" })).toBeInTheDocument();
    expect(screen.getByText("FALTAM")).toBeInTheDocument();
    expect(screen.getByText("Saída Sugerida")).toBeInTheDocument();
    expect(screen.getAllByText("17:48").length).toBeGreaterThan(0);
  });

  it("shows the day balance and the overtime tiers", () => {
    render(<WorkCalculator />);

    expect(screen.getByRole("heading", { name: "Balanço do Dia" })).toBeInTheDocument();
    expect(screen.getByText("+0h 0m")).toBeInTheDocument();
    expect(screen.getByText("Extra 50%")).toBeInTheDocument();
    expect(screen.getByText("Extra 100%")).toBeInTheDocument();
  });

  it("replaces the day balance with an explanation when the journey is out of order", async () => {
    const user = userEvent.setup();
    render(<WorkCalculator />);

    const lunchStartTimeField = screen.getByLabelText("Hora para Saída Almoço");
    await user.clear(lunchStartTimeField);
    await user.type(lunchStartTimeField, "0700");

    expect(screen.getByRole("alert")).toHaveTextContent("A saída para o almoço precisa vir depois da entrada.");
    expect(screen.queryByRole("heading", { name: "Balanço do Dia" })).toBeNull();
  });

  it("copies the exit time and tracks the event", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    setClipboard({ writeText });
    render(<WorkCalculator />);

    await user.click(screen.getByRole("button", { name: "Copiar horário" }));

    expect(writeText).toHaveBeenCalledWith("17:48");
    expect(safeGAEvent).toHaveBeenCalledWith("copy_to_clipboard", {
      value: "17:48",
    });
    setClipboard(undefined);
  });

  it("switches to the final balance when manual mode is chosen", async () => {
    const user = userEvent.setup();
    render(<WorkCalculator />);

    await user.click(screen.getByRole("radio", { name: "MANUAL" }));

    expect(safeGAEvent).toHaveBeenCalledWith("toggle_manual_mode", {
      value: "manual",
    });
    expect(screen.getByText("BALANÇO FINAL")).toBeInTheDocument();
    expect(screen.getAllByText("Saída Real").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("radio", { name: "AUTO" }));

    expect(safeGAEvent).toHaveBeenCalledWith("toggle_manual_mode", {
      value: "auto",
    });
  });

  it("turns manual as soon as the real exit is edited", async () => {
    const user = userEvent.setup();
    render(<WorkCalculator />);

    const exitTimeField = screen.getByLabelText("Hora para Saída Real");
    await user.clear(exitTimeField);
    await user.type(exitTimeField, "1900");

    expect(screen.getByRole("radio", { name: "MANUAL" })).toBeChecked();
  });

  it("restores the defaults and tracks the reset", async () => {
    const user = userEvent.setup();
    render(<WorkCalculator />);

    await user.click(screen.getByRole("button", { name: "Resetar Horários" }));
    await user.click(screen.getByRole("button", { name: "Resetar horários" }));

    expect(safeGAEvent).toHaveBeenCalledWith("reset_defaults");
  });
});
