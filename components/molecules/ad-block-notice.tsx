"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/atoms/button";

interface AdBlockNoticeProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function AdBlockNotice({ isOpen, onClose, onConfirm }: AdBlockNoticeProps) {
  if (!isOpen) return null;

  return (
    <motion.aside
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      aria-labelledby="ad-block-notice-title"
      className="fixed inset-x-0 bottom-[calc(max(1rem,env(safe-area-inset-bottom))_+_4.5rem)] sm:bottom-[6.5rem] z-40 px-4"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <Heart size={24} aria-hidden="true" className="fill-indigo-500/20" />
        </div>

        <div className="flex-1 space-y-1">
          <h2 id="ad-block-notice-title" className="text-lg font-black tracking-tight">
            Opa! Uma ajudinha?
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Este projeto é gratuito e mantido com carinho. Exibimos apenas{" "}
            <span className="font-bold text-neutral-900 dark:text-neutral-50">um único anúncio por semana</span> — o
            suficiente para me ajudar a pagar um café e continuar codando! ☕
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            <span className="font-bold">Prometemos não ser chatos</span>: sua visualização semanal garante que o
            WorkLoad continue online e evoluindo para todos.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2">
          <Button onClick={onConfirm} className="h-11 px-5 text-sm font-bold shadow-lg shadow-indigo-500/20">
            Já desativei, pode contar comigo!
          </Button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-xl px-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Continuar com AdBlock ativo
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
