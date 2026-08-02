import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  emerald: "bg-emerald-700 shadow-emerald-500/20 lg:shadow-emerald-500/30",
  rose: "bg-rose-700 shadow-rose-500/20 lg:shadow-rose-500/30",
  blue: "bg-blue-600 shadow-blue-500/30",
} as const;

const VALUE_INLINE_SIZE_CQI = 208;

interface HeroPanelProps {
  icon: ElementType;
  label: string;
  value: string;
  tone: keyof typeof TONE_CLASSES;
  badge?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export function HeroPanel({ icon: Icon, label, value, tone, badge, footer, children }: HeroPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-8 lg:p-12 text-white shadow-xl lg:shadow-2xl transition-colors duration-700",
        TONE_CLASSES[tone],
      )}
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 lg:w-40 lg:h-40 bg-white/10 rounded-full blur-2xl lg:blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
      <div className="relative z-10 space-y-6 lg:space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 lg:gap-3">
            <Icon className="w-5 h-5 lg:w-6 lg:h-6" aria-hidden="true" />
            <span className="text-sm lg:text-lg font-bold lg:font-medium tracking-wider lg:tracking-wide uppercase">
              {label}
            </span>
          </div>
          {badge}
        </div>
        <div className="@container space-y-4 text-center">
          <p
            className="font-black tracking-tighter tabular-nums whitespace-nowrap text-[length:var(--hero-value-size)]"
            style={
              {
                "--hero-value-size": `clamp(1.5rem, ${VALUE_INLINE_SIZE_CQI / value.length}cqi, 6rem)`,
              } as CSSProperties
            }
          >
            {value}
          </p>
          {children}
        </div>
        {footer ? <div className="pt-6 lg:pt-8 border-t border-white/10">{footer}</div> : null}
      </div>
    </div>
  );
}
