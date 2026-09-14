import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "default" | "outline" | "ghost" | "danger";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export function buttonClasses(variant: ButtonVariant = "default", size: ButtonSize = "default", className?: string) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-label transition-[background-color,border-color,color,transform] duration-(--duration-fast) ease-standard ring-focus active:scale-[0.97] active:duration-(--duration-instant) motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-40",
    {
      "bg-accent text-ink-onfill hover:bg-accent-hover active:bg-accent-active": variant === "default",
      "border border-line-strong bg-transparent text-ink hover:bg-surface-sunken hover:border-ink-subtle":
        variant === "outline",
      "bg-transparent text-ink-muted hover:bg-surface-sunken hover:text-ink": variant === "ghost",
      "bg-negative-soft text-negative-ink hover:bg-negative/18": variant === "danger",
      "h-12 px-6": size === "default",
      "h-11 px-4": size === "sm",
      "h-14 px-8 text-input": size === "lg",
      "h-11 w-11 rounded-full p-0": size === "icon",
    },
    className,
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
