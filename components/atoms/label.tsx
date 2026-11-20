import * as React from "react";
import { cn } from "@/lib/utils";

export const labelClasses =
  "flex items-center gap-2 text-label text-ink-muted peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => <label ref={ref} className={cn(labelClasses, className)} {...props} />,
);
Label.displayName = "Label";

export { Label };
