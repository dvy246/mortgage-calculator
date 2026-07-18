/**
 * mortgageRecast.ts
 * Pure calculation engine for the Mortgage Recast vs. Refinance Analyzer.
 * Models: new payment after recast, refinance break-even, and lifetime savings comparison.
 */

export interface RecastInput {
  currentBalance: number;        // Current outstanding mortgage balance
  currentRate: number;           // Current mortgage interest rate (%)
  remainingTermMonths: number;   // Months remaining on current mortgage
  lumpSum: number;               // Lump-sum payment applied to principal
  recastFee: number;             // One-time recast fee (typically $150–$500)
  refinanceRate: number;         // Hypothetical refinance interest rate (%)
  refinanceLoanTermYears: number;// Refinance loan term in years
  refinanceClosingCosts: number; // Total closing costs to refinance
}

export interface RecastResult {
  // Current baseline
  currentMonthlyPI: number;

  // Recast scenario
  recastNewBalance: number;
  recastMonthlyPI: number;
  recastMonthlySavings: number;
  recastTotalInterest: number;    // Interest paid from today over remaining term after recast
  recastBreakevenMonths: number;  // Months to recoup recast fee via savings

  // Refinance scenario
  refinanceBalance: number;       // Balance refinanced (same as current — no lump sum applied)
  refinanceMonthlyPI: number;
  refinanceMonthlySavings: number;
  refinanceTotalInterest: number; // Total interest over new loan life
  refinanceBreakevenMonths: number; // Months to recoup closing costs via savings

  // Comparison
  recastVsRefinanceMonthlySavings: number; // Positive = recast saves more per month
  recastVsRefinanceLifetimeSavings: number;// Positive = recast saves more over life
  winner: 'recast' | 'refinance' | 'neutral';
}

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (months <= 0 || principal <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function totalInterestOverTerm(principal: number, annualRate: number, months: number): number {
  const mp = monthlyPayment(principal, annualRate, months);
  return mp * months - principal;
}

export function calculateRecast(input: RecastInput): RecastResult {
  const {
    currentBalance,
    currentRate,
    remainingTermMonths,
    lumpSum,
    recastFee,
    refinanceRate,
    refinanceLoanTermYears,
    refinanceClosingCosts,
  } = input;

  // Current monthly payment (baseline)
  const currentMonthlyPI = monthlyPayment(currentBalance, currentRate, remainingTermMonths);

  // ── RECAST SCENARIO ──
  // Recast: apply lump sum to reduce balance, re-amortize at SAME rate, SAME remaining term
  const recastNewBalance = Math.max(0, currentBalance - lumpSum);
  const recastMonthlyPI = monthlyPayment(recastNewBalance, currentRate, remainingTermMonths);
  const recastMonthlySavings = currentMonthlyPI - recastMonthlyPI;
  const recastTotalInterest = totalInterestOverTerm(recastNewBalance, currentRate, remainingTermMonths);
  const recastBreakevenMonths = recastMonthlySavings > 0
    ? Math.ceil(recastFee / recastMonthlySavings)
    : Infinity;

  // ── REFINANCE SCENARIO ──
  // Refinance: take out new loan for CURRENT balance (without applying lump sum to principal)
  // User applies lump sum as down payment on refi or keeps in pocket — model pure rate comparison
  const refinanceBalance = currentBalance;
  const refinanceLoanMonths = refinanceLoanTermYears * 12;
  const refinanceMonthlyPI = monthlyPayment(refinanceBalance, refinanceRate, refinanceLoanMonths);
  const refinanceMonthlySavings = currentMonthlyPI - refinanceMonthlyPI;
  const refinanceTotalInterest = totalInterestOverTerm(refinanceBalance, refinanceRate, refinanceLoanMonths);
  const refinanceBreakevenMonths = refinanceMonthlySavings > 0
    ? Math.ceil(refinanceClosingCosts / refinanceMonthlySavings)
    : Infinity;

  // ── COMPARISON ──
  // Compare recast vs refinance (using same time horizon = remaining term)
  const currentTotalInterest = totalInterestOverTerm(currentBalance, currentRate, remainingTermMonths);

  // Total cost of recast path over remaining term
  const recastTotalCost = recastFee + recastTotalInterest;
  // Total cost of refi path (pro-rated over remaining term if refi term is longer)
  // Use recast term for comparison fairness
  const refiMonthlyPIForRemainingTerm = monthlyPayment(refinanceBalance, refinanceRate, refinanceLoanMonths);
  const refinanceTotalInterestOverRecastTerm = refiMonthlyPIForRemainingTerm * Math.min(remainingTermMonths, refinanceLoanMonths) - refinanceBalance;
  const refinanceTotalCost = refinanceClosingCosts + Math.max(0, refinanceTotalInterestOverRefinanceTerm(refinanceBalance, refinanceRate, refinanceLoanMonths));

  const recastVsRefinanceMonthlySavings = recastMonthlySavings - refinanceMonthlySavings;
  const recastPathTotalInterest = recastFee + recastTotalInterest;
  const refinancePathTotalInterest = refinanceClosingCosts + refinanceTotalInterest;
  const recastVsRefinanceLifetimeSavings = refinancePathTotalInterest - recastPathTotalInterest;

  let winner: 'recast' | 'refinance' | 'neutral' = 'neutral';
  if (recastVsRefinanceLifetimeSavings > 500) winner = 'recast';
  else if (recastVsRefinanceLifetimeSavings < -500) winner = 'refinance';

  return {
    currentMonthlyPI,
    recastNewBalance,
    recastMonthlyPI,
    recastMonthlySavings,
    recastTotalInterest,
    recastBreakevenMonths,
    refinanceBalance,
    refinanceMonthlyPI,
    refinanceMonthlySavings,
    refinanceTotalInterest,
    refinanceBreakevenMonths,
    recastVsRefinanceMonthlySavings,
    recastVsRefinanceLifetimeSavings,
    winner,
  };
}

function refinanceTotalInterestOverRefinanceTerm(principal: number, rate: number, months: number): number {
  return totalInterestOverTerm(principal, rate, months);
}
