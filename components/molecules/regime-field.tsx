"use client";

import { Briefcase, Check, ChevronDown, Info } from "lucide-react";
import { useState } from "react";
import { labelClasses } from "@/components/atoms/label";
import { WORK_REGIME_INFO, type WorkRegime } from "@/lib/payroll";
import { cn } from "@/lib/utils";
import { CollapsiblePanel } from "./collapsible-panel";

const GUIDE_PANEL_ID = "regime-guide";

interface RegimeFieldProps {
  value: WorkRegime;
  onChange: (regime: WorkRegime) => void;
  className?: string;
}

export function RegimeField({ value, onChange, className }: RegimeFieldProps) {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <fieldset className={cn("space-y-3", className)}>
      <legend className={labelClasses}>
        <Briefcase className="w-4 h-4" aria-hidden="true" />
        Regime de Trabalho
      </legend>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {WORK_REGIME_INFO.map(({ value: regime, label, summary }) => (
          <label
            key={regime}
            className="relative flex cursor-pointer flex-col gap-1 rounded-2xl border border-neutral-500 dark:border-neutral-600 bg-white/50 dark:bg-neutral-900/50 p-4 pr-9 transition-colors hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 has-checked:border-blue-500 has-checked:bg-blue-50 dark:has-checked:bg-blue-950/40 has-focus-visible:ring-2 has-focus-visible:ring-blue-500"
          >
            <input
              type="radio"
              name="work-regime"
              value={regime}
              checked={regime === value}
              onChange={() => onChange(regime)}
              className="peer sr-only"
            />
            <Check
              className="absolute right-3 top-4 w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 transition-opacity peer-checked:opacity-100"
              aria-hidden="true"
            />
            <span className="font-bold text-neutral-900 dark:text-neutral-100 text-pretty">{label}</span>
            <span className="text-xs leading-snug text-neutral-500 dark:text-neutral-400 text-pretty">{summary}</span>
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIsGuideOpen(!isGuideOpen)}
        aria-expanded={isGuideOpen}
        aria-controls={GUIDE_PANEL_ID}
        className="inline-flex items-center gap-2 -mx-2 px-2 py-2 rounded-xl text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Info className="w-4 h-4" aria-hidden="true" />
        Qual é o meu regime?
        <ChevronDown
          className={cn("w-4 h-4 transition-transform", isGuideOpen ? "rotate-180" : "")}
          aria-hidden="true"
        />
      </button>

      <CollapsiblePanel id={GUIDE_PANEL_ID} isOpen={isGuideOpen}>
        <dl className="space-y-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/30 p-5 border border-neutral-100 dark:border-neutral-800/50">
          {WORK_REGIME_INFO.map(({ value: regime, label, who, impact }) => (
            <div key={regime} className="space-y-1">
              <dt className="font-bold text-sm text-neutral-900 dark:text-neutral-100">{label}</dt>
              <dd className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty">
                {who} <span className="text-neutral-900 dark:text-neutral-200">{impact}</span>
              </dd>
            </div>
          ))}
          <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-4 text-pretty">
            Na prática, o regime muda só o cálculo do INSS. O IRRF segue a mesma tabela para os três.
          </p>
        </dl>
      </CollapsiblePanel>
    </fieldset>
  );
}
