"use client";

import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { cn } from "@/lib/utils";
import { MaskedInput } from "../atoms/masked-input";

const BR_DATE_GROUPS = [2, 2, 4] as const;
const TIME_GROUPS = [2, 2] as const;
const BR_DATE_FORMAT = "dd/MM/yyyy";
const ISO_DATE_FORMAT = "yyyy-MM-dd";
const FIELD_CLASSES =
	"h-14 focus-visible:ring-indigo-500 placeholder:text-neutral-500 dark:placeholder:text-neutral-400";

const toBRDate = (isoDate: string) => {
	if (!isoDate) return "";
	const [year, month, day] = isoDate.split("-");
	if (!year || !month || !day) return isoDate;
	return `${day}/${month}/${year}`;
};

const fromBRDate = (brDate: string) => {
	const [day, month, year] = brDate.split("/");
	return `${year}-${month}-${day}`;
};

const isRealBRDate = (brDate: string) => {
	const parsed = parse(brDate, BR_DATE_FORMAT, new Date());
	return isValid(parsed) && format(parsed, BR_DATE_FORMAT) === brDate;
};

const isRealTime = (time: string) => {
	const [hours, minutes] = time.split(":").map(Number);
	return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
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

	const handleDateCommit = (brDate: string) => {
		onChange(`${fromBRDate(brDate)}T${timePart || "00:00"}`);
	};

	const handleTimeCommit = (time: string) => {
		onChange(`${datePart || format(new Date(), ISO_DATE_FORMAT)}T${time}`);
	};

	return (
		<div className={cn("space-y-3", className)}>
			<label
				htmlFor={inputId}
				className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400"
			>
				<Icon className="w-4 h-4" aria-hidden="true" />
				{label}
			</label>
			<div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
				<div className="flex-1 min-w-0">
					<MaskedInput
						id={inputId}
						placeholder="DD/MM/AAAA"
						value={toBRDate(datePart)}
						separator="/"
						groupSizes={BR_DATE_GROUPS}
						isValid={isRealBRDate}
						onCommit={handleDateCommit}
						className={FIELD_CLASSES}
					/>
				</div>
				<div className="w-full sm:w-32 shrink-0">
					<MaskedInput
						placeholder="HH:mm"
						aria-label={`Hora para ${label}`}
						value={timePart || ""}
						separator=":"
						groupSizes={TIME_GROUPS}
						isValid={isRealTime}
						onCommit={handleTimeCommit}
						className={FIELD_CLASSES}
					/>
				</div>
			</div>
		</div>
	);
}
