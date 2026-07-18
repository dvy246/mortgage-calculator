export interface RentVsBuyInputs {
  homePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  insuranceAnnual: number;
  maintenancePercent: number;
  hoaMonthly: number;
  closingCostPercent: number;
  sellingCostPercent: number;
  pmiRate: number;

  monthlyRent: number;
  rentIncreasePercent: number;
  renterInsuranceMonthly: number;
  securityDepositMonths: number;

  homeAppreciation: number;
  investmentReturn: number;

  timeHorizonYears: number;

  marginalTaxRate: number;
  itemizeDeductions: boolean;
  filingStatus: 'single' | 'married';
}

export interface AnnualBreakdown {
  year: number;
  buy: {
    totalOutOfPocket: number;
    cumulativeOutOfPocket: number;
    homeValue: number;
    remainingBalance: number;
    equity: number;
    sellingProceedsAfterTax: number;
    netCost: number;
    monthlyPITI: number;
    principalPaid: number;
    interestPaid: number;
    taxPaid: number;
    insurancePaid: number;
    maintenancePaid: number;
    hoaPaid: number;
    pmiPaid: number;
  };
  rent: {
    totalPaid: number;
    cumulativePaid: number;
    monthlyRentCurrent: number;
    downPaymentInvested: number;
    monthlySavingsInvested: number;
    totalPortfolioValue: number;
    portfolioAfterTax: number;
    netCost: number;
  };
  buyAdvantage: number;
}

export interface RentVsBuyResult {
  breakEvenYear: number | null;
  neverBreaksEven: boolean;
  recommendedAction: 'buy' | 'rent' | 'depends';
  annualData: AnnualBreakdown[];
  totals: {
    buyTotalCost: number;
    rentTotalCost: number;
    buyNetWorth: number;
    rentNetWorth: number;
    buyMonthlyAvg: number;
    rentMonthlyAvg: number;
    buySellingProceeds: number;
    rentPortfolioAfterTax: number;
  };
  buyFirstYearPITI: number;
  rentFirstYearMonthly: number;
  buyState: 'cheaper' | 'more_expensive';
  rentState: 'cheaper' | 'more_expensive';
}

function mon(rate: number): number {
  return rate / 100 / 12;
}

