"use client";

import { Clock, DollarSign } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { buttonClasses } from "@/components/atoms/button";
import { SalaryCalculator } from "@/components/organisms/salary-calculator";
import { WorkCalculator } from "@/components/organisms/work-calculator";
import { safeGAEvent } from "@/lib/analytics";
import { type CalculatorView, VIEW_PATHS } from "@/lib/calculator-view";

const VIEW_TABS: readonly { view: CalculatorView; label: string; icon: typeof Clock }[] = [
  { view: "work", label: "Jornada", icon: Clock },
  { view: "salary", label: "Custo da Hora", icon: DollarSign },
];

const PANEL_TRANSITION = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
  transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
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
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <ul className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-1.5 rounded-2xl shadow-2xl flex items-center gap-1">
          {VIEW_TABS.map(({ view, label, icon: Icon }) => (
            <li key={view}>
              <Link
                href={VIEW_PATHS[view]}
                scroll={false}
                aria-current={activeView === view ? "page" : undefined}
                onClick={() => safeGAEvent("switch_tab", { tab: view })}
                className={buttonClasses(activeView === view ? "default" : "ghost", "default", "gap-2")}
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
        className="pt-24 pb-28 sm:pt-32 sm:pb-32 px-4 sm:px-6 lg:px-8 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <AnimatePresence mode="wait">
          <motion.div key={activeView} {...PANEL_TRANSITION}>
            {activeView === "work" ? <WorkCalculator /> : <SalaryCalculator />}
          </motion.div>
        </AnimatePresence>

        <footer className="mx-auto mt-12 max-w-3xl space-y-2 text-center text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty">
          <p>
            Tudo o que você digita fica salvo apenas neste navegador. Nada é enviado para nenhum servidor, e ninguém
            além de você vê seus horários ou seu salário.
          </p>
          <p>
            Os valores são uma estimativa para você se organizar — não substituem seu holerite nem valem como registro
            oficial de ponto.
          </p>
        </footer>
      </div>
    </>
  );
}
