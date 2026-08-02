"use client";

import { AlertTriangle, Coffee, LogIn, LogOut, Percent, RotateCcw, Settings, Zap } from "lucide-react";
import { useState } from "react";
import { DURATION_GROUP_SIZES, formatPaddedDuration, isRealDuration, parsePaddedDuration } from "@/lib/duration";
import type { JourneyIssue } from "@/lib/journey";
import { Button } from "../atoms/button";
import { Label } from "../atoms/label";
import { MaskedInput } from "../atoms/masked-input";
import { ModalDialog } from "../atoms/modal-dialog";
import { AlertBanner } from "../molecules/alert-banner";
import { CollapsiblePanel } from "../molecules/collapsible-panel";
import { DateTimeInput } from "../molecules/date-time-input";
import { FormField } from "../molecules/form-field";

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
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Sua Jornada</h2>
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Configurações da Jornada"
            aria-expanded={showSettings}
            aria-controls={SETTINGS_PANEL_ID}
            className={`p-3 rounded-xl transition-colors ${showSettings ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600"}`}
          >
            <Settings
              className={`w-5 h-5 transition-transform duration-500 ${showSettings ? "rotate-90" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
        <fieldset className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-2xl">
          <legend className="sr-only">Modo de cálculo da saída</legend>
          {EXIT_MODES.map(({ label, isManual }) => (
            <label
              key={label}
              className="relative cursor-pointer px-6 py-3.5 rounded-xl text-xs font-bold text-neutral-600 transition-colors has-checked:bg-white dark:has-checked:bg-neutral-700 has-checked:shadow-md has-checked:text-emerald-700 dark:has-checked:text-emerald-400 focus-within:ring-2 focus-within:ring-emerald-500"
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
      </div>

      <CollapsiblePanel id={SETTINGS_PANEL_ID} isOpen={showSettings} className="mb-8">
        <div className="bg-neutral-50 dark:bg-neutral-800/30 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800/50 space-y-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <Label htmlFor="daily-journey" className="font-bold mb-2">
                <Zap className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                Tempo de Trabalho Diário
              </Label>
              <p className="text-xs text-neutral-600 mb-4">
                Define o tempo total de trabalho esperado por dia para o cálculo de banco de horas.
              </p>
            </div>
            <div className="w-32">
              <MaskedInput
                id="daily-journey"
                placeholder="08:48"
                value={formatPaddedDuration(workMinutes)}
                separator=":"
                groupSizes={DURATION_GROUP_SIZES}
                isValid={isRealDuration}
                onCommit={(duration) => onWorkMinutesChange(parsePaddedDuration(duration))}
                className="h-12 rounded-xl text-center text-lg font-bold focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              id="first-tier-rate"
              label="Adicional até 2h extras (%)"
              type="number"
              min={0}
              labelIcon={<Percent className="w-4 h-4 text-amber-500" aria-hidden="true" />}
              value={firstTierRate}
              onChange={(event) => onFirstTierRateChange(Number(event.target.value))}
            />
            <FormField
              id="extra-tier-rate"
              label="Adicional acima de 2h (%)"
              type="number"
              min={0}
              labelIcon={<Percent className="w-4 h-4 text-rose-500" aria-hidden="true" />}
              value={extraTierRate}
              onChange={(event) => onExtraTierRateChange(Number(event.target.value))}
            />
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
          label="Saída Real"
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
          className="flex items-center gap-2 -mx-2 px-2 py-3 text-sm font-medium text-neutral-600 hover:text-emerald-500 transition-colors"
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
