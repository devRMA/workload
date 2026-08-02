"use client";

import { Clock, Moon, Sun, Wallet } from "lucide-react";
import { useTheme } from "next-themes";
import { Suspense, useEffect } from "react";
import { Button } from "@/components/atoms/button";
import { CalculatorViews, CalculatorViewsFromUrl } from "@/components/organisms/calculator-views";
import { useCurrentTime } from "@/hooks/use-current-time";
import { safeGAEvent } from "@/lib/analytics";
import { formatClockTime } from "@/lib/utils";

const PLACEHOLDER_CLOCK = "--:--:--";

export default function Home() {
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
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "WorkLoad",
            url: "https://workload.devrma.com",
            description: "Calculadora inteligente de jornada e valor de trabalho.",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            author: {
              "@type": "Person",
              name: "Rafael Augusto",
            },
          }),
        }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-black"
      >
        Pular para o conteúdo principal
      </a>
      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Wallet className="text-white w-6 h-6" aria-hidden="true" />
              </div>
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">WorkLoad</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-sm font-bold">
                <Clock className="w-4 h-4 text-indigo-500" aria-hidden="true" />
                <span className="tabular-nums">
                  {currentTime === null ? PLACEHOLDER_CLOCK : formatClockTime(currentTime)}
                </span>
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
                  <Sun className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Moon className="w-5 h-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </header>

        <Suspense fallback={<CalculatorViews activeView="work" />}>
          <CalculatorViewsFromUrl />
        </Suspense>

        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
        </div>
      </main>
    </>
  );
}
