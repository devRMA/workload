"use client";

import { IconClock, IconCurrencyDollar } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { buttonClasses } from "@/components/atoms/button";
import { SalaryCalculator } from "@/components/organisms/salary-calculator";
import { WorkCalculator } from "@/components/organisms/work-calculator";
import { safeGAEvent } from "@/lib/analytics";
import { type CalculatorView, VIEW_PATHS } from "@/lib/calculator-view";
import { CURRENT_LEGAL_YEAR } from "@/lib/legal-tables";
import { formatIsoDate } from "@/lib/utils";

const VIEW_TABS: readonly { view: CalculatorView; label: string; icon: typeof IconClock }[] = [
  { view: "work", label: "Jornada", icon: IconClock },
  { view: "salary", label: "Custo da Hora", icon: IconCurrencyDollar },
];

const PANEL_TRANSITION = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { type: "spring", bounce: 0, duration: 0.32 },
} as const;

export function CalculatorViews({ activeView }: { activeView: CalculatorView }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const renderedView = useRef(activeView);

  useEffect(() => {
    if (renderedView.current === activeView) return;
    renderedView.current = activeView;
    mainRef.current?.focus();
  }, [activeView]);

  return (
    <>
      <nav
        aria-label="Calculadoras"
        className="fixed bottom-[max(var(--spacing-md),env(safe-area-inset-bottom))] sm:bottom-xl left-1/2 -translate-x-1/2 z-50"
      >
        <ul className="bg-chrome backdrop-blur-chrome backdrop-saturate-(--saturate-chrome) border border-line p-1.5 rounded-lg shadow-raised flex items-center gap-1">
          {VIEW_TABS.map(({ view, label, icon: Icon }) => (
            <li key={view}>
              <Link
                href={VIEW_PATHS[view]}
                scroll={false}
                aria-current={activeView === view ? "page" : undefined}
                onClick={() => safeGAEvent("switch_tab", { tab: view })}
                className={buttonClasses(activeView === view ? "default" : "ghost", "default", "gap-xs")}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
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
        className="pt-[calc(var(--header-height)+var(--spacing-xl))] pb-3xl px-md sm:px-lg lg:px-xl outline-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={activeView} {...PANEL_TRANSITION}>
            {activeView === "work" ? <WorkCalculator /> : <SalaryCalculator />}
          </motion.div>
        </AnimatePresence>

        <footer className="mx-auto mt-2xl max-w-3xl space-y-xs text-center text-caption text-ink-subtle text-pretty">
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
            (Súmula 60 do TST), feriados, o valor do intervalo suprimido e o adicional de insalubridade ou
            periculosidade. O regime Estatutário usa a tabela do RPPS federal e não vale para servidor estadual ou
            municipal.
          </p>
          <p>
            Tabelas de INSS e IRRF de {CURRENT_LEGAL_YEAR.year}, em vigor desde{" "}
            {formatIsoDate(CURRENT_LEGAL_YEAR.effectiveFrom)} ·{" "}
            <a
              href={CURRENT_LEGAL_YEAR.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-accent-ink"
            >
              {CURRENT_LEGAL_YEAR.source}
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
