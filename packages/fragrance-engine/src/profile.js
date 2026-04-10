function buildProfileSummary(answers) {
  const stylePreferences = answers.style_preferences || [];
  const usageLabel = {
    everyday: "everyday wear",
    office: "professional use",
    "date-night": "date nights",
    "special-occasion": "special occasions",
    gift: "gifting",
    signature: "a signature scent"
  }[answers.usage] || "general wear";

  const longevityLabel = {
    light: "lighter wear",
    balanced: "balanced performance",
    long: "long-lasting performance"
  }[answers.longevity] || "balanced performance";

  const climateLabel = {
    hot: "warm weather",
    cool: "cool weather",
    "all-year": "year-round use"
  }[answers.climate] || "year-round use";

  return {
    demographicFocus: {
      genderDirection: answers.gender_direction || "no-preference",
      ageRange: answers.age_range || "prefer-not-to-say"
    },
    summary:
      `The user is looking for ${stylePreferences.join(", ") || "well-rounded"} fragrances for ${usageLabel}, ` +
      `with ${longevityLabel} and a preference for ${climateLabel}.`,
    recommendationHints: {
      stylePreferences,
      usage: answers.usage,
      longevity: answers.longevity,
      projection: answers.projection,
      budget: answers.budget,
      climate: answers.climate,
      brandScope: answers.brand_scope || "major-first"
    }
  };
}

module.exports = { buildProfileSummary };
