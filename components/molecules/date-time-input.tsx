"use client";

import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { isRealDuration } from "@/lib/duration";
import { cn } from "@/lib/utils";
import { Label } from "../atoms/label";
import { MaskedInput } from "../molecules/masked-input";

const BR_DATE_GROUPS = [2, 2, 4] as const;
const TIME_GROUPS = [2, 2] as const;
const BR_DATE_FORMAT = "dd/MM/yyyy";
const ISO_DATE_FORMAT = "yyyy-MM-dd";
const FIELD_CLASSES = "h-14";

const toBRDate = (isoDate: string) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
};

const fromBRDate = (brDate: string) => {
  const [day, month, year] = brDate.split("/");
  return `${year}-${month}-${day}`;
};

const isRealBRDate = (brDate: string) => {
  const parsed = parse(brDate, BR_DATE_FORMAT, new Date());
  return isValid(parsed) && format(parsed, BR_DATE_FORMAT) === brDate;
};

interface DateTimeInputProps {
  value: string;
  onChange: (val: string) => void;
  label: string;
  icon: React.ElementType;
  className?: string;
  id?: string;
  hasError?: boolean;
  errorId?: string;
}

export function DateTimeInput({
  value,
  onChange,
  label,
  icon: Icon,
  className = "",
  id,
  hasError = false,
  errorId,
}: DateTimeInputProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const [datePart, timePart] = value.split("T");
  const errorProps = hasError ? { "aria-invalid": true, "aria-describedby": errorId } : {};

  const handleDateCommit = (brDate: string) => {
    onChange(`${fromBRDate(brDate)}T${timePart || "00:00"}`);
  };

  const handleTimeCommit = (time: string) => {
    onChange(`${datePart || format(new Date(), ISO_DATE_FORMAT)}T${time}`);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={inputId}>
        <Icon className="w-4 h-4" aria-hidden="true" />
        {label}
      </Label>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 min-w-0">
          <MaskedInput
            id={inputId}
            placeholder="DD/MM/AAAA"
            value={toBRDate(datePart)}
            separator="/"
            groupSizes={BR_DATE_GROUPS}
            isValid={isRealBRDate}
            onCommit={handleDateCommit}
            className={FIELD_CLASSES}
            {...errorProps}
          />
        </div>
        <div className="w-full sm:w-32 shrink-0">
          <MaskedInput
            placeholder="HH:mm"
            aria-label={`Hora para ${label}`}
            value={timePart || ""}
            separator=":"
            groupSizes={TIME_GROUPS}
            isValid={isRealDuration}
            onCommit={handleTimeCommit}
            className={FIELD_CLASSES}
            {...errorProps}
          />
        </div>
      </div>
    </div>
  );
}
