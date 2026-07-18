/**
 * helocVsCashOut.ts
 * Pure calculation engine for the HELOC vs. Cash-Out Refinance Blended Rate Simulator.
 * Models: blended interest rate, total monthly payments, and lifetime interest comparison.
 */

export interface HelocVsCashOutInput {
  firstMortgageBalance: number;    // Current first mortgage outstanding balance
  firstMortgageRate: number;       // Current first mortgage interest rate (%)
  firstMortgageRemainingMonths: number; // Months remaining on first mortgage
  equityNeeded: number;            // Amount of cash-out / equity needed
  helocRate: number;               // HELOC or second mortgage interest rate (%)
  helocTermYears: number;          // HELOC repayment term in years
  cashOutRefinanceRate: number;    // New rate for a cash-out refinance (%)
  cashOutRefinanceTermYears: number;// Term for the cash-out refi (years)
  cashOutClosingCosts: number;     // Estimated closing costs for cash-out refi
}

export interface HelocVsCashOutResult {
  // HELOC path
  helocFirstMortgageMonthlyPI: number;
  helocMonthlyPI: number;
  helocTotalMonthlyPI: number;
  helocBlendedRate: number;
  helocTotalInterest: number;

  // Cash-out refi path
  cashOutNewBalance: number;
  cashOutMonthlyPI: number;
  cashOutTotalInterest: number;
  cashOutBreakevenMonths: number;   // Months to recoup closing costs vs current payment

  // Comparison
  monthlyDifference: number;        // positive = HELOC saves more monthly
  lifetimeInterestDifference: number; // positive = HELOC saves more over life
  winner: 'heloc' | 'cashout' | 'neutral';
}

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (months <= 0 || principal <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function totalInterest(principal: number, annualRate: number, months: number): number {
  const mp = monthlyPayment(principal, annualRate, months);
  return mp * months - principal;
}

export function calculateHelocVsCashOut(input: HelocVsCashOutInput): HelocVsCashOutResult {
  const {
    firstMortgageBalance,
    firstMortgageRate,
    firstMortgageRemainingMonths,
    equityNeeded,
    helocRate,
    helocTermYears,
    cashOutRefinanceRate,
    cashOutRefinanceTermYears,
    cashOutClosingCosts,
  } = input;

  // ── HELOC PATH ──
  const helocFirstMortgageMonthlyPI = monthlyPayment(
    firstMortgageBalance, firstMortgageRate, firstMortgageRemainingMonths
  );
  const helocMonths = helocTermYears * 12;
  const helocMonthlyPI = monthlyPayment(equityNeeded, helocRate, helocMonths);
  const helocTotalMonthlyPI = helocFirstMortgageMonthlyPI + helocMonthlyPI;

  // Blended rate: weighted average of first mortgage + HELOC
  const totalDebt = firstMortgageBalance + equityNeeded;
  const helocBlendedRate = totalDebt > 0
    ? (firstMortgageBalance * firstMortgageRate + equityNeeded * helocRate) / totalDebt
    : firstMortgageRate;

  // Total lifetime interest: first mortgage remaining + HELOC
  const helocFirstMortgageInterest = totalInterest(firstMortgageBalance, firstMortgageRate, firstMortgageRemainingMonths);
  const helocInterest = totalInterest(equityNeeded, helocRate, helocMonths);
  const helocTotalInterest = helocFirstMortgageInterest + helocInterest;

  // ── CASH-OUT REFI PATH ──
  const cashOutNewBalance = firstMortgageBalance + equityNeeded + cashOutClosingCosts;
  const cashOutRefinanceMonths = cashOutRefinanceTermYears * 12;
  const cashOutMonthlyPI = monthlyPayment(cashOutNewBalance, cashOutRefinanceRate, cashOutRefinanceMonths);
  const cashOutTotalInterest = totalInterest(cashOutNewBalance, cashOutRefinanceRate, cashOutRefinanceMonths);

  // Break-even: months until cash-out refi monthly savings covers closing costs
  const currentFirstMortgageMonthly = helocFirstMortgageMonthlyPI;
  const savingsFromRefi = currentFirstMortgageMonthly - cashOutMonthlyPI;
  const cashOutBreakevenMonths = savingsFromRefi > 0
    ? Math.ceil(cashOutClosingCosts / savingsFromRefi)
    : Infinity;

  // ── COMPARISON ──
  const monthlyDifference = cashOutMonthlyPI - helocTotalMonthlyPI; // positive = HELOC is cheaper monthly
  const lifetimeInterestDifference = cashOutTotalInterest - helocTotalInterest; // positive = HELOC saves more lifetime

  let winner: 'heloc' | 'cashout' | 'neutral' = 'neutral';
  if (lifetimeInterestDifference > 1000) winner = 'heloc';
  else if (lifetimeInterestDifference < -1000) winner = 'cashout';

  return {
    helocFirstMortgageMonthlyPI,
    helocMonthlyPI,
    helocTotalMonthlyPI,
    helocBlendedRate,
    helocTotalInterest,
    cashOutNewBalance,
    cashOutMonthlyPI,
    cashOutTotalInterest,
    cashOutBreakevenMonths,
    monthlyDifference,
    lifetimeInterestDifference,
    winner,
  };
}
