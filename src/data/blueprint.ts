export interface LoanProgram {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  creditMinLabel: string;
  downPaymentMinLabel: string;
  dtiTypicalLabel: string;
  hasMI: boolean;
  miLabel: string;
  miDetails: string;
  occupancyTypes: string[];
  propertyTypes: string[];
  conformingLimit: number | null;
  rateAdjustment: number;
  keyFeatures: string[];
  suitableScenarios: string[];
  guideSlug?: string;
}

export const loanPrograms: LoanProgram[] = [
  {
    slug: 'conventional',
    name: 'Conventional Loan',
    shortName: 'Conventional',
    description: 'A standard mortgage not backed by a government agency. Offered by private lenders and typically follows guidelines set by Fannie Mae and Freddie Mac. Widely available for primary residences, second homes, and investment properties.',
    creditMinLabel: '620 or higher typically',
    downPaymentMinLabel: '3% to 5% (varies by lender and occupancy)',
    dtiTypicalLabel: 'Typically up to 43% — 45% in some cases',
    hasMI: true,
    miLabel: 'PMI (Private Mortgage Insurance)',
    miDetails: 'Required when down payment is below 20%. Typically canceled automatically once LTV reaches 78%.',
    occupancyTypes: ['primary', 'second-home', 'investment'],
    propertyTypes: ['single-family', 'condo', 'multi-unit'],
    conformingLimit: 766550,
    rateAdjustment: 0,
    keyFeatures: [
      'Flexible down payment options (3% — 20%+)',
      'PMI cancellable once you reach 20% equity',
      'Available for primary, second home, and investment properties',
      'Private lender terms vary — rate shopping recommended'
    ],
    suitableScenarios: ['first-time', 'moving-up', 'refinance', 'investment'],
    guideSlug: 'conforming-loans-guide'
  },
  {
    slug: 'fha',
    name: 'FHA Loan',
    shortName: 'FHA',
    description: 'Insured by the Federal Housing Administration. Designed to help borrowers who may have lower credit scores or limited down payment savings. Popular among first-time home buyers.',
    creditMinLabel: '580 or higher typically (500+ with 10% down)',
    downPaymentMinLabel: '3.5% (10% if credit score is below 580)',
    dtiTypicalLabel: 'Typically up to 43% — 50% in some cases',
    hasMI: true,
    miLabel: 'MIP (Mortgage Insurance Premium)',
    miDetails: 'Includes upfront MIP (1.75% of loan) and annual MIP (0.55% — 1.05%). Annual MIP is required for the life of the loan for most borrowers, or 11 years on some terms.',
    occupancyTypes: ['primary'],
    propertyTypes: ['single-family', 'condo', 'multi-unit'],
    conformingLimit: 498257,
    rateAdjustment: 0.15,
    keyFeatures: [
      'Lower credit score thresholds compared to conventional',
      '3.5% minimum down payment',
      'Upfront + annual mortgage insurance required',
      'Primary residence only'
    ],
    suitableScenarios: ['first-time', 'moving-up', 'refinance'],
    guideSlug: 'fha-vs-conventional-loans'
  },
  {
    slug: 'va',
    name: 'VA Loan',
    shortName: 'VA',
    description: 'Guaranteed by the Department of Veterans Affairs. Available to eligible veterans, active-duty service members, and qualifying surviving spouses. No down payment or PMI required.',
    creditMinLabel: 'No official minimum — 620 is common in practice',
    downPaymentMinLabel: '0% (no down payment required)',
    dtiTypicalLabel: 'Typically up to 41% — may go higher with residual income',
    hasMI: false,
    miLabel: 'None',
    miDetails: 'VA loans do not require mortgage insurance. A one-time VA funding fee applies (0.5% — 3.3%) unless exempt.',
    occupancyTypes: ['primary'],
    propertyTypes: ['single-family', 'condo', 'multi-unit'],
    conformingLimit: null,
    rateAdjustment: -0.25,
    keyFeatures: [
      'Zero down payment option',
      'No PMI or MIP',
      'Competitive interest rates',
      'VA funding fee (can be rolled into loan)',
      'Must meet eligibility requirements'
    ],
    suitableScenarios: ['first-time', 'moving-up', 'refinance'],
    guideSlug: 'first-time-home-buyer-guide'
  },
  {
    slug: 'usda',
    name: 'USDA Loan',
    shortName: 'USDA',
    description: 'Backed by the U.S. Department of Agriculture. Designed for low-to-moderate income buyers in eligible rural and suburban areas. Offers zero down payment financing.',
    creditMinLabel: '640 or higher typically',
    downPaymentMinLabel: '0% (no down payment required in most cases)',
    dtiTypicalLabel: 'Typically up to 41% (29% housing ratio)',
    hasMI: false,
    miLabel: 'Guarantee Fee',
    miDetails: 'Includes upfront guarantee fee (1% of loan) and annual fee (0.35%). These are not mortgage insurance but serve a similar function for the program.',
    occupancyTypes: ['primary'],
    propertyTypes: ['single-family'],
    conformingLimit: null,
    rateAdjustment: -0.1,
    keyFeatures: [
      'Zero down payment option',
      'Below-market interest rates',
      'Limited to eligible rural and suburban areas',
      'Income limits apply',
      'Primary residence only'
    ],
    suitableScenarios: ['first-time', 'moving-up'],
    guideSlug: 'first-time-home-buyer-guide'
  },
  {
    slug: 'jumbo',
    name: 'Jumbo Loan',
    shortName: 'Jumbo',
    description: 'A non-conforming loan for amounts exceeding the conforming loan limit set by Fannie Mae and Freddie Mac. Used for higher-priced properties that exceed standard limits.',
    creditMinLabel: '700 or higher typically',
    downPaymentMinLabel: '10% to 20% (varies by lender)',
    dtiTypicalLabel: 'Typically up to 43%',
    hasMI: false,
    miLabel: 'Varies by lender',
    miDetails: 'Jumbo loans may or may not require mortgage insurance depending on down payment size. Terms vary significantly by lender.',
    occupancyTypes: ['primary', 'second-home', 'investment'],
    propertyTypes: ['single-family', 'condo', 'multi-unit'],
    conformingLimit: null,
    rateAdjustment: 0.5,
    keyFeatures: [
      'For home values above conforming loan limits',
      'Higher credit and down payment requirements',
      'Rate may be higher or lower than conventional — shop lenders',
      'Available for primary, second home, and investment'
    ],
    suitableScenarios: ['first-time', 'moving-up', 'refinance', 'investment'],
    guideSlug: 'jumbo-loans-guide'
  }
];

