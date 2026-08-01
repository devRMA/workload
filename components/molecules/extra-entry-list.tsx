"use client";

import { PlusCircle } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../atoms/button";

interface ExtraEntryListProps {
	listId: string;
	label: string;
	addLabel: string;
	addButtonClassName?: string;
	onAdd: () => void;
	children: ReactNode;
}

export function ExtraEntryList({
	listId,
	label,
	addLabel,
	addButtonClassName,
	onAdd,
	children,
}: ExtraEntryListProps) {
	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
					{label}
				</p>
				<Button
					variant="outline"
					size="sm"
					aria-label={addLabel}
					onClick={onAdd}
					className={cn("gap-2", addButtonClassName)}
				>
					<PlusCircle className="w-4 h-4" aria-hidden="true" /> Adicionar
				</Button>
			</div>
			<div id={listId} className="space-y-3">
				{children}
			</div>
		</div>
	);
}
