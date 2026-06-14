const STORAGE_KEY = "homestart-onboarding-v1";
const LEGACY_STORAGE_KEYS = ["homestart-state", "homestart-onboarding"];
const WELCOME_STEP = -1;
const TIME_WINDOW_MIN = 0;
const TIME_WINDOW_MAX = 60;
const TIME_WINDOW_STEP = 10;
const TIME_WINDOW_MIN_GAP = 10;

const initialState = {
  started: false,
  answeredSteps: [],
  frequency: "",
  cookingStyle: "",
  fallback: "",
  timeBudget: "",
  timeRangeMin: "",
  timeRangeMax: "",
  currentTime: "",
  blockers: [],
  restartFriction: "",
  skill: "",
  guidance: "",
  abandonReason: "",
  restrictions: ["none"],
  healthIntent: "",
  servings: "2",
  ingredientLimit: "",
  firstCookDay: "",
  savedRecipes: [],
  completed: false,
  dashboardMode: "simple",
  dashboardPreset: "low-commitment",
  dashboardFilters: {
    maxTime: "20",
    maxIngredients: "8",
    effort: "easy",
    restriction: "none",
    guidance: "balanced",
    servings: "2"
  },
  savedSearch: "",
  savedPresetFilter: "all"
};

const recipes = [
  {
    id: "hummus-plate",
    title: "Ten-Minute Hummus Plate",
    time: 10,
    skill: "Beginner",
    effort: "easy",
    instructionLevel: "detailed",
    ingredients: 5,
    serves: 2,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    tags: ["vegetarian", "dairy-free", "quick", "pantry", "snack-upgrade", "flexible", "low-commitment"],
    dietary: ["vegetarian", "dairy-free"],
    summary: "Hummus, pita, crisp vegetables, olives, and canned chickpeas become a real dinner with almost no cooking."
  },
  {
    id: "chickpea-tacos",
    title: "Five-Ingredient Chickpea Tacos",
    time: 22,
    skill: "Beginner",
    effort: "easy",
    instructionLevel: "balanced",
    ingredients: 5,
    serves: 3,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
    tags: ["vegetarian", "dairy-free", "quick", "healthy", "flexible", "takeout-swap", "spicy", "low-commitment"],
    dietary: ["vegetarian", "dairy-free"],
    summary: "Warm chickpeas, crunchy slaw, tortillas, salsa, and lime. Low prep, easy to repeat, and flexible for leftovers."
  },
  {
    id: "sheet-pan-chicken",
    title: "Lemon Garlic Sheet-Pan Chicken",
    time: 35,
    skill: "Beginner",
    effort: "moderate",
    instructionLevel: "balanced",
    ingredients: 7,
    serves: 4,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
    tags: ["high-protein", "one-pan", "gluten-free", "dairy-free", "batchable", "leftovers", "sit-down", "family-friendly", "gym-meal-plan"],
    dietary: ["gluten-free", "dairy-free"],
    summary: "Chicken, potatoes, and vegetables roast together with one cleanup point, clear doneness checks, and leftovers."
  },
  {
    id: "rice-bowl",
    title: "Shortcut Veggie Rice Bowl",
    time: 28,
    skill: "Beginner",
    effort: "easy",
    instructionLevel: "detailed",
    ingredients: 6,
    serves: 2,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
    tags: ["vegetarian", "gluten-free", "dairy-free", "healthy", "prep-shortcut", "flexible", "takeout-swap", "snack-upgrade", "gym-meal-plan"],
    dietary: ["vegetarian", "gluten-free", "dairy-free"],
    summary: "Microwave rice, crisp vegetables, canned beans, and a simple sauce with flexible portions and shortcut prep."
  },
  {
    id: "tomato-pasta",
    title: "Creamy Tomato Pantry Pasta",
    time: 30,
    skill: "Beginner",
    effort: "easy",
    instructionLevel: "balanced",
    ingredients: 7,
    serves: 4,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
    tags: ["vegetarian", "comfort", "budget", "quick", "pantry", "snack-upgrade", "family-friendly", "pantry-rescue"],
    dietary: ["vegetarian"],
    summary: "A forgiving pasta dinner with pantry staples and optional vegetables stirred in at the end."
  },
  {
    id: "bean-skillet",
    title: "Bean And Sweet Potato Skillet",
    time: 34,
    skill: "Beginner",
    effort: "moderate",
    instructionLevel: "detailed",
    ingredients: 6,
    serves: 4,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    tags: ["vegetarian", "gluten-free", "dairy-free", "one-pan", "batchable", "leftovers", "pantry", "gym-meal-plan", "pantry-rescue"],
    dietary: ["vegetarian", "gluten-free", "dairy-free"],
    summary: "A sturdy one-pan meal with canned beans, pre-cut sweet potatoes, greens, and portions that hold up well."
  }
];

const simplePresets = [
  {
    id: "low-commitment",
    label: "Low commitment",
    detail: "Fast and doable.",
    tags: ["low-commitment", "quick"],
    filters: { maxTime: "20", maxIngredients: "6", effort: "easy", guidance: "detailed" }
  },
  {
    id: "something-spicy",
    label: "Something spicy",
    detail: "Warm and punchy.",
    tags: ["spicy", "takeout-swap"],
    filters: { maxTime: "35", maxIngredients: "8", effort: "easy", guidance: "balanced" }
  },
  {
    id: "gym-meal-plan",
    label: "Gym meal-plan",
    detail: "Protein plus leftovers.",
    tags: ["gym-meal-plan", "high-protein", "healthy"],
    filters: { maxTime: "45", maxIngredients: "10", effort: "moderate", guidance: "balanced", servings: "4" }
  },
  {
    id: "family-friendly",
    label: "Family-friendly",
    detail: "Familiar, more servings.",
    tags: ["family-friendly", "comfort"],
    filters: { maxTime: "45", maxIngredients: "10", effort: "easy", guidance: "balanced", servings: "4" }
  },
  {
    id: "pantry-rescue",
    label: "Pantry rescue",
    detail: "Use what is around.",
    tags: ["pantry-rescue", "pantry", "budget"],
    filters: { maxTime: "30", maxIngredients: "8", effort: "easy", guidance: "quick" }
  }
];

const frequencyChoices = [
  {
    value: "almost-never",
    label: "Almost never",
    detail: "Most nights are takeout or no cooked meal.",
    icon: "clock-3"
  },
  {
    value: "1-2",
    label: "1-2 nights",
    detail: "A few evenings with room to keep it easy.",
    icon: "timer"
  },
  {
    value: "3-4",
    label: "3-4 nights",
    detail: "You cook often but still want a practical default.",
    icon: "utensils"
  },
  {
    value: "most-nights",
    label: "Most nights",
    detail: "Home cooking is already a regular rhythm.",
    icon: "chef-hat"
  }
];

const cookingStyleChoices = [
  {
    value: "quick-dinners",
    label: "Quick dinners",
    detail: "Prioritize speed and straightforward steps.",
    icon: "zap"
  },
  {
    value: "meal-prep",
    label: "Meal prep once",
    detail: "Use one prep pass to cover a few meals.",
    icon: "potato"
  },
  {
    value: "prep-shortcuts",
    label: "Prep shortcuts",
    detail: "Keep prep fast with shortcut-friendly recipes.",
    icon: "blender"
  },
  {
    value: "flexible-fallbacks",
    label: "Flexible fallbacks",
    detail: "Keep plan adaptable when time or ingredients change.",
    icon: "refresh-cw"
  }
];

const timeWindowChoices = [
  {
    value: "0-20",
    label: "0-20 min",
    detail: "Fast assembly, tiny cook, and cleanup included.",
    min: "0",
    max: "20",
    current: "20",
    icon: "salad"
  },
  {
    value: "20-40",
    label: "20-40 min",
    detail: "A realistic weeknight cook with a little breathing room.",
    min: "20",
    max: "40",
    current: "40",
    icon: "timer"
  },
  {
    value: "40-60",
    label: "40-60 min",
    detail: "Room for roasting, simmering, and reset time afterward.",
    min: "40",
    max: "60",
    current: "60",
    icon: "cooking-pot"
  },
  {
    value: "flexible",
    label: "Flexible",
    detail: "Start broad and let recommendations adjust as needed.",
    min: "0",
    max: "60",
    current: "60",
    icon: "sparkles"
  }
];

const skillLevelChoices = [
  {
    value: "beginner",
    label: "Beginner",
    detail: "I’m just getting started and want reassuring basics.",
    icon: "chef-hat"
  },
  {
    value: "basic",
    label: "Some basics",
    detail: "I can follow straightforward steps and build confidence quickly.",
    icon: "salad"
  },
  {
    value: "comfortable",
    label: "Comfortable",
    detail: "I’m comfortable with normal recipe flow and standard technique.",
    icon: "sparkles"
  },
  {
    value: "adventurous",
    label: "Adventurous",
    detail: "I’m ready for a little more kitchen variety.",
    icon: "flame"
  }
];

const guidanceChoices = [
  {
    value: "detailed",
    label: "Walk me through it",
    detail: "Use checkpoints, doneness cues, and plain-language steps.",
    icon: "chef-hat"
  },
  {
    value: "balanced",
    label: "Balanced guidance",
    detail: "Give me concise steps and call out tricky moments.",
    icon: "sliders-horizontal"
  },
  {
    value: "quick",
    label: "Quick scan",
    detail: "I mainly need sequence, timing, and key cues.",
    icon: "timer"
  },
  {
    value: "not-sure",
    label: "Not sure yet",
    detail: "Show recommendations and tune after the first recipe.",
    icon: "help-circle"
  }
];

