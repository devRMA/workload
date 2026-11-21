import { cn } from "@/lib/utils";

export const ESTIMATE_NOTICE_ID = "estimate-notice";

export function EstimateNotice() {
  return (
    <p id={ESTIMATE_NOTICE_ID} className={cn("mt-2 text-caption text-ink-muted text-pretty")}>
      Os valores são uma estimativa para você se organizar. Não substituem seu holerite, não valem como registro oficial
      de ponto e nada aqui é orientação jurídica ou contábil.
    </p>
  );
}
