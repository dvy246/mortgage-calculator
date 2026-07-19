# Phase 4: Design System Specification

This specification documents the color, typography, spacing, component states, and motion parameters used to build the elevated landing page layout.

---

## 1. Typography & Hierarchy System
Headings use the display font `Outfit` with a letter spacing tracking offset of `-0.02em` for premium aesthetic weights. Body text uses `Inter`.

| Scale Name | Size (px/rem) | Weight | Line Height | Usage |
| :--- | :--- | :---: | :--- | :--- |
| **Display Hero** | 56px / 3.5rem | Extrabold | 1.15 | Hero Title (index layout) |
| **Section Title** | 28px / 1.75rem | Bold | 1.25 | Major Section Headings |
| **Subtitle/Card** | 16px / 1.0rem | Semibold | 1.4 | Tool Names, FAQ Questions |
| **Body Standard**| 14px / 0.875rem| Regular | 1.5 | General descriptions & paragraphs |
| **Caption/Label**| 12px / 0.75rem | Regular | 1.4 | Secondary text and helper labels |

---

## 2. Color System & Semantic Mappings
All color applications map directly to custom utility variables inside `global.css`.

*   **Primary Brand:** `var(--brand-primary)` (`#09090b` light / `#ffffff` dark)
*   **Accent Color:** `#3b82f6` (`brand-accent`) | Hover: `#2563eb` (`brand-accent-hover`)
*   **Neutral Text:**
    *   Main: `var(--text-main)` (99% contrast, `#09090b` light / `#f4f4f5` dark)
    *   Muted: `var(--text-muted)` (`#52525b` light / `#a1a1aa` dark)
*   **Borders & Dividers:**
    *   Subtle Divider: `var(--border-subtle)` (`#e4e4e7` light / `#27272a` dark)
    *   Focus State: `var(--border-focus)` (`#71717a` light / `#52525b` dark)
*   **Status Indicators:**
    *   Success: `#10b981`
    *   Warning: `#f59e0b`
    *   Danger: `#ef4444`

---

## 3. Spacing Scale
We enforce a strict 4px grid spacing standard:
*   `space-y-3` / `space-y-4` (12px / 16px) for item clusters inside cards.
*   `p-6` / `gap-6` (24px) for cards, grid gutters, and smaller layout bounds.
*   `space-y-12` (48px) for section dividers on mobile viewports.
*   `space-y-20` (80px) for section dividers on desktop viewports.

---

## 4. Interactive States Spec
To provide feedback, every interactive component must declare explicit states:
*   **Buttons & Links:**
    *   *Default:* Subtle boundary transition (`duration-200 ease-out`).
    *   *Hover:* Background changes to hover state, text color shifts, and minor scaling (`active:scale-[0.98]`).
    *   *Focus-Visible:* Ring outline (`focus-visible:ring-2 focus-visible:ring-brand-accent`).
*   **Tabs:**
    *   *Active:* High contrast background/text, subtle shadow, zero latency indicator.
    *   *Inactive:* Soft muted background, shifts to hover state on mouse-over.

---

## 5. Motion Principles
*   **Convention:** Keep animations minimal to prevent latency and CLS (Cumulative Layout Shift).
*   **Transitions:** Only apply hardware-accelerated style transitions (`transition-colors`, `transition-all duration-200`) on hovers and clicks.
*   **Reduced Motion:** Respect `prefers-reduced-motion: reduce` explicitly.
