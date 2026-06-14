# HomeStart Onboarding Rationale

This document is the source of truth for the prototype decisions. The interface should be judged against this thinking, not the other way around.

## Product Goal

Design a 4-screen desktop onboarding flow and dashboard handoff that helps a responsive cooking web app understand a user's current cooking habits, preferences, and skill level so it can personalize recipes, instructions, filters, saved recipes, and cooking guidance without overwhelming them.

This pass is intentionally desktop-only. Mobile and tablet onboarding refinements are deferred unless already documented in a separate pass.

The business success path is:

1. User completes onboarding.
2. User saves at least one recipe.
3. User cooks at least once in the first 7 days.

## Problem Framing

Christina is not blocked by a lack of recipes. She is blocked by uncertainty, time pressure, and low trust that a recipe will fit her real weekday. A generic recipe feed can increase intimidation because it asks her to evaluate too many options before she knows what "doable" looks like.

The onboarding problem is therefore:

- Help the app understand what "doable" means for this user.
- Convert vague goals into recommendation constraints the product can support in the current release.
- Create an early success path that is smaller than "become a home cook."
- Separate current cooking frequency from the user's preferred effort pattern. A user who cooks 1-2 nights may not want a steadier rhythm; they may want one intentional prep session that protects the rest of the week.
- Separate the user's typical time range from the time they have for a selected cooking window. A usual 20-45 minute range should not prevent the app from helping when a planned meal only has 10 minutes.

## User Goals

- Feel that the app understands her current baseline without judgment.
- Find a recipe that fits a workday, not an ideal weekend.
- Know whether the recipe is within her skill level before committing.
- Avoid recipes that violate restrictions, household needs, or strong dislikes.
- Save one realistic recipe and understand the next step.
- Choose a cooking pattern that matches how she wants to spend effort, such as quick dinners, batch prep, prep shortcuts, or flexible fallbacks.
- Adjust recommendations by the selected cooking window without losing broader saved options.

## Product Goals

- Increase onboarding completion by keeping the flow short and concrete.
- Collect enough signal to personalize skill-based recipes and step-by-step guidance.
- Drive the first meaningful action: saving a recipe.
- Set up the first 7-day cook attempt through a small, credible commitment.
- Avoid asking for data the current product cannot use.
- Keep personalization editable after onboarding through simple presets and advanced filters.
- Keep saved recipes visible enough to bridge discovery, grocery planning, and the first cook.
- Keep setup recoverable so users and testers can replay onboarding or clear stale personalization.

## Current UX Direction

The original rationale still applies: HomeStart should lower intimidation and get the user to one realistic first recipe. The redesigned experience expands the handoff after onboarding so users do not feel locked into a single profile or abandoned in a generic catalog.

