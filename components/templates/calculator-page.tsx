import type { ReactNode } from "react";
import { AppHeader } from "@/components/organisms/app-header";

const STRUCTURED_DATA = JSON.stringify({
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
});

export function CalculatorPage({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: safe only while every field above is a static literal — escape the payload before injecting anything user, API or CMS supplied
        dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-black"
      >
        Pular para o conteúdo principal
      </a>
      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500">
        <AppHeader />

        {children}

        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
        </div>
      </main>
    </>
  );
}
