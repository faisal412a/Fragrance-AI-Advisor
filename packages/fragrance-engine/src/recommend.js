const { perfumes, getBrandById } = require("./catalog");
const { buildProfileSummary } = require("./profile");

const budgetScores = {
  "under-100": 1,
  "100-200": 2,
  "200-plus": 3,
  open: 4
};

const ageStyleBoostMap = {
  "18-24": ["trendy", "youthful", "viral"],
  "25-34": ["versatile", "modern", "refined"],
  "35-44": ["refined", "professional", "elegant"],
  "45-54": ["classic", "elegant", "refined"],
  "55-plus": ["classic", "tasteful", "timeless"]
};

const avoidanceMap = {
  "too-sweet": ["sweet"],
  "too-floral": ["floral"],
  "too-strong": ["strong"],
  "too-fresh": ["fresh"]
};

function scoreStyleMatch(preferences, perfume) {
  if (!preferences.length) {
    return 0;
  }

  const matches = preferences.filter((preference) => perfume.family.includes(preference)).length;
  return matches * 18;
}

function scoreUsageMatch(usage, perfume) {
  if (!usage) {
    return 0;
  }

  return perfume.useCases.includes(usage) ? 15 : 0;
}

function scoreLongevityMatch(longevity, perfume) {
  if (!longevity) {
    return 0;
  }

  if (longevity === perfume.longevityBand) {
    return 14;
  }

  if (longevity === "balanced" && (perfume.longevityBand === "light" || perfume.longevityBand === "long")) {
    return 8;
  }

  if (longevity === "long" && perfume.longevityBand === "balanced") {
    return 6;
  }

  return 0;
}

function scoreProjectionMatch(projection, perfume) {
  if (!projection) {
    return 0;
  }

  return projection === perfume.projection ? 10 : 0;
}

function scoreClimateMatch(climate, perfume) {
  if (!climate) {
    return 0;
  }

  return perfume.climates.includes(climate) ? 10 : 0;
}

function scoreBudgetMatch(budget, perfume) {
  if (!budget || budget === "open") {
    return 8;
  }

  const requested = budgetScores[budget];
  const candidate = budgetScores[perfume.priceTier];

  if (requested === candidate) {
    return 12;
  }

  if (candidate && requested && candidate < requested) {
    return 8;
  }

  return -8;
}

function scoreGenderMatch(genderDirection, perfume) {
  if (!genderDirection || genderDirection === "no-preference") {
    return 6;
  }

  if (genderDirection === perfume.genderDirection) {
    return 10;
  }

  if (perfume.genderDirection === "unisex") {
    return 7;
  }

  return -6;
}

function scoreBrandScope(brandScope, perfume) {
  if (!brandScope || brandScope === "open") {
    return 0;
  }

  if (brandScope === "major-only" && perfume.brandScope !== "major") {
    return -20;
  }

  if (brandScope === "major-first" && perfume.brandScope === "major") {
    return 6;
  }

  return 0;
}

function scoreAgeFit(ageRange, perfume) {
  const preferredTags = ageStyleBoostMap[ageRange];

  if (!preferredTags) {
    return 0;
  }

  const matches = preferredTags.filter((tag) => perfume.tags.includes(tag)).length;
  return matches * 3;
}

function scoreAvoidances(avoidances, perfume) {
  if (!Array.isArray(avoidances) || avoidances.includes("none")) {
    return 0;
  }

  let penalty = 0;

  for (const avoidance of avoidances) {
    const blockedTraits = avoidanceMap[avoidance] || [];
    if (blockedTraits.includes(perfume.projection) || blockedTraits.some((trait) => perfume.family.includes(trait))) {
      penalty -= 12;
    }
  }

  return penalty;
}

function buildReason(answers, perfume, brand) {
  const reasons = [];

  if ((answers.style_preferences || []).some((style) => perfume.family.includes(style))) {
    reasons.push(`matches your ${answers.style_preferences.filter((style) => perfume.family.includes(style)).join(" and ")} preference`);
  }

  if (answers.usage && perfume.useCases.includes(answers.usage)) {
    reasons.push(`fits ${answers.usage.replace("-", " ")} use`);
  }

  if (answers.longevity === perfume.longevityBand) {
    reasons.push(`${perfume.longevityBand} wear aligns with your longevity goal`);
  }

  if (answers.climate && perfume.climates.includes(answers.climate)) {
    reasons.push(`works well in ${answers.climate === "all-year" ? "year-round conditions" : `${answers.climate} weather`}`);
  }

  if (answers.brand_scope === "major-only" || answers.brand_scope === "major-first") {
    reasons.push(`${brand.name} is a strong international brand fit`);
  }

  if (!reasons.length) {
    reasons.push("offers a balanced profile for your overall preferences");
  }

  return `${brand.name} ${perfume.name} ${reasons.join(", ")}.`;
}

function recommendPerfumes(answers, options = {}) {
  const limit = options.limit || 5;
  const profileSummary = buildProfileSummary(answers);

  const recommendations = perfumes
    .map((perfume) => {
      const brand = getBrandById(perfume.brandId);
      const score =
        scoreStyleMatch(answers.style_preferences || [], perfume) +
        scoreUsageMatch(answers.usage, perfume) +
        scoreLongevityMatch(answers.longevity, perfume) +
        scoreProjectionMatch(answers.projection, perfume) +
        scoreClimateMatch(answers.climate, perfume) +
        scoreBudgetMatch(answers.budget, perfume) +
        scoreGenderMatch(answers.gender_direction, perfume) +
        scoreBrandScope(answers.brand_scope, perfume) +
        scoreAgeFit(answers.age_range, perfume) +
        scoreAvoidances(answers.avoidances, perfume);

      return {
        rank: 0,
        perfumeId: perfume.id,
        name: perfume.name,
        brand: brand ? brand.name : "Unknown Brand",
        matchScore: Number(Math.max(score, 0).toFixed(2)),
        reason: buildReason(answers, perfume, brand || { name: "This brand" }),
        notesSummary: [...perfume.topNotes.slice(0, 2), ...perfume.baseNotes.slice(0, 2)].slice(0, 4),
        bestFor: perfume.useCases,
        priceTier: perfume.priceTier,
        metadata: {
          family: perfume.family,
          projection: perfume.projection,
          longevityBand: perfume.longevityBand,
          sourceConfidence: perfume.sourceConfidence
        }
      };
    })
    .sort((left, right) => right.matchScore - left.matchScore)
    .slice(0, limit)
    .map((recommendation, index) => ({
      ...recommendation,
      rank: index + 1
    }));

  return {
    profileSummary,
    totalCandidates: perfumes.length,
    recommendations
  };
}

module.exports = {
  recommendPerfumes
};
