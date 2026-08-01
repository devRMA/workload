"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type CopyStatus = "idle" | "copied" | "failed";

const STATUS_MESSAGES: Record<CopyStatus, string> = {
	idle: "",
	copied: "Copiado!",
	failed: "Não foi possível copiar",
};

const STATUS_RESET_MS: Record<CopyStatus, number> = {
	idle: 0,
	copied: 2000,
	failed: 4000,
};

interface CopyButtonProps {
	value: string;
	label: string;
	onCopied?: () => void;
}

export function CopyButton({ value, label, onCopied }: CopyButtonProps) {
	const [status, setStatus] = useState<CopyStatus>("idle");

	useEffect(() => {
		if (status === "idle") return;

		const timer = setTimeout(() => setStatus("idle"), STATUS_RESET_MS[status]);
		return () => clearTimeout(timer);
	}, [status]);

	const handleCopy = async () => {
		if (typeof navigator.clipboard?.writeText !== "function") {
			setStatus("failed");
			return;
		}

		try {
			await navigator.clipboard.writeText(value);
			setStatus("copied");
			onCopied?.();
		} catch {
			setStatus("failed");
		}
	};

	return (
		<div className="flex items-center gap-3">
			<span
				role="status"
				className="text-xs font-bold text-right 4k:text-xl empty:hidden"
			>
				{STATUS_MESSAGES[status]}
			</span>
			<button
				type="button"
				aria-label={label}
				title={label}
				onClick={handleCopy}
				className="p-4 lg:p-2 bg-white/10 hover:bg-white/20 rounded-2xl lg:rounded-lg transition-colors active:scale-95 4k:p-4 4k:rounded-xl"
			>
				{status === "copied" ? (
					<Check
						className="w-6 h-6 lg:w-5 lg:h-5 4k:w-10 4k:h-10"
						aria-hidden="true"
					/>
				) : (
					<Copy
						className="w-6 h-6 lg:w-5 lg:h-5 4k:w-10 4k:h-10"
						aria-hidden="true"
					/>
				)}
			</button>
		</div>
	);
}
