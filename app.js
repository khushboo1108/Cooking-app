const STORAGE_KEY = "homestart-onboarding-v1";

const initialState = {
  frequency: "",
  cookingStyle: "",
  fallback: "",
  timeBudget: "",
  timeRangeMin: "20",
  timeRangeMax: "45",
  currentTime: "20",
  blockers: [],
  restartFriction: "",
  skill: "",
  guidance: "",
  abandonReason: "",
  restrictions: ["none"],
  healthIntent: "",
  servings: "2",
  ingredientLimit: "6-8",
  avoid: "",
  savedRecipes: [],
  completed: false
};

const state = migrateState(loadState());
let currentStep = 0;
let activeView = "onboarding";
let toastTimer;

const recipes = [
  {
    id: "hummus-plate",
    title: "Ten-Minute Hummus Plate",
    time: 10,
    skill: "Beginner",
    ingredients: 5,
    image: "assets/hummus-plate.png",
    tags: ["vegetarian", "dairy-free", "quick", "pantry", "snack-upgrade", "flexible"],
    dietary: ["vegetarian", "dairy-free"],
    summary: "Hummus, pita, crisp vegetables, olives, and canned chickpeas become a real dinner with almost no cooking."
  },
  {
    id: "chickpea-tacos",
    title: "Five-Ingredient Chickpea Tacos",
    time: 22,
    skill: "Beginner",
    ingredients: 5,
    image: "assets/chickpea-tacos.png",
    tags: ["vegetarian", "dairy-free", "quick", "healthy", "flexible", "takeout-swap"],
    dietary: ["vegetarian", "dairy-free"],
    summary: "Warm chickpeas, crunchy slaw, tortillas, salsa, and lime. Low prep, easy to repeat, and flexible for leftovers."
  },
  {
    id: "sheet-pan-chicken",
    title: "Lemon Garlic Sheet-Pan Chicken",
    time: 35,
    skill: "Beginner",
    ingredients: 7,
    image: "assets/sheet-pan-chicken.png",
    tags: ["high-protein", "one-pan", "gluten-free", "dairy-free", "batchable", "leftovers", "sit-down"],
    dietary: ["gluten-free", "dairy-free"],
    summary: "Chicken, potatoes, and vegetables roast together with one cleanup point, clear doneness checks, and leftovers."
  },
  {
    id: "rice-bowl",
    title: "Shortcut Veggie Rice Bowl",
    time: 28,
    skill: "Beginner",
    ingredients: 6,
    image: "assets/rice-bowl.png",
    tags: ["vegetarian", "gluten-free", "dairy-free", "healthy", "prep-shortcut", "flexible", "takeout-swap", "snack-upgrade"],
    dietary: ["vegetarian", "gluten-free", "dairy-free"],
    summary: "Microwave rice, crisp vegetables, canned beans, and a simple sauce with flexible portions and shortcut prep."
  },
  {
    id: "tomato-pasta",
    title: "Creamy Tomato Pantry Pasta",
    time: 30,
    skill: "Beginner",
    ingredients: 7,
    image: "assets/tomato-pasta.png",
    tags: ["vegetarian", "comfort", "budget", "quick", "pantry", "snack-upgrade"],
    dietary: ["vegetarian"],
    summary: "A forgiving pasta dinner with pantry staples and optional vegetables stirred in at the end."
  },
  {
    id: "bean-skillet",
    title: "Bean And Sweet Potato Skillet",
    time: 34,
    skill: "Beginner",
    ingredients: 6,
    image: "assets/bean-skillet.png",
    tags: ["vegetarian", "gluten-free", "dairy-free", "one-pan", "batchable", "leftovers", "pantry"],
    dietary: ["vegetarian", "gluten-free", "dairy-free"],
    summary: "A sturdy one-pan meal with canned beans, pre-cut sweet potatoes, greens, and portions that hold up well."
  }
];

