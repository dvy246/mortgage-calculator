export interface MortgageInputs {
  homePrice: number;
  downPayment: number; // dollar amount
  interestRate: number; // annual percentage, e.g., 6.5
  loanTermYears: number; // e.g. 30
  propertyTaxRate: number; // annual percentage, e.g., 1.1
  insuranceRate: number; // annual percentage, e.g., 0.5
  pmiRate: number; // annual percentage, e.g., 0.75
  hoaFee: number; // monthly dollar amount
  extraMonthly: number;
  extraAnnual: number;
  extraOneTime: { month: number; amount: number }[]; // array of { monthIndex, amount }
}

export interface AmortizationEntry {
  month: number;
  principalPaid: number;
  interestPaid: number;
  taxPaid: number;
  insurancePaid: number;
  pmiPaid: number;
  hoaPaid: number;
  extraPaid: number;
  totalPayment: number;
  remainingBalance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

export interface MortgageOutputs {
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalPaymentsSum: number;
  payoffTermMonths: number;
  pmiCancellationMonth: number;
  amortizationSchedule: AmortizationEntry[];
}

/**
 * Calculates standard monthly Principal & Interest payment.
 */
export function calculateMonthlyPI(principal: number, annualRatePercent: number, termYears: number): number {
  if (annualRatePercent <= 0) {
    return principal / (termYears * 12);
  }
  const r = annualRatePercent / 100 / 12;
  const n = termYears * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/**
 * Main Mortgage Calculation Engine
 */
export function calculateMortgage(inputs: MortgageInputs): MortgageOutputs {
  const {
    homePrice,
    downPayment,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    insuranceRate,
    pmiRate,
    hoaFee,
    extraMonthly,
    extraAnnual,
    extraOneTime
  } = inputs;

  const originalPrincipal = Math.max(0, homePrice - downPayment);
  const monthlyPI = calculateMonthlyPI(originalPrincipal, interestRate, loanTermYears);
  
  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = (homePrice * (insuranceRate / 100)) / 12;
  
  // PMI applies if LTV > 80% (i.e. Down Payment < 20% of Home Price)
  const initialLTV = (originalPrincipal / homePrice) * 100;
  const startsWithPMI = initialLTV > 80;
  const pmiCancellationThreshold = homePrice * 0.8; // PMI drops once balance <= 80% of original price

  const monthlyPMIRate = (originalPrincipal * (pmiRate / 100)) / 12;

  let balance = originalPrincipal;
  const schedule: AmortizationEntry[] = [];
  const r = (interestRate / 100) / 12;
  const totalMonths = loanTermYears * 12;

  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;
  let pmiCancellationMonth = -1;

  for (let m = 1; m <= totalMonths && balance > 0.01; m++) {
    // Interest for the month
    const interest = balance * r;
    
    // Principal payment (standard P&I - interest)
    let principalPaid = Math.min(balance, monthlyPI - interest);
    if (principalPaid < 0) principalPaid = 0;
    
    // Check if PMI is active (balance > 80% LTV)
    let pmi = 0;
    if (startsWithPMI) {
      if (balance > pmiCancellationThreshold) {
        pmi = monthlyPMIRate;
      } else {
        if (pmiCancellationMonth === -1) {
          pmiCancellationMonth = m - 1;
        }
      }
    }

    // Determine extra payment
    let extra = extraMonthly;
    
    // Annual extra payment (applied once a year, e.g. every 12th month)
    if (m % 12 === 0) {
      extra += extraAnnual;
    }
    
    // One-time extra payments matching this month index
    const matchedOneTimes = extraOneTime.filter(ot => ot.month === m);
    for (const ot of matchedOneTimes) {
      extra += ot.amount;
    }

    // Clamp extra payment to remaining balance after standard principal
    extra = Math.min(balance - principalPaid, extra);
    if (extra < 0) extra = 0;

    const totalPrincipal = principalPaid + extra;
    balance -= totalPrincipal;

    cumulativeInterest += interest;
    cumulativePrincipal += totalPrincipal;

    const totalPayment = principalPaid + interest + monthlyTax + monthlyInsurance + pmi + hoaFee + extra;

    schedule.push({
      month: m,
      principalPaid,
      interestPaid: interest,
      taxPaid: monthlyTax,
      insurancePaid: monthlyInsurance,
      pmiPaid: pmi,
      hoaPaid: hoaFee,
      extraPaid: extra,
      totalPayment,
      remainingBalance: Math.max(0, balance),
      cumulativeInterest,
      cumulativePrincipal
    });
  }

  const payoffTermMonths = schedule.length;
  const totalInterestPaid = cumulativeInterest;
  const totalPaymentsSum = schedule.reduce((sum, entry) => sum + entry.totalPayment - entry.extraPaid, 0) + schedule.reduce((sum, entry) => sum + entry.extraPaid, 0);

  return {
    monthlyPrincipalAndInterest: monthlyPI,
    monthlyPropertyTax: monthlyTax,
    monthlyInsurance,
    monthlyPMI: startsWithPMI && originalPrincipal > pmiCancellationThreshold ? monthlyPMIRate : 0,
    monthlyHOA: hoaFee,
    totalMonthlyPayment: monthlyPI + monthlyTax + monthlyInsurance + (startsWithPMI && originalPrincipal > pmiCancellationThreshold ? monthlyPMIRate : 0) + hoaFee,
    totalInterestPaid,
    totalPaymentsSum,
    payoffTermMonths,
    pmiCancellationMonth,
    amortizationSchedule: schedule
  };
}

/**
 * Refinance Calculation Input
 */
export interface RefinanceInputs {
  currentBalance: number;
  currentRate: number;
  currentRemainingYears: number;
  currentMonthlyPI: number;
  newRate: number;
  newTermYears: number;
  refiClosingCosts: number;
  rollCostsIntoLoan: boolean;
}

export interface RefinanceOutputs {
  currentMonthlyPI: number;
  newMonthlyPI: number;
  monthlySavings: number;
  newPrincipal: number;
  breakEvenMonths: number;
  lifetimeSavings: number;
}

/**
 * Computes refinance savings and break-even point.
 */
export function calculateRefinance(inputs: RefinanceInputs): RefinanceOutputs {
  const {
    currentBalance,
    currentRate,
    currentRemainingYears,
    currentMonthlyPI,
    newRate,
    newTermYears,
    refiClosingCosts,
    rollCostsIntoLoan
  } = inputs;

  const newPrincipal = rollCostsIntoLoan ? currentBalance + refiClosingCosts : currentBalance;
  const newMonthlyPI = calculateMonthlyPI(newPrincipal, newRate, newTermYears);
  
  const monthlySavings = currentMonthlyPI - newMonthlyPI;
  
  // Break even calculation
  // Cost to break even is what is paid out-of-pocket or added to loan principal
  const costToRecover = rollCostsIntoLoan ? 0 : refiClosingCosts;
  
  let breakEvenMonths = -1;
  if (monthlySavings > 0) {
    if (rollCostsIntoLoan) {
      // If costs rolled in, compare lifetime cost of current vs new
      // We will search for when cumulative payments of new loan exceed current
      // But a simple approximation is closing costs / monthly savings
      const totalCostAdded = refiClosingCosts;
      breakEvenMonths = Math.ceil(totalCostAdded / monthlySavings);
    } else {
      breakEvenMonths = Math.ceil(costToRecover / monthlySavings);
    }
  }

  // Lifetime savings = (Current Monthly PI * Current Months) - (New Monthly PI * New Months) - Closing Costs (if out of pocket)
  const currentTotalRemaining = currentMonthlyPI * (currentRemainingYears * 12);
  const newTotalPayments = newMonthlyPI * (newTermYears * 12);
  const lifetimeSavings = currentTotalRemaining - newTotalPayments - (rollCostsIntoLoan ? 0 : refiClosingCosts);

  return {
    currentMonthlyPI,
    newMonthlyPI,
    monthlySavings,
    newPrincipal,
    breakEvenMonths: monthlySavings > 0 ? breakEvenMonths : -1,
    lifetimeSavings
  };
}

/**
 * Affordability Brackets based on income (28/36 Debt-to-Income rule)
 */
export interface AffordabilityInputs {
  annualIncome: number;
  monthlyDebts: number; // credit cards, auto loans, student loans
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  insuranceRate: number;
  pmiRate: number;
  hoaFee: number;
}

export interface AffordabilityOutputs {
  comfortablePI: number; // DTI <= 28% of gross monthly income
  stretchPI: number;       // DTI <= 36% of gross monthly income (minus debts)
  dangerPI: number;        // DTI > 36%
  comfortableHomePrice: number;
  stretchHomePrice: number;
  comfortableTotalMonthly: number;
  stretchTotalMonthly: number;
}

/**
 * Back-calculates the maximum purchase price from a target monthly P&I payment.
 */
export function homePriceFromPI(
  targetPI: number,
  downPayment: number,
  annualRate: number,
  termYears: number,
  propertyTaxRate: number,
  insuranceRate: number,
  pmiRate: number,
  hoaFee: number
): number {
  // We want to solve for Home Price (H) where:
  // Monthly PI = (H - D) * factor
  // But wait, there is also Tax + Insurance + PMI which depend on Home Price or Loan amount.
  // Monthly Tax = H * t / 12
  // Monthly Insurance = H * i / 12
  // Monthly PMI = (H - D) * p / 12 (if LTV > 80%)
  // targetPayment = PI + Tax + Insurance + PMI + HOA
  // Since this is piecewise (due to PMI), we can approximate using numerical search or direct algebra.
  // Let's do an algebraic solver:
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  const piFactor = annualRate <= 0 ? 1 / n : (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  
  const taxFactor = (propertyTaxRate / 100) / 12;
  const insFactor = (insuranceRate / 100) / 12;
  const pmiFactor = (pmiRate / 100) / 12;

  // Let's solve H:
  // Case A: LTV <= 80% (No PMI)
  // targetPayment - HOA = (H - D) * piFactor + H * taxFactor + H * insFactor
  // targetPayment - HOA + D * piFactor = H * (piFactor + taxFactor + insFactor)
  // H_noPMI = (targetPayment - HOA + D * piFactor) / (piFactor + taxFactor + insFactor)
  
  const H_noPMI = (targetPI + downPayment * piFactor) / (piFactor + taxFactor + insFactor);
  const loan_noPMI = H_noPMI - downPayment;
  const ltv_noPMI = (loan_noPMI / H_noPMI) * 100;

  if (ltv_noPMI <= 80 || H_noPMI <= 0) {
    return Math.max(0, H_noPMI);
  }

  // Case B: LTV > 80% (PMI active)
  // targetPayment - HOA = (H - D) * piFactor + H * taxFactor + H * insFactor + (H - D) * pmiFactor
  // targetPayment - HOA + D * (piFactor + pmiFactor) = H * (piFactor + taxFactor + insFactor + pmiFactor)
  // H_withPMI = (targetPayment - HOA + D * (piFactor + pmiFactor)) / (piFactor + taxFactor + insFactor + pmiFactor)
  const H_withPMI = (targetPI + downPayment * (piFactor + pmiFactor)) / (piFactor + taxFactor + insFactor + pmiFactor);
  return Math.max(0, H_withPMI);
}

export function calculateAffordability(inputs: AffordabilityInputs): AffordabilityOutputs {
  const {
    annualIncome,
    monthlyDebts,
    downPayment,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    insuranceRate,
    pmiRate,
    hoaFee
  } = inputs;

  const grossMonthlyIncome = annualIncome / 12;

  // 28% Rule: Monthly housing costs should not exceed 28% of gross monthly income
  const comfortableTotalMonthly = grossMonthlyIncome * 0.28;

  // 36% Rule: Total debt payments (housing + other debts) should not exceed 36% of gross monthly income
  const maxTotalHousingAndDebts = grossMonthlyIncome * 0.36;
  const stretchTotalMonthly = Math.max(0, maxTotalHousingAndDebts - monthlyDebts);

  // Back-calculate Home Price
  // We need to subtract HOA from the target monthly payments first to find target PI + Tax + Ins (+ PMI)
  const comfortablePI_Tax_Ins = Math.max(0, comfortableTotalMonthly - hoaFee);
  const stretchPI_Tax_Ins = Math.max(0, stretchTotalMonthly - hoaFee);

  const comfortableHomePrice = homePriceFromPI(
    comfortablePI_Tax_Ins,
    downPayment,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    insuranceRate,
    pmiRate,
    hoaFee
  );

  const stretchHomePrice = homePriceFromPI(
    stretchPI_Tax_Ins,
    downPayment,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    insuranceRate,
    pmiRate,
    hoaFee
  );

  return {
    comfortablePI: comfortablePI_Tax_Ins,
    stretchPI: stretchPI_Tax_Ins,
    dangerPI: stretchPI_Tax_Ins * 1.25,
    comfortableHomePrice,
    stretchHomePrice: Math.max(comfortableHomePrice, stretchHomePrice),
    comfortableTotalMonthly,
    stretchTotalMonthly
  };
}