const restrictionChoices = [
  {
    value: "none",
    label: "None",
    detail: "No hard restrictions for your starter recipe.",
    restrictions: ["none"],
    icon: "check"
  },
  {
    value: "vegetarian",
    label: "Vegetarian",
    detail: "Prioritize recipes that work without meat.",
    restrictions: ["vegetarian"],
    icon: "leaf"
  },
  {
    value: "dairy-free",
    label: "Dairy-free",
    detail: "Prioritize recipes that avoid dairy.",
    restrictions: ["dairy-free"],
    icon: "milk-off"
  },
  {
    value: "gluten-free",
    label: "Gluten-free",
    detail: "Prioritize recipes that avoid gluten.",
    restrictions: ["gluten-free"],
    icon: "wheat-off"
  }
];

const ingredientLimitChoices = [
  { value: "5", label: "5 or fewer", detail: "Keep ingredients short and simple.", icon: "list" },
  { value: "6-8", label: "6–8", detail: "Still compact, with a little headroom.", icon: "list-checks" },
  { value: "flexible", label: "Flexible", detail: "Allow extra ingredients if it helps quality.", icon: "layers" },
  { value: "not-sure", label: "Not sure", detail: "Start with a recommendation-based limit.", icon: "help-circle" }
];

const servingsChoices = [
  { value: "1", label: "1 serving" },
  { value: "2", label: "2 servings" },
  { value: "3", label: "3 servings" },
  { value: "4", label: "4 servings" },
  { value: "6", label: "6 servings" },
  { value: "8", label: "8 servings" }
];

const planTimingChoices = [
  {
    value: "Tonight",
    label: "Tonight",
    detail: "Keep the momentum while the recipe is fresh.",
    icon: "moon"
  },
  {
    value: "Tomorrow",
    label: "Tomorrow",
    detail: "Give future-you one clear next step.",
    icon: "calendar-days"
  },
  {
    value: "This weekend",
    label: "This weekend",
    detail: "Save it for a lower-pressure cooking window.",
    icon: "basket"
  },
  {
    value: "Next week",
    label: "Next week",
    detail: "Keep the plan ready without pressure.",
    icon: "basket"
  }
];

const steps = [
  {
    eyebrow: "Cooking routine",
    category: "Cooking routine",
    title: "How does home cooking fit your week right now?",
    copy: "Start with your current routine and the kind of cooking support you want next.",
    render: renderCookingRoutine,
    isValid: () => Boolean(state.frequency && state.cookingStyle && state.timeRangeMin && state.timeRangeMax),
    progressColor: "sage",
    illustrationStage: "Cooking routine",
    icons: ["utensils", "carrot", "soup"],
    heat: "1"
  },
  {
    eyebrow: "Recipe support",
    category: "Recipe support",
    title: "How much support should your recipes give you?",
    copy: "We’ll adjust recipe steps, checkpoints, and detail level based on your comfort.",
    render: renderRecipeSupport,
    isValid: () => Boolean(state.skill && state.guidance),
    progressColor: "tomato",
    illustrationStage: "Add guidance",
    icons: ["chef-hat", "sliders-horizontal", "sparkles"],
    heat: "2"
  },
  {
    eyebrow: "Food boundaries",
    category: "Food boundaries",
    title: "What should recommendations respect first?",
    copy: "Hard restrictions, ingredient tolerance, and servings shape a practical first recipe.",
    render: renderFoodBoundaries,
    isValid: () => Boolean(state.restrictions.length > 0 && state.ingredientLimit && state.servings),
    progressColor: "gold",
    illustrationStage: "Choose ingredients",
    icons: ["leaf", "list-checks", "users-2"],
    heat: "3"
  },
  {
    eyebrow: "Review recipe",
    category: "Review recipe",
    title: "Review your first recipe",
    copy: "Review your first recipe and save when you’re ready.",
    render: renderReviewRecipe,
    isValid: () => state.savedRecipes.length > 0,
    progressColor: "herb",
    illustrationStage: "Plate the win",
    icons: ["salad", "check", "sparkles"],
    heat: "4"
  }
];

const ONBOARDING_FIRST_SCREEN_INDEX = 0;
const ONBOARDING_REVIEW_STEP_INDEX = steps.length - 1;

const state = migrateState(loadState());
let currentStep = state.completed ? 0 : state.started ? getFirstIncompleteStep() : WELCOME_STEP;
let activeView = "onboarding";
let dashboardTab = "dashboard";
let savedDockOpen = false;
let toastTimer;
let progressTimer;
let completionTimer;
let lastAnsweredKey = "";

const els = {
  menuButton: document.querySelector("#menuButton"),
  drawer: document.querySelector("#drawer"),
  drawerScrim: document.querySelector("#drawerScrim"),
  navLinks: document.querySelectorAll("[data-view]"),
  navButtons: document.querySelectorAll(".nav-link"),
  onboardingPage: document.querySelector("#onboardingPage"),
  onboardingLayout: document.querySelector(".onboarding-layout"),
  rationalePage: document.querySelector("#rationalePage"),
  flowPanel: document.querySelector(".flow-panel"),
  progressHeader: document.querySelector(".progress-header"),
  progressTrack: document.querySelector(".progress-track"),
  stepEyebrow: document.querySelector("#stepEyebrow"),
  stepTitle: document.querySelector("#stepTitle"),
  stepCount: document.querySelector("#stepCount"),
  progressBar: document.querySelector("#progressBar"),
  screenBody: document.querySelector("#screenBody"),
  backButton: document.querySelector("#backButton"),
  nextButton: document.querySelector("#nextButton"),
  resetFlowButton: document.querySelector("#resetFlowButton"),
  savedCount: document.querySelector("#savedCount"),
  toast: document.querySelector("#toast")
};

function loadState() {
  const keys = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];
  for (const key of keys) {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      if (saved && typeof saved === "object") {
        return saved;
      }
    } catch {
      return {};
    }
  }
  return {};
}

function migrateState(savedState = {}) {
  const defaults = cloneInitialState();
  const source = savedState && typeof savedState === "object" ? savedState : {};
  const next = {
    ...defaults,
    ...source,
    dashboardFilters: {
      ...defaults.dashboardFilters,
      ...(source.dashboardFilters && typeof source.dashboardFilters === "object" ? source.dashboardFilters : {})
    }
  };

  const validBlockers = new Set(["deciding", "groceries", "prep", "cooking-flow", "cleanup"]);
  next.blockers = Array.isArray(next.blockers) ? next.blockers.filter((item) => validBlockers.has(item)) : [];

  const validRestrictions = new Set(["none", "vegetarian", "dairy-free", "gluten-free"]);
  next.restrictions = Array.isArray(next.restrictions) ? next.restrictions.filter((item) => validRestrictions.has(item)) : [];
  if (next.restrictions.length === 0) {
    next.restrictions = ["none"];
  }
  if (next.restrictions.includes("none") && next.restrictions.length > 1) {
    next.restrictions = next.restrictions.filter((item) => item !== "none");
  }

  next.savedRecipes = Array.isArray(next.savedRecipes)
    ? Array.from(new Set(next.savedRecipes.filter((id) => typeof id === "string")))
    : [];
  const sourceAnsweredSteps = getSavedStepIndexes(source.answeredSteps);
  const sourceCompleted = Boolean(source.completed);
  const hasSavedRecipeProgress = next.savedRecipes.length > 0;
  next.answeredSteps = normalizeAnsweredSteps(next.answeredSteps, source);

  if (!next.cookingStyle && next.fallback) {
    next.cookingStyle = next.fallback;
  }

  const shouldMapTimeWindow =
    sourceCompleted ||
    sourceAnsweredSteps.some((index) => index >= 0 && index <= 2) ||
    (sourceAnsweredSteps.length === 0 && hasLegacyProgress(source) && Boolean(source.timeBudget || source.timeRangeMin || source.timeRangeMax));

  if (shouldMapTimeWindow) {
    if (!next.timeRangeMin || !next.timeRangeMax) {
      const oldBudget = Number(next.timeBudget || next.timeRangeMax || 40);
      if (oldBudget <= 20) {
        next.timeRangeMin = "0";
        next.timeRangeMax = "20";
      } else if (oldBudget <= 40) {
        next.timeRangeMin = "20";
        next.timeRangeMax = "40";
      } else {
        next.timeRangeMin = "40";
        next.timeRangeMax = "60";
      }
    }

    const normalizedRange = normalizeTimeRangePair(next.timeRangeMin, next.timeRangeMax);
    next.timeRangeMin = String(normalizedRange.min);
    next.timeRangeMax = String(normalizedRange.max);
    next.currentTime = normalizeChoice(next.currentTime || next.timeRangeMax, ["10", "20", "30", "40", "50", "60"], next.timeRangeMax);
    if (Number(next.currentTime) < Number(next.timeRangeMin) || Number(next.currentTime) > Number(next.timeRangeMax)) {
      next.currentTime = next.timeRangeMax;
    }
  } else {
    next.timeRangeMin = "";
    next.timeRangeMax = "";
    next.currentTime = "";
  }

  next.servings = String(clampNumber(next.servings, 1, 8));
  next.ingredientLimit = normalizeChoice(next.ingredientLimit, ["5", "6-8", "flexible", "not-sure"], defaults.ingredientLimit);
  const shouldMapPlanTiming = sourceCompleted || sourceAnsweredSteps.some((index) => index >= 4) || hasSavedRecipeProgress;
  next.firstCookDay = shouldMapPlanTiming ? normalizeFirstCookDay(next.firstCookDay, planTimingChoices[0].value) : "";
  next.dashboardMode = normalizeChoice(next.dashboardMode, ["simple", "advanced"], defaults.dashboardMode);
  next.dashboardPreset = normalizeChoice(next.dashboardPreset, [...simplePresets.map((preset) => preset.id), "custom"], defaults.dashboardPreset);
  next.savedPresetFilter = normalizeChoice(next.savedPresetFilter, ["all", ...simplePresets.map((preset) => preset.id)], defaults.savedPresetFilter);
  next.savedSearch = typeof next.savedSearch === "string" ? next.savedSearch : "";
  next.completed = Boolean(next.completed);
  next.started = Boolean(next.started || next.completed || hasLegacyProgress(source));

  const filter = next.dashboardFilters;
  const onboardingRestriction = next.restrictions.find((item) => item !== "none") || "none";
  filter.maxTime = normalizeChoice(filter.maxTime, ["10", "20", "30", "40", "45", "60"], next.timeRangeMax);
  filter.maxIngredients = normalizeChoice(filter.maxIngredients, ["5", "6", "8", "10", "12", "99"], ingredientFilterDefault(next.ingredientLimit));
  filter.effort = normalizeChoice(filter.effort, ["any", "easy", "moderate", "project"], "easy");
  filter.restriction = normalizeChoice(filter.restriction || onboardingRestriction, ["none", "vegetarian", "dairy-free", "gluten-free"], onboardingRestriction);
  filter.guidance = normalizeChoice(filter.guidance || next.guidance, ["detailed", "balanced", "quick", "not-sure"], "balanced");
  filter.servings = String(clampNumber(filter.servings || next.servings, 1, 8));

  return next;
}

