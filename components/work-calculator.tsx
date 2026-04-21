'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Coffee, 
  LogOut, 
  LogIn, 
  Settings, 
  Moon, 
  Sun, 
  Monitor,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  MoonStar,
  Zap
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { format, parse, addMinutes, differenceInMinutes, isValid, isWithinInterval, setHours, setMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Default values
const DEFAULT_WORK_MINUTES = 8 * 60 + 48; // 8h 48m
const getTodayAt = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return format(d, "yyyy-MM-dd'T'HH:mm");
};

const DEFAULT_ENTRY = getTodayAt("08:00");
const DEFAULT_LUNCH_START = getTodayAt("12:00");
const DEFAULT_LUNCH_END = getTodayAt("13:00");

// Helper functions for Brazilian date format
const toBRDate = (isoDate: string) => {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

const fromBRDate = (brDate: string) => {
  if (!brDate) return '';
  const parts = brDate.split('/');
  if (parts.length !== 3) return '';
  // Ensure year is 4 digits
  if (parts[2].length !== 4) return '';
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

// Custom DateTimeInput Component
function DateTimeInput({ 
  value, 
  onChange, 
  label, 
  icon: Icon,
  className = ""
}: { 
  value: string; 
  onChange: (val: string) => void; 
  label: string; 
  icon: any;
  className?: string;
}) {
  // Split ISO string (yyyy-MM-ddTHH:mm) into date and time
  const [datePart, timePart] = value.split('T');
  const [localDate, setLocalDate] = React.useState(toBRDate(datePart));

  // Sync local state with prop
  React.useEffect(() => {
    setLocalDate(toBRDate(datePart));
  }, [datePart]);

  const handleDateChange = (newDate: string) => {
    onChange(`${newDate || format(new Date(), 'yyyy-MM-dd')}T${timePart || '00:00'}`);
  };

  const handleTimeChange = (newTime: string) => {
    onChange(`${datePart || format(new Date(), 'yyyy-MM-dd')}T${newTime}`);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 4k:text-2xl">
        <Icon className="w-4 h-4 4k:w-8 4k:h-8" />
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
        <div className="relative flex-1 min-w-0 group">
          <input 
            type="text" 
            placeholder="DD/MM/AAAA"
            value={localDate}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, '');
              if (val.length > 8) val = val.slice(0, 8);
              if (val.length >= 5) {
                val = val.slice(0, 2) + '/' + val.slice(2, 4) + '/' + val.slice(4);
              } else if (val.length >= 3) {
                val = val.slice(0, 2) + '/' + val.slice(2);
              }
              
              setLocalDate(val);
              const isoDate = fromBRDate(val);
              if (isoDate) {
                handleDateChange(isoDate);
              }
            }}
            className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 text-base font-semibold focus:ring-2 focus:ring-emerald-500 transition-all 4k:p-8 4k:text-3xl outline-none"
          />
        </div>
        <div className="relative w-full sm:w-32 4k:w-64 group">
          <input 
            type="text" 
            placeholder="00:00"
            value={timePart || ''}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, '');
              if (val.length > 4) val = val.slice(0, 4);
              if (val.length >= 3) {
                val = val.slice(0, 2) + ':' + val.slice(2);
              }
              handleTimeChange(val);
            }}
            className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 text-base font-semibold focus:ring-2 focus:ring-emerald-500 transition-all 4k:p-8 4k:text-3xl outline-none text-center"
          />
        </div>
      </div>
    </div>
  );
}

