# HomeCook App Documentation

## Current Prototype Scope

HomeCook is a responsive cooking-onboarding and recipe dashboard prototype. The current experience is optimized around a low-commitment user story:

- A user wants help choosing realistic weeknight dinners without feeling locked into a permanent profile.
- Onboarding collects only the few preferences needed to recommend one starter recipe.
- The dashboard converts onboarding answers into simple presets first, then exposes advanced filters when the user wants more control.
- Saved recipes are always recoverable through the sidebar/dock/tab pattern, depending on breakpoint.

## Future Agent Quickstart

### Source Of Truth

- Work from the local project at `/Users/khushboo/Desktop/development projects/cooking-app`.
- The active branch is `main`, tracking `khushboo/main`.
- Primary GitHub remote for Khushboo’s hosted project: `https://github.com/khushboo1108/Cooking-app.git`.
- Secondary/original remote: `https://github.com/Vaibhav7887-code/Cooking-app.git`. Do not push here unless the user explicitly asks.
- Latest pushed baseline before this documentation update: `f49f360` (`Clarify review save feedback`).

### Local Prototype

- This is a static frontend prototype. There is no build step required for the current app.
- Run locally with `python3 -m http.server 8024`.
- Open `http://127.0.0.1:8024/` for the same local target used during recent visual checks.
- Query parameters are not app routes; the app is rendered from `index.html` and uses client-side state from `localStorage`.
- To replay onboarding, use the in-app `Reset setup` / `Reset user flow` controls rather than manually clearing storage unless debugging persistence.

### Current Product Contract

- Onboarding is low commitment and grouped into 3 setup screens plus 1 review screen after the welcome screen.
- Desktop onboarding should feel like a web app, not a stretched mobile flow: persistent simplified brand rail, two-column card, questions on the left, compact visual support on the right.
- Tablet keeps navigation compact by default and should not inherit awkward desktop spacing.
- Mobile uses a hamburger menu during onboarding, then dashboard/saved tabs after onboarding is complete.
- Mobile onboarding option groups use compact cards: one card per row below `360px`, and a 2-column grid from `360px` through the mobile breakpoint.
- On the mobile review screen, recipe recommendations stay above `Your first dinner plan`; the cooking illustration is hidden at this breakpoint so the review does not spend the first viewport on animation.
- Dashboard helper copy should stay light; explanation belongs mostly in onboarding and the UX rationale page.
- The UX rationale page is a polished, responsive web adaptation of `Rational.pdf`: real HTML text, collapsible sections, tables, section hierarchy, and cropped screenshot/sketch assets from `assets/rationale/`, not a flat PDF image or embed.
- The rationale cover keeps `Design Rational` centered, places `Service fusion design challenge` directly underneath, and pins `Time taken: 4hrs` to the bottom-right of the cover.
- Saved recipes must remain reachable on every breakpoint: right dock on desktop/tablet, tab on mobile.
- The onboarding-to-dashboard handoff must be single-surface: the review panel hides immediately, the welcome overlay owns the transition, and the dashboard only renders after the body has left temporary handoff state so final dashboard breakpoint rules apply from the first visible frame.

### Recent Interaction Decisions

- Dinner-window input uses compact preset cards inside the cooking routine screen.
- Dinner-window helper text reads `Including prep and cleanup time.` and appears as a muted line under the question.
- The right-side `Setup so far` summary was intentionally removed from onboarding to reduce clutter.
- `Reset setup` stays available throughout the user flow from the left drawer/sidebar only.
- `UX rationale` is anchored at the bottom-left of the drawer/sidebar so reviewer access does not compete with setup and reset controls.
- Setup screens auto-progress once every question in the current group is answered; the setup footer stays focused on Back and dashboard handoff.
- Default servings uses eight radio-style option cards instead of a dropdown so it participates in auto-progress.
- The review recipe area uses preference-based category tabs and a two-card carousel instead of a single forced starter.
- Review recipe cards change saved-state copy from `Save recipe` to `Added to your grocery list` after the user saves, while keeping the check icon and pressed state.
- The saved-recipe confirmation renders as a thin top banner above the review recipes and plan, with no decorative circles, shadow, or large card treatment.
- Saving the starter recipe reveals a small cook-day nudge with `Tonight`, `Tomorrow`, `This weekend`, and `Next week`; `Tomorrow` is the default.
- Opening the dashboard from review does not require saving a recipe. The welcome screen appears immediately and fades into the final dashboard; no review screen, intro panel, completion toast, or old two-column dashboard layout should flash during the handoff.
- The welcome screen CTA is centered under the hero copy, not pushed into the shared right-aligned action group.
- Mobile onboarding option cards stay compact: under `360px` they remain single-column for readability; `360px` and wider mobile screens use two columns for common four-option questions.
- Mobile review order is recipes first, dinner-plan summary second. Desktop/tablet keep their existing two-column review composition.
- Selected states should remain consistent across onboarding cards and inputs: one green border, one soft green tint, one check/radio marker.

