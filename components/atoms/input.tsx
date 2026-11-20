import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, icon, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">{icon}</div>}
      <input
        type={type}
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="done"
        className={cn(
          "flex h-14 w-full rounded-md border border-line-strong bg-surface px-4 text-input numeric text-ink placeholder:text-ink-subtle transition-[border-color] duration-(--duration-fast) ease-standard hover:border-ink-subtle focus-visible:border-accent ring-focus disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:border-line disabled:opacity-60 aria-invalid:border-negative aria-invalid:bg-negative-soft",
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
