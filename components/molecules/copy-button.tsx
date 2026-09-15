"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type CopyStatus = "idle" | "copied" | "failed";

const STATUS_MESSAGES: Record<CopyStatus, string> = {
  idle: "",
  copied: "Copiado!",
  failed: "Não foi possível copiar",
};

const STATUS_RESET_MS: Record<Exclude<CopyStatus, "idle">, number> = {
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
    <div className="flex items-center gap-sm">
      <span role="status" className="text-caption font-semibold text-right empty:hidden">
        {STATUS_MESSAGES[status]}
      </span>
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={handleCopy}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-onfill/10 transition-[background-color,transform] duration-(--duration-fast) ease-standard hover:bg-ink-onfill/20 active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-onfill"
      >
        {status === "copied" ? (
          <IconCheck className="h-5 w-5" aria-hidden="true" />
        ) : (
          <IconCopy className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
