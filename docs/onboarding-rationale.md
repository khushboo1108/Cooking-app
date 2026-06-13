# HomeStart Onboarding Rationale

This document is the source of truth for the prototype decisions. The interface should be judged against this thinking, not the other way around.

## Product Goal

Design a 3-5 screen onboarding flow that helps a responsive cooking web app understand a user's current cooking habits, preferences, and skill level so it can personalize recipes, instructions, and guidance without overwhelming them.

The business success path is:

1. User completes onboarding.
2. User saves at least one recipe.
3. User cooks at least once in the first 7 days.

## Problem Framing

Christina is not blocked by a lack of recipes. She is blocked by uncertainty, time pressure, and low trust that a recipe will fit her real weekday. A generic recipe feed can increase intimidation because it asks her to evaluate too many options before she knows what "doable" looks like.

The onboarding problem is therefore:

- Help the app understand what "doable" means for this user.
- Convert vague goals into recommendation constraints the product can support today.
- Create an early success path that is smaller than "become a home cook."
- Separate current cooking frequency from the user's preferred effort pattern. A user who cooks 1-2 nights may not want a steadier rhythm; they may want one intentional prep session that protects the rest of the week.
- Separate the user's typical time range from the time they have right now. A usual 20-45 minute range should not prevent the app from helping on a 10-minute day.

## User Goals

- Feel that the app understands her current baseline without judgment.
- Find a recipe that fits a workday, not an ideal weekend.
- Know whether the recipe is within her skill level before committing.
- Avoid recipes that violate restrictions, household needs, or strong dislikes.
- Save one realistic recipe and understand the next step.
- Choose a cooking pattern that matches how she wants to spend effort, such as quick dinners, batch prep, prep shortcuts, or flexible fallbacks.
- Adjust recommendations by today's available time without losing broader saved options.

## Product Goals

- Increase onboarding completion by keeping the flow short and concrete.
- Collect enough signal to personalize skill-based recipes and step-by-step guidance.
- Drive the first meaningful action: saving a recipe.
- Set up the first 7-day cook attempt through a small, credible commitment.
- Avoid asking for data the current product cannot use.

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
- If the final screen presents only three recipes, users will be more likely to save one than if they land in a broad catalog.
- If the first milestone is "cook once in 7 days," the user can form a habit without feeling behind on day one.
- If onboarding asks how the user wants cooking to work, the app can distinguish weekly quick dinners from batch prep and avoid pushing the wrong habit model.
- If onboarding captures what makes cooking hard to restart, the app can recommend lower-reset recipes, grocery-light options, or smaller batch plans before the user abandons the second cycle.
- If onboarding captures a typical time range and the recipe surface asks for time available right now, the app can stay useful when the user has 10 minutes today and 45 minutes another day.

## Design Principles

- Start from current behavior, not ideal behavior.
- Do not infer intent from frequency. Frequency is a baseline; effort pattern is a separate preference.
- Do not make onboarding time a hard lock. Treat it as a usual range, then re-rank by the user's current context.
- Ask concrete questions before subjective taste questions.
- Make uncertainty acceptable with "not sure" choices.
- Separate hard constraints from preferences.
- Show the payoff immediately after asking for personal data.
- Keep every recommendation tied to a reason the user already gave.

## Research Signals And Design Implications

| Signal | UX implication | Product decision |
| --- | --- | --- |
| 65% identify as beginner cooks | Avoid skill shame and hidden assumptions | Ask skill level in plain language and default to beginner-safe recipes |
| 72% say time is biggest blocker | Time is contextual and changes day to day | Ask for a usual time range, then ask for today's available time when showing recipes |
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
| A fixed time choice overfits the user to one day | The app may show 30+ minute recipes when the user only has 10 minutes today | Use a usual range picker in onboarding and a "time right now" picker on the recommendation screen |
| Time and low energy are too broad as blocker answers | The app learns the obvious but not where to intervene | Treat time and energy as limits, then ask where dinner breaks down: deciding, ingredients, prep, cooking flow, or cleanup |
| Healthier is vague | The user cannot choose confidently | Translate "healthy" into concrete directions like more vegetables or lighter takeout swaps |
| Grocery lists feel long or unfamiliar | The user delays cooking | Capture ingredient tolerance and prefer short lists early |
| Dietary misses break trust | The user will not save or cook | Ask hard restrictions directly before showing recipes |
| Too many choices create decision fatigue | The user browses but saves nothing | End onboarding with three recommendations and one save action |
| Meal prep hides effort until the next cycle | The user may succeed once but avoid repeating | Capture restart friction and avoid assuming batch prep is always the best answer |
| Vague copy like "less friction" does not explain the product promise | The user cannot tell what the app will actually improve | Use concrete language: planning, cleanup, decisions, grocery reset, step clarity |

## Journey Map

The useful journey is not just onboarding. The business metric requires a saved recipe and a cooked meal within 7 days, so the journey must continue through preparation and execution.