function monthlyPI(principal: number, annualRatePercent: number, termYears: number): number {
  if (annualRatePercent <= 0) return principal / (termYears * 12);
  const r = mon(annualRatePercent);
  const n = termYears * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function standardDeduction(filingStatus: 'single' | 'married'): number {
  return filingStatus === 'married' ? 29200 : 14600;
}

export const DEFAULT_INPUTS: RentVsBuyInputs = {
  homePrice: 350000,
  downPaymentPercent: 20,
  interestRate: 6.7,
  loanTermYears: 30,
  propertyTaxRate: 1.1,
  insuranceAnnual: 1800,
  maintenancePercent: 1,
  hoaMonthly: 0,
  closingCostPercent: 3,
  sellingCostPercent: 6,
  pmiRate: 0,
  monthlyRent: 2000,
  rentIncreasePercent: 3,
  renterInsuranceMonthly: 20,
  securityDepositMonths: 1,
  homeAppreciation: 3.5,
  investmentReturn: 7,
  timeHorizonYears: 7,
  marginalTaxRate: 22,
  itemizeDeductions: false,
  filingStatus: 'single'
};

export function calculateRentVsBuy(inputs: RentVsBuyInputs): RentVsBuyResult {
  const {
    homePrice, downPaymentPercent, interestRate, loanTermYears,
    propertyTaxRate, insuranceAnnual, maintenancePercent, hoaMonthly,
    closingCostPercent, sellingCostPercent, pmiRate,
    monthlyRent, rentIncreasePercent, renterInsuranceMonthly, securityDepositMonths,
    homeAppreciation, investmentReturn,
    timeHorizonYears, marginalTaxRate, itemizeDeductions, filingStatus
  } = inputs;

  const downPayment = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyPIVal = monthlyPI(loanAmount, interestRate, loanTermYears);
  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = insuranceAnnual / 12;
  const monthlyHOA = hoaMonthly;
  const monthlyMaintenance = (homePrice * (maintenancePercent / 100)) / 12;
  const hasPMI = downPaymentPercent < 20;
  const monthlyPMI = hasPMI ? (loanAmount * (pmiRate / 100)) / 12 : 0;
  const closingCosts = homePrice * (closingCostPercent / 100);
  const securityDeposit = monthlyRent * securityDepositMonths;
  const sd = standardDeduction(filingStatus);
  const capGainsExclusion = filingStatus === 'married' ? 500000 : 250000;

  const annualData: AnnualBreakdown[] = [];
  let buyCumulativeOutOfPocket = downPayment + closingCosts;
  let rentCumulativeOutOfPocket = securityDeposit + renterInsuranceMonthly;
  let currentRent = monthlyRent;
  let homeValue = homePrice;
  let remainingBalance = loanAmount;
  let totalPrincipalPaid = 0;
  let totalInterestPaid = 0;
  let totalTaxPaid = 0;
  let totalInsurancePaid = 0;
  let totalMaintenancePaid = 0;
  let totalHOAPaid = 0;
  let totalPMIPaid = 0;
  let totalRentPaid = 0;
  let cumulativeMonthlySavingsInvested = 0;
  let buyMonthlyPayment = monthlyPIVal + monthlyTax + monthlyInsurance + monthlyHOA + monthlyMaintenance + monthlyPMI;
  let rentMonthlyPayment = currentRent + renterInsuranceMonthly;

  for (let year = 1; year <= Math.max(timeHorizonYears, 30); year++) {
    let buyYearOutOfPocket = 0;
    let buyYearPrincipal = 0;
    let buyYearInterest = 0;
    let buyYearTax = 0;
    let buyYearInsurance = 0;
    let buyYearMaintenance = 0;
    let buyYearHOA = 0;
    let buyYearPMI = 0;

    for (let m = 1; m <= 12; m++) {
      if (remainingBalance <= 0) break;

      const r = mon(interestRate);
      const monthlyInterest = remainingBalance * r;
      let monthlyPrincipal = monthlyPIVal - monthlyInterest;
      if (monthlyPrincipal > remainingBalance) monthlyPrincipal = remainingBalance;
      if (monthlyPrincipal < 0) monthlyPrincipal = 0;

      remainingBalance -= monthlyPrincipal;
      totalPrincipalPaid += monthlyPrincipal;
      totalInterestPaid += monthlyInterest;
      buyYearPrincipal += monthlyPrincipal;
      buyYearInterest += monthlyInterest;

      const mTax = (homeValue * (propertyTaxRate / 100)) / 12;
      buyYearTax += mTax;
      totalTaxPaid += mTax;

      buyYearInsurance += monthlyInsurance;
      totalInsurancePaid += monthlyInsurance;

      buyYearMaintenance += monthlyMaintenance;
      totalMaintenancePaid += monthlyMaintenance;

      buyYearHOA += monthlyHOA;
      totalHOAPaid += monthlyHOA;

      let pmt = monthlyPMI;
      if (hasPMI && (homeValue - remainingBalance) / homeValue >= 0.22) {
        pmt = 0;
      }
      buyYearPMI += pmt;
      totalPMIPaid += pmt;
    }

    homeValue *= (1 + homeAppreciation / 100);
    buyYearOutOfPocket = buyYearPrincipal + buyYearInterest + buyYearTax + buyYearInsurance + buyYearMaintenance + buyYearHOA + buyYearPMI;
    buyCumulativeOutOfPocket += buyYearOutOfPocket;
    const equity = Math.max(0, homeValue - remainingBalance);
    const grossProceeds = homeValue * (1 - sellingCostPercent / 100);
    const gain = Math.max(0, grossProceeds - remainingBalance - downPayment);
    const taxableGain = Math.max(0, gain - capGainsExclusion);
    const capGainsTax = taxableGain * 0.15;
    const sellingProceedsAfterTax = grossProceeds - remainingBalance - capGainsTax;
    const buyNetCost = buyCumulativeOutOfPocket - (downPaymentPercent >= 20 ? 0 : 0) - sellingProceedsAfterTax;

    let rentYearPaid = 0;
    for (let m = 1; m <= 12; m++) {
      const rp = currentRent + renterInsuranceMonthly;
      rentYearPaid += rp;
      totalRentPaid += rp;
    }
    rentMonthlyPayment = currentRent + renterInsuranceMonthly;
    rentCumulativeOutOfPocket += rentYearPaid;
    currentRent *= (1 + rentIncreasePercent / 100);
    const monthlySavings = buyMonthlyPayment > rentMonthlyPayment
      ? 0
      : (buyMonthlyPayment - rentMonthlyPayment) * -1;
    const downPaymentInvested = downPayment * Math.pow(1 + investmentReturn / 100, year);
    cumulativeMonthlySavingsInvested = 0;
    for (let y = 1; y <= year; y++) {
      const ms = (buyMonthlyPayment - (monthlyRent * Math.pow(1 + rentIncreasePercent / 100, y - 1) + renterInsuranceMonthly));
      const monthlySavingsAmt = ms < 0 ? Math.abs(ms) : 0;
      cumulativeMonthlySavingsInvested += monthlySavingsAmt * 12 * Math.pow(1 + investmentReturn / 100, year - y);
    }
    const totalPortfolioValue = downPaymentInvested + cumulativeMonthlySavingsInvested;
    const portfolioGain = Math.max(0, totalPortfolioValue - downPayment);
    const portfolioTax = portfolioGain * 0.15;
    const portfolioAfterTax = totalPortfolioValue - portfolioTax;
    const rentNetCost = rentCumulativeOutOfPocket + securityDeposit - portfolioAfterTax;

    const buyAdvantage = portfolioAfterTax - sellingProceedsAfterTax;

    annualData.push({
      year,
      buy: {
        totalOutOfPocket: buyYearOutOfPocket,
        cumulativeOutOfPocket: buyCumulativeOutOfPocket,
        homeValue,
        remainingBalance: Math.max(0, remainingBalance),
        equity,
        sellingProceedsAfterTax,
        netCost: buyNetCost,
        monthlyPITI: monthlyPIVal + monthlyTax + monthlyInsurance + monthlyPMI,
        principalPaid: buyYearPrincipal,
        interestPaid: buyYearInterest,
        taxPaid: buyYearTax,
        insurancePaid: buyYearInsurance,
        maintenancePaid: buyYearMaintenance,
        hoaPaid: buyYearHOA,
        pmiPaid: buyYearPMI,
      },
      rent: {
        totalPaid: rentYearPaid,
        cumulativePaid: rentCumulativeOutOfPocket - securityDeposit,
        monthlyRentCurrent: currentRent / (1 + rentIncreasePercent / 100),
        downPaymentInvested,
        monthlySavingsInvested: cumulativeMonthlySavingsInvested,
        totalPortfolioValue,
        portfolioAfterTax,
        netCost: rentNetCost,
      },
      buyAdvantage
    });
  }

  const finalData = annualData.slice(0, timeHorizonYears);
  const lastYear = finalData[finalData.length - 1];
  const firstYear = annualData[0];

  let breakEvenYear: number | null = null;
  let neverBreaksEven = true;
  for (const d of finalData) {
    if (d.buyAdvantage <= 0) {
      neverBreaksEven = false;
      breakEvenYear = d.year;
      break;
    }
  }

  const buyMonthlyAvg = lastYear.buy.cumulativeOutOfPocket / (timeHorizonYears * 12);
  const rentMonthlyAvg = lastYear.rent.cumulativePaid / (timeHorizonYears * 12);

  const buyFirstYearPITI = firstYear.buy.monthlyPITI;
  const rentFirstYearMonthly = firstYear.rent.monthlyRentCurrent + renterInsuranceMonthly;

  let buyState: 'cheaper' | 'more_expensive';
  let rentState: 'cheaper' | 'more_expensive';
  if (buyFirstYearPITI <= rentFirstYearMonthly) {
    buyState = 'cheaper';
    rentState = 'more_expensive';
  } else {
    buyState = 'more_expensive';
    rentState = 'cheaper';
  }

  let recommendedAction: 'buy' | 'rent' | 'depends';
  if (breakEvenYear && breakEvenYear <= timeHorizonYears) {
    recommendedAction = 'buy';
  } else if (neverBreaksEven) {
    recommendedAction = 'rent';
  } else {
    recommendedAction = 'depends';
  }

  return {
    breakEvenYear,
    neverBreaksEven,
    recommendedAction,
    annualData: finalData,
    totals: {
      buyTotalCost: lastYear.buy.cumulativeOutOfPocket,
      rentTotalCost: lastYear.rent.cumulativePaid,
      buyNetWorth: lastYear.buy.sellingProceedsAfterTax,
      rentNetWorth: lastYear.rent.portfolioAfterTax,
      buyMonthlyAvg,
      rentMonthlyAvg,
      buySellingProceeds: lastYear.buy.sellingProceedsAfterTax,
      rentPortfolioAfterTax: lastYear.rent.portfolioAfterTax
    },
    buyFirstYearPITI,
    rentFirstYearMonthly,
    buyState,
    rentState
  };
}

export function formatCurrency(val: number): string {
  return '$' + Math.round(val).toLocaleString('en-US');
}

export function formatPercent(val: number): string {
  return val.toFixed(1) + '%';
}
