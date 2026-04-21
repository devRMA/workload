'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, DollarSign, Sun, Moon, Wallet } from 'lucide-react';
import { useTheme } from 'next-themes';
import { format } from 'date-fns';
import WorkCalculator from '@/components/work-calculator';
import SalaryCalculator from '@/components/salary-calculator';

type View = 'work' | 'salary';

export default function Home() {
  const [activeView, setActiveView] = useState<View>('work');
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500">
      {/* Global Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl 2xl:max-w-[1600px] 4k:max-w-[2400px] mx-auto px-6 h-20 4k:h-32 flex items-center justify-between">
          <div className="flex items-center gap-3 4k:gap-6">
            <div className="w-10 h-10 4k:w-16 4k:h-16 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Wallet className="text-white w-6 h-6 4k:w-10 4k:h-10" />
            </div>
            <h1 className="text-xl font-bold tracking-tight md:text-2xl 4k:text-5xl">WorkLoad</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-sm font-bold 4k:text-2xl 4k:px-8 4k:py-4">
              <Clock className="w-4 h-4 text-indigo-500 4k:w-8 4k:h-8" />
              <span className="tabular-nums">{format(currentTime, 'HH:mm:ss')}</span>
            </div>
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
              title="Alternar tema"
            >
              {resolvedTheme === 'dark' ? <Sun className="w-5 h-5 4k:w-10 4k:h-10" /> : <Moon className="w-5 h-5 4k:w-10 4k:h-10" />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-1.5 rounded-2xl shadow-2xl flex items-center gap-1">
          <button
            onClick={() => setActiveView('work')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeView === 'work' 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Jornada</span>
          </button>
          <button
            onClick={() => setActiveView('salary')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeView === 'salary' 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Valor da Hora</span>
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <div className="pt-32 pb-32 px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeView === 'work' ? (
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

      {/* Background Accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}
