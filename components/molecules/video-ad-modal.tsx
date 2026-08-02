"use client";

import { PlayCircle, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { ModalDialog } from "@/components/atoms/modal-dialog";
import { GoogleAd } from "@/components/molecules/google-ad";

interface VideoAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const VIDEO_DURATION_MS = 15000;

export function VideoAdModal({ isOpen, onClose, onComplete }: VideoAdModalProps) {
  const [step, setStep] = useState<"alert" | "video">("alert");
  const [videoFinished, setVideoFinished] = useState(false);

  const handleStartVideo = () => {
    setStep("video");
    setTimeout(() => {
      setVideoFinished(true);
    }, VIDEO_DURATION_MS);
  };

  const handleFinish = () => {
    onComplete();
    onClose();
  };

  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="video-ad-modal-title"
      className="w-full max-w-2xl rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
    >
      {step === "alert" ? (
        <div className="p-8 text-center space-y-8">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <PlayCircle size={48} aria-hidden="true" />
          </div>
          <div className="space-y-4">
            <h2 id="video-ad-modal-title" className="text-3xl font-black tracking-tight">
              Vídeo da Semana
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed">
              Para manter o WorkLoad 100% gratuito para todos, exibimos apenas{" "}
              <span className="font-bold text-neutral-900 dark:text-neutral-50">um único vídeo por semana</span>. Sua
              ajuda é fundamental!
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 font-medium">
            <ShieldCheck size={16} aria-hidden="true" />
            Prometemos: Sem popups chatos depois disso.
          </div>
          <div className="flex flex-col gap-3">
            <Button onClick={handleStartVideo} size="lg" className="h-14 text-lg font-bold gap-2">
              <PlayCircle size={20} aria-hidden="true" />
              Ver vídeo e apoiar o projeto
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
            >
              Agora não, obrigado
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl">
          <div className="flex items-center justify-between gap-4 pl-6 pr-2 py-2">
            <h2 id="video-ad-modal-title" className="text-sm font-black tracking-tight">
              Vídeo da Semana
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={videoFinished ? handleFinish : onClose}
              aria-label="Fechar vídeo"
              className="rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              <X size={20} aria-hidden="true" />
            </Button>
          </div>
          <div className="relative aspect-video w-full bg-black">
            {!videoFinished && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/20">
                  Anúncio em exibição...
                </div>
              </div>
            )}
            <div className="h-full w-full flex items-center justify-center text-white">
              <GoogleAd slot="video_ad_slot" format="fluid" className="h-full w-full" />
            </div>
          </div>
        </div>
      )}
    </ModalDialog>
  );
}
