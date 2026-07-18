import { loanPrograms, type LoanProgram } from '../data/blueprint';

export type ScenarioType = 'first-time' | 'moving-up' | 'refinance' | 'investment';
export type TimelineRange = '3mo' | '6mo' | '1yr' | '2yr+';
export type CreditRange = 'excellent' | 'good' | 'fair' | 'below-640' | 'unsure';
export type EmploymentType = 'w2' | 'self-employed' | 'veteran' | 'retired';
export type PropertyType = 'single-family' | 'condo' | 'multi-unit' | 'commercial';

export interface BlueprintInputs {
  scenario: ScenarioType;
  timeline: TimelineRange;
  annualIncome: number;
  monthlyDebts: number;
  savings: number;
  creditRange: CreditRange;
  targetPrice: number;
  state: string;
  employmentType: EmploymentType;
  propertyType: PropertyType;
}

export interface LoanProgramResult {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  explore: boolean;
  note: string;
  minDownPaymentPercent: number;
  downPaymentAmount: number;
  estimatedRate: string;
  estimatedMonthlyPayment: number;
  estimatedMonthlyMI: number;
  miLabel: string;
  miDetails: string;
  estimatedClosingCosts: number;
  keyFeatures: string[];
  guideSlug?: string;
  typicalRateNote: string;
}

export interface PreparationTopic {
  title: string;
  description: string;
  icon: string;
  guideUrl?: string;
}

export interface BlueprintResult {
  programs: LoanProgramResult[];
  preparationTopics: PreparationTopic[];
  estimatedClosingCostsLow: number;
  estimatedClosingCostsHigh: number;
  dti: number;
  downPaymentPercent: number;
  monthlyIncome: number;
}

function getCreditNumericMin(creditRange: CreditRange): number {
  switch (creditRange) {
    case 'excellent': return 760;
    case 'good': return 700;
    case 'fair': return 640;
    case 'below-640': return 500;
    case 'unsure': return 640;
  }
}

function getCreditNumericMax(creditRange: CreditRange): number {
  switch (creditRange) {
    case 'excellent': return 850;
    case 'good': return 759;
    case 'fair': return 699;
    case 'below-640': return 639;
    case 'unsure': return 760;
  }
}

function getRateForCredit(creditRange: CreditRange): number {
  switch (creditRange) {
    case 'excellent': return 6.5;
    case 'good': return 6.9;
    case 'fair': return 7.5;
    case 'below-640': return 8.25;
    case 'unsure': return 7.0;
  }
}

function getMIRate(loanProgram: LoanProgram, downPaymentPercent: number): number {
  if (!loanProgram.hasMI) return 0;
  if (loanProgram.slug === 'fha') {
    return 0.55;
  }
  if (downPaymentPercent >= 20) return 0;
  if (downPaymentPercent >= 15) return 0.38;
  if (downPaymentPercent >= 10) return 0.52;
  if (downPaymentPercent >= 5) return 0.78;
  return 0.85;
}

