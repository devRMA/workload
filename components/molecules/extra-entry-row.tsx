"use client";

import { Trash2 } from "lucide-react";
import { formatCurrencySimple, parseCurrency } from "@/lib/utils";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";

const COMPACT_FIELD_CLASSES = "h-12 rounded-xl text-sm";

interface ExtraEntryRowProps {
	name: string;
	value: number;
	nameLabel: string;
	namePlaceholder: string;
	valueLabel: string;
	removeLabel: string;
	onNameChange: (name: string) => void;
	onValueChange: (value: number) => void;
	onRemove: () => void;
}

export function ExtraEntryRow({
	name,
	value,
	nameLabel,
	namePlaceholder,
	valueLabel,
	removeLabel,
	onNameChange,
	onValueChange,
	onRemove,
}: ExtraEntryRowProps) {
	return (
		<div className="flex gap-3">
			<div className="flex-1 min-w-0">
				<Input
					type="text"
					aria-label={nameLabel}
					placeholder={namePlaceholder}
					value={name}
					onChange={(event) => onNameChange(event.target.value)}
					className={COMPACT_FIELD_CLASSES}
				/>
			</div>
			<div className="w-24 sm:w-32 shrink-0">
				<Input
					type="text"
					inputMode="numeric"
					aria-label={valueLabel}
					placeholder="Valor"
					value={formatCurrencySimple(value)}
					onChange={(event) => onValueChange(parseCurrency(event.target.value))}
					className={COMPACT_FIELD_CLASSES}
				/>
			</div>
			<Button
				variant="danger"
				size="icon"
				type="button"
				aria-label={removeLabel}
				onClick={onRemove}
				className="shrink-0"
			>
				<Trash2 className="w-4 h-4" aria-hidden="true" />
			</Button>
		</div>
	);
}
