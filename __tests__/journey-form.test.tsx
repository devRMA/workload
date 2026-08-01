import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { JourneyForm } from "@/components/organisms/journey-form";

const DEFAULT_WORK_MINUTES = 8 * 60 + 48;

function JourneyHarness({
	onReset = vi.fn(),
	onManualExitChange,
}: {
	onReset?: () => void;
	onManualExitChange?: (manual: boolean) => void;
}) {
	const [workMinutes, setWorkMinutes] = useState(DEFAULT_WORK_MINUTES);
	const [firstTierRate, setFirstTierRate] = useState(50);
	const [extraTierRate, setExtraTierRate] = useState(100);
	const [entry, setEntry] = useState("2026-02-02T08:00");
	const [lunchStart, setLunchStart] = useState("2026-02-02T12:00");
	const [lunchEnd, setLunchEnd] = useState("2026-02-02T13:00");
	const [exitValue, setExitValue] = useState("2026-02-02T17:48");
	const [isManualExit, setIsManualExit] = useState(false);

	return (
		<JourneyForm
			workMinutes={workMinutes}
			onWorkMinutesChange={setWorkMinutes}
			firstTierRate={firstTierRate}
			onFirstTierRateChange={setFirstTierRate}
			extraTierRate={extraTierRate}
			onExtraTierRateChange={setExtraTierRate}
			entry={entry}
			onEntryChange={setEntry}
			lunchStart={lunchStart}
			onLunchStartChange={setLunchStart}
			lunchEnd={lunchEnd}
			onLunchEndChange={setLunchEnd}
			exitValue={exitValue}
			onExitChange={setExitValue}
			isManualExit={isManualExit}
			onManualExitChange={(manual) => {
				setIsManualExit(manual);
				onManualExitChange?.(manual);
			}}
			onReset={onReset}
		/>
	);
}

describe("JourneyForm", () => {
	it("renders every journey moment as a labelled field", () => {
		render(<JourneyHarness />);

		expect(
			screen.getByRole("heading", { name: "Sua Jornada" }),
		).toBeInTheDocument();
		expect(screen.getByLabelText("Entrada")).toBeInTheDocument();
		expect(screen.getByLabelText("Saída Almoço")).toBeInTheDocument();
		expect(screen.getByLabelText("Volta Almoço")).toBeInTheDocument();
		expect(screen.getByLabelText("Saída Real")).toBeInTheDocument();
	});

	it("keeps the settings panel collapsed until requested", async () => {
		const user = userEvent.setup();
		render(<JourneyHarness />);

		const settingsToggle = screen.getByRole("button", {
			name: "Configurações da Jornada",
		});
		expect(settingsToggle).toHaveAttribute("aria-expanded", "false");
		expect(screen.queryByLabelText("Tempo de Trabalho Diário")).toBeNull();

		await user.click(settingsToggle);

		expect(settingsToggle).toHaveAttribute("aria-expanded", "true");
		expect(
			screen.getByLabelText("Tempo de Trabalho Diário"),
		).toBeInTheDocument();
	});

	it("shows the daily journey as a masked duration and accepts a new one", async () => {
		const user = userEvent.setup();
		render(<JourneyHarness />);

		await user.click(
			screen.getByRole("button", { name: "Configurações da Jornada" }),
		);
		const journeyField = screen.getByLabelText("Tempo de Trabalho Diário");
		expect(journeyField).toHaveValue("08:48");

		await user.clear(journeyField);
		await user.type(journeyField, "0800");
		await user.tab();

		expect(journeyField).toHaveValue("08:00");
	});

	it("restores the daily journey when an incomplete duration is left behind", async () => {
		const user = userEvent.setup();
		render(<JourneyHarness />);

		await user.click(
			screen.getByRole("button", { name: "Configurações da Jornada" }),
		);
		const journeyField = screen.getByLabelText("Tempo de Trabalho Diário");
		await user.clear(journeyField);
		await user.type(journeyField, "9");
		await user.tab();

		expect(journeyField).toHaveValue("08:48");
	});

	it("lets both overtime rates be adjusted", async () => {
		const user = userEvent.setup();
		render(<JourneyHarness />);

		await user.click(
			screen.getByRole("button", { name: "Configurações da Jornada" }),
		);

		const firstTierField = screen.getByLabelText("Adicional até 2h extras (%)");
		await user.clear(firstTierField);
		await user.type(firstTierField, "75");
		expect(firstTierField).toHaveValue(75);

		const extraTierField = screen.getByLabelText("Adicional acima de 2h (%)");
		await user.clear(extraTierField);
		await user.type(extraTierField, "120");
		expect(extraTierField).toHaveValue(120);
	});

	it("switches between automatic and manual exit", async () => {
		const onManualExitChange = vi.fn();
		const user = userEvent.setup();
		render(<JourneyHarness onManualExitChange={onManualExitChange} />);

		const autoButton = screen.getByRole("button", { name: "AUTO" });
		const manualButton = screen.getByRole("button", { name: "MANUAL" });
		expect(autoButton).toHaveAttribute("aria-pressed", "true");
		expect(manualButton).toHaveAttribute("aria-pressed", "false");

		await user.click(manualButton);

		expect(onManualExitChange).toHaveBeenCalledWith(true);
		expect(manualButton).toHaveAttribute("aria-pressed", "true");

		await user.click(autoButton);

		expect(onManualExitChange).toHaveBeenLastCalledWith(false);
	});

	it("asks for a reset when the reset action is used", async () => {
		const onReset = vi.fn();
		const user = userEvent.setup();
		render(<JourneyHarness onReset={onReset} />);

		await user.click(screen.getByRole("button", { name: "Resetar Horários" }));

		expect(onReset).toHaveBeenCalledOnce();
	});
});
