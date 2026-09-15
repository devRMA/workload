"use client";

import { IconTrash } from "@tabler/icons-react";
import { parseCurrency } from "@/lib/utils";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { CurrencyInput } from "../molecules/currency-input";

const COMPACT_FIELD_CLASSES = "h-12 rounded-sm text-body-sm";

interface ExtraEntryRowProps {
  name: string;
  value: number;
  nameLabel: string;
  namePlaceholder: string;
  valueLabel: string;
  removeLabel: string;
  onNameChange: (name: string) => void;
  onValueChange: (value: number) => void;
  onRemove: () => void;
}

export function ExtraEntryRow({
  name,
  value,
  nameLabel,
  namePlaceholder,
  valueLabel,
  removeLabel,
  onNameChange,
  onValueChange,
  onRemove,
}: ExtraEntryRowProps) {
  return (
    <div className="flex gap-sm">
      <div className="flex-1 min-w-0">
        <Input
          type="text"
          aria-label={nameLabel}
          placeholder={namePlaceholder}
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          className={COMPACT_FIELD_CLASSES}
        />
      </div>
      <div className="w-24 sm:w-32 shrink-0">
        <CurrencyInput
          aria-label={valueLabel}
          placeholder="Valor"
          value={value}
          onValueChange={(rawValue) => onValueChange(parseCurrency(rawValue))}
          className={COMPACT_FIELD_CLASSES}
        />
      </div>
      <Button
        variant="danger"
        size="icon"
        type="button"
        aria-label={removeLabel}
        onClick={onRemove}
        className="shrink-0"
      >
        <IconTrash className="w-4 h-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
