"use client";

import { IconClock, IconMoon, IconSun, IconWallet } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "@/components/atoms/button";
import { useCurrentTime } from "@/hooks/use-current-time";
import { safeGAEvent } from "@/lib/analytics";
import { formatClockTime, PLACEHOLDER_CLOCK } from "@/lib/utils";

export function AppHeader({ heading }: { heading: string }) {
  const currentTime = useCurrentTime();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    safeGAEvent("session_metadata", {
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_pixel_ratio: window.devicePixelRatio,
      user_language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-chrome backdrop-blur-chrome backdrop-saturate-(--saturate-chrome) border-b border-line">
      <div className="max-w-app mx-auto px-md sm:px-lg lg:px-xl h-(--header-height) flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-md bg-accent flex items-center justify-center">
            <IconWallet className="text-ink-onfill" size={24} stroke={1.75} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-title">
              <span aria-hidden="true">WorkLoad</span>
              <span className="sr-only">{heading}</span>
            </h1>
            <p className="hidden sm:block text-caption text-ink-subtle">
              Sua jornada de trabalho, clara e no seu controle
            </p>
          </div>
        </div>

        <div className="flex items-center gap-md">
          <div
            aria-hidden="true"
            className="hidden md:flex items-center gap-xs bg-surface-sunken rounded-sm px-md py-xs text-label numeric text-ink-muted"
          >
            <IconClock className="w-4 h-4 text-accent-ink" aria-hidden="true" />
            <span>{currentTime === null ? PLACEHOLDER_CLOCK : formatClockTime(currentTime)}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const newTheme = resolvedTheme === "dark" ? "light" : "dark";
              setTheme(newTheme);
              safeGAEvent("toggle_theme", {
                theme: newTheme,
              });
            }}
            title="Alternar tema"
            aria-label="Alternar tema"
          >
            {resolvedTheme === "dark" ? (
              <IconSun className="w-5 h-5" aria-hidden="true" />
            ) : (
              <IconMoon className="w-5 h-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
