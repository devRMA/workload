"use client";

import {
  IconAlertTriangle,
  IconBolt,
  IconCoffee,
  IconLogin,
  IconLogout,
  IconPercentage,
  IconRotate,
  IconSettings,
} from "@tabler/icons-react";
import { useState } from "react";
import type { JourneyIssue } from "@/lib/journey";
import { AlertBanner } from "../atoms/alert-banner";
import { Button } from "../atoms/button";
import { CollapsiblePanel } from "../atoms/collapsible-panel";
import { Input } from "../atoms/input";
import { ModalDialog } from "../atoms/modal-dialog";
import { DateTimeInput } from "../molecules/date-time-input";
import { DurationField } from "../molecules/duration-field";
import { Field } from "../molecules/field";

const SETTINGS_PANEL_ID = "journey-settings";
const RESET_DIALOG_TITLE_ID = "journey-reset-title";
const ISSUE_BANNER_ID = "journey-issue";

const EXIT_MODES = [
  { label: "AUTO", isManual: false },
  { label: "MANUAL", isManual: true },
] as const;

interface JourneyFormProps {
  workMinutes: number;
  onWorkMinutesChange: (minutes: number) => void;
  firstTierRate: number;
  onFirstTierRateChange: (rate: number) => void;
  extraTierRate: number;
  onExtraTierRateChange: (rate: number) => void;
  entry: string;
  onEntryChange: (value: string) => void;
  lunchStart: string;
  onLunchStartChange: (value: string) => void;
  lunchEnd: string;
  onLunchEndChange: (value: string) => void;
  exitValue: string;
  onExitChange: (value: string) => void;
  isManualExit: boolean;
  onManualExitChange: (manual: boolean) => void;
  onReset: () => void;
  issue: JourneyIssue | null;
}