| Prior iteration | Updated experience | Why it changed | User impact |
| --- | --- | --- | --- |
| Rationale access looked like Settings | The left nav and mobile drawer label the destination as UX rationale, with Home remaining first | Stakeholders need to inspect design reasoning without confusing it with account preferences | Reviewers can find rationale quickly while the cooking flow remains primary |
| Onboarding could feel like a preference survey | A welcome screen frames setup as a short, low-stakes routine check with a final review screen | Low-confidence cooks need to know the commitment is small before answering questions | Users see 3 grouped screens plus 1 review screen and a fast path to a first recipe |
| The first headline felt more functional than reassuring | The desktop welcome headline becomes "What does cooking look like for you this week?" | The first line should meet a low-confidence cook with natural weekly language | Users understand setup starts from their real week, not a perfect profile |
| Progress competed with itself | The desktop flow now shows one compact progress system only: `Step 1 of 4` and a single bar | Category pills, separate counters, and duplicate tracks made state decoding difficult | Users can track progress from one place without visual bookkeeping |
| Stage labels could sound vague, such as "Pantry Check" | Labels now match task groups: Cooking routine, Recipe support, Food boundaries, Review recipe | Old labels implied actions that did not match the question intent | Users know which decision area they are completing before reading options |
| Desktop onboarding put too much in one visual stack | Decisions and questions stay on the left; only a compact illustration sits on the right | Large screens can support context, but context should support, not compete with, the decision lane | Users decide faster because grouped questions are co-located and support is glanceable |
| The setup sidebar exposed full navigation too early | During desktop onboarding, the sidebar is simplified to brand/logo only | Full navigation implies the app is usable before setup is complete and competes with the setup task | Users stay oriented in setup without being pulled into unfinished app areas |
| Selected states and decoration varied by surface | Selected cards, chips, and actions use one state language within a minimal theme | Decoration should confirm decisions, not add another layer of interpretation | The interface feels calmer, and the decision-first hierarchy is easier to scan |
| Questions exposed too many options | Each prompt still limits to three primary choices, with grouped questions replacing one-question-per-screen friction | Grouping lowers navigation overhead while keeping each decision legible | Users progress through low-stakes decisions without feeling like a quiz |
| Single-screen question flow added extra navigation friction | Grouping by decision category removes repeated progress resets between isolated questions | Each grouped screen handles related choices and ends with one clear next step | The user can process low-stakes onboarding content with less churn |
| Progress read-out was fragmented | The system moved to a 4-step category flow and no longer uses Start/Window/Guidance/Food/Timing/Save pill tabs | Milestone names are now stable and aligned to screen purpose | Users understand which screen they are on from one compact indicator |
| Gradient progress implied mixed status | Progress should use a solid grey-to-orange intensity shift with one one-time ping per milestone | Solid progress is easier to read, and a ping acknowledges completion without continuous motion | Users get feedback without distraction |
| Generic confetti felt detached from cooking | Saved-recipe celebration should use local food icons and cooking illustration language | Delight should reinforce the product milestone, not feel like unrelated party decoration | The milestone feels specific to HomeStart |
| "Right now" language overfit immediate cooking | Copy shifts to "this cooking window," "next dinner," and "planned meal" | Users may be planning groceries, lunch, or a future weekday meal | Recommendations work for immediate and future planning |
| Motion could become inaccessible | Animations use state-driven CSS/WAAPI-style patterns with reduced-motion fallbacks | The app is vanilla, and motion should respect user preference settings | Motion-sensitive users are not forced through pings or icon bursts |
| Recommendations could appear fixed by setup answers | The dashboard starts with simple presets and reveals advanced filters on demand | Time, energy, and cooking goals change by session | Users can choose a 10-minute rescue meal for one cooking window without erasing a meal-prep preference |
| Saved recipes were mostly represented as a count | Desktop/tablet use a saved recipes dock; mobile uses a saved tab pattern | The saved recipe is the bridge between discovery, groceries, and cooking | The first commitment remains visible across planning contexts |
| Dashboard copy did too much explaining | The dashboard should reduce text and lead with actions, recipe photos, saved state, and match reasons | Onboarding can explain the model; the dashboard should prove value visually | Users can scan more options without losing why each recipe fits |
| Visual assets felt inconsistent | Recipe visuals shift toward stock/free photography, and UI glyphs use one Lucide icon set | Photos make meals feel real, while consistent icon weight fixes mixed symbols | The product feels more polished and less placeholder-like |
| Rows and cards were too spacious | The compact-density pass reveals more rows per viewport while preserving tap targets | Cooking decisions benefit from comparison, but controls still need to be forgiving | Users see more usable recommendations without cramped interactions |
| Stale personalization was hard to recover from | A visible reset affordance returns users to onboarding | Feedback, demos, and changing needs require a quick way back to setup | Users and testers can start fresh without clearing browser storage |

## Responsive Strategy

| Breakpoint | Navigation | Dashboard layout | Saved recipe access |
| --- | --- | --- | --- |
| Desktop | During setup, brand/logo-only sidebar; after setup or on rationale pages, persistent nav can expose Home and UX rationale | Main recipe area, readable advanced filter panel, and space for explanations | Docked saved recipes panel beside recommendations |
| Tablet | Left nav remains available with compact spacing and preserved tap targets | Simple filters stay prominent; tighter rows keep more recipes visible before panels stack | Collapsible dock or stacked saved section |
| Mobile | Top menu opens the same drawer destinations, including UX rationale | One-column flow, sticky actions, compact result rows, simple presets first, advanced filters behind disclosure | Dedicated saved tab pattern instead of a side dock |

This strategy keeps the same information architecture across device sizes while changing density. Desktop can show context side by side. Tablet and mobile should tighten vertical spacing enough to reveal more rows per viewport while preserving comfortable tap targets and saved-recipe access.

The current refinement is desktop-only. It does not claim a new mobile onboarding layout; mobile decisions should be handled in a later pass.

## Desktop Onboarding Layout Model

Desktop setup uses a two-column pattern to keep focus and context separate:

- The left column owns the decision surface: headline, helper copy, grouped question cards, and sticky bottom actions (Back + Continue/Save).
- The right column remains compact: a small cooking illustration only. The live `Setup so far` card was removed because it repeated answers before they were useful and competed with the question lane.
- Progress is one system only: `Step 1 of 4`, supported by a compact progress bar with no extra category pills.
- Task labels reflect grouped screen purpose: Cooking routine, Recipe support, Food boundaries, Review recipe.

Grouping the screens by decision category reduces progress noise and one-question-per-screen friction. Low-stakes onboarding prompts like cooking frequency, skill fit, and serving size are collected with related context instead of forcing a long queue of isolated micro-questions.

The setup sidebar follows the same rule. During desktop onboarding it should show only the HomeStart brand/logo. Full nav returns after setup or on rationale/dashboard screens. Full navigation during setup can imply the app is fully usable too early and can split attention from the focused decision flow.

## Primary User Assumptions

