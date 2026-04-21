import type * as React from "react";
import { cn } from "@/lib/utils";

interface StatBoxProps extends React.HTMLAttributes<HTMLDivElement> {
	label: string;
	value: string;
	subValue?: string;
	icon?: React.ReactNode;
	variant?: "default" | "success" | "warning" | "danger" | "purple";
}

export function StatBox({
	label,
	value,
	subValue,
	icon,
	variant = "default",
	className,
	...props
}: StatBoxProps) {
	return (
		<div
			className={cn(
				"rounded-2xl border p-4 4k:p-8 flex flex-col gap-1 4k:gap-2",
				{
					"bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800":
						variant === "default",
					"bg-emerald-50/50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-800":
						variant === "success",
					"bg-amber-50/50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-800":
						variant === "warning",
					"bg-red-50/50 border-red-100 dark:bg-red-900/10 dark:border-red-800":
						variant === "danger",
					"bg-purple-50/50 border-purple-100 dark:bg-purple-900/10 dark:border-purple-800":
						variant === "purple",
				},
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-2 text-sm 4k:text-2xl opacity-70 mb-1">
				{icon}
				<span className="font-medium uppercase tracking-wider text-xs 4k:text-xl">
					{label}
				</span>
			</div>
			<div
				className={cn("text-2xl 4k:text-5xl font-bold tracking-tight", {
					"text-blue-600 dark:text-blue-400": variant === "default",
					"text-emerald-600 dark:text-emerald-400": variant === "success",
					"text-amber-600 dark:text-amber-400": variant === "warning",
					"text-red-600 dark:text-red-400": variant === "danger",
					"text-purple-600 dark:text-purple-400": variant === "purple",
				})}
			>
				{value}
			</div>
			{subValue && (
				<div className="text-sm 4k:text-xl font-medium opacity-60 mt-1">
					{subValue}
				</div>
			)}
		</div>
	);
}