export default function WorkCalculator() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // State
  const [workMinutes, setWorkMinutes] = useState(DEFAULT_WORK_MINUTES);
  const [entry, setEntry] = useState(DEFAULT_ENTRY);
  const [lunchStart, setLunchStart] = useState(DEFAULT_LUNCH_START);
  const [lunchEnd, setLunchEnd] = useState(DEFAULT_LUNCH_END);
  const [exitOverride, setExitOverride] = useState("");
  const [isManualExit, setIsManualExit] = useState(false);
  const [manualExitDate, setManualExitDate] = useState("");

  const handleManualToggle = (manual: boolean) => {
    if (manual && !isManualExit) {
      // Pre-fill with suggested exit when switching to manual
      const [datePart, timePart] = suggestedExit.split('T');
      setExitOverride(suggestedExit);
      setManualExitDate(toBRDate(datePart));
    }
    setIsManualExit(manual);
  };

  // Calculate suggested exit time
  const suggestedExit = React.useMemo(() => {
    try {
      const entryDate = new Date(entry);
      const lunchStartDate = new Date(lunchStart);
      const lunchEndDate = new Date(lunchEnd);

      if (!isValid(entryDate) || !isValid(lunchStartDate) || !isValid(lunchEndDate)) return entry;

      const morningMinutes = differenceInMinutes(lunchStartDate, entryDate);
      const remainingMinutes = workMinutes - morningMinutes;
      const exitDate = addMinutes(lunchEndDate, remainingMinutes);
      
      return format(exitDate, "yyyy-MM-dd'T'HH:mm");
    } catch (e) {
      return entry;
    }
  }, [entry, lunchStart, lunchEnd, workMinutes]);

  // Final display exit
  const displayExit = isManualExit ? exitOverride : suggestedExit;

  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load from localStorage
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      const savedWorkMinutes = localStorage.getItem('workMinutes');
      const savedEntry = localStorage.getItem('entry');
      const savedLunchStart = localStorage.getItem('lunchStart');
      const savedLunchEnd = localStorage.getItem('lunchEnd');

      if (savedWorkMinutes) setWorkMinutes(parseInt(savedWorkMinutes));
      
      // Validate saved dates - if they don't contain 'T', they are likely legacy HH:mm strings
      const isValidISO = (str: string | null) => str && str.includes('T') && isValid(new Date(str));
      
      if (isValidISO(savedEntry)) setEntry(savedEntry!);
      if (isValidISO(savedLunchStart)) setLunchStart(savedLunchStart!);
      if (isValidISO(savedLunchEnd)) setLunchEnd(savedLunchEnd!);
    }, 0);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('workMinutes', workMinutes.toString());
      localStorage.setItem('entry', entry);
      localStorage.setItem('lunchStart', lunchStart);
      localStorage.setItem('lunchEnd', lunchEnd);
    }
  }, [workMinutes, entry, lunchStart, lunchEnd, mounted]);

  // Helper for safe formatting
  const safeFormat = (dateStr: string, formatStr: string) => {
    try {
      const d = new Date(dateStr);
      if (!isValid(d)) return "--:--";
      return format(d, formatStr, { locale: ptBR });
    } catch (e) {
      return "--:--";
    }
  };

  const copyToClipboard = () => {
    const timeOnly = safeFormat(displayExit, 'HH:mm');
    navigator.clipboard.writeText(timeOnly);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Balance and Overtime Calculations
  const stats = React.useMemo(() => {
    try {
      const entryDate = new Date(entry);
      const lunchStartDate = new Date(lunchStart);
      const lunchEndDate = new Date(lunchEnd);
      const exitDate = new Date(displayExit);

      if (!isValid(entryDate) || !isValid(lunchStartDate) || !isValid(lunchEndDate) || !isValid(exitDate)) {
        return { balance: 0, nightMinutes: 0, overtime75: 0, overtime100: 0, totalWorked: 0, lunchDuration: 0 };
      }

      const morningMinutes = differenceInMinutes(lunchStartDate, entryDate);
      const afternoonMinutes = differenceInMinutes(exitDate, lunchEndDate);
      const totalWorked = morningMinutes + afternoonMinutes;

      // Adicional Noturno (22:00 - 05:00)
      // CLT: Hora noturna é de 52.5 minutos.
      let nightMinutesReal = 0;
      
      // We need to check the entire range from entry to exit
      // For simplicity, we check hour by hour
      let checkDate = new Date(entryDate);
      while (checkDate < exitDate) {
        const nextHour = addMinutes(checkDate, 1);
        const hour = checkDate.getHours();
        
        // Check if current minute is in lunch break
        const isInLunch = checkDate >= lunchStartDate && checkDate < lunchEndDate;
        
        if (!isInLunch) {
          if (hour >= 22 || hour < 5) {
            nightMinutesReal += 1;
          }
        }
        checkDate = nextHour;
      }

      // Redução da hora noturna: 52.5 min reais = 60 min de jornada
      const nightMinutesEquivalent = Math.round(nightMinutesReal * (60 / 52.5));
      const nightBonusMinutes = nightMinutesEquivalent - nightMinutesReal;

      // Ajustar o total trabalhado considerando a redução noturna
      const totalWorkedWithReduction = totalWorked + nightBonusMinutes;
      const balance = totalWorkedWithReduction - workMinutes;

      // Overtime buckets (CLT)
      // Rule: First 2 hours at 75%, any additional time at 100%
      // On weekends/holidays: 100% for all overtime
      const overtimeMinutes = Math.max(0, balance);
      let overtime75 = 0;
      let overtime100 = 0;

      const dayOfWeek = entryDate.getDay(); // 0 = Sunday, 6 = Saturday
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      if (isWeekend) {
        overtime100 = overtimeMinutes;
        overtime75 = 0;
      } else {
        // Weekday: first 120 mins (2h) at 75%, rest at 100%
        if (overtimeMinutes <= 120) {
          overtime75 = overtimeMinutes;
          overtime100 = 0;
        } else {
          overtime75 = 120;
          overtime100 = overtimeMinutes - 120;
        }
      }

      return { balance, nightMinutes: nightMinutesEquivalent, overtime75, overtime100, totalWorked: totalWorkedWithReduction };
    } catch (e) {
      return { balance: 0, nightMinutes: 0, overtime75: 0, overtime100: 0, totalWorked: 0 };
    }
  }, [entry, lunchStart, lunchEnd, displayExit, workMinutes]);

  const formatBalance = (mins: number) => {
    const absMins = Math.abs(mins);
    const h = Math.floor(absMins / 60);
    const m = absMins % 60;
    return `${mins < 0 ? '-' : '+'}${h}h ${m}m`;
  };

  // Real-time Timer Logic
  const timerData = React.useMemo(() => {
    try {
      const exitDate = new Date(displayExit);
      if (!isValid(exitDate)) return { label: "Aguardando...", time: "00:00:00", isOvertime: false, progress: 0 };

      if (isManualExit) {
        const balanceSecs = stats.balance * 60;
        const isOvertime = balanceSecs >= 0;
        const absSecs = Math.abs(balanceSecs);
        const h = Math.floor(absSecs / 3600);
        const m = Math.floor((absSecs % 3600) / 60);
        const s = Math.floor(absSecs % 60);
        const formatted = `${isOvertime ? '+' : '-'}${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        
        return {
          label: "BALANÇO FINAL",
          time: formatted,
          isOvertime,
          progress: (stats.totalWorked / workMinutes) * 100
        };
      }

      const diffInSecs = Math.floor((exitDate.getTime() - currentTime.getTime()) / 1000);
      const isOvertime = diffInSecs < 0;
      const absSecs = Math.abs(diffInSecs);
      
      const h = Math.floor(absSecs / 3600);
      const m = Math.floor((absSecs % 3600) / 60);
      const s = absSecs % 60;
      
      const formatted = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      
      // Progress calculation
      const entryDate = new Date(entry);
      if (!isValid(entryDate)) return { label: isOvertime ? "HORA EXTRA" : "FALTAM", time: formatted, isOvertime, progress: 0 };
      
      const totalWorkSecs = workMinutes * 60;
      const elapsedSecs = Math.floor((currentTime.getTime() - entryDate.getTime()) / 1000);
      const progress = Math.min(100, Math.max(0, (elapsedSecs / totalWorkSecs) * 100));

      return { 
        label: isOvertime ? "HORA EXTRA" : "FALTAM", 
        time: formatted, 
        isOvertime,
        progress
      };
    } catch (e) {
      return { label: "Erro", time: "00:00:00", isOvertime: false, progress: 0 };
    }
  }, [currentTime, displayExit, entry, workMinutes, isManualExit, stats]);

  const resetDefaults = () => {
    setWorkMinutes(DEFAULT_WORK_MINUTES);
    setEntry(DEFAULT_ENTRY);
    setLunchStart(DEFAULT_LUNCH_START);
    setLunchEnd(DEFAULT_LUNCH_END);
    setIsManualExit(false);
    setExitOverride("");
  };

  if (!mounted) return null;

  return (
    <div className="w-full selection:bg-emerald-500/30">
      <div className="max-w-7xl 2xl:max-w-[1600px] 4k:max-w-[2400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 4k:gap-24 items-start">
          
          {/* Main Calculator Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 space-y-8 4k:space-y-20"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-xl shadow-neutral-200/50 dark:shadow-none border border-neutral-200 dark:border-neutral-800 4k:p-24 4k:rounded-[4rem]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 4k:mb-20">
                <h2 className="text-2xl font-bold 4k:text-7xl">Sua Jornada</h2>
                <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-2xl 4k:p-3 4k:rounded-[2rem]">
                  <button 
                    onClick={() => handleManualToggle(false)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all 4k:px-12 4k:py-6 4k:text-3xl 4k:rounded-3xl ${!isManualExit ? 'bg-white dark:bg-neutral-700 shadow-md text-emerald-500' : 'text-neutral-400 hover:text-neutral-600'}`}
                  >
                    AUTO
                  </button>
                  <button 
                    onClick={() => handleManualToggle(true)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all 4k:px-12 4k:py-6 4k:text-3xl 4k:rounded-3xl ${isManualExit ? 'bg-white dark:bg-neutral-700 shadow-md text-emerald-500' : 'text-neutral-400 hover:text-neutral-600'}`}
                  >
                    MANUAL
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 4k:gap-12 mb-8 4k:mb-16">
                {/* Entry */}
                <DateTimeInput 
                  label="Entrada"
                  icon={LogIn}
                  value={entry}
                  onChange={setEntry}
                />

                {/* Lunch Start */}
                <DateTimeInput 
                  label="Saída Almoço"
                  icon={Coffee}
                  value={lunchStart}
                  onChange={setLunchStart}
                />

                {/* Lunch End */}
                <DateTimeInput 
                  label="Volta Almoço"
                  icon={RotateCcw}
                  className="[&_svg]:rotate-180"
                  value={lunchEnd}
                  onChange={setLunchEnd}
                />

                {/* Manual Exit Toggle/Input */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 4k:text-2xl">
                    <LogOut className="w-4 h-4 4k:w-8 4k:h-8" />
                    Saída Real
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                    <input 
                      type="text" 
                      placeholder="DD/MM/AAAA"
                      value={isManualExit ? manualExitDate : toBRDate(suggestedExit.split('T')[0] || '')}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length > 8) val = val.slice(0, 8);
                        if (val.length >= 5) {
                          val = val.slice(0, 2) + '/' + val.slice(2, 4) + '/' + val.slice(4);
                        } else if (val.length >= 3) {
                          val = val.slice(0, 2) + '/' + val.slice(2);
                        }
                        
                        setManualExitDate(val);
                        setIsManualExit(true);
                        const isoDate = fromBRDate(val);
                        if (isoDate) {
                          const timePart = (isManualExit ? exitOverride : suggestedExit).split('T')[1] || '00:00';
                          setExitOverride(`${isoDate}T${timePart}`);
                        }
                      }}
                      className={`flex-1 min-w-0 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 text-base font-semibold focus:ring-2 focus:ring-emerald-500 transition-all 4k:p-8 4k:text-3xl outline-none ${isManualExit ? 'text-emerald-500 border-emerald-500/30' : ''}`}
                    />
                    <input 
                      type="text" 
                      placeholder="00:00"
                      value={(isManualExit ? exitOverride : suggestedExit).split('T')[1] || ''}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length > 4) val = val.slice(0, 4);
                        if (val.length >= 3) {
                          val = val.slice(0, 2) + ':' + val.slice(2);
                        }
                        const datePart = (isManualExit ? exitOverride : suggestedExit).split('T')[0] || format(new Date(), 'yyyy-MM-dd');
                        setExitOverride(`${datePart}T${val}`);
                        setIsManualExit(true);
                      }}
                      className={`w-full sm:w-32 4k:w-64 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 text-base font-semibold focus:ring-2 focus:ring-emerald-500 transition-all 4k:p-8 4k:text-3xl outline-none text-center ${isManualExit ? 'text-emerald-500 border-emerald-500/30' : ''}`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button 
                  onClick={resetDefaults}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-emerald-500 transition-colors 4k:text-2xl 4k:gap-4"
                >
                  <RotateCcw className="w-4 h-4 4k:w-8 4k:h-8" />
                  Resetar Horários
                </button>
                <div className="text-[10px] text-neutral-300 uppercase tracking-widest font-bold 4k:text-xl">
                  WorkLoad
                </div>
              </div>
            </div>

            {/* Mobile Result Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden"
            >
              <div className={`rounded-3xl p-8 text-white shadow-xl overflow-hidden relative transition-colors duration-700 ${timerData.isOvertime ? 'bg-rose-500 shadow-rose-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 opacity-80">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm font-bold tracking-wider uppercase">{timerData.label}</span>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                      {format(currentTime, 'HH:mm:ss', { useAdditionalDayOfYearTokens: false })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-4xl sm:text-6xl font-black tracking-tighter tabular-nums text-center break-words">
                      {timerData.time}
                    </p>
                    
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${timerData.progress}%` }}
                          className="h-full bg-white"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold opacity-60">
                        <span>ENTRADA {safeFormat(entry, 'HH:mm')}</span>
                        <span>SAÍDA {safeFormat(displayExit, 'HH:mm')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs opacity-70 uppercase font-bold mb-1">Saída {isManualExit ? 'Real' : 'Sugerida'}</p>
                      <p className="text-3xl font-black">{safeFormat(displayExit, 'HH:mm')}</p>
                    </div>
                    <button 
                      onClick={copyToClipboard}
                      className="p-4 bg-white/10 rounded-2xl active:scale-95 transition-transform"
                    >
                      {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Balance & Overtime Section */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                 {/* Balance Card */}
                 <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm 4k:p-16 text-center flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <h3 className="text-lg font-bold 4k:text-4xl">Balanço do Dia</h3>
                      <div className={`p-2 rounded-xl 4k:p-4 ${stats.balance >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        {stats.balance >= 0 ? <TrendingUp className="w-5 h-5 4k:w-10 4k:h-10" /> : <TrendingDown className="w-5 h-5 4k:w-10 4k:h-10" />}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className={`text-4xl font-black tracking-tight 4k:text-7xl ${stats.balance >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {formatBalance(stats.balance)}
                      </p>
                      <p className="text-sm text-neutral-500 4k:text-2xl">
                        {stats.balance >= 0 ? 'Horas extras acumuladas' : 'Horas em débito hoje'}
                      </p>
                    </div>
                 </div>

                 {/* Overtime Details */}
                 <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm 4k:p-16 text-center flex flex-col items-center justify-center">
                    <h3 className="text-lg font-bold mb-6 4k:text-4xl">Extras (CLT)</h3>
                    <div className="w-full max-w-[240px] mx-auto space-y-4 4k:space-y-8 4k:max-w-none">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-neutral-500 4k:text-2xl">
                          <Zap className="w-4 h-4 text-amber-500 4k:w-8 4k:h-8" />
                          Extra 75%
                        </div>
                        <span className="font-bold 4k:text-3xl">{Math.floor(stats.overtime75 / 60)}h {Math.round(stats.overtime75 % 60)}m</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-neutral-500 4k:text-2xl">
                          <Zap className="w-4 h-4 text-rose-500 4k:w-8 4k:h-8" />
                          Extra 100%
                        </div>
                        <span className="font-bold 4k:text-3xl">{Math.floor(stats.overtime100 / 60)}h {Math.round(stats.overtime100 % 60)}m</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-neutral-500 4k:text-2xl">
                          <MoonStar className="w-4 h-4 text-indigo-500 4k:w-8 4k:h-8" />
                          Adic. Noturno
                        </div>
                        <span className="font-bold 4k:text-3xl">{Math.floor(stats.nightMinutes / 60)}h {stats.nightMinutes % 60}m</span>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Result Card (Desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block lg:col-span-5 sticky top-32 4k:top-64"
          >
            <div className={`rounded-3xl p-12 text-white shadow-2xl overflow-hidden relative 4k:p-24 4k:rounded-[4rem] transition-colors duration-700 ${timerData.isOvertime ? 'bg-rose-500 shadow-rose-500/30' : 'bg-emerald-500 shadow-emerald-500/30'}`}>
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 4k:w-80 4k:h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 4k:w-80 4k:h-80 bg-black/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 space-y-8 4k:space-y-16">
                {/* Real-time Timer Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 opacity-80 4k:gap-6">
                    <Clock className="w-6 h-6 4k:w-12 4k:h-12" />
                    <span className="text-lg font-medium tracking-wide uppercase 4k:text-4xl">
                      {timerData.label}
                    </span>
                  </div>
                  <div className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold 4k:text-2xl 4k:px-8 4k:py-3">
                    {format(currentTime, 'HH:mm:ss', { useAdditionalDayOfYearTokens: false })}
                  </div>
                </div>

                {/* Main Timer Display */}
                <div className="space-y-4 4k:space-y-8 text-center">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-6xl xl:text-8xl font-black tracking-tighter 4k:text-[14rem] tabular-nums"
                  >
                    {timerData.time}
                  </motion.p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden 4k:h-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${timerData.progress}%` }}
                        className="h-full bg-white"
                      />
                    </div>
                    <div className="flex justify-between text-xs font-bold opacity-60 4k:text-xl">
                      <span>{safeFormat(entry, 'HH:mm')}</span>
                      <span>{safeFormat(displayExit, 'HH:mm')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 4k:pt-16">
                  <div className="flex items-center justify-between mb-4 4k:mb-8">
                    <div className="flex items-center gap-2 opacity-80 4k:gap-4">
                      <LogOut className="w-5 h-5 4k:w-10 4k:h-10" />
                      <span className="text-sm font-medium uppercase 4k:text-2xl">
                        {isManualExit ? 'Saída Informada' : 'Saída Sugerida'}
                      </span>
                    </div>
                    <button 
                      onClick={copyToClipboard}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors 4k:p-4 4k:rounded-xl"
                      title="Copiar horário"
                    >
                      {copied ? <Check className="w-5 h-5 4k:w-10 4k:h-10" /> : <Copy className="w-5 h-5 4k:w-10 4k:h-10" />}
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-3xl xl:text-4xl font-bold tracking-tight 4k:text-8xl">
                      {safeFormat(displayExit, 'HH:mm')}
                    </p>
                    <p className="text-white/70 text-sm mt-2 4k:text-2xl">
                      {isManualExit 
                        ? `Total: ${Math.floor(stats.totalWorked / 60)}h ${stats.totalWorked % 60}m`
                        : `Carga: ${Math.floor(workMinutes / 60)}h${workMinutes % 60}m`
                      }
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4 4k:p-12 4k:gap-8 4k:rounded-[2.5rem]">
                  <CheckCircle2 className="w-8 h-8 text-white/80 4k:w-16 4k:h-16" />
                  <p className="text-sm leading-relaxed 4k:text-3xl">
                    {stats.balance > 0 
                      ? `Você acumulou ${formatBalance(stats.balance)} de horas extras hoje!` 
                      : stats.balance < 0 
                        ? `Faltam ${formatBalance(stats.balance).replace('-', '')} para completar sua jornada.`
                        : 'Jornada completa com perfeição!'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-2xl 4k:max-w-3xl 4k:p-16"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold 4k:text-4xl">Configurações</h3>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-5 h-5 4k:w-10 4k:h-10" />
                </button>
              </div>

              <div className="space-y-6 4k:space-y-12">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-neutral-500 4k:text-2xl">Carga Horária (Minutos)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      value={workMinutes}
                      onChange={(e) => setWorkMinutes(parseInt(e.target.value) || 0)}
                      className="flex-1 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl p-4 font-semibold 4k:p-8 4k:text-3xl"
                    />
                    <span className="text-neutral-400 4k:text-2xl">
                      ({Math.floor(workMinutes / 60)}h {workMinutes % 60}m)
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 4k:p-8">
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 4k:text-2xl">
                    As configurações são salvas automaticamente no seu navegador.
                  </p>
                </div>

                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 4k:py-8 4k:text-3xl"
                >
                  Salvar e Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-10 text-center text-neutral-400 text-sm 4k:text-2xl">
        <p>© {new Date().getFullYear()} WorkLoad. Feito para facilitar seu dia.</p>
      </footer>
    </div>
  );
}