- The target user is motivated but low-confidence. Christina wants to cook more to save money and eat healthier, but recipes feel risky and effortful.
- Most early users are beginners, so onboarding should avoid culinary jargon and judgmental language.
- A weekday dinner window is usually 30-45 minutes total, including cleanup.
- Early personalization should be good enough to create a first win, not a perfect preference profile.
- Users may not be able to define "healthy" clearly, so the app needs concrete translation choices.
- Hard dietary restrictions are trust-critical and should be separated from softer preferences.
- Meal prep can solve weeknight effort while creating a separate restart problem: the user enjoys several low-effort days, then dreads the next large prep session because the effort feels distant until it is due again.

## UX Hypotheses

- If onboarding begins with the user's current routine instead of an aspirational cooking goal, users will feel less judged and be more likely to complete the flow.
- If the app asks for total dinner time including cleanup, recommendations will feel more realistic and reduce first-week recipe abandonment.
- If the app captures why recipes usually fail, the step-by-step experience can address the user's actual source of anxiety.
- If each grouped screen presents 2-3 related onboarding questions, users will be more likely to continue than if they answer one decision per page.
- If screens are grouped by routine category, users will build a complete mental model before moving to the next stage.
- If progress is shown as a single `Step 1 of 4` bar, users will know where they are without reconciling pills, counts, and extra steps.
- If progress uses a solid grey-to-orange intensity shift plus a one-time ping, feedback will feel responsive without implying mixed states or constant motion.
- If saved-recipe celebration uses food icons instead of generic confetti, the milestone will feel connected to cooking.
- If the app uses planning-friendly language, users can plan a future meal or grocery trip without feeling the app only works for immediate cooking.
- If the first milestone is "cook once in 7 days," the user can form a habit without feeling behind on day one.
- If onboarding asks how the user wants cooking to work, the app can distinguish weekly quick dinners from batch prep and avoid pushing the wrong habit model.
- If onboarding captures what makes cooking hard to restart, the app can recommend lower-reset recipes, grocery-light options, or smaller batch plans before the user abandons the second cycle.
- If onboarding captures a typical time range and the recipe surface asks for the selected cooking window, the app can stay useful when one planned meal has 10 minutes and another has 45 minutes.

## Design Principles

- Start from current behavior, not ideal behavior.
- Do not infer intent from frequency. Frequency is a baseline; effort pattern is a separate preference.
- Do not make onboarding time a hard lock. Treat it as a usual range, then re-rank by the user's current context.
- Ask concrete questions before subjective taste questions.
- Cap each onboarding question at three primary choices so the user compares a small set of meaningful paths.
- Keep two-column desktop structure: active decision on the left, compact support context on the right, with sticky actions at the bottom.
- Show one progress pattern only: `Step X of 4` plus a compact bar. No Start/Window/Guidance/Food/Timing/Save pill tabs.
- Group low-stakes onboarding questions by decision category to reduce one-question-per-screen friction.
- Keep one selected-state pattern across cards, chips, and inputs so state is readable at a glance.
- Use task labels that describe the decision being made; avoid decorative labels that imply work the user is not doing.
- Use four milestones and one compact progression model instead of raw numeric step noise.
- Use solid progress intensity from grey to orange. Avoid gradients that imply multiple statuses.
- Use one-time milestone pings that grow slightly by stage, then stop.
- Keep the setup sidebar brand-only on desktop until onboarding is complete.
- Use consistent selected states across cards, chips, inputs, and actions.
- Favor a minimal, decision-first theme: lower decoration, calmer surfaces, and fewer simultaneous visual accents.
- Make uncertainty acceptable with "not sure" choices.
- Separate hard constraints from preferences.
- Show the payoff immediately after asking for personal data.
- Keep every recommendation tied to a reason the user already gave.
- Use simple presets before advanced filters so users can act without understanding every filter dimension.
- Make presets temporary modes, not permanent identity labels. A user can be in "quick rescue" for one cooking window and "prep once" this weekend.
- Keep advanced filters available for control, but hide them until the user needs precision.
- Use light gamification only after meaningful action. A saved recipe can trigger a toast, food-icon burst, or small milestone; onboarding answers alone should not feel like a game.
- Keep saved recipes visible after the first save so the user's commitment does not disappear into a count.
- Keep reset visible so users can replay onboarding during feedback/testing or recover from stale personalization.
- Reduce dashboard copy after onboarding; let recipe photos, match reasons, saved state, and clear actions carry the proof.
- Use stock/free food photography for recipe evidence and a single Lucide icon family for UI glyphs.
- Compact components to reveal more rows per viewport while preserving tap targets.
- Respect reduced motion by simplifying pings, progress transitions, and celebration travel when user settings request it.

## Research Signals And Design Implications

