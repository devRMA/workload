"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { GoogleAd } from "@/components/molecules/google-ad";

interface SideAdsProps {
  onClose: () => void;
}

const CLOSE_BUTTON_CLASSES =
  "absolute -top-3 z-50 bg-white dark:bg-neutral-950 border rounded-full p-1.5 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-opacity";

export function SideAds({ onClose }: SideAdsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closeAds = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-[40] hidden min-[1980px]:block w-[160px] h-[600px]"
          >
            <div className="relative group bg-card border rounded-2xl p-1 shadow-xl">
              <button
                type="button"
                onClick={closeAds}
                aria-label="Fechar anúncio do lado esquerdo"
                className={`${CLOSE_BUTTON_CLASSES} -right-3`}
              >
                <X size={14} aria-hidden="true" />
              </button>
              <div className="text-[10px] text-center text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-tighter">
                Espaço do Apoiador
              </div>
              <GoogleAd slot="left_side_slot" format="vertical" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-[40] hidden min-[1980px]:block w-[160px] h-[600px]"
          >
            <div className="relative group bg-card border rounded-2xl p-1 shadow-xl">
              <button
                type="button"
                onClick={closeAds}
                aria-label="Fechar anúncio do lado direito"
                className={`${CLOSE_BUTTON_CLASSES} -left-3`}
              >
                <X size={14} aria-hidden="true" />
              </button>
              <div className="text-[10px] text-center text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-tighter">
                Espaço do Apoiador
              </div>
              <GoogleAd slot="right_side_slot" format="vertical" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
