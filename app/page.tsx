import type { Metadata } from "next";
import { CalculatorViews } from "@/components/organisms/calculator-views";
import { CalculatorPage } from "@/components/templates/calculator-page";

export const metadata: Metadata = {
  title: { absolute: "Calculadora de Jornada, Horas Extras e Saldo do Dia | WorkLoad" },
  description:
    "Veja a que horas você pode sair, quanto já trabalhou hoje e quanto tem de hora extra, com adicional noturno e os limites da CLT.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Calculadora de Jornada, Horas Extras e Saldo do Dia",
    description: "Veja a que horas você pode sair, quanto já trabalhou hoje e quanto tem de hora extra.",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia",
        type: "image/png",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "/twitter-image",
        width: 1200,
        height: 630,
        alt: "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia",
      },
    ],
  },
};

export default function Home() {
  return (
    <CalculatorPage view="work">
      <CalculatorViews activeView="work" />
    </CalculatorPage>
  );
}