| Signal | UX implication | Product decision |
| --- | --- | --- |
| 65% identify as beginner cooks | Avoid skill shame and hidden assumptions | Ask skill level in plain language and default to beginner-safe recipes |
| 72% say time is biggest blocker | Time is contextual and changes by meal plan | Ask for a usual time range, then ask for the selected cooking window when showing recipes |
| 54% abandon recipes halfway through | The issue is often execution, not discovery | Capture abandonment reason and personalize instruction detail |
| Average weekday constraints are 30-45 minutes including cleanup | Recipe estimates need to include effort, not just cook time | Use "including cleanup" in the time range question |
| 41% want healthier but cannot define it | "Healthy" needs translation | Ask what healthier means: vegetables, lighter takeout swaps, protein, or not sure |
| 33% want meals under 5 ingredients | Grocery simplicity reduces friction | Ask ingredient tolerance and surface ingredient count on recommendations |
| 28% cook for more than one person | Serving size affects recommendation quality | Capture household size as a lightweight numeric field |
| 22% have hard dietary restrictions | Bad recommendations break trust | Ask restrictions directly and filter first-week recipes |
| Qualitative meal-prep insight | Batch cooking can reduce weeknight work but create dread before the next prep cycle | Ask preferred cooking pattern and restart friction separately from frequency |

## Pain Points And Opportunities

| Pain point | User risk | Product opportunity |
| --- | --- | --- |
| Recipes feel written for people who already know how to cook | The user gives up before starting | Use skill level and guidance preference to tune instruction detail |
| "30-minute recipe" often ignores prep and cleanup | The user feels misled | Ask for a usual total dinner-window range and prioritize low-cleanup recipes |
| A fixed time choice overfits the user to one day | The app may show 30+ minute recipes when the selected cooking window only has 10 minutes | Use a usual range picker in onboarding and a cooking-window picker on the recommendation screen |
| Time and low energy are too broad as blocker answers | The app learns the obvious but not where to intervene | Treat time and energy as limits, then ask where dinner breaks down: deciding, ingredients, prep, cooking flow, or cleanup |
| Healthier is vague | The user cannot choose confidently | Translate "healthy" into concrete directions like more vegetables or lighter takeout swaps |
| Grocery lists feel long or unfamiliar | The user delays cooking | Capture ingredient tolerance and prefer short lists early |
| Dietary misses break trust | The user will not save or cook | Ask hard restrictions directly before showing recipes |
| Too many choices create decision fatigue | The user browses but saves nothing | Limit onboarding prompts to three primary choices and end with one clear save action |
| Meal prep hides effort until the next cycle | The user may succeed once but avoid repeating | Capture restart friction and avoid assuming batch prep is always the best answer |
| Vague copy like "less friction" does not explain the product promise | The user cannot tell what the app will actually improve | Use concrete language: planning, cleanup, decisions, grocery reset, step clarity |

## Journey Map

The useful journey is not just onboarding. The business metric requires a saved recipe and a cooked meal within 7 days, so the journey must continue through preparation and execution.

| Bucket | What happens | User question | Product job | Success signal |
| --- | --- | --- | --- | --- |
| Start | User opens the web app, reads the promise, and decides whether to begin | "Is this actually for someone like me?" | Make the app feel practical, not chef-like or aspirational | User starts onboarding |
| Calibrate | User shares habit baseline, preferred cooking pattern, time, energy-sensitive breakdown point, skill, and food guardrails | "What can I realistically handle?" | Learn what doable means for this user without over-surveying | User completes setup questions |
| Recommend | App shows a small set of personalized starter meals | "Which option fits the next cooking window?" | Show explainable options, not a broad feed | User reviews recommendations |
| Commit | User saves one recipe and sees the next step | "Am I actually going to do this?" | Turn browsing into a low-pressure commitment | User saves at least one recipe |
| Prepare | User generates a grocery list, checks pantry items, and shops or orders missing ingredients | "What do I need before I can cook?" | Remove the logistical barrier between intent and action | User uses grocery list |
| Cook | User returns, opens the saved recipe, follows steps, cleans up, and confirms completion | "Can I finish without getting lost halfway?" | Guide clearly through execution and reinforce the first win | User cooks once within 7 days |

The 4-screen onboarding set sits in Calibrate and flows into Recommend, but it must intentionally support Commit, Prepare, and Cook.

## Behavioral Model

| Behavior signal | What it reveals | Design response |
| --- | --- | --- |
| Cooking frequency | Current baseline, not desired habit | Use neutral copy and avoid assuming the user wants a steadier rhythm |
| Preferred cooking pattern | How the user wants to distribute effort | Offer quick dinners, meal prep once, prep shortcuts, or flexible fallbacks |
| Usual time range | The time window the app should assume by default | Rank recipes inside the normal range without treating it as a hard filter |
| Time available for selected cooking window | The session or future-planning constraint | Re-rank recipes for that plan and surface 10-minute fallback options when needed |
| Hard-night fallback | The behavior cooking has to beat when the user is tired or stressed | Bias recommendations toward takeout-style swaps, filling low-effort meals, or pantry fallbacks |
| Restart friction | Why the second cycle may fail | Recommend smaller batch plans, pantry-light meals, or decision-light defaults |
| Dinner fallback | The behavior the app is replacing | Frame recommendations around the user's real substitution pattern |
| Abandonment reason | Where recipes break down | Tune step-by-step detail and recipe complexity |

## Capture Model

