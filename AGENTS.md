# Session Context

## Flagship Feature: Rent vs Buy Calculator
- **Page:** `/rent-vs-buy-calculator`
- **Purpose:** Educational rent vs buy comparison with break-even analysis, after-tax estimates, year-by-year table
- **YMYL-safe:** "Educational comparison tool — shows the math, lets you decide"; no "should" language; tax = "simplified federal estimate, consult a CPA"
- **Schema:** `WebApplication` + `FAQPage` structured data

### Files
- `src/utils/rentVsBuy.ts` — Pure computation engine (amortization, opportunity cost, tax modeling)
- `src/components/RentVsBuy/RentVsBuyDashboard.astro` — Interactive form (price, down, rate, rent, horizon) + results table
- `src/pages/rent-vs-buy-calculator.astro` — SEO page with 7 FAQs, 6-factor educational section, schema, disclaimer

### Nav placement
- Desktop: in Calculators dropdown (first item) + search index
- Mobile drawer: between calculator list and Readiness Score
- Sitemap priority 0.95

## Flagship Feature: Mortgage Readiness Score
- **Page:** `/mortgage-readiness-score`
- **Purpose:** Interactive 5-dimension educational estimate (income, debt, savings, credit, market) — not a credit check or loan decision
- **YMYL-safe:** All language is "educational estimate", no "should/shouldn't buy", no recommendations
- **Schema:** `WebApplication` + `FAQPage` structured data

### Files
- `src/utils/readinessScore.ts` — Pure scoring engine (no UI, testable)
- `src/components/MortgageReadiness/ReadinessGauge.astro` — SVG speedometer gauge
- `src/components/MortgageReadiness/ReadinessDashboard.astro` — Interactive form + results
- `src/pages/mortgage-readiness-score.astro` — SEO landing page with 7 FAQs, schema, disclaimer

### Nav placement
- Desktop: "Readiness Score" + `New` badge between Calculators dropdown and Comparisons
- Mobile drawer: same
- Search index: included

### Build
- 59 pages, 0 errors, ~2s build, 3.9MB dist
- Sitemap priority 0.95

## Prior Work
- 8 calculators, 5 comparison pages, 20 guides, 10 state calculators
- ScenarioComparer workspace with localStorage persistence + URL sharing
- SVGCharts (5 interactive chart panels, compare-baseline overlay, tooltips)
- MortgageReport + PrintModal (7-section advisory report, PDF export via html2pdf.js)
- AffordabilityGuard (DTI stress gauge), StressTest (rate shock simulator)
- Auto-capture only fires on user input change (not page load)
- Header with search overlay (Cmd+K, pre-loaded index of all pages)
- AdSense compliant, privacy-first positioning

## Conventions
- Astro MPA, no JS framework, vanilla `<script>` for interactivity
- `window.*` hooks for cross-component communication
- Tailwind v4 with CSS custom properties for theme (`mi_theme` in localStorage)
- font-display = Outfit, font-sans = Inter
- SVG charts are hand-rolled (no D3/Chart.js)
- ESLint: none detected; Prettier: likely configured
