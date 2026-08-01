export function readStoredNumber(key: string, fallback: number): number {
	const raw = localStorage.getItem(key);
	if (raw === null) return fallback;

	const parsed = Number(raw);
	return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export function readStoredList<TItem>(
	key: string,
	isItem: (candidate: unknown) => candidate is TItem,
): TItem[] {
	const raw = localStorage.getItem(key);
	if (raw === null) return [];

	try {
		const parsed: unknown = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter(isItem) : [];
	} catch {
		return [];
	}
}
