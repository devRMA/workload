import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, icon, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">{icon}</div>}
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-2xl border border-neutral-500 dark:border-neutral-600 bg-white/50 dark:bg-neutral-900/50 px-4 py-2 text-lg ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors font-mono",
          icon ? "pl-12" : "",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
