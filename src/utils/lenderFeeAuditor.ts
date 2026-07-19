export interface StateFees {
  title: number;
  escrow: number;
  app: number;
}

export const stateBenchmarks: Record<string, StateFees> = {
  CA: { title: 980, escrow: 650, app: 0 },
  TX: { title: 1120, escrow: 590, app: 0 },
  NY: { title: 1250, escrow: 720, app: 0 },
  FL: { title: 890, escrow: 450, app: 0 },
  IL: { title: 950, escrow: 600, app: 0 },
  PA: { title: 920, escrow: 550, app: 0 },
  OH: { title: 820, escrow: 480, app: 0 },
  GA: { title: 880, escrow: 520, app: 0 },
  NC: { title: 780, escrow: 500, app: 0 },
  MI: { title: 850, escrow: 510, app: 0 },
  OTHER: { title: 900, escrow: 550, app: 0 }
};

export const nationalBenchmarks = {
  underwriting: 950,
  processing: 750,
  application: 0,
  points: 0,
  appraisal: 550,
  credit: 45
};

export interface FeeInput {
  underwriting: number;
  processing: number;
  application: number;
  points: number;
  appraisal: number;
  credit: number;
  titleLender: number;
  escrow: number;
}

export interface FlaggedItem {
  label: string;
  overcharge: number;
  actual: number;
  expected: number;
}

export interface AuditResult {
  totalJunkFees: number;
  totalPotentialSavings: number;
  regulatoryBadge: "HIGH OVERCHARGES" | "MODERATE OVERCHARGES" | "OPTIMIZED ESTIMATE";
  riskDescription: string;
  flaggedItems: FlaggedItem[];
  emailScript: string;
}

export function auditFees(state: string, inputs: FeeInput): AuditResult {
  const stateData = stateBenchmarks[state] || stateBenchmarks['OTHER'];

  const underwriting = inputs.underwriting || 0;
  const processing = inputs.processing || 0;
  const application = inputs.application || 0;
  const points = inputs.points || 0;
  const appraisal = inputs.appraisal || 0;
  const credit = inputs.credit || 0;
  const titleLender = inputs.titleLender || 0;
  const escrow = inputs.escrow || 0;

  const itemsToAudit = [
    { label: 'Underwriting', val: underwriting, bench: nationalBenchmarks.underwriting },
    { label: 'Processing', val: processing, bench: nationalBenchmarks.processing },
    { label: 'Application', val: application, bench: stateData.app },
    { label: 'Appraisal', val: appraisal, bench: nationalBenchmarks.appraisal },
    { label: 'Credit Report', val: credit, bench: nationalBenchmarks.credit },
    { label: 'Lender Title Policy', val: titleLender, bench: stateData.title },
    { label: 'Settlement Escrow', val: escrow, bench: stateData.escrow }
  ];

  let totalJunkFees = underwriting + processing + application + points + appraisal + credit + titleLender + escrow;
  let totalPotentialSavings = 0;
  const flaggedItems: FlaggedItem[] = [];

  itemsToAudit.forEach(item => {
    const difference = item.val - item.bench;
    if (difference > 0) {
      totalPotentialSavings += difference;
      flaggedItems.push({
        label: item.label,
        overcharge: difference,
        actual: item.val,
        expected: item.bench
      });
    }
  });

  // Regulatory Badge & Description
  let regulatoryBadge: "HIGH OVERCHARGES" | "MODERATE OVERCHARGES" | "OPTIMIZED ESTIMATE" = "OPTIMIZED ESTIMATE";
  let riskDescription = "";

  if (totalPotentialSavings > 800) {
    regulatoryBadge = "HIGH OVERCHARGES";
    riskDescription = `⚠️ Your lender is charging <strong>$${Math.round(totalPotentialSavings).toLocaleString()}</strong> above average closing cost benchmarks in your state. Multiple origination and settlement line items are flagged as inflated. We recommend requesting a waiver of administrative charges.`;
  } else if (totalPotentialSavings > 200) {
    regulatoryBadge = "MODERATE OVERCHARGES";
    riskDescription = `👉 Your closing cost details show moderate markup of <strong>$${Math.round(totalPotentialSavings).toLocaleString()}</strong>. Some administration or settlement items can be optimized. See the negotiation email below to request adjustments.`;
  } else {
    regulatoryBadge = "OPTIMIZED ESTIMATE";
    riskDescription = `✅ Congratulations! Your Loan Estimate fees match or fall below our target regional benchmarks. This represents an optimized financial structure. Proceed with rate lock options.`;
  }

  // Generate Email Script
  let emailScript = "";
  if (totalPotentialSavings === 0) {
    emailScript = `Subject: Mortgage Closing Cost Clarification

Dear [Loan Officer Name],

I have reviewed the Loan Estimate dated [Date] for our mortgage application. I notice that all administrative and closing fees are in alignment with the industry standard benchmarks.

Could you please let me know if there are any promotional waivers or rate incentives available for locking in our loan today?

Thank you,
[Your Name]`;
  } else {
    let itemsDetails = "";
    flaggedItems.forEach(item => {
      itemsDetails += `- ${item.label}: Currently quoted at $${item.actual}, while the regional benchmark average is $${item.expected} (a difference of $${Math.round(item.overcharge)}).\n`;
    });

    emailScript = `Subject: Clarification on Loan Estimate Fees - Loan # [Loan Number]

Dear [Loan Officer Name],

Thank you for providing the Loan Estimate for our home purchase application. I am reviewing the closing fee outline and noticed a few administrative line items that appear to be significantly above regional benchmarks. 

I would appreciate it if we could discuss the following items listed on Page 2:

${itemsDetails}
Specifically, since the Underwriting and Processing fees are administrative overhead charges, I would like to request that we combine these into a single processing fee of $${nationalBenchmarks.processing} or waive the application fee. 

Furthermore, I plan to seek independent quotes for the Title and Escrow fees (Section C) to see if we can locate a more cost-effective settlement provider, unless your team is able to match those local benchmarks.

I would love to lock in our loan and move forward with your company. Can we modify these origination charges to make the loan estimates more competitive?

Sincerely,

[Your Name]
[Your Phone Number]`;
  }

  return {
    totalJunkFees,
    totalPotentialSavings,
    regulatoryBadge,
    riskDescription,
    flaggedItems,
    emailScript
  };
}