export function JourneyForm({
  workMinutes,
  onWorkMinutesChange,
  firstTierRate,
  onFirstTierRateChange,
  extraTierRate,
  onExtraTierRateChange,
  entry,
  onEntryChange,
  lunchStart,
  onLunchStartChange,
  lunchEnd,
  onLunchEndChange,
  exitValue,
  onExitChange,
  isManualExit,
  onManualExitChange,
  onReset,
  issue,
}: JourneyFormProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);

  return (
    <div className="bg-surface rounded-xl p-lg sm:p-xl shadow-card border border-line">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md mb-xl">
        <div className="flex items-start gap-md">
          <div>
            <h2 className="text-title">Sua Jornada</h2>
            <p className="text-body-sm text-ink-muted text-pretty">
              Informe seus horários para ver quando pode sair e quanto já trabalhou.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Configurações da Jornada"
            aria-expanded={showSettings}
            aria-controls={SETTINGS_PANEL_ID}
            className={`rounded-md p-3 transition-colors duration-(--duration-fast) ease-standard ring-focus ${showSettings ? "bg-accent-soft text-accent-ink" : "text-ink-muted hover:bg-surface-sunken"}`}
          >
            <IconSettings
              className={`w-5 h-5 transition-transform duration-(--duration-base) ease-standard ${showSettings ? "rotate-90" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="space-y-xs sm:text-right">
          <fieldset className="grid grid-cols-2 gap-1 bg-surface-sunken p-1.5 rounded-lg sm:ml-auto sm:inline-grid sm:w-fit">
            <legend className="sr-only">Modo de cálculo da saída</legend>
            {EXIT_MODES.map(({ label, isManual }) => (
              <label
                key={label}
                className="relative flex min-h-11 cursor-pointer items-center justify-center rounded-sm px-6 text-label text-ink-muted transition-colors duration-(--duration-fast) ease-standard hover:bg-surface has-checked:bg-surface has-checked:text-accent-ink has-checked:shadow-press has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus"
              >
                <input
                  type="radio"
                  name="exit-mode"
                  value={label}
                  checked={isManualExit === isManual}
                  onChange={() => onManualExitChange(isManual)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                {label}
              </label>
            ))}
          </fieldset>
          <p className="text-caption text-ink-subtle text-pretty">
            {isManualExit ? "Você informa o horário que bateu na saída." : "Calculamos sua saída a partir da jornada."}
          </p>
        </div>
      </div>

      <CollapsiblePanel id={SETTINGS_PANEL_ID} isOpen={showSettings} className="mb-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg bg-surface-sunken p-lg rounded-lg border border-line">
          <DurationField
            id="daily-journey"
            label="Tempo de Trabalho Diário"
            className="sm:col-span-2"
            labelIcon={<IconBolt className="w-4 h-4 text-overtime-ink" aria-hidden="true" />}
            hint="Define o tempo total de trabalho esperado por dia. Vale também para o cálculo do valor da sua hora."
            minutes={workMinutes}
            onMinutesChange={onWorkMinutesChange}
          />

          <Field
            id="first-tier-rate"
            label="Adicional até 2h extras (%)"
            hint="O piso legal é 50% sobre a hora normal (art. 7º, XVI, da CF; art. 59, §1º, da CLT)."
            labelIcon={<IconPercentage className="w-4 h-4 text-overtime-ink" aria-hidden="true" />}
          >
            <Input
              id="first-tier-rate"
              type="number"
              min={0}
              aria-describedby="first-tier-rate-hint"
              value={firstTierRate}
              onChange={(event) => onFirstTierRateChange(Number(event.target.value))}
            />
          </Field>
          <Field
            id="extra-tier-rate"
            label="Adicional acima de 2h (%)"
            hint="Não existe lei que dobre o adicional depois da 2ª hora: o piso continua sendo 50%. Só use 100% se a sua convenção coletiva previr esse degrau."
            labelIcon={<IconPercentage className="w-4 h-4 text-overtime-ink" aria-hidden="true" />}
          >
            <Input
              id="extra-tier-rate"
              type="number"
              min={0}
              aria-describedby="extra-tier-rate-hint"
              value={extraTierRate}
              onChange={(event) => onExtraTierRateChange(Number(event.target.value))}
            />
          </Field>
        </div>
      </CollapsiblePanel>

      {issue ? (
        <AlertBanner
          id={ISSUE_BANNER_ID}
          icon={IconAlertTriangle}
          tone="danger"
          title="Confira seus horários"
          className="mb-lg"
        >
          <p>{issue.message}</p>
        </AlertBanner>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg mb-xl">
        <DateTimeInput
          label="Entrada"
          icon={IconLogin}
          value={entry}
          onChange={onEntryChange}
          hasError={issue?.field === "entry"}
          errorId={ISSUE_BANNER_ID}
        />
        <DateTimeInput
          label="Saída Almoço"
          icon={IconCoffee}
          value={lunchStart}
          onChange={onLunchStartChange}
          hasError={issue?.field === "lunchStart"}
          errorId={ISSUE_BANNER_ID}
        />
        <DateTimeInput
          label="Volta Almoço"
          icon={IconRotate}
          className="[&_svg]:rotate-180"
          value={lunchEnd}
          onChange={onLunchEndChange}
          hasError={issue?.field === "lunchEnd"}
          errorId={ISSUE_BANNER_ID}
        />
        <DateTimeInput
          label={isManualExit ? "Saída Real" : "Saída Sugerida"}
          icon={IconLogout}
          id="saida-real"
          value={exitValue}
          onChange={onExitChange}
          className={isManualExit ? "text-positive-ink" : ""}
          hasError={issue?.field === "exit"}
          errorId={ISSUE_BANNER_ID}
        />
      </div>

      <div className="flex items-center justify-between pt-lg border-t border-line-faint">
        <button
          type="button"
          aria-label="Resetar Horários"
          onClick={() => setIsConfirmingReset(true)}
          className="flex min-h-11 items-center gap-xs -mx-2 rounded-md px-2 text-label text-ink-muted transition-colors duration-(--duration-fast) ease-standard hover:text-negative-ink ring-focus"
        >
          <IconRotate className="w-4 h-4" aria-hidden="true" />
          Resetar Horários
        </button>
      </div>

      <ModalDialog
        isOpen={isConfirmingReset}
        onClose={() => setIsConfirmingReset(false)}
        labelledBy={RESET_DIALOG_TITLE_ID}
        className="w-full max-w-md rounded-2xl border border-line bg-surface-raised p-xl shadow-raised edge-lit"
      >
        <div className="space-y-lg">
          <h2 id={RESET_DIALOG_TITLE_ID} className="text-display">
            Resetar os horários?
          </h2>
          <p className="text-body text-ink-muted">
            Entrada, almoço, saída e as configurações da jornada voltam aos valores padrão. Não dá para desfazer.
          </p>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-sm">
            <Button variant="outline" onClick={() => setIsConfirmingReset(false)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setIsConfirmingReset(false);
                onReset();
              }}
            >
              Resetar horários
            </Button>
          </div>
        </div>
      </ModalDialog>
    </div>
  );
}
