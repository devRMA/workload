import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../atoms/label";

interface FieldProps {
  id: string;
  label: string;
  labelIcon?: ReactNode;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ id, label, labelIcon, hint, className, children }: FieldProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <Label htmlFor={id}>
        {labelIcon}
        {label}
      </Label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
