"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalculatorLayoutProps {
  main: ReactNode;
  aside: ReactNode;
  className?: string;
}

export function CalculatorLayout({ main, aside, className }: CalculatorLayoutProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="max-w-app mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:[reading-flow:grid-rows]">
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:sticky lg:top-[calc(var(--header-height)+var(--spacing)*8)]">
            {aside}
          </div>
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 space-y-8">{main}</div>
        </div>
      </div>
    </div>
  );
}
