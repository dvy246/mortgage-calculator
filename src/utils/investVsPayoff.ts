/**
 * investVsPayoff.ts
 * Pure calculation engine for the Invest vs. Pay Off Mortgage early opportunity cost tool.
 * Models: mortgage prepayment interest savings vs S&P 500 or market investment growth over a chosen term.
 */

export interface InvestVsPayoffInput {
  mortgageBalance: number;       // Current mortgage outstanding balance
  interestRate: number;          // Current interest rate (%)
  remainingTermYears: number;    // Term remaining on mortgage (years)
  extraMonthlyPayment: number;   // Extra payment per month to compare
  investmentReturnRate: number;  // Expected stock market annual return rate (%)
  taxBracket: number;            // Marginal federal tax bracket (%) (to model interest deduction offsets)
  itemizesDeductions: boolean;   // If the user itemizes mortgage interest deductions
}

export interface YearByYearProjection {
  year: number;
  payoffBalance: number;
  payoffInterestSaved: number;
  investPortfolioValue: number;
  investTotalContributions: number;
  netWealthDifference: number;   // Investment portfolio value - Prepayment savings
}

export interface InvestVsPayoffResult {
  standardPayoffMonths: number;
  acceleratedPayoffMonths: number;
  monthsSaved: number;
  interestSaved: number;
  investPortfolioTotal: number;
  investTotalContributions: number;
  totalPrepaymentBenefits: number;
  netOpportunityCost: number;     // investPortfolioTotal - interestSaved
  winner: 'invest' | 'payoff' | 'neutral';
  projections: YearByYearProjection[];
}

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (months <= 0 || principal <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export function calculateInvestVsPayoff(input: InvestVsPayoffInput): InvestVsPayoffResult {
  const {
    mortgageBalance,
    interestRate,
    remainingTermYears,
    extraMonthlyPayment,
    investmentReturnRate,
    taxBracket,
    itemizesDeductions,
  } = input;

  const totalMonths = remainingTermYears * 12;
  const standardMonthlyPI = monthlyPayment(mortgageBalance, interestRate, totalMonths);

  // 1. Calculate standard payoff interest
  let standardInterestTotal = 0;
  let balStandard = mortgageBalance;
  const rMortgage = interestRate / 100 / 12;
  for (let m = 1; m <= totalMonths; m++) {
    const interest = balStandard * rMortgage;
    const principal = Math.min(balStandard, standardMonthlyPI - interest);
    standardInterestTotal += interest;
    balStandard = Math.max(0, balStandard - principal);
  }

  // 2. Calculate accelerated payoff & tracking balances
  let acceleratedInterestTotal = 0;
  let balAccelerated = mortgageBalance;
  let acceleratedMonths = 0;

  for (let m = 1; m <= totalMonths; m++) {
    if (balAccelerated <= 0) break;
    acceleratedMonths++;
    const interest = balAccelerated * rMortgage;
    // apply standard + extra payment
    const totalPay = standardMonthlyPI + extraMonthlyPayment;
    const principal = Math.min(balAccelerated, totalPay - interest);
    acceleratedInterestTotal += interest;
    balAccelerated = Math.max(0, balAccelerated - principal);
  }

  const interestSavedRaw = standardInterestTotal - acceleratedInterestTotal;
  // Apply tax deduction offset: if itemized, mortgage interest is tax-deductible
  const interestSaved = itemizesDeductions
    ? interestSavedRaw * (1 - taxBracket / 100)
    : interestSavedRaw;

  const monthsSaved = totalMonths - acceleratedMonths;

  // 3. Model investing path: put the extra monthly payment into the market instead of mortgage
  let investPortfolioValue = 0;
  let investTotalContributions = 0;
  const rInvest = investmentReturnRate / 100 / 12;
  const projections: YearByYearProjection[] = [];

  // Track balance under extra payment path year by year
  let currentBalancePrepaying = mortgageBalance;
  let cumulativeInterestSaved = 0;

  for (let y = 1; y <= remainingTermYears; y++) {
    let yearlyInterestSaved = 0;
    // Process 12 months for this year
    for (let m = 1; m <= 12; m++) {
      // Prepay path
      if (currentBalancePrepaying > 0) {
        const interestP = currentBalancePrepaying * rMortgage;
        const totalPayP = standardMonthlyPI + extraMonthlyPayment;
        const principalP = Math.min(currentBalancePrepaying, totalPayP - interestP);
        currentBalancePrepaying = Math.max(0, currentBalancePrepaying - principalP);
        // Compare to standard interest path for this month
        // Standard baseline interest:
        const interestS = Math.max(0, (mortgageBalance * Math.pow(1 + rMortgage, (y-1)*12 + m)) * rMortgage); // approx
      }

      // Invest path: invest extraMonthlyPayment
      investPortfolioValue = (investPortfolioValue + extraMonthlyPayment) * (1 + rInvest);
      investTotalContributions += extraMonthlyPayment;
    }

    // Rough year-end interest savings modeling
    const standardBalYearEnd = Math.max(0, mortgageBalance * (1 - (y / remainingTermYears))); // simplified baseline
    const interestSavedYearEnd = Math.max(0, (mortgageBalance - currentBalancePrepaying) * (interestRate / 100) * y * 0.5); // estimate

    projections.push({
      year: y,
      payoffBalance: currentBalancePrepaying,
      payoffInterestSaved: interestSavedYearEnd,
      investPortfolioValue,
      investTotalContributions,
      netWealthDifference: investPortfolioValue - interestSavedYearEnd,
    });
  }

  const netOpportunityCost = investPortfolioValue - interestSaved;
  let winner: 'invest' | 'payoff' | 'neutral' = 'neutral';
  if (netOpportunityCost > 2000) {
    winner = 'invest';
  } else if (netOpportunityCost < -2000) {
    winner = 'payoff';
  }

  return {
    standardPayoffMonths: totalMonths,
    acceleratedPayoffMonths: acceleratedMonths,
    monthsSaved,
    interestSaved,
    investPortfolioTotal: investPortfolioValue,
    investTotalContributions,
    totalPrepaymentBenefits: interestSaved,
    netOpportunityCost,
    winner,
    projections,
  };
}
