# HomeStart Cooking App Documentation

## Current Prototype Scope

HomeStart is a responsive cooking-onboarding and recipe dashboard prototype. The current experience is optimized around a low-commitment user story:

- A user wants help choosing realistic weeknight dinners without feeling locked into a permanent profile.
- Onboarding collects only the few preferences needed to recommend one starter recipe.
- The dashboard converts onboarding answers into simple presets first, then exposes advanced filters when the user wants more control.
- Saved recipes are always recoverable through the sidebar/dock/tab pattern, depending on breakpoint.

## Breakpoints And Layout Intent

### Desktop

- Width target: `1200px+`; validated at `1440x1024`.
- Layout: persistent left sidebar, centered onboarding/dashboard surface, optional right-side support panels.
- Onboarding sidebar is intentionally simplified to only the HomeStart logo and brand so setup does not imply the app is already fully usable.
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
- Layout: sticky topbar with hamburger menu, HomeStart brand, and setup/saved status.
- Onboarding keeps the hamburger menu available and does not show dashboard tabs before profiling is complete.
- Dashboard uses two tabs: `Dashboard` and `Saved recipes`.
- Saved recipes are shown as a mobile tab instead of a right-side dock.

## Onboarding Flow

### Screen 0: Welcome

- Title: `What does cooking look like for you this week?`
- Purpose: set low commitment, communicate setup effort, and preview payoff.
- Progress status: `0/4` with a single compact progress system.

### Screen 1: Cooking Routine

- Title: `How does home cooking fit your week right now?`
- Questions:
  - `How often do you cook dinner at home?`
  - `How would you prefer cooking to work for you?`
  - `What dinner window actually works?` uses a double-thumb range slider with a default `20-40 min` window.
- Design rationale: these all describe capacity, routine, and time availability, so grouping them avoids one-question-per-screen friction.

### Screen 2: Recipe Support

- Title: `How much support should your recipes give you?`
- Questions:
  - `Which skill level feels closest?`
  - `What instruction style would feel best at first?`
- Design rationale: both answers affect instruction density, confidence support, and recipe checkpoint detail.

### Screen 3: Food Boundaries

- Title: `What should recommendations respect first?`
- Questions:
  - `Any hard dietary restrictions?`
  - `How many ingredients feels manageable?`
  - `Default servings`
- Restriction logic:
  - Multi-select is allowed for restrictions.
  - Selecting `None` clears all other restrictions.
  - Selecting any restriction clears `None`.

### Screen 4: Review Recipe

- Title: `Review your first recipe`
- Shows:
  - Summary chips from prior answers.
  - Recommended starter recipe.
  - Explanation chip for why it fits.
  - Primary CTA: `Save recipe`.
  - Secondary CTA: `Edit preferences`.
- After saving, a small cook-day nudge appears with `Tonight`, `Tomorrow`, `This weekend`, and `Next week`; `Tomorrow` is the default.
- The footer handoff button reads `Open dashboard` and remains disabled until a recipe is saved.

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
- Onboarding screens also include a visually secondary `Reset setup` action at the bottom-left of the onboarding card.
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

## Recent Fixes From Exhaustive Audit

- Fixed tablet reset control showing as a blank button by overriding hidden text from compact rail rules.
- Fixed desktop onboarding screen one where grouped cards were clipped under the footer.
- Fixed desktop onboarding grid rows stretching and creating poster-like vertical gaps.
- Fixed desktop review screen where `Save recipe` and `Edit preferences` were below the fold.
- Fixed mobile onboarding transitions that scrolled the topbar/hamburger out of view.
- Fixed mobile topbar copy during onboarding to show setup progress instead of `0 saved`.
- Removed duplicate blank decorative icons from onboarding option cards.
- Replaced dinner-window option cards with a compact range slider so time feels adjustable instead of categorical.
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

### Final Audit Result

- Harness: no Playwright; local Node static server plus headless Chrome/CDP.
- Report path: `/tmp/homestart-e2e-audit/audit-report.json`
- Screenshot folder: `/tmp/homestart-e2e-audit`
- Final result: `0` failures, `49` screenshots.

### Covered Flow

- Welcome state.
- Onboarding screens 1–3.
- Option selection visual states.
- Restriction multi-select and `None` clearing behavior.
- Servings dropdown.
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

### Manual Screenshot Checks

- Desktop onboarding screen 1: grouped cards fit without footer overlap.
- Desktop onboarding screen 2: grouped questions stack tightly without grid stretching.
- Desktop food boundaries: multi-select and servings are visible.
- Desktop review: `Save recipe` and `Edit preferences` are visible before the long recipe card.
- Tablet dashboard: reset button label is readable.
- Mobile onboarding: hamburger/topbar remains visible.
- Mobile dashboard: dashboard/saved tabs and simple presets are visible.

## Future Agent Checklist

- Start by reading this file, `STEERING.md`, and `docs/onboarding-rationale.md`.
- Before changing UI, identify which breakpoint owns the issue.
- After changing UI, run:
  - `node --check app.js`
  - `git diff --check`
  - no-Playwright visual E2E or internal browser screenshots across desktop/tablet/mobile.
- Visually inspect at least one onboarding screen, one review screen, one dashboard screen, and one saved-recipes state per affected breakpoint.
- Update this file when a system-level behavior, breakpoint rule, or component contract changes.
