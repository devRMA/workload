"use client";

import { Cookie, Shield, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/button";

const CONSENT_KEY = "workload_cookie_consent";

export function CookieConsent() {
	const [isVisible, setIsVisible] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [telemetryEnabled, setTelemetryEnabled] = useState(true);

	useEffect(() => {
		const consent = localStorage.getItem(CONSENT_KEY);
		if (!consent) {
			setTimeout(() => setIsVisible(true), 1500);
		} else {
			const { telemetry } = JSON.parse(consent);
			setTelemetryEnabled(telemetry);
		}
	}, []);

	const saveConsent = (telemetry: boolean) => {
		localStorage.setItem(
			CONSENT_KEY,
			JSON.stringify({
				telemetry,
				timestamp: Date.now(),
			}),
		);
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
									<Cookie size={32} />
								</div>

								<div className="flex-1 space-y-1 text-center md:text-left">
									<h3 className="text-xl font-black tracking-tight">
										Respeitamos sua privacidade
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										Usamos cookies para melhorar sua experiência e entender como
										você usa o WorkLoad. Você pode optar por desativar a
										telemetria a qualquer momento.
									</p>
								</div>

								<div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
									<button
										type="button"
										onClick={() => setShowSettings(true)}
										className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
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

			<AnimatePresence>
				{showSettings && (
					<div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setShowSettings(false)}
							className="absolute inset-0 bg-background/80 backdrop-blur-sm"
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-8 shadow-2xl"
						>
							<button
								type="button"
								onClick={() => setShowSettings(false)}
								className="absolute right-6 top-6 text-muted-foreground hover:text-foreground transition-colors"
							>
								<X size={20} />
							</button>

							<div className="space-y-8">
								<div className="flex items-center gap-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
										<Shield size={24} />
									</div>
									<h2 className="text-2xl font-black tracking-tight">
										Privacidade
									</h2>
								</div>

								<div className="space-y-6">
									<div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-neutral-200 dark:border-neutral-800">
										<div className="space-y-1">
											<p className="font-bold">Cookies Essenciais</p>
											<p className="text-xs text-muted-foreground">
												Necessários para o funcionamento do site.
											</p>
										</div>
										<div className="h-6 w-11 rounded-full bg-indigo-500 flex items-center px-1">
											<div className="h-4 w-4 rounded-full bg-white ml-auto" />
										</div>
									</div>

									<div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-neutral-200 dark:border-neutral-800">
										<div className="space-y-1">
											<p className="font-bold">Telemetria (Google Analytics)</p>
											<p className="text-xs text-muted-foreground">
												Ajuda a entender como o site é usado.
											</p>
										</div>
										<button
											type="button"
											onClick={() => setTelemetryEnabled(!telemetryEnabled)}
											className={`h-6 w-11 rounded-full transition-colors flex items-center px-1 ${
												telemetryEnabled
													? "bg-indigo-500"
													: "bg-neutral-300 dark:bg-neutral-700"
											}`}
										>
											<motion.div
												animate={{ x: telemetryEnabled ? 20 : 0 }}
												className="h-4 w-4 rounded-full bg-white shadow-sm"
											/>
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
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			{!isVisible && (
				<button
					type="button"
					onClick={() => setShowSettings(true)}
					className="fixed bottom-4 right-4 z-40 p-2 text-muted-foreground hover:text-indigo-500 transition-colors opacity-30 hover:opacity-100"
					aria-label="Configurações de Privacidade"
				>
					<Shield size={18} />
				</button>
			)}
		</>
	);
}
