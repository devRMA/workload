import {
	SALARY_PERIOD_LABELS,
	SALARY_PERIODS,
	type SalaryPeriod,
} from "@/lib/salary-period";

interface PeriodSelectorProps {
	value: SalaryPeriod;
	onChange: (period: SalaryPeriod) => void;
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
	return (
		<fieldset className="flex flex-wrap justify-center gap-1 rounded-2xl bg-white/15 p-1.5">
			<legend className="sr-only">Visualizar o valor por período</legend>
			{SALARY_PERIODS.map((period) => (
				<label
					key={period}
					className="cursor-pointer rounded-xl px-4 py-2 text-sm font-bold transition-colors has-checked:bg-white has-checked:text-neutral-900 hover:bg-white/10 has-checked:hover:bg-white focus-within:ring-2 focus-within:ring-white"
				>
					<input
						type="radio"
						name="salary-period"
						value={period}
						checked={period === value}
						onChange={() => onChange(period)}
						className="sr-only"
					/>
					{SALARY_PERIOD_LABELS[period]}
				</label>
			))}
		</fieldset>
	);
}
