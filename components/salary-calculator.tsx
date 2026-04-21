'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  Clock, 
  MinusCircle, 
  PlusCircle, 
  TrendingDown, 
  TrendingUp, 
  Calculator,
  Trash2,
  Info,
  ChevronDown,
  ChevronUp,
  Wallet
} from 'lucide-react';

interface ExtraItem {
  id: string;
  name: string;
  value: number;
}

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(5000);
  const [monthlyHours, setMonthlyHours] = useState<number>(220);
  const [manualInss, setManualInss] = useState<number | null>(null);
  const [manualIrrf, setManualIrrf] = useState<number | null>(null);
  const [extraDeductions, setExtraDeductions] = useState<ExtraItem[]>([]);
  const [extraGains, setExtraGains] = useState<ExtraItem[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  // INSS 2026 Rules (Progressive)
  const calculateInss = (salary: number) => {
    const brackets = [
      { limit: 1518.00, rate: 0.075 },
      { limit: 2793.88, rate: 0.09 },
      { limit: 4190.83, rate: 0.12 },
      { limit: 8157.41, rate: 0.14 }
    ];

    let inss = 0;
    let remaining = Math.min(salary, 8157.41);
    let lastLimit = 0;

    for (const bracket of brackets) {
      if (remaining > lastLimit) {
        const amountInBracket = Math.min(remaining, bracket.limit) - lastLimit;
        inss += amountInBracket * bracket.rate;
        lastLimit = bracket.limit;
      } else {
        break;
      }
    }

    return Number(inss.toFixed(2));
  };

  // IRRF 2026 Rules
  const calculateIrrf = (salary: number, inssAmount: number) => {
    const base = salary - inssAmount;
    const brackets = [
      { limit: 2259.20, rate: 0, deduction: 0 },
      { limit: 2826.65, rate: 0.075, deduction: 169.44 },
      { limit: 3751.05, rate: 0.15, deduction: 381.44 },
      { limit: 4664.68, rate: 0.225, deduction: 662.77 },
      { limit: Infinity, rate: 0.275, deduction: 896.00 }
    ];

    const bracket = brackets.find(b => base <= b.limit) || brackets[brackets.length - 1];
    const irrf = (base * bracket.rate) - bracket.deduction;
    return Math.max(0, Number(irrf.toFixed(2)));
  };

  const autoInss = useMemo(() => calculateInss(grossSalary), [grossSalary]);
  const autoIrrf = useMemo(() => calculateIrrf(grossSalary, manualInss ?? autoInss), [grossSalary, manualInss, autoInss]);

  const stats = useMemo(() => {
    const inss = manualInss ?? autoInss;
    const irrf = manualIrrf ?? autoIrrf;
    const totalExtraDeductions = extraDeductions.reduce((acc, item) => acc + item.value, 0);
    const totalExtraGains = extraGains.reduce((acc, item) => acc + item.value, 0);

    const netSalary = grossSalary - inss - irrf - totalExtraDeductions;
    const totalValue = netSalary + totalExtraGains;

    const hourlyRate = totalValue / monthlyHours;
    const minuteRate = hourlyRate / 60;

    return {
      inss,
      irrf,
      totalExtraDeductions,
      totalExtraGains,
      netSalary,
      totalValue,
      hourlyRate,
      minuteRate
    };
  }, [grossSalary, monthlyHours, manualInss, autoInss, manualIrrf, autoIrrf, extraDeductions, extraGains]);

  const addExtra = (type: 'gain' | 'deduction') => {
    const newItem = { id: Math.random().toString(36).substr(2, 9), name: '', value: 0 };
    if (type === 'gain') setExtraGains([...extraGains, newItem]);
    else setExtraDeductions([...extraDeductions, newItem]);
  };

  const updateExtra = (id: string, type: 'gain' | 'deduction', field: 'name' | 'value', val: any) => {
    const list = type === 'gain' ? [...extraGains] : [...extraDeductions];
    const index = list.findIndex(item => item.id === id);
    if (index > -1) {
      list[index] = { ...list[index], [field]: field === 'value' ? Number(val) : val };
      if (type === 'gain') setExtraGains(list);
      else setExtraDeductions(list);
    }
  };

  const removeExtra = (id: string, type: 'gain' | 'deduction') => {
    if (type === 'gain') setExtraGains(extraGains.filter(item => item.id !== id));
    else setExtraDeductions(extraDeductions.filter(item => item.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-4 sm:p-0">
      {/* Main Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm 4k:p-16">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-4 4k:text-2xl">
            <DollarSign className="w-4 h-4" />
            Salário Bruto
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">R$</span>
            <input 
              type="number"
              value={grossSalary || ''}
              onChange={(e) => setGrossSalary(Number(e.target.value))}
              className="w-full pl-12 pr-4 py-4 bg-neutral-50 dark:bg-neutral-950 border-none rounded-2xl text-2xl font-bold focus:ring-2 focus:ring-indigo-500 transition-all 4k:text-5xl 4k:py-8"
              placeholder="0,00"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm 4k:p-16">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-4 4k:text-2xl">
            <Clock className="w-4 h-4" />
            Horas Mensais
          </label>
          <div className="relative">
            <input 
              type="number"
              value={monthlyHours || ''}
              onChange={(e) => setMonthlyHours(Number(e.target.value))}
              className="w-full px-4 py-4 bg-neutral-50 dark:bg-neutral-950 border-none rounded-2xl text-2xl font-bold focus:ring-2 focus:ring-indigo-500 transition-all 4k:text-5xl 4k:py-8"
              placeholder="220"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">h</span>
          </div>
        </div>
      </div>

      {/* Taxes & Deductions */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="w-full p-6 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-bold">Impostos e Descontos</h3>
              <p className="text-xs text-neutral-500">INSS, IRRF e outros</p>
            </div>
          </div>
          {showDetails ? <ChevronUp /> : <ChevronDown />}
        </button>

        <AnimatePresence>
          {showDetails && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-neutral-100 dark:border-neutral-800 p-6 space-y-6"
            >
              {/* INSS & IRRF */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-neutral-500 flex justify-between">
                    INSS (Automático: R$ {autoInss.toFixed(2)})
                    <button 
                      onClick={() => setManualInss(null)}
                      className="text-indigo-500 hover:underline"
                    >
                      Resetar
                    </button>
                  </label>
                  <input 
                    type="number"
                    value={manualInss ?? autoInss}
                    onChange={(e) => setManualInss(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border-none rounded-xl text-lg font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-neutral-500 flex justify-between">
                    IRRF (Automático: R$ {autoIrrf.toFixed(2)})
                    <button 
                      onClick={() => setManualIrrf(null)}
                      className="text-indigo-500 hover:underline"
                    >
                      Resetar
                    </button>
                  </label>
                  <input 
                    type="number"
                    value={manualIrrf ?? autoIrrf}
                    onChange={(e) => setManualIrrf(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border-none rounded-xl text-lg font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Extra Deductions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Outros Descontos</h4>
                  <button 
                    onClick={() => addExtra('deduction')}
                    className="flex items-center gap-1 text-xs font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
                  >
                    <PlusCircle className="w-3 h-3" /> Adicionar
                  </button>
                </div>
                <div className="space-y-2">
                  {extraDeductions.map(item => (
                    <div key={item.id} className="flex gap-2">
                      <input 
                        placeholder="Nome (ex: Plano de Saúde)"
                        value={item.name}
                        onChange={(e) => updateExtra(item.id, 'deduction', 'name', e.target.value)}
                        className="flex-1 px-4 py-2 bg-neutral-50 dark:bg-neutral-950 border-none rounded-xl text-sm"
                      />
                      <input 
                        type="number"
                        placeholder="Valor"
                        value={item.value || ''}
                        onChange={(e) => updateExtra(item.id, 'deduction', 'value', e.target.value)}
                        className="w-24 sm:w-32 px-4 py-2 bg-neutral-50 dark:bg-neutral-950 border-none rounded-xl text-sm font-medium"
                      />
                      <button 
                        onClick={() => removeExtra(item.id, 'deduction')}
                        className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Gains */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Benefícios e Adicionais</h4>
                  <button 
                    onClick={() => addExtra('gain')}
                    className="flex items-center gap-1 text-xs font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                  >
                    <PlusCircle className="w-3 h-3" /> Adicionar
                  </button>
                </div>
                <div className="space-y-2">
                  {extraGains.map(item => (
                    <div key={item.id} className="flex gap-2">
                      <input 
                        placeholder="Nome (ex: Vale Refeição)"
                        value={item.name}
                        onChange={(e) => updateExtra(item.id, 'gain', 'name', e.target.value)}
                        className="flex-1 px-4 py-2 bg-neutral-50 dark:bg-neutral-950 border-none rounded-xl text-sm"
                      />
                      <input 
                        type="number"
                        placeholder="Valor"
                        value={item.value || ''}
                        onChange={(e) => updateExtra(item.id, 'gain', 'value', e.target.value)}
                        className="w-24 sm:w-32 px-4 py-2 bg-neutral-50 dark:bg-neutral-950 border-none rounded-xl text-sm font-medium"
                      />
                      <button 
                        onClick={() => removeExtra(item.id, 'gain')}
                        className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Main Result Card */}
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm 4k:p-16 text-center flex flex-col items-center justify-center group hover:border-indigo-500/50 transition-colors">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h3 className="text-lg font-bold 4k:text-4xl">Valor da Hora</h3>
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl 4k:p-4 group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5 4k:w-10 4k:h-10" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-5xl font-black tracking-tight text-indigo-500 4k:text-8xl">
              R$ {stats.hourlyRate.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-neutral-500 4k:text-2xl">
              Equivale a R$ {stats.minuteRate.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por minuto
            </p>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm 4k:p-16 text-center flex flex-col items-center justify-center group hover:border-emerald-500/50 transition-colors">
          <h3 className="text-lg font-bold mb-6 4k:text-4xl">Resumo Financeiro</h3>
          <div className="w-full max-w-[280px] mx-auto space-y-4 4k:space-y-8 4k:max-w-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-neutral-500 4k:text-2xl">
                <TrendingUp className="w-4 h-4 text-neutral-400" />
                Salário Bruto
              </div>
              <span className="font-bold 4k:text-3xl">R$ {grossSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-neutral-500 4k:text-2xl">
                <TrendingDown className="w-4 h-4 text-rose-500" />
                Total Descontos
              </div>
              <span className="font-bold text-rose-500 4k:text-3xl">- R$ {(stats.inss + stats.irrf + stats.totalExtraDeductions).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-neutral-500 4k:text-2xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Salário Líquido
              </div>
              <span className="font-bold text-emerald-500 4k:text-3xl">R$ {stats.netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="h-px bg-neutral-100 dark:bg-neutral-800" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-500 4k:text-2xl">
                <PlusCircle className="w-4 h-4" />
                Total Real
              </div>
              <span className="font-black text-indigo-500 text-lg 4k:text-4xl">R$ {stats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
