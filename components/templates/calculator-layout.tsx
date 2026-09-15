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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-8">{main}</div>
          <div className="order-first lg:order-none lg:col-span-5 lg:sticky lg:top-[calc(var(--header-height)+var(--spacing)*8)]">
            {aside}
          </div>
        </div>
      </div>
    </div>
  );
}
