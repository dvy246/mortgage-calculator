export interface ComparisonScenarioInputs {
  name: string;
  type: 'mortgage';
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  insuranceRate: number;
  pmiRate: number;
  hoaFee: number;
  extraMonthly: number;
  extraAnnual: number;
}

export interface ComparisonConfig {
  slug: string;
  title: string;
  description: string;
  scenarios: ComparisonScenarioInputs[];
  guideTitle: string;
  guideSubtitle: string;
  whatItDoes: string;
  whenToUse: string;
  howItWorks: string;
  mistakes: string;
  faqs: { question: string; answer: string }[];
}

export const comparisons: ComparisonConfig[] = [
  {
    slug: '15-vs-30-year-mortgage',
    title: '15-Year vs 30-Year Mortgage Comparison',
    description: 'Compare 15-year vs 30-year mortgage costs side by side. See monthly payment differences, total interest paid, breakeven timelines, and lifetime cost analysis.',
    scenarios: [
      {
        name: '30-Year Fixed',
        type: 'mortgage',
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.25,
        loanTermYears: 30,
        propertyTaxRate: 1.1,
        insuranceRate: 0.5,
        pmiRate: 0.75,
        hoaFee: 0,
        extraMonthly: 0,
        extraAnnual: 0
      },
      {
        name: '15-Year Fixed',
        type: 'mortgage',
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 5.80,
        loanTermYears: 15,
        propertyTaxRate: 1.1,
        insuranceRate: 0.5,
        pmiRate: 0,
        hoaFee: 0,
        extraMonthly: 0,
        extraAnnual: 0
      }
    ],
    guideTitle: '15-Year vs 30-Year Mortgage',
    guideSubtitle: 'Understanding the trade-offs between monthly cash flow and long-term interest costs',
    whatItDoes: 'This comparison engine models two standard fixed-rate mortgage terms — 15 years and 30 years — side by side using identical home price, down payment, and local tax assumptions. It computes the monthly Principal & Interest payment for each term, the total cumulative interest paid over the full life of each loan, and the equity accumulation trajectory. The 15-year term typically carries a lower interest rate but a higher monthly payment, while the 30-year term offers lower monthly obligations at the cost of substantially more lifetime interest.',
    whenToUse: 'Use this comparison when deciding between a 15-year and 30-year mortgage during the home buying process. The 30-year term is ideal for buyers who prioritize cash flow flexibility, plan to invest the difference in higher-return assets, or expect to move within 5-10 years. The 15-year term is better suited for buyers with stable incomes who want to minimize total interest costs, build equity quickly, and own their home free and clear by retirement age.',
    howItWorks: 'Both loans are modeled with identical home price ($400,000), down payment (20%), and prevailing interest rates for each term length. The standard amortization formula calculates the fixed monthly payment for each option. The 15-year loan has a higher monthly payment because the principal is repaid over half the time, but the lower rate and shorter duration result in dramatically less total interest. The equity accumulation curve is also steeper with the 15-year term, meaning the homeowner reaches 50% equity significantly faster.',
    mistakes: 'The most common mistake is choosing solely based on the monthly payment without calculating total lifetime cost. A 30-year loan at 6.25% may cost over $300,000 more in interest than a 15-year loan at 5.80%. Another error is assuming you must stay with the original term for the full duration — many homeowners refinance or make extra payments later. Finally, failing to consider opportunity cost: if the monthly savings from a 30-year term are invested at a higher return rate than the mortgage interest rate, the 30-year term may actually result in greater net wealth.',
    faqs: [
      {
        question: 'How much more is a 30-year mortgage than a 15-year?',
        answer: 'The 30-year mortgage typically has a monthly payment that is 25-40% lower, but the total lifetime interest cost is 2-3 times higher than a 15-year mortgage. On a $320,000 loan at current rates, the 30-year term may cost $200,000-$300,000 more in interest over the full loan life.'
      },
      {
        question: 'Is a 15-year mortgage worth it?',
        answer: 'A 15-year mortgage is worth it if you can comfortably afford the higher monthly payment and your priority is minimizing total interest costs while building equity quickly. It is especially valuable for buyers approaching retirement who want a paid-off home by age 65.'
      },
      {
        question: 'Can I pay off a 30-year mortgage in 15 years?',
        answer: 'Yes. By making extra principal payments equivalent to the difference between a 15-year and 30-year monthly payment, you can effectively pay off a 30-year mortgage in 15 years while retaining the flexibility to reduce payments during financial hardship.'
      },
      {
        question: 'What is the average rate difference between 15 and 30 year mortgages?',
        answer: 'Historically, 15-year fixed mortgage rates are 0.25% to 0.75% lower than 30-year fixed rates. This rate discount, combined with the shorter term, significantly reduces total interest costs.'
      }
    ]
  },
  {
    slug: 'fha-vs-conventional-loans',
    title: 'FHA vs Conventional Loan Comparison',
    description: 'Compare FHA loans vs conventional mortgages. Analyze monthly payments, mortgage insurance costs, down payment requirements, and total lifetime expenses for each loan type.',
    scenarios: [
      {
        name: 'FHA Loan',
        type: 'mortgage',
        homePrice: 350000,
        downPayment: 12250,
        interestRate: 6.50,
        loanTermYears: 30,
        propertyTaxRate: 1.1,
        insuranceRate: 0.5,
        pmiRate: 0.85,
        hoaFee: 0,
        extraMonthly: 0,
        extraAnnual: 0
      },
      {
        name: 'Conventional',
        type: 'mortgage',
        homePrice: 350000,
        downPayment: 17500,
        interestRate: 6.75,
        loanTermYears: 30,
        propertyTaxRate: 1.1,
        insuranceRate: 0.5,
        pmiRate: 0.75,
        hoaFee: 0,
        extraMonthly: 0,
        extraAnnual: 0
      }
    ],
    guideTitle: 'FHA vs Conventional Loan',
    guideSubtitle: 'Comparing down payment flexibility, mortgage insurance costs, and total loan expenses',
    whatItDoes: 'This comparison tool models an FHA loan and a conventional 30-year fixed mortgage side by side using the same home price. The FHA scenario uses a 3.5% down payment and FHA MIP, while the conventional scenario uses a 5% down payment with private mortgage insurance. It calculates monthly payment differences, total mortgage insurance costs, and lifetime interest for both options.',
    whenToUse: 'Use this comparison when you are deciding between an FHA-insured loan and a conventional mortgage. FHA loans are attractive for buyers with lower credit scores (580+) or limited down payment savings (as low as 3.5%). Conventional loans may offer lower total costs for buyers with good credit (660+) who can put at least 5% down and want to avoid FHA\'s lifetime mortgage insurance requirements.',
    howItWorks: 'Both loans are modeled on a $350,000 home with their respective down payment and rate assumptions. The FHA loan includes both the upfront Mortgage Insurance Premium (1.75% of base loan, typically rolled into the loan) and the annual MIP (0.85% of the loan balance). The conventional loan includes private mortgage insurance (PMI) that can be cancelled once the loan-to-value ratio reaches 80%, unlike FHA MIP which typically remains for the life of the loan on 30-year terms with less than 10% down.',
    mistakes: 'A common mistake is ignoring that FHA MIP on a 30-year loan with less than 10% down typically lasts the entire loan term, while conventional PMI can be cancelled at 78-80% LTV. Another error is assuming FHA always has lower rates — conventional loans often have competitive rates for borrowers with good credit. Finally, many buyers forget to factor in the upfront FHA MIP premium (1.75%) which adds thousands to the loan balance.',
    faqs: [
      {
        question: 'Is FHA cheaper than conventional?',
        answer: 'FHA loans can be cheaper upfront due to the lower down payment requirement, but conventional loans often cost less over the long term because PMI can be cancelled once you reach 20% equity. FHA MIP on a 30-year loan with less than 10% down typically lasts the entire loan term.'
      },
      {
        question: 'What credit score do I need for FHA vs conventional?',
        answer: 'FHA loans require a minimum credit score of 580 for 3.5% down (or 500 with 10% down). Conventional loans typically require a minimum score of 620, but better rates are available at 660+ and the best rates at 740+.'
      },
      {
        question: 'Can I remove FHA mortgage insurance?',
        answer: 'For FHA loans originated after June 3, 2013, MIP on 30-year loans with less than 10% down lasts the entire loan term. With 10% or more down, MIP cancels after 11 years. This is a key difference from conventional loans where PMI can be removed at 80% LTV.'
      }
    ]
  },
  {
    slug: 'arm-vs-fixed-rate-mortgage',
    title: 'ARM vs Fixed Rate Mortgage Comparison',
    description: 'Compare adjustable-rate mortgage (ARM) vs fixed-rate mortgage costs. Analyze initial savings, worst-case rate adjustments, breakeven holding periods, and long-term cost projections.',
    scenarios: [
      {
        name: '30-Year Fixed',
        type: 'mortgage',
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.50,
        loanTermYears: 30,
        propertyTaxRate: 1.1,
        insuranceRate: 0.5,
        pmiRate: 0.75,
        hoaFee: 0,
        extraMonthly: 0,
        extraAnnual: 0
      },
      {
        name: '5/1 ARM',
        type: 'mortgage',
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 5.75,
        loanTermYears: 30,
        propertyTaxRate: 1.1,
        insuranceRate: 0.5,
        pmiRate: 0.75,
        hoaFee: 0,
        extraMonthly: 0,
        extraAnnual: 0
      }
    ],
    guideTitle: 'ARM vs Fixed Rate Mortgage',
    guideSubtitle: 'Evaluating initial payment savings against future rate adjustment risks',
    whatItDoes: 'This comparison tool models a 30-year fixed-rate mortgage against a 5/1 Adjustable-Rate Mortgage (ARM) using the same home price and down payment. The fixed-rate scenario locks in a constant interest rate and payment for 30 years, while the ARM scenario starts with a lower initial rate that adjusts annually after the initial 5-year fixed period based on market conditions.',
    whenToUse: 'Use this comparison when choosing between rate stability and initial payment savings. An ARM makes sense if you plan to sell or refinance within the initial fixed period (typically 5-7 years), as you benefit from the lower rate without facing adjustments. A fixed-rate mortgage is better for long-term homeowners who value payment predictability and want protection against future rate increases.',
    howItWorks: 'Both loans start with a $320,000 principal on a $400,000 home. The 30-year fixed rate (6.50%) locks in a consistent monthly P&I payment for the full duration. The 5/1 ARM (5.75%) offers a lower fixed payment for the first 5 years, after which the rate adjusts annually based on a benchmark index plus a margin. Each adjustment is capped (typically 2% at the first adjustment and 6% lifetime cap). The comparison shows the initial savings and models the potential costs if rates rise at each adjustment period.',
    mistakes: 'The most common mistake is choosing an ARM without a plan for the adjustment period. If you plan to stay beyond the fixed period and rates have risen, your monthly payment could increase significantly. Another error is ignoring the lifetime cap structure — while initial rates are attractive, the fully indexed rate could exceed the starting fixed rate by 6% or more over the loan life.',
    faqs: [
      {
        question: 'What is a 5/1 ARM?',
        answer: 'A 5/1 ARM has a fixed interest rate for the first 5 years, then adjusts annually (the "1" in 5/1) for the remaining 25 years. Each adjustment is based on a benchmark index plus a preset margin, with caps limiting how much the rate can change at each adjustment and over the life of the loan.'
      },
      {
        question: 'Is an ARM a bad idea right now?',
        answer: 'An ARM can be a smart choice when you plan to sell or refinance within the initial fixed period, regardless of the rate environment. ARMs typically offer lower starting rates than fixed-rate mortgages, providing immediate monthly savings. The risk depends on how long you plan to keep the loan and your ability to handle potential rate increases.'
      },
      {
        question: 'How high can an ARM rate go?',
        answer: 'Most ARMs have a 5% to 6% lifetime interest rate cap above the initial rate. For example, a 5/1 ARM starting at 5.75% might have a maximum lifetime rate of 11.75%. The first adjustment is typically capped at 2%, meaning the rate cannot jump more than 2% at the first adjustment.'
      }
    ]
  },
  {
    slug: 'buying-mortgage-points-analysis',
    title: 'Buying Mortgage Points Analysis',
    description: 'Analyze whether buying mortgage discount points is worth it. Compare upfront point costs vs monthly savings, calculate breakeven timelines, and determine the optimal number of points for your situation.',
    scenarios: [
      {
        name: 'No Points',
        type: 'mortgage',
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.75,
        loanTermYears: 30,
        propertyTaxRate: 1.1,
        insuranceRate: 0.5,
        pmiRate: 0.75,
        hoaFee: 0,
        extraMonthly: 0,
        extraAnnual: 0
      },
      {
        name: '2 Points Purchased',
        type: 'mortgage',
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.00,
        loanTermYears: 30,
        propertyTaxRate: 1.1,
        insuranceRate: 0.5,
        pmiRate: 0.75,
        hoaFee: 0,
        extraMonthly: 0,
        extraAnnual: 0
      }
    ],
    guideTitle: 'Mortgage Points Analysis',
    guideSubtitle: 'Determining whether buying down your interest rate makes financial sense',
    whatItDoes: 'This comparison tool models a mortgage with and without discount points purchased at closing. Points (each costing 1% of the loan amount) permanently reduce the note rate by approximately 0.25% per point. The analysis shows the upfront cost of points, the resulting monthly payment reduction, and the breakeven timeline — the number of months required for the cumulative monthly savings to exceed the initial point cost.',
    whenToUse: 'Use this analysis when a lender offers you the option to buy discount points and you are deciding whether to pay upfront for a lower rate. Points are most valuable if you plan to stay in the home beyond the breakeven point (typically 3-7 years). They are less attractive if you expect to sell or refinance before reaching breakeven, or if the upfront cash could earn a higher return elsewhere.',
    howItWorks: 'Two scenarios are modeled on a $320,000 loan amount. The no-points scenario carries the prevailing interest rate (6.75%). The 2-points scenario has the borrower pay 2% of the loan amount ($6,400) at closing in exchange for a reduced rate (6.00%). The lower rate reduces the monthly P&I payment. The difference in monthly payments is divided into the point cost to determine the breakeven month. Total lifetime interest savings are also calculated for comparison.',
    mistakes: 'The most common mistake is buying points with money that could serve as a larger down payment instead. A larger down payment reduces the loan balance permanently, while points only reduce the rate. Another error is buying points when planning to sell before the breakeven date — the savings never recoup the upfront cost. Finally, failing to shop multiple lenders is a mistake, as some lenders offer lower par rates (no-points rates) without requiring points to get competitive pricing.',
    faqs: [
      {
        question: 'Are mortgage points tax deductible?',
        answer: 'Yes, mortgage points are generally tax deductible as prepaid interest. On a purchase mortgage, points are typically deducted in full in the year of purchase. On a refinance, points must be amortized and deducted over the life of the loan. Consult a tax professional for your specific situation.'
      },
      {
        question: 'How many points can I buy on a mortgage?',
        answer: 'Most lenders allow you to buy up to 3-4 discount points. Each point typically reduces the rate by 0.25%, so 4 points could lower your rate by approximately 1.00%. However, there are regulatory limits on how much in points and fees can be charged on certain loan types.'
      },
      {
        question: 'What is the breakeven period for mortgage points?',
        answer: 'The breakeven period is typically 3 to 7 years, calculated by dividing the total cost of points by the monthly payment savings. If you plan to stay in the home beyond the breakeven point, buying points saves you money. If you expect to move sooner, points may not be worth the upfront cost.'
      }
    ]
  },
  {
    slug: 'extra-payment-mortgage-comparison',
    title: 'Extra Payment Mortgage Comparison',
    description: 'Compare standard mortgage payments vs extra principal payment strategies. See how much interest you save and how many years you eliminate by making additional monthly or annual prepayments.',
    scenarios: [
      {
        name: 'Standard Payment',
        type: 'mortgage',
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.50,
        loanTermYears: 30,
        propertyTaxRate: 1.1,
        insuranceRate: 0.5,
        pmiRate: 0.75,
        hoaFee: 0,
        extraMonthly: 0,
        extraAnnual: 0
      },
      {
        name: '+$200/mo Extra',
        type: 'mortgage',
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.50,
        loanTermYears: 30,
        propertyTaxRate: 1.1,
        insuranceRate: 0.5,
        pmiRate: 0.75,
        hoaFee: 0,
        extraMonthly: 200,
        extraAnnual: 0
      }
    ],
    guideTitle: 'Extra Payment Strategy',
    guideSubtitle: 'Quantifying the long-term impact of prepaying your mortgage principal',
    whatItDoes: 'This comparison models a standard 30-year fixed amortization schedule against an accelerated schedule that includes recurring extra principal payments. It calculates the exact interest savings and years eliminated from the loan term by adding even modest additional monthly payments. The analysis also tracks how extra payments accelerate equity buildup and bypass front-loaded interest charges.',
    whenToUse: 'Use this comparison when you have surplus monthly cash flow and are deciding whether to direct it toward mortgage prepayment versus other uses like investing. It is particularly useful for evaluating the impact of extra payments during the early years of a mortgage when interest charges are highest. Also use it to compare different extra payment amounts to find the right balance between payoff acceleration and cash flow needs.',
    howItWorks: 'Both scenarios share the same base loan parameters ($320,000 loan at 6.50% for 30 years). The standard scenario makes only the required monthly P&I payment. The accelerated scenario adds a $200 monthly principal-only payment. Because the extra payment reduces the outstanding balance directly, less interest accrues in subsequent months. This compounding effect means even small extra payments produce significant long-term savings. The engine computes two full amortization schedules and compares the cumulative interest and payoff dates.',
    mistakes: 'The most common mistake is failing to designate extra payments as "Principal Only" with your loan servicer. Without this designation, the servicer may apply the surplus toward next month\'s regular payment, which prepays interest rather than principal. Another error is prepaying a low-rate mortgage (under 4%) when you could earn a higher after-tax return by investing in diversified assets. Finally, draining emergency savings to make extra payments removes your financial safety net.',
    faqs: [
      {
        question: 'Does extra payment reduce monthly payment or loan term?',
        answer: 'Extra principal payments reduce your loan term and total interest but do not lower your scheduled monthly payment. To lower the monthly payment, you would need to request a mortgage recast or refinance to a new loan with better terms.'
      },
      {
        question: 'How much does an extra $200 per month save?',
        answer: 'On a $320,000 loan at 6.50%, an extra $200 per month saves approximately $100,000 in total interest and pays off the loan 8-9 years early. The exact savings depend on your rate and remaining loan balance.'
      },
      {
        question: 'Is it better to invest or pay extra on mortgage?',
        answer: 'The answer depends on your mortgage rate vs expected investment returns. If your mortgage rate is 6.5% or higher, prepaying provides a guaranteed risk-free return equivalent to that rate. If your rate is under 4%, historical stock market returns may outperform. Consider your risk tolerance and liquidity needs before deciding.'
      }
    ]
  }
];

export function getComparisonBySlug(slug: string): ComparisonConfig | undefined {
  return comparisons.find(c => c.slug === slug);
}

export const comparisonSlugs = comparisons.map(c => c.slug);