function cloneInitialState() {
  return JSON.parse(JSON.stringify(initialState));
}

function resetStateObject() {
  const freshState = cloneInitialState();
  Object.keys(state).forEach((key) => {
    delete state[key];
  });
  Object.assign(state, freshState);
}

function iconMarkup(name) {
  return name ? `<i data-lucide="${escapeAttribute(name)}" aria-hidden="true"></i>` : "";
}

function refreshIcons() {
  try {
    window.lucide?.createIcons?.({
      attrs: {
        "stroke-width": 2,
        width: 18,
        height: 18,
        "aria-hidden": "true"
      }
    });
  } catch {
  }
}

function hasLegacyProgress(source) {
  return Boolean(
    source.frequency ||
      source.timeRangeMin ||
      source.timeRangeMax ||
      source.timeBudget ||
      source.cookingStyle ||
      source.skill ||
      source.guidance ||
      (Array.isArray(source.restrictions) && source.restrictions.length > 0) ||
      source.ingredientLimit ||
      source.servings ||
      source.completed ||
      (Array.isArray(source.savedRecipes) && source.savedRecipes.length)
  );
}

function normalizeAnsweredSteps(value, source) {
  const savedSteps = getSavedStepIndexes(value);
  if (source.completed) {
    return steps.map((_, index) => index);
  }
  const mappedSavedSteps = mapLegacyStepIndexes(savedSteps);

  const inferred = [];
  const hasSourceTimeMin = Object.prototype.hasOwnProperty.call(source, "timeRangeMin");
  const hasSourceTimeMax = Object.prototype.hasOwnProperty.call(source, "timeRangeMax");
  const legacyProgress = hasLegacyProgress(source);
  if (source.frequency || source.cookingStyle || source.fallback) inferred.push(0);
  if (
    legacyProgress &&
    (source.timeBudget || (hasSourceTimeMin && source.timeRangeMin) || (hasSourceTimeMax && source.timeRangeMax) || source.restartFriction || source.currentTime)
  ) {
    inferred.push(0);
  }
  if (source.skill || source.guidance || source.abandonReason) inferred.push(1);
  if (
    legacyProgress &&
    ((Array.isArray(source.restrictions) && source.restrictions.some((item) => item !== "none")) ||
      source.healthIntent ||
      (source.ingredientLimit && source.ingredientLimit !== "6-8") ||
      (source.servings && String(source.servings) !== initialState.servings))
  ) {
    inferred.push(2);
  }
  if (Array.isArray(source.savedRecipes) && source.savedRecipes.length > 0) inferred.push(ONBOARDING_REVIEW_STEP_INDEX);
  return Array.from(new Set([...mappedSavedSteps, ...inferred])).sort((a, b) => a - b);
}

function getSavedStepIndexes(value) {
  return Array.isArray(value)
    ? Array.from(new Set(value.map((item) => Number(item)).filter((item) => Number.isInteger(item) && item >= 0))).sort(
        (a, b) => a - b
      )
    : [];
}

function mapLegacyStepIndexes(values = []) {
  const mapped = new Set();
  values.forEach((index) => {
    if (index >= 0 && index <= 2) {
      mapped.add(0);
    }
    if (index === 3) {
      mapped.add(1);
    }
    if (index === 4) {
      mapped.add(2);
    }
    if (index >= 5) {
      mapped.add(ONBOARDING_REVIEW_STEP_INDEX);
    }
  });
  return Array.from(mapped).sort((a, b) => a - b);
}

function normalizeChoice(value, choices, fallback) {
  const stringValue = String(value || "");
  return choices.includes(stringValue) ? stringValue : fallback;
}

function getTimeWindowForMax(maxValue) {
  const max = Number(maxValue || 20);
  if (max <= 20) return timeWindowChoices[0];
  if (max <= 40) return timeWindowChoices[1];
  return timeWindowChoices[2];
}

function normalizeFirstCookDay(value, fallback = initialState.firstCookDay) {
  const stringValue = String(value || "");
  const legacyMap = {
    "After work tonight": "Tonight",
    "Later this week": "Tomorrow",
    "Weekend / next week": "This weekend"
  };
  const normalized = legacyMap[stringValue] || stringValue;
  return planTimingChoices.some((choice) => choice.value === normalized) ? normalized : fallback;
}

function getSelectedPlanTimingChoice() {
  return normalizeFirstCookDay(state.firstCookDay);
}

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    showToast("Your browser blocked saving, but you can keep exploring.");
  }
  updateSavedCount();
  syncFrameState();
}

function updateSavedCount() {
  const count = state.savedRecipes.length;
  if (!state.completed) {
    els.savedCount.textContent = currentStep === WELCOME_STEP ? "~2 min" : `${currentStep + 1}/${steps.length}`;
    return;
  }
  els.savedCount.textContent = `${count} saved`;
}

function showToast(message) {
  if (!els.toast) return;
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

function ensureResetControl() {
  if (document.querySelector("[data-reset-state]") || !els.drawer) return;

  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "nav-link drawer-reset-button";
  resetButton.dataset.resetState = "true";
  resetButton.innerHTML = `${iconMarkup("rotate-ccw")}<span>Reset experience</span>`;
  els.drawer.append(resetButton);
}

function clearStoredExperience() {
  [STORAGE_KEY, ...LEGACY_STORAGE_KEYS].forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch {
    }
  });
}

function resetTransientState() {
  window.clearTimeout(toastTimer);
  window.clearTimeout(progressTimer);
  window.clearTimeout(completionTimer);
  progressTimer = null;
  completionTimer = null;
  lastAnsweredKey = "";
  delete document.body.dataset.lastAnswer;
  delete els.flowPanel.dataset.lastAnswer;
  document.body.classList.remove("has-recent-answer");
  els.flowPanel.classList.remove("has-recent-answer", "is-completing");
  document.querySelectorAll(".food-celebration").forEach((layer) => layer.remove());
}

function resetExperience() {
  clearStoredExperience();
  resetStateObject();
  resetTransientState();
  currentStep = WELCOME_STEP;
  activeView = "onboarding";
  dashboardTab = "dashboard";
  savedDockOpen = false;

  els.onboardingPage.classList.add("active");
  els.rationalePage.classList.remove("active");
  removeDashboardRoot();
  closeDrawer();
  updateSavedCount();
  updateActiveNav();
  renderStep();
  syncFrameState("onboarding");
  window.scrollTo({ top: 0, behavior: "auto" });
  showToast("Reset. Start fresh.");
}

function setView(view) {
  activeView = view === "rationale" ? "rationale" : "onboarding";
  els.onboardingPage.classList.toggle("active", activeView === "onboarding");
  els.rationalePage.classList.toggle("active", activeView === "rationale");
  updateActiveNav();
  closeDrawer();

  if (activeView === "onboarding") {
    renderHome();
  } else {
    syncFrameState("rationale");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateActiveNav() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkView = link.dataset.view;
    link.classList.toggle("active", Boolean(linkView && linkView === activeView));
  });
}

function syncIntroPanelVisibility(surface = state.completed && activeView === "onboarding" ? "dashboard" : "onboarding") {
  if (!els.onboardingLayout) return;
  const introPanel = els.onboardingLayout.querySelector(".intro-panel");
  if (!introPanel) return;

  introPanel.hidden = Boolean(state.completed && surface === "dashboard");
}

function syncFrameState(surface = state.completed && activeView === "onboarding" ? "dashboard" : "onboarding") {
  document.body.dataset.appView = activeView;
  document.body.dataset.homeSurface = surface;
  document.body.dataset.onboardingStatus = state.completed ? "complete" : state.started ? "started" : "welcome";
  document.body.dataset.onboardingStep = currentStep === WELCOME_STEP ? "welcome" : String(currentStep + 1);
  document.body.dataset.savedDock = savedDockOpen ? "open" : "collapsed";
  syncIntroPanelVisibility(surface);
  applyProgressData(document.body, surface);
  applyProgressData(els.flowPanel, surface);
  document.body.classList.toggle("is-onboarding-complete", state.completed);
  document.body.classList.toggle("has-recent-answer", Boolean(lastAnsweredKey));
}

