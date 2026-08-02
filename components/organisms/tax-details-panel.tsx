"use client";

import { Users } from "lucide-react";
import type { ExtraItem, ExtraKind } from "@/hooks/use-salary-calculator";
import { safeGAEvent } from "@/lib/analytics";
import { formatCurrencySimple, parseCurrency } from "@/lib/utils";
import { ExtraEntryList } from "../molecules/extra-entry-list";
import { ExtraEntryRow } from "../molecules/extra-entry-row";
import { FormField } from "../molecules/form-field";

type ExtraField = "name" | "value";

interface TaxDetailsPanelProps {
  dependents: number;
  onDependentsChange: (value: number) => void;
  manualInss: number | null;
  onManualInssChange: (value: number | null) => void;
  manualIrrf: number | null;
  onManualIrrfChange: (value: number | null) => void;
  autoInss: number;
  autoIrrf: number;
  extraDeductions: readonly ExtraItem[];
  extraGains: readonly ExtraItem[];
  onAddExtra: (kind: ExtraKind) => void;
  onUpdateExtra: (id: string, kind: ExtraKind, field: ExtraField, value: string | number) => void;
  onRemoveExtra: (id: string, kind: ExtraKind) => void;
}

export function TaxDetailsPanel({
  dependents,
  onDependentsChange,
  manualInss,
  onManualInssChange,
  manualIrrf,
  onManualIrrfChange,
  autoInss,
  autoIrrf,
  extraDeductions,
  extraGains,
  onAddExtra,
  onUpdateExtra,
  onRemoveExtra,
}: TaxDetailsPanelProps) {
  const toManualAmount = (rawValue: string) => (rawValue ? parseCurrency(rawValue) : null);

  return (
    <div className="space-y-6 bg-neutral-50 dark:bg-neutral-800/30 p-6 rounded-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          id="dependentes"
          label="Dependentes"
          type="number"
          min={0}
          step={1}
          icon={<Users className="w-5 h-5" aria-hidden="true" />}
          placeholder="0"
          value={dependents || ""}
          onChange={(event) => onDependentsChange(Number(event.target.value))}
        />
        <FormField
          id="inss-manual"
          label="INSS (R$)"
          type="text"
          inputMode="decimal"
          icon={<span className="font-bold text-red-500">R$</span>}
          placeholder={formatCurrencySimple(autoInss)}
          value={manualInss !== null ? formatCurrencySimple(manualInss) : ""}
          onChange={(event) => onManualInssChange(toManualAmount(event.target.value))}
        />
        <FormField
          id="irrf-manual"
          label="IRRF (R$)"
          type="text"
          inputMode="decimal"
          icon={<span className="font-bold text-red-500">R$</span>}
          placeholder={formatCurrencySimple(autoIrrf)}
          value={manualIrrf !== null ? formatCurrencySimple(manualIrrf) : ""}
          onChange={(event) => onManualIrrfChange(toManualAmount(event.target.value))}
        />
      </div>

      <ExtraEntryList
        listId="extra-deductions-list"
        label="Outros Descontos"
        addLabel="Adicionar desconto"
        onAdd={() => {
          onAddExtra("deduction");
          safeGAEvent("add_deduction");
        }}
      >
        {extraDeductions.map((item) => (
          <ExtraEntryRow
            key={item.id}
            name={item.name}
            value={item.value}
            nameLabel="Descrição do desconto"
            namePlaceholder="Nome (ex: Plano de Saúde)"
            valueLabel="Valor do desconto"
            removeLabel="Remover desconto"
            onNameChange={(name) => onUpdateExtra(item.id, "deduction", "name", name)}
            onValueChange={(value) => onUpdateExtra(item.id, "deduction", "value", value)}
            onRemove={() => onRemoveExtra(item.id, "deduction")}
          />
        ))}
      </ExtraEntryList>

      <ExtraEntryList
        listId="extra-gains-list"
        label="Ganhos Extras (Líquido)"
        addLabel="Adicionar ganho"
        addButtonClassName="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
        onAdd={() => {
          onAddExtra("gain");
          safeGAEvent("add_gain");
        }}
      >
        {extraGains.map((item) => (
          <ExtraEntryRow
            key={item.id}
            name={item.name}
            value={item.value}
            nameLabel="Descrição do ganho"
            namePlaceholder="Nome (ex: Vale Alimentação)"
            valueLabel="Valor do ganho"
            removeLabel="Remover ganho"
            onNameChange={(name) => onUpdateExtra(item.id, "gain", "name", name)}
            onValueChange={(value) => onUpdateExtra(item.id, "gain", "value", value)}
            onRemove={() => onRemoveExtra(item.id, "gain")}
          />
        ))}
      </ExtraEntryList>
    </div>
  );
}
