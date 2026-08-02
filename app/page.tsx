import type { Metadata } from "next";
import { CalculatorViews } from "@/components/organisms/calculator-views";
import { CalculatorPage } from "@/components/templates/calculator-page";

export const metadata: Metadata = {
  title: { absolute: "Calculadora de Jornada, Horas Extras e Banco de Horas | WorkLoad" },
  description:
    "Veja a que horas você pode sair, quanto já trabalhou hoje e quanto tem de hora extra, com adicional noturno e os limites da CLT.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Calculadora de Jornada, Horas Extras e Banco de Horas",
    description: "Veja a que horas você pode sair, quanto já trabalhou hoje e quanto tem de hora extra.",
    url: "/",
  },
};

export default function Home() {
  return (
    <CalculatorPage>
      <CalculatorViews activeView="work" />
    </CalculatorPage>
  );
}