| Bucket | What happens | User question | Product job | Success signal |
| --- | --- | --- | --- | --- |
| Start | User opens the web app, reads the promise, and decides whether to begin | "Is this actually for someone like me?" | Make the app feel practical, not chef-like or aspirational | User starts onboarding |
| Calibrate | User shares habit baseline, preferred cooking pattern, time, energy-sensitive breakdown point, skill, and food guardrails | "What can I realistically handle?" | Learn what doable means for this user without over-surveying | User completes setup questions |
| Recommend | App shows a small set of personalized starter meals | "Which one feels easiest to start with?" | Show three explainable options, not a broad feed | User reviews recommendations |
| Commit | User saves one recipe and sees the next step | "Am I actually going to do this?" | Turn browsing into a low-pressure commitment | User saves at least one recipe |
| Prepare | User generates a grocery list, checks pantry items, and shops or orders missing ingredients | "What do I need before I can cook?" | Remove the logistical barrier between intent and action | User uses grocery list |
| Cook | User returns, opens the saved recipe, follows steps, cleans up, and confirms completion | "Can I finish without getting lost halfway?" | Guide clearly through execution and reinforce the first win | User cooks once within 7 days |

The 5 onboarding screens sit mainly inside Calibrate and Recommend, but they must intentionally support Commit, Prepare, and Cook.

## Behavioral Model

| Behavior signal | What it reveals | Design response |
| --- | --- | --- |
| Cooking frequency | Current baseline, not desired habit | Use neutral copy and avoid assuming the user wants a steadier rhythm |
| Preferred cooking pattern | How the user wants to distribute effort | Offer quick dinners, meal prep once, prep shortcuts, or flexible fallbacks |
| Usual time range | The time window the app should assume by default | Rank recipes inside the normal range without treating it as a hard filter |
| Time available right now | The current session constraint | Re-rank recipes for today and surface 10-minute fallback options when needed |
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
| Time available right now | Captures current day constraints | Session-level re-ranking without locking users out |
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

## Proposed Flow

### Screen 1: Current Routine

Questions:

- How often do you cook dinner at home?
- How would you prefer cooking to work for you?
- On a hard night, what does cooking need to replace?

Rationale:

This starts with behavior rather than aspiration, but it does not infer intent from frequency. "1-2 nights" can mean "help me cook more often," "help me meal prep once," or "help me keep easy fallbacks ready." Separating frequency from preferred cooking pattern produces better recommendations and avoids confusing helper text.

The hard-night fallback question captures what cooking must compete against:

- Order takeout or eat out: recommend fast, satisfying takeout-style swaps and show "replaces takeout/eating out" in the starter plan.
- Snack dinner: recommend low-effort meals that still feel filling enough to count.
- Whatever is around: recommend pantry, leftovers, and flexible fallback meals.

If this answer does not affect ranking or explanation, the question should be removed. In the prototype it now affects recipe scoring, summary chips, and recipe match reasons.

### Screen 2: Weekday Reality

Questions:

- What range of weekday dinner time should we plan around, including cleanup?
- After time and energy, where does dinner usually break down? Choose up to two.
- What makes cooking hard to restart after a high-effort meal?

Rationale:

Time and energy are root constraints, so they should not sit beside planning, groceries, cleanup, or steps as equal options. The app first asks for a realistic time range, then asks where that limited time and energy usually get consumed: choosing the meal, getting ingredients, starting prep, staying oriented while cooking, or facing cleanup. Each answer maps to a different intervention. Repeatability also depends on restart friction, especially for meal prep.

The range is not a hard lock. The recommendation surface asks how much time the user has right now and re-ranks recipes for that session. If the user usually has 20-45 minutes but only has 10 today, the app should surface 10-minute fallback options instead of making cooking feel unavailable.

### Screen 3: Cooking Comfort

Questions:

- Which skill level feels closest?
- When recipes fall apart, what is the usual reason?
- What instruction style would feel best at first?

Rationale:

The app currently supports step-by-step recipes and skill-based recommendations, so this screen captures signals the product can actually use. It also addresses the abandonment problem by identifying whether users need timing help, clearer doneness cues, prep simplification, or ingredient warnings.

### Screen 4: Food Boundaries

Questions:

- Any hard dietary restrictions?
- When you say healthier, what would help most?
- How many ingredients feels manageable?
- Usually cooking for how many people?
- Avoid if possible?

Rationale:

This separates hard constraints from softer preferences. It turns vague "healthy" intent into actionable recommendation logic and keeps household details lightweight.

### Screen 5: First-Week Plan

Output:

- A short summary of the user's starting parameters.
- Three personalized recipes.
- A direct save action.
- A "time right now" selector that re-ranks recipes for the day.
- A first-week target: save one recipe, cook once, adjust from there.

Rationale:

The final screen makes personalization visible immediately and aligns with the success metric. The user is not dropped onto a generic recipe feed; they are given a small, realistic next step.

## Alternatives Considered

