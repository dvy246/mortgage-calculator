# Phase 2: Real Reference Research

This document outlines key visual and structural UX patterns observed across direct competitors and leading financial calculators.

---

## 1. Direct Competitor Audits

### Bankrate (bankrate.com)
*   **What works:** Grouping calculators into dedicated hubs (Mortgage, Refinance, HELOC). Visual presentation highlights primary tools (like their basic mortgage calculator) and provides secondary listings for long-tail calculators.
*   **What fails:** Massive ad clusters and sponsored lender grids immediately disrupt the user journey. The interface is cluttered with promotional calls-to-action that obscure calculations.
*   **Lesson:** Keep category hubs clean, grouping tools logically to prevent cognitive overload, but completely avoid ad-bloat.

### NerdWallet (nerdwallet.com)
*   **What works:** Excellent typographic spacing and card layouts. Primary calculators feature large, easily interactive sliders. Secondary pages use bulleted step lists.
*   **What fails:** Highly templated structures where every page looks identical. The visual brand lacks unique identity, blending into a generic SaaS-like interface.
*   **Lesson:** Use distinct font weighting and custom UI details (like accent colored tags) to stand out, while preserving clean reading scales.

### CFPB (consumerfinance.gov)
*   **What works:** The ultimate benchmark for YMYL credibility and clarity. Zero visual fluff. Features large, readable text, high-contrast borders, and prominent consumer warning cards.
*   **What fails:** Design is heavily institutional and lacks modern design animations, micro-interactions, or dynamic calculation visualizations.
*   **Lesson:** Study their disclaimer presentation and text hierarchies to establish maximum consumer trust.

---

## 2. Adjacent Utility Reference Points

### Stripe Dashboard
*   **What works:** Best-in-class data layouts, high-contrast borders, unified spacing rules, and subtle micro-interactions (e.g. smooth element transitions).
*   **Lesson:** Use clean thin lines and subtle shifts in background tint to segment tools without creating visual noise.

---

## 3. Patterns to Avoid (Dated / AI-Slop Design)
*   **Abstract Colorful Backgrounds:** Large multi-colored floating blobs or gradient meshes behind content. This is overused in modern templates and undermines financial authority.
*   **Rounded Cards with Massive Shadows:** Cards with `shadow-2xl` floating on gray grids. Reads as a template.
*   **Vague "Delightful" Animations:** Spinners, fade-ins, and complex page-level transitions that add time and layout shifts.

---

## 4. Key Strategic Layout Patterns Adopted
*   **Lifecycle Categorization:** Instead of one large grid, tools will be grouped by user lifecycle stage (Buying, Payoff, Refinancing/Advanced).
*   **Hero Interactive Launcher:** Hero will include a quick scenario launcher to instantly let users run baseline calculations.
*   **Alternating Tints:** Alternate sections using soft background tints (`bg-bg-main` vs `bg-bg-card`) to establish clear boundaries.
