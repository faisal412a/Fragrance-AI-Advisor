import { brands, perfumes, questionnaire } from "@fragrance-ai/fragrance-engine";
import { QuizExperience } from "./components/quiz-experience";

export default function HomePage() {
  const requiredCount = questionnaire.questions.filter((question) => question.required).length;

  return (
    <main className="page-shell dark-shell" id="top">
      <section className="intro-panel" id="how">
        <div className="intro-copy">
          <p className="eyebrow">Fragrance AI Advisor</p>
          <h1>Design a signature scent through a cinematic fragrance ritual.</h1>
          <p className="lede">
            Each step is presented like a scene: atmosphere, style, performance, and taste. The result is a guided
            premium experience that feels natural on both desktop and mobile.
          </p>
        </div>
        <div className="intro-stats" id="notes">
          <div>
            <strong>{requiredCount}</strong>
            <span>guided questions</span>
          </div>
          <div>
            <strong>{brands.length}</strong>
            <span>major international houses</span>
          </div>
          <div>
            <strong>{perfumes.length}</strong>
            <span>catalog entries in the current engine</span>
          </div>
        </div>
      </section>

      <section id="quiz">
        <QuizExperience />
      </section>
    </main>
  );
}
