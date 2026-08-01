import type { ElementType } from "react";
import { cn } from "@/lib/utils";

const MINUTES_PER_HOUR = 60;

function formatHoursAndMinutes(minutes: number): string {
	const hours = Math.floor(minutes / MINUTES_PER_HOUR);
	const remainingMinutes = Math.round(minutes % MINUTES_PER_HOUR);
	return `${hours}h ${remainingMinutes}m`;
}

interface DurationRowProps {
	icon: ElementType;
	iconClassName: string;
	label: string;
	minutes: number;
}

export function DurationRow({
	icon: Icon,
	iconClassName,
	label,
	minutes,
}: DurationRowProps) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2 text-sm text-neutral-500 4k:text-2xl">
				<Icon
					className={cn("w-4 h-4 4k:w-8 4k:h-8", iconClassName)}
					aria-hidden="true"
				/>
				{label}
			</div>
			<span className="font-bold 4k:text-3xl">
				{formatHoursAndMinutes(minutes)}
			</span>
		</div>
	);
}
