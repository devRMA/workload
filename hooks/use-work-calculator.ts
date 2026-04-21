import { addMinutes, differenceInMinutes, format, isValid } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export function calculateWorkStats(
	entry: string,
	lunchStart: string,
	lunchEnd: string,
	displayExit: string,
	workMinutes: number,
) {
	try {
		const entryDate = new Date(entry);
		const lunchStartDate = new Date(lunchStart);
		const lunchEndDate = new Date(lunchEnd);
		const exitDate = new Date(displayExit);

		if (
			!isValid(entryDate) ||
			!isValid(lunchStartDate) ||
			!isValid(lunchEndDate) ||
			!isValid(exitDate) ||
			entryDate > lunchStartDate ||
			lunchStartDate > lunchEndDate ||
			lunchEndDate > exitDate
		) {
			return {
				balance: 0,
				nightMinutes: 0,
				overtime75: 0,
				overtime100: 0,
				totalWorked: 0,
			};
		}

		const morningMinutes = differenceInMinutes(lunchStartDate, entryDate);
		const afternoonMinutes = differenceInMinutes(exitDate, lunchEndDate);
		const totalWorked = morningMinutes + afternoonMinutes;

		let nightMinutesReal = 0;
		const currentDay = new Date(entryDate);
		currentDay.setHours(0, 0, 0, 0);
		currentDay.setDate(currentDay.getDate() - 1);

		while (currentDay <= exitDate) {
			const nightStart = new Date(currentDay);
			nightStart.setHours(22, 0, 0, 0);
			const nightEnd = new Date(currentDay);
			nightEnd.setDate(nightEnd.getDate() + 1);
			nightEnd.setHours(5, 0, 0, 0);

			const workStart = new Date(
				Math.max(nightStart.getTime(), entryDate.getTime()),
			);
			const workEnd = new Date(
				Math.min(nightEnd.getTime(), exitDate.getTime()),
			);

			if (workStart < workEnd) {
				let overlap = differenceInMinutes(workEnd, workStart);
				const lunchOverlapStart = new Date(
					Math.max(workStart.getTime(), lunchStartDate.getTime()),
				);
				const lunchOverlapEnd = new Date(
					Math.min(workEnd.getTime(), lunchEndDate.getTime()),
				);

				if (lunchOverlapStart < lunchOverlapEnd) {
					overlap -= differenceInMinutes(lunchOverlapEnd, lunchOverlapStart);
				}
				nightMinutesReal += overlap;
			}
			currentDay.setDate(currentDay.getDate() + 1);
		}

		const nightMinutesEquivalent = Math.round(nightMinutesReal * (60 / 52.5));
		const nightBonusMinutes = nightMinutesEquivalent - nightMinutesReal;

		const totalWorkedWithReduction = totalWorked + nightBonusMinutes;
		const balance = totalWorkedWithReduction - workMinutes;

		const overtimeMinutes = Math.max(0, balance);
		let overtime75 = 0;
		let overtime100 = 0;

		const dayOfWeek = entryDate.getDay();
		const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

		if (isWeekend) {
			overtime100 = overtimeMinutes;
			overtime75 = 0;
		} else {
			if (overtimeMinutes <= 120) {
				overtime75 = overtimeMinutes;
				overtime100 = 0;
			} else {
				overtime75 = 120;
				overtime100 = overtimeMinutes - 120;
			}
		}

		return {
			balance,
			nightMinutes: nightMinutesEquivalent,
			overtime75,
			overtime100,
			totalWorked: totalWorkedWithReduction,
		};
	} catch (_e) {
		return {
			balance: 0,
			nightMinutes: 0,
			overtime75: 0,
			overtime100: 0,
			totalWorked: 0,
		};
	}
}

