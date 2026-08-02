import { SALARY_PERIOD_LABELS, SALARY_PERIODS, type SalaryPeriod } from "@/lib/salary-period";

interface PeriodSelectorProps {
  value: SalaryPeriod;
  onChange: (period: SalaryPeriod) => void;
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <fieldset className="grid grid-cols-5 gap-1 rounded-2xl bg-white/15 p-1.5">
      <legend className="sr-only">Visualizar o valor por período</legend>
      {SALARY_PERIODS.map((period) => (
        <label
          key={period}
          className="flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-1 text-xs sm:text-sm font-bold transition-colors has-checked:bg-white has-checked:text-neutral-900 hover:bg-white/10 has-checked:hover:bg-white focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-blue-600"
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
