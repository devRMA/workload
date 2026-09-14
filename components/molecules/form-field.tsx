import type * as React from "react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "../atoms/input";
import { Label } from "../atoms/label";

interface FormFieldProps extends InputProps {
  label: string;
  icon?: React.ReactNode;
  id: string;
  labelIcon?: React.ReactNode;
  hint?: string;
}

export function FormField({ label, icon, id, className, labelIcon, hint, ...props }: FormFieldProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <Label htmlFor={id}>
        {labelIcon}
        {label}
      </Label>
      <Input id={id} icon={icon} aria-describedby={hint ? `${id}-hint` : undefined} {...props} />
      {hint ? (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