## Breakpoints And Layout Intent

### Desktop

- Width target: `1200px+`; validated at `1440x1024`.
- Layout: persistent left sidebar, centered onboarding/dashboard surface, optional right-side support panels.
- Onboarding sidebar is intentionally simplified to only the HomeCook logo and brand so setup does not imply the app is already fully usable.
- Onboarding uses a two-column card:
  - Left column: title, helper copy, grouped questions, option cards, and footer actions.
  - Right column: compact cooking illustration only; the live `Setup so far` summary was removed to reduce visual competition.
- Dashboard uses:
  - Left nav with `Onboarding flow`, `UX rationale`, and reset affordance.
  - Main recipe/filter content.
  - Right saved-recipes dock collapsed by default and opened by the vertical `Saved` handle.

### Tablet

- Width target: `768px–1199px`; validated at `1024x768`.
- Layout: compact left rail with text labels because the current static nav markup does not include icon tokens for a safe icon-only rail.
- Dashboard remains one main column plus a slim saved dock handle.
- Onboarding is longer-form and scrollable rather than squeezed into the desktop two-column structure.

### Mobile

- Width target: `<768px`; validated at `390x844`.
- Layout: sticky topbar with hamburger menu, HomeCook brand, and setup/saved status.
- Onboarding keeps the hamburger menu available and does not show dashboard tabs before profiling is complete.
- Onboarding option groups are responsive: `<360px` keeps one card per row; `360px–767px` uses two columns so four-option prompts become a 2x2 grid.
- Review step order is intentionally mobile-specific: intro copy, recipe carousel, then `Your first dinner plan`. The animated cooking illustration is hidden on mobile review to reduce vertical churn and avoid a decorative frame before recipes.
- Dashboard uses two tabs: `Dashboard` and `Saved recipes`.
- Saved recipes are shown as a mobile tab instead of a right-side dock.

## Onboarding Flow

### Screen 0: Welcome

- Title: `What does cooking look like for you this week?`
- Purpose: set low commitment, communicate setup effort, and preview payoff.
- Progress status: `0/4` with a single compact progress system.

### Screen 1: Cooking Routine

- Title: `How does home cooking fit your week right now?`
- Questions: cooking frequency, preferred cooking style, and dinner window.
- Dinner-window helper: `Including prep and cleanup time.`
- Design rationale: these all describe cooking capacity, routine, and available time.

### Screen 2: Recipe Support

- Title: `How much support should your recipes give you?`
- Questions: skill level and instruction style.
- Design rationale: these control recipe guidance, instruction density, and confidence support.

### Screen 3: Food Boundaries

- Title: `What should recommendations respect first?`
- Questions: dietary restrictions, ingredient limit, and default servings.
- Restriction logic: multi-select is allowed; `None` clears other restrictions, and selecting any restriction clears `None`.
- Default servings: eight radio-style buttons for 1–8 servings.
- Design rationale: these affect recipe filtering and recommendation constraints.

### Screen 4: Review Recipe

- Title: `Review your first recipe`
- Shows:
  - Summary chips from prior answers.
  - Preference-based recipe category tabs.
  - A two-card carousel of starter recipes.
  - Explanation chips for why recipes fit.
  - Primary CTA: `Save recipe`.
  - Secondary CTA: `Edit preferences`.
