"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CollapsiblePanelProps {
  id: string;
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

export function CollapsiblePanel({ id, isOpen, children, className }: CollapsiblePanelProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={cn("overflow-hidden", className)}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
