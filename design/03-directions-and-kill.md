# Phase 3: Design Directions & Evaluation

We evaluated three visual directions for the redesign of the Mortgage Intelligence landing page.

---

## Direction 1: The SaaS Dashboard Pattern
*   **Concept:** A highly dense layout styling the landing page as an analytical dashboard. Features quick summary metrics, real-time widgets, and tiny high-density links.
*   **Pros:** Appeals to professional real estate agents and analytical users.
*   **Cons:** Stresses casual first-time home buyers. High visual density and lack of explanations make it feel intimidating and complex.
*   **Verdict:** **KILLED**. The cognitive strain contradicts the target audience's emotional state (desiring trust, competence, and clarity).

---

## Direction 2: The E-E-A-T Editorial Hub
*   **Concept:** Focuses heavily on content readability. Employs a single column layout, large fonts, prominent author profiles, and places calculators below text guides.
*   **Pros:** Outstanding editorial SEO indicators.
*   **Cons:** Under-utilizes the interactive calculators. First-time users will see a wall of text instead of tool utility, which damages retention.
*   **Verdict:** **KILLED**. Fails the "Competitor Killer" heuristic because direct utilities should feel tool-first.

---

## Direction 3: The Structured Lifecycle Engine Hub
*   **Concept:** Focuses on routing users based on their current homebuying stage. It introduces:
    1.  A **Quick Scenario Launcher** inside the Hero section (linking to the Deal Room).
    2.  A **Lifecycle Tab Bar** dividing the 13 tools into three user groups: *Home Purchasing*, *Debt Paydown*, and *Refinancing & Equity*.
    3.  Alternating section backgrounds and border details to guide the eye.
*   **Pros:** Directly addresses Hick's Law, visually highlights our primary Deal Room moat, matches Astro SSG constraints (requires only vanilla JS tab switching), and feels highly polished.
*   **Verdict:** **SURVIVOR** (Selected for implementation).