export const EMPLOYMENT_LABELS: Record<string, string> = {
  'w2': 'Employed (W-2)',
  'self-employed': 'Self-Employed / 1099',
  'veteran': 'Veteran / Active Military',
  'retired': 'Retired'
};

export const EMPLOYMENT_ORDER = ['w2', 'self-employed', 'veteran', 'retired'] as const;

export const SCENARIO_LABELS: Record<string, string> = {
  'first-time': 'First-Time Buyer',
  'moving-up': 'Moving Up / Next Home',
  'refinance': 'Refinancing',
  'investment': 'Investment Property'
};

export const SCENARIO_ORDER = ['first-time', 'moving-up', 'refinance', 'investment'] as const;

export const TIMELINE_LABELS: Record<string, string> = {
  '3mo': 'Within 3 months',
  '6mo': '3 — 6 months',
  '1yr': '6 — 12 months',
  '2yr+': '12+ months — just exploring'
};

export const TIMELINE_ORDER = ['3mo', '6mo', '1yr', '2yr+'] as const;

export const CREDIT_LABELS: Record<string, string> = {
  'excellent': 'Excellent (760+)',
  'good': 'Good (700 — 759)',
  'fair': 'Fair (640 — 699)',
  'below-640': 'Below 640',
  'unsure': 'Not Sure'
};

export const CREDIT_ORDER = ['excellent', 'good', 'fair', 'below-640', 'unsure'] as const;

export const PROPERTY_LABELS: Record<string, string> = {
  'single-family': 'Single-Family Home',
  'condo': 'Condo / Townhouse',
  'multi-unit': 'Multi-Unit (2 — 4 units)',
  'commercial': 'Commercial Property'
};

export const PROPERTY_ORDER = ['single-family', 'condo', 'multi-unit', 'commercial'] as const;
