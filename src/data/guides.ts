export interface GuideData {
  title: string;
  description: string;
  category: string;
  lastUpdated: string;
  ctaText: string;
  ctaHref: string;
  authorKey: 'sarah' | 'marcus';
  keyTakeaways: string[];
  sections: { heading: string; content: string }[];
}

export const guidesDatabase: Record<string, GuideData> = {
  "first-time": {
    title: "First-Time Home Buyer Guide",
    description: "Navigate credit checks, down payments, debt-to-income limits, and post-closing liquidity requirements to buy your first home with absolute confidence.",
    category: "Home Buying",
    lastUpdated: "June 2026",
    ctaText: "Check What You Can Afford",
    ctaHref: "/house-affordability-calculator",
    authorKey: "sarah",
    keyTakeaways: [
      "Credit scores above 740 secure the premier interest rates and lower ongoing private mortgage insurance (PMI) premiums.",
      "Down payment programs allow conventional financing with as little as 3% down for first-time buyers.",
      "Lenders evaluate housing-only debt (front-end DTI) and total debt (back-end DTI) to limit borrowing capacity.",
      "Plan for 2% to 5% of purchase price in closing costs and reserve 2-6 months of PITI payments as cash buffer."
    ],
    sections: [
      {
        heading: "1. Credit Score Preparation & Underwriting Tier Limits",
        content: "Your credit score is the single most critical leverage point in your residential home buying journey. Underwriters review your credit profile to determine risk-based pricing offsets known as Loan-Level Price Adjustments (LLPAs). In conventional lending, credit scores are categorized in 20-point tiers, where a score of 740 or higher qualifies for premier rates. If your score is 680, you might pay an extra 1.0% to 1.5% in upfront loan fees or face a higher ongoing interest rate.\n\nTo prepare your credit profile, obtain reports from Equifax, Experian, and TransUnion at least six months before applying. Identify and dispute any reporting errors. Pay down credit card balances to keep revolving credit utilization below 10% on each card. Avoid closing old accounts or opening new lines of credit during this period, as hard inquiries temporarily depress credit scoring algorithms."
      },
      {
        heading: "2. Down Payment Realities & Low-Equity Programs",
        content: "A common mortgage myth is that buyers must put down 20% to purchase a home. While a 20% down payment eliminates the requirement for Private Mortgage Insurance (PMI) on conventional loans, it is not a requirement for homeownership. Conventional programs, including Fannie Mae HomeReady and Freddie Mac Home Possible, allow qualifying first-time buyers to purchase a primary residence with as little as 3% down.\n\nGovernment-backed loans offer additional low-down-payment paths. FHA loans require 3.5% down for borrowers with credit scores of 580 or higher, while VA loans (for military service members and veterans) and USDA loans (for designated rural properties) offer 0% down options. Keep in mind that a lower down payment increases your principal balance, resulting in higher monthly carrying costs and additional mortgage insurance premiums."
      },
      {
        heading: "3. Understanding Front-End and Back-End Debt-to-Income (DTI) Limits",
        content: "Lenders evaluate your borrowing capacity using two Debt-to-Income (DTI) ratios. The front-end DTI ratio, or housing ratio, measures your total projected monthly housing expense (including Principal, Interest, Property Taxes, Hazard Insurance, and HOA fees) against your gross monthly income. Lenders generally prefer a front-end DTI of 28% or lower.\n\nThe back-end DTI ratio measures your housing expenses plus all monthly recurring obligations found on your credit report, such as student loans, auto loans, credit card minimums, and child support. The standard back-end limit for conventional loans is 36%, though automated underwriting systems can approve up to 45% or even 50% for borrowers with strong compensating factors, such as high credit scores or significant cash reserves."
      },
      {
        heading: "4. Budgeting for Closing Costs & Out-of-Pocket Expenses",
        content: "The purchase price and down payment represent only a portion of the cash required to close a transaction. Buyers must budget for closing costs, which typically range from 2% to 5% of the total loan amount. These fees cover lender origination charges, underwriter reviews, home appraisals, structural surveys, title searches, title insurance policies, and county recording taxes.\n\nAdditionally, lenders require buyers to establish an escrow account at closing. This requires prepaying several months of property taxes and homeowners insurance upfront to build a safety buffer. Before signing your final documents, carefully review your Closing Disclosure (CD) and compare it line-by-line with the Loan Estimate (LE) provided at application to verify that fees have not increased beyond legal tolerance limits."
      },
      {
        heading: "5. Planning Post-Closing Liquidity & Cash Reserves",
        content: "Underwriters do not want you to spend your last dollar on the down payment and closing costs. To guard against employment disruption or immediate home repair needs, lenders verify your post-closing reserves. Reserves are measured in months of housing payments (Principal, Interest, Taxes, and Insurance, or PITI).\n\nWhile some conforming conventional loans require only one or two months of reserves, many guidelines prefer three to six months of liquid reserves. Eligible assets include checking accounts, savings accounts, certificates of deposit (CDs), and vested balances in retirement accounts (though retirement accounts may face a valuation discount to account for early withdrawal penalties)."
      }
    ]
  },
  "pmi-removal": {
    title: "Private Mortgage Insurance (PMI) Removal Guide",
    description: "Learn the rules, legal guidelines, and practical actions to cancel private mortgage insurance on conventional loans early to save hundreds monthly.",
    category: "Escrow",
    lastUpdated: "June 2026",
    ctaText: "Calculate Your PMI Cancellation Date",
    ctaHref: "/mortgage-calculator-with-pmi",
    authorKey: "sarah",
    keyTakeaways: [
      "Federal law mandates automatic PMI termination at 78% LTV based on the original amortization schedule.",
      "Homeowners can request manual PMI cancellation once their outstanding principal balance drops to 80% LTV.",
      "Significant home appreciation can justify early PMI removal via a lender-ordered appraisal.",
      "FHA loans charge MIP, which generally cannot be removed without refinancing into a conventional mortgage."
    ],
    sections: [
      {
        heading: "1. The Homeowners Protection Act of 1998 (HPA) Guidelines",
        content: "The Homeowners Protection Act of 1998 (HPA) establishes strict federal guidelines regarding when private mortgage insurance (PMI) must be cancelled on conventional loans. Under the HPA, lenders must automatically terminate monthly PMI once your loan balance is scheduled to reach 78% of the original purchase value of the home, provided your payments are current and you have no history of delinquency.\n\nCrucially, this automatic termination date is calculated using the original amortization schedule. If you make extra principal payments to accelerate your payoff, the automatic system will not adjust its date. You must proactively monitor your balance and request manual cancellation once you hit the corresponding loan-to-value threshold."
      },
      {
        heading: "2. Requesting Manual PMI Cancellation at 80% LTV",
        content: "You do not have to wait for the automatic 78% threshold. Once your outstanding principal balance falls below 80% of the original home price, you have the legal right to submit a written request to your loan servicer requesting PMI cancellation.\n\nTo qualify for manual cancellation at 80% LTV, you must meet several requirements: you must have a clean payment history (no payments 30 days late within the past 12 months, and no payments 60 days late within the past 24 months), have no secondary mortgages or liens on the property, and provide evidence (often via a basic valuation) that the home's value has not decreased below its original purchase price."
      },
      {
        heading: "3. Utilizing Home Appreciation to Remove PMI Early",
        content: "If property values in your local market have appreciated significantly, your current loan-to-value (LTV) ratio might be well below 80%, even if you have not made extra payments. Under conventional guidelines, you can request PMI cancellation based on current market value rather than original purchase price.\n\nTo cancel PMI based on current value, you must contact your servicer and request a lender-approved appraisal (do not order a private appraisal independently, as lenders will only accept valuations from their approved panel). If you have owned the home for two to five years, your LTV must be 75% or lower. If you have owned the home for more than five years, an LTV of 80% or lower qualifies for cancellation."
      },
      {
        heading: "4. Refinancing to Eliminate PMI and Optimize Terms",
        content: "For homeowners with FHA loans, the rules are different. FHA mortgage insurance (known as MIP) is structured differently: if you put down less than 10% on an FHA loan, the monthly MIP charges remain for the entire life of the loan. The only way to eliminate FHA mortgage insurance is to refinance the loan into a conventional mortgage.\n\nIf you have built at least 20% equity in your home (either through principal reduction or appreciation), you can refinance into a conventional loan with zero PMI. Use our refinance break-even calculator to compare the closing costs of the new loan against your monthly mortgage insurance savings to confirm that refinancing is financially viable."
      }
    ]
  },
  "fha-vs-conv": {
    title: "FHA vs Conventional Loans: Comparative Guide",
    description: "Compare underwriting guidelines, down payment requirements, and mortgage insurance structures to pick the right home loan program.",
    category: "Loan Comparison",
    lastUpdated: "June 2026",
    ctaText: "Model Principal Amortization",
    ctaHref: "/mortgage-payoff-calculator",
    authorKey: "marcus",
    keyTakeaways: [
      "FHA loans allow credit scores down to 580 with 3.5% down, making them accessible to credit-challenged buyers.",
      "Conventional loans require a minimum score of 620 and allow down payments as low as 3% for first-time buyers.",
      "Conventional PMI is cancelable at 80% LTV; FHA MIP usually lasts for the entire duration of the loan.",
      "FHA appraisals enforce strict safety, security, and habitability standards on the property."
    ],
    sections: [
      {
        heading: "1. Qualification Guidelines & Credit Score Flexibility",
        content: "FHA loans, insured by the Federal Housing Administration, are designed to assist buyers with lower credit scores or smaller cash reserves. FHA guidelines allow down payments of just 3.5% for borrowers with credit scores of 580 or higher. Borrowers with scores between 500 and 579 can still qualify by putting down 10%.\n\nConventional loans, which are not insured by the federal government, have stricter credit requirements. Borrowers generally need a minimum credit score of 620 to qualify. Furthermore, conventional interest rates and PMI premiums are highly sensitive to credit tiers; a lower score will result in significantly higher monthly payment quotes."
      },
      {
        heading: "2. Mortgage Insurance Structures: Cancelable PMI vs. Lifetime MIP",
        content: "The structural difference in mortgage insurance is often the deciding factor between these two loan types. Conventional loans require Private Mortgage Insurance (PMI) only if the down payment is under 20%. Crucially, conventional PMI is cancelable: it can be removed once you build 20% equity, either through principal payments or home appreciation.\n\nFHA loans require both an Upfront Mortgage Insurance Premium (UFMIP) of 1.75% of the loan amount (which can be rolled into the loan balance) and an ongoing monthly Mortgage Insurance Premium (MIP). If you put down less than 10% at purchase, FHA MIP cannot be cancelled and remains active for the entire duration of the loan, requiring a future refinance to eliminate."
      },
      {
        heading: "3. Property Condition Standards & Appraisal Guidelines",
        content: "Appraisal guidelines differ between FHA and conventional loans. A conventional appraisal focuses primarily on property valuation to protect the lender's collateral interest. While the appraiser notes major structural defects, they do not perform a detailed safety inspection.\n\nAn FHA appraisal is far more stringent. The appraiser must verify that the property meets HUD's minimum property standards for safety, security, and soundness. Issues like peeling paint (in homes built before 1978), missing handrails on stairways, exposed wiring, non-functional heating systems, or crawlspace moisture must be repaired by the seller before the loan can close."
      },
      {
        heading: "4. Maximum Loan Limits & Regional Variations",
        content: "Both FHA and conventional loans are subject to maximum limits that dictate how much you can borrow. Conventional loan limits are adjusted annually by the FHFA based on national average home price changes. High-cost counties have elevated limits to account for local market appreciation.\n\nFHA loan limits are set independently and are typically pegged at 65% of the national conforming limit. While FHA limits are lower in most counties, they are adjusted upward in high-cost metro areas. If your purchase price exceeds FHA limits, you must secure conventional financing or qualify for a jumbo loan program."
      }
    ]
  },
  "closing-costs": {
    title: "Mortgage Closing Costs Explained",
    description: "Analyze lender fees, title searches, county transfer taxes, and escrow reserves to estimate your cash-to-close requirements.",
    category: "Home Buying",
    lastUpdated: "June 2026",
    ctaText: "Analyze Refinance Savings",
    ctaHref: "/refinance-calculator",
    authorKey: "marcus",
    keyTakeaways: [
      "Closing costs typically average between 2% and 5% of the total loan amount.",
      "Lenders are legally required to provide a Loan Estimate (LE) within three days of application.",
      "Seller concessions can help cover buyer closing costs, subject to strict loan program limits.",
      "Compare the final Closing Disclosure (CD) line-by-line with your LE to verify fee compliance."
    ],
    sections: [
      {
        heading: "1. What are Closing Costs?",
        content: "Closing costs represent the collection of administrative, legal, and operational fees paid at the finalization of a real estate transaction. These costs are paid by both buyers and sellers, though buyers typically bear the majority of the financing fees. Closing costs range from 2% to 5% of the total loan amount.\n\nLenders are required by federal law (under the TRID rule) to provide a Loan Estimate (LE) within three days of receiving your mortgage application. This document outlines your projected closing costs, allowing you to prepare the necessary cash and compare fees across different lending institutions."
      },
      {
        heading: "2. Breakdown of Common Lender and Third-Party Fees",
        content: "Closing costs are divided into several key categories:\n\nLender fees cover the bank's administrative processing, including underwriting fees, document preparation fees, credit report fees, and discount points purchased to lower the interest rate.\n\nThird-party fees cover services ordered by the lender to verify property details. These include home appraisals, boundary surveys, flood determinations, tax monitoring, and title services. Title fees cover the title search (verifying ownership history) and title insurance policies protecting both the lender and buyer against future ownership disputes."
      },
      {
        heading: "3. Government Taxes & Municipal Recording Charges",
        content: "State and local governments levy fees to legally record the transfer of property ownership and the creation of the new mortgage lien. These charges include recording fees, deed transfer taxes, and mortgage stamps.\n\nTransfer taxes vary significantly depending on your location. Some municipalities charge a flat recording fee, while others charge a percentage of the home's purchase price, which can add thousands of dollars to your cash-to-close requirement."
      },
      {
        heading: "4. Escrow Account Setup & Prepaid Reserves",
        content: "At closing, lenders require you to establish an escrow account. This process involves prepaying a portion of your upcoming recurring property expenses so the servicer has a safety buffer to pay tax and insurance bills on time.\n\nTypically, you must prepay a full year of homeowners insurance premiums upfront, plus two to three months of property taxes as an escrow cushion. These funds belong to you but are held in a neutral account, and they represent a significant portion of your upfront cash-to-close."
      },
      {
        heading: "5. Negotiating Seller Concessions and Lender Credits",
        content: "If you are short on cash, you can negotiate with the seller to pay a portion of your closing costs, known as a seller concession. Seller concessions are capped by loan guidelines: conventional loans limit concessions to 3%, 6%, or 9% depending on your down payment size, while FHA and VA loans cap concessions at 6%.\n\nAlternatively, you can request a lender credit. The lender covers a portion of your closing fees upfront in exchange for charging a slightly higher ongoing interest rate. While this reduces your immediate cash requirement, it increases your monthly carrying costs over the life of the loan."
      }
    ]
  },
  "state-rates": {
    title: "Average Mortgage Rates by State",
    description: "Analyze how regional property taxes, hazard insurance premiums, and local market competition impact interest rates.",
    category: "Research & Data",
    lastUpdated: "June 2026",
    ctaText: "Launch Regional Mortgage Calculator",
    ctaHref: "/texas-mortgage-calculator",
    authorKey: "marcus",
    keyTakeaways: [
      "Baseline interest rates track national bond markets, but regional variables shift actual lender pricing.",
      "States with long foreclosure timelines often carry higher rate premiums due to increased lender risk.",
      "High property taxes and insurance premiums affect overall housing affordability and DTI limits.",
      "Review state-specific housing authorities (HFAs) for down payment assistance programs."
    ],
    sections: [
      {
        heading: "1. Why Mortgage Rates Differ Regionally",
        content: "While baseline mortgage interest rates track national bond markets—specifically the yield on the 10-Year U.S. Treasury Bond—actual mortgage rates differ by state. Lenders adjust their pricing grids based on regional risk factors, localized marketing competition, and state-specific regulations.\n\nForeclosure laws are a major driver of state-level rate variations. In states with judicial foreclosure rules (like New York or New Jersey), reclaiming a property after default can take years, increasing lender holding costs. In states with non-judicial foreclosure rules (like Texas or California), the process is much faster, allowing lenders to charge lower risk premiums."
      },
      {
        heading: "2. The Impact of Regional Property Taxes and Insurance Rates",
        content: "Your total monthly payment is heavily influenced by state property taxes and hazard insurance premiums, which are collected in escrow. For example, Texas averages a high property tax rate of 1.60%, and New Jersey exceeds 2.20%, causing monthly payments to be significantly higher than in states like Hawaii or Alabama, which charge under 0.40%.\n\nInsurance premiums also vary by geographic risk. Coastal states like Florida, Louisiana, and Texas carry high hurricane risk, resulting in median homeowners insurance premiums that are triple the national average, requiring larger escrow buffers at closing."
      },
      {
        heading: "3. State-Specific Conforming Loan Limits & Adjustments",
        content: "The Federal Housing Finance Agency (FHFA) sets conforming loan limits annually, establishing the maximum size of a mortgage that Fannie Mae and Freddie Mac can purchase. While standard county limits apply to most of the country, high-cost metropolitan areas feature elevated limits.\n\nFor example, counties in high-cost states like California, Hawaii, and New York have conforming limits that exceed standard baselines. This adjustment allows buyers in those areas to secure lower conforming mortgage rates instead of having to qualify for high-cost jumbo financing."
      },
      {
        heading: "4. Shopping Local Lenders vs. National Mortgage Brokers",
        content: "When shopping for a mortgage, compare rates from regional credit unions, local banks, and national online brokers. Local credit unions often offer competitive rates for properties in their immediate service area, as they have deep familiarity with regional tax structures and property values.\n\nAdditionally, most states operate Housing Finance Agencies (HFAs) that offer specialized programs for first-time buyers. These programs provide below-market interest rates, mortgage tax credits, and down payment assistance loans that can significantly lower your borrowing costs."
      }
    ]
  },
  "mortgage-rates": {
    title: "Mortgage Rates Guide: Primary Market Drivers",
    description: "Analyze the macroeconomic variables, Treasury yields, and credit spreads that dictate interest rates.",
    category: "Research & Data",
    lastUpdated: "June 2026",
    ctaText: "Check Extra Payment Acceleration",
    ctaHref: "/extra-payment-calculator",
    authorKey: "marcus",
    keyTakeaways: [
      "Mortgage rates track the 10-Year U.S. Treasury Bond yield, not the Federal Funds Rate directly.",
      "Inflation is the primary enemy of fixed-income investors, pushing bond yields and mortgage rates up.",
      "Lenders adjust pricing based on credit scores, loan-to-value ratios, and loan programs.",
      "Rate lock agreements protect buyers from interest rate volatility during underwriting."
    ],
    sections: [
      {
        heading: "1. Macroeconomic Drivers: Treasury Yields and Inflation Expectations",
        content: "A common misconception is that the Federal Reserve directly sets mortgage interest rates. While the Fed's monetary policy decisions influence short-term lending rates, long-term mortgage rates track the yield on the 10-Year U.S. Treasury Bond.\n\nInflation is the primary driver of Treasury yields. Because mortgages are fixed-income investments, inflation erodes the purchasing power of the future cash flows. When inflation expectations rise, investors demand higher bond yields to protect their returns, which pushes mortgage rates up. Conversely, during economic downturns, investors seek safety in bonds, driving yields and mortgage rates down."
      },
      {
        heading: "2. Conforming vs. Jumbo Loan Pricing Spreads",
        content: "Mortgage rates differ depending on whether the loan is conforming or non-conforming. Conforming loans fit within FHFA limits and Fannie Mae/Freddie Mac guidelines, meaning they can be easily packaged into Mortgage-Backed Securities (MBS) and sold to investors.\n\nJumbo loans exceed conforming limits and must be held on a bank's balance sheet or securitized privately. Because jumbo loans are less liquid and carry higher default risk, they typically command an interest rate premium, though market liquidity conditions can occasionally compress or reverse this spread."
      },
      {
        heading: "3. How Credit Tiers Shift Interest Costs",
        content: "Lenders quote interest rates based on your individual risk profile. Under the FICO scoring model, lenders evaluate your credit history and apply Loan-Level Price Adjustments (LLPAs) based on your score and loan-to-value (LTV) ratio.\n\nA borrower with a credit score of 760 and 20% down payment will secure the lowest available interest rate. A borrower with a 660 credit score and 5% down payment will face significant LLPA surcharges, resulting in a higher interest rate and higher monthly payments over the life of the loan."
      },
      {
        heading: "4. Rate Locks and Float-Down Agreements",
        content: "Because mortgage rates fluctuate daily based on bond market movements, secure a rate lock agreement once your purchase contract is signed. A rate lock guarantees your quoted rate and point structure for a set period (usually 30 to 60 days) during underwriting.\n\nIf you believe interest rates will fall before your closing date, ask your lender about a float-down option. A float-down agreement allows you to capture a lower interest rate if market rates drop during your lock window, giving you protection against rate hikes while retaining downside opportunity."
      }
    ]
  },
  "conforming-loans": {
    title: "Conforming Loan Limits & Regulations",
    description: "Learn what conforming loans are, FHFA guidelines, and current lending limits to qualify for conventional financing.",
    category: "Loan Programs",
    lastUpdated: "June 2026",
    ctaText: "Calculate Affordability Limits",
    ctaHref: "/house-affordability-calculator",
    authorKey: "marcus",
    keyTakeaways: [
      "Conforming loans meet maximum financing limits set annually by the FHFA.",
      "Conventional conforming loans must follow strict Fannie Mae and Freddie Mac guidelines.",
      "Conforming loans offer lower interest rates and smaller down payment requirements.",
      "Borrowers generally need a 620 credit score and DTI ratios below 36-45% to qualify."
    ],
    sections: [
      {
        heading: "1. What is a Conforming Loan?",
        content: "A conforming loan is a conventional residential mortgage that meets the underwriting guidelines and maximum funding limits set by the Federal Housing Finance Agency (FHFA). These guidelines are designed to standardize mortgages so they can be purchased by Fannie Mae and Freddie Mac.\n\nBy purchasing loans from lenders, Fannie Mae and Freddie Mac inject liquidity into the mortgage market, allowing banks to fund new loans. Because of this liquidity and government backing, conforming loans carry lower interest rates and more flexible terms than non-conforming or jumbo loans."
      },
      {
        heading: "2. FHFA Conforming Limits & Calculations",
        content: "The FHFA adjusts conforming loan limits annually to reflect changes in national average home prices. The standard baseline limit applies to most counties in the United States. In high-cost areas, the limit is adjusted upward to reflect local home values.\n\nWhen purchasing a multi-unit property (such as a duplex, triplex, or fourplex), conforming limits are significantly higher. This allows buyers to finance multi-family properties using standard conforming conventional loans, provided they meet the occupancy guidelines."
      },
      {
        heading: "3. Underwriting Standards: Credit and Debt Ratios",
        content: "To qualify for a conforming conventional loan, borrowers must meet standard underwriting criteria. Lenders require a minimum credit score of 620, though higher scores secure lower interest rates and reduced PMI premiums.\n\nLenders also evaluate your Debt-to-Income (DTI) ratio. While conventional guidelines prefer a back-end DTI of 36% or lower, automated underwriting systems (like Fannie Mae's Desktop Underwriter) can approve DTIs up to 45% or 50% for borrowers with strong credit scores, stable income, or substantial financial reserves."
      },
      {
        heading: "4. Reserve Requirements and Down Payment Options",
        content: "Conforming loans offer flexible down payment options. First-time buyers can put down as little as 3% using specialized programs. For standard conventional purchases, a down payment of 5% is common.\n\nAdditionally, lenders review your post-closing cash reserves to ensure you can handle unexpected expenses. While some transactions require zero reserves after closing, conforming guidelines often require two to six months of PITI payments, depending on your credit score, LTI ratio, and loan program."
      }
    ]
  },
  "jumbo-loans": {
    title: "What is a Jumbo Loan & How to Qualify",
    description: "Understand the requirements, interest rates, and guidelines for high-value mortgages that exceed conforming limits.",
    category: "Loan Programs",
    lastUpdated: "June 2026",
    ctaText: "Estimate Monthly Payment",
    ctaHref: "/mortgage-payoff-calculator",
    authorKey: "marcus",
    keyTakeaways: [
      "Jumbo loans exceed conforming loan limits set by the FHFA, carrying higher risk for lenders.",
      "Qualification requires high credit scores, low DTI ratios, and substantial cash reserves.",
      "Jumbo rates can fluctuate independently of conventional conforming mortgage rates.",
      "Property appraisals are highly rigorous, often requiring two independent valuations."
    ],
    sections: [
      {
        heading: "1. Defining the Jumbo Mortgage Threshold",
        content: "A jumbo loan is a non-conforming conventional mortgage that exceeds the maximum conforming loan limits set by the FHFA. Because jumbo loans are too large to be purchased by Fannie Mae or Freddie Mac, lenders cannot easily resell them on the secondary market.\n\nThis lack of liquidity means lenders must hold jumbo loans on their own balance sheets or package them into private-label securitizations. Consequently, jumbo loans carry higher risk, and lenders enforce strict underwriting guidelines to protect their capital."
      },
      {
        heading: "2. Underwriting Criteria: Credit, Assets, and Debt Ratios",
        content: "Qualifying for a jumbo loan requires a strong financial profile. Lenders typically require a minimum credit score of 700 to 720, though some programs require 740 or higher. Debt-to-income (DTI) ratios are capped strictly at 38% to 43%.\n\nFurthermore, borrowers must show substantial post-closing cash reserves. While conforming loans require minimal reserves, jumbo lenders often require 6 to 12 months of PITI payments in liquid accounts, ensuring you can cover your mortgage during income disruptions."
      },
      {
        heading: "3. Appraisal Rigor and Double Appraisals",
        content: "Because jumbo loans involve high-value properties, lenders are highly sensitive to collateral valuation. The appraisal process is rigorous, and appraisers must verify that the property value is supported by comparable sales.\n\nFor very large jumbo loans (typically those exceeding $1 million or $1.5 million), lenders often require two independent appraisals from different valuation firms. If the two appraisals disagree, the lender will use the lower of the two values to calculate the loan-to-value (LTV) ratio."
      },
      {
        heading: "4. Jumbo Interest Rates and Market Liquidity",
        content: "Jumbo loan interest rates fluctuate independently of conforming rates. Historically, jumbo rates carried an interest rate premium to compensate lenders for holding non-conforming debt.\n\nHowever, during periods of high market liquidity, jumbo rates can compress and run lower than conforming rates. This inversion occurs when commercial banks are eager to attract affluent clients who will bring deposit accounts and wealth management business to the institution."
      }
    ]
  },
  "loan-amortization": {
    title: "How Loan Amortization Schedules Work",
    description: "Demystify principal and interest payments, amortization curves, and equity growth to optimize your payoff timeline.",
    category: "Mortgage Math",
    lastUpdated: "June 2026",
    ctaText: "View Your Amortization Table",
    ctaHref: "/mortgage-payoff-calculator",
    authorKey: "sarah",
    keyTakeaways: [
      "Amortization spreads out loan payments so you pay off the balance in equal monthly installments.",
      "Early payments are dominated by interest; principal reduction accelerates later in the term.",
      "15-year fixed loans offer faster amortization and up to 60% savings in total interest costs.",
      "Use amortization schedules to identify the exact month your PMI drops or when equity is established."
    ],
    sections: [
      {
        heading: "1. The Mechanics of Loan Amortization",
        content: "Amortization is the process of spreading out a loan into equal monthly payments over a set duration. Each payment is divided into two components: principal (which pays down the borrowed balance) and interest (the cost of borrowing).\n\nLenders calculate payments using the amortization formula, ensuring that the loan balance declines to exactly zero at the end of the term. While your total monthly payment remains constant, the allocation between principal and interest shifts with every payment."
      },
      {
        heading: "2. Frontloaded Interest Dynamics on a 30-Year Loan",
        content: "During the first decade of a 30-year fixed mortgage, interest charges consume the vast majority of your monthly payment. This is because interest is calculated monthly based on your outstanding principal balance.\n\nIn year one, your balance is at its highest, resulting in maximum interest charges. As you pay down the balance, the interest charge declines, allowing a larger portion of your payment to target the principal, causing equity to build slowly at first and accelerate later."
      },
      {
        heading: "3. 15-Year vs. 30-Year Amortization Comparison",
        content: "Choosing between a 15-year and a 30-year term changes your amortization curve. A 15-year fixed-rate mortgage has higher monthly payments, but it features a much steeper principal paydown curve.\n\nBecause you pay off the principal twice as fast and secure a lower interest rate, a 15-year loan dramatically reduces your cumulative interest costs. A 15-year term can save you up to 60% in total interest compared to a 30-year loan of the same size."
      },
      {
        heading: "4. Utilizing Amortization Schedules for Financial Planning",
        content: "An amortization schedule is a month-by-month table showing your payment allocations and remaining balance. It is a powerful tool for planning milestones, such as tracking when your LTV will drop to 80% to remove PMI.\n\nBy modeling extra principal payments on your amortization schedule, you can see how minor prepayments shorten your loan term and reduce your lifetime interest charges, helping you make informed debt management decisions."
      }
    ]
  },
  "mortgage-points": {
    title: "Buying Down Your Interest Rate with Points",
    description: "Evaluate whether paying upfront discount points makes sense for your homeownership horizon and financial goals.",
    category: "Mortgage Math",
    lastUpdated: "June 2026",
    ctaText: "Check Refinance Savings",
    ctaHref: "/refinance-calculator",
    authorKey: "sarah",
    keyTakeaways: [
      "Discount points represent prepaid interest purchased at closing to permanently lower your rate.",
      "One point costs 1% of the loan amount and typically reduces the interest rate by 0.25%.",
      "Calculate the break-even period by dividing the upfront point cost by the monthly savings.",
      "Buying points is most cost-effective if you plan to stay in the home past the break-even date."
    ],
    sections: [
      {
        heading: "1. What are Discount Points and Lender Credits?",
        content: "Discount points, often referred to simply as points, are prepaid interest that you can purchase from your lender at closing. In exchange for paying this interest upfront, the lender permanently lowers your mortgage interest rate.\n\nOne point costs exactly 1% of the total mortgage amount. Lenders also offer lender credits, which function in reverse: the lender pays a portion of your closing costs upfront in exchange for charging a higher ongoing interest rate."
      },
      {
        heading: "2. Calculating the Point Buy-Down Break-Even Month",
        content: "To determine if buying points is a sound financial decision, calculate your break-even month. Divide the upfront cost of the points by the monthly payment savings generated by the lower interest rate.\n\nIf purchasing one point costs $3,000 and reduces your monthly payment by $50, your break-even period is 60 months. If you sell the home or refinance the mortgage before month 60, you will lose money on the points."
      },
      {
        heading: "3. Homeownership Horizon and Opportunity Cost",
        content: "Your planned homeownership horizon is the most critical variable when deciding to purchase points. If you plan to live in the home for 10 or 20 years, buying points will yield significant long-term interest savings.\n\nHowever, consider the opportunity cost. If paying for points depletes your cash reserves, leaving you with minimal post-closing liquidity, it is wiser to keep the cash. Compare the rate of return from buying points against low-risk investment options."
      },
      {
        heading: "4. Tax Deductibility of Discount Points",
        content: "Under IRS guidelines, discount points paid on a primary home purchase are generally tax-deductible as mortgage interest in the tax year they are paid, provided they meet standard criteria.\n\nIf you are refinancing, points must be deducted over the life of the loan rather than all at once. Because tax regulations are complex, consult a qualified Certified Public Accountant (CPA) to confirm your eligibility for mortgage point deductions."
      }
    ]
  },
  "property-taxes-escrow": {
    title: "How Property Taxes & Escrow Accounts Function",
    description: "Understand the roles of tax assessments, hazard insurance prepaids, and monthly escrow statements.",
    category: "Escrow",
    lastUpdated: "June 2026",
    ctaText: "Add Escrow Parameters",
    ctaHref: "/house-affordability-calculator",
    authorKey: "sarah",
    keyTakeaways: [
      "Escrow accounts collect monthly tax and insurance allocations to pay bills on your behalf.",
      "Property taxes are levied by county governments based on assessed market value.",
      "Lenders require an escrow cushion of up to two months of payments to cover cost increases.",
      "Annual escrow analyses can result in payment changes due to tax and insurance adjustments."
    ],
    sections: [
      {
        heading: "1. The Purpose of a Mortgage Escrow Account",
        content: "An escrow account is a neutral holding account managed by your mortgage servicer to pay property taxes and homeowners insurance bills. Lenders require escrow accounts to protect their collateral from tax foreclosure and hazard loss.\n\nInstead of paying property tax and insurance bills once or twice a year, you pay 1/12th of the estimated annual costs inside your monthly mortgage check. The servicer holds these funds in escrow and pays the bills when they fall due."
      },
      {
        heading: "2. How Property Taxes are Assessed & Levied",
        content: "Property taxes are levied by county and municipal governments to fund local services, schools, and infrastructure. Taxes are calculated by multiplying the property's assessed value by the local millage rate.\n\nAssessed value is determined by a county tax assessor and is often lower than fair market value. However, assessed values can change annually. If your home's assessed value rises, your property tax bill will increase, raising your escrow requirements."
      },
      {
        heading: "3. Escrow Cushions & Reserves at Closing",
        content: "To protect against tax or insurance premium increases, federal law (under RESPA guidelines) allows lenders to collect and maintain an escrow cushion. The cushion can be up to two months of tax and insurance payments.\n\nAt closing, you must fund this cushion upfront. This requirement can add thousands of dollars to your closing costs, but it ensures that your escrow account does not fall into a negative balance if property expenses increase."
      },
      {
        heading: "4. Managing Escrow Shortages and Overages",
        content: "Your servicer performs an annual escrow analysis to compare projected tax and insurance costs against your actual bills. If property taxes or insurance premiums rise, you will face an escrow shortage.\n\nTo resolve a shortage, you can pay the difference as a lump sum or allow the servicer to spread the shortage over the next 12 months, which will increase your ongoing monthly mortgage payment. If taxes decrease, you will receive an escrow overage check."
      }
    ]
  },
  "dti-ratio-explained": {
    title: "Understanding Front-End and Back-End DTI Ratios",
    description: "Master the DTI guidelines lenders use to assess your borrowing limit and qualify for the best home loan programs.",
    category: "Debt Management",
    lastUpdated: "June 2026",
    ctaText: "Stress-Test Your DTI",
    ctaHref: "/house-affordability-calculator",
    authorKey: "sarah",
    keyTakeaways: [
      "DTI is the percentage of gross monthly income consumed by recurring debt payments.",
      "Front-end DTI measures housing-only expenses (PITI + HOA); conventional preferred limit is 28%.",
      "Back-end DTI measures housing plus all debts on your credit report; conventional preferred limit is 36%.",
      "Pay down revolving debts to lower your back-end DTI and increase your home buying budget."
    ],
    sections: [
      {
        heading: "1. What is the Debt-to-Income (DTI) Ratio?",
        content: "The Debt-to-Income (DTI) ratio is a primary underwriting metric used by mortgage lenders to assess your risk profile. DTI is the percentage of your gross monthly income (before taxes) consumed by recurring debt payments.\n\nLenders use DTI to ensure that you have sufficient income to cover your mortgage payments and daily living expenses. A low DTI ratio indicates a balanced debt load, making you a more attractive borrower."
      },
      {
        heading: "2. Front-End DTI: Housing Costs Only",
        content: "The front-end DTI ratio, also known as the housing ratio, measures your projected monthly housing expenses against your gross monthly income. Housing expenses include PITI and HOA fees.\n\nConventional loan guidelines prefer a front-end DTI of 28% or lower. If you earn $8,000 gross monthly, a 28% front-end DTI limits your total housing expense to $2,240. If your housing costs exceed this, you may need a larger down payment."
      },
      {
        heading: "3. Back-End DTI: Total Debt Obligations",
        content: "The back-end DTI ratio is a comprehensive metric that includes your monthly housing expenses plus all recurring debt obligations found on your credit report. These debts include credit card minimums, student loans, auto loans, and child support.\n\nConventional underwriting guidelines prefer a back-end DTI of 36% or lower. However, automated underwriting systems can approve back-end DTIs up to 45% or 50% for borrowers with strong credit scores, stable income, or substantial financial reserves."
      },
      {
        heading: "4. Strategies to Optimize Your DTI Ratios",
        content: "If your DTI ratios exceed underwriting limits, take steps to optimize them before applying. The most effective strategy is to pay down revolving credit card balances, which lowers your monthly minimum payments.\n\nAvoid taking out new loans, leasing cars, or opening new credit cards prior to application. If you have installment loans (like student or car loans) with fewer than 10 payments remaining, underwriters may exclude them from your DTI calculation."
      }
    ]
  },
  "biweekly-payments": {
    title: "Bi-Weekly Payments: Shave Years Off Your Mortgage",
    description: "Learn how restructuring your payment frequency bypasses compounding interest and shortens your mortgage term.",
    category: "Prepayments",
    lastUpdated: "June 2026",
    ctaText: "Check Extra Payment Acceleration",
    ctaHref: "/extra-payment-calculator",
    authorKey: "sarah",
    keyTakeaways: [
      "Paying half your monthly mortgage every two weeks results in 13 full payments annually.",
      "The extra payment applies directly to principal, bypassing interest and reducing the loan term.",
      "On a 30-year fixed mortgage, bi-weekly payments can shave 4 to 6 years off your term.",
      "Confirm with your servicer that they offer a free bi-weekly plan before enrolling."
    ],
    sections: [
      {
        heading: "1. The Mechanics of a Bi-Weekly Payment Plan",
        content: "A bi-weekly payment plan is an accelerated principal payoff strategy. Instead of making one monthly mortgage payment, you pay half of your standard monthly payment every two weeks.\n\nBecause there are 52 weeks in a year, you make 26 half-payments. This equates to 13 full monthly payments annually, meaning you make one extra monthly payment each year without adjusting your monthly budget."
      },
      {
        heading: "2. Shaving Years Off a 30-Year Mortgage Term",
        content: "By submitting one extra monthly payment directly to your principal balance each year, you alter the amortization schedule. Because principal declines faster, less interest accumulates over time.\n\nOn a standard $300,000, 30-year fixed mortgage at 6.0% interest, a bi-weekly payment schedule can shave 4 to 6 years off your term. This simple shift allows you to pay off your home faster and save substantial interest."
      },
      {
        heading: "3. Compound Interest Savings and Equity Acceleration",
        content: "The primary financial benefit of bi-weekly payments is compound interest savings. Because interest is calculated based on your remaining principal balance, reducing principal faster lowers all subsequent interest charges.\n\nThis compounding effect accelerates your home equity growth. Building equity faster is highly valuable if you plan to refinance, secure a home equity loan, or sell the property in the future."
      },
      {
        heading: "4. Setting up a Bi-Weekly Plan and Avoiding Fees",
        content: "Before enrolling in a bi-weekly plan, contact your mortgage servicer. Many servicers offer free, automated bi-weekly payment options. Ensure they apply the extra payments directly to your principal balance.\n\nAvoid third-party management companies that charge upfront or monthly fees to run a bi-weekly plan. These companies collect your money, hold it, and pay your servicer, pocketing fees for a process you can manage yourself for free."
      }
    ]
  },
  "lump-sum-prepayment": {
    title: "Making a Lump Sum Mortgage Prepayment",
    description: "Model the impact of a one-time principal paydown on your interest, term, and long-term equity growth.",
    category: "Prepayments",
    lastUpdated: "June 2026",
    ctaText: "Model Lump-Sum Payments",
    ctaHref: "/extra-payment-calculator",
    authorKey: "sarah",
    keyTakeaways: [
      "Lump-sum prepayments are applied directly to principal, bypassing interest calculations.",
      "Prepayments shorten your mortgage term but do not lower your subsequent monthly payments.",
      "To lower your monthly payment without refinancing, request a loan recast from your lender.",
      "Compare mortgage prepayment against investment returns to evaluate opportunity costs."
    ],
    sections: [
      {
        heading: "1. What is a Lump-Sum Mortgage Prepayment?",
        content: "A lump-sum mortgage prepayment is a single, one-time payment made directly to your loan principal, separate from your regular monthly P&I check. Prepayments bypass interest calculations.\n\nBy directing funds to your principal balance, you reduce the debt that interest is calculated on. This is highly effective early in your mortgage term when interest charges are at their highest."
      },
      {
        heading: "2. Shorter Terms vs. Lower Payments: The Recast Option",
        content: "A common misunderstanding is that prepaying principal will lower subsequent monthly payments. Standard prepayments shorten the remaining term of the loan but keep the monthly payment the same.\n\nTo lower your monthly payment, request a loan recast. The lender recalculates your monthly payments based on the remaining principal balance and original term. Recasting is cheaper than refinancing."
      },
      {
        heading: "3. Opportunity Costs and Investment Comparisons",
        content: "Before making a large lump-sum payment, evaluate the opportunity cost. Compare your mortgage interest rate against potential returns from low-risk investments or retirement savings.\n\nIf you have a 3.0% mortgage and can earn 5.0% in a high-yield savings account, it is financially wiser to save the cash. If your mortgage rate is 7.0%, prepaying principal provides a guaranteed tax-free return."
      },
      {
        heading: "4. Verification and principal-Only Directives",
        content: "When submitting a lump-sum payment, clearly designate the funds as a principal-only payment. Write 'Principal Only' on your check or select the principal-only option on your servicer's online portal.\n\nVerify your next mortgage statement to ensure the funds were applied correctly. Some servicers may accidentally apply prepayments toward future interest, which defeats the purpose of the strategy."
      }
    ]
  },
  "rate-lock-agreements": {
    title: "Rate Locks & Float-Down Agreements",
    description: "Protect your loan pricing against market interest rate volatility during mortgage underwriting and processing.",
    category: "Interest Rates",
    lastUpdated: "June 2026",
    ctaText: "Project Mortgage Payoff",
    ctaHref: "/mortgage-payoff-calculator",
    authorKey: "marcus",
    keyTakeaways: [
      "Rate locks guarantee your quoted rate and point structure for a set period (30-60 days).",
      "Locks protect buyers from interest rate volatility during loan processing and underwriting.",
      "Float-down agreements allow you to capture a lower rate if market rates fall before closing.",
      "Monitor lock expiration dates to avoid costly rate increases or extension fees."
    ],
    sections: [
      {
        heading: "1. What is a Mortgage Rate Lock?",
        content: "A mortgage rate lock is a lender's binding guarantee to hold a specific interest rate, APR, and discount point structure for a set duration (typically 30, 45, or 60 days) during loan processing.\n\nA rate lock protects you from market rate fluctuations while your loan goes through underwriting. If market interest rates climb during your lock window, your lender must honor the locked rate."
      },
      {
        heading: "2. The Risk of Rate Lock Expiration",
        content: "Rate locks are time-sensitive. If your lock expires before your loan closes due to processing delays, your interest rate will revert to current market pricing unless you pay a lock extension fee.\n\nTo avoid expiration, submit all requested underwriting documents (such as tax returns, bank statements, and pay stubs) to your lender immediately, and maintain regular communication with your loan officer."
      },
      {
        heading: "3. Float-Down Provisions and Pricing Adjustments",
        content: "If you lock your rate but market interest rates fall significantly before your closing date, ask your lender about a float-down option. A float-down agreement allows you to capture a lower rate.\n\nFloat-down agreements typically carry strict guidelines: market rates must drop by a set percentage (such as 0.25%), and the lender may charge a small fee to execute the adjustment."
      },
      {
        heading: "4. When to Lock Your Interest Rate",
        content: "Deciding when to lock your rate depends on market conditions and your risk tolerance. If interest rates are rising and you are comfortable with your quoted payment, lock the rate immediately.\n\nIf rates are falling or stable, you can float the rate. Floating means you wait to lock your rate closer to your closing date, though this strategy carries risk if market rates spike unexpectedly."
      }
    ]
  },
  "equity-and-refinance": {
    title: "Refinancing: Cash-Out vs. Rate-and-Term",
    description: "Compare refinance structures to lower interest costs, shorten loan terms, or extract home equity.",
    category: "Refinance",
    lastUpdated: "June 2026",
    ctaText: "Calculate Break-Even Month",
    ctaHref: "/refinance-calculator",
    authorKey: "sarah",
    keyTakeaways: [
      "Rate-and-term refinancing replaces your mortgage to lower interest rates or change term lengths.",
      "Cash-out refinancing replaces your loan with a larger balance, paying out the difference in cash.",
      "Lenders typically limit conventional cash-out refinances to 80% of the home's appraised value.",
      "Calculate your break-even period to ensure the monthly savings offset new closing fees."
    ],
    sections: [
      {
        heading: "1. Rate-and-Term Refinancing Mechanics",
        content: "A rate-and-term refinance replaces your existing mortgage with a new one to secure a lower interest rate, change the loan term length, or convert from an ARM to a fixed-rate note.\n\nThis is the most common refinance option. It is ideal when market interest rates have declined, allowing you to reduce your monthly payment and lower your total interest costs over the life of the loan."
      },
      {
        heading: "2. Cash-Out Refinancing and Equity Extraction",
        content: "A cash-out refinance replaces your current mortgage with a larger loan, allowing you to withdraw the equity difference in cash for debt consolidation or home improvements.\n\nLenders typically restrict conventional cash-out refinances to 80% of the home's current appraised market value. While this provides tax-free cash, it increases your principal debt and monthly payment."
      },
      {
        heading: "3. Calculating the Refinance Break-Even Period",
        content: "Because refinancing requires paying standard closing fees, calculate your break-even month. Divide the new loan's upfront closing costs by the monthly payment savings.\n\nIf refinancing costs $4,000 and saves you $150 per month, your break-even period is 27 months. If you plan to sell the home or refinance again before month 27, you will lose money."
      },
      {
        heading: "4. Refinancing Guidelines and Qualification Requirements",
        content: "Qualifying for a refinance requires meeting standards similar to a purchase loan. Lenders evaluate your credit score, debt-to-income (DTI) ratio, employment stability, and property value.\n\nAdditionally, lenders require a new property appraisal to verify the home's value. If property values have declined, your LTV ratio will rise, which can trigger PMI or prevent approval."
      }
    ]
  },
  "refinance-closing-costs": {
    title: "Understanding Refinance Closing Costs",
    description: "Understand the fees, appraisal costs, and reserves required to refinance your mortgage.",
    category: "Refinance",
    lastUpdated: "June 2026",
    ctaText: "Verify Refinance Viability",
    ctaHref: "/refinance-calculator",
    authorKey: "sarah",
    keyTakeaways: [
      "Refinancing requires paying standard closing fees, typically 2% to 5% of the loan balance.",
      "Borrowers can roll closing costs into the new loan principal, increasing total debt.",
      "Lenders offer 'no-cost' refinancing by charging a higher ongoing interest rate.",
      "Compare the Loan Estimate (LE) from multiple lenders to find the lowest fees."
    ],
    sections: [
      {
        heading: "1. The Portfolio of Refinance Closing Fees",
        content: "Refinancing a mortgage requires processing fees similar to a purchase, including lender origination fees, appraisal costs, credit report fees, and title insurance premiums.\n\nThese fees typically range from 2% to 5% of the new loan balance. Understanding these costs is essential for calculating your true net savings and break-even period."
      },
      {
        heading: "2. Rolling Closing Costs into the Loan Principal",
        content: "If you want to avoid paying cash at closing, lenders often allow you to roll closing costs into the new loan principal. This increases your total debt and monthly payment.\n\nWhile rolling costs into the loan eliminates upfront expenses, it increases the total interest accrued over the life of the mortgage, reducing the long-term benefit of refinancing."
      },
      {
        heading: "3. Evaluating No-Cost Refinance Options",
        content: "Lenders frequently market 'no-cost' refinancing programs. A no-cost refinance means the lender covers the closing fees upfront in exchange for charging a higher ongoing interest rate.\n\nWhile this reduces your immediate expenses, it increases your monthly carrying costs over the life of the loan. Compare the long-term cost of a higher interest rate against paying closing fees upfront."
      },
      {
        heading: "4. Shopping and Negotiating Refinance Fees",
        content: "When refinancing, compare Loan Estimates (LE) from multiple lenders. Fees can vary significantly between banks, credit unions, and online brokers.\n\nNegotiate lender fees, such as origination or application charges. You can also shop for third-party services, such as title insurance or survey companies, to reduce closing costs."
      }
    ]
  },
  "hoa-fees-affordability": {
    title: "How HOA Fees Impact Home Purchasing Power",
    description: "Analyze the hidden effect of monthly association dues on your debt capacity and mortgage approval limits.",
    category: "Home Buying",
    lastUpdated: "June 2026",
    ctaText: "Factor in HOA Fees",
    ctaHref: "/house-affordability-calculator",
    authorKey: "marcus",
    keyTakeaways: [
      "HOA fees cover common area maintenance, building insurance, and community amenities.",
      "Underwriters add HOA dues directly to your monthly housing expense, raising your front-end DTI.",
      "Every $100 in monthly HOA fees reduces your borrowing power by approximately $15,000.",
      "HOAs can levy one-time 'special assessments' for major structural repairs, stressing reserves."
    ],
    sections: [
      {
        heading: "1. What are Homeowners Association (HOA) Fees?",
        content: "Homeowners Association (HOA) fees are monthly or annual dues collected to fund common area maintenance, building insurance, security, and community amenities.\n\nHOA fees are common in condominiums, townhouses, and planned single-family developments. Understanding these costs is essential for calculating your true monthly housing budget."
      },
      {
        heading: "2. The Direct Impact on DTI Underwriting",
        content: "Underwriters add monthly HOA dues directly to your housing expenses (PITI) when calculating your front-end DTI ratio. Because they increase your housing ratio, they reduce your maximum loan limit.\n\nIf you earn $6,000 gross monthly, a 28% front-end DTI limits your housing costs to $1,680. If the property has a $300 monthly HOA fee, your maximum PITI budget drops to $1,380."
      },
      {
        heading: "3. Reduction in Maximum Home Purchase Budget",
        content: "Because HOA dues are factored into DTI limits, they directly reduce your borrowing power. Every $100 in monthly HOA fees reduces your maximum home purchase budget by approximately $15,000 to $20,000.\n\nWhen shopping for a home, compare properties with and without HOA fees. A lower-priced home with a high HOA fee can be more expensive monthly than a higher-priced home with no HOA dues."
      },
      {
        heading: "4. The Risk of Special Assessments and Fee Increases",
        content: "HOA fees are not fixed and can increase annually to cover rising maintenance costs or inflation. Additionally, HOAs can levy one-time 'special assessments' for major structural repairs.\n\nIf the HOA has insufficient reserves to cover a new roof or structural repair, they assess each owner a portion of the cost. These unexpected charges can stress your personal cash reserves."
      }
    ]
  },
  "homeowners-insurance": {
    title: "Choosing Homeowners Insurance for Your Escrow",
    description: "Learn how hazard insurance premiums affect your escrow buffer, monthly payment, and DTI ratio.",
    category: "Escrow",
    lastUpdated: "June 2026",
    ctaText: "Project Payoff Schedule",
    ctaHref: "/mortgage-payoff-calculator",
    authorKey: "sarah",
    keyTakeaways: [
      "Lenders require homeowners insurance (hazard insurance) to protect their collateral.",
      "Premiums are based on the home's replacement cost, location, and geographic risk.",
      "Insurance premiums are collected monthly in escrow and paid annually by the servicer.",
      "Increasing your deductible can lower your annual premium and improve your DTI ratio."
    ],
    sections: [
      {
        heading: "1. Hazard Insurance Requirements in Lending",
        content: "Lenders require homeowners insurance (hazard insurance) to protect their collateral against hazards like fire, windstorms, and vandalism before funding.\n\nYou must provide proof of active insurance coverage before closing. The policy must cover the replacement cost of the structure, ensuring the property can be rebuilt after a loss."
      },
      {
        heading: "2. Calculating Premium Rates & Risk Factors",
        content: "Premiums are based on the home's replacement cost, location, building materials, and local weather risks. Average rates typically range from 0.3% to 0.8% of the home value annually.\n\nProperties in high-risk areas (such as flood zones or wildfire-prone regions) carry significantly higher premiums. You may need separate windstorm, flood, or earthquake policies to satisfy lender guidelines."
      },
      {
        heading: "3. Escrow Integration and Annual Payments",
        content: "Your annual insurance premium is divided by 12 and collected inside your monthly mortgage payment. The servicer holds these funds in escrow and pays the renewal bill.\n\nAt closing, you must prepay a full year of insurance premiums upfront to establish the escrow account. This prepaid insurance represents a significant portion of your closing costs."
      },
      {
        heading: "4. Strategies to Lower Your Homeowners Insurance Premiums",
        content: "To lower your premium, choose a higher deductible. Increasing your deductible from $1,000 to $2,500 can lower your annual premium by 10% to 20%, reducing your monthly payment.\n\nShop and compare quotes from multiple insurance carriers. Installing home security systems, smoke detectors, impact-resistant roofing, or upgrading wiring can also qualify you for discounts."
      }
    ]
  },
  "credit-score-mortgage": {
    title: "How Your Credit Score Influences Mortgage APR",
    description: "Optimize your credit profile, understand credit tiers, and qualify for the lowest mortgage interest rates.",
    category: "Debt Management",
    lastUpdated: "June 2026",
    ctaText: "Test Credit Score Changes",
    ctaHref: "/mortgage-calculator-with-pmi",
    authorKey: "marcus",
    keyTakeaways: [
      "Lenders evaluate credit risk using FICO scores from three credit bureaus.",
      "Credit scores above 740 secure the lowest interest rates and PMI premiums.",
      "Loan-Level Price Adjustments (LLPAs) increase loan costs for lower credit scores.",
      "Optimize your credit score by keeping card utilization below 10% before applying."
    ],
    sections: [
      {
        heading: "1. The FICO Model Standard in Mortgage Underwriting",
        content: "Lenders evaluate mortgage risk using your FICO credit scores from Equifax, Experian, and TransUnion. They use the middle score of the primary earner to price the loan.\n\nIf you have scores of 720, 700, and 680, the lender uses 700. If there are co-borrowers, lenders use the lower of the two middle scores, making credit coordination essential."
      },
      {
        heading: "2. Loan-Level Price Adjustments (LLPAs) & Rates",
        content: "Fannie Mae and Freddie Mac charge LLPAs based on credit scores and LTV. Borrowers with scores below 740 pay higher risk fees, which are passed on as higher interest rates.\n\nAn LLPA fee is added to your closing costs or built into your interest rate. A borrower with a 620 credit score can pay up to 3% more in upfront fees than a borrower with a 740 score."
      },
      {
        heading: "3. Credit Sensitivity and Monthly PMI Premiums",
        content: "PMI premiums are highly credit-sensitive. A borrower with a 640 credit score can pay three times more in monthly PMI fees than a borrower with a 760 score.\n\nThis credit sensitivity makes qualifying for a conventional loan expensive for lower-credit buyers. In these scenarios, government-backed FHA loans offer lower financing costs."
      },
      {
        heading: "4. Quick Actions to Optimize Your Credit Profile",
        content: "Improve your rate by paying down revolving card balances to keep credit utilization below 10%, avoiding new credit inquiries, and correcting credit report errors.\n\nObtain your reports early to identify errors. Dispute unauthorized accounts, incorrect balances, or late payments, as resolving disputes can take several weeks."
      }
    ]
  }
};
