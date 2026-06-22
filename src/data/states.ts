export interface StateData {
  slug: string;
  name: string;
  medianHomePrice: number;
  taxRate: number; // e.g. 0.75 for California
  insuranceRate: number; // e.g. 0.08 for California
  averageMortgageRate: number; // e.g. 6.5
  description: string;
  faqs: { question: string; answer: string }[];
}

export const stateDatabase: Record<string, StateData> = {
  california: {
    slug: "california",
    name: "California",
    medianHomePrice: 790000,
    taxRate: 0.75,
    insuranceRate: 0.08,
    averageMortgageRate: 6.65,
    description: "California has some of the highest real estate prices in the United States. Although its property tax rate is below the national average due to Proposition 13 limits, high purchase prices result in substantial tax bills.",
    faqs: [
      {
        question: "How does Proposition 13 affect California property taxes?",
        answer: "Proposition 13 caps property taxes at 1% of the assessed value of the home at the time of purchase, with annual assessment increases limited to a maximum of 2% unless the home is sold, at which point it is reassessed."
      },
      {
        question: "Is PMI mandatory in California?",
        answer: "Yes, standard private mortgage insurance (PMI) is required by lenders on conventional loans in California when the buyer's down payment is less than 20% of the home's purchase price."
      },
      {
        question: "What is the median home price in California?",
        answer: "As of 2026, the median home sales price in California is approximately $790,000, although regional variation (e.g., San Francisco vs. Central Valley) is extremely high."
      }
    ]
  },
  texas: {
    slug: "texas",
    name: "Texas",
    medianHomePrice: 340000,
    taxRate: 1.60,
    insuranceRate: 0.12,
    averageMortgageRate: 6.45,
    description: "Texas offers relatively affordable median housing costs compared to coastal states. However, because Texas has no state income tax, it relies heavily on property taxes, resulting in one of the highest tax rates in the country.",
    faqs: [
      {
        question: "Why are Texas property taxes so high?",
        answer: "Texas does not levy a state income tax, meaning counties and school districts fund services primarily through property taxes, leading to effective tax rates frequently exceeding 1.6%."
      },
      {
        question: "How can I reduce my property tax in Texas?",
        answer: "Primary homeowners in Texas can apply for a Homestead Exemption, which removes a portion of their home's value from taxation and caps annual assessment increases at 10%."
      },
      {
        question: "What is the typical down payment on a Texas home?",
        answer: "While 20% is ideal to avoid PMI, many first-time buyers in Texas use FHA loans with down payments as low as 3.5%, or conventional loans with 3% to 5% down."
      }
    ]
  },
  florida: {
    slug: "florida",
    name: "Florida",
    medianHomePrice: 400000,
    taxRate: 0.91,
    insuranceRate: 0.20,
    averageMortgageRate: 6.50,
    description: "Florida has experienced rapid population growth and home price appreciation. Homeowners insurance premiums in Florida are significantly higher than the national average due to hurricane risk and local litigation costs.",
    faqs: [
      {
        question: "Why is homeowners insurance so expensive in Florida?",
        answer: "Florida faces substantial weather risks (specifically hurricanes and floods) combined with reinsurance market pressures, causing average premiums to be twice to three times the national average."
      },
      {
        question: "Does Florida have a homestead tax exemption?",
        answer: "Yes, Florida homeowners can claim a homestead exemption of up to $50,000 off their assessed value and limit assessment increases to 3% annually under the 'Save Our Homes' assessment limit."
      },
      {
        question: "What should I look out for when buying a Florida home?",
        answer: "Always factor in HOA/Condo fees, high insurance costs, and potential flood insurance requirements, which can add hundreds of dollars to your monthly housing budget."
      }
    ]
  },
  "new-york": {
    slug: "new-york",
    name: "New York",
    medianHomePrice: 450000,
    taxRate: 1.40,
    insuranceRate: 0.08,
    averageMortgageRate: 6.55,
    description: "New York housing is highly diverse, ranging from hyper-dense NYC co-ops to rural upstate acreage. High property taxes and local closing fees (such as the mortgage recording tax) are critical variables.",
    faqs: [
      {
        question: "What is the New York Mortgage Recording Tax?",
        answer: "New York imposes a tax on recording a mortgage, typically ranging from 0.75% to 2.75% of the loan amount depending on the county, usually split between the buyer and lender."
      },
      {
        question: "Are property taxes high in New York state?",
        answer: "Yes, property tax rates in Upstate New York and Westchester/Long Island are among the highest in the country, often exceeding 1.4% to 2.0% of the home's market value."
      }
    ]
  },
  illinois: {
    slug: "illinois",
    name: "Illinois",
    medianHomePrice: 280000,
    taxRate: 2.08,
    insuranceRate: 0.10,
    averageMortgageRate: 6.40,
    description: "Illinois features one of the most affordable median home prices among major industrial states, but it also has the second-highest average property tax rate in the country, close to 2.08%.",
    faqs: [
      {
        question: "How do Illinois property taxes affect monthly mortgage payments?",
        answer: "Because Illinois tax rates average over 2.0%, property taxes can constitute 25% to 35% of your total monthly mortgage payment, making accurate calculation essential."
      },
      {
        question: "What is the Illinois Homestead Exemption?",
        answer: "The General Homestead Exemption in Illinois provides a reduction of up to $10,000 in equalized assessed value (EAV) for an owner-occupied primary residence."
      }
    ]
  },
  washington: {
    slug: "washington",
    name: "Washington",
    medianHomePrice: 560000,
    taxRate: 0.94,
    insuranceRate: 0.07,
    averageMortgageRate: 6.70,
    description: "Washington state features high real estate valuations, particularly in the Puget Sound area. While it has no state income tax, property taxes average around 0.94% and home insurance rates remain low.",
    faqs: [
      {
        question: "Are property taxes high in Washington state?",
        answer: "Washington property taxes average 0.94% of assessed value. While not among the highest nationally, high home values in Seattle and surrounding areas lead to significant total tax liabilities."
      },
      {
        question: "Does Washington have a mortgage recording tax?",
        answer: "No, Washington does not levy a mortgage recording tax, though transfer taxes and local recording fees apply at closing."
      }
    ]
  },
  georgia: {
    slug: "georgia",
    name: "Georgia",
    medianHomePrice: 320000,
    taxRate: 0.90,
    insuranceRate: 0.11,
    averageMortgageRate: 6.50,
    description: "Georgia offers affordable home pricing below the national median. Property taxes are moderate at around 0.90%, but homeowners insurance costs reflect regional weather and storm risks.",
    faqs: [
      {
        question: "What is the homestead exemption in Georgia?",
        answer: "Georgia offers a standard $2,000 homestead exemption on county taxes, and many counties offer local exemptions that significantly reduce assessed values for primary residences."
      },
      {
        question: "Is PMI required for low down payments in Georgia?",
        answer: "Yes, like all states, conventional loans in Georgia with less than 20% down payment require Private Mortgage Insurance (PMI) until 80% LTV is achieved."
      }
    ]
  },
  "north-carolina": {
    slug: "north-carolina",
    name: "North Carolina",
    medianHomePrice: 330000,
    taxRate: 0.70,
    insuranceRate: 0.10,
    averageMortgageRate: 6.45,
    description: "North Carolina features a growing real estate market with highly competitive property tax rates averaging 0.70% and a median home price near $330,000.",
    faqs: [
      {
        question: "How high are property taxes in North Carolina?",
        answer: "North Carolina's property tax rate is very competitive, averaging just 0.70% of assessed market value."
      },
      {
        question: "Do FHA loans have different limits in North Carolina?",
        answer: "Yes, FHA loan limits in North Carolina are adjusted by county, with higher limits in metro areas like Charlotte and Raleigh-Durham."
      }
    ]
  },
  virginia: {
    slug: "virginia",
    name: "Virginia",
    medianHomePrice: 390000,
    taxRate: 0.82,
    insuranceRate: 0.08,
    averageMortgageRate: 6.40,
    description: "Virginia's market ranges from high-cost Northern Virginia submarkets to affordable southern regions. Property taxes average 0.82% of assessed value.",
    faqs: [
      {
        question: "How are property taxes calculated in Virginia?",
        answer: "Virginia property taxes are assessed at the local city or county level, averaging 0.82% of the home's fair market value annually."
      },
      {
        question: "Are there down payment programs in Virginia?",
        answer: "Yes, the Virginia Housing Development Authority (VHDA) offers low-down-payment loans and down payment assistance grants for qualified buyers."
      }
    ]
  },
  massachusetts: {
    slug: "massachusetts",
    name: "Massachusetts",
    medianHomePrice: 590000,
    taxRate: 1.15,
    insuranceRate: 0.09,
    averageMortgageRate: 6.60,
    description: "Massachusetts real estate values are driven by high demand in the Boston metro area. Property taxes average 1.15% of assessed value.",
    faqs: [
      {
        question: "What is the homestead protection in Massachusetts?",
        answer: "Massachusetts offers homestead protection, which safeguards primary residences up to $500,000 against creditor claims, though it does not exempt property taxes."
      },
      {
        question: "Does Massachusetts have a deed transfer tax?",
        answer: "Yes, Massachusetts charges a transfer tax (deeds tax) of $4.56 per $1,000 of sales value, which is typically paid by the seller at closing."
      }
    ]
  }
};
