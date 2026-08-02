import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSalaryCalculator } from "@/hooks/use-salary-calculator";

describe("useSalaryCalculator", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts from the default salary and monthly hours", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    expect(result.current.grossSalary).toBe(5000);
    expect(result.current.monthlyHours).toBe(220);
  });

  it("derives net salary and rates from the current tax tables", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    expect(result.current.autoInss).toBe(501.51);
    expect(result.current.autoIrrf).toBe(0);
    expect(result.current.stats.netSalary).toBe(4498.49);
    expect(result.current.stats.hourlyRate).toBeCloseTo(20.4477, 4);
    expect(result.current.stats.minuteRate).toBeCloseTo(0.3408, 4);
  });

  it("restores previously stored values", () => {
    localStorage.setItem("grossSalary", "9000");
    localStorage.setItem("monthlyHours", "180");
    localStorage.setItem("extraGains", JSON.stringify([{ id: "gain-1", name: "Vale", value: 600 }]));
    localStorage.setItem("extraDeductions", JSON.stringify([{ id: "deduction-1", name: "Plano", value: 250 }]));

    const { result } = renderHook(() => useSalaryCalculator());

    expect(result.current.grossSalary).toBe(9000);
    expect(result.current.monthlyHours).toBe(180);
    expect(result.current.stats.totalExtraGains).toBe(600);
    expect(result.current.stats.totalExtraDeductions).toBe(250);
  });

  it("falls back to defaults when stored numbers are unusable", () => {
    localStorage.setItem("grossSalary", "not-a-number");
    localStorage.setItem("monthlyHours", "-40");

    const { result } = renderHook(() => useSalaryCalculator());

    expect(result.current.grossSalary).toBe(5000);
    expect(result.current.monthlyHours).toBe(220);
  });

  it("ignores stored lists that are corrupted or wrongly shaped", () => {
    localStorage.setItem("extraGains", "{not json");
    localStorage.setItem("extraDeductions", JSON.stringify({ nope: true }));

    const { result } = renderHook(() => useSalaryCalculator());

    expect(result.current.extraGains).toEqual([]);
    expect(result.current.extraDeductions).toEqual([]);
  });

  it("drops individual stored items that fail validation", () => {
    localStorage.setItem(
      "extraGains",
      JSON.stringify([
        { id: "valid", name: "Bônus", value: 100 },
        { id: "missing-value", name: "Quebrado" },
        { id: 42, name: "Id errado", value: 10 },
        { id: "nan", name: "NaN", value: Number.NaN },
        null,
      ]),
    );

    const { result } = renderHook(() => useSalaryCalculator());

    expect(result.current.extraGains).toEqual([{ id: "valid", name: "Bônus", value: 100 }]);
  });

  it("does not overwrite stored values before restoring them", () => {
    localStorage.setItem("grossSalary", "7777");

    renderHook(() => useSalaryCalculator());

    expect(localStorage.getItem("grossSalary")).toBe("7777");
  });

  it("persists changes made after the initial restore", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    act(() => {
      result.current.setGrossSalary(12000);
      result.current.setMonthlyHours(200);
    });

    expect(localStorage.getItem("grossSalary")).toBe("12000");
    expect(localStorage.getItem("monthlyHours")).toBe("200");
  });

  it("adds, updates and removes extra deductions", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    act(() => {
      result.current.addExtra("deduction");
    });
    const { id } = result.current.extraDeductions[0];

    act(() => {
      result.current.updateExtra(id, "deduction", "name", "Plano de Saúde");
      result.current.updateExtra(id, "deduction", "value", 320);
    });

    expect(result.current.extraDeductions[0]).toEqual({
      id,
      name: "Plano de Saúde",
      value: 320,
    });
    expect(result.current.stats.totalExtraDeductions).toBe(320);

    act(() => {
      result.current.removeExtra(id, "deduction");
    });

    expect(result.current.extraDeductions).toEqual([]);
  });

  it("adds, updates and removes extra gains", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    act(() => {
      result.current.addExtra("gain");
    });
    const { id } = result.current.extraGains[0];

    act(() => {
      result.current.updateExtra(id, "gain", "value", 500);
    });

    expect(result.current.stats.totalExtraGains).toBe(500);
    expect(result.current.stats.totalValue).toBe(result.current.stats.netSalary + 500);

    act(() => {
      result.current.removeExtra(id, "gain");
    });

    expect(result.current.extraGains).toEqual([]);
  });

  it("coerces unusable extra values to zero instead of poisoning the totals", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    act(() => {
      result.current.addExtra("gain");
    });
    const { id } = result.current.extraGains[0];

    act(() => {
      result.current.updateExtra(id, "gain", "value", "abc");
    });

    expect(result.current.extraGains[0].value).toBe(0);
    expect(result.current.stats.totalValue).toBe(result.current.stats.netSalary);
  });

  it("leaves the list untouched when updating an unknown id", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    act(() => {
      result.current.addExtra("gain");
    });
    const before = result.current.extraGains;

    act(() => {
      result.current.updateExtra("does-not-exist", "gain", "value", 999);
    });

    expect(result.current.extraGains).toEqual(before);
  });

  it("honours manual INSS and IRRF overrides", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    act(() => {
      result.current.setManualInss(0);
      result.current.setManualIrrf(0);
    });

    expect(result.current.stats.inss).toBe(0);
    expect(result.current.stats.irrf).toBe(0);
    expect(result.current.stats.netSalary).toBe(5000);
  });

  it("recomputes the income tax from a manual INSS override", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    act(() => {
      result.current.setGrossSalary(10000);
    });
    const withAutoInss = result.current.autoIrrf;

    act(() => {
      result.current.setManualInss(0);
    });

    expect(result.current.autoIrrf).toBeGreaterThan(withAutoInss);
  });

  it("keeps the daily journey in minutes and scales the daily value by it", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    expect(result.current.dailyMinutes).toBe(528);

    act(() => {
      result.current.setPeriod("day");
      result.current.setDailyMinutes(450);
    });

    expect(localStorage.getItem("dailyMinutes")).toBe("450");
    expect(result.current.stats.periodValue).toBeCloseTo(result.current.stats.hourlyRate * 7.5, 6);
  });

  it("has no hourly value while the monthly hours are cleared", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    act(() => {
      result.current.setMonthlyHours(0);
    });

    expect(result.current.stats.hourlyRate).toBe(0);
    expect(result.current.stats.minuteRate).toBe(0);
    expect(result.current.stats.periodValue).toBe(0);
  });

  it("restores manual INSS and IRRF overrides", () => {
    localStorage.setItem("manualInss", "320");
    localStorage.setItem("manualIrrf", "180");

    const { result } = renderHook(() => useSalaryCalculator());

    expect(result.current.manualInss).toBe(320);
    expect(result.current.manualIrrf).toBe(180);
    expect(result.current.stats.inss).toBe(320);
    expect(result.current.stats.irrf).toBe(180);
  });

  it("starts without manual overrides when nothing was stored", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    expect(result.current.manualInss).toBeNull();
    expect(result.current.manualIrrf).toBeNull();
  });

  it("persists the manual overrides and forgets them once cleared", () => {
    const { result } = renderHook(() => useSalaryCalculator());

    act(() => {
      result.current.setManualInss(410);
      result.current.setManualIrrf(90);
    });

    expect(localStorage.getItem("manualInss")).toBe("410");
    expect(localStorage.getItem("manualIrrf")).toBe("90");

    act(() => {
      result.current.setManualInss(null);
      result.current.setManualIrrf(null);
    });

    expect(localStorage.getItem("manualInss")).toBeNull();
    expect(localStorage.getItem("manualIrrf")).toBeNull();
  });
});
