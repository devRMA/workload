import { IconArrowDown } from "@tabler/icons-react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  emerald: "bg-result-positive-base [--hero-tint:var(--color-result-positive)]",
  rose: "bg-negative-deep [--hero-tint:var(--color-result-negative)]",
  blue: "bg-accent [--hero-tint:var(--color-result-accent)]",
} as const;

const VALUE_INLINE_SIZE_CQI = 208;

interface HeroPanelProps {
  icon: ElementType;
  label: string;
  value: string;
  tone: keyof typeof TONE_CLASSES;
  editLink?: { href: string; label: string };
  badge?: ReactNode;
  media?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export function HeroPanel({
  icon: Icon,
  label,
  value,
  tone,
  editLink,
  badge,
  media,
  footer,
  children,
}: HeroPanelProps) {
  const isFigure = /\d/.test(value);

  return (
    <div
      className={cn(
        "hero-enamel rounded-2xl p-6 sm:p-8 lg:p-12 text-ink-onfill transition-colors duration-(--duration-fast) ease-out",
        TONE_CLASSES[tone],
      )}
    >
      <div className="space-y-4 lg:space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon size={24} stroke={1.75} aria-hidden="true" />
            <span className="text-label font-semibold">{label}</span>
          </div>
          {badge}
        </div>
        <div className={cn("@container space-y-2", Boolean(media) && "text-center")}>
          {media}
          <p
            aria-live="polite"
            className={cn(
              isFigure
                ? cn(
                    "text-numeral numeric whitespace-nowrap text-[length:var(--hero-value-size)]",
                    Boolean(media) && "font-bold",
                  )
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
        {(footer || editLink) && (
          <div className="flex flex-col gap-3 pt-4 border-t border-ink-onfill/20">
            {footer}
            {editLink && (
              <a
                href={editLink.href}
                className="lg:hidden flex min-h-11 items-center justify-between gap-2 rounded-md border border-ink-onfill/70 px-4 text-label font-semibold ring-focus focus-visible:outline-ink-onfill transition-[background-color,scale] duration-(--duration-fast) ease-out hover:bg-scrim/25 active:scale-[0.97] motion-reduce:active:scale-100"
              >
                {editLink.label}
                <IconArrowDown size={20} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
