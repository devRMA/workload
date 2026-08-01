"use client";

import { Cookie, Shield, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/button";
import { ModalDialog } from "@/components/atoms/modal-dialog";
import { readTelemetryConsent, writeTelemetryConsent } from "@/lib/consent";

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
		window.location.reload();
	};

	return (
		<>
			<AnimatePresence>
				{isVisible && (
					<motion.div
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						className="fixed bottom-6 left-6 right-6 z-[60] mx-auto max-w-4xl"
					>
						<div className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)]">
							<div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
								<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
									<Cookie size={32} aria-hidden="true" />
								</div>

								<div className="flex-1 space-y-1 text-center md:text-left">
									<h3 className="text-xl font-black tracking-tight">
										Respeitamos sua privacidade
									</h3>
									<p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
										Usamos cookies para melhorar sua experiência e entender como
										você usa o WorkLoad. Você pode optar por desativar a
										telemetria a qualquer momento.
									</p>
								</div>

								<div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
									<button
										type="button"
										onClick={() => setShowSettings(true)}
										className="min-h-11 px-4 text-sm font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
									>
										Configurar
									</button>
									<Button
										variant="outline"
										onClick={() => saveConsent(false)}
										className="w-full sm:w-auto h-12 px-6 font-bold"
									>
										Recusar
									</Button>
									<Button
										onClick={() => saveConsent(true)}
										className="w-full sm:w-auto h-12 px-8 font-bold shadow-lg shadow-indigo-500/20"
									>
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
				className="w-full max-w-lg rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-8 shadow-2xl"
			>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setShowSettings(false)}
					aria-label="Fechar configurações de privacidade"
					className="absolute right-4 top-4 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
				>
					<X size={20} aria-hidden="true" />
				</Button>

				<div className="space-y-8">
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
							<Shield size={24} aria-hidden="true" />
						</div>
						<h2
							id="privacy-settings-title"
							className="text-2xl font-black tracking-tight"
						>
							Privacidade
						</h2>
					</div>

					<div className="space-y-6">
						<div className="flex min-h-11 items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
							<div className="space-y-1">
								<p className="font-bold">Cookies Essenciais</p>
								<p className="text-xs text-neutral-500 dark:text-neutral-400">
									Necessários para o funcionamento do site.
								</p>
							</div>
							<div className="flex shrink-0 items-center gap-3">
								<p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
									Sempre ativo
								</p>
								<div
									aria-hidden="true"
									className="h-6 w-11 rounded-full bg-indigo-500 flex items-center px-1"
								>
									<div className="h-4 w-4 rounded-full bg-white ml-auto" />
								</div>
							</div>
						</div>

						<div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
							<div className="space-y-1">
								<p id="telemetry-consent-label" className="font-bold">
									Telemetria (Google Analytics)
								</p>
								<p className="text-xs text-neutral-500 dark:text-neutral-400">
									Ajuda a entender como o site é usado.
								</p>
							</div>
							<button
								type="button"
								role="switch"
								aria-checked={telemetryEnabled}
								aria-labelledby="telemetry-consent-label"
								onClick={() => setTelemetryEnabled(!telemetryEnabled)}
								className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
							>
								<span
									className={`h-6 w-11 rounded-full transition-colors flex items-center px-1 ${
										telemetryEnabled
											? "bg-indigo-500"
											: "bg-neutral-300 dark:bg-neutral-700"
									}`}
								>
									<motion.span
										animate={{ x: telemetryEnabled ? 20 : 0 }}
										className="block h-4 w-4 rounded-full bg-white shadow-sm"
									/>
								</span>
							</button>
						</div>
					</div>

					<Button
						onClick={() => saveConsent(telemetryEnabled)}
						className="w-full h-14 text-lg font-bold"
					>
						Salvar Preferências
					</Button>
				</div>
			</ModalDialog>

			{!isVisible && (
				<button
					type="button"
					onClick={() => setShowSettings(true)}
					className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 dark:text-neutral-400 hover:text-indigo-500 transition-colors opacity-30 hover:opacity-100"
					aria-label="Configurações de Privacidade"
				>
					<Shield size={18} aria-hidden="true" />
				</button>
			)}
		</>
	);
}