| Concept | Why it was rejected or deferred |
| --- | --- |
| Start with cuisine preferences | Cuisine matters, but it is less tied to the beta blockers than time, skill, and restrictions. It can be learned from saves later. |
| Ask for pantry inventory | Useful for personalization, but too high-friction for first-run onboarding and not required by the current product capabilities. |
| Build a full weekly meal plan | This may feel productive, but it raises commitment before the user has had a first win. |
| Ask for kitchen equipment | The current recipe set should avoid specialized tools. Equipment can be added once the catalog supports it. |
| Use a long taste quiz | It may improve recommendation nuance, but it conflicts with the need to reduce intimidation and avoid overwhelm. |
| Use one fixed time choice | Rejected because time is highly contextual. A fixed 30 or 45 minute selection can fail on a 10-minute day and push the user back to takeout. |

## User Stories

- As a beginner cook, I want recipes matched to my skill level so I do not feel set up to fail.
- As a busy professional, I want dinners that fit my weekday time range including cleanup.
- As a busy professional, I want today's recommendations to adapt when I have much less or more time than usual.
- As someone trying to eat healthier, I want the app to translate my vague goal into practical recipe suggestions.
- As a household cook, I want serving size and dietary restrictions reflected immediately.
- As someone who has abandoned recipes before, I want instructions that anticipate the parts where I usually get stuck.
- As someone who prefers meal prep, I want the app to account for the effort of the next prep cycle, not just the easy days after cooking.

## Pain Points Addressed

- Intimidation from recipes that assume too much prior knowledge.
- Unrealistic recipe timing that ignores cleanup and energy level.
- Overloaded onboarding surveys that ask for too many tastes before proving value.
- Vague health goals that do not translate into recipe decisions.
- Trust loss from ignoring dietary restrictions.
- Recipe abandonment caused by unclear timing, prep order, or doneness cues.

## Key Design Decisions

- Five screens, each with a distinct job. This keeps cognitive load low while still capturing enough personalization signal.
- Familiar segmented cards and chips. These are faster than open-ended questions and work well on mobile.
- Time is captured at two levels: onboarding captures the usual range, and recommendations ask for today's time.
- "Not sure" options where users may lack confidence. This preserves completion rather than forcing false precision.
- Final recommendations are limited to three recipes. The goal is a first decision, not exhaustive discovery.
- The first-week goal is intentionally small. For this audience, "cook once" is more motivating and credible than an ambitious weekly plan.
- The prototype includes a hamburger menu rationale page so stakeholders can inspect the UX reasoning without interrupting the onboarding path.
- Frequency helper text is neutral. It describes current behavior only; intent is captured separately through preferred cooking pattern.
- Meal prep is treated as an effort strategy with a restart cost, not as a universally better habit.

## Personalization Logic In The Prototype

The prototype uses the captured answers to rank recipes by:

- Hard dietary restrictions.
- Usual time range.
- Time available right now.
- Preferred cooking pattern.
- Ingredient tolerance.
- Beginner skill fit.
- Cleanup and grocery blockers.
- Breakdown points such as deciding, ingredients, prep, cooking flow, and cleanup.
- Restart friction, such as prep dread, grocery reset, effort amnesia, or decision fatigue.
- Health intent, such as vegetables, protein, or lighter takeout swaps.

Time is a ranking signal, not a hard filter. Hard dietary restrictions are true filters. Time should not hide every recipe because showing no options on a 10-minute day would push the user back to takeout.

## Idea Evolution Log

| Critique | Design issue found | Product change |
| --- | --- | --- |
| "1-2 nights does not mean I want a steadier rhythm." | Frequency copy inferred intent from behavior. | Split current frequency from preferred cooking pattern: quick dinners, meal prep once, prep shortcuts, flexible fallbacks. |
| "Meal prep has a second-cycle dread problem." | Batch cooking was treated only as a benefit. | Added restart-friction capture and batch-aware recommendation logic. |
| "What does this fallback question capture?" | Hard-night fallback was not visibly affecting outcomes. | Reframed it as "what does cooking need to replace?" and tied it to recommendation ranking, summary chips, and match reasons. |
| "Time and low energy cover the other blockers." | Root constraints were mixed with downstream breakdown points. | Removed generic time/energy blocker chips and asked where dinner breaks down after those limits: deciding, ingredients, prep, cooking flow, cleanup. |
| "Do not lock me into 30 or 45 minute recipes." | A fixed onboarding time choice overfit recommendations to one context. | Replaced fixed choices with a usual time range picker and added a day-of "time right now" picker on recommendations. |

In production, this should become a recommendation service that also considers pantry items, cuisine preferences, price, and prior saves, but those are deliberately deferred because the current product constraints only guarantee recipes, grocery list generation, and step-by-step instructions.

## Measurement Plan

- Onboarding completion rate by screen.
- Drop-off at time range, skill, and restriction questions.
- Recipe save rate from the final screen.
- Recipe save rate after changing the "time right now" selector.
- First recipe cooked within 7 days.
- Correlation between abandonment reason and completed first cook.
- Post-cook confidence rating after the first recipe.

## Tradeoffs

- Cuisine preferences are not asked during onboarding. This avoids survey bloat and can be inferred later from recipe saves.
- Kitchen equipment is not captured. The current business constraints do not include smart hardware, and early recipes should avoid specialized tools.
- The flow captures "avoid if possible" as a soft signal rather than blocking recommendations. This prevents over-filtering when the catalog is still limited.
