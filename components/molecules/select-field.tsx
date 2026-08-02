import type { ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../atoms/label";

interface SelectOption<TValue extends string> {
  value: TValue;
  label: string;
}

interface SelectFieldProps<TValue extends string>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  id: string;
  label: string;
  labelIcon?: ReactNode;
  value: TValue;
  options: readonly SelectOption<TValue>[];
  onValueChange: (value: TValue) => void;
}

export function SelectField<TValue extends string>({
  id,
  label,
  labelIcon,
  value,
  options,
  onValueChange,
  className,
  ...props
}: SelectFieldProps<TValue>) {
  return (
    <div className={cn("space-y-3", className)}>
      <Label htmlFor={id}>
        {labelIcon}
        {label}
      </Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onValueChange(event.target.value as TValue)}
        className="flex h-14 w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-4 py-2 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
