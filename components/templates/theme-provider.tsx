"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <MotionConfig reducedMotion="user" transition={{ type: "spring", bounce: 0, duration: 0.35 }}>
        {children}
      </MotionConfig>
    </NextThemesProvider>
  );
}
