# Data Model And Recommendation Design

## Core Entities

### User Preference Session

```json
{
  "sessionId": "uuid",
  "usage": "office",
  "longevity": "long-lasting",
  "stylePreference": ["woody", "fresh"],
  "projection": "moderate",
  "budgetTier": "premium",
  "season": "winter",
  "genderDirection": "unisex",
  "giftMode": false,
  "createdAt": "ISO_DATE"
}
```

### Brand

```json
{
  "id": "brand_dior",
  "name": "Dior",
  "country": "France",
  "tier": "designer",
  "officialWebsite": "https://www.dior.com",
  "active": true
}
```

### Perfume

```json
{
  "id": "perfume_sauvage_elixir",
  "brandId": "brand_dior",
  "name": "Sauvage Elixir",
  "family": ["woody", "spicy", "aromatic"],
  "topNotes": ["grapefruit", "spices"],
  "heartNotes": ["lavender"],
  "baseNotes": ["licorice", "woods", "amber"],
  "projection": "strong",
  "longevityBand": "long",
  "useCases": ["date-night", "special-occasion", "signature"],
  "climates": ["cool", "all-year"],
  "genderDirection": "masculine",
  "priceTier": "200-plus",
  "brandScope": "major",
  "tags": ["bold", "luxury", "statement"],
  "sourceConfidence": 0.92
}
```

### Source Record

```json
{
  "id": "source_001",
  "perfumeId": "perfume_sauvage_elixir",
  "sourceType": "official_brand",
  "url": "https://example.com/product",
  "fetchedAt": "ISO_DATE",
  "fields": ["notes", "description", "availability"],
  "trustScore": 1.0
}
```

## Recommendation Response

```json
{
  "profileSummary": {
    "usage": "office",
    "preferredFamilies": ["woody", "fresh"],
    "targetLongevity": "long-lasting"
  },
  "recommendations": [
    {
      "rank": 1,
      "perfumeId": "perfume_001",
      "name": "Example Perfume",
      "brand": "Example Brand",
      "matchScore": 0.91,
      "reason": "Matches your woody preference and delivers strong long wear for office-to-evening use.",
      "notesSummary": ["cedar", "bergamot", "amber"],
      "bestFor": ["office", "winter", "evening"],
      "priceTier": "premium",
      "sources": [
        {
          "label": "Official brand page",
          "url": "https://example.com"
        }
      ]
    }
  ]
}
```

## Ranking Strategy

Use a hybrid approach:

1. Hard filters
- Budget alignment
- Gender direction if specified
- Availability

2. Weighted scoring
- Style match
- Longevity match
- Usage match
- Season match
- Projection match
- Brand popularity boost
- Age-positioning boost
- Avoidance penalties

3. AI explanation
- Explain the strongest fit factors
- Mention tradeoffs when relevant
- Avoid making unsupported claims

## Fresh Web Data Strategy

When pulling from the internet:

- Fetch only from approved domains
- Cache records with timestamps
- Preserve original source URLs
- Mark stale records for refresh
- Distinguish scraped facts from generated commentary

## Safety And Quality Rules

- Never hallucinate note pyramids or pricing
- Include source attribution in recommendation details
- Keep recommendation generation deterministic before AI wording
- Log why each perfume was selected

## Suggested API Endpoints

### Submit quiz

`POST /api/v1/preferences`

### Get recommendations

`POST /api/v1/recommendations`

### List brands

`GET /api/v1/brands`

### Search perfumes

`GET /api/v1/perfumes?family=woody&budget=premium`

## Seed Catalog Scope

The first seed catalog in code should focus on major international brands and a small set of recognizable perfumes, with room to expand later. The current code seed includes examples across Dior, Chanel, Yves Saint Laurent, Tom Ford, Giorgio Armani, Creed, Maison Francis Kurkdjian, and Hermes.

## Future Expansion

- User accounts and scent history
- Climate-aware recommendations by country
- Arabic and English support
- Influencer video scripts per recommendation
- Purchase affiliate tracking
