"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ShieldAlert, Heart, PlayCircle } from "lucide-react";
import { Button } from "@/components/atoms/button";

interface AdBlockModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export function AdBlockModal({ isOpen, onClose, onConfirm }: AdBlockModalProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-background/80 backdrop-blur-sm"
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className="relative w-full max-w-lg overflow-hidden rounded-2xl border bg-card p-6 shadow-2xl md:p-8"
					>
						<button
							onClick={onClose}
							className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
						>
							<X size={20} />
						</button>

						<div className="space-y-6 text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
								<ShieldAlert size={32} />
							</div>

							<div className="space-y-2">
								<h2 className="text-2xl font-bold tracking-tight">Detectamos AdBlock!</h2>
								<p className="text-muted-foreground">
									Os anúncios nos ajudam a manter este projeto gratuito e em constante evolução.
								</p>
							</div>

							<div className="rounded-xl bg-muted/50 p-4 text-left">
								<div className="flex items-start gap-3">
									<div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background">
										<PlayCircle size={18} className="text-primary" />
									</div>
									<div className="space-y-1">
										<p className="text-sm font-semibold">Exibimos apenas 1 ad por semana!</p>
										<p className="text-xs text-muted-foreground">
											Prometemos não ser chatos. Um vídeo curto uma vez por semana garante que continuemos online.
										</p>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-3 sm:flex-row">
								<Button onClick={onConfirm} className="flex-1 gap-2">
									<Heart size={18} />
									Já desativei o AdBlock
								</Button>
								<Button variant="outline" onClick={onClose} className="flex-1">
									Continuar com AdBlock
								</Button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