function applyProgressData(target, surface = "onboarding") {
  if (!target) return;
  const progressIndex = getProgressIndex(surface);
  const progressTotal = steps.length;
  const progressRatio = progressTotal === 0 ? 0 : progressIndex / progressTotal;
  const step = currentStep === WELCOME_STEP ? null : steps[currentStep];

  target.dataset.progressIndex = String(progressIndex);
  target.dataset.progressTotal = String(progressTotal);
  target.dataset.progressRatio = progressRatio.toFixed(2);
  target.dataset.progressColor = state.completed ? "complete" : step?.progressColor || "welcome";
  target.dataset.pingScale = lastAnsweredKey ? "1.08" : "1";
}

function getProgressIndex(surface = "onboarding") {
  if (state.completed || surface === "dashboard") return steps.length;
  if (currentStep === WELCOME_STEP) return 0;
  return currentStep + 1;
}

function getMilestoneEyebrow(step) {
  const labels = {
    "Cooking routine": "Cooking routine",
    "Recipe support": "Recipe support",
    "Food boundaries": "Food boundaries",
    "Review recipe": "Review recipe"
  };
  return labels[step.eyebrow] || step.eyebrow;
}

function renderHome() {
  if (state.completed) {
    renderDashboard();
  } else {
    renderStep();
  }
}

function renderStep(options = {}) {
  removeDashboardRoot();
  els.flowPanel.hidden = false;
  els.flowPanel.classList.remove("is-dashboard-hidden", "is-completing");
  els.flowPanel.classList.toggle("is-welcome", currentStep === WELCOME_STEP);
  els.flowPanel.classList.toggle("is-onboarding-question", currentStep !== WELCOME_STEP);
  syncFrameState("onboarding");

  if (currentStep === WELCOME_STEP) {
    renderWelcome();
    return;
  }

  const step = steps[currentStep];
  if (currentStep === 0) {
    ensureTimeWindowDefault();
  }
  const completedSections = getCompletedSectionCount();
  const progressPercent = Math.round((completedSections / steps.length) * 100);
  const isComplete = isStepAnswered(currentStep);

  els.stepEyebrow.textContent = getMilestoneEyebrow(step);
  els.stepTitle.textContent = step.title;
  els.stepCount.textContent = `${currentStep + 1}/${steps.length}`;
  els.progressBar.style.width = `${progressPercent}%`;
  els.progressBar.dataset.progressValue = String(progressPercent);
  els.progressTrack.dataset.progressState = isComplete ? "answered" : "in-progress";
  els.progressHeader.dataset.stepStatus = isComplete ? "answered" : "in-progress";
  els.screenBody.dataset.screenIndex = String(currentStep + 1);
  els.screenBody.dataset.screenStatus = isComplete ? "answered" : "in-progress";
  els.flowPanel.classList.toggle("is-step-complete", isComplete);
  els.screenBody.innerHTML = "";

  renderCookingIllustration(els.screenBody, step);

  const copy = document.createElement("p");
  copy.className = "screen-copy";
  copy.textContent = step.copy;
  els.screenBody.append(copy);
  step.render(els.screenBody);

  els.resetFlowButton.hidden = false;
  els.backButton.hidden = false;
  els.backButton.disabled = currentStep === 0;
  els.nextButton.textContent = currentStep === steps.length - 1 ? completionButtonText() : "Next";
  els.nextButton.disabled = !step.isValid();
  updateSavedCount();
  refreshIcons();

  if (options.scrollToPanel) {
    window.requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }
      els.flowPanel.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }
}

function renderWelcome() {
  els.stepEyebrow.textContent = "Welcome";
  els.stepTitle.textContent = "What does cooking look like for you this week?";
  els.stepCount.textContent = `0/${steps.length}`;
  els.progressBar.style.width = "0%";
  els.progressBar.dataset.progressValue = "0";
  els.progressTrack.dataset.progressState = "welcome";
  els.progressHeader.dataset.stepStatus = "welcome";
  els.screenBody.dataset.screenIndex = "welcome";
  els.screenBody.dataset.screenStatus = "welcome";
  els.screenBody.innerHTML = "";

  const intro = document.createElement("div");
  intro.className = "welcome-panel";
  intro.dataset.onboardingScreen = "welcome";
  intro.innerHTML = `
    <p class="screen-copy">No big meal-plan promise here. Answer a few tiny prompts, spend about two minutes, and HomeStart will turn that into a short recipe set that matches your time, confidence, food boundaries, and first cook day.</p>
    <div class="welcome-stats" aria-label="Setup summary">
      <article><strong>${steps.length}</strong><span>setup choices</span></article>
      <article><strong>~2 min</strong><span>rough setup time</span></article>
      <article><strong>1</strong><span>first saved recipe payoff</span></article>
    </div>
    <p class="welcome-note">Keep it approximate. You can change filters later from the dashboard.</p>
  `;

  renderCookingIllustration(intro);
  els.screenBody.append(intro);
  els.resetFlowButton.hidden = true;
  els.backButton.hidden = true;
  els.backButton.disabled = true;
  els.nextButton.disabled = false;
  els.nextButton.textContent = "Start quick setup";
  refreshIcons();
}

function renderCookingIllustration(container, step = null) {
  const visual = document.createElement("div");
  const stage = step?.illustrationStage || "Warm up the kitchen";
  const icons = step?.icons || ["salad", "carrot", "sparkles"];
  const heat = step?.heat || "1";

  visual.className = "cooking-illustration";
  visual.dataset.cookingStage = stage.toLowerCase().replaceAll(" ", "-");
  visual.dataset.heatLevel = heat;
  visual.innerHTML = `
    <span class="cooking-stage">${stage}</span>
    <span class="ingredient-row" aria-hidden="true">
      ${icons.map((icon, index) => `<span class="ingredient-icon" data-ingredient-index="${index + 1}">${iconMarkup(icon)}</span>`).join("")}
    </span>
    <span class="heat-meter" data-heat-level="${heat}" style="--heat-level: ${heat}"></span>
  `;
  container.append(visual);
}

function getChoiceLabel(choices, selectedValue, fallback = "Not set yet") {
  return choices.find((choice) => choice.value === selectedValue)?.label || fallback;
}

function getCookingStyleLabel() {
  return cookingStyleChoices.find((choice) => choice.value === state.cookingStyle)?.label || "Not set yet";
}

function getRestrictionSummary() {
  const values = getSelectedRestrictionValues();
  if (values.length === 0) {
    return "None";
  }
  return values.map((value) => restrictionChoices.find((choice) => choice.value === value)?.label || value).join(", ");
}

function getStepStatus(index) {
  if (isStepAnswered(index)) return "complete";
  if (currentStep === index) return "current";
  if (currentStep !== WELCOME_STEP && index < currentStep) return "needs-attention";
  return "pending";
}

function getCompletedSectionCount() {
  return steps.reduce((count, step, index) => count + (isStepAnswered(index) ? 1 : 0), 0);
}

function isStepAnswered(index) {
  return state.completed || state.answeredSteps.includes(index);
}

function markStepAnswered(index = currentStep) {
  if (index < 0 || !steps[index] || !steps[index].isValid()) return;
  if (!state.answeredSteps.includes(index)) {
    state.answeredSteps.push(index);
    state.answeredSteps.sort((a, b) => a - b);
  }
}

function noteAnswer(key) {
  markStepAnswered();
  lastAnsweredKey = key;
  document.body.dataset.lastAnswer = key;
  els.flowPanel.dataset.lastAnswer = key;
  els.flowPanel.classList.add("has-recent-answer");
  window.clearTimeout(progressTimer);
  progressTimer = window.setTimeout(() => {
    lastAnsweredKey = "";
    delete document.body.dataset.lastAnswer;
    delete els.flowPanel.dataset.lastAnswer;
    document.body.classList.remove("has-recent-answer");
    els.flowPanel.classList.remove("has-recent-answer");
    syncFrameState();
  }, 800);
}

function completionButtonText() {
  if (state.savedRecipes.length > 0) {
    return state.completed ? "Dashboard" : "Open dashboard";
  }
  return "Open dashboard";
}

function renderQuestionSection({ heading, intro = "", content }) {
  const section = document.createElement("section");
  section.className = "question-block";

  const headingRow = document.createElement("div");
  headingRow.className = "question-label";
  headingRow.innerHTML = `<strong>${heading}</strong>${intro ? `<span>${intro}</span>` : ""}`;

  section.append(headingRow, content);
  return section;
}

function renderOptionChoiceGroup({
  key,
  options,
  selectedValue,
  selectedValues = [],
  onSelect,
  onMultiSelect,
  columns = "default",
  multi = false
}) {
  const grid = document.createElement("div");
  grid.className = `choice-grid quick-choice-grid ${columns === "compact" ? "compact" : ""}`.trim();
  grid.dataset.answerKey = key;
  grid.dataset.answerMode = multi ? "multi" : "single";

  options.forEach((option) => {
    const isSingleSelected = !multi && (selectedValue ?? state[key]) === option.value;
    const isMultiSelected = multi && selectedValues.includes(option.value);
    const selected = multi ? isMultiSelected : isSingleSelected;

    const button = document.createElement("button");
    button.type = "button";
    button.className = `option-card choice-card quick-choice-card ${selected ? "selected is-selected" : ""}`;
    button.dataset.answerKey = key;
    button.dataset.answerValue = option.value;
    button.setAttribute("aria-pressed", selected ? "true" : "false");

    if (option.icon) {
      const icon = document.createElement("span");
      icon.className = "ingredient-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = iconMarkup(option.icon);
      button.append(icon);
    }

    const label = document.createElement("strong");
    label.textContent = option.label;
    const detail = document.createElement("span");
    detail.textContent = option.detail || "";
    button.append(label, detail);

    button.addEventListener("click", () => {
      if (multi) {
        if (onMultiSelect) {
          onMultiSelect(option);
        }
      } else if (onSelect) {
        onSelect(option);
      } else {
        state[key] = option.value;
      }
      noteAnswer(key);
      persistState();
      renderStep();
    });

    grid.append(button);
  });

  return grid;
}

