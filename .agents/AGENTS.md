# Mortgage Intelligence - Developer Rules and Guidelines

Welcome to the **Mortgage Intelligence** codebase. This document outlines critical rules, architecture conventions, and styling guidelines that all AI agents must follow when modifying or extending this application.

---

## 🚀 Technology Stack & Environment

1. **Framework**: [Astro 6.x](https://astro.build/) configured with `@astrojs/cloudflare` for building static pages (SSG) deployed to Cloudflare Pages.
2. **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite` integration.
   * **CRITICAL**: Do **NOT** look for or create a `tailwind.config.js` or `tailwind.config.ts`. Tailwind v4 configures themes directly inside CSS using the `@theme` directive.
   * Custom theme properties (colors, fonts, etc.) are declared in [src/styles/global.css](file:///Users/divyyadav/developer/mortgage-calculator/src/styles/global.css) using CSS custom properties.
3. **Logic & Typings**: [TypeScript](https://www.typescript.org/) configured with strict mode.
4. **Icons**: Inline SVGs are preferred for performance and simplicity.

---

## 📁 Key Directories & File Structure

* [src/pages/](file:///Users/divyyadav/developer/mortgage-calculator/src/pages/) — Static pages (calculators, guides, policy pages).
* [src/components/](file:///Users/divyyadav/developer/mortgage-calculator/src/components/) — Shared UI elements (e.g., Header, Footer, CookieConsent).
* [src/components/Calculator/](file:///Users/divyyadav/developer/mortgage-calculator/src/components/Calculator/) — Specific calculator sub-components (graphs, amortization tables, print layouts, etc.).
* [src/layouts/](file:///Users/divyyadav/developer/mortgage-calculator/src/layouts/) — Core page shells. [Layout.astro](file:///Users/divyyadav/developer/mortgage-calculator/src/layouts/Layout.astro) contains crucial SEO meta-tags, theme-initialization script, and analytics/AdSense setups.
* [src/data/](file:///Users/divyyadav/developer/mortgage-calculator/src/data/) — Data files (e.g., guides lists, state metrics, and lookup constants).
* [src/utils/](file:///Users/divyyadav/developer/mortgage-calculator/src/utils/) — Calculation logic and helpers (e.g., [mortgage.ts](file:///Users/divyyadav/developer/mortgage-calculator/src/utils/mortgage.ts)). Keep math decoupled from the UI markup.

---

## 🔒 Architectural & Privacy Constraints

Per the project GTM specification, this application is a **100% serverless, zero-backend, client-side only platform**.
* **NO Databases**: Do not integrate database engines, servers, or cloud-synced databases.
* **NO User Accounts**: There are no logins or credentials. All session data, preferences (theme), or compared scenarios must reside solely in the user's browser `localStorage`.
* **NO Backend Processing**: All calculations, chart generations, and document exports (e.g., PDF generation using `window.print()`) must execute client-side in the browser.
* **NO Lender/MLS APIs**: Do not integrate real-time listings or commercial mortgage rate APIs. Standard state rate metrics and fee structures are loaded via static configuration files.

---

## 📊 Financial Math & Calculation Standards

1. **Decouple Calculations from UI**: Keep arithmetic, interest compounding, and amortization tables in [src/utils/](file:///Users/divyyadav/developer/mortgage-calculator/src/utils/). Components should only import functions and pass inputs.
2. **Numeric Precision**:
   * Always account for edge cases (e.g., `interestRate = 0`, division by zero, empty/negative input fields).
   * Format currency values using `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })`.
   * For amortization tables, use standard formulas, e.g., monthly payments: 
     $$M = P \frac{r(1+r)^n}{(1+r)^n - 1}$$
   * PMI cancellation rules must strictly follow standard Fannie Mae/Freddie Mac Homeowners Protection Act guidelines (automatic cancellation at 78% LTV, requested cancellation at 80% LTV of the original purchase value).

---

## 🎨 Styling & Design Aesthetics

Follow these rules to maintain the platform's premium, state-of-the-art look:
1. **Curated Theme Palettes**:
   * Avoid raw default colors (e.g., standard `bg-red-500` or `text-blue-500`). Use the custom variables mapped under `@theme` in `global.css` (`bg-bg-main`, `text-text-main`, `brand-primary`, `brand-accent`, etc.).
   * Always design with **both light and dark modes** in mind, verifying elements using Tailwind's `dark:` variant class.
2. **Aesthetics & UI Polish**:
   * Utilize `Outfit` (sans-serif display font) for headings and `Inter` for body text.
   * Employ smooth gradients, hover transitions, and micro-interactions (e.g., scale transitions, focus rings).
   * Do not use generic placeholders. Utilize `generate_image` or clean inline SVGs for visuals.

---

## 🔍 SEO & Accessibility Rules

* **Single `<h1>`**: Every page must contain exactly one `<h1>` tag inside the `<main>` container that concisely describes the page's primary query target.
* **Canonical URLs**: Every page must set `canonicalUrl` when calling [Layout.astro](file:///Users/divyyadav/developer/mortgage-calculator/src/layouts/Layout.astro). The canonical paths should be formatted relative to the base domain `https://mortgagesintel.com` and must **not** include trailing slashes (e.g., `/privacy-policy` not `/privacy-policy/`).
* **Semantic HTML**: Use proper `<header>`, `<main>`, `<footer>`, `<section>`, and `<article>` tags.
* **Unique Interactive IDs**: Every button, input, link, and interactive widget must contain a unique and descriptive ID (e.g., `id="calculate-refinance-btn"`) to facilitate automated and browser testing.
* **Contrast and Focus**: Ensure all focusable elements have visible focus rings (`focus-visible:ring-2`) and maintain WCAG AAA/AA color contrast standards in both dark and light modes.
