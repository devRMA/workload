import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
}

export function formatCurrencySimple(value: number): string {
	return new Intl.NumberFormat("pt-BR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

export function parseCurrency(value: string): number {
	const cleanValue = value.replace(/\D/g, "");
	return Number(cleanValue) / 100;
}

export function formatMinutes(minutes: number): string {
	const isNegative = minutes < 0;
	const absMinutes = Math.abs(minutes);
	const h = Math.floor(absMinutes / 60);
	const m = Math.floor(absMinutes % 60);
	const sign = isNegative ? "-" : "";
	return `${sign}${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}
