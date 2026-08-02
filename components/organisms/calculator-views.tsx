"use client";

import { Clock, DollarSign } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buttonClasses } from "@/components/atoms/button";
import { SalaryCalculator } from "@/components/organisms/salary-calculator";
import { WorkCalculator } from "@/components/organisms/work-calculator";
import { safeGAEvent } from "@/lib/analytics";

export type CalculatorView = "work" | "salary";

const DEFAULT_VIEW: CalculatorView = "work";

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

export function toCalculatorView(rawView: string | null): CalculatorView {
  return rawView === "salary" ? "salary" : DEFAULT_VIEW;
}

export function CalculatorViews({ activeView }: { activeView: CalculatorView }) {
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
                href={`/?view=${view}`}
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
        id="main-content"
        tabIndex={-1}
        className="pt-24 pb-28 sm:pt-32 sm:pb-32 px-4 sm:px-6 lg:px-8 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <AnimatePresence mode="wait">
          <motion.div key={activeView} {...PANEL_TRANSITION}>
            {activeView === "work" ? <WorkCalculator /> : <SalaryCalculator />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export function CalculatorViewsFromUrl() {
  return <CalculatorViews activeView={toCalculatorView(useSearchParams().get("view"))} />;
}