- Carousel behavior: tabs are interactive, follow scroll position, auto-rotate without arrows, and pause for 6 seconds after user interaction.
- Saved-card behavior: a saved review recipe shows a check icon and `Added to your grocery list`, reinforcing the grocery-list payoff instead of only saying `Saved`.
- Saved-banner behavior: the `Recipe saved.` notice appears as a slim top banner inside the review body before the recipe carousel, and the review body scroll resets to the top so the banner is visible immediately after save.
- After saving, a small cook-day nudge appears with `Tonight`, `Tomorrow`, `This weekend`, and `Next week`; `Tomorrow` is the default.
- The footer handoff button reads `Open dashboard`; saving a recipe is encouraged but optional.
- Mobile review layout prioritizes the recipes above the plan summary and removes the decorative cooking animation. This is scoped under the mobile breakpoint so desktop remains a two-column review layout.
- Handoff behavior: once `Open dashboard` is clicked, the flow panel is hidden, `data-dashboard-handoff="welcoming"` is set only while the welcome overlay is active, and `renderDashboard()` clears handoff before syncing the dashboard. This prevents stale review content and old dashboard grid rules from painting for a frame.

## Dashboard Components

### Simple Filters

- Primary dashboard mode.
- Shows mood/preset cards:
  - `Low commitment`
  - `Something spicy`
  - `Gym meal-plan`
  - `Family-friendly`
  - `Pantry rescue`
- Presets map to advanced filter selections while preserving reversibility.
- UX principle: progressive disclosure; users can start from intent instead of parsing every filter.

### Advanced Filters

- Secondary dashboard mode.
- Exposes practical controls such as cook time, effort, ingredient count, skill level, dietary restriction, servings, and sorting.
- Choosing an advanced filter switches the preset state to custom.

### Saved Recipes

- Desktop/tablet: saved dock is collapsed by default and opens from the right-side handle.
- Mobile: saved recipes live in a dedicated tab.
- Saved list includes search and preset filtering.

### Reset Experience

- Reset is available from the drawer/sidebar.
- Started onboarding screens keep reset in the left panel so users can restart without waiting for the dashboard, while the card footer stays focused on Back and dashboard handoff.
- It clears local app state and returns the user to onboarding.
- This is intentionally visible so designers and testers can replay onboarding without clearing browser storage manually.

## Visual And Interaction States

### Option Cards

- One selected-state system is used across onboarding cards:
  - green selected border,
  - soft green tint,
  - single circular check/radio marker,
  - no section-specific selected colors.
- Decorative food icons inside option cards were removed because they competed with the selected marker.

### Progress

- Uses one primary progress pattern at a time.
- Desktop onboarding uses `Step X/4` plus a simple solid progress bar.
- The bar transitions from calmer grey/green early in setup toward orange as later steps build anticipation.

### Illustrations

- Illustrations are supportive, not dominant.
- Desktop keeps a compact right-column cooking illustration.
- Mobile/tablet can show the cooking illustration as a scannable visual break before questions.
- Food celebration assets exist in `assets/food-icons-celebration.svg` and `assets/onboarding-cooking-stage.svg`.
- Static CSS/JS references in `index.html` use a version query during prototype iteration so local browsers do not keep stale assets after quick UI changes.

## Recent Fixes From Exhaustive Audit

- Fixed tablet reset control showing as a blank button by overriding hidden text from compact rail rules.
- Fixed desktop onboarding screens where grouped cards were previously clipped under the footer.
- Fixed desktop onboarding grid rows stretching and creating poster-like vertical gaps.
- Fixed desktop review screen where `Save recipe` and `Edit preferences` were below the fold.
- Fixed mobile onboarding transitions that scrolled the topbar/hamburger out of view.
- Fixed mobile topbar copy during onboarding to show setup progress instead of `0 saved`.
- Removed duplicate blank decorative icons from onboarding option cards.
- Restored grouped onboarding screens and uses compact dinner-window preset cards inside the routine screen.
- Added grouped-screen auto-progress once all answers on a screen are selected.
- Replaced the servings dropdown with eight radio-style option cards.
- Made saving a review recipe optional before opening the dashboard.
- Added a tabbed two-card review recipe carousel with a 6-second user-interaction pause.
- Added explicit dinner-window helper text under the question.
- Changed review recipe saved-state copy to `Added to your grocery list` with the saved check marker.
- Changed the saved-recipe notice from a large decorative card into a simple top banner on the review screen.
- Added static asset versioning to avoid stale local CSS/JS during prototype refreshes.
- Confirmed restriction multi-select behavior and `None` clearing behavior.

## Code Architecture Notes

### Main Files

