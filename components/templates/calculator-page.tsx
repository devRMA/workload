import type { ReactNode } from "react";
import { AppHeader } from "@/components/organisms/app-header";
import { type CalculatorView, VIEW_HEADINGS } from "@/lib/calculator-view";
import { buildStructuredData } from "@/lib/structured-data";

export function CalculatorPage({ view, children }: { view: CalculatorView; children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: safe only while every field above is a static literal — escape the payload before injecting anything user, API or CMS supplied
        dangerouslySetInnerHTML={{ __html: buildStructuredData(view) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:m-4 focus:rounded-md focus:bg-surface-raised focus:p-4 focus:text-ink focus:shadow-raised"
      >
        Pular para o conteúdo principal
      </a>
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <filter id="dock-refraction" x="-10%" y="-30%" width="120%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.016 0.044" numOctaves="1" seed="7" result="lens" />
            <feDisplacementMap in="SourceGraphic" in2="lens" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <main className="relative min-h-dvh bg-canvas text-ink">
        <div aria-hidden="true" className="glass-field" />
        <AppHeader heading={VIEW_HEADINGS[view]} />

        {children}
      </main>
    </>
  );
}