const steps = [
  {
    eyebrow: "Habit baseline",
    title: "How does home cooking fit your week right now?",
    copy: "Frequency tells us your current baseline. It does not assume what you want next.",
    render: renderRoutine,
    isValid: () => state.frequency && state.cookingStyle && state.fallback
  },
  {
    eyebrow: "Weekday reality",
    title: "What has to be true on a busy night?",
    copy: "Time and energy set the limit. The next question finds the specific point where dinner breaks down.",
    render: renderConstraints,
    isValid: () => Number(state.timeRangeMin) <= Number(state.timeRangeMax) && state.restartFriction
  },
  {
    eyebrow: "Cooking comfort",
    title: "How much support should the recipe give you?",
    copy: "HomeStart can make early instructions more detailed without making every recipe feel long.",
    render: renderSkill,
    isValid: () => state.skill && state.guidance && state.abandonReason
  },
  {
    eyebrow: "Food boundaries",
    title: "What should recommendations respect first?",
    copy: "Hard restrictions come first. Preferences help narrow the first shortlist.",
    render: renderPreferences,
    isValid: () => state.healthIntent && state.servings && state.ingredientLimit
  },
  {
    eyebrow: "First-week plan",
    title: "Start with one realistic dinner.",
    copy: "These recipes are ranked by your time, skill, restrictions, effort pattern, and ingredient tolerance.",
    render: renderPlan,
    isValid: () => true
  }
];

const els = {
  menuButton: document.querySelector("#menuButton"),
  drawer: document.querySelector("#drawer"),
  drawerScrim: document.querySelector("#drawerScrim"),
  navLinks: document.querySelectorAll(".nav-link, .brand"),
  onboardingPage: document.querySelector("#onboardingPage"),
  rationalePage: document.querySelector("#rationalePage"),
  stepEyebrow: document.querySelector("#stepEyebrow"),
  stepTitle: document.querySelector("#stepTitle"),
  stepCount: document.querySelector("#stepCount"),
  progressBar: document.querySelector("#progressBar"),
  screenBody: document.querySelector("#screenBody"),
  backButton: document.querySelector("#backButton"),
  nextButton: document.querySelector("#nextButton"),
  savedCount: document.querySelector("#savedCount"),
  toast: document.querySelector("#toast")
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...initialState, ...saved } : { ...initialState };
  } catch {
    return { ...initialState };
  }
}

function migrateState(savedState) {
  const next = { ...savedState };
  const validBlockers = new Set(["deciding", "groceries", "prep", "cooking-flow", "cleanup"]);
  next.blockers = Array.isArray(next.blockers) ? next.blockers.filter((item) => validBlockers.has(item)) : [];

  if (!next.timeRangeMin || !next.timeRangeMax) {
    const oldBudget = Number(next.timeBudget || 45);
    if (oldBudget <= 20) {
      next.timeRangeMin = "10";
      next.timeRangeMax = "20";
    } else if (oldBudget <= 30) {
      next.timeRangeMin = "20";
      next.timeRangeMax = "30";
    } else if (oldBudget <= 45) {
      next.timeRangeMin = "20";
      next.timeRangeMax = "45";
    } else {
      next.timeRangeMin = "30";
      next.timeRangeMax = "60";
    }
  }

  if (!next.currentTime) {
    next.currentTime = next.timeRangeMin || "20";
  }

  return next;
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateSavedCount();
}

function updateSavedCount() {
  const count = state.savedRecipes.length;
  els.savedCount.textContent = `${count} saved`;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  toastTimer = window.setTimeout(() => els.toast.classList.remove("visible"), 2200);
}

function openDrawer() {
  els.drawer.classList.add("open");
  els.drawer.setAttribute("aria-hidden", "false");
  els.drawerScrim.hidden = false;
  els.menuButton.setAttribute("aria-expanded", "true");
}

function closeDrawer() {
  els.drawer.classList.remove("open");
  els.drawer.setAttribute("aria-hidden", "true");
  els.drawerScrim.hidden = true;
  els.menuButton.setAttribute("aria-expanded", "false");
}

