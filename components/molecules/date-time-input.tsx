import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { cn } from "@/lib/utils";

// Helper functions for Brazilian date format
const toBRDate = (isoDate: string) => {
	if (!isoDate) return "";
	const [y, m, d] = isoDate.split("-");
	if (!y || !m || !d) return isoDate;
	return `${d}/${m}/${y}`;
};

const fromBRDate = (brDate: string) => {
	if (!brDate) return "";
	const parts = brDate.split("/");
	if (parts.length !== 3) return "";
	const [d, m, y] = parts;
	if (y.length !== 4) return "";
	return `${y}-${m}-${d}`;
};

interface DateTimeInputProps {
	value: string;
	onChange: (val: string) => void;
	label: string;
	icon: React.ElementType;
	className?: string;
	id?: string;
}

export function DateTimeInput({
	value,
	onChange,
	label,
	icon: Icon,
	className = "",
	id,
}: DateTimeInputProps) {
	const generatedId = React.useId();
	const inputId = id || generatedId;
	const [datePart, timePart] = value.split("T");
	const [localDate, setLocalDate] = React.useState(toBRDate(datePart));
	const [localTime, setLocalTime] = React.useState(timePart || "");

	React.useEffect(() => {
		setLocalDate(toBRDate(datePart));
	}, [datePart]);

	React.useEffect(() => {
		setLocalTime(timePart || "");
	}, [timePart]);

	const handleDateChange = (newDate: string) => {
		onChange(
			`${newDate || format(new Date(), "yyyy-MM-dd")}T${localTime || "00:00"}`,
		);
	};

	const handleTimeChange = (newTime: string) => {
		onChange(`${datePart || format(new Date(), "yyyy-MM-dd")}T${newTime}`);
	};

	return (
		<div className={cn("space-y-3", className)}>
			<label
				htmlFor={inputId}
				className="flex items-center gap-2 text-sm font-medium text-neutral-500 4k:text-2xl"
			>
				<Icon className="w-4 h-4 4k:w-8 4k:h-8" aria-hidden="true" />
				{label}
			</label>
			<div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
				<div className="relative flex-1 min-w-0 group">
					<input
						id={inputId}
						type="text"
						inputMode="numeric"
						placeholder="DD/MM/AAAA"
						value={localDate}
						onChange={(e) => {
							let val = e.target.value.replace(/\D/g, "");
							if (val.length > 8) val = val.slice(0, 8);
							if (val.length >= 5) {
								val = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4)}`;
							} else if (val.length >= 3) {
								val = `${val.slice(0, 2)}/${val.slice(2)}`;
							}
							setLocalDate(val);
							if (val.length === 10) handleDateChange(fromBRDate(val));
						}}
						onBlur={() => {
							if (localDate.length === 10) {
								const d = parse(localDate, "dd/MM/yyyy", new Date());
								if (isValid(d) && format(d, "dd/MM/yyyy") === localDate) {
									handleDateChange(fromBRDate(localDate));
									return;
								}
							}
							setLocalDate(toBRDate(datePart));
						}}
						className="flex h-14 4k:h-20 w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-4 py-2 text-lg 4k:text-2xl 4k:px-6 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all font-mono"
					/>
				</div>
				<div className="relative w-full sm:w-32 4k:w-48 shrink-0 group">
					<input
						type="text"
						inputMode="numeric"
						placeholder="HH:mm"
						aria-label={`Hora para ${label}`}
						value={localTime}
						onChange={(e) => {
							let val = e.target.value.replace(/\D/g, "");
							if (val.length > 4) val = val.slice(0, 4);
							if (val.length >= 3) {
								val = `${val.slice(0, 2)}:${val.slice(2)}`;
							}
							setLocalTime(val);
						}}
						onBlur={() => {
							if (localTime.length === 5) {
								const [h, m] = localTime.split(":").map(Number);
								if (h >= 0 && h < 24 && m >= 0 && m < 60) {
									handleTimeChange(localTime);
									return;
								}
							}
							setLocalTime(timePart || "");
						}}
						className="flex h-14 4k:h-20 w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-4 py-2 text-lg 4k:text-2xl 4k:px-6 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all font-mono"
					/>
				</div>
			</div>
		</div>
	);
}
