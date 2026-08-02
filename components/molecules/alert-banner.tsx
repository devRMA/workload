import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  danger: "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100",
  warning: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100",
} as const;

interface AlertBannerProps {
  icon: ElementType;
  tone: keyof typeof TONE_CLASSES;
  title: string;
  id?: string;
  className?: string;
  children?: ReactNode;
}

export function AlertBanner({ icon: Icon, tone, title, id, className, children }: AlertBannerProps) {
  return (
    <div
      id={id}
      role={tone === "danger" ? "alert" : "status"}
      className={cn("flex items-start gap-3 rounded-2xl border p-4", TONE_CLASSES[tone], className)}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="space-y-1 text-sm">
        <p className="font-bold">{title}</p>
        {children}
      </div>
    </div>
  );
}
