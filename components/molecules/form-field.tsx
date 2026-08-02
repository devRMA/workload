import type * as React from "react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "../atoms/input";
import { Label } from "../atoms/label";

interface FormFieldProps extends InputProps {
  label: string;
  icon?: React.ReactNode;
  id: string;
  labelIcon?: React.ReactNode;
}

export function FormField({ label, icon, id, className, labelIcon, ...props }: FormFieldProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <Label htmlFor={id}>
        {labelIcon}
        {label}
      </Label>
      <Input id={id} icon={icon} {...props} />
    </div>
  );
}