| Data captured | Why it matters | Product feature it feeds |
| --- | --- | --- |
| Cooking frequency | Sets habit baseline and expectation level | Early recommendation pacing |
| Preferred cooking pattern | Shows whether the user wants quick same-day cooking, batch prep, prep shortcuts, or fallbacks | Recommendation ranking and first-week plan framing |
| Dinner fallback | Reveals the behavior the app is trying to beat on a hard night | Recipe ranking, starter-plan summary, and match reasons |
| Usual time range | Highest-confidence blocker from beta data, captured without overfitting to one moment | Default recipe ranking and grocery list scope |
| Time available for selected cooking window | Captures session or future-planning constraints | Plan-level re-ranking without locking users out |
| Breakdown point | Identifies where time and energy are being lost | Decision-light, pantry-light, prep-shortcut, step-guided, or cleanup-aware recommendations |
| Restart friction | Reveals why the user may avoid the next cook/prep cycle | Batch size, grocery-list size, and decision-light defaults |
| Skill level | Determines difficulty ceiling | Skill-based recipe recommendations |
| Abandonment reason | Explains where help is needed | Step-by-step instruction design |
| Guidance preference | Controls instruction density | Step-by-step recipe mode |
| Dietary restrictions | Trust-critical filter | Recipe eligibility |
| Health intent | Makes "healthy" actionable | Recipe ranking |
| Servings | Household fit | Grocery quantities |
| Ingredient tolerance | Reduces shopping and prep friction | Recipe ranking and grocery list generation |
| Avoid-if-possible foods | Soft preference | Future ranking and filtering |

## Dashboard Filter Model

The dashboard should not expose every filter at once. It starts with simple presets that map to advanced filters and common user moments. The user can then open advanced filters to adjust the underlying choices directly. The latest pass reduces explanatory copy: onboarding can teach the model, but the dashboard should show actions, photos, match reasons, and saved state.

| Simple preset | Advanced filters it sets | Persona / moment | Product reason |
| --- | --- | --- | --- |
| Quick rescue | 10-20 minutes, beginner-safe, short ingredient list, low cleanup, strong match reasons | Rushed professional about to order takeout | Turns urgency into a narrow set of realistic options instead of a broad healthy-dinner search |
| Prep once | Batchable recipes, 3-4 servings, reheats well, grocery consolidation, restart-friction awareness | User who wants one effortful session to protect several weeknights | Supports meal prep without pretending the next prep cycle has no cost |
| Confidence builder | Beginner skill, step-by-step guidance, doneness cues, forgiving timing, familiar techniques | User who has abandoned recipes halfway through | Ranks recipes by execution clarity, not just popularity |
| Pantry fallback | Flexible ingredients, shelf-stable staples, substitutions, few fresh items | User delaying dinner because shopping feels like the blocker | Keeps the app useful when the fridge is imperfect and a full grocery reset is unrealistic |

Advanced filters should include:

- Time available for the selected cooking window.
- Skill level and guidance density.
- Hard dietary restrictions.
- Ingredient count and pantry flexibility.
- Servings.
- Cleanup tolerance.
- Cooking pattern: quick dinner, prep once, prep shortcuts, flexible fallback.
- Health direction when relevant, such as vegetables, protein, or lighter takeout swaps.

Progressive disclosure reduces information overload in three ways:

1. The user first sees plain-language presets that feel like situations, not settings.
2. Advanced controls are available for correction and precision, but they do not dominate the default view.
3. Active filters should be visible as removable chips so the user can understand and undo the current recommendation logic.

Avoiding preference lock-in is critical. Onboarding answers are a starting baseline, not a contract. A user who usually has 45 minutes can still choose a 10-minute rescue preset. A user who chose meal prep can still browse a single-serving quick dinner. The app should learn from saved recipes over time instead of forcing a long taste quiz during setup.

Reset is part of this recovery model. Users need a visible way to replay onboarding during feedback/testing or clear stale personalization when their household, schedule, or food boundaries change.

## Saved Recipes Access Model

Saved recipes are not just favorites. They are the user's first commitment and the source for grocery planning, return visits, and cooking guidance.

| Context | Pattern | Why it works |
| --- | --- | --- |
| Desktop | Saved recipes dock beside recommendations and filters | Keeps the commitment visible while the user compares options or tunes filters |
| Tablet | Collapsible dock or stacked saved section | Preserves access while respecting reduced width and touch use |
| Mobile | Dedicated saved tab pattern | Avoids crowding the one-column flow while keeping the saved recipe one tap away |

The saved area should show the recipe title, cook-time fit, serving count, and next action. The next action can be "open grocery list," "cook this week," or "view steps" depending on the product state. This makes saving feel like progress, not storage.

## Visual Assets And Motion Model

The visual system should make the product feel culinary without mixing placeholder illustration styles, emoji, and uneven icon weights. Recipe surfaces should rely on stock/free food photography for visual evidence, while navigation, filters, save, and reset actions should use one consistent Lucide icon family.

Local assets still useful for onboarding tone and celebration:

- `assets/onboarding-cooking-stage.svg`: a warm cooking-stage illustration for rationale/presentation use and a future welcome/dashboard hero.
- `assets/food-icons-celebration.svg`: a local food-icon celebration strip that can replace generic confetti when a user saves a recipe.

