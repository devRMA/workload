import type { ReactNode } from "react";
import { DURATION_GROUP_SIZES, formatPaddedDuration, isRealDuration, parsePaddedDuration } from "@/lib/duration";
import { MaskedInput } from "../molecules/masked-input";
import { Field } from "./field";

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
    <Field id={id} label={label} labelIcon={labelIcon} hint={hint} className={className}>
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
    </Field>
  );
}
