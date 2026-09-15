import { type CalculatorView, VIEW_HEADINGS, VIEW_PATHS } from "@/lib/calculator-view";

export const SITE_URL = "https://workload.devrma.com";

const VIEW_DESCRIPTIONS: Record<CalculatorView, string> = {
  work: "Calcule a que horas você pode sair, quanto já trabalhou hoje e quanto tem de hora extra, com adicional noturno e os limites da CLT.",
  salary:
    "Calcule quanto vale a sua hora de trabalho a partir do salário bruto, com INSS, IRRF, dependentes, descontos e ganhos extras.",
};

function breadcrumbItems(view: CalculatorView) {
  const home = { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` };
  if (view === "work") return [home];

  return [home, { "@type": "ListItem", position: 2, name: "Custo da Hora", item: `${SITE_URL}${VIEW_PATHS[view]}` }];
}

export function buildStructuredData(view: CalculatorView): string {
  const url = `${SITE_URL}${VIEW_PATHS[view]}`;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name: `WorkLoad — ${VIEW_HEADINGS[view]}`,
        url,
        description: VIEW_DESCRIPTIONS[view],
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
        author: { "@type": "Person", name: "Rafael Augusto" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: breadcrumbItems(view),
      },
    ],
  });
}
