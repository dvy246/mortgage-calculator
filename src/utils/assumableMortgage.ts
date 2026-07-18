/**
 * assumableMortgage.ts
 * Pure calculation engine for the Assumable Mortgage Savings & Cash Gap Calculator.
 * Models: monthly savings, cash gap, second mortgage blended rate, and payback period.
 */

export interface AssumableMortgageInput {
  purchasePrice: number;       // Total sale price of the home
  remainingBalance: number;    // Seller's existing mortgage balance
  existingRate: number;        // Seller's mortgage interest rate (%)
  remainingTermMonths: number; // Months left on seller's mortgage
  marketRate: number;          // Current new mortgage rate (%)
  newLoanTermYears: number;    // Term for a new market-rate mortgage (years)
  secondMortgageRate: number;  // Rate for gap financing second mortgage (%)
  secondMortgageTermYears: number; // Term for the second mortgage (years)
  annualPropertyTax: number;   // Annual property tax
  annualInsurance: number;     // Annual homeowners insurance
}

export interface AssumableMortgageResult {
  cashGap: number;             // How much cash buyer must bring to cover equity
  assumedMonthlyPI: number;    // Monthly P&I on the assumed mortgage
  newMarketMonthlyPI: number;  // Monthly P&I on a new market-rate mortgage
  secondMortgageMonthlyPI: number; // Monthly P&I on the gap second mortgage
  totalMonthlyAssumed: number; // assumed P&I + second P&I + taxes + ins
  totalMonthlyNew: number;     // new market P&I + taxes + ins
  monthlySavings: number;      // Monthly savings by assuming
  annualSavings: number;       // Annual savings
  blendedRate: number;         // Weighted blended rate of assumed + second mortgage
  paybackMonths: number;       // Months to break even on assumption vs new loan (simple)
  totalInterestAssumed: number;// Total interest paid over assumed loan remaining term
  totalInterestNew: number;    // Total interest on equivalent new loan
  lifetimeInterestSavings: number;
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

export function calculateAssumableMortgage(input: AssumableMortgageInput): AssumableMortgageResult {
  const {
    purchasePrice,
    remainingBalance,
    existingRate,
    remainingTermMonths,
    marketRate,
    newLoanTermYears,
    secondMortgageRate,
    secondMortgageTermYears,
    annualPropertyTax,
    annualInsurance,
  } = input;

  // Cash gap: difference between purchase price and assumed balance
  const cashGap = Math.max(0, purchasePrice - remainingBalance);

  // Monthly assumed P&I
  const assumedMonthlyPI = monthlyPayment(remainingBalance, existingRate, remainingTermMonths);

  // New market-rate loan monthly P&I (full purchase price)
  const newLoanMonths = newLoanTermYears * 12;
  const newMarketMonthlyPI = monthlyPayment(purchasePrice, marketRate, newLoanMonths);

  // Second mortgage (gap financing) monthly P&I
  const secondMortgageMonths = secondMortgageTermYears * 12;
  const secondMortgageMonthlyPI = cashGap > 0
    ? monthlyPayment(cashGap, secondMortgageRate, secondMortgageMonths)
    : 0;

  // Monthly tax + insurance (shared)
  const monthlyTaxIns = (annualPropertyTax + annualInsurance) / 12;

  // Total monthly costs
  const totalMonthlyAssumed = assumedMonthlyPI + secondMortgageMonthlyPI + monthlyTaxIns;
  const totalMonthlyNew = newMarketMonthlyPI + monthlyTaxIns;

  // Monthly savings
  const monthlySavings = totalMonthlyNew - totalMonthlyAssumed;
  const annualSavings = monthlySavings * 12;

  // Blended rate: weighted average of assumed + second mortgage
  const totalBalance = remainingBalance + cashGap;
  const blendedRate = totalBalance > 0
    ? ((remainingBalance * existingRate + cashGap * secondMortgageRate) / totalBalance)
    : existingRate;

  // Payback / break-even: how many months of savings to justify assumption overhead
  // (Assumption fee is typically ~$500 to $1,000; modeled as 0 for simplicity)
  const paybackMonths = monthlySavings > 0 ? Math.ceil(0 / monthlySavings) : 0;

  // Total interest comparison (over remaining assumed term vs same term new loan)
  const totalInterestAssumed = totalInterest(remainingBalance, existingRate, remainingTermMonths)
    + (cashGap > 0 ? totalInterest(cashGap, secondMortgageRate, secondMortgageMonths) : 0);
  const totalInterestNew = totalInterest(purchasePrice, marketRate, newLoanMonths);
  const lifetimeInterestSavings = totalInterestNew - totalInterestAssumed;

  return {
    cashGap,
    assumedMonthlyPI,
    newMarketMonthlyPI,
    secondMortgageMonthlyPI,
    totalMonthlyAssumed,
    totalMonthlyNew,
    monthlySavings,
    annualSavings,
    blendedRate,
    paybackMonths,
    totalInterestAssumed,
    totalInterestNew,
    lifetimeInterestSavings,
  };
}
