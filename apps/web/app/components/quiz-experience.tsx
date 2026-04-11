"use client";

import { useMemo, useState, useTransition } from "react";
import { questionnaire, recommendPerfumes } from "@fragrance-ai/fragrance-engine";

type AnswerValue = string | string[];
type Answers = Record<string, AnswerValue>;

type QuestionnaireQuestion = (typeof questionnaire.questions)[number];

const initialAnswers: Answers = {
  gender_direction: "unisex",
  age_range: "25-34",
  usage: "office",
  longevity: "long",
  style_preferences: ["woody", "fresh"],
  projection: "moderate",
  budget: "100-200",
  climate: "hot",
  brand_scope: "major-first",
  avoidances: ["none"]
};

function shouldShowQuestion(question: QuestionnaireQuestion, answers: Answers) {
  if (!question.showWhen) {
    return true;
  }

  return answers[question.showWhen.questionId] === question.showWhen.value;
}

function optionIsSelected(question: QuestionnaireQuestion, answers: Answers, value: string) {
  const current = answers[question.id];

  if (question.type === "multi_select") {
    return Array.isArray(current) ? current.includes(value) : false;
  }

  return current === value;
}

function nextMultiValue(current: AnswerValue | undefined, value: string, maxSelections = Infinity) {
  const list = Array.isArray(current) ? current.filter((item) => item !== "none") : [];

  if (list.includes(value)) {
    return list.filter((item) => item !== value);
  }

  return [...list, value].slice(-maxSelections);
}

function labelForAnswer(question: QuestionnaireQuestion, answers: Answers) {
  const current = answers[question.id];

  if (Array.isArray(current)) {
    return question.options
      .filter((option) => current.includes(option.value))
      .map((option) => option.label)
      .join(", ");
  }

  return question.options.find((option) => option.value === current)?.label || "Not selected";
}

