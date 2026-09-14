import { SALARY_PERIOD_LABELS, SALARY_PERIODS, type SalaryPeriod } from "@/lib/salary-period";

interface PeriodSelectorProps {
  value: SalaryPeriod;
  onChange: (period: SalaryPeriod) => void;
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <fieldset className="grid grid-cols-5 gap-1 rounded-lg bg-scrim/25 p-1.5">
      <legend className="sr-only">Visualizar o valor por período</legend>
      {SALARY_PERIODS.map((period) => (
        <label
          key={period}
          className="flex min-h-11 cursor-pointer items-center justify-center rounded-sm px-1 text-label text-ink-onfill transition-colors duration-(--duration-fast) ease-standard hover:bg-ink-onfill/10 has-checked:bg-surface has-checked:text-accent-ink has-checked:shadow-press has-checked:hover:bg-surface has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink-onfill"
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