- `index.html`: static shell, topbar, drawer, onboarding page, and rationale page markup.
- `app.js`: state management, onboarding rendering, dashboard rendering, filter logic, saved recipes, and reset behavior.
- `styles.css`: responsive layout, visual system, dashboard, onboarding, and breakpoint-specific overrides.
- `docs/onboarding-rationale.md`: design rationale record for onboarding/dashboard decisions.

### Important State

- Storage key: `homestart-onboarding-v1`.
- Core state fields include:
  - `started`
  - `completed`
  - `answeredSteps`
  - onboarding answers such as `frequency`, `cookingStyle`, `timeWindow`, `skill`, `guidance`, `restrictions`, `ingredientLimit`, `servings`
  - dashboard fields such as `dashboardPreset`, `filter`, `savedRecipes`, `savedPresetFilter`, `savedSearch`
- Reset path calls `resetExperience()` and returns to welcome onboarding.

### Known Architecture Risks

- `app.js` is monolithic and DOM-coupled; future feature work should consider extracting state normalization, onboarding renderers, and dashboard renderers into smaller modules.
- `loadState()` still has a fragile fallback behavior if a stored JSON value is corrupt.
- Some navigation click handling depends on data attributes and button structure; keep `data-view`, `data-reset-state`, and `data-dashboard-tab` stable.
- The CSS has accumulated multiple breakpoint layers. Prefer adding final scoped overrides only when necessary, and remove obsolete rules when doing larger refactors.

## E2E And Visual QA

### Validated Breakpoints

- Desktop: `1440x1024`
- Tablet: `1024x768`
- Mobile: `390x844`

### Current QA Baseline

- Harness: no Playwright; local Node static server plus headless Chrome/CDP.
- Historical report path: `/tmp/homestart-e2e-audit/audit-report.json`
- Historical screenshot folder: `/tmp/homestart-e2e-audit`
- The historical automated audit reached `0` failures and `49` screenshots, but future agents should treat it as a baseline artifact, not a fresh pass for newly changed UI.
- After the most recent grouped onboarding change, lightweight validation passed with `node --check app.js`.
- Historical manual in-app browser checks confirmed the removed `Setup so far` card, onboarding reset, and post-save cook-day nudge at `http://127.0.0.1:8013/?qa=reset-final`.

### Covered Flow

- Welcome state.
- Onboarding setup screens 1–8 and review screen 9.
- Option selection visual states.
- Restriction multi-select and `None` clearing behavior.
- Servings option cards.
- Review before save.
- Save recipe.
- Review after save.
- Dashboard handoff.
- Simple filters.
- Advanced filters.
- Preset persistence.
- Desktop/tablet saved dock.
- Mobile saved tab.
- UX rationale page.
- Reset back to onboarding.
- Horizontal overflow checks for all captured states.

### QA Warning For Future Agents

- Do not reuse stale assertions that expect one-question auto-advance screens or a dinner-window range slider; the current setup uses grouped question screens.
- Do not count the removed `Setup so far` card as missing UI; its removal is intentional.
- If changing responsive layout, inspect screenshots for all three breakpoints before claiming success.
- If changing onboarding flow, verify reset, back, setup auto-progress, optional save recipe, edit preferences, carousel tabs, and dashboard handoff.

### Manual Screenshot Checks

- Desktop onboarding screens: grouped questions fit without footer overlap.
- Desktop option screens: selected-state feedback remains readable before auto-progress.
- Desktop food boundaries: restriction choices, ingredient choices, and eight serving cards are visible together.
- Desktop review: category tabs, two recipe cards, `Save recipe`, and `Edit preferences` are visible before dashboard handoff.
- Tablet dashboard: reset button label is readable.
- Mobile onboarding: hamburger/topbar remains visible.
- Mobile dashboard: dashboard/saved tabs and simple presets are visible.

## Future Agent Checklist

- Start by reading this file, `STEERING.md`, and `docs/onboarding-rationale.md`.
- Before changing UI, identify which breakpoint owns the issue.
- Before staging, run `git status --short --branch` and verify changes are limited to the requested scope.
- After changing UI, run:
  - `node --check app.js`
  - `git diff --check`
  - no-Playwright visual E2E or internal browser screenshots across desktop/tablet/mobile.
- Visually inspect at least one onboarding screen, one review screen, one dashboard screen, and one saved-recipes state per affected breakpoint.
- If pushing, push to the `khushboo` remote unless the user explicitly requests the original Vaibhav remote.
- Update this file when a system-level behavior, breakpoint rule, or component contract changes.
