# Architecture Overview

## Monorepo Layout

```text
apps/
  web/       Next.js web experience
  mobile/    Expo mobile experience
  api/       Node.js API shell
packages/
  fragrance-engine/ shared questionnaire and profile logic
docs/        product and technical design
```

## Purpose Of Each App

### Web

- Hosts the marketing and quiz experience
- Presents recommendation results
- Will later support account and saved profiles

### Mobile

- Hosts the same quiz in a mobile-first flow
- Will later support favorites, notifications, and richer influencer content

### API

- Serves questionnaire config
- Accepts user answers
- Calls recommendation ranking and future enrichment services

### Shared Package

- Keeps questionnaire definitions in one place
- Prevents web and mobile drift
- Will later own ranking utilities and seed catalog helpers

## Recommended Next Implementation Tasks

1. Wire the questionnaire UI to render dynamically from the shared schema
2. Add answer state management and a results summary screen
3. Create the perfume catalog seed structure
4. Add a recommendation ranking module in `packages/fragrance-engine`