Asset guidance:

- Prefer stock/free food photography on recipe cards and dashboard surfaces so meals feel real.
- Use one icon library for product UI to avoid mixed symbol weights.
- Reserve food-icon artwork for celebration moments, not routine navigation.

Motion guidance:

- Use state-driven CSS or WAAPI-style patterns because the app is vanilla. Do not add Motion React just for the onboarding pass.
- Treat progress as a solid intensity change from grey to orange. Avoid gradients that imply multiple states.
- Trigger one ping per completed milestone. The ping can scale slightly more by stage, then stop.
- Prefer food icon bursts for the save milestone instead of generic confetti.
- Use reduced-motion fallbacks: no scale ping, no icon travel, no looping animation, and instant progress updates.

Why reduced motion matters:

- The onboarding flow already asks anxious users to make decisions; motion should confirm choices, not add sensory load.
- Users with vestibular sensitivity should still receive state feedback through color, labels, and layout changes.
- A reduced-motion path makes the delight system safe for repeated use and easier to test.

## Proposed Flow

### Welcome + 4-screen desktop flow

Progress is always `Step X of 4` with a compact bar. This is desktop-only by design.

- Group related onboarding questions to reduce one-question-per-screen friction and reduce context switching.
- Keep each screen in one decision category; this avoids long serial micro-questions and keeps momentum high.
- Use `Back` plus one forward action in the sticky action row.

Screen structure is fixed:

### Screen 1: Cooking routine

- Cooking frequency.
- Preferred cooking mode (quick dinners, prep once, prep shortcuts, flexible fallback).
- Dinner window length.

Rationale:

This screen establishes baseline behavior first. Frequency is captured as a habit signal, while cooking mode captures effort style so the app can distinguish "when" from "how." Dinner window captures immediate context so recommendations stay realistic.

### Screen 2: Recipe support

- Skill level.
- Instruction style preference.

Rationale:

This screen collects the confidence and guidance needs that directly affect cookbook complexity, timing explainers, and doneness cues. Keeping both questions together avoids splitting one capability decision across two screens.

### Screen 3: Food boundaries

- Dietary restrictions (multi-select).
- Ingredient tolerance.
- Servings.

Rationale:

Hard constraints and practical filters stay together as one decision family. This separation protects trust and keeps the recommendation signal clean: constraints inform eligibility while setup remains editable after onboarding.

### Screen 4: Review recipe

- Summary chips showing captured constraints and preferences.
- Starter recommendation preview.
- Why this meal fits this setup.
- `Save recipe` primary action.
- `Edit preferences` secondary action returning users to the relevant category.

Rationale:

The review screen closes the loop on onboarding without introducing a fifth setup screen. The user sees what was captured, evaluates one recommendation, and acts immediately while still retaining explicit edit controls.

The review screen connects directly into dashboard context:

- A single starter recommendation, tuned from onboarding and current-window time.
- Save completion milestone with food-icon celebration and clear next action.
- Advanced controls remain available through presets/filters without forcing a full profile rewrite.

## Alternatives Considered

| Concept | Why it was rejected or deferred |
| --- | --- |
| Start with cuisine preferences | Cuisine matters, but it is less tied to the beta blockers than time, skill, and restrictions. It can be learned from saves later. |
| Ask for pantry inventory | Useful for personalization, but too high-friction for first-run onboarding and not required by the current product capabilities. |
| Build a full weekly meal plan | This may feel productive, but it raises commitment before the user has had a first win. |
| Ask for kitchen equipment | The current recipe set should avoid specialized tools. Equipment can be added once the catalog supports it. |
| Use a long taste quiz | It may improve recommendation nuance, but it conflicts with the need to reduce intimidation and avoid overwhelm. |
| Use one fixed time choice | Rejected because time is highly contextual. A fixed 30 or 45 minute selection can fail on a 10-minute day and push the user back to takeout. |
| Keep numeric stepper as decoration | Rejected because screen count does not explain the value of each question category. |
| Keep gradient progress | Rejected because the gradient looks decorative and can imply multiple statuses. Solid intensity communicates progress more clearly. |
| Use generic confetti | Rejected because the celebration should reinforce cooking and saving a recipe, not unrelated party decoration. |

## User Stories

- As a beginner cook, I want recipes matched to my skill level so I do not feel set up to fail.
- As a busy professional, I want dinners that fit my weekday time range including cleanup.
- As a busy professional, I want recommendations for a selected cooking window to adapt when I have much less or more time than usual.
- As someone trying to eat healthier, I want the app to translate my vague goal into practical recipe suggestions.
- As a household cook, I want serving size and dietary restrictions reflected immediately.
- As someone who has abandoned recipes before, I want instructions that anticipate the parts where I usually get stuck.
- As someone who prefers meal prep, I want the app to account for the effort of the next prep cycle, not just the easy days after cooking.

## Pain Points Addressed

