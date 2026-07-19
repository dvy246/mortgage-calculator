# Phase 5: Implementation Plan

This document outlines the prioritized checklist of landing page changes, ranked by their impact on task completion, trust, and cognitive load relative to implementation effort.

---

## Prioritized Implementation Backlog

### Priority 1: Lifecycle Tab Bar & Category Groupings
*   **Target File:** [index.astro](file:///Users/divyyadav/developer/mortgage-calculator/src/pages/index.astro)
*   **Action Heuristic:** Hick's Law / Gestalt Grouping.
*   **Implementation:** 
    *   Group the 13 calculators into 3 lists based on user lifecycle: *1) Buying & Auditor*, *2) Early Payoff & Investment*, and *3) Refinancing & Advanced*.
    *   Add a tab header bar at the top of the grid with active/inactive style conventions matching the Design System Spec.
    *   Inject client-side vanilla JavaScript to toggle active category lists (hiding inactive categories via `hidden` utility).

---

### Priority 2: Hero Interactive Launcher & Deal Room CTA
*   **Target File:** [index.astro](file:///Users/divyyadav/developer/mortgage-calculator/src/pages/index.astro)
*   **Action Heuristic:** Aesthetic & Minimalist Design / Visual Hierarchy.
*   **Implementation:**
    *   Redesign the Hero layout into a split section on desktop viewports.
    *   Left side: Clear brand copy and a high-contrast action button directing users to the signature *Homebuyer Deal Room*.
    *   Right side: Embed a mini-interactive calculator widget that operates instantly at the fold, showing monthly payments dynamically upon input changes.

---

### Priority 3: Featured Moat Highlight
*   **Target File:** [index.astro](file:///Users/divyyadav/developer/mortgage-calculator/src/pages/index.astro)
*   **Action Heuristic:** Visual Hierarchy.
*   **Implementation:**
    *   Style the *Homebuyer Deal Room & Analyzer* card inside the grid with double span width on desktop.
    *   Add a distinct `border-brand-accent/30` border tint and an animated `Flagship` badge to instantly draw user focus.

---

### Priority 4: Alternating Visual Rhythm
*   **Target File:** [index.astro](file:///Users/divyyadav/developer/mortgage-calculator/src/pages/index.astro)
*   **Action Heuristic:** Gestalt Proximity / Visual Rhythm.
*   **Implementation:**
    *   Restructure the page container wrapper markup.
    *   Use alternating section background colors (`bg-bg-main` vs `bg-bg-card`) surrounded by crisp horizontal borders (`border-y border-border-subtle`).
