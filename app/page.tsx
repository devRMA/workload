import type { Metadata } from "next";
import { AppHeader } from "@/components/organisms/app-header";
import { CalculatorViews } from "@/components/organisms/calculator-views";
import { type CalculatorView, toCalculatorView } from "@/lib/calculator-view";

interface HomeProps {
  searchParams: Promise<{ view?: string | string[] }>;
}

const VIEW_METADATA: Record<CalculatorView, { title: string; description: string; canonical: string }> = {
  work: {
    title: "Calculadora de Jornada, Horas Extras e Banco de Horas",
    description:
      "Veja a que horas você pode sair, quanto já trabalhou hoje e quanto tem de hora extra, com adicional noturno e os limites da CLT.",
    canonical: "/",
  },
  salary: {
    title: "Calculadora de Valor da Hora e Salário Líquido CLT",
    description:
      "Descubra quanto vale a sua hora de trabalho a partir do salário bruto, com INSS, IRRF, dependentes, descontos e ganhos extras.",
    canonical: "/?view=salary",
  },
};

async function readView(searchParams: HomeProps["searchParams"]): Promise<CalculatorView> {
  const { view } = await searchParams;
  return toCalculatorView(Array.isArray(view) ? (view[0] ?? null) : (view ?? null));
}

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const { title, description, canonical } = VIEW_METADATA[await readView(searchParams)];

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const activeView = await readView(searchParams);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: safe only while every field below is a static literal — escape the payload before injecting anything user, API or CMS supplied
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "WorkLoad",
            url: "https://workload.devrma.com",
            description: "Calculadora inteligente de jornada e valor de trabalho.",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            author: {
              "@type": "Person",
              name: "Rafael Augusto",
            },
          }),
        }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-black"
      >
        Pular para o conteúdo principal
      </a>
      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500">
        <AppHeader />

        <CalculatorViews activeView={activeView} />

        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
        </div>
      </main>
    </>
  );
}
