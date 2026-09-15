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
  const isFigure = /\d/.test(value);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-8 lg:p-12 text-ink-onfill shadow-accent transition-[background-color] duration-(--duration-slow) ease-standard",
        TONE_CLASSES[tone],
      )}
    >
      <div className="relative z-10 space-y-6 lg:space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon size={24} stroke={1.75} aria-hidden="true" />
            <span className="text-overline uppercase">{label}</span>
          </div>
          {badge}
        </div>
        <div className="@container space-y-4 text-center">
          {media}
          <p
            aria-live="polite"
            className={cn(
              isFigure
                ? "text-numeral numeric whitespace-nowrap text-[length:var(--hero-value-size)]"
                : "text-title text-balance",
            )}
            style={
              isFigure
                ? ({
                    "--hero-value-size": `clamp(2.5rem, ${VALUE_INLINE_SIZE_CQI / Math.max(1, value.length)}cqi, 6rem)`,
                  } as CSSProperties)
                : undefined
            }
          >
            {value}
          </p>
          {children}
        </div>
        {footer ? <div className="pt-6 lg:pt-8 border-t border-ink-onfill/15">{footer}</div> : null}
      </div>
    </div>
  );
}
