import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const VIEWBOX = 120;
const STROKE_WIDTH = 9;
const RADIUS = (VIEWBOX - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = VIEWBOX / 2;

interface ProgressRingProps {
  progressPercent: number;
  overtimePercent: number;
  className?: string;
  children: ReactNode;
}

function dashOffsetFor(percent: number): number {
  return CIRCUMFERENCE * (1 - Math.min(100, Math.max(0, percent)) / 100);
}

export function ProgressRing({ progressPercent, overtimePercent, className, children }: ProgressRingProps) {
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[15rem]", className)}>
      <svg viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" strokeWidth={STROKE_WIDTH} className="stroke-white/20" />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffsetFor(progressPercent)}
          className="stroke-white transition-[stroke-dashoffset] duration-700 ease-out"
        />
        {overtimePercent > 0 ? (
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffsetFor(overtimePercent)}
            className="stroke-amber-300 transition-[stroke-dashoffset] duration-700 ease-out"
          />
        ) : null}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-6 text-center">
        {children}
      </div>
    </div>
  );
}
