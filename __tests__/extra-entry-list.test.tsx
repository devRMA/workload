import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ExtraEntryList } from "@/components/molecules/extra-entry-list";

describe("ExtraEntryList", () => {
	it("renders its title, its entries and the add action", () => {
		render(
			<ExtraEntryList
				listId="extra-deductions-list"
				label="Outros Descontos"
				addLabel="Adicionar desconto"
				onAdd={vi.fn()}
			>
				<p>Plano de Saúde</p>
			</ExtraEntryList>,
		);

		expect(screen.getByText("Outros Descontos")).toBeInTheDocument();
		expect(screen.getByText("Plano de Saúde")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Adicionar desconto" }),
		).toHaveTextContent("Adicionar");
		expect(document.getElementById("extra-deductions-list")).toContainElement(
			screen.getByText("Plano de Saúde"),
		);
	});

	it("adds an entry when the add action is pressed", async () => {
		const onAdd = vi.fn();
		const user = userEvent.setup();
		render(
			<ExtraEntryList
				listId="extra-gains-list"
				label="Ganhos Extras (Líquido)"
				addLabel="Adicionar ganho"
				addButtonClassName="text-emerald-600"
				onAdd={onAdd}
			>
				{null}
			</ExtraEntryList>,
		);

		const addButton = screen.getByRole("button", { name: "Adicionar ganho" });
		expect(addButton).toHaveClass("text-emerald-600");

		await user.click(addButton);
		expect(onAdd).toHaveBeenCalledOnce();
	});
});
