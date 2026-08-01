import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RootLayout, { metadata, viewport } from "@/app/layout";

describe("RootLayout", () => {
	it("renders its children", () => {
		render(
			<RootLayout>
				<div>layout child</div>
			</RootLayout>,
		);
		expect(screen.getByText("layout child")).toBeInTheDocument();
	});
});

describe("metadata", () => {
	it("exposes the expected title, description and social metadata", () => {
		expect(metadata.title).toEqual({
			default: "WorkLoad | Calculadora Inteligente de Horas e Salário",
			template: "%s | WorkLoad",
		});
		expect(metadata.description).toBe(
			"Calcule sua jornada de trabalho, horas extras, adicional noturno e salário CLT de forma simples, rápida e precisa.",
		);
		expect(metadata.alternates).toEqual({ canonical: "/" });
		expect(metadata.openGraph?.url).toBe("https://workload.devrma.com");
		expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
	});
});

describe("viewport", () => {
	it("does not disable pinch-to-zoom", () => {
		expect(viewport).not.toHaveProperty("maximumScale");
		expect(viewport).not.toHaveProperty("userScalable");
	});

	it("exposes the expected width, initial scale and theme colors", () => {
		expect(viewport.width).toBe("device-width");
		expect(viewport.initialScale).toBe(1);
		expect(viewport.themeColor).toEqual([
			{ media: "(prefers-color-scheme: light)", color: "#fafafa" },
			{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
		]);
	});
});
