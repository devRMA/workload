"use client";

import { Heart, ShieldAlert, X } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { ModalDialog } from "@/components/atoms/modal-dialog";

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
		<ModalDialog
			isOpen={isOpen}
			onClose={onClose}
			labelledBy="ad-block-modal-title"
			className="w-full max-w-lg rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] md:p-8"
		>
			<Button
				variant="ghost"
				size="icon"
				onClick={onClose}
				aria-label="Fechar aviso do bloqueador de anúncios"
				className="absolute right-2 top-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
			>
				<X size={20} aria-hidden="true" />
			</Button>

			<div className="space-y-8 text-center">
				<div className="relative mx-auto flex h-20 w-20 items-center justify-center">
					<div
						aria-hidden="true"
						className="absolute inset-0 animate-pulse rounded-full bg-indigo-500/20"
					/>
					<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
						<Heart
							size={32}
							aria-hidden="true"
							className="fill-indigo-500/20"
						/>
					</div>
				</div>

				<div className="space-y-3">
					<h2
						id="ad-block-modal-title"
						className="text-3xl font-black tracking-tight"
					>
						Opa! Uma ajudinha?
					</h2>
					<p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
						Este projeto é gratuito e mantido com carinho. Exibimos apenas{" "}
						<span className="font-bold text-neutral-900 dark:text-neutral-50">
							um único anúncio por semana
						</span>{" "}
						— o suficiente para me ajudar a pagar um café e continuar codando!
						☕
					</p>
				</div>

				<div className="rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 p-6 text-left border border-indigo-500/10">
					<div className="flex items-start gap-4">
						<div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-neutral-950 shadow-sm">
							<ShieldAlert
								size={20}
								aria-hidden="true"
								className="text-indigo-600 dark:text-indigo-400"
							/>
						</div>
						<div className="space-y-1">
							<p className="text-sm font-bold">Prometemos não ser chatos</p>
							<p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
								Sua visualização semanal garante que o WorkLoad continue online
								e evoluindo para todos.
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-4 pt-2">
					<Button
						onClick={onConfirm}
						className="h-12 text-base font-bold shadow-lg shadow-indigo-500/20 gap-2"
					>
						Já desativei, pode contar comigo!
					</Button>
					<button
						type="button"
						onClick={onClose}
						className="min-h-11 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
					>
						Continuar com AdBlock ativo
					</button>
				</div>
			</div>
		</ModalDialog>
	);
}
