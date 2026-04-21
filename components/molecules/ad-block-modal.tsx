"use client";

import { Heart, ShieldAlert, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/atoms/button";

interface AdBlockModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export function AdBlockModal({
	isOpen,
	onClose,
	onConfirm,
}: AdBlockModalProps) {
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
						className="relative w-full max-w-lg overflow-hidden rounded-2xl border bg-white dark:bg-neutral-900 p-6 shadow-2xl md:p-8"
					>
						<button
							type="button"
							onClick={onClose}
							className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
						>
							<X size={20} />
						</button>

						<div className="space-y-8 text-center">
							<div className="relative mx-auto flex h-20 w-20 items-center justify-center">
								<div className="absolute inset-0 animate-pulse rounded-full bg-primary/20" />
								<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
									<Heart size={32} className="fill-primary/20" />
								</div>
							</div>

							<div className="space-y-3">
								<h2 className="text-3xl font-black tracking-tight">
									Opa! Uma ajudinha?
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									Este projeto é gratuito e mantido com carinho. Exibimos apenas{" "}
									<span className="font-bold text-foreground">
										um único anúncio por semana
									</span>{" "}
									— o suficiente para me ajudar a pagar um café e continuar
									codando! ☕
								</p>
							</div>

							<div className="rounded-2xl bg-muted/50 p-6 text-left border border-primary/10">
								<div className="flex items-start gap-4">
									<div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background shadow-sm">
										<ShieldAlert size={20} className="text-primary" />
									</div>
									<div className="space-y-1">
										<p className="text-sm font-bold">
											Prometemos não ser chatos
										</p>
										<p className="text-xs text-muted-foreground leading-relaxed">
											Sua visualização semanal garante que o WorkLoad continue
											online e evoluindo para todos.
										</p>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-4 pt-2">
								<Button
									onClick={onConfirm}
									className="h-12 text-base font-bold shadow-lg shadow-primary/20 gap-2"
								>
									Já desativei, pode contar comigo!
								</Button>
								<button
									type="button"
									onClick={onClose}
									className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
								>
									Continuar com AdBlock ativo
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
