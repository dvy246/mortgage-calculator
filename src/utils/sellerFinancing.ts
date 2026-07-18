/**
 * sellerFinancing.ts
 * Pure calculation engine for the Seller Financing Amortization & Balloon Payment Calculator.
 * Models owner financing, standard amortization, balloon maturity payments, and refinancing indicators.
 */

export interface SellerFinancingInput {
  purchasePrice: number;        // Sale price of the home
  downPayment: number;          // Down payment paid to seller
  interestRate: number;         // Interest rate charged by seller (%)
  amortizationYears: number;    // Amortization period (default: 30)
  balloonYears: number;         // Balloon term (years until entire balance is due, e.g. 5)
  buyerCreditScore: number;     // Credit score of the buyer
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface SellerFinancingResult {
  loanAmount: number;           // Purchase price - down payment
  monthlyPI: number;            // Monthly P&I based on amortization years
  balloonMonth: number;         // Month index when balloon is due
  balloonPaymentSize: number;   // Full remaining principal balance due at balloon years
  totalInterestPaid: number;    // Cumulative interest paid up to balloon year
  totalPaymentsPaid: number;    // Cumulative payments paid up to balloon year
  amortizationSchedule: AmortizationRow[];
  refinanceLikelihood: 'High' | 'Medium' | 'Low';
}

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (months <= 0 || principal <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export function calculateSellerFinancing(input: SellerFinancingInput): SellerFinancingResult {
  const {
    purchasePrice,
    downPayment,
    interestRate,
    amortizationYears,
    balloonYears,
    buyerCreditScore,
  } = input;

  const loanAmount = Math.max(0, purchasePrice - downPayment);
  const totalMonths = amortizationYears * 12;
  const monthlyPI = monthlyPayment(loanAmount, interestRate, totalMonths);

  const schedule: AmortizationRow[] = [];
  let currentBalance = loanAmount;
  const balloonMonth = balloonYears * 12;
  let totalInterestPaid = 0;
  let totalPaymentsPaid = 0;

  const r = interestRate / 100 / 12;

  for (let month = 1; month <= totalMonths; month++) {
    if (currentBalance <= 0) break;

    const interest = currentBalance * r;
    const principal = Math.min(currentBalance, monthlyPI - interest);
    currentBalance = Math.max(0, currentBalance - principal);

    schedule.push({
      month,
      payment: monthlyPI,
      principal,
      interest,
      balance: currentBalance,
    });

    if (month <= balloonMonth) {
      totalInterestPaid += interest;
      totalPaymentsPaid += monthlyPI;
    }
  }

  // Balloon payment size: outstanding balance at the end of the balloon year
  const balloonIndex = Math.min(balloonMonth, schedule.length);
  const balloonPaymentSize = balloonIndex > 0 ? schedule[balloonIndex - 1].balance : 0;

  // Refinance likelihood assessment based on credit score
  let refinanceLikelihood: 'High' | 'Medium' | 'Low' = 'Low';
  if (buyerCreditScore >= 680) {
    refinanceLikelihood = 'High';
  } else if (buyerCreditScore >= 620) {
    refinanceLikelihood = 'Medium';
  }

  return {
    loanAmount,
    monthlyPI,
    balloonMonth,
    balloonPaymentSize,
    totalInterestPaid,
    totalPaymentsPaid,
    amortizationSchedule: schedule.slice(0, balloonMonth), // Only output schedule up to balloon maturity
    refinanceLikelihood,
  };
}
