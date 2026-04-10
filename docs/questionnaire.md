# Fragrance Questionnaire Specification

## Goal

Collect a small number of high-signal answers from the user, then convert those answers into a structured fragrance profile that can drive perfume recommendations.

The questionnaire should feel fast, premium, and easy to complete in under 60 seconds.

## Design Principles

- Keep the first session to 7 required questions
- Use simple language, not perfume jargon
- Allow multiple selections where scent taste is broad
- Avoid forcing the user to know exact note names
- Show progress clearly
- Make the result feel personalized, not generic

## Recommended Question Flow

### 1. Gender Direction

Question:
`What fragrance direction do you want?`

Options:

- Masculine leaning
- Feminine leaning
- Unisex
- No preference

Why it matters:

- Helps refine style fit from the start
- Keeps the early recommendations better targeted
- Should never fully block the best result if the user selects `No preference`

## 2. Age Range

Question:
`Which age range best fits you or the person you're shopping for?`

Options:

- Under 18
- 18 to 24
- 25 to 34
- 35 to 44
- 45 to 54
- 55+
- Prefer not to say

Why it matters:

- Helps tune recommendation tone and style positioning
- Supports gifting and age-appropriate suggestions without overfitting

## 3. Usage

Question:
`What are you looking for this fragrance for?`

Options:

- Everyday wear
- Office or professional
- Date night
- Special occasions
- Gifting
- Signature scent

Why it matters:

- Drives context matching
- Helps prioritize versatility vs impact

## 4. Longevity

Question:
`How long do you want it to last?`

Options:

- Light wear, 3 to 5 hours
- Balanced, 5 to 8 hours
- Long-lasting, 8+ hours

Why it matters:

- Filters weak performers when the user wants stronger wear
- Helps avoid overpowering choices for lighter preferences

## 5. Scent Direction

Question:
`Which scent styles do you enjoy most?`

Allow up to 3 selections.

Options:

- Woody
- Fresh
- Floral
- Amber
- Musky
- Sweet
- Citrus
- Spicy
- Powdery
- French luxury style

Why it matters:

- This is the strongest recommendation signal
- Maps to fragrance family tags and note clusters

## 6. Projection

Question:
`How noticeable should it be around you?`

Options:

- Soft and close to skin
- Moderate and balanced
- Strong and attention-grabbing

Why it matters:

- Prevents loud scents for office users
- Helps match statement scents for events and evenings

## 7. Budget

Question:
`What budget range are you considering?`

Options:

- Under $100
- $100 to $200
- $200+
- Open to all

Why it matters:

- Filters the candidate set early
- Helps decide between designer-focused and luxury/niche-heavy results

## 8. Season Or Climate

Question:
`Where do you expect to wear it most?`

Options:

- Hot weather
- Cool weather
- All year

Why it matters:

- Fresh and citrus scents often fit heat better
- Dense amber or spicy scents often fit cooler settings better

## Optional Follow-Up Questions

These can appear only when needed:

### 9. Familiarity

Question:
`Would you like only major international brands, or are you open to discovering more?`

Options:

- Only major brands
- Major brands first, but open to more
- Open to all

### 10. Gift Context

Show only if the user selected gifting.

Question:
`Who is the gift for?`

Options:

- Man
- Woman
- Unisex
- Not sure

### 11. Avoidances

Question:
`Any styles you want to avoid?`

Options:

- Too sweet
- Too floral
- Too strong
- Too fresh
- No specific dislikes

## Recommendation Mapping

### Usage Mapping

- Everyday wear -> versatile, safe, easy reach
- Office or professional -> clean, balanced, moderate projection
- Date night -> sensual, warm, memorable
- Special occasions -> richer, more distinctive, stronger projection accepted
- Signature scent -> versatile, high-repeat appeal
- Gifting -> safer crowd-pleasing profiles

### Longevity Mapping

- Light wear -> soft to moderate performance
- Balanced -> medium to strong performance
- Long-lasting -> strong performers only

### Style Mapping

- Woody -> cedar, sandalwood, vetiver, dry woods
- Fresh -> aquatic, aromatic, green, clean citrus
- Floral -> rose, jasmine, neroli, white florals
- Amber -> resinous, warm, rich, oriental-leaning
- Musky -> clean musk, soft skin scent
- Sweet -> vanilla, tonka, gourmand accents
- Citrus -> bergamot, grapefruit, lemon, orange blossom
- Spicy -> pepper, cardamom, cinnamon, saffron
- Powdery -> iris, soft musk, cosmetic softness
- French luxury style -> polished, elegant, refined brand/style bias

### Projection Mapping

- Soft -> skin scent and restrained projection
- Moderate -> balanced projection
- Strong -> statement projection

### Budget Mapping

- Under $100 -> value designer and accessible lines
- $100 to $200 -> core premium designer
- $200+ -> luxury designer, private lines, niche
- Open to all -> no price restriction

### Age Mapping

- Under 18 -> fresh, easy, safe profiles and gifting caution
- 18 to 24 -> youthful, trend-aware, energetic styles
- 25 to 34 -> versatile premium and signature-scent-friendly styles
- 35 to 44 -> refined, balanced, polished styles
- 45 to 54 -> elegant, mature, classic-leaning styles
- 55+ -> classic, tasteful, timeless profiles
- Prefer not to say -> no age weighting

## Suggested Response Shape

```json
{
  "ageRange": "25-34",
  "genderDirection": "unisex",
  "usage": "office",
  "longevity": "long-lasting",
  "stylePreferences": ["woody", "fresh"],
  "projection": "moderate",
  "budget": "100-200",
  "climate": "hot",
  "brandScope": "major-brands-first",
  "avoid": ["too-sweet"]
}
```

## UX Notes

- Mobile should show one question per screen
- Web can show one question per screen or a split layout with progress
- Use bold visuals and a fragrance-led tone, not a generic form style
- Show a short summary before presenting recommendations
- Let the user restart or refine answers easily

## Recommendation Copy Example

`You seem to prefer fresh woody fragrances with balanced projection and strong wear, especially for professional use in warm weather. We'll focus on polished major-brand scents that feel refined, versatile, and long-lasting.`