function setView(view) {
  activeView = view;
  els.onboardingPage.classList.toggle("active", view === "onboarding");
  els.rationalePage.classList.toggle("active", view === "rationale");
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.view === view);
  });
  closeDrawer();
  if (view === "onboarding") {
    renderStep();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderStep(options = {}) {
  const step = steps[currentStep];
  els.stepEyebrow.textContent = `Step ${currentStep + 1} of ${steps.length} - ${step.eyebrow}`;
  els.stepTitle.textContent = step.title;
  els.stepCount.textContent = `${currentStep + 1}/${steps.length}`;
  els.progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
  els.screenBody.innerHTML = "";

  const copy = document.createElement("p");
  copy.className = "screen-copy";
  copy.textContent = step.copy;
  els.screenBody.append(copy);
  step.render(els.screenBody);

  els.backButton.disabled = currentStep === 0;
  els.nextButton.textContent = currentStep === steps.length - 1 ? completionButtonText() : "Next";
  els.nextButton.disabled = !step.isValid();
  updateSavedCount();

  if (options.scrollToPanel) {
    window.requestAnimationFrame(() => {
      document.querySelector(".flow-panel").scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }
}

function completionButtonText() {
  if (state.savedRecipes.length > 0) {
    return state.completed ? "Plan saved" : "Finish setup";
  }
  return "Save one to finish";
}

function createQuestion(label, content) {
  const block = document.createElement("div");
  block.className = "question-block";
  const heading = document.createElement("span");
  heading.className = "question-label";
  heading.textContent = label;
  block.append(heading, content);
  return block;
}

function renderChoiceGroup({ key, options, columns = "default" }) {
  const grid = document.createElement("div");
  grid.className = columns === "compact" ? "choice-grid compact" : "choice-grid";

  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-card ${state[key] === option.value ? "selected" : ""}`;
    button.setAttribute("aria-pressed", state[key] === option.value ? "true" : "false");
    button.innerHTML = `<strong>${option.label}</strong><span>${option.detail}</span>`;
    button.addEventListener("click", () => {
      state[key] = option.value;
      persistState();
      renderStep();
    });
    grid.append(button);
  });

  return grid;
}

function renderChipGroup({ key, options, exclusive = [], max = Infinity }) {
  const group = document.createElement("div");
  group.className = "chip-group";

  options.forEach((option) => {
    const selected = state[key].includes(option.value);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip ${selected ? "selected" : ""}`;
    button.setAttribute("aria-pressed", selected ? "true" : "false");
    button.textContent = option.label;
    button.addEventListener("click", () => {
      toggleArrayChoice(key, option.value, { exclusive, max });
      persistState();
      renderStep();
    });
    group.append(button);
  });

  return group;
}

function toggleArrayChoice(key, value, { exclusive = [], max = Infinity } = {}) {
  const current = new Set(state[key]);
  const isExclusive = exclusive.includes(value);

  if (current.has(value)) {
    current.delete(value);
  } else {
    if (isExclusive) {
      current.clear();
    } else {
      exclusive.forEach((item) => current.delete(item));
    }
    if (current.size < max || isExclusive) {
      current.add(value);
    }
  }

  if (current.size === 0 && key === "restrictions") {
    current.add("none");
  }

  state[key] = Array.from(current);
}

function renderRoutine(container) {
  container.append(
    createQuestion(
      "How often do you cook dinner at home?",
      renderChoiceGroup({
        key: "frequency",
        options: [
          { value: "almost-never", label: "Almost never", detail: "Most dinners come from takeout, restaurants, snacks, or whatever is available." },
          { value: "1-2", label: "1-2 nights", detail: "A couple of home-cooked dinners in a typical week." },
          { value: "3-4", label: "3-4 nights", detail: "Several home dinners, with planning, cleanup, or decisions still getting in the way." },
          { value: "most", label: "Most nights", detail: "Home cooking is already the default most weeks." }
        ]
      })
    ),
    createQuestion(
      "How would you prefer cooking to work for you?",
      renderChoiceGroup({
        key: "cookingStyle",
        options: [
          { value: "quick-dinners", label: "Quick dinners", detail: "Cook, eat, and clean up the same night with minimal leftovers." },
          { value: "meal-prep", label: "Meal prep once", detail: "One bigger effort that covers multiple meals and saves weeknight energy." },
          { value: "prep-shortcuts", label: "Prep shortcuts", detail: "Do a little prep ahead, then assemble fast meals later." },
          { value: "flexible-fallbacks", label: "Flexible fallbacks", detail: "Keep easy options ready for nights when plans change." }
        ]
      })
    ),
    createQuestion(
      "On a hard night, what does cooking need to replace?",
      renderChoiceGroup({
        key: "fallback",
        options: [
          { value: "takeout", label: "Order takeout", detail: "Fast, satisfying options need to feel easier than delivery." },
          { value: "eat-out", label: "Eat out", detail: "Restaurant-ish dinners need to avoid the extra trip and cost." },
          { value: "snack", label: "Snack dinner", detail: "Low-effort meals need to be filling enough to count." },
          { value: "leftovers", label: "Whatever is around", detail: "Pantry and leftover-friendly fallbacks need to be ready." }
        ]
      })
    )
  );
}

function renderConstraints(container) {
  container.append(
    createQuestion(
      "What range of weekday dinner time should we plan around, including cleanup?",
      renderTimeRangePicker()
    ),
    createQuestion(
      "After time and energy, where does dinner usually break down? Choose up to two.",
      renderChipGroup({
        key: "blockers",
        max: 2,
        options: [
          { value: "deciding", label: "Choosing what to cook" },
          { value: "groceries", label: "Getting ingredients" },
          { value: "prep", label: "Starting prep" },
          { value: "cooking-flow", label: "Keeping track while cooking" },
          { value: "cleanup", label: "Facing cleanup" }
        ]
      })
    ),
    createQuestion(
      "What makes cooking hard to restart after a high-effort meal?",
      renderChoiceGroup({
        key: "restartFriction",
        options: [
          { value: "prep-dread", label: "The next prep feels huge", detail: "A big batch helps later, but the next one is easy to dread." },
          { value: "effort-amnesia", label: "I forget the effort", detail: "The easy days in between make the next cooking lift surprising." },
          { value: "grocery-reset", label: "Groceries reset everything", detail: "Planning, checking what is left, and shopping become the blocker." },
          { value: "decision-fatigue", label: "Deciding drains me", detail: "Choosing what to cook is harder than following the recipe." }
        ]
      })
    )
  );
}

function renderSkill(container) {
  container.append(
    createQuestion(
      "Which skill level feels closest?",
      renderChoiceGroup({
        key: "skill",
        options: [
          { value: "beginner", label: "Beginner", detail: "I need recipes that define basics and avoid assumptions." },
          { value: "basic", label: "Some basics", detail: "I can chop, boil, and saute with guidance." },
          { value: "comfortable", label: "Comfortable", detail: "I can improvise if the recipe is clear." },
          { value: "adventurous", label: "Adventurous", detail: "I want to build new techniques." }
        ]
      })
    ),
    createQuestion(
      "When recipes fall apart, what is the usual reason?",
      renderChoiceGroup({
        key: "abandonReason",
        options: [
          { value: "timing", label: "Timing gets messy", detail: "Multiple pans or prep steps overlap." },
          { value: "unclear", label: "Instructions are vague", detail: "I am not sure what done looks like." },
          { value: "prep", label: "Prep takes too long", detail: "Chopping or measuring slows everything down." },
          { value: "ingredients", label: "Ingredients surprise me", detail: "I discover missing or unfamiliar items too late." }
        ]
      })
    ),
    createQuestion(
      "What instruction style would feel best at first?",
      renderChoiceGroup({
        key: "guidance",
        options: [
          { value: "detailed", label: "Walk me through it", detail: "More checkpoints, doneness cues, and prep order." },
          { value: "balanced", label: "Balanced guidance", detail: "Keep it concise but call out tricky moments." },
          { value: "quick", label: "Quick scan", detail: "I mainly need the steps and timing." },
          { value: "not-sure", label: "Not sure yet", detail: "Start with more help and adjust later." }
        ]
      })
    )
  );
}

function renderPreferences(container) {
  const controls = document.createElement("div");
  controls.className = "inline-controls";

  const servingsField = document.createElement("div");
  servingsField.className = "field";
  servingsField.innerHTML = `
    <label for="servingsInput">Usually cooking for</label>
    <input id="servingsInput" type="number" min="1" max="8" value="${state.servings}" inputmode="numeric">
  `;

  const avoidField = document.createElement("div");
  avoidField.className = "field";
  avoidField.innerHTML = `
    <label for="avoidInput">Avoid if possible</label>
    <input id="avoidInput" type="text" value="${escapeAttribute(state.avoid)}" placeholder="Cilantro, mushrooms, spicy food">
  `;

  controls.append(servingsField, avoidField);

  container.append(
    createQuestion(
      "Any hard dietary restrictions?",
      renderChipGroup({
        key: "restrictions",
        exclusive: ["none"],
        options: [
          { value: "none", label: "None" },
          { value: "vegetarian", label: "Vegetarian" },
          { value: "dairy-free", label: "Dairy-free" },
          { value: "gluten-free", label: "Gluten-free" }
        ]
      })
    ),
    createQuestion(
      "When you say healthier, what would help most?",
      renderChoiceGroup({
        key: "healthIntent",
        options: [
          { value: "vegetables", label: "More vegetables", detail: "Add produce without making prep heavy." },
          { value: "takeout-swap", label: "Lighter takeout swaps", detail: "Keep familiar flavors with more control." },
          { value: "protein", label: "More protein", detail: "Meals that feel filling and steady." },
          { value: "not-sure", label: "Not sure", detail: "Start with balanced, simple dinners." }
        ]
      })
    ),
    createQuestion(
      "How many ingredients feels manageable?",
      renderChoiceGroup({
        key: "ingredientLimit",
        columns: "compact",
        options: [
          { value: "5", label: "5 or fewer", detail: "Very short grocery lists." },
          { value: "6-8", label: "6-8", detail: "A little flexibility." },
          { value: "flexible", label: "Flexible", detail: "More variety is okay." },
          { value: "not-sure", label: "Not sure", detail: "Keep the first list short." }
        ]
      })
    ),
    createQuestion("Household details", controls)
  );

  container.querySelector("#servingsInput").addEventListener("input", (event) => {
    state.servings = clampNumber(event.target.value, 1, 8).toString();
    event.target.value = state.servings;
    persistState();
  });

  container.querySelector("#avoidInput").addEventListener("input", (event) => {
    state.avoid = event.target.value;
    persistState();
  });
}

function renderPlan(container) {
  const recommended = getRecommendedRecipes();
  const plan = document.createElement("div");
  plan.className = "plan-summary";
  plan.innerHTML = `
    <strong>Your starter plan</strong>
    <div class="summary-line">
      <span>${timeRangeLabel()} usual range</span>
      <span>${todayTimeLabel()} right now</span>
      <span>${styleLabel()}</span>
      <span>${fallbackLabel()}</span>
      <span>${skillLabel()} guidance</span>
      <span>${restrictionLabel()}</span>
      <span>${ingredientLabel()}</span>
    </div>
  `;

  const grid = document.createElement("div");
  grid.className = "recipe-grid";
  recommended.forEach((recipe) => grid.append(renderRecipeCard(recipe)));

  container.append(plan, createTodayTimePicker(), grid);

  if (state.savedRecipes.length > 0) {
    const banner = document.createElement("div");
    banner.className = "completion-banner";
    banner.innerHTML = `<strong>First milestone reached.</strong><span>Your grocery list can start from the saved recipe, with the first cook targeted for the next 7 days.</span>`;
    container.append(banner);
  }
}

function renderRecipeCard(recipe) {
  const card = document.createElement("article");
  card.className = "recipe-card";
  const saved = state.savedRecipes.includes(recipe.id);
  card.innerHTML = `
    <img src="${recipe.image}" width="520" height="320" alt="Illustration for ${recipe.title}">
    <div class="recipe-content">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>${recipe.time} min</span>
        <span>${recipe.skill}</span>
        <span>${recipe.ingredients} ingredients</span>
      </div>
      <p class="match-reason">${getMatchReason(recipe)}</p>
      <p>${recipe.summary}</p>
    </div>
    <button class="save-button ${saved ? "saved" : ""}" type="button">${saved ? "Saved" : "Save recipe"}</button>
  `;

  card.querySelector(".save-button").addEventListener("click", () => {
    if (!state.savedRecipes.includes(recipe.id)) {
      state.savedRecipes.push(recipe.id);
      showToast(`${recipe.title} saved`);
    } else {
      state.savedRecipes = state.savedRecipes.filter((id) => id !== recipe.id);
      showToast(`${recipe.title} removed`);
    }
    persistState();
    renderStep();
  });

  return card;
}

function getRecommendedRecipes() {
  const hardRestrictions = state.restrictions.filter((item) => item !== "none");
  const minTime = Number(state.timeRangeMin || 20);
  const maxTime = Number(state.timeRangeMax || 45);
  const currentTime = Number(state.currentTime || minTime || 20);
  const maxIngredients = state.ingredientLimit === "5" ? 5 : state.ingredientLimit === "6-8" || state.ingredientLimit === "not-sure" ? 8 : 99;

  const scored = recipes
    .filter((recipe) => hardRestrictions.every((restriction) => recipe.dietary.includes(restriction)))
    .map((recipe) => {
      let score = 0;
      if (recipe.time <= currentTime) {
        score += 14;
      } else if (recipe.time <= currentTime + 10) {
        score += 1;
      } else {
        score -= Math.min(8, Math.ceil((recipe.time - currentTime) / 10) * 2);
      }
      if (recipe.time >= minTime && recipe.time <= maxTime) score += 4;
      else if (recipe.time < minTime) score += 2;
      if (recipe.ingredients <= maxIngredients) score += 3;
      if (recipe.skill === "Beginner" && ["beginner", "basic", ""].includes(state.skill)) score += 2;
      if (state.healthIntent === "vegetables" && recipe.tags.includes("healthy")) score += 2;
      if (state.healthIntent === "takeout-swap" && recipe.id === "chickpea-tacos") score += 2;
      if (state.healthIntent === "protein" && recipe.tags.includes("high-protein")) score += 2;
      if (state.blockers.includes("cleanup") && recipe.tags.includes("one-pan")) score += 2;
      if (state.blockers.includes("groceries") && recipe.ingredients <= 6) score += 2;
      if (state.cookingStyle === "meal-prep" && recipe.tags.includes("batchable")) score += 4;
      if (state.cookingStyle === "prep-shortcuts" && recipe.tags.includes("prep-shortcut")) score += 3;
      if (state.cookingStyle === "quick-dinners" && recipe.tags.includes("quick")) score += 3;
      if (state.cookingStyle === "flexible-fallbacks" && recipe.tags.includes("flexible")) score += 3;
      if (state.restartFriction === "prep-dread" && recipe.tags.includes("batchable") && recipe.tags.includes("one-pan")) score += 2;
      if (state.restartFriction === "effort-amnesia" && recipe.ingredients <= 6) score += 2;
      if (state.restartFriction === "grocery-reset" && (recipe.tags.includes("pantry") || recipe.ingredients <= 6)) score += 2;
      if (state.restartFriction === "decision-fatigue" && recipe.time <= 30) score += 2;
      if (state.blockers.includes("deciding") && recipe.time <= 30) score += 2;
      if (state.blockers.includes("prep") && (recipe.tags.includes("prep-shortcut") || recipe.ingredients <= 6)) score += 2;
      if (state.blockers.includes("cooking-flow") && (recipe.skill === "Beginner" || recipe.tags.includes("one-pan"))) score += 2;
      if (["takeout", "eat-out"].includes(state.fallback) && recipe.tags.includes("takeout-swap")) score += 3;
      if (state.fallback === "eat-out" && recipe.tags.includes("sit-down")) score += 2;
      if (state.fallback === "snack" && recipe.tags.includes("snack-upgrade")) score += 3;
      if (state.fallback === "leftovers" && (recipe.tags.includes("pantry") || recipe.tags.includes("leftovers") || recipe.tags.includes("flexible"))) score += 3;
      return { recipe, score };
    })
    .sort((a, b) => b.score - a.score || a.recipe.time - b.recipe.time)
    .map((item) => item.recipe);

  const fallback = recipes.filter((recipe) => !scored.some((item) => item.id === recipe.id));
  return [...scored, ...fallback].slice(0, 3);
}

function renderTimeRangePicker() {
  const values = [10, 20, 30, 45, 60];
  const wrapper = document.createElement("div");
  wrapper.className = "range-card";

  const minIndex = Math.max(0, values.indexOf(Number(state.timeRangeMin)));
  const maxIndex = Math.max(minIndex, values.indexOf(Number(state.timeRangeMax)));

  wrapper.innerHTML = `
    <div class="range-display">
      <span>Usual range</span>
      <strong>${formatTimeValue(values[minIndex])} - ${formatTimeValue(values[maxIndex])}</strong>
    </div>
    <div class="range-inputs" aria-label="Usual weekday dinner time range">
      <label>
        Short end
        <input id="timeRangeMin" type="range" min="0" max="${values.length - 1}" step="1" value="${minIndex}">
      </label>
      <label>
        Long end
        <input id="timeRangeMax" type="range" min="0" max="${values.length - 1}" step="1" value="${maxIndex}">
      </label>
    </div>
    <div class="range-scale" aria-hidden="true">
      ${values.map((value) => `<span>${formatTimeValue(value)}</span>`).join("")}
    </div>
  `;

  const minInput = wrapper.querySelector("#timeRangeMin");
  const maxInput = wrapper.querySelector("#timeRangeMax");

  const updateRange = () => {
    let nextMinIndex = Number(minInput.value);
    let nextMaxIndex = Number(maxInput.value);

    if (nextMinIndex > nextMaxIndex) {
      nextMaxIndex = nextMinIndex;
      maxInput.value = String(nextMaxIndex);
    }

    state.timeRangeMin = String(values[nextMinIndex]);
    state.timeRangeMax = String(values[nextMaxIndex]);
    if (Number(state.currentTime) < Number(state.timeRangeMin) || Number(state.currentTime) > Number(state.timeRangeMax)) {
      state.currentTime = state.timeRangeMin;
    }
    persistState();
    renderStep();
  };

  minInput.addEventListener("input", updateRange);
  maxInput.addEventListener("input", updateRange);

  return wrapper;
}

function createTodayTimePicker() {
  const block = document.createElement("div");
  block.className = "today-time";
  const heading = document.createElement("span");
  heading.className = "question-label";
  heading.textContent = "How much time do you have right now?";

  const group = document.createElement("div");
  group.className = "chip-group";
  [10, 20, 30, 45, 60].forEach((value) => {
    const selected = Number(state.currentTime) === value;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip ${selected ? "selected" : ""}`;
    button.setAttribute("aria-pressed", selected ? "true" : "false");
    button.textContent = formatTimeValue(value);
    button.addEventListener("click", () => {
      state.currentTime = String(value);
      persistState();
      renderStep();
    });
    group.append(button);
  });

  block.append(heading, group);
  return block;
}

function timeRangeLabel() {
  const min = Number(state.timeRangeMin || 20);
  const max = Number(state.timeRangeMax || 45);
  if (max >= 60) {
    return `${min}-60+ min`;
  }
  return `${min}-${max} min`;
}

function todayTimeLabel() {
  return formatTimeValue(Number(state.currentTime || state.timeRangeMin || 20));
}

function formatTimeValue(value) {
  return value >= 60 ? "60+ min" : `${value} min`;
}

function skillLabel() {
  const labels = {
    beginner: "beginner",
    basic: "basic",
    comfortable: "balanced",
    adventurous: "skill-building"
  };
  return labels[state.skill] || "beginner";
}

function styleLabel() {
  const labels = {
    "quick-dinners": "quick dinner mode",
    "meal-prep": "meal prep mode",
    "prep-shortcuts": "prep shortcut mode",
    "flexible-fallbacks": "flexible fallback mode"
  };
  return labels[state.cookingStyle] || "starter mode";
}

function getMatchReason(recipe) {
  const currentTime = Number(state.currentTime || state.timeRangeMin || 20);
  if (recipe.time <= currentTime) {
    return `Right-now fit: fits when you have about ${formatTimeValue(currentTime)}.`;
  }
  if (recipe.time > currentTime && recipe.time <= Number(state.timeRangeMax || 45)) {
    return `Usual-range fit: better for a ${timeRangeLabel()} day than a ${formatTimeValue(currentTime)} moment.`;
  }
  if (state.cookingStyle === "meal-prep" && recipe.tags.includes("batchable")) {
    return "Batch-friendly: makes the next few meals easier without a complex prep plan.";
  }
  if (state.cookingStyle === "prep-shortcuts" && recipe.tags.includes("prep-shortcut")) {
    return "Prep-shortcut fit: uses flexible pieces you can assemble fast later.";
  }
  if (state.cookingStyle === "quick-dinners" && recipe.tags.includes("quick")) {
    return "Quick-dinner fit: keeps the same-night cooking window short.";
  }
  if (state.cookingStyle === "flexible-fallbacks" && recipe.tags.includes("flexible")) {
    return "Fallback fit: easy to adjust when the week changes.";
  }
  if (state.restartFriction === "prep-dread" && recipe.tags.includes("one-pan")) {
    return "Lower reset cost: one pan and clear leftovers reduce the next prep lift.";
  }
  if (state.blockers.includes("deciding") && recipe.time <= 30) {
    return "Decision-light fit: a clear default for nights when choosing is the blocker.";
  }
  if (state.blockers.includes("prep") && (recipe.tags.includes("prep-shortcut") || recipe.ingredients <= 6)) {
    return "Prep fit: keeps the starting steps short and easy to begin.";
  }
  if (state.blockers.includes("cooking-flow") && recipe.skill === "Beginner") {
    return "Step fit: beginner-friendly flow for staying oriented while cooking.";
  }
  if (state.blockers.includes("cleanup") && recipe.tags.includes("one-pan")) {
    return "Cleanup-aware: designed around one main cooking surface.";
  }
  if (["takeout", "eat-out"].includes(state.fallback) && recipe.tags.includes("takeout-swap")) {
    return "Fallback fit: gives you a takeout-style option without defaulting to delivery.";
  }
  if (state.fallback === "snack" && recipe.tags.includes("snack-upgrade")) {
    return "Fallback fit: keeps effort low while still feeling like a real dinner.";
  }
  if (state.fallback === "leftovers" && recipe.tags.includes("pantry")) {
    return "Fallback fit: works well when dinner depends on pantry odds and ends.";
  }
  if (state.healthIntent === "vegetables" && recipe.tags.includes("healthy")) {
    return "Health fit: adds vegetables without a heavy prep burden.";
  }
  return "Starter fit: beginner-friendly steps with a realistic weeknight scope.";
}

function fallbackLabel() {
  const labels = {
    takeout: "replaces takeout",
    "eat-out": "replaces eating out",
    snack: "upgrades snack dinner",
    leftovers: "pantry fallback"
  };
  return labels[state.fallback] || "fallback-aware";
}

function restrictionLabel() {
  const hardRestrictions = state.restrictions.filter((item) => item !== "none");
  return hardRestrictions.length ? hardRestrictions.join(", ") : "no hard restrictions";
}

function ingredientLabel() {
  if (state.ingredientLimit === "5") return "5-ingredient priority";
  if (state.ingredientLimit === "flexible") return "flexible ingredient count";
  return "short ingredient list";
}

function clampNumber(value, min, max) {
  const number = Number(value);
  if (Number.isNaN(number)) return min;
  return Math.min(max, Math.max(min, number));
}

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

els.menuButton.addEventListener("click", () => {
  if (els.drawer.classList.contains("open")) {
    closeDrawer();
  } else {
    openDrawer();
  }
});

els.drawerScrim.addEventListener("click", closeDrawer);

els.navLinks.forEach((link) => {
  link.addEventListener("click", () => setView(link.dataset.view || "onboarding"));
});

els.backButton.addEventListener("click", () => {
  currentStep = Math.max(0, currentStep - 1);
  renderStep({ scrollToPanel: true });
});

els.nextButton.addEventListener("click", () => {
  if (currentStep === steps.length - 1) {
    if (state.savedRecipes.length === 0) {
      showToast("Save one recipe to finish setup.");
      return;
    }
    state.completed = true;
    persistState();
    renderStep();
    showToast("Setup complete. Your first recipe is saved.");
    return;
  }

  currentStep = Math.min(steps.length - 1, currentStep + 1);
  renderStep({ scrollToPanel: true });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
  }
});

updateSavedCount();
renderStep();
