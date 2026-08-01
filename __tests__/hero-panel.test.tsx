import { render, screen } from "@testing-library/react";
import { Clock } from "lucide-react";
import { describe, expect, it } from "vitest";
import { HeroPanel } from "@/components/molecules/hero-panel";

describe("HeroPanel", () => {
	it("renders the label and the highlighted value", () => {
		render(
			<HeroPanel icon={Clock} label="FALTAM" value="01:23:45" tone="emerald" />,
		);

		expect(screen.getByText("FALTAM")).toBeInTheDocument();
		expect(screen.getByText("01:23:45")).toBeInTheDocument();
	});

	it("renders badge, children and footer when provided", () => {
		render(
			<HeroPanel
				icon={Clock}
				label="Valor da Hora"
				value="R$ 25,00"
				tone="blue"
				badge={<span>10:00:00</span>}
				footer={<p>Resumo Financeiro</p>}
			>
				<p>por minuto</p>
			</HeroPanel>,
		);

		expect(screen.getByText("10:00:00")).toBeInTheDocument();
		expect(screen.getByText("por minuto")).toBeInTheDocument();
		expect(screen.getByText("Resumo Financeiro")).toBeInTheDocument();
	});

	it("omits the footer separator when there is no footer", () => {
		render(
			<HeroPanel
				icon={Clock}
				label="HORA EXTRA"
				value="00:10:00"
				tone="rose"
			/>,
		);

		expect(document.querySelector(".border-t")).toBeNull();
	});
});
