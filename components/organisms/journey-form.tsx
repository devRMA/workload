"use client";

import { AlertTriangle, Coffee, LogIn, LogOut, Percent, RotateCcw, Settings, Zap } from "lucide-react";
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
    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-xl shadow-neutral-200/50 dark:shadow-none border border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold">Sua Jornada</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-pretty">
              Informe seus horários para ver quando pode sair e quanto já trabalhou.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Configurações da Jornada"
            aria-expanded={showSettings}
            aria-controls={SETTINGS_PANEL_ID}
            className={`p-3 rounded-xl transition-colors ${showSettings ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"}`}
          >
            <Settings
              className={`w-5 h-5 transition-transform duration-500 ${showSettings ? "rotate-90" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="space-y-2 sm:text-right">
          <fieldset className="grid grid-cols-2 gap-1 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-2xl sm:ml-auto sm:inline-grid sm:w-fit">
            <legend className="sr-only">Modo de cálculo da saída</legend>
            {EXIT_MODES.map(({ label, isManual }) => (
              <label
                key={label}
                className="relative cursor-pointer px-6 py-3.5 rounded-xl text-center text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors has-checked:bg-white dark:has-checked:bg-neutral-700 has-checked:shadow-md has-checked:text-emerald-700 dark:has-checked:text-emerald-400 focus-within:ring-2 focus-within:ring-emerald-500"
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
          <p className="text-xs text-neutral-600 dark:text-neutral-400 text-pretty">
            {isManualExit ? "Você informa o horário que bateu na saída." : "Calculamos sua saída a partir da jornada."}
          </p>
        </div>
      </div>

      <CollapsiblePanel id={SETTINGS_PANEL_ID} isOpen={showSettings} className="mb-8">
        <div className="bg-neutral-50 dark:bg-neutral-800/30 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800/50 space-y-6">
          <DurationField
            id="daily-journey"
            label="Tempo de Trabalho Diário"
            labelIcon={<Zap className="w-4 h-4 text-emerald-500" aria-hidden="true" />}
            hint="Define o tempo total de trabalho esperado por dia. Vale também para o cálculo do valor da sua hora."
            minutes={workMinutes}
            onMinutesChange={onWorkMinutesChange}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field
              id="first-tier-rate"
              label="Adicional até 2h extras (%)"
              hint="O piso legal é 50% sobre a hora normal (art. 7º, XVI, da CF; art. 59, §1º, da CLT)."
              labelIcon={<Percent className="w-4 h-4 text-amber-500" aria-hidden="true" />}
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
              labelIcon={<Percent className="w-4 h-4 text-orange-600" aria-hidden="true" />}
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
        </div>
      </CollapsiblePanel>

      {issue ? (
        <AlertBanner
          id={ISSUE_BANNER_ID}
          icon={AlertTriangle}
          tone="danger"
          title="Confira seus horários"
          className="mb-6"
        >
          <p>{issue.message}</p>
        </AlertBanner>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DateTimeInput
          label="Entrada"
          icon={LogIn}
          value={entry}
          onChange={onEntryChange}
          hasError={issue?.field === "entry"}
          errorId={ISSUE_BANNER_ID}
        />
        <DateTimeInput
          label="Saída Almoço"
          icon={Coffee}
          value={lunchStart}
          onChange={onLunchStartChange}
          hasError={issue?.field === "lunchStart"}
          errorId={ISSUE_BANNER_ID}
        />
        <DateTimeInput
          label="Volta Almoço"
          icon={RotateCcw}
          className="[&_svg]:rotate-180"
          value={lunchEnd}
          onChange={onLunchEndChange}
          hasError={issue?.field === "lunchEnd"}
          errorId={ISSUE_BANNER_ID}
        />
        <DateTimeInput
          label={isManualExit ? "Saída Real" : "Saída Sugerida"}
          icon={LogOut}
          id="saida-real"
          value={exitValue}
          onChange={onExitChange}
          className={isManualExit ? "text-emerald-500" : ""}
          hasError={issue?.field === "exit"}
          errorId={ISSUE_BANNER_ID}
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <button
          type="button"
          aria-label="Resetar Horários"
          onClick={() => setIsConfirmingReset(true)}
          className="flex items-center gap-2 -mx-2 px-2 py-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Resetar Horários
        </button>
      </div>

      <ModalDialog
        isOpen={isConfirmingReset}
        onClose={() => setIsConfirmingReset(false)}
        labelledBy={RESET_DIALOG_TITLE_ID}
        className="w-full max-w-md rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-8 shadow-2xl"
      >
        <div className="space-y-6">
          <h2 id={RESET_DIALOG_TITLE_ID} className="text-2xl font-black tracking-tight">
            Resetar os horários?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Entrada, almoço, saída e as configurações da jornada voltam aos valores padrão. Não dá para desfazer.
          </p>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
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
