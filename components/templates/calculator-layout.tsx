"use client";

import { motion } from "motion/react";
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="lg:col-span-7 space-y-xl"
          >
            {main}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="order-first lg:order-none lg:col-span-5 lg:sticky lg:top-[calc(var(--header-height)+var(--spacing-xl))]"
          >
            {aside}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
