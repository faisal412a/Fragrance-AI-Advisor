# MVP Plan

## Vision

Build a fragrance AI influencer experience that feels like a premium perfume consultant across mobile and web. The user answers a short quiz, and the platform recommends perfumes from major international brands using fresh web data plus a structured recommendation engine.

## Target Users

- Users who do not know which perfume to buy
- Users who want a signature scent
- Users looking for occasion-based fragrances
- Users comparing luxury and mainstream international brands

## User Questions

The first release should keep the questionnaire short and high-signal.

### Required Questions

1. What is the perfume for
2. How long should it last
3. Which style do you prefer
4. Do you prefer light or strong projection
5. What is your budget
6. Are you shopping for yourself or as a gift

### Helpful Questions

1. Preferred season: summer, winter, all-season
2. Preferred time: day, night, versatile
3. Brand familiarity: only famous brands or open to discovery
4. Gender direction: masculine, feminine, unisex, no preference

## Example Preference Mapping

### Inputs

- Usage: office
- Longevity: long-lasting
- Preference: woody
- Projection: moderate
- Budget: premium
- Season: winter

### Derived Profile

- Families: woody, amber, spicy
- Avoid: very sweet, overly loud club scents
- Occasion bias: professional evening versatility
- Longevity target: 8+ hours
- Brand tier: premium designer and niche-adjacent

## Recommendation Pipeline

1. Collect user answers
2. Normalize answers into a scent profile
3. Search internal perfume catalog by tags and filters
4. Enrich candidate perfumes with current web data
5. Rank candidates using rules plus AI reasoning
6. Return top recommendations with explanation

## Major Feature Modules

### 1. Questionnaire Engine

- Dynamic form for web and mobile
- Multi-language ready
- Supports skip logic

### 2. Perfume Catalog

- Brands
- Perfumes
- Notes
- Families
- Performance expectations
- Retail links

### 3. Internet Enrichment

- Pull latest details from trusted sources
- Verify availability, positioning, and current pricing bands
- Track source URL and fetch time

### 4. AI Recommendation Engine

- Accepts structured user profile
- Accepts structured perfume candidates
- Produces ranked recommendations
- Explains why each match is relevant

### 5. Influencer Layer

- AI persona tone
- Editorial recommendation language
- Save favorites
- Shareable recommendation cards

## Trusted Data Sources

The system should pull from sources in this order:

1. Official brand websites
2. Trusted retailer/product pages
3. Reputable fragrance databases
4. Editorial review content with clear attribution

## MVP Admin Capabilities

- Add or remove brands
- Approve source domains
- Review product records
- Re-run recommendation tests

## Success Metrics

- Quiz completion rate
- Recommendation click-through rate
- Save/favorite rate
- Conversion to retailer link
- Repeat visits

## Launch Scope

Start with 30 to 80 high-demand perfumes across major international brands, then expand after recommendation quality is validated.

## Recommended First Brand Set

- Dior
- Chanel
- Yves Saint Laurent
- Tom Ford
- Giorgio Armani
- Creed
- Maison Francis Kurkdjian
- Carolina Herrera
- Dolce & Gabbana
- Paco Rabanne
- Burberry
- Hermès

## Delivery Phases

### Phase 1

- Product design
- Catalog schema
- Basic questionnaire
- Manual seed catalog

### Phase 2

- AI recommendation service
- Web data enrichment
- Source validation

### Phase 3

- Mobile app
- Account system
- Favorites and history
- Analytics
