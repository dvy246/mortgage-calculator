import { calculateMonthlyPI } from './mortgage';

export interface UserFinancialProfile {
  monthlyIncome: number;
  monthlyDebts: number;
  cashReserves: number;
  defaultDownPercent: number;
  interestRate: number; // annual percentage, e.g., 6.5
}

export interface DealProperty {
  id: string;
  name: string;
  price: number;
  propertyTaxRate: number; // e.g., 1.25
  monthlyInsurance: number; // e.g., 150
  monthlyHOA: number; // e.g., 200
  customDownPercent?: number; // optional overwrite for down payment %
}

export interface PropertyAnalysis {
  property: DealProperty;
  loanAmount: number;
  downPaymentAmount: number;
  monthlyPI: number;
  monthlyTax: number;
  monthlyPMI: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  totalMonthlyCost: number;
  frontEndDTI: number;
  backEndDTI: number;
  closingCosts: number;
  cashNeededToClose: number;
  cashSurplus: number;
  isAffordable: boolean;
}

/**
 * Calculates PMI rate based on LTV.
 * LTV > 95% = 1.0% annual PMI
 * LTV 90.01% to 95% = 0.75% annual PMI
 * LTV 80.01% to 90% = 0.50% annual PMI
 * LTV <= 80% = 0% annual PMI
 */
export function estimatePMIRate(downPaymentPercent: number): number {
  const ltv = 100 - downPaymentPercent;
  if (ltv <= 80) return 0;
  if (ltv <= 90) return 0.50;
  if (ltv <= 95) return 0.75;
  return 1.0;
}

/**
 * Analyze a property against user's financial profile.
 */
export function analyzeProperty(
  property: DealProperty,
  profile: UserFinancialProfile
): PropertyAnalysis {
  const downPercent = property.customDownPercent !== undefined ? property.customDownPercent : profile.defaultDownPercent;
  const downPaymentAmount = (property.price * downPercent) / 100;
  const loanAmount = property.price - downPaymentAmount;

  // Monthly P&I (fixed 30 years)
  const monthlyPI = calculateMonthlyPI(loanAmount, profile.interestRate, 30);

  // Monthly Taxes & Insurance
  const monthlyTax = (property.price * (property.propertyTaxRate / 100)) / 12;
  const monthlyInsurance = property.monthlyInsurance;
  const monthlyHOA = property.monthlyHOA;

  // Monthly PMI
  const pmiRate = estimatePMIRate(downPercent);
  const monthlyPMI = pmiRate > 0 ? (loanAmount * (pmiRate / 100)) / 12 : 0;

  // Total Monthly Cost
  const totalMonthlyCost = monthlyPI + monthlyTax + monthlyInsurance + monthlyHOA + monthlyPMI;

  // DTI Ratios
  const frontEndDTI = profile.monthlyIncome > 0 ? (totalMonthlyCost / profile.monthlyIncome) * 100 : 0;
  const backEndDTI = profile.monthlyIncome > 0 ? ((totalMonthlyCost + profile.monthlyDebts) / profile.monthlyIncome) * 100 : 0;

  // Closing Costs Estimate (2.5% of loan amount as a safe industry benchmark)
  const closingCosts = loanAmount * 0.025;
  const cashNeededToClose = downPaymentAmount + closingCosts;
  const cashSurplus = profile.cashReserves - cashNeededToClose;

  // Affordability Check:
  // Standard underwriting rules: Front DTI <= 31%, Back DTI <= 43%, Cash Reserves >= Cash to Close
  const isAffordable = frontEndDTI <= 31 && backEndDTI <= 43 && cashSurplus >= 0;

  return {
    property,
    loanAmount,
    downPaymentAmount,
    monthlyPI,
    monthlyTax,
    monthlyPMI,
    monthlyInsurance,
    monthlyHOA,
    totalMonthlyCost,
    frontEndDTI,
    backEndDTI,
    closingCosts,
    cashNeededToClose,
    cashSurplus,
    isAffordable
  };
}

/**
 * Encodes the entire workspace state (profile + properties) into a compressed URL query parameter.
 */
export function serializeWorkspace(
  profile: UserFinancialProfile,
  properties: DealProperty[]
): string {
  try {
    const dataObj = {
      p: [
        profile.monthlyIncome,
        profile.monthlyDebts,
        profile.cashReserves,
        profile.defaultDownPercent,
        profile.interestRate
      ],
      h: properties.map(prop => [
        prop.name,
        prop.price,
        prop.propertyTaxRate,
        prop.monthlyInsurance,
        prop.monthlyHOA,
        prop.customDownPercent ?? -1
      ])
    };
    const jsonStr = JSON.stringify(dataObj);
    // Use base64 encoding to compress
    const base64 = typeof window !== 'undefined' ? window.btoa(unescape(encodeURIComponent(jsonStr))) : Buffer.from(jsonStr).toString('base64');
    return encodeURIComponent(base64);
  } catch (e) {
    console.error('Error serializing workspace:', e);
    return '';
  }
}

/**
 * Decodes the workspace state from a URL query parameter back into profile & properties.
 */
export function deserializeWorkspace(encodedStr: string): {
  profile: UserFinancialProfile;
  properties: DealProperty[];
} | null {
  try {
    const decodedStr = typeof window !== 'undefined' ? decodeURIComponent(encodedStr) : encodedStr;
    const jsonStr = typeof window !== 'undefined' ? decodeURIComponent(escape(window.atob(decodedStr))) : Buffer.from(decodedStr, 'base64').toString('utf-8');
    const dataObj = JSON.parse(jsonStr);

    const profile: UserFinancialProfile = {
      monthlyIncome: dataObj.p[0],
      monthlyDebts: dataObj.p[1],
      cashReserves: dataObj.p[2],
      defaultDownPercent: dataObj.p[3],
      interestRate: dataObj.p[4]
    };

    const properties: DealProperty[] = dataObj.h.map((hArray: any[], idx: number) => {
      const prop: DealProperty = {
        id: `prop-${idx + 1}-${Date.now()}`,
        name: hArray[0],
        price: hArray[1],
        propertyTaxRate: hArray[2],
        monthlyInsurance: hArray[3],
        monthlyHOA: hArray[4]
      };
      if (hArray[5] !== -1) {
        prop.customDownPercent = hArray[5];
      }
      return prop;
    });

    return { profile, properties };
  } catch (e) {
    console.error('Error deserializing workspace:', e);
    return null;
  }
}
