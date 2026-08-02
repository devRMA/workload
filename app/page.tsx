"use client";

import { format } from "date-fns";
import { Clock, DollarSign, Moon, Sun, Wallet } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/button";
import { SalaryCalculator } from "@/components/organisms/salary-calculator";
import { WorkCalculator } from "@/components/organisms/work-calculator";
import { useCurrentTime } from "@/hooks/use-current-time";
import { safeGAEvent } from "@/lib/analytics";

type View = "work" | "salary";

const PLACEHOLDER_CLOCK = "--:--:--";

export default function Home() {
  const [activeView, setActiveView] = useState<View>("work");
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
                  {currentTime === null ? PLACEHOLDER_CLOCK : format(currentTime, "HH:mm:ss")}
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

        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-1.5 rounded-2xl shadow-2xl flex items-center gap-1">
            <Button
              variant={activeView === "work" ? "default" : "ghost"}
              onClick={() => {
                setActiveView("work");
                safeGAEvent("switch_tab", { tab: "work" });
              }}
              className="gap-2"
              aria-pressed={activeView === "work"}
            >
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>Jornada</span>
            </Button>
            <Button
              variant={activeView === "salary" ? "default" : "ghost"}
              onClick={() => {
                setActiveView("salary");
                safeGAEvent("switch_tab", { tab: "salary" });
              }}
              className="gap-2"
              aria-pressed={activeView === "salary"}
            >
              <DollarSign className="w-4 h-4" aria-hidden="true" />
              <span>Custo da Hora</span>
            </Button>
          </div>
        </nav>

        <div
          id="main-content"
          tabIndex={-1}
          className="pt-32 pb-32 px-4 sm:px-6 lg:px-8 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <AnimatePresence mode="wait">
            {activeView === "work" ? (
              <motion.div
                key="work"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <WorkCalculator />
              </motion.div>
            ) : (
              <motion.div
                key="salary"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <SalaryCalculator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
        </div>
      </main>
    </>
  );
}
