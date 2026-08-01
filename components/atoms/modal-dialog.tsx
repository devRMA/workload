"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ModalDialogProps {
	isOpen: boolean;
	onClose: () => void;
	labelledBy: string;
	className?: string;
	children: ReactNode;
}

export function ModalDialog({
	isOpen,
	onClose,
	labelledBy,
	className,
	children,
}: ModalDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current as HTMLDialogElement;

		if (!isOpen) {
			if (dialog.open) {
				dialog.close();
			}
			return;
		}

		const closeOnBackdropClick = (event: MouseEvent) => {
			if (event.target === dialog) {
				dialog.close();
			}
		};

		dialog.addEventListener("click", closeOnBackdropClick);
		dialog.showModal();
		document.body.style.overflow = "hidden";

		return () => {
			dialog.removeEventListener("click", closeOnBackdropClick);
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<dialog
			ref={dialogRef}
			aria-modal="true"
			aria-labelledby={labelledBy}
			onClose={onClose}
			className="fixed inset-0 m-0 hidden h-full max-h-full w-full max-w-full items-center justify-center bg-transparent p-4 open:flex backdrop:bg-neutral-950/80 backdrop:backdrop-blur-sm"
		>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					className={cn(
						"relative max-h-full overflow-y-auto overscroll-contain",
						className,
					)}
				>
					{children}
				</motion.div>
			)}
		</dialog>
	);
}
