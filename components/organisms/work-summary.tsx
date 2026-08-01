import { MoonStar, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { DurationRow } from "../molecules/duration-row";

const MINUTES_PER_HOUR = 60;

function formatBalance(minutes: number): string {
	const absoluteMinutes = Math.abs(minutes);
	const hours = Math.floor(absoluteMinutes / MINUTES_PER_HOUR);
	const remainingMinutes = absoluteMinutes % MINUTES_PER_HOUR;
	return `${minutes < 0 ? "-" : "+"}${hours}h ${remainingMinutes}m`;
}

interface WorkSummaryProps {
	balanceMinutes: number;
	balanceSign: number;
	firstTierMinutes: number;
	extraTierMinutes: number;
	nightMinutes: number;
	firstTierRate: number;
	extraTierRate: number;
}

export function WorkSummary({
	balanceMinutes,
	balanceSign,
	firstTierMinutes,
	extraTierMinutes,
	nightMinutes,
	firstTierRate,
	extraTierRate,
}: WorkSummaryProps) {
	const isPositiveBalance = balanceSign >= 0;

	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
				<div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm text-center flex flex-col items-center justify-center">
					<div className="flex items-center justify-center gap-3 mb-6">
						<h3 className="text-lg font-bold">Balanço do Dia</h3>
						<div
							className={`p-2 rounded-xl ${isPositiveBalance ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}
						>
							{isPositiveBalance ? (
								<TrendingUp className="w-5 h-5" aria-hidden="true" />
							) : (
								<TrendingDown className="w-5 h-5" aria-hidden="true" />
							)}
						</div>
					</div>
					<div className="space-y-1">
						<p
							className={`text-4xl font-black tracking-tight tabular-nums ${isPositiveBalance ? "text-emerald-700 dark:text-emerald-400" : "text-rose-500"}`}
						>
							{formatBalance(balanceMinutes)}
						</p>
						<p className="text-sm text-neutral-500 dark:text-neutral-400">
							{isPositiveBalance
								? "Horas extras acumuladas"
								: "Horas em débito hoje"}
						</p>
					</div>
				</div>

				<div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm text-center flex flex-col items-center justify-center">
					<h3 className="text-lg font-bold mb-6">Extras e Adicionais</h3>
					<div className="w-full max-w-[240px] mx-auto space-y-4">
						<DurationRow
							icon={Zap}
							iconClassName="text-amber-500"
							label={`Extra ${firstTierRate}%`}
							minutes={firstTierMinutes}
						/>
						<DurationRow
							icon={Zap}
							iconClassName="text-rose-500"
							label={`Extra ${extraTierRate}%`}
							minutes={extraTierMinutes}
						/>
						<DurationRow
							icon={MoonStar}
							iconClassName="text-indigo-500"
							label="Adic. Noturno"
							minutes={nightMinutes}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
