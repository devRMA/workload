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
        className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:m-md focus:rounded-md focus:bg-surface-raised focus:p-md focus:text-ink focus:shadow-raised"
      >
        Pular para o conteúdo principal
      </a>
      <main className="min-h-screen bg-canvas text-ink">
        <AppHeader />

        {children}
      </main>
    </>
  );
}
