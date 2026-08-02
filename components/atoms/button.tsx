import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "default" | "outline" | "ghost" | "danger";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function buttonClasses(variant: ButtonVariant = "default", size: ButtonSize = "default", className?: string) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95": variant === "default",
      "border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white":
        variant === "outline",
      "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white": variant === "ghost",
      "bg-red-500/10 text-red-600 hover:bg-red-500/20": variant === "danger",
      "h-12 px-6 py-2 text-base": size === "default",
      "h-11 rounded-md px-3 text-sm": size === "sm",
      "h-14 rounded-2xl px-8 text-lg": size === "lg",
      "h-11 w-11": size === "icon",
    },
    className,
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button ref={ref} type={props.type || "button"} className={buttonClasses(variant, size, className)} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button };
