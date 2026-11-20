import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  danger: "border-negative/30 bg-negative-soft text-negative-ink",
  warning: "border-overtime/30 bg-overtime-soft text-overtime-ink",
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
      className={cn("rounded-lg border px-3 py-4", TONE_CLASSES[tone], className)}
    >
      <div className="space-y-1 text-body-sm">
        <div className="flex items-start gap-3">
          <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="font-semibold">{title}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
