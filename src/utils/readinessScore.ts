export type EmploymentStatus = 'employed' | 'self-employed' | 'contract' | 'retired' | 'unemployed';
export type TenureRange = '<1' | '1-2' | '2-5' | '5-10' | '10+';
export type EmergencyFundRange = '<1' | '1-3' | '3-6' | '6+';
export type CreditTier = 'excellent' | 'good' | 'fair' | 'poor' | 'unsure';

export interface ReadinessInputs {
  employmentStatus: EmploymentStatus;
  yearsAtJob: TenureRange;
  annualIncome: number;

  monthlyDebts: number;

  downPayment: number;
  targetHomePrice: number;
  emergencyFund: EmergencyFundRange;

  creditScore: CreditTier;

  state: string;
}

export interface DimensionScore {
  raw: number;
  weight: number;
  weighted: number;
}

export interface ReadinessResult {
  total: number;
  income: DimensionScore;
  debt: DimensionScore;
  savings: DimensionScore;
  credit: DimensionScore;
  market: DimensionScore;
  dti: number;
  downPaymentPercent: number;
  label: string;
  labelDescription: string;
}

const EMPLOYMENT_BASE: Record<EmploymentStatus, number> = {
  'employed': 88,
  'self-employed': 70,
  'contract': 50,
  'retired': 68,
  'unemployed': 15
};

const TENURE_BONUS: Record<TenureRange, number> = {
  '<1': 0,
  '1-2': 5,
  '2-5': 10,
  '5-10': 12,
  '10+': 15
};

function incomeLevelMultiplier(income: number): number {
  if (income >= 200000) return 5;
  if (income >= 150000) return 3;
  if (income >= 100000) return 0;
  if (income >= 75000) return -3;
  if (income >= 50000) return -6;
  return -12;
}

function calculateIncomeScore(inputs: ReadinessInputs): number {
  const base = EMPLOYMENT_BASE[inputs.employmentStatus];
  if (inputs.employmentStatus === 'unemployed') return base;
  const tenure = TENURE_BONUS[inputs.yearsAtJob];
  const level = incomeLevelMultiplier(inputs.annualIncome);
  return Math.max(0, Math.min(100, base + tenure + level));
}

function dtiBracket(inputs: ReadinessInputs): number {
  if (inputs.annualIncome <= 0) return 100;
  const monthlyIncome = inputs.annualIncome / 12;
  const dti = (inputs.monthlyDebts / monthlyIncome) * 100;
  return dti;
}

function calculateDebtScore(inputs: ReadinessInputs): number {
  const dti = dtiBracket(inputs);
  let score: number;
  if (dti < 8) score = 95;
  else if (dti < 15) score = 83;
  else if (dti < 22) score = 68;
  else if (dti < 28) score = 52;
  else if (dti < 36) score = 35;
  else if (dti < 43) score = 18;
  else score = 8;

  if (inputs.employmentStatus === 'unemployed') {
    score = Math.max(5, score - 25);
  }
  return Math.max(0, Math.min(100, score));
}

const EF_SCORES: Record<EmergencyFundRange, number> = {
  '<1': 10,
  '1-3': 40,
  '3-6': 72,
  '6+': 92
};

function calculateSavingsScore(inputs: ReadinessInputs): number {
  const dpPct = inputs.targetHomePrice > 0
    ? (inputs.downPayment / inputs.targetHomePrice) * 100
    : 0;

  let dpScore: number;
  if (dpPct >= 20) dpScore = 95;
  else if (dpPct >= 15) dpScore = 85;
  else if (dpPct >= 10) dpScore = 70;
  else if (dpPct >= 5) dpScore = 52;
  else if (dpPct >= 3) dpScore = 32;
  else dpScore = 12;

  const efScore = EF_SCORES[inputs.emergencyFund];

  return Math.round(0.55 * dpScore + 0.45 * efScore);
}

const CREDIT_SCORES: Record<CreditTier, number> = {
  'excellent': 95,
  'good': 75,
  'fair': 45,
  'poor': 12,
  'unsure': 50
};

function calculateCreditScore(inputs: ReadinessInputs): number {
  return CREDIT_SCORES[inputs.creditScore];
}

function calculateMarketScore(_inputs: ReadinessInputs): number {
  return 65;
}

export function calculateReadiness(inputs: ReadinessInputs): ReadinessResult {
  const income = calculateIncomeScore(inputs);
  const debt = calculateDebtScore(inputs);
  const savings = calculateSavingsScore(inputs);
  const credit = calculateCreditScore(inputs);
  const market = calculateMarketScore(inputs);

  const weights = {
    income: 0.20,
    debt: 0.25,
    savings: 0.25,
    credit: 0.20,
    market: 0.10
  };

  const total = Math.round(
    income * weights.income +
    debt * weights.debt +
    savings * weights.savings +
    credit * weights.credit +
    market * weights.market
  );

  let label: string;
  let labelDescription: string;
  if (total >= 85) {
    label = "Strong";
    labelDescription = "Your financial profile compares well against common home-buying guidelines across most dimensions.";
  } else if (total >= 65) {
    label = "Developing";
    labelDescription = "Some areas of your financial profile align with general guidelines while others may benefit from attention.";
  } else if (total >= 40) {
    label = "Building";
    labelDescription = "Several areas of your financial profile differ from common benchmarks. Many prospective buyers start here.";
  } else {
    label = "Early Stage";
    labelDescription = "Your financial profile is in a formative stage relative to common home-buying guidelines. This is a typical starting point.";
  }

  return {
    total,
    income: { raw: income, weight: weights.income, weighted: Math.round(income * weights.income) },
    debt: { raw: debt, weight: weights.debt, weighted: Math.round(debt * weights.debt) },
    savings: { raw: savings, weight: weights.savings, weighted: Math.round(savings * weights.savings) },
    credit: { raw: credit, weight: weights.credit, weighted: Math.round(credit * weights.credit) },
    market: { raw: market, weight: weights.market, weighted: Math.round(market * weights.market) },
    dti: dtiBracket(inputs),
    downPaymentPercent: inputs.targetHomePrice > 0
      ? (inputs.downPayment / inputs.targetHomePrice) * 100
      : 0,
    label,
    labelDescription
  };
}

export const DEFAULT_INPUTS: ReadinessInputs = {
  employmentStatus: 'employed',
  yearsAtJob: '2-5',
  annualIncome: 95000,
  monthlyDebts: 450,
  downPayment: 40000,
  targetHomePrice: 350000,
  emergencyFund: '3-6',
  creditScore: 'good',
  state: 'CA'
};

export const EMPLOYMENT_LABELS: Record<EmploymentStatus, string> = {
  'employed': 'Employed Full-Time',
  'self-employed': 'Self-Employed',
  'contract': 'Contract / Gig',
  'retired': 'Retired',
  'unemployed': 'Not Currently Employed'
};

export const TENURE_LABELS: Record<TenureRange, string> = {
  '<1': 'Less than 1 year',
  '1-2': '1–2 years',
  '2-5': '2–5 years',
  '5-10': '5–10 years',
  '10+': '10+ years'
};

export const EF_LABELS: Record<EmergencyFundRange, string> = {
  '<1': 'Less than 1 month',
  '1-3': '1–3 months',
  '3-6': '3–6 months',
  '6+': '6+ months'
};

export const CREDIT_LABELS: Record<CreditTier, string> = {
  'excellent': 'Excellent (760+)',
  'good': 'Good (700–759)',
  'fair': 'Fair (640–699)',
  'poor': 'Below 640',
  'unsure': 'Not Sure'
};