function renderTimeWindowRange() {
  const currentMin = normalizeTimeRangeValue(state.timeRangeMin || "20", TIME_WINDOW_MIN);
  const currentMax = normalizeTimeRangeValue(state.timeRangeMax || "40", 40);
  const range = normalizeTimeRangePair(currentMin, currentMax);
  const isSelected = Boolean(state.timeRangeMin && state.timeRangeMax);
  const startPercent = getTimeRangePercent(range.min);
  const endPercent = getTimeRangePercent(range.max);

  const card = document.createElement("div");
  card.className = `time-range-card ${isSelected ? "is-selected" : ""}`;
  card.dataset.answerKey = "timeWindow";
  card.style.setProperty("--start-pct", `${startPercent}%`);
  card.style.setProperty("--end-pct", `${endPercent}%`);

  const display = document.createElement("div");
  display.className = "time-range-display";
  display.innerHTML = `
    <span>Usual dinner window</span>
    <strong data-time-range-value>${isSelected ? formatTimeRangeLabel(range.min, range.max) : "Choose a range"}</strong>
  `;

  const slider = document.createElement("div");
  slider.className = "time-range-slider";
  slider.innerHTML = `
    <span class="time-range-track" aria-hidden="true"></span>
    <span class="time-range-fill" aria-hidden="true"></span>
  `;

  const minInput = createTimeRangeInput("Short end", range.min);
  const maxInput = createTimeRangeInput("Long end", range.max);
  slider.append(minInput, maxInput);

  const scale = document.createElement("div");
  scale.className = "time-range-scale";
  scale.setAttribute("aria-hidden", "true");
  [0, 20, 40, 60].forEach((value) => {
    const label = document.createElement("span");
    label.textContent = value === 60 ? "60 min" : `${value} min`;
    scale.append(label);
  });

  const hint = document.createElement("p");
  hint.className = "time-range-hint";
  hint.textContent = "Includes cooking, eating, and cleanup.";

  const commitRange = (commit = false) => {
    const nextRange = normalizeTimeRangePair(minInput.value, maxInput.value);
    minInput.value = String(nextRange.min);
    maxInput.value = String(nextRange.max);
    card.classList.add("is-selected");
    card.style.setProperty("--start-pct", `${getTimeRangePercent(nextRange.min)}%`);
    card.style.setProperty("--end-pct", `${getTimeRangePercent(nextRange.max)}%`);
    display.querySelector("[data-time-range-value]").textContent = formatTimeRangeLabel(nextRange.min, nextRange.max);
    applyTimeWindowRange(nextRange.min, nextRange.max);
    els.nextButton.disabled = !steps[currentStep].isValid();

    if (commit) {
      noteAnswer("timeWindow");
      persistState();
      renderStep();
    }
  };

  minInput.addEventListener("input", () => commitRange(false));
  maxInput.addEventListener("input", () => commitRange(false));
  minInput.addEventListener("change", () => commitRange(true));
  maxInput.addEventListener("change", () => commitRange(true));

  card.append(display, slider, scale, hint);
  return card;
}

function createTimeRangeInput(label, value) {
  const input = document.createElement("input");
  input.className = "time-range-input";
  input.type = "range";
  input.min = String(TIME_WINDOW_MIN);
  input.max = String(TIME_WINDOW_MAX);
  input.step = String(TIME_WINDOW_STEP);
  input.value = String(value);
  input.setAttribute("aria-label", `${label} of dinner window including cleanup`);
  return input;
}

function renderSelect({ key, options, value }) {
  const control = document.createElement("label");
  control.className = "servings-select question-select";
  control.innerHTML = `<span class="question-select-label">Servings</span>`;
  const select = document.createElement("select");
  select.dataset.answerKey = key;

  options.forEach((option) => {
    const item = document.createElement("option");
    item.value = option.value;
    item.textContent = option.label;
    item.selected = String(option.value) === String(value);
    select.append(item);
  });

  select.addEventListener("change", () => {
    state[key] = select.value;
    noteAnswer(key);
    persistState();
    renderStep();
  });
  control.append(select);

  return control;
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
  syncDashboardRestrictionFromOnboarding();
}

function applyFrequencyChoice(option) {
  state.frequency = option.value;
}

function applyCookingStyleChoice(option) {
  state.cookingStyle = option.value;
  state.fallback = option.value;
}

function getSelectedTimeWindowChoice() {
  const selected = timeWindowChoices.find((choice) => choice.min === state.timeRangeMin && choice.max === state.timeRangeMax);
  return selected?.value || "";
}

function applyTimeWindowChoice(choice) {
  applyTimeWindowRange(choice.min, choice.max);
}

function applyTimeWindowRange(minValue, maxValue) {
  const range = normalizeTimeRangePair(minValue, maxValue);
  state.timeRangeMin = String(range.min);
  state.timeRangeMax = String(range.max);
  state.currentTime = String(range.max);
  state.timeBudget = String(range.max);
  state.dashboardFilters.maxTime = String(range.max);
}

function ensureTimeWindowDefault() {
  if (state.timeRangeMin && state.timeRangeMax) return;
  applyTimeWindowRange(20, 40);
}

function applySkillLevelChoice(option) {
  state.skill = option.value;
}

function applyGuidanceChoice(option) {
  state.guidance = option.value;
  state.dashboardFilters.guidance = option.value;
}

function applyRestrictionChoice(option) {
  const current = new Set(state.restrictions);
  if (option.value === "none") {
    current.clear();
    current.add("none");
  } else {
    current.delete("none");
    current.add(option.value);
  }
  state.restrictions = Array.from(current);
  syncDashboardRestrictionFromOnboarding();
}

function setIngredientLimit(option) {
  state.ingredientLimit = option.value;
  state.dashboardFilters.maxIngredients = ingredientFilterDefault(option.value);
}

function normalizeRestrictionSignature(restrictions = []) {
  return [...restrictions].sort().join("|");
}

function getSelectedRestrictionValues() {
  if (state.restrictions.includes("none") && state.restrictions.length === 1) {
    return ["none"];
  }
  return state.restrictions.filter((item) => item !== "none");
}

function renderCookingRoutine(container) {
  container.append(
    renderQuestionSection({
      heading: "How often do you cook dinner at home?",
      content: renderOptionChoiceGroup({
        key: "frequency",
        options: frequencyChoices,
        selectedValue: state.frequency,
        onSelect: applyFrequencyChoice
      })
    }),
    renderQuestionSection({
      heading: "How would you prefer cooking to work for you?",
      content: renderOptionChoiceGroup({
        key: "cookingStyle",
        options: cookingStyleChoices,
        selectedValue: state.cookingStyle,
        onSelect: applyCookingStyleChoice
      })
    }),
    renderQuestionSection({
      heading: "What dinner window actually works?",
      content: renderTimeWindowRange()
    })
  );
}

function renderRecipeSupport(container) {
  container.append(
    renderQuestionSection({
      heading: "Which skill level feels closest?",
      content: renderOptionChoiceGroup({
        key: "skill",
        options: skillLevelChoices,
        selectedValue: state.skill,
        onSelect: applySkillLevelChoice
      })
    }),
    renderQuestionSection({
      heading: "What instruction style would feel best at first?",
      content: renderOptionChoiceGroup({
        key: "guidance",
        options: guidanceChoices,
        selectedValue: state.guidance,
        onSelect: applyGuidanceChoice
      })
    })
  );
}

function renderFoodBoundaries(container) {
  container.append(
    renderQuestionSection({
      heading: "Any hard dietary restrictions?",
      content: renderOptionChoiceGroup({
        key: "restrictions",
        options: restrictionChoices,
        multi: true,
        selectedValues: getSelectedRestrictionValues(),
        onMultiSelect: applyRestrictionChoice
      })
    }),
    renderQuestionSection({
      heading: "How many ingredients feels manageable?",
      content: renderOptionChoiceGroup({
        key: "ingredientLimit",
        options: ingredientLimitChoices,
        selectedValue: state.ingredientLimit,
        onSelect: setIngredientLimit
      })
    }),
    renderQuestionSection({
      heading: "Default servings",
      content: renderSelect({
        key: "servings",
        options: servingsChoices,
        value: state.servings
      })
    })
  );
}

function renderReviewRecipe(container) {
  const recommended = getRecommendedRecipes()[0];
  const recommendationSummary = [
    `Window: ${timeWindowLabel()}`,
    `Style: ${getCookingStyleLabel()}`,
    `Support: ${skillSummaryLabel()}`,
    `Servings: ${state.servings} serving${state.servings === "1" ? "" : "s"}`,
    `Restrictions: ${getRestrictionSummary()}`,
    `Why it fits: ${recommended ? getMatchReason(recommended) : "Complete setup first"}`
  ];

  const plan = document.createElement("div");
  plan.className = "plan-summary";
  plan.innerHTML = `
    <strong>Your first dinner plan</strong>
    <div class="summary-line"></div>
  `;
  const summaryLine = plan.querySelector(".summary-line");
  recommendationSummary.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "summary-chip";
    chip.textContent = item;
    summaryLine.append(chip);
  });

  const grid = document.createElement("div");
  grid.className = "recipe-grid";
  if (recommended) {
    grid.append(renderRecipeCard(recommended, { context: "onboarding", showSaveAction: false }));
  } else {
    const fallback = document.createElement("p");
    fallback.textContent = "Complete the three setup screens and we can recommend a starter recipe.";
    grid.append(fallback);
  }

  container.append(plan);
  container.append(renderReviewActions(recommended));
  if (state.savedRecipes.length > 0) {
    container.append(renderCookNudge());
  }
  container.append(grid);

  if (state.savedRecipes.length > 0) {
    const banner = document.createElement("div");
    banner.className = "completion-banner";
    banner.innerHTML = `<strong>First recipe saved.</strong><span>Complete onboarding to open your dashboard.</span>`;
    container.append(banner);
  }
}

