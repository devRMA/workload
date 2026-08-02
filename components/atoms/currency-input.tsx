"use client";

import * as React from "react";
import { formatCurrencySimple, parseCurrency } from "@/lib/utils";
import { Input, type InputProps } from "./input";

const NON_DIGITS = /\D/g;

function countDigits(text: string): number {
  return text.replace(NON_DIGITS, "").length;
}

function caretAfterDigits(text: string, digitsFromStart: number): number {
  let seenDigits = 0;
  let caret = 0;

  while (caret < text.length && seenDigits < digitsFromStart) {
    if (countDigits(text[caret]) === 1) seenDigits += 1;
    caret += 1;
  }

  return caret;
}

export interface CurrencyInputProps extends Omit<InputProps, "value" | "onChange" | "type"> {
  value: number | null;
  onValueChange: (rawValue: string) => void;
}

export function CurrencyInput({ value, onValueChange, ...inputProps }: CurrencyInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const pendingCaretDigits = React.useRef<number | null>(null);

  const displayValue = value === null ? "" : formatCurrencySimple(value);

  React.useLayoutEffect(() => {
    const input = inputRef.current;
    const digitsFromStart = pendingCaretDigits.current;
    pendingCaretDigits.current = null;

    if (input === null || digitsFromStart === null || document.activeElement !== input) return;

    const caret = caretAfterDigits(input.value, digitsFromStart);
    input.setSelectionRange(caret, caret);
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = event.target.value;
    const digitsBeforeCaret = countDigits(typedValue.slice(0, Number(event.target.selectionStart)));
    const digitsAfterCaret = countDigits(typedValue) - digitsBeforeCaret;

    onValueChange(typedValue);
    pendingCaretDigits.current = Math.max(
      0,
      countDigits(formatCurrencySimple(parseCurrency(typedValue))) - digitsAfterCaret,
    );
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      inputMode="decimal"
      value={displayValue}
      onChange={handleChange}
      {...inputProps}
    />
  );
}
