import { expect, test } from "@playwright/test";

test.describe("Salary Calculator (Custo da Hora)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await page.click('button:has-text("Custo da Hora")');
	});

	test("should display default salary elements", async ({ page }) => {
		await expect(page.locator('label:has-text("Salário Bruto")')).toBeVisible();
		await expect(
			page.locator('label:has-text("Carga Horária Mensal")'),
		).toBeVisible();
	});

	test("should calculate hourly rate based on input", async ({ page }) => {
		const grossInput = page.getByPlaceholder("0,00").first();
		await grossInput.fill("10000");

		await expect(page.getByText("Custo da Hora").first()).toBeVisible();
		await expect(page.getByText("Resumo Financeiro").first()).toBeVisible();
	});

	test("should add and remove extra deductions", async ({ page }) => {
		await page.click('button:has-text("Impostos e Descontos")');

		const addDeductionBtn = page
			.locator('button:has-text("Adicionar")')
			.first();
		await addDeductionBtn.click();

		const deductionInput = page
			.getByPlaceholder("Nome (ex: Plano de Saúde)")
			.first();
		await deductionInput.fill("Plano Odonto");

		const valueInput = page.getByPlaceholder("Valor").first();
		await valueInput.fill("50");

		const removeBtn = page.locator("button:has(.lucide-trash2)").first();
		await removeBtn.click();

		await expect(
			page.getByPlaceholder("Nome (ex: Plano de Saúde)"),
		).toHaveCount(0);
	});
});
