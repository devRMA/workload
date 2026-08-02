import type { ReactNode } from "react";
import { DURATION_GROUP_SIZES, formatPaddedDuration, isRealDuration, parsePaddedDuration } from "@/lib/duration";
import { cn } from "@/lib/utils";
import { Label } from "../atoms/label";
import { MaskedInput } from "../atoms/masked-input";

interface DurationFieldProps {
  id: string;
  label: string;
  hint?: string;
  icon?: ReactNode;
  labelIcon?: ReactNode;
  minutes: number;
  onMinutesChange: (minutes: number) => void;
  className?: string;
}

export function DurationField({
  id,
  label,
  hint,
  icon,
  labelIcon,
  minutes,
  onMinutesChange,
  className,
}: DurationFieldProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <Label htmlFor={id}>
        {labelIcon}
        {label}
      </Label>
      <MaskedInput
        id={id}
        icon={icon}
        placeholder="08:48"
        aria-describedby={hint ? `${id}-hint` : undefined}
        value={formatPaddedDuration(minutes)}
        separator=":"
        groupSizes={DURATION_GROUP_SIZES}
        isValid={isRealDuration}
        onCommit={(duration) => onMinutesChange(parsePaddedDuration(duration))}
      />
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-neutral-500 dark:text-neutral-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