- Intimidation from recipes that assume too much prior knowledge.
- Unrealistic recipe timing that ignores cleanup and energy level.
- Overloaded onboarding surveys that ask for too many tastes before proving value.
- Option grids that force users to compare more than three choices per question.
- One-question-per-screen flow fatigue was reduced by grouping related choices.
- Decorative numeric progress that does not explain what the app is learning.
- Generic confetti and motion that can feel detached from cooking or uncomfortable for motion-sensitive users.
- Vague health goals that do not translate into recipe decisions.
- Trust loss from ignoring dietary restrictions.
- Recipe abandonment caused by unclear timing, prep order, or doneness cues.

## Key Design Decisions

- Short task-based setup sections, each with a distinct job. This keeps cognitive load low while still capturing enough personalization signal.
- Desktop onboarding uses a single progress system: `Step 1 of 4`, compact bar, no additional pill tabs.
- The first headline is warm and weekly-context-led: "What does cooking look like for you this week?"
- Task labels name the decision being made, such as Cooking routine, Recipe support, Food boundaries, and Review recipe.
- Desktop onboarding uses a two-column pattern: decisions and questions on the left, compact illustration on the right.
- During desktop setup, the sidebar is brand/logo only so navigation does not imply the app is usable before setup is complete.
- Familiar segmented cards and chips, capped at three primary choices per question. These are faster than open-ended questions and work well on mobile.
- Grouping by decision category keeps friction low while keeping decisions actionable within each screen.
- Progress is category-based with four milestones, not a raw numeric screen count.
- Progress uses a solid grey-to-orange intensity shift plus one milestone ping, with reduced-motion fallbacks.
- Time is captured at two levels: onboarding captures the usual range, and recommendations ask for the selected cooking window.
- "Not sure" options where users may lack confidence. This preserves completion rather than forcing false precision.
- Final recommendations are limited to one primary recipe or a small explainable set. The goal is a first decision, not exhaustive discovery.
- Food-icon celebration replaces generic confetti for the saved-recipe milestone.
- Selected states use one visual language across choice cards, chips, inputs, and save actions.
- The UI theme is intentionally more minimal: lower decoration, less visual noise, and a decision-first hierarchy.
- Dashboard presets provide a simple entry point into filtering; advanced filters are available when users need more control.
- Dashboard copy is intentionally reduced after onboarding. Recipe photos, match reasons, save actions, and filters should carry the evidence.
- Reset setup is visible because users need to return to onboarding for feedback/testing and recover from stale personalization.
- Visual assets use stock/free photography for recipe evidence and Lucide for consistent UI icon weight.
- Compact-density components should reveal more rows per viewport while preserving tap targets.
- The first-week goal is intentionally small. For this audience, "cook once" is more motivating and credible than an ambitious weekly plan.
- The prototype includes a clearly labeled UX rationale page for stakeholders, but active desktop setup should keep full navigation out of the user's decision path.
- Saved recipes need a working surface after the first save: dock on desktop/tablet, saved tab on mobile.
- Frequency helper text is neutral. It describes current behavior only; intent is captured separately through preferred cooking pattern.
- Meal prep is treated as an effort strategy with a restart cost, not as a universally better habit.

## Personalization Logic In The Prototype

The prototype uses the captured answers to rank recipes by:

- Hard dietary restrictions.
- Usual time range.
- Time available for the selected cooking window.
- Preferred cooking pattern.
- Ingredient tolerance.
- Beginner skill fit.
- Cleanup and grocery blockers.
- Breakdown points such as deciding, ingredients, prep, cooking flow, and cleanup.
- Restart friction, such as prep dread, grocery reset, effort amnesia, or decision fatigue.
- Health intent, such as vegetables, protein, or lighter takeout swaps.
- Active dashboard preset, such as quick rescue, prep once, confidence builder, or pantry fallback.
- Advanced filter overrides when the user changes time, servings, ingredient count, cleanup, or guidance density after onboarding.

Time is a ranking signal, not a hard filter. Hard dietary restrictions are true filters. Time should not hide every recipe because showing no options on a 10-minute day would push the user back to takeout.

Presets should be implemented as temporary filter bundles. They should not overwrite the user's onboarding profile unless the user explicitly updates their defaults. This prevents preference lock-in and supports real daily context changes.

## Idea Evolution Log

