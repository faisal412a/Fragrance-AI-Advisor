import { brands, perfumes, questionnaire } from "@fragrance-ai/fragrance-engine";
import { QuizExperience } from "./components/quiz-experience";

export default function HomePage() {
  const requiredCount = questionnaire.questions.filter((question) => question.required).length;
  const openingQuestions = questionnaire.questions.slice(0, 4);
  const visualNotes = ["Bergamot", "Rose", "Cedar", "Iris", "Amber"];

  return (
    <main className="page-shell">
      <section className="hero hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Fragrance AI Influencer</p>
          <h1>A premium fragrance advisor for web and mobile.</h1>
          <p className="lede">
            Guide users through a sophisticated scent discovery ritual, then recommend the right perfumes from major
            international brands with polished AI storytelling and source-backed data.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#quiz">
              Explore the quiz
            </a>
            <a className="secondary-button" href="#overview">
              See platform vision
            </a>
          </div>
          <div className="hero-metrics">
            <div>
              <strong>{requiredCount}</strong>
              <span>required quiz questions</span>
            </div>
            <div>
              <strong>{brands.length}</strong>
              <span>seed global brands</span>
            </div>
            <div>
              <strong>{perfumes.length}</strong>
              <span>initial recommendation candidates</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card visual-card-main">
            <div className="hero-gallery">
              <div className="gallery-frame gallery-model">
                <div className="gallery-orb" />
                <div className="gallery-figure" />
              </div>
              <div className="gallery-frame gallery-bottle">
                <div className="bottle-cap" />
                <div className="bottle-glass" />
                <div className="bottle-label">Atelier Intelligence</div>
              </div>
              <div className="gallery-frame gallery-botanicals">
                {visualNotes.map((note) => (
                  <span key={note} className="botanical-tag">
                    {note}
                  </span>
                ))}
              </div>
            </div>
            <p className="visual-label">Opening sequence</p>
            {openingQuestions.map((question, index) => (
              <div className="visual-row" key={question.id}>
                <span>0{index + 1}</span>
                <p>{question.title}</p>
              </div>
            ))}
          </div>
          <div className="visual-card visual-card-float">
            <p className="visual-label">Tone</p>
            <h3>Modern. Refined. Confident.</h3>
            <p>
              This interface should feel closer to a luxury beauty concierge than a generic form builder.
            </p>
          </div>
        </div>
      </section>

      <section className="overview-grid" id="overview">
        <article className="info-card info-card-accent">
          <p className="section-kicker">Platform Overview</p>
          <h2>Ask better questions, then recommend with taste.</h2>
          <p>
            The experience starts with gender and age, moves through scent preferences and context, then translates
            those answers into tailored recommendations from luxury and major designer fragrance houses.
          </p>
        </article>

        <article className="info-card">
          <p className="section-kicker">Experience Principles</p>
          <ul className="feature-list">
            <li>Luxury-inspired visuals instead of generic ecommerce cards.</li>
            <li>Short guided quiz with a clear sense of progress.</li>
            <li>Transparent recommendations with notes, style fit, and brand context.</li>
          </ul>
          <div className="ingredient-ribbon">
            <span>Citrus opening</span>
            <span>Floral heart</span>
            <span>Woody base</span>
          </div>
        </article>
      </section>

      <section id="quiz">
        <QuizExperience />
      </section>
    </main>
  );
}
