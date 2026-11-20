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
  const { setTheme } = useTheme();

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
    <header className="glass-chrome fixed inset-x-4 sm:inset-x-6 lg:inset-x-8 top-2 z-50 max-w-app mx-auto px-3 sm:px-6 h-(--header-height) flex items-center justify-between rounded-xl border border-line">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-accent flex items-center justify-center">
          <IconWallet className="text-ink-onfill" size={24} stroke={1.75} aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-title">
            <span aria-hidden="true">WorkLoad</span>
            <span className="sr-only">{heading}</span>
          </h1>
          <p className="hidden sm:block text-caption text-ink">Sua jornada de trabalho, clara e no seu controle</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="hidden md:flex items-center gap-2 rounded-sm px-4 py-2 text-label numeric text-ink"
        >
          <IconClock className="w-4 h-4 text-accent-ink" aria-hidden="true" />
          <span className="grid text-right">
            <span className="invisible col-start-1 row-start-1">00:00:00</span>
            <span className="col-start-1 row-start-1">
              {currentTime === null ? PLACEHOLDER_CLOCK : formatClockTime(currentTime)}
            </span>
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-ink"
          onClick={() => {
            const newTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
            setTheme(newTheme);
            safeGAEvent("toggle_theme", {
              theme: newTheme,
            });
          }}
          title="Alternar tema"
          aria-label="Alternar tema"
        >
          <IconMoon className="w-5 h-5 dark:hidden" aria-hidden="true" data-theme-icon="moon" />
          <IconSun className="hidden w-5 h-5 dark:block" aria-hidden="true" data-theme-icon="sun" />
        </Button>
      </div>
    </header>
  );
}
