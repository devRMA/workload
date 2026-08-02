"use client";

import { Briefcase, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { labelClasses } from "@/components/atoms/label";
import { WORK_REGIME_INFO, type WorkRegime } from "@/lib/payroll";
import { cn } from "@/lib/utils";
import { CollapsiblePanel } from "./collapsible-panel";

const OPTIONS_PANEL_ID = "regime-options";

interface RegimeFieldProps {
  value: WorkRegime;
  onChange: (regime: WorkRegime) => void;
  className?: string;
}

export function RegimeField({ value, onChange, className }: RegimeFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = WORK_REGIME_INFO.find((regime) => regime.value === value) ?? WORK_REGIME_INFO[0];

  const handleChange = (regime: WorkRegime) => {
    onChange(regime);
    setIsOpen(false);
  };

  return (
    <fieldset className={cn("space-y-3", className)}>
      <legend className={labelClasses}>
        <Briefcase className="w-4 h-4" aria-hidden="true" />
        Regime de Trabalho
      </legend>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={OPTIONS_PANEL_ID}
        className="flex w-full items-center justify-between gap-4 rounded-2xl border border-neutral-500 dark:border-neutral-600 bg-white/50 dark:bg-neutral-900/50 p-4 text-left transition-colors hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <span className="flex flex-col gap-0.5">
          <span className="font-bold text-neutral-900 dark:text-neutral-100">{selected.label}</span>
          <span className="text-xs leading-snug text-neutral-500 dark:text-neutral-400 text-pretty">
            {selected.summary}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
          {isOpen ? "Fechar" : "Alterar"}
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen ? "rotate-180" : "")} aria-hidden="true" />
        </span>
      </button>

      <CollapsiblePanel id={OPTIONS_PANEL_ID} isOpen={isOpen}>
        <div className="space-y-3">
          {WORK_REGIME_INFO.map(({ value: regime, label, who, impact }) => (
            <label
              key={regime}
              className="relative flex cursor-pointer flex-col gap-1 rounded-2xl border border-neutral-500 dark:border-neutral-600 bg-white/50 dark:bg-neutral-900/50 p-4 pr-9 transition-colors hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 has-checked:border-blue-500 has-checked:bg-blue-50 dark:has-checked:bg-blue-950/40 has-focus-visible:ring-2 has-focus-visible:ring-blue-500"
            >
              <input
                type="radio"
                name="work-regime"
                value={regime}
                checked={regime === value}
                onChange={() => handleChange(regime)}
                className="peer sr-only"
              />
              <Check
                className="absolute right-3 top-4 w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 transition-opacity peer-checked:opacity-100"
                aria-hidden="true"
              />
              <span className="font-bold text-neutral-900 dark:text-neutral-100 text-pretty">{label}</span>
              <span className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty">
                {who} <span className="text-neutral-900 dark:text-neutral-200">{impact}</span>
              </span>
            </label>
          ))}
          <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 text-pretty">
            O regime muda só o cálculo do INSS. O IRRF segue a mesma tabela para os dois.
          </p>
        </div>
      </CollapsiblePanel>
    </fieldset>
  );
}
