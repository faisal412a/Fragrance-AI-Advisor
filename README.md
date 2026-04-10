# Fragrance AI Influencer Platform

This repository is the foundation for a mobile app and web platform that helps users discover perfumes through an AI-guided questionnaire and live fragrance research.

## Product Idea

Users answer a short set of questions such as:

- What is the perfume for: daily use, office, date night, gifting, special events
- Preferred longevity: light, moderate, long-lasting
- Fragrance direction: woody, fresh, floral, oriental, French-style luxury, sweet, clean
- Budget range
- Preferred brands or whether they want to explore new ones

The system converts those answers into a scent profile, pulls current perfume information from the internet and brand sources, and generates personalized recommendations across major international brands.

## MVP Goals

- Support web and mobile
- Ask 6 to 10 fast onboarding questions
- Build a recommendation profile from answers
- Enrich recommendations with current internet data
- Return ranked perfume suggestions with reasoning
- Include major global perfume brands

## Recommended Stack

### Frontend

- Web: Next.js
- Mobile: Expo + React Native
- Shared UI/business logic: monorepo packages

### Backend

- Node.js API
- Postgres database
- Supabase for auth, database, and storage

### AI Layer

- Structured prompt + ranking engine
- Recommendation explanation generation
- Search-assisted enrichment for fresh product details

## Core User Flow

1. User opens the app or website
2. User answers fragrance preference questions
3. Backend maps answers to a normalized preference profile
4. System fetches matching perfumes from internal catalog plus approved internet sources
5. AI ranks and explains best matches
6. User receives a shortlist with why each perfume fits

## Recommendation Output

Each recommendation should include:

- Perfume name
- Brand
- Why it matches the user
- Main notes
- Fragrance family
- Best use case
- Expected longevity
- Price range
- Confidence score

## Important Product Rules

- Do not present invented perfume facts
- Separate verified product data from AI interpretation
- Keep source attribution for internet-enriched details
- Prefer trusted retailer, brand, and fragrance database sources
- Store only minimal user profile data unless the user opts into an account

## Suggested Repo Structure

```text
apps/
  web/
  mobile/
  api/
packages/
  fragrance-engine/
docs/
  mvp-plan.md
  data-model.md
  questionnaire.md
  questionnaire-schema.json
  architecture.md
  recommendation-engine.md
```

## Next Build Steps

1. Render the questionnaire from the shared package in web and mobile
2. Implement source ingestion and validation
3. Expand the recommendation service with fresh web enrichment
4. Launch a private MVP with a limited brand set

See [docs/mvp-plan.md](/Users/faisalzahid/Documents/New%20project/docs/mvp-plan.md), [docs/data-model.md](/Users/faisalzahid/Documents/New%20project/docs/data-model.md), [docs/questionnaire.md](/Users/faisalzahid/Documents/New%20project/docs/questionnaire.md), [docs/questionnaire-schema.json](/Users/faisalzahid/Documents/New%20project/docs/questionnaire-schema.json), and [docs/architecture.md](/Users/faisalzahid/Documents/New%20project/docs/architecture.md) for the detailed product and technical design.
