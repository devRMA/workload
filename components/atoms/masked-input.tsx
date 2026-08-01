"use client";

import * as React from "react";
import { Input, type InputProps } from "./input";

const NON_DIGITS = /\D/g;

function applyMask(
	digits: string,
	groupSizes: readonly number[],
	separator: string,
): string {
	const groups: string[] = [];
	let cursor = 0;

	for (const size of groupSizes) {
		if (cursor >= digits.length) break;
		groups.push(digits.slice(cursor, cursor + size));
		cursor += size;
	}

	return groups.join(separator);
}

export interface MaskedInputProps
	extends Omit<InputProps, "value" | "onChange" | "onBlur"> {
	value: string;
	separator: string;
	groupSizes: readonly number[];
	isValid: (maskedValue: string) => boolean;
	onCommit: (maskedValue: string) => void;
}

export function MaskedInput({
	value,
	separator,
	groupSizes,
	isValid,
	onCommit,
	...inputProps
}: MaskedInputProps) {
	const [text, setText] = React.useState(value);
	const [lastValue, setLastValue] = React.useState(value);

	if (value !== lastValue) {
		setLastValue(value);
		setText(value);
	}

	const requiredDigits = groupSizes.reduce((total, size) => total + size, 0);

	const commitWhenComplete = (maskedValue: string) => {
		const digits = maskedValue.replace(NON_DIGITS, "");
		if (digits.length !== requiredDigits || !isValid(maskedValue)) return false;

		onCommit(maskedValue);
		return true;
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const digits = event.target.value
			.replace(NON_DIGITS, "")
			.slice(0, requiredDigits);
		const maskedValue = applyMask(digits, groupSizes, separator);

		setText(maskedValue);
		commitWhenComplete(maskedValue);
	};

	const handleBlur = () => {
		if (!commitWhenComplete(text)) setText(value);
	};

	return (
		<Input
			type="text"
			inputMode="numeric"
			value={text}
			onChange={handleChange}
			onBlur={handleBlur}
			{...inputProps}
		/>
	);
}
