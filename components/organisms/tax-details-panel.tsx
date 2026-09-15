"use client";

import { IconUsers } from "@tabler/icons-react";
import type { ExtraItem, ExtraKind } from "@/hooks/use-salary-calculator";
import { safeGAEvent } from "@/lib/analytics";
import { formatCurrencySimple, parseCurrency } from "@/lib/utils";
import { Input } from "../atoms/input";
import { CurrencyInput } from "../molecules/currency-input";
import { ExtraEntryList } from "../molecules/extra-entry-list";
import { ExtraEntryRow } from "../molecules/extra-entry-row";
import { Field } from "../molecules/field";

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
    <div className="space-y-lg bg-surface-sunken p-lg rounded-lg border border-line">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
        <Field id="dependentes" label="Dependentes">
          <Input
            id="dependentes"
            type="number"
            min={0}
            step={1}
            icon={<IconUsers className="w-5 h-5" aria-hidden="true" />}
            placeholder="0"
            value={dependents || ""}
            onChange={(event) => onDependentsChange(Number(event.target.value))}
          />
        </Field>
        <Field id="inss-manual" label="INSS (R$)">
          <CurrencyInput
            id="inss-manual"
            icon={<span className="font-semibold text-negative-ink">R$</span>}
            placeholder={formatCurrencySimple(autoInss)}
            value={manualInss}
            onValueChange={(rawValue) => onManualInssChange(toManualAmount(rawValue))}
          />
        </Field>
        <Field id="irrf-manual" label="IRRF (R$)">
          <CurrencyInput
            id="irrf-manual"
            icon={<span className="font-semibold text-negative-ink">R$</span>}
            placeholder={formatCurrencySimple(autoIrrf)}
            value={manualIrrf}
            onValueChange={(rawValue) => onManualIrrfChange(toManualAmount(rawValue))}
          />
        </Field>
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
