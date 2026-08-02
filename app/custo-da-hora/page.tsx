import type { Metadata } from "next";
import { CalculatorViews } from "@/components/organisms/calculator-views";
import { CalculatorPage } from "@/components/templates/calculator-page";

export const metadata: Metadata = {
  title: { absolute: "Calculadora de Valor da Hora e Salário Líquido CLT | WorkLoad" },
  description:
    "Descubra quanto vale a sua hora de trabalho a partir do salário bruto, com INSS, IRRF, dependentes, descontos e ganhos extras.",
  alternates: { canonical: "/custo-da-hora" },
  openGraph: {
    title: "Calculadora de Valor da Hora e Salário Líquido CLT",
    description: "Descubra quanto vale a sua hora de trabalho, já com INSS, IRRF e dependentes.",
    url: "/custo-da-hora",
  },
};

export default function CostPerHour() {
  return (
    <CalculatorPage>
      <CalculatorViews activeView="salary" />
    </CalculatorPage>
  );
}