export function calculateSuggestedExit(
	entry: string,
	lunchStart: string,
	lunchEnd: string,
	workMinutes: number,
) {
	try {
		const entryDate = new Date(entry);
		const lunchStartDate = new Date(lunchStart);
		const lunchEndDate = new Date(lunchEnd);

		if (
			!isValid(entryDate) ||
			!isValid(lunchStartDate) ||
			!isValid(lunchEndDate) ||
			entryDate > lunchStartDate ||
			lunchStartDate > lunchEndDate
		)
			return entry;

		const morningMinutes = differenceInMinutes(lunchStartDate, entryDate);
		const remainingMinutes = workMinutes - morningMinutes;
		const exitDate = addMinutes(lunchEndDate, remainingMinutes);

		return format(exitDate, "yyyy-MM-dd'T'HH:mm");
	} catch (_e) {
		return entry;
	}
}

const DEFAULT_WORK_MINUTES = 8 * 60 + 48; // 8h 48m
const getTodayAt = (time: string) => {
	const [h, m] = time.split(":").map(Number);
	const d = new Date();
	d.setHours(h, m, 0, 0);
	return format(d, "yyyy-MM-dd'T'HH:mm");
};

export function useWorkCalculator() {
	const [workMinutes, setWorkMinutes] = useState(DEFAULT_WORK_MINUTES);
	const [entry, setEntry] = useState(() => getTodayAt("08:00"));
	const [lunchStart, setLunchStart] = useState(() => getTodayAt("12:00"));
	const [lunchEnd, setLunchEnd] = useState(() => getTodayAt("13:00"));
	const [exitOverride, setExitOverride] = useState("");
	const [isManualExit, setIsManualExit] = useState(false);

	useEffect(() => {
		const savedWorkMinutes = localStorage.getItem("workMinutes");
		const savedEntry = localStorage.getItem("entry");
		const savedLunchStart = localStorage.getItem("lunchStart");
		const savedLunchEnd = localStorage.getItem("lunchEnd");

		if (savedWorkMinutes) {
			const parsed = parseInt(savedWorkMinutes, 10);
			setWorkMinutes(Number.isNaN(parsed) ? DEFAULT_WORK_MINUTES : parsed);
		}

		const isValidISO = (str: string | null) =>
			str?.includes("T") && isValid(new Date(str));

		if (savedEntry && isValidISO(savedEntry)) setEntry(savedEntry);
		if (savedLunchStart && isValidISO(savedLunchStart))
			setLunchStart(savedLunchStart);
		if (savedLunchEnd && isValidISO(savedLunchEnd)) setLunchEnd(savedLunchEnd);
	}, []);

	useEffect(() => {
		localStorage.setItem("workMinutes", workMinutes.toString());
		localStorage.setItem("entry", entry);
		localStorage.setItem("lunchStart", lunchStart);
		localStorage.setItem("lunchEnd", lunchEnd);
	}, [workMinutes, entry, lunchStart, lunchEnd]);

	const suggestedExit = useMemo(
		() => calculateSuggestedExit(entry, lunchStart, lunchEnd, workMinutes),
		[entry, lunchStart, lunchEnd, workMinutes],
	);

	const displayExit = isManualExit ? exitOverride : suggestedExit;

	const stats = useMemo(
		() =>
			calculateWorkStats(entry, lunchStart, lunchEnd, displayExit, workMinutes),
		[entry, lunchStart, lunchEnd, displayExit, workMinutes],
	);

	const resetDefaults = () => {
		setWorkMinutes(DEFAULT_WORK_MINUTES);
		setEntry(getTodayAt("08:00"));
		setLunchStart(getTodayAt("12:00"));
		setLunchEnd(getTodayAt("13:00"));
		setIsManualExit(false);
		setExitOverride("");
	};

	return {
		workMinutes,
		setWorkMinutes,
		entry,
		setEntry,
		lunchStart,
		setLunchStart,
		lunchEnd,
		setLunchEnd,
		exitOverride,
		setExitOverride,
		isManualExit,
		setIsManualExit,
		suggestedExit,
		displayExit,
		stats,
		resetDefaults,
	};
}
