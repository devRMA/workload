"use client";

import { Briefcase, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { labelClasses } from "@/components/atoms/label";
import { WORK_REGIME_INFO, type WorkRegime } from "@/lib/payroll";
import { cn } from "@/lib/utils";
import { CollapsiblePanel } from "../atoms/collapsible-panel";

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
    <fieldset className={cn("space-y-xs", className)}>
      <legend className={labelClasses}>
        <Briefcase className="w-4 h-4" aria-hidden="true" />
        Regime de Trabalho
      </legend>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={OPTIONS_PANEL_ID}
        className="flex w-full items-center justify-between gap-md rounded-md border border-line-strong bg-surface p-md text-left transition-[border-color] duration-(--duration-fast) ease-standard hover:border-ink-subtle ring-focus"
      >
        <span className="flex flex-col gap-0.5">
          <span className="font-semibold text-ink">{selected.label}</span>
          <span className="text-caption text-ink-subtle text-pretty">{selected.summary}</span>
        </span>
        <span className="flex shrink-0 items-center gap-xs text-label text-accent-ink">
          {isOpen ? "Fechar" : "Alterar"}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-(--duration-base) ease-standard",
              isOpen ? "rotate-180" : "",
            )}
            aria-hidden="true"
          />
        </span>
      </button>

      <CollapsiblePanel id={OPTIONS_PANEL_ID} isOpen={isOpen}>
        <div className="space-y-sm pt-xs">
          {WORK_REGIME_INFO.map(({ value: regime, label, who, impact }) => (
            <label
              key={regime}
              className="relative flex cursor-pointer flex-col gap-1 rounded-md border border-line-strong bg-surface p-md pr-9 transition-[border-color,background-color] duration-(--duration-fast) ease-standard hover:border-accent has-checked:border-accent has-checked:bg-accent-soft has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus"
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
                className="absolute right-3 top-4 w-4 h-4 text-accent-ink opacity-0 transition-opacity duration-(--duration-fast) peer-checked:opacity-100"
                aria-hidden="true"
              />
              <span className="font-semibold text-ink text-pretty">{label}</span>
              <span className="text-body-sm text-ink-muted text-pretty">
                {who} <span className="text-ink">{impact}</span>
              </span>
            </label>
          ))}
          <p className="text-caption text-ink-subtle text-pretty">
            O regime muda só o cálculo do INSS. O IRRF segue a mesma tabela para os dois.
          </p>
        </div>
      </CollapsiblePanel>
    </fieldset>
  );
}