function monthlyPI(principal: number, annualRatePercent: number, termYears: number): number {
  if (annualRatePercent <= 0) return principal / (termYears * 12);
  const r = annualRatePercent / 100 / 12;
  const n = termYears * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function checkProgramScenarioFit(program: LoanProgram, inputs: BlueprintInputs): { fits: boolean; reasoning: string } {
  const creditMinMap: Record<string, number> = {
    'conventional': 620,
    'fha': 500,
    'va': 620,
    'usda': 640,
    'jumbo': 700
  };

  const creditScore = getCreditNumericMin(inputs.creditRange);
  const minForProgram = creditMinMap[program.slug] || 620;

  if (creditScore < minForProgram) {
    return { fits: false, reasoning: `Typically requires a credit score of ${minForProgram} or higher.` };
  }

  if (inputs.propertyType === 'commercial' && !program.propertyTypes.includes('commercial')) {
    return { fits: false, reasoning: 'Not typically available for commercial properties.' };
  }

  if (inputs.propertyType !== 'single-family' && !program.propertyTypes.includes(inputs.propertyType)) {
    if (inputs.propertyType === 'commercial') {
      return { fits: false, reasoning: 'Not typically available for commercial properties.' };
    }
    return { fits: false, reasoning: `May not be available for ${inputs.propertyType} properties — check with a lender.` };
  }

  if (program.slug === 'usda' && inputs.scenario === 'investment') {
    return { fits: false, reasoning: 'USDA loans are for primary residences only.' };
  }

  if (program.slug === 'usda' && inputs.propertyType === 'multi-unit') {
    return { fits: false, reasoning: 'USDA loans are for single-family properties only.' };
  }

  if (program.slug === 'fha' && inputs.scenario === 'investment') {
    return { fits: false, reasoning: 'FHA loans are for primary residences only.' };
  }

  if (program.slug === 'va' && inputs.scenario === 'investment') {
    return { fits: false, reasoning: 'VA loans are for primary residences only.' };
  }

  if (program.slug === 'va' && inputs.employmentType !== 'veteran') {
    return { fits: false, reasoning: 'Requires eligible veteran, active-duty, or qualifying spouse status.' };
  }

  const conformingLimit = program.conformingLimit || 10000000;
  if (inputs.targetPrice > conformingLimit && program.slug === 'conventional') {
    return { fits: false, reasoning: `Exceeds standard conforming loan limit of $${(conformingLimit / 1000).toLocaleString()}K in most areas. May need a jumbo loan.` };
  }

  if (program.slug === 'fha' && inputs.targetPrice > 1200000) {
    return { fits: false, reasoning: 'FHA loan limits vary by county. High-cost areas may have higher limits — check local FHA limits.' };
  }

  if (program.slug === 'usda' && inputs.targetPrice > 600000) {
    return { fits: false, reasoning: 'USDA loans have income and purchase price limits that vary by area. Most commonly used for moderately priced homes.' };
  }

  return { fits: true, reasoning: '' };
}

function getMinDownPaymentForProgram(program: LoanProgram, inputs: BlueprintInputs): number {
  if (program.slug === 'va') return 0;
  if (program.slug === 'usda') return 0;
  if (program.slug === 'fha') return 3.5;
  if (program.slug === 'conventional') {
    if (inputs.scenario === 'first-time') return 3;
    return 5;
  }
  if (program.slug === 'jumbo') return 15;
  return 20;
}

export function calculateBlueprint(inputs: BlueprintInputs): BlueprintResult {
  const monthlyIncome = inputs.annualIncome / 12;
  const dti = inputs.annualIncome > 0 ? (inputs.monthlyDebts / monthlyIncome) * 100 : 0;
  const downPaymentPercent = inputs.targetPrice > 0 ? (inputs.savings / inputs.targetPrice) * 100 : 0;
  const creditNumericMin = getCreditNumericMin(inputs.creditRange);
  const creditNumericMax = getCreditNumericMax(inputs.creditRange);
  const baseRate = getRateForCredit(inputs.creditRange);

  const programs: LoanProgramResult[] = loanPrograms
    .filter(p => {
      if (p.slug === 'va' && inputs.employmentType !== 'veteran') return true;
      if (inputs.propertyType === 'commercial' && p.slug !== 'conventional') {
        return p.slug === 'conventional';
      }
      return true;
    })
    .map(program => {
      const fit = checkProgramScenarioFit(program, inputs);
      const minDp = getMinDownPaymentForProgram(program, inputs);
      const dpForCalc = Math.max(minDp, Math.min(downPaymentPercent, 100));
      const loanAmount = inputs.targetPrice * (1 - dpForCalc / 100);
      const rate = baseRate + program.rateAdjustment;
      const monthlyPayment = monthlyPI(Math.max(0, loanAmount), rate, 30);
      const miRate = getMIRate(program, dpForCalc);
      const monthlyMI = (loanAmount * (miRate / 100)) / 12;

      let note: string;
      if (!fit.fits) {
        note = fit.reasoning;
      } else if (dpForCalc < minDp) {
        note = `Down payment of ${minDp}% or higher is typical. You may want to explore down payment assistance programs.`;
      } else {
        note = 'May be available based on common guidelines. Verify with a lender for current terms.';
      }

      const rateDisplay = `${rate.toFixed(1)}%`;
      const typicalRateNote = `For a credit profile around ${creditNumericMin}—${creditNumericMax}, rates typically range near ${rateDisplay}.`;

      return {
        slug: program.slug,
        name: program.name,
        shortName: program.shortName,
        description: program.description,
        explore: fit.fits && dpForCalc >= minDp,
        note: fit.fits && dpForCalc >= minDp ? '' : note,
        minDownPaymentPercent: minDp,
        downPaymentAmount: inputs.targetPrice * (minDp / 100),
        estimatedRate: rateDisplay,
        estimatedMonthlyPayment: Math.round(monthlyPayment + monthlyMI),
        estimatedMonthlyMI: Math.round(monthlyMI),
        miLabel: program.miLabel,
        miDetails: program.miDetails,
        estimatedClosingCosts: Math.round(inputs.targetPrice * 0.03),
        keyFeatures: program.keyFeatures,
        guideSlug: program.guideSlug,
        typicalRateNote
      };
    });

  const preparationTopics: PreparationTopic[] = [];

  if (inputs.propertyType === 'commercial') {
    preparationTopics.push({
      title: 'Commercial Property Financing',
      description: 'Commercial loans have different qualification requirements than residential mortgages. Lenders typically evaluate the property\'s income potential and your business financials.',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    });
  }

  if (downPaymentPercent < 20 && downPaymentPercent > 0) {
    preparationTopics.push({
      title: 'Down Payment Assistance Programs',
      description: 'Many states and local programs offer grants or low-interest loans to help with down payments. Check what is available in your area — eligibility varies by income, location, and buyer status.',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    });
  }

  if (dti > 36) {
    preparationTopics.push({
      title: 'Debt-to-Income Ratio',
      description: 'Your current DTI is above 36%, which is a common threshold referenced in lending guidelines. Reducing existing debt balances or increasing income may improve your options.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      guideUrl: '/guides/dti-ratio-explained-guide'
    });
  }

  preparationTopics.push({
    title: 'Credit Score Review',
    description: 'Check your credit reports from all three bureaus (Experian, Equifax, TransUnion) before applying. Review for errors and understand your score — no surprises when a lender pulls your report.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    guideUrl: '/guides/credit-score-mortgage-guide'
  });

  preparationTopics.push({
    title: 'Documentation Preparation',
    description: 'Lenders typically request recent tax returns, W-2s or 1099s, pay stubs, bank statements, and identification. Having these organized in advance can streamline the application process.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  });

  if (inputs.employmentType === 'self-employed') {
    preparationTopics.push({
      title: 'Self-Employment Documentation',
      description: 'Self-employed borrowers may need to provide 2 years of tax returns, profit and loss statements, and business documentation. Some lenders offer bank statement loan programs as an alternative.',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    });
  }

  if (inputs.scenario === 'first-time') {
    preparationTopics.push({
      title: 'First-Time Buyer Programs',
      description: 'Many states and lenders offer specialized programs for first-time buyers, including reduced down payment options, preferred rates, and education courses that may lower costs.',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      guideUrl: '/guides/first-time-home-buyer-guide'
    });
  }

  if (inputs.scenario === 'refinance') {
    preparationTopics.push({
      title: 'Refinance Considerations',
      description: 'Compare your current rate and payment against potential new terms. Consider the break-even period — how long it takes for monthly savings to exceed closing costs.',
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      guideUrl: '/guides/equity-and-refinance-guide'
    });
  }

  if (inputs.scenario === 'investment') {
    preparationTopics.push({
      title: 'Investment Property Financing',
      description: 'Interest rates and down payment requirements are typically higher for investment properties. Lenders may also require cash reserves beyond the down payment.',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
    });
  }

  const closingCostRate = inputs.propertyType === 'commercial' ? 0.05 : 0.03;

  return {
    programs,
    preparationTopics,
    estimatedClosingCostsLow: Math.round(inputs.targetPrice * (closingCostRate - 0.01)),
    estimatedClosingCostsHigh: Math.round(inputs.targetPrice * (closingCostRate + 0.02)),
    dti,
    downPaymentPercent,
    monthlyIncome
  };
}

export const DEFAULT_INPUTS: BlueprintInputs = {
  scenario: 'first-time',
  timeline: '6mo',
  annualIncome: 95000,
  monthlyDebts: 450,
  savings: 40000,
  creditRange: 'good',
  targetPrice: 350000,
  state: 'CA',
  employmentType: 'w2',
  propertyType: 'single-family'
};

export function formatCurrency(val: number): string {
  return '$' + Math.round(val).toLocaleString('en-US');
}
