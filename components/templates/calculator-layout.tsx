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
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 space-y-8"
          >
            {main}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-first lg:order-none lg:col-span-5 lg:sticky lg:top-32"
          >
            {aside}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
