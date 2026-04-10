# Recommendation Engine

## Goal

Turn questionnaire answers into a ranked perfume shortlist that is explainable, testable, and ready for later internet enrichment.

## Current Engine Design

The first engine is intentionally deterministic:

1. Read the structured questionnaire answers
2. Compare them against the seed perfume catalog
3. Score each perfume using weighted rules
4. Sort by score
5. Return a ranked list with explanation text

## Current Inputs

- `gender_direction`
- `age_range`
- `usage`
- `longevity`
- `style_preferences`
- `projection`
- `budget`
- `climate`
- `brand_scope`
- `avoidances`

## Current Scoring Factors

- Style overlap
- Usage fit
- Longevity fit
- Projection fit
- Climate fit
- Budget fit
- Gender-direction fit
- Major-brand preference
- Age-range style boost
- Avoidance penalties

## Why This Approach Works For MVP

- Easy to understand and debug
- Fast to evaluate
- Safe because it uses structured seed data
- Ready for future AI explanation and web enrichment layers

## Planned Evolution

### Phase 1

- Curated seed data only
- Deterministic scoring only

### Phase 2

- Pull fresh source-backed product facts from the internet
- Refresh note, pricing-band, and availability metadata

### Phase 3

- Blend deterministic score with AI ranking commentary
- Add user feedback loops such as likes, skips, and favorites

## Main Code Paths

- Shared catalog: [packages/fragrance-engine/src/catalog.js](/Users/faisalzahid/Documents/New%20project/packages/fragrance-engine/src/catalog.js)
- Profile summary: [packages/fragrance-engine/src/profile.js](/Users/faisalzahid/Documents/New%20project/packages/fragrance-engine/src/profile.js)
- Recommender: [packages/fragrance-engine/src/recommend.js](/Users/faisalzahid/Documents/New%20project/packages/fragrance-engine/src/recommend.js)