function timeWindowLabel() {
  if (!state.timeRangeMin || !state.timeRangeMax) return "Not set yet";
  return timeRangeLabel();
}

function renderReviewActions(recommendedRecipe) {
  const wrapper = document.createElement("div");
  wrapper.className = "review-actions";

  const saveAction = document.createElement("button");
  saveAction.type = "button";
  saveAction.className = "primary-button";
  const hasRecipe = Boolean(recommendedRecipe);
  const alreadySaved = hasRecipe && state.savedRecipes.includes(recommendedRecipe.id);
  saveAction.textContent = alreadySaved ? "Recipe saved" : "Save recipe";
  saveAction.disabled = !hasRecipe || alreadySaved;

  saveAction.addEventListener("click", () => {
    if (!recommendedRecipe || alreadySaved) return;
    toggleSavedRecipe(recommendedRecipe);
    if (!state.firstCookDay) {
      state.firstCookDay = "Tomorrow";
      persistState();
    }
    noteAnswer("savedRecipes");
    renderStep();
  });

  const editAction = document.createElement("button");
  editAction.type = "button";
  editAction.className = "secondary-button";
  editAction.textContent = "Edit preferences";
  editAction.addEventListener("click", () => {
    currentStep = ONBOARDING_FIRST_SCREEN_INDEX;
    renderStep({ scrollToPanel: true });
  });

  wrapper.append(saveAction, editAction);
  return wrapper;
}

function renderCookNudge() {
  const nudge = document.createElement("section");
  nudge.className = "cook-nudge";
  nudge.setAttribute("aria-label", "First cook day");
  nudge.innerHTML = `
    <div>
      <strong>Which day should we aim for?</strong>
      <span>Pick a tiny commitment so this saved recipe turns into dinner.</span>
    </div>
  `;

  const choiceRow = document.createElement("div");
  choiceRow.className = "cook-nudge-options";

  const selectedDay = getSelectedPlanTimingChoice() || "Tomorrow";
  planTimingChoices.forEach((choice) => {
    const selected = selectedDay === choice.value;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `cook-nudge-option ${selected ? "is-selected" : ""}`;
    button.setAttribute("aria-pressed", selected ? "true" : "false");
    button.textContent = choice.label;
    button.addEventListener("click", () => {
      state.firstCookDay = choice.value;
      noteAnswer("firstCookDay");
      persistState();
      renderStep();
    });
    choiceRow.append(button);
  });

  nudge.append(choiceRow);
  return nudge;
}

function renderRecipeCard(recipe, options = {}) {
  const context = options.context || "dashboard";
  const showSaveAction = options.showSaveAction !== false;
  const card = document.createElement("article");
  card.className = "recipe-card";
  card.dataset.recipeId = recipe.id;
  card.dataset.recipeTime = String(recipe.time);
  card.dataset.recipeEffort = recipe.effort;
  const saved = state.savedRecipes.includes(recipe.id);
  const summaryMarkup = context === "dashboard" ? "" : `<p>${recipe.summary}</p>`;
  card.innerHTML = `
    <img src="${recipe.image}" width="520" height="320" alt="Photo for ${recipe.title}">
    <div class="recipe-content">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>${recipe.time} min</span>
        <span>${recipe.skill}</span>
        <span>${recipe.ingredients} ingredients</span>
        <span>${recipe.serves} serving${recipe.serves === 1 ? "" : "s"}</span>
      </div>
      <p class="match-reason">${context === "dashboard" ? getDashboardMatchReason(recipe) : getMatchReason(recipe)}</p>
      ${summaryMarkup}
    </div>
    ${
      showSaveAction
        ? `<button class="save-button ${saved ? "saved" : ""}" type="button" aria-pressed="${saved ? "true" : "false"}">${iconMarkup(
            saved ? "check" : "bookmark"
          )}<span>${saved ? "Saved" : "Save recipe"}</span></button>`
        : ""
    }
  `;

  const saveButton = card.querySelector(".save-button");
  if (saveButton) {
    saveButton.addEventListener("click", () => {
      const isSaved = toggleSavedRecipe(recipe);
      if (context === "dashboard") {
        renderDashboard();
        return;
      }
    noteAnswer("savedRecipes");
    renderStep();
  });
  }

  return card;
}

function toggleSavedRecipe(recipe) {
  if (!state.savedRecipes.includes(recipe.id)) {
    state.savedRecipes.push(recipe.id);
    showToast(`${recipe.title} saved`);
    persistState();
    return true;
  } else {
    state.savedRecipes = state.savedRecipes.filter((id) => id !== recipe.id);
    showToast(`${recipe.title} removed`);
    persistState();
    return false;
  }
}

function getRecommendedRecipes() {
  const hardRestrictions = state.restrictions.filter((item) => item !== "none");
  const minTime = Number(state.timeRangeMin || 20);
  const maxTime = Number(state.timeRangeMax || 45);
  const currentTime = Number(state.currentTime || minTime || 20);
  const maxIngredients = ingredientLimitToMax(state.ingredientLimit);

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
      if (state.cookingStyle === "meal-prep" && recipe.tags.includes("batchable")) score += 4;
      if (state.cookingStyle === "prep-shortcuts" && recipe.tags.includes("prep-shortcut")) score += 3;
      if (state.cookingStyle === "quick-dinners" && recipe.tags.includes("quick")) score += 3;
      if (state.cookingStyle === "flexible-fallbacks" && recipe.tags.includes("flexible")) score += 3;
      return { recipe, score };
    })
    .sort((a, b) => b.score - a.score || a.recipe.time - b.recipe.time)
    .map((item) => item.recipe);

  const fallback = recipes.filter((recipe) => !scored.some((item) => item.id === recipe.id));
  return [...scored, ...fallback].slice(0, 3);
}

function completeOnboarding() {
  state.completed = true;
  state.started = true;
  state.answeredSteps = steps.map((_, index) => index);
  syncDashboardDefaultsFromOnboarding();
  persistState();
  triggerFoodCelebration();
  els.flowPanel.classList.add("is-completing");
  showToast("Setup complete. Your first recipe is saved.");
  window.clearTimeout(completionTimer);
  completionTimer = window.setTimeout(() => {
    completionTimer = null;
    renderDashboard({ scrollToTop: true });
  }, 550);
}

function renderDashboard(options = {}) {
  syncDashboardDefaultsFromOnboarding();
  els.flowPanel.hidden = true;
  els.flowPanel.classList.add("is-dashboard-hidden", "dashboard-active");
  els.flowPanel.classList.remove("saved-active");
  els.screenBody.innerHTML = "";
  els.screenBody.dataset.screenIndex = "dashboard";
  els.screenBody.dataset.screenStatus = "complete";
  removeDashboardRoot();

  const dashboard = document.createElement("section");
  dashboard.className = `dashboard-shell ${dashboardTab === "saved" ? "saved-active" : "dashboard-active"}`;
  dashboard.dataset.dashboardMode = state.dashboardMode;
  dashboard.dataset.dashboardPreset = state.dashboardPreset;
  dashboard.dataset.dashboardTab = dashboardTab;
  dashboard.dataset.activeTab = dashboardTab;
  dashboard.setAttribute("aria-label", "HomeStart dashboard");

  const recommendations = getDashboardRecommendations();
  dashboard.append(createDashboardHero(recommendations));
  dashboard.append(createMobileTabs());

  const content = document.createElement("div");
  content.className = "dashboard-content";

  const main = document.createElement("section");
  main.className = "dashboard-main";
  main.hidden = dashboardTab !== "dashboard";
  main.append(createDashboardFilters(), createRecommendationGrid(recommendations));

  const mobileSaved = document.createElement("section");
  mobileSaved.className = "mobile-saved-panel";
  mobileSaved.hidden = dashboardTab !== "saved";
  mobileSaved.append(createSavedRecipesContent({ title: "Saved recipes", context: "mobile" }));

  content.append(main, mobileSaved, createSavedDock());
  dashboard.append(content);
  els.onboardingLayout.append(dashboard);
  syncFrameState("dashboard");
  refreshIcons();

  if (options.scrollToTop) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function removeDashboardRoot() {
  const existing = els.onboardingLayout.querySelector(".dashboard-shell");
  if (existing) {
    existing.remove();
  }
}

function createDashboardHero(recommendations) {
  const hero = document.createElement("div");
  hero.className = "dashboard-hero";
  const savedCount = state.savedRecipes.length;
  hero.innerHTML = `
    <div>
      <p class="eyebrow">Personalized dashboard</p>
      <h1>Dinners that fit.</h1>
    </div>
    <div class="dashboard-summary" aria-label="Dashboard summary">
      <span>${recommendations.length} matches</span>
      <span>${savedCount} saved</span>
      <span>${firstCookDayLabel()} first cook</span>
    </div>
  `;

  return hero;
}

function createMobileTabs() {
  const tabs = document.createElement("div");
  tabs.className = "mobile-dashboard-tabs";
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Dashboard sections");

  [
    { id: "dashboard", label: "Dashboard" },
    { id: "saved", label: `Saved recipes (${state.savedRecipes.length})` }
  ].forEach((tab) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `dashboard-tab ${dashboardTab === tab.id ? "active" : ""}`;
    button.dataset.dashboardTab = tab.id;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", dashboardTab === tab.id ? "true" : "false");
    button.textContent = tab.label;
    button.addEventListener("click", () => {
      dashboardTab = tab.id;
      renderDashboard();
    });
    tabs.append(button);
  });

  return tabs;
}

