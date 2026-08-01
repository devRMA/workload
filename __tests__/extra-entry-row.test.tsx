import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { ExtraEntryRow } from "@/components/molecules/extra-entry-row";

function RowHarness({ onRemove }: { onRemove?: () => void }) {
	const [name, setName] = useState("");
	const [value, setValue] = useState(0);

	return (
		<ExtraEntryRow
			name={name}
			value={value}
			nameLabel="Descrição do desconto"
			namePlaceholder="Nome (ex: Plano de Saúde)"
			valueLabel="Valor do desconto"
			removeLabel="Remover desconto"
			onNameChange={setName}
			onValueChange={setValue}
			onRemove={() => onRemove?.()}
		/>
	);
}

describe("ExtraEntryRow", () => {
	it("labels every control for assistive technology", () => {
		render(<RowHarness />);

		expect(screen.getByLabelText("Descrição do desconto")).toBeInTheDocument();
		expect(screen.getByLabelText("Valor do desconto")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Remover desconto" }),
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Nome (ex: Plano de Saúde)"),
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Valor")).toBeInTheDocument();
	});

	it("keeps the typed description", async () => {
		const user = userEvent.setup();
		render(<RowHarness />);

		await user.type(
			screen.getByLabelText("Descrição do desconto"),
			"Plano Odonto",
		);

		expect(screen.getByLabelText("Descrição do desconto")).toHaveValue(
			"Plano Odonto",
		);
	});

	it("formats the typed amount as currency", async () => {
		const user = userEvent.setup();
		render(<RowHarness />);

		await user.type(screen.getByLabelText("Valor do desconto"), "5000");

		expect(screen.getByLabelText("Valor do desconto")).toHaveValue("50,00");
	});

	it("asks to be removed when the remove button is pressed", async () => {
		const onRemove = vi.fn();
		const user = userEvent.setup();
		render(<RowHarness onRemove={onRemove} />);

		await user.click(screen.getByRole("button", { name: "Remover desconto" }));

		expect(onRemove).toHaveBeenCalledOnce();
	});
});
