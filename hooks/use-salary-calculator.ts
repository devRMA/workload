import { useEffect, useMemo, useState } from "react";

export interface ExtraItem {
	id: string;
	name: string;
	value: number;
}

export function calculateInss(salary: number): number {
	const brackets = [
		{ limit: 1518.0, rate: 0.075 },
		{ limit: 2793.88, rate: 0.09 },
		{ limit: 4190.83, rate: 0.12 },
		{ limit: 8157.41, rate: 0.14 },
	];

	let inss = 0;
	const remaining = Math.min(salary, 8157.41);
	let lastLimit = 0;

	for (const bracket of brackets) {
		if (remaining > lastLimit) {
			const amountInBracket = Math.min(remaining, bracket.limit) - lastLimit;
			inss += amountInBracket * bracket.rate;
			lastLimit = bracket.limit;
		} else {
			break;
		}
	}

	return Number(inss.toFixed(2));
}

export function calculateIrrf(salary: number, inssAmount: number): number {
	const base = salary - inssAmount;
	const brackets = [
		{ limit: 2259.2, rate: 0, deduction: 0 },
		{ limit: 2826.65, rate: 0.075, deduction: 169.44 },
		{ limit: 3751.05, rate: 0.15, deduction: 381.44 },
		{ limit: 4664.68, rate: 0.225, deduction: 662.77 },
		{ limit: Infinity, rate: 0.275, deduction: 896.0 },
	];

	const bracket =
		brackets.find((b) => base <= b.limit) || brackets[brackets.length - 1];
	const irrf = base * bracket.rate - bracket.deduction;
	return Math.max(0, Number(irrf.toFixed(2)));
}

export function useSalaryCalculator(initialSalary = 5000, initialHours = 220) {
	const [grossSalary, setGrossSalary] = useState<number>(initialSalary);
	const [monthlyHours, setMonthlyHours] = useState<number>(initialHours);
	const [manualInss, setManualInss] = useState<number | null>(null);
	const [manualIrrf, setManualIrrf] = useState<number | null>(null);
	const [extraDeductions, setExtraDeductions] = useState<ExtraItem[]>([]);
	const [extraGains, setExtraGains] = useState<ExtraItem[]>([]);

	// Load from localStorage
	useEffect(() => {
		const savedSalary = localStorage.getItem("grossSalary");
		const savedHours = localStorage.getItem("monthlyHours");
		const savedDeductions = localStorage.getItem("extraDeductions");
		const savedGains = localStorage.getItem("extraGains");

		if (savedSalary) setGrossSalary(Number.parseFloat(savedSalary));
		if (savedHours) setMonthlyHours(Number.parseInt(savedHours, 10));
		if (savedDeductions) setExtraDeductions(JSON.parse(savedDeductions));
		if (savedGains) setExtraGains(JSON.parse(savedGains));
	}, []);

	// Save to localStorage
	useEffect(() => {
		localStorage.setItem("grossSalary", grossSalary.toString());
		localStorage.setItem("monthlyHours", monthlyHours.toString());
		localStorage.setItem("extraDeductions", JSON.stringify(extraDeductions));
		localStorage.setItem("extraGains", JSON.stringify(extraGains));
	}, [grossSalary, monthlyHours, extraDeductions, extraGains]);

	const autoInss = useMemo(() => calculateInss(grossSalary), [grossSalary]);
	const autoIrrf = useMemo(
		() => calculateIrrf(grossSalary, manualInss ?? autoInss),
		[grossSalary, manualInss, autoInss],
	);

	const stats = useMemo(() => {
		const inss = manualInss ?? autoInss;
		const irrf = manualIrrf ?? autoIrrf;
		const totalExtraDeductions = extraDeductions.reduce(
			(acc, item) => acc + item.value,
			0,
		);
		const totalExtraGains = extraGains.reduce(
			(acc, item) => acc + item.value,
			0,
		);

		const netSalary = grossSalary - inss - irrf - totalExtraDeductions;
		const totalValue = netSalary + totalExtraGains;

		const hourlyRate = totalValue / (monthlyHours || 1);
		const minuteRate = hourlyRate / 60;

		return {
			inss,
			irrf,
			totalExtraDeductions,
			totalExtraGains,
			netSalary,
			totalValue,
			hourlyRate,
			minuteRate,
		};
	}, [
		grossSalary,
		monthlyHours,
		manualInss,
		autoInss,
		manualIrrf,
		autoIrrf,
		extraDeductions,
		extraGains,
	]);

	const addExtra = (type: "gain" | "deduction") => {
		const newItem = {
			id: crypto.randomUUID(),
			name: "",
			value: 0,
		};
		if (type === "gain") setExtraGains([...extraGains, newItem]);
		else setExtraDeductions([...extraDeductions, newItem]);
	};

	const updateExtra = (
		id: string,
		type: "gain" | "deduction",
		field: "name" | "value",
		val: string | number,
	) => {
		const list = type === "gain" ? [...extraGains] : [...extraDeductions];
		const index = list.findIndex((item) => item.id === id);
		if (index > -1) {
			list[index] = {
				...list[index],
				[field]:
					field === "value"
						? Number.isNaN(Number(val))
							? 0
							: Number(val)
						: val,
			};
			if (type === "gain") setExtraGains(list);
			else setExtraDeductions(list);
		}
	};

	const removeExtra = (id: string, type: "gain" | "deduction") => {
		if (type === "gain")
			setExtraGains(extraGains.filter((item) => item.id !== id));
		else setExtraDeductions(extraDeductions.filter((item) => item.id !== id));
	};

	return {
		grossSalary,
		setGrossSalary,
		monthlyHours,
		setMonthlyHours,
		manualInss,
		setManualInss,
		manualIrrf,
		setManualIrrf,
		extraDeductions,
		extraGains,
		autoInss,
		autoIrrf,
		stats,
		addExtra,
		updateExtra,
		removeExtra,
	};
}