function createDashboardFilters() {
  const panel = document.createElement("section");
  panel.className = "dashboard-filter-panel";
  panel.dataset.filterMode = state.dashboardMode;
  panel.innerHTML = `
    <div class="filter-header">
      <div>
        <p class="eyebrow">Recommendation filters</p>
        <h2>Pick a mood.</h2>
      </div>
      <div class="filter-mode-toggle" role="group" aria-label="Filter mode"></div>
    </div>
  `;

  const toggle = panel.querySelector(".filter-mode-toggle");
  [
    { id: "simple", label: "Simple" },
    { id: "advanced", label: "Advanced" }
  ].forEach((mode) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `mode-button ${state.dashboardMode === mode.id ? "active" : ""}`;
    button.dataset.filterMode = mode.id;
    button.setAttribute("aria-pressed", state.dashboardMode === mode.id ? "true" : "false");
    button.textContent = mode.label;
    button.addEventListener("click", () => {
      state.dashboardMode = mode.id;
      persistState();
      renderDashboard();
    });
    toggle.append(button);
  });

  if (state.dashboardMode === "advanced") {
    panel.append(createAdvancedFilters());
  } else {
    panel.append(createPresetFilters());
  }

  return panel;
}

function createPresetFilters() {
  const presetGrid = document.createElement("div");
  presetGrid.className = "preset-grid";

  simplePresets.forEach((preset) => {
    const selected = state.dashboardPreset === preset.id;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `preset-card ${selected ? "selected" : ""}`;
    button.dataset.preset = preset.id;
    button.setAttribute("aria-pressed", selected ? "true" : "false");
    button.innerHTML = `<strong>${preset.label}</strong><span>${preset.detail}</span>`;
    button.addEventListener("click", () => {
      applyPreset(preset.id);
      renderDashboard();
    });
    presetGrid.append(button);
  });

  return presetGrid;
}

function createAdvancedFilters() {
  const form = document.createElement("div");
  form.className = "advanced-filter-grid";
  form.append(
    createSelectField("Time to cook", "maxTime", [
      ["10", "10 min"],
      ["20", "20 min"],
      ["30", "30 min"],
      ["40", "40 min"],
      ["45", "45 min"],
      ["60", "60+ min"]
    ]),
    createSelectField("Number of ingredients", "maxIngredients", [
      ["5", "5 or fewer"],
      ["6", "6 or fewer"],
      ["8", "8 or fewer"],
      ["10", "10 or fewer"],
      ["12", "12 or fewer"],
      ["99", "Flexible"]
    ]),
    createSelectField("Effort level", "effort", [
      ["any", "Any effort"],
      ["easy", "Easy"],
      ["moderate", "Moderate"],
      ["project", "Project"]
    ]),
    createSelectField("Dietary restriction", "restriction", [
      ["none", "No restriction"],
      ["vegetarian", "Vegetarian"],
      ["dairy-free", "Dairy-free"],
      ["gluten-free", "Gluten-free"]
    ]),
    createSelectField("Instruction level", "guidance", [
      ["detailed", "Walk me through it"],
      ["balanced", "Balanced"],
      ["quick", "Quick scan"],
      ["not-sure", "Not sure"]
    ]),
    createSelectField("Servings", "servings", [
      ["1", "1 serving"],
      ["2", "2 servings"],
      ["4", "4 servings"],
      ["6", "6 servings"],
      ["8", "8 servings"]
    ])
  );

  return form;
}

function createSelectField(label, key, options) {
  const field = document.createElement("label");
  field.className = "filter-field";
  field.dataset.filterKey = key;
  const id = `filter-${key}`;
  field.innerHTML = `<span>${label}</span><select id="${id}" data-filter-key="${key}"></select>`;

  const select = field.querySelector("select");
  options.forEach(([value, optionLabel]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = optionLabel;
    option.selected = state.dashboardFilters[key] === value;
    select.append(option);
  });

  select.addEventListener("change", (event) => {
    state.dashboardFilters[key] = event.target.value;
    state.dashboardPreset = "custom";
    persistState();
    renderDashboard();
  });

  return field;
}

function createRecommendationGrid(recommendations) {
  const section = document.createElement("section");
  section.className = "dashboard-recommendations";
  section.innerHTML = `
    <div class="section-heading">
      <h2>Recommended recipes</h2>
    </div>
  `;

  const grid = document.createElement("div");
  grid.className = "recipe-grid dashboard-recipe-grid";
  recommendations.forEach((recipe) => grid.append(renderRecipeCard(recipe, { context: "dashboard" })));
  section.append(grid);

  return section;
}

function createSavedDock() {
  const dock = document.createElement("aside");
  dock.className = `saved-dock ${savedDockOpen ? "is-open" : "is-collapsed"}`;
  dock.dataset.savedDockState = savedDockOpen ? "open" : "collapsed";
  dock.setAttribute("aria-label", "Saved recipes dock");

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "saved-dock-toggle";
  toggle.setAttribute("aria-expanded", savedDockOpen ? "true" : "false");
  toggle.innerHTML = `<strong>Saved recipes</strong><span>${state.savedRecipes.length} saved</span>`;
  toggle.addEventListener("click", () => {
    savedDockOpen = !savedDockOpen;
    renderDashboard();
  });
  dock.append(toggle);

  if (savedDockOpen) {
    dock.append(createSavedRecipesContent({ title: "Saved recipes", context: "dock" }));
  }

  return dock;
}

function createSavedRecipesContent({ title, context }) {
  const wrapper = document.createElement("div");
  wrapper.className = "saved-panel";
  wrapper.dataset.savedContext = context;
  wrapper.innerHTML = `
    <div class="saved-panel-header">
      <h2>${title}</h2>
    </div>
    <div class="saved-panel-controls">
      <label class="filter-field">
        <span>Search</span>
        <input type="search" value="${escapeAttribute(state.savedSearch)}" placeholder="Recipe name or ingredient">
      </label>
      <label class="filter-field">
        <span>Preset filter</span>
        <select></select>
      </label>
    </div>
    <div class="saved-list" aria-live="polite"></div>
  `;

  const input = wrapper.querySelector('input[type="search"]');
  const select = wrapper.querySelector("select");
  [["all", "All saved"], ...simplePresets.map((preset) => [preset.id, preset.label])].forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    option.selected = state.savedPresetFilter === value;
    select.append(option);
  });

  input.addEventListener("input", (event) => {
    state.savedSearch = event.target.value;
    persistState();
    refreshSavedList(wrapper);
  });

  select.addEventListener("change", (event) => {
    state.savedPresetFilter = event.target.value;
    persistState();
    refreshSavedList(wrapper);
  });

  refreshSavedList(wrapper);
  return wrapper;
}

function refreshSavedList(wrapper) {
  const list = wrapper.querySelector(".saved-list");
  list.innerHTML = "";

  const saved = getSavedRecipesForPanel();
  if (saved.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-saved-state";
    empty.textContent = state.savedRecipes.length === 0 ? "Save a recipe to keep it here." : "No saved recipes match those filters.";
    list.append(empty);
    return;
  }

  saved.forEach((recipe) => {
    const item = document.createElement("article");
    item.className = "saved-recipe-item";
    item.dataset.recipeId = recipe.id;
    item.innerHTML = `
      <div>
        <strong>${recipe.title}</strong>
        <span>${recipe.time} min · ${recipe.ingredients} ingredients · serves ${recipe.serves}</span>
      </div>
      <button type="button" class="text-button">Remove</button>
    `;
    item.querySelector("button").addEventListener("click", () => {
      toggleSavedRecipe(recipe);
      renderDashboard();
    });
    list.append(item);
  });
}

function getSavedRecipesForPanel() {
  const savedIds = new Set(state.savedRecipes);
  const query = state.savedSearch.trim().toLowerCase();
  const preset = simplePresets.find((item) => item.id === state.savedPresetFilter);

  return recipes.filter((recipe) => {
    if (!savedIds.has(recipe.id)) return false;
    const matchesQuery = !query || `${recipe.title} ${recipe.summary} ${recipe.tags.join(" ")}`.toLowerCase().includes(query);
    const matchesPreset = !preset || preset.tags.some((tag) => recipe.tags.includes(tag));
    return matchesQuery && matchesPreset;
  });
}

function applyPreset(presetId) {
  const preset = simplePresets.find((item) => item.id === presetId);
  if (!preset) return;

  state.dashboardPreset = preset.id;
  state.dashboardFilters = {
    ...state.dashboardFilters,
    ...preset.filters,
    restriction: state.restrictions.find((item) => item !== "none") || state.dashboardFilters.restriction || "none",
    servings: preset.filters.servings || state.servings
  };
  persistState();
}

