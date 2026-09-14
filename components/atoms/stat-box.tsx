import type * as React from "react";
import { cn } from "@/lib/utils";

interface StatBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  subValue?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "danger";
}

export function StatBox({ label, value, subValue, icon, variant = "default", className, ...props }: StatBoxProps) {
  return (
    <div
      className={cn("flex flex-col gap-xs rounded-lg border border-line bg-surface-sunken p-md", className)}
      {...props}
    >
      <div className="flex items-center gap-xs text-overline uppercase text-ink-muted">
        {icon}
        <span>{label}</span>
      </div>
      <div
        className={cn("text-metric numeric", {
          "text-ink": variant === "default",
          "text-positive-ink": variant === "success",
          "text-negative-ink": variant === "danger",
        })}
      >
        {value}
      </div>
      {subValue && <div className="text-caption text-ink-subtle">{subValue}</div>}
    </div>
  );
}
