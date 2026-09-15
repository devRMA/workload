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
      className={cn("flex items-start gap-sm rounded-lg border p-md", TONE_CLASSES[tone], className)}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="space-y-1 text-body-sm">
        <p className="font-semibold">{title}</p>
        {children}
      </div>
    </div>
  );
}
