"use client";

import { PlayCircle, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { GoogleAd } from "@/components/molecules/google-ad";

interface VideoAdModalProps {
	isOpen: boolean;
	onClose: () => void;
	onComplete: () => void;
}

export function VideoAdModal({
	isOpen,
	onClose,
	onComplete,
}: VideoAdModalProps) {
	const [step, setStep] = useState<"alert" | "video">("alert");
	const [videoFinished, setVideoFinished] = useState(false);

	const handleStartVideo = () => {
		setStep("video");
		setTimeout(() => {
			setVideoFinished(true);
		}, 15000);
	};

	const handleFinish = () => {
		onComplete();
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 bg-background/90 backdrop-blur-md"
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						className="relative w-full max-w-2xl overflow-hidden rounded-3xl border bg-card p-0 shadow-2xl"
					>
						{step === "alert" ? (
							<div className="p-8 text-center space-y-8">
								<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
									<PlayCircle size={48} />
								</div>
								<div className="space-y-4">
									<h2 className="text-3xl font-black tracking-tight">
										Vídeo da Semana
									</h2>
									<p className="text-muted-foreground text-lg leading-relaxed">
										Para manter o WorkLoad 100% gratuito para todos, exibimos
										apenas{" "}
										<span className="font-bold text-foreground">
											um único vídeo por semana
										</span>
										. Sua ajuda é fundamental!
									</p>
								</div>
								<div className="flex items-center justify-center gap-2 text-sm text-emerald-500 font-medium">
									<ShieldCheck size={16} />
									Prometemos: Sem popups chatos depois disso.
								</div>
								<div className="flex flex-col gap-3">
									<Button
										onClick={handleStartVideo}
										size="lg"
										className="h-14 text-lg font-bold gap-2"
									>
										<PlayCircle size={20} />
										Ver vídeo e apoiar o projeto
									</Button>
									<button
										type="button"
										onClick={onClose}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
									>
										Agora não, obrigado
									</button>
								</div>
							</div>
						) : (
							<div className="relative aspect-video w-full bg-black">
								{!videoFinished && (
									<div className="absolute top-4 right-4 z-10">
										<div className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/20">
											Você poderá fechar em instantes...
										</div>
									</div>
								)}
								{videoFinished && (
									<button
										type="button"
										onClick={handleFinish}
										className="absolute top-4 right-4 z-20 bg-white text-black p-2 rounded-full shadow-xl hover:scale-110 transition-transform"
									>
										<X size={20} />
									</button>
								)}
								<div className="h-full w-full flex items-center justify-center text-white">
									<GoogleAd
										slot="video_ad_slot"
										format="fluid"
										className="h-full w-full"
									/>
								</div>
							</div>
						)}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
