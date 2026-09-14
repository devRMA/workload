import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  emerald: "bg-positive-deep",
  rose: "bg-negative-deep",
  blue: "bg-accent",
} as const;

const VALUE_INLINE_SIZE_CQI = 208;

interface HeroPanelProps {
  icon: ElementType;
  label: string;
  value: string;
  tone: keyof typeof TONE_CLASSES;
  badge?: ReactNode;
  media?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export function HeroPanel({ icon: Icon, label, value, tone, badge, media, footer, children }: HeroPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-xl lg:p-2xl text-ink-onfill shadow-accent transition-[background-color] duration-(--duration-slow) ease-standard",
        TONE_CLASSES[tone],
      )}
    >
      <div className="relative z-10 space-y-lg lg:space-y-xl">
        <div className="flex items-center justify-between gap-md">
          <div className="flex items-center gap-sm">
            <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
            <span className="text-overline uppercase">{label}</span>
          </div>
          {badge}
        </div>
        <div className="@container space-y-md text-center">
          {media}
          <p
            aria-live="polite"
            className="text-numeral numeric whitespace-nowrap text-[length:var(--hero-value-size)]"
            style={
              {
                "--hero-value-size": `clamp(2.5rem, ${VALUE_INLINE_SIZE_CQI / Math.max(1, value.length)}cqi, 6rem)`,
              } as CSSProperties
            }
          >
            {value}
          </p>
          {children}
        </div>
        {footer ? <div className="pt-lg lg:pt-xl border-t border-ink-onfill/15">{footer}</div> : null}
      </div>
    </div>
  );
}
