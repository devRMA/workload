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
      className={cn(
        "rounded-2xl border p-4 flex flex-col gap-1",
        {
          "bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800": variant === "default",
          "bg-emerald-50/50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-800": variant === "success",
          "bg-red-50/50 border-red-100 dark:bg-red-900/10 dark:border-red-800": variant === "danger",
        },
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-sm opacity-70 mb-1">
        {icon}
        <span className="font-medium uppercase tracking-wider text-xs">{label}</span>
      </div>
      <div
        className={cn("text-2xl font-bold tracking-tight tabular-nums", {
          "text-blue-600 dark:text-blue-400": variant === "default",
          "text-emerald-600 dark:text-emerald-400": variant === "success",
          "text-red-600 dark:text-red-400": variant === "danger",
        })}
      >
        {value}
      </div>
      {subValue && <div className="text-sm font-medium opacity-60 mt-1">{subValue}</div>}
    </div>
  );
}
