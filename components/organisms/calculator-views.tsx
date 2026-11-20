"use client";

import { IconClock, IconCurrencyDollar } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { buttonClasses } from "@/components/atoms/button";
import { SalaryCalculator } from "@/components/organisms/salary-calculator";
import { WorkCalculator } from "@/components/organisms/work-calculator";
import { safeGAEvent } from "@/lib/analytics";
import { type CalculatorView, VIEW_PATHS } from "@/lib/calculator-view";
import { CURRENT_LEGAL_YEAR, NIGHT_OVERTIME_SOURCE } from "@/lib/legal-tables";
import { cn, formatIsoDate } from "@/lib/utils";

const VIEW_TABS: readonly { view: CalculatorView; label: string; icon: typeof IconClock }[] = [
  { view: "work", label: "Jornada", icon: IconClock },
  { view: "salary", label: "Custo da Hora", icon: IconCurrencyDollar },
];

const SOURCE_LINK_CLASSES =
  "underline underline-offset-2 transition-colors duration-(--duration-fast) ease-standard hover:text-accent-ink";

export function CalculatorViews({ activeView }: { activeView: CalculatorView }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const renderedView = useRef(activeView);
  const sources = CURRENT_LEGAL_YEAR.sources;

  useEffect(() => {
    if (renderedView.current === activeView) return;
    renderedView.current = activeView;
    mainRef.current?.focus();
  }, [activeView]);

  return (
    <>
      <nav
        aria-label="Calculadoras"
        className="fixed bottom-[max(calc(var(--spacing)*4),env(safe-area-inset-bottom))] sm:bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <ul className="glass-chrome glass-dock relative border border-line p-1.5 rounded-full flex items-center gap-1">
          {VIEW_TABS.map(({ view, label, icon: Icon }) => (
            <li key={view}>
              <Link
                href={VIEW_PATHS[view]}
                aria-current={activeView === view ? "page" : undefined}
                onClick={() => safeGAEvent("switch_tab", { tab: view })}
                className={buttonClasses(
                  activeView === view ? "default" : "ghost",
                  "default",
                  cn(
                    "min-w-24 flex-col gap-0.5 px-4 sm:flex-row sm:gap-2 sm:px-6 rounded-full ease-out font-semibold transition-[background-color,color,scale]",
                    activeView !== view && "text-ink",
                  ),
                )}
              >
                <Icon className="size-5 sm:size-4" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="relative pt-[calc(var(--header-height)+var(--spacing)*8)] pb-[calc(6rem+env(safe-area-inset-bottom))] px-4 sm:px-6 lg:px-8 outline-none"
      >
        {activeView === "work" ? <WorkCalculator /> : <SalaryCalculator />}

        <footer className="mx-auto mt-12 max-w-3xl space-y-2 text-center text-caption text-ink-subtle text-pretty">
          <p>
            Tudo o que você digita fica salvo apenas neste navegador. Nada é enviado para nenhum servidor, e ninguém
            além de você vê seus horários ou seu salário.
          </p>
          <p>
            Os valores são uma estimativa para você se organizar. Não substituem seu holerite, não valem como registro
            oficial de ponto e nada aqui é orientação jurídica ou contábil.
          </p>
          <p>
            Não entram na conta: FGTS, benefícios e adicionais da sua convenção coletiva, o 13º salário e o terço de
            férias, a incidência de INSS e IRRF sobre as horas extras, a prorrogação da jornada noturna depois das 5h
            (Súmula 60, II, do TST), feriados, o valor do intervalo suprimido e o adicional de insalubridade ou
            periculosidade. O regime Estatutário usa a tabela do RPPS federal e não vale para servidor estadual ou
            municipal.
          </p>
          <p>
            Tabelas usadas nos cálculos: INSS pela{" "}
            <a href={sources.rgpsBrackets[0].url} target="_blank" rel="noreferrer" className={SOURCE_LINK_CLASSES}>
              {sources.rgpsBrackets[0].norm}
            </a>
            , em vigor desde {formatIsoDate(sources.rgpsBrackets[0].effectiveFrom)}. IRRF pela{" "}
            <a href={sources.incomeTaxBrackets[0].url} target="_blank" rel="noreferrer" className={SOURCE_LINK_CLASSES}>
              {sources.incomeTaxBrackets[0].norm}
            </a>
            , em vigor desde {formatIsoDate(sources.incomeTaxBrackets[0].effectiveFrom)}. RPPS federal: as alíquotas vêm
            da{" "}
            <a
              href={sources.rppsFederalBrackets[0].url}
              target="_blank"
              rel="noreferrer"
              className={SOURCE_LINK_CLASSES}
            >
              {sources.rppsFederalBrackets[0].norm}
            </a>
            , e as faixas de {CURRENT_LEGAL_YEAR.year}, do{" "}
            <a
              href={sources.rppsFederalBrackets[1].url}
              target="_blank"
              rel="noreferrer"
              className={SOURCE_LINK_CLASSES}
            >
              Anexo III da Portaria nº 13/2026
            </a>
            , em vigor desde {formatIsoDate(sources.rppsFederalBrackets[1].effectiveFrom)}.
          </p>
          {activeView === "work" ? (
            <p>
              Horas extras noturnas:{" "}
              <a href={NIGHT_OVERTIME_SOURCE.url} target="_blank" rel="noreferrer" className={SOURCE_LINK_CLASSES}>
                {NIGHT_OVERTIME_SOURCE.norm}
              </a>
              .
            </p>
          ) : null}
        </footer>
      </div>
    </>
  );
}