function getDashboardRecommendations() {
  const filters = state.dashboardFilters;
  const preset = simplePresets.find((item) => item.id === state.dashboardPreset);
  const maxTime = Number(filters.maxTime || 30);
  const maxIngredients = Number(filters.maxIngredients || 99);
  const servings = Number(filters.servings || state.servings || 2);
  const restrictions = Array.from(
    new Set([
      ...state.restrictions.filter((item) => item !== "none"),
      ...(filters.restriction === "none" ? [] : [filters.restriction])
    ])
  );

  const scored = recipes
    .filter((recipe) => restrictions.every((restriction) => recipe.dietary.includes(restriction)))
    .map((recipe) => {
      let score = 0;
      if (recipe.time <= maxTime) score += 8;
      else score -= Math.ceil((recipe.time - maxTime) / 10) * 2;
      if (recipe.ingredients <= maxIngredients) score += 5;
      else score -= 2;
      if (filters.effort === "any" || recipe.effort === filters.effort) score += 4;
      if (filters.guidance === "not-sure" && recipe.instructionLevel === "detailed") score += 2;
      else if (recipe.instructionLevel === filters.guidance) score += 3;
      if (recipe.serves >= servings) score += 3;
      if (preset) score += preset.tags.filter((tag) => recipe.tags.includes(tag)).length * 5;
      if (state.cookingStyle === "meal-prep" && recipe.tags.includes("batchable")) score += 2;
      if (state.cookingStyle === "quick-dinners" && recipe.tags.includes("quick")) score += 2;
      if (state.cookingStyle === "prep-shortcuts" && recipe.tags.includes("prep-shortcut")) score += 2;
      if (state.cookingStyle === "flexible-fallbacks" && recipe.tags.includes("flexible")) score += 2;
      return { recipe, score };
    })
    .sort((a, b) => b.score - a.score || a.recipe.time - b.recipe.time);

  const strict = scored.filter(({ recipe }) => recipe.time <= maxTime + 10 && recipe.ingredients <= maxIngredients);
  const result = strict.length >= 3 ? strict : scored;
  return result.map((item) => item.recipe).slice(0, 6);
}

function getDashboardMatchReason(recipe) {
  const filters = state.dashboardFilters;
  const preset = simplePresets.find((item) => item.id === state.dashboardPreset);
  if (preset && preset.tags.some((tag) => recipe.tags.includes(tag))) {
    return `${preset.label}: ${preset.tags.find((tag) => recipe.tags.includes(tag)).replaceAll("-", " ")}.`;
  }
  if (recipe.time <= Number(filters.maxTime)) {
    return `Within ${formatTimeValue(Number(filters.maxTime))}.`;
  }
  if (recipe.ingredients <= Number(filters.maxIngredients)) {
    return "Short ingredient list.";
  }
  return "Fits your setup.";
}

function syncDashboardDefaultsFromOnboarding() {
  if (!state.dashboardFilters) {
    state.dashboardFilters = { ...initialState.dashboardFilters };
  }
  state.dashboardFilters.servings = state.dashboardFilters.servings || state.servings;
  state.dashboardFilters.maxTime = state.dashboardFilters.maxTime || state.timeRangeMax;
  state.dashboardFilters.maxIngredients = state.dashboardFilters.maxIngredients || ingredientFilterDefault(state.ingredientLimit);
  syncDashboardRestrictionFromOnboarding();
}

function syncDashboardRestrictionFromOnboarding() {
  const restriction = state.restrictions.find((item) => item !== "none") || "none";
  if (!state.dashboardFilters.restriction || state.dashboardFilters.restriction === "none") {
    state.dashboardFilters.restriction = restriction;
  }
}

function triggerFoodCelebration() {
  const layer = document.createElement("div");
  layer.className = "food-celebration";
  layer.setAttribute("aria-hidden", "true");

  const icons = ["salad", "carrot", "leaf", "sparkles", "cooking-pot", "utensils", "wheat", "chef-hat"];
  for (let index = 0; index < 24; index += 1) {
    const icon = document.createElement("span");
    icon.className = "food-burst-icon";
    icon.dataset.foodBurstIndex = String(index);
    icon.style.setProperty("--burst-x", `${Math.round(Math.random() * 100)}vw`);
    icon.style.setProperty("--burst-delay", `${Math.random().toFixed(2)}s`);
    icon.style.setProperty("--burst-rotate", `${Math.round(Math.random() * 240) - 120}deg`);
    icon.innerHTML = iconMarkup(icons[index % icons.length]);
    layer.append(icon);
  }

  document.body.append(layer);
  refreshIcons();
  window.setTimeout(() => layer.remove(), 1600);
}

function timeRangeLabel() {
  if (!state.timeRangeMin || !state.timeRangeMax) return "Not set yet";
  return formatTimeRangeLabel(state.timeRangeMin, state.timeRangeMax);
}

function formatTimeRangeLabel(minValue, maxValue) {
  const min = Number(minValue);
  const max = Number(maxValue);
  if (min <= TIME_WINDOW_MIN && max >= TIME_WINDOW_MAX) return "Flexible";
  return `${min}-${max} min`;
}

function normalizeTimeRangeValue(value, fallback = TIME_WINDOW_MIN) {
  const number = Number(value);
  if (Number.isNaN(number)) return fallback;
  const clamped = clampNumber(number, TIME_WINDOW_MIN, TIME_WINDOW_MAX);
  return Math.round(clamped / TIME_WINDOW_STEP) * TIME_WINDOW_STEP;
}

function normalizeTimeRangePair(minValue, maxValue) {
  let min = normalizeTimeRangeValue(minValue, 20);
  let max = normalizeTimeRangeValue(maxValue, 40);

  if (max - min < TIME_WINDOW_MIN_GAP) {
    if (min + TIME_WINDOW_MIN_GAP <= TIME_WINDOW_MAX) {
      max = min + TIME_WINDOW_MIN_GAP;
    } else {
      min = max - TIME_WINDOW_MIN_GAP;
    }
  }

  return {
    min: clampNumber(min, TIME_WINDOW_MIN, TIME_WINDOW_MAX - TIME_WINDOW_MIN_GAP),
    max: clampNumber(max, TIME_WINDOW_MIN + TIME_WINDOW_MIN_GAP, TIME_WINDOW_MAX)
  };
}

function getTimeRangePercent(value) {
  return ((Number(value) - TIME_WINDOW_MIN) / (TIME_WINDOW_MAX - TIME_WINDOW_MIN)) * 100;
}

function firstCookDayLabel() {
  return getSelectedPlanTimingChoice() || "anytime";
}

function formatTimeValue(value) {
  return value >= 60 ? "60+ min" : `${value} min`;
}

function skillLabel() {
  const labels = {
    beginner: "Beginner",
    basic: "Some basics",
    comfortable: "Comfortable",
    adventurous: "Adventurous"
  };
  return labels[state.skill] || "beginner";
}

function skillSummaryLabel() {
  const selectedSkill = skillLevelChoices.find((choice) => choice.value === state.skill);
  const selectedGuidance = guidanceChoices.find((choice) => choice.value === state.guidance);

  if (!selectedSkill && !selectedGuidance) {
    return "Not set yet";
  }
  if (!selectedSkill) {
    return selectedGuidance.label;
  }
  if (!selectedGuidance) {
    return selectedSkill.label;
  }
  return `${selectedSkill.label} · ${selectedGuidance.label}`;
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
    return `Planned-window fit: fits your ${timeRangeLabel()} cooking window.`;
  }
  if (recipe.time > currentTime && recipe.time <= Number(state.timeRangeMax || 45)) {
    return `Planning fit: better for your ${timeRangeLabel()} window than a rushed night.`;
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
  return "Starter fit: beginner-friendly steps with a realistic weeknight scope.";
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

function ingredientLimitToMax(value) {
  if (value === "5") return 5;
  if (value === "6-8" || value === "not-sure") return 8;
  return 99;
}

function ingredientFilterDefault(value) {
  if (value === "5") return "5";
  if (value === "6-8" || value === "not-sure") return "8";
  return "99";
}

function clampNumber(value, min, max) {
  const number = Number(value);
  if (Number.isNaN(number)) return min;
  return Math.min(max, Math.max(min, number));
}

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function getFirstIncompleteStep() {
  const index = steps.findIndex((_, stepIndex) => !isStepAnswered(stepIndex));
  return index === -1 ? 0 : index;
}

ensureResetControl();

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

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const resetButton = target?.closest("[data-reset-state]");
  if (!resetButton) return;
  resetExperience();
});

els.navButtons.forEach((link) => {
  if (link.dataset.view || Object.prototype.hasOwnProperty.call(link.dataset, "resetState")) return;
  link.addEventListener("click", () => {
    const label = link.textContent.trim();
    if (label.includes("Saved") && state.completed) {
      if (window.matchMedia("(max-width: 767px)").matches) {
        dashboardTab = "saved";
      } else {
        dashboardTab = "dashboard";
        savedDockOpen = true;
      }
      setView("onboarding");
      return;
    }
    closeDrawer();
    showToast(`${label || "This area"} is a placeholder in this prototype.`);
  });
});

els.backButton.addEventListener("click", () => {
  if (currentStep === WELCOME_STEP) return;
  currentStep = Math.max(0, currentStep - 1);
  renderStep({ scrollToPanel: true });
});

els.resetFlowButton.addEventListener("click", () => {
  resetExperience();
});

els.nextButton.addEventListener("click", () => {
  if (currentStep === WELCOME_STEP) {
    state.started = true;
    currentStep = 0;
    persistState();
    renderStep({ scrollToPanel: true });
    return;
  }

  if (currentStep === steps.length - 1) {
    if (state.savedRecipes.length === 0) {
      showToast("Save one recipe to finish setup.");
      return;
    }
    completeOnboarding();
    return;
  }

  markStepAnswered(currentStep);
  currentStep = Math.min(steps.length - 1, currentStep + 1);
  renderStep({ scrollToPanel: true });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
  }
});

updateSavedCount();
updateActiveNav();
renderHome();
