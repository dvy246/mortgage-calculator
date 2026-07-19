# Phase 1: Visual & Usability Audit of Mortgage Intelligence Landing Page

This document audits the current user experience, visual hierarchy, layout spacing, interaction states, and accessibility compliance of the platform's primary landing page.

---

## 1. Visual Hierarchy & Eye Flow
*   **Hero Fold:** The top fold contains a pill banner, a large header `Calculate the true cost of buying a home.`, and a description paragraph. There is no call to action button or core entry point within the immediate viewport, causing a passive reading pattern instead of active utility selection.
*   **The Grid Overload:** Immediately following the hero is the **Financial Decision Engines** grid containing 13 cards of uniform size and weight. Having 13 elements without any grouping or visual separation triggers Hick’s Law (decision paralysis), making it hard for users to quickly identify high-priority tools (e.g. Deal Room or Affordability Calculator).
*   **Hierarchy Priority:** The *Homebuyer Deal Room* is our primary moat feature, but it shares identical visual treatment with simple utilities like the *PMI Calculator*.

---

## 2. Typography & Readability System
*   **Line Lengths:** Hero paragraph line lengths exceed 80 characters on desktop viewports, causing visual fatigue during scanning.
*   **Contrast / Scale:** Headings use `Outfit` and body uses `Inter` which matches rules, but weight contrasts between body labels (`text-xs text-text-muted`) and values are low in several cards.

---

## 3. Color System & Theme Contrast
*   **Semantic Roles:** Mapped standard themes correctly, but borders and dividers (`border-border-subtle`) have extremely low contrast in light mode, making sections feel undefined and "floating".
*   **Contrast Check:** Checked text contrast against backgrounds:
    *   Light mode `text-text-muted` on `bg-bg-card` meets WCAG AA (4.5:1), but some secondary captions fall close to 3:1.
    *   Accent color highlight `text-brand-accent` has strong readability.

---

## 4. Spacing & Visual Rhythm
*   **Spacing Uniformity:** Page sections use a flat `space-y-16` padding model. This creates a monotonous vertical scanning rhythm.
*   **Layout Sections:** There is no visual division (e.g., subtle alternating backgrounds, horizontal card layouts, or border card structures) separating calculators, workspace scenario planners, and educational blogs.

---

## 5. Interaction states
*   **Interactive Focus:** Calculator grid cards lack a visible focus ring on focus-visible.
*   **Feedback Loops:** Hovering calculators shifts the border to focus color, but lacks premium depth (such as a subtle scale-up or transition layer) to encourage interaction.

---

## 6. Information Architecture & Navigation
*   **Task Pathing:** A first-time user looking to compare homes must scan down to find the *Deal Room* or navigate through search overlays. A clearer "paths of entry" layout would route them to their goal instantly.

---

## 7. Mobile ergonomics
*   **Touch Targets:** Categories and filter dropdowns have tight heights (8) on small viewports, violating touch recommendations.
*   **Reflow:** Reflow is responsive but cards stack into a very long scrolling column on mobile.

---

## 8. Brand & Emotional Tone
*   **Assessment:** Credible and clean, but reads slightly flat and dry. To feel premium and expert-grade, we need refined layout grids, subtle borders, and improved spacing rhythm.

---

## 9. Accessibility-as-UX
*   **Gaps:** Standard `<details>` tags for FAQs lack explicit label indicators for screen readers. Some card elements require stronger keyboard navigation outlines.

---

## 10. Audit Table & Action Items

| Issue Area | Severity | Description | Usability Heuristic | Proposed Fix |
| :--- | :---: | :--- | :--- | :--- |
| Hero Fold | **High** | No direct primary CTA button or tool entry point at fold. | Aesthetic & Minimalist Design | Add a prominent quick-action launcher or scenario trigger right in hero. |
| Grid Overload | **High** | 13 cards clustered into a single grid creates cognitive strain. | Hick's Law / Gestalt | Group calculators by lifecycle (Buying, Payoff, Refinancing/Advanced). |
| Moat Highlight | **Medium** | "Deal Room" Moat is visually buried among simpler tools. | Visual Hierarchy | Style the Deal Room card as a featured, high-priority dashboard. |
| Spacing Rhythm | **Medium** | Flat vertical padding across sections feels monotonous. | Visual Rhythm | Add alternating background section wraps to segment pages. |
