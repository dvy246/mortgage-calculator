export type ScenarioType = 'mortgage' | 'refinance' | 'extra-payment' | 'affordability';

export interface Scenario {
  id: string;
  name: string;
  type: ScenarioType;
  inputs: Record<string, number | boolean | string>;
  outputs: {
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    payoffYears: number;
    monthlyPI?: number;
    homePrice?: number;
    downPayment?: number;
    interestRate?: number;
    termYears?: number;
    monthlyTax?: number;
    monthlyInsurance?: number;
    monthlyPMI?: number;
    monthlyHOA?: number;
    pmiCancellationMonth?: number;
    equityAt5yr?: number;
    interestSaved?: number;
    yearsSaved?: number;
    monthlySavings?: number;
    breakEvenMonths?: number;
    lifetimeSavings?: number;
  };
  createdAt: number;
}

const STORAGE_KEY = 'mi_scenarios';

export function getScenarios(): Scenario[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveScenarios(scenarios: Scenario[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
  } catch {
    // localStorage full or unavailable
  }
}

export function deleteScenario(id: string): void {
  const list = getScenarios().filter(s => s.id !== id);
  saveScenarios(list);
}

export function duplicateScenario(id: string): Scenario | null {
  const list = getScenarios();
  const original = list.find(s => s.id === id);
  if (!original) return null;
  const copy: Scenario = {
    ...original,
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
    name: `${original.name} (Copy)`,
    createdAt: Date.now()
  };
  list.push(copy);
  saveScenarios(list);
  return copy;
}

export function updateScenario(id: string, updates: Partial<Scenario>): void {
  const list = getScenarios();
  const idx = list.findIndex(s => s.id === id);
  if (idx === -1) return;
  list[idx] = { ...list[idx], ...updates };
  saveScenarios(list);
}

export function addScenario(scenario: Scenario): void {
  const list = getScenarios();
  list.push(scenario);
  saveScenarios(list);
}

export function getScenario(id: string): Scenario | undefined {
  return getScenarios().find(s => s.id === id);
}

const HASH_PREFIX = 'scenarios=';

export function scenariosToHash(scenarios: Scenario[]): string {
  const minimal = scenarios.map(s => ({
    n: s.name,
    t: s.type,
    i: s.inputs,
    o: {
      m: s.outputs.monthlyPayment,
      ti: s.outputs.totalInterest,
      tc: s.outputs.totalCost,
      py: s.outputs.payoffYears
    }
  }));
  try {
    const json = JSON.stringify(minimal);
    const encoded = encodeURIComponent(json);
    if (encoded.length > 1800) return '';
    return `#${HASH_PREFIX}${encoded}`;
  } catch {
    return '';
  }
}

export function hashToScenarios(hash: string): Scenario[] | null {
  if (!hash || !hash.startsWith(`#${HASH_PREFIX}`)) return null;
  try {
    const json = decodeURIComponent(hash.replace(`#${HASH_PREFIX}`, ''));
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return null;
    return parsed.map((s: any) => ({
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      name: s.n || 'Shared Scenario',
      type: s.t || 'mortgage',
      inputs: s.i || {},
      outputs: {
        monthlyPayment: s.o?.m || 0,
        totalInterest: s.o?.ti || 0,
        totalCost: s.o?.tc || 0,
        payoffYears: s.o?.py || 30
      },
      createdAt: Date.now()
    }));
  } catch {
    return null;
  }
}

export function loadFromURL(): Scenario[] | null {
  if (typeof window === 'undefined') return null;
  return hashToScenarios(window.location.hash);
}

export function clearAllScenarios(): void {
  saveScenarios([]);
}

export function autoCapture(
  type: ScenarioType,
  inputs: Record<string, number | boolean | string>,
  outputs: {
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    payoffYears: number;
    [key: string]: number | undefined;
  }
): void {
  const list = getScenarios();
  const name = `${type === 'refinance' ? 'Refi' : type === 'extra-payment' ? 'Extra' : type === 'affordability' ? 'Afford' : 'Mortgage'} ${list.length + 1}`;
  const scenario: Scenario = {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
    name,
    type,
    inputs: { ...inputs },
    outputs: {
      monthlyPayment: outputs.monthlyPayment,
      totalInterest: outputs.totalInterest,
      totalCost: outputs.totalCost,
      payoffYears: outputs.payoffYears,
      monthlyPI: outputs.monthlyPI,
      homePrice: outputs.homePrice,
      downPayment: outputs.downPayment,
      interestRate: outputs.interestRate,
      termYears: outputs.termYears,
      monthlyTax: outputs.monthlyTax,
      monthlyInsurance: outputs.monthlyInsurance,
      monthlyPMI: outputs.monthlyPMI,
      monthlyHOA: outputs.monthlyHOA,
      pmiCancellationMonth: outputs.pmiCancellationMonth,
      equityAt5yr: outputs.equityAt5yr,
      interestSaved: outputs.interestSaved,
      yearsSaved: outputs.yearsSaved,
      monthlySavings: outputs.monthlySavings,
      breakEvenMonths: outputs.breakEvenMonths,
      lifetimeSavings: outputs.lifetimeSavings
    },
    createdAt: Date.now()
  };
  list.push(scenario);
  saveScenarios(list);
}

export function formatCurrency(val: number): string {
  return `$${Math.round(val).toLocaleString('en-US')}`;
}

export function formatPercent(val: number): string {
  return `${val.toFixed(2)}%`;
}

export function formatYears(val: number): string {
  const yrs = Math.floor(val);
  const mos = Math.round((val - yrs) * 12);
  if (mos === 0) return `${yrs} yr${yrs !== 1 ? 's' : ''}`;
  return `${yrs} yr${yrs !== 1 ? 's' : ''} ${mos} mo${mos !== 1 ? 's' : ''}`;
}
