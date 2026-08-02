import type * as React from "react";
import { cn } from "@/lib/utils";
import { CurrencyInput, type CurrencyInputProps } from "../atoms/currency-input";
import { Label } from "../atoms/label";

interface CurrencyFieldProps extends CurrencyInputProps {
  label: string;
  id: string;
  icon?: React.ReactNode;
  labelIcon?: React.ReactNode;
}

export function CurrencyField({ label, icon, id, className, labelIcon, ...props }: CurrencyFieldProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <Label htmlFor={id}>
        {labelIcon}
        {label}
      </Label>
      <CurrencyInput id={id} icon={icon} {...props} />
    </div>
  );
}
