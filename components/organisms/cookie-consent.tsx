"use client";

import { IconCookie, IconShield, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/button";
import { ModalDialog } from "@/components/atoms/modal-dialog";
import { CONSENT_CHANGED_EVENT, readTelemetryConsent, writeTelemetryConsent } from "@/lib/consent";

const BANNER_DELAY_MS = 1500;

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [telemetryEnabled, setTelemetryEnabled] = useState(true);

  useEffect(() => {
    const storedConsent = readTelemetryConsent();
    if (storedConsent !== null) {
      setTelemetryEnabled(storedConsent);
      return;
    }

    const timer = setTimeout(() => setIsVisible(true), BANNER_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const saveConsent = (telemetry: boolean) => {
    writeTelemetryConsent(telemetry);
    setTelemetryEnabled(telemetry);
    setIsVisible(false);
    setShowSettings(false);
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: { telemetry } }));
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-[max(calc(var(--spacing)*6),env(safe-area-inset-bottom))] left-6 right-6 z-60 mx-auto max-w-4xl"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-raised edge-lit">
              <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent-ink">
                  <IconCookie size={32} aria-hidden="true" />
                </div>

                <div className="flex-1 space-y-1 text-center md:text-left">
                  <h2 className="text-title">Respeitamos sua privacidade</h2>
                  <p className="text-body-sm text-ink-muted">
                    Usamos cookies para melhorar sua experiência e entender como você usa o WorkLoad. Você pode optar
                    por desativar a telemetria a qualquer momento.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="min-h-11 rounded-md px-4 text-label text-ink-muted transition-colors duration-(--duration-fast) ease-standard hover:text-ink ring-focus"
                  >
                    Configurar
                  </button>
                  <Button variant="outline" onClick={() => saveConsent(false)} className="w-full sm:w-auto">
                    Recusar
                  </Button>
                  <Button onClick={() => saveConsent(true)} className="w-full sm:w-auto">
                    Aceitar Tudo
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ModalDialog
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        labelledBy="privacy-settings-title"
        className="w-full max-w-lg rounded-2xl border border-line bg-surface-raised p-8 shadow-raised edge-lit"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSettings(false)}
          aria-label="Fechar configurações de privacidade"
          className="absolute right-4 top-4"
        >
          <IconX size={20} aria-hidden="true" />
        </Button>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent-soft text-accent-ink">
              <IconShield size={24} aria-hidden="true" />
            </div>
            <h2 id="privacy-settings-title" className="text-display">
              Privacidade
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex min-h-11 flex-col items-start justify-between gap-4 p-4 rounded-lg bg-surface-sunken border border-line sm:flex-row sm:items-center">
              <div className="space-y-1">
                <p className="text-body font-semibold">Cookies Essenciais</p>
                <p className="text-caption text-ink-subtle">Necessários para o funcionamento do site.</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <p className="text-caption font-semibold text-accent-ink">Sempre ativo</p>
                <div aria-hidden="true" className="h-6 w-11 rounded-full bg-accent flex items-center px-1">
                  <div className="h-4 w-4 rounded-full bg-ink-onfill ml-auto" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 p-4 rounded-lg bg-surface-sunken border border-line sm:flex-row sm:items-center">
              <div className="space-y-1">
                <p id="telemetry-consent-label" className="text-body font-semibold">
                  Telemetria (Google Analytics)
                </p>
                <p className="text-caption text-ink-subtle">Ajuda a entender como o site é usado.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={telemetryEnabled}
                aria-labelledby="telemetry-consent-label"
                onClick={() => setTelemetryEnabled(!telemetryEnabled)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-focus"
              >
                <span
                  className={`h-6 w-11 rounded-full transition-colors duration-(--duration-fast) ease-standard flex items-center px-1 ${
                    telemetryEnabled ? "bg-accent" : "bg-line-strong"
                  }`}
                >
                  <motion.span
                    animate={{ x: telemetryEnabled ? 20 : 0 }}
                    className="block h-4 w-4 rounded-full bg-ink-onfill"
                  />
                </span>
              </button>
            </div>
          </div>

          <Button onClick={() => saveConsent(telemetryEnabled)} className="w-full h-14 text-input">
            Salvar Preferências
          </Button>
        </div>
      </ModalDialog>

      {!isVisible && (
        <button
          type="button"
          onClick={() => setShowSettings(true)}
          className="fixed bottom-[max(calc(var(--spacing)*4),env(safe-area-inset-bottom))] right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-chrome text-ink-muted shadow-card backdrop-blur-chrome transition-colors duration-(--duration-fast) ease-standard hover:text-accent-ink ring-focus"
          aria-label="Configurações de Privacidade"
        >
          <IconShield size={18} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
