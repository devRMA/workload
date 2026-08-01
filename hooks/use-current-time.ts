"use client";

import { useEffect, useState } from "react";

const TICK_INTERVAL_MS = 1000;

export function useCurrentTime(): Date | null {
	const [currentTime, setCurrentTime] = useState<Date | null>(null);

	useEffect(() => {
		setCurrentTime(new Date());
		const timer = setInterval(
			() => setCurrentTime(new Date()),
			TICK_INTERVAL_MS,
		);
		return () => clearInterval(timer);
	}, []);

	return currentTime;
}