| Critique | Design issue found | Product change |
| --- | --- | --- |
| "1-2 nights does not mean I want a steadier rhythm." | Frequency copy inferred intent from behavior. | Split current frequency from preferred cooking pattern: quick dinners, meal prep once, prep shortcuts, flexible fallbacks. |
| "Meal prep has a second-cycle dread problem." | Batch cooking was treated only as a benefit. | Added restart-friction capture and batch-aware recommendation logic. |
| "What does this fallback question capture?" | Hard-night fallback was not visibly affecting outcomes. | Reframed it as "what does cooking need to replace?" and tied it to recommendation ranking, summary chips, and match reasons. |
| "Time and low energy cover the other blockers." | Root constraints were mixed with downstream breakdown points. | Removed generic time/energy blocker chips and asked where dinner breaks down after those limits: deciding, ingredients, prep, cooking flow, cleanup. |
| "Do not lock me into 30 or 45 minute recipes." | A fixed onboarding time choice overfit recommendations to one context. | Replaced fixed choices with a usual time range picker and added a selected-cooking-window picker on recommendations. |
| "I cannot find the rationale." | The rationale destination existed but was labeled as Settings in the nav. | Renamed the nav item UX rationale and placed it directly after Home. |
| "Do not make me manage every filter." | Advanced filtering can recreate information overload. | Added simple presets that map to advanced filters and personas, with advanced controls available on demand. |
| "Do not make saved recipes disappear." | A saved count does not support grocery planning or return use. | Added a saved dock/tab rationale so the first commitment remains visible across device sizes. |
| "Celebrate progress, but keep it practical." | Gamification can feel patronizing if it appears before meaningful action. | Reserved delight, toast, and food-icon celebration for the save milestone rather than every onboarding interaction. |
| "There are too many choices." | Several onboarding prompts risked becoming option grids. | Capped each question at three primary choices and kept uncertainty options only where useful. |
| "Why did onboarding feel fragmented?" | One-question-per-screen interaction felt repetitive. | Grouped screens by decision category and used one forward action per screen with Back for correction. |
| "The stepper looks decorative." | Raw numbered steps did not explain question purpose. | Changed the progress model to `Step 1 of 4` plus a compact bar matching the four-screen structure. |
| "The progress gradient reads as decoration." | Gradient progress can imply mixed states and excess motion. | Changed the direction to solid grey-to-orange progress with one growing ping per milestone. |
| "There are too many progress cues." | Pills, count, and bar made progress feel like three systems. | Desktop onboarding now documents one clear progress pattern at a time. |
| "The first line should feel more encouraging." | Setup language led with the product task before the user's real weekly context. | Changed the welcome rationale to lead with "What does cooking look like for you this week?" |
| "`Pantry Check` sounds like inventory work." | The label implied the user had to audit pantry items. | Replaced vague stage-language guidance with task labels tied to the actual decision. |
| "The desktop screen competes with itself." | Illustration, summary, progress, and choices were all fighting for attention. | Documented a two-column desktop setup: decisions left, compact illustration right, no live setup summary card. |
| "The setup nav makes the app feel usable too early." | Full navigation before setup completion creates a false exit path and extra competition. | Simplified the desktop setup sidebar rationale to brand/logo only. |
| "Selected states should feel consistent." | Different selected treatments and decorative accents increased scanning load. | Added a minimal theme and consistent selected-state rationale across cards, chips, and actions. |
| "Confetti feels generic." | Celebration was not tied to cooking or saving. | Added local SVG food-icon celebration and cooking-stage illustration recommendations. |
| "`Right now` is too narrow." | Immediate-only copy ignores future meal planning and grocery prep. | Replaced active copy with "selected cooking window," "next dinner," and "planned meal" language. |
| "Motion needs accessibility guardrails." | Pings and bursts can be uncomfortable or distracting. | Documented reduced-motion fallbacks and vanilla CSS/WAAPI-style implementation guidance. |
| "The dashboard is explaining too much." | Onboarding-level copy was competing with recipe evidence and actions. | Reduced dashboard copy direction so photos, match reasons, saves, and filters do the work. |
| "The visuals still feel inconsistent." | Mixed symbol weights and placeholder-style illustrations made the UI feel crude. | Shifted the asset system toward stock/free food photography and one Lucide icon library. |
| "I need to replay setup." | Stale personalization and demos were hard to recover from. | Added a visible Reset setup affordance for feedback/testing and state recovery. |
| "I cannot see enough options at once." | Spacious components reduced comparison per viewport. | Added compact-density guidance that reveals more rows while preserving tap targets. |

In production, this should become a recommendation service that also considers pantry items, cuisine preferences, price, and prior saves, but those are deliberately deferred because the current product constraints only guarantee recipes, grocery list generation, and step-by-step instructions.

## Measurement Plan

- Onboarding completion rate by screen.
- Drop-off at time range, skill, and restriction questions.
- Recipe save rate from the final screen.
- Recipe save rate after changing the cooking-window selector.
- Completion rate by screen stage (Step 1-4) and category completion.
- Reduced-motion mode visual QA for progress pings and food-icon celebration.
- Simple preset usage by session and by returning user.
- Advanced filter opens, changes, clears, and resets to baseline.
- Reset setup usage and completion after reset.
- Saved dock or saved tab opens after the first save.
- Grocery-list starts from saved recipes.
- First recipe cooked within 7 days.
- Correlation between abandonment reason and completed first cook.
- Post-cook confidence rating after the first recipe.

## Tradeoffs

- Cuisine preferences are not asked during onboarding. This avoids survey bloat and can be inferred later from recipe saves.
- Kitchen equipment is not captured. The current business constraints do not include smart hardware, and early recipes should avoid specialized tools.
- The flow captures "avoid if possible" as a soft signal rather than blocking recommendations. This prevents over-filtering when the catalog is still limited.