export function QuizExperience() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [activeQuestionId, setActiveQuestionId] = useState(questionnaire.questions[0]?.id || "");
  const [showResults, setShowResults] = useState(false);
  const [, startTransition] = useTransition();

  const visibleQuestions = useMemo(
    () => questionnaire.questions.filter((question) => shouldShowQuestion(question, answers)),
    [answers]
  );

  const activeIndex = Math.max(
    visibleQuestions.findIndex((question) => question.id === activeQuestionId),
    0
  );

  const activeQuestion = visibleQuestions[activeIndex] || visibleQuestions[0];
  const completedRequiredCount = visibleQuestions.filter((question) => {
    if (!question.required) {
      return false;
    }

    const value = answers[question.id];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length;

  const progress = Math.round((completedRequiredCount / visibleQuestions.filter((item) => item.required).length) * 100);

  const recommendations = useMemo(() => recommendPerfumes(answers, { limit: 3 }), [answers]);
  const isLastQuestion = activeIndex === visibleQuestions.length - 1;

  function updateAnswer(question: QuestionnaireQuestion, value: string) {
    if (showResults) {
      setShowResults(false);
    }

    startTransition(() => {
      setAnswers((current) => {
        if (question.type === "multi_select") {
          if (value === "none") {
            return { ...current, [question.id]: ["none"] };
          }

          return {
            ...current,
            [question.id]: nextMultiValue(current[question.id], value, question.maxSelections)
          };
        }

        return { ...current, [question.id]: value };
      });
    });
  }

  function goToNextQuestion() {
    const nextQuestion = visibleQuestions[activeIndex + 1];
    if (nextQuestion) {
      setActiveQuestionId(nextQuestion.id);
    }
  }

  function goToPreviousQuestion() {
    if (showResults) {
      setShowResults(false);
      return;
    }

    const previousQuestion = visibleQuestions[activeIndex - 1];
    if (previousQuestion) {
      setActiveQuestionId(previousQuestion.id);
    }
  }

  return (
    <section className="experience-shell">
      <div className="quiz-panel">
        <div className="quiz-header">
          <div>
            <p className="section-kicker">Discovery Quiz</p>
            <h2>{showResults ? "Your fragrance matches are ready." : activeQuestion.title}</h2>
          </div>
          <div className="progress-wrap" aria-label={`Quiz progress ${progress}%`}>
            <span>{progress}%</span>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {showResults ? (
          <div className="final-results">
            <div className="results-intro results-intro-light">
              <p className="section-kicker">Final Recommendations</p>
              <h3>{recommendations.profileSummary.summary}</h3>
            </div>

            <div className="recommendation-stack recommendation-stack-light">
              {recommendations.recommendations.map((recommendation) => (
                <article key={String(recommendation.perfumeId)} className="result-card result-card-light">
                  <div className="result-rank">0{String(recommendation.rank)}</div>
                  <div className="result-copy">
                    <p className="result-brand result-brand-light">{String(recommendation.brand)}</p>
                    <h4>{String(recommendation.name)}</h4>
                    <p className="result-reason result-reason-light">{String(recommendation.reason)}</p>
                    <div className="tag-row">
                      {(recommendation.notesSummary as string[]).map((note) => (
                        <span key={note} className="tag tag-light">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="option-grid">
            {activeQuestion.options.map((option) => {
              const selected = optionIsSelected(activeQuestion, answers, option.value);

              return (
                <button
                  key={option.value}
                  className={`option-card${selected ? " option-card-selected" : ""}`}
                  type="button"
                  onClick={() => updateAnswer(activeQuestion, option.value)}
                >
                  <span>{option.label}</span>
                  <small>{selected ? "Selected" : "Tap to choose"}</small>
                </button>
              );
            })}
          </div>
        )}

        <div className="quiz-footer">
          <button
            className="ghost-button"
            type="button"
            onClick={goToPreviousQuestion}
            disabled={activeIndex === 0 && !showResults}
          >
            Previous
          </button>
          {showResults ? (
            <button className="primary-button" type="button" onClick={() => setShowResults(false)}>
              Refine answers
            </button>
          ) : (
            <button
              className="primary-button"
              type="button"
              onClick={isLastQuestion ? () => setShowResults(true) : goToNextQuestion}
            >
              {isLastQuestion ? "Finish" : "Next"}
            </button>
          )}
        </div>

        <div className="answer-strip">
          {visibleQuestions.slice(0, 6).map((question) => (
            <button
              key={question.id}
              type="button"
              className={`answer-pill${question.id === activeQuestion.id && !showResults ? " answer-pill-active" : ""}`}
              onClick={() => {
                setShowResults(false);
                setActiveQuestionId(question.id);
              }}
            >
              <strong>{question.title}</strong>
              <span>{labelForAnswer(question, answers)}</span>
            </button>
          ))}
        </div>
      </div>

      <aside className="results-panel">
        <div className="editorial-shot">
          <div className="editorial-portrait">
            <div className="portrait-glow" />
            <div className="portrait-silhouette" />
            <div className="portrait-bottle" />
          </div>
          <div className="botanical-cluster">
            <span className="botanical botanical-leaf" />
            <span className="botanical botanical-petal" />
            <span className="botanical botanical-citrus" />
          </div>
        </div>

        <div className="results-intro">
          <p className="section-kicker">{showResults ? "Perfume Intelligence" : "House Perspective"}</p>
          <h3>
            {showResults
              ? "Your final shortlist blends style preference, wear context, climate, and major brand positioning."
              : "Our curation lens combines olfactive families, performance cues, and luxury-brand storytelling."}
          </h3>
        </div>

        <div className="knowledge-stack">
          <article className="knowledge-card">
            <p className="knowledge-title">Botanical profile</p>
            <p>Woody, citrus, floral, amber, musk, spice, and powdery signatures are translated into wearable brand matches.</p>
          </article>
          <article className="knowledge-card">
            <p className="knowledge-title">Performance profile</p>
            <p>Projection, longevity, and climate fit are treated as separate signals so the shortlist feels practical, not random.</p>
          </article>
          <article className="knowledge-card">
            <p className="knowledge-title">Luxury framing</p>
            <p>Major global houses are prioritized elegantly, with room for niche discovery when the user is open to it.</p>
          </article>
        </div>
      </aside>
    </section>
  );
}
