"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { questionnaire, recommendPerfumes } from "@fragrance-ai/fragrance-engine";

type AnswerValue = string | string[];
type Answers = Record<string, AnswerValue>;
type QuestionnaireQuestion = (typeof questionnaire.questions)[number];

const initialAnswers: Answers = {
  avoidances: []
};

const questionScenes: Record<
  string,
  {
    overline: string;
    headline: string;
    body: string;
    themeClass: string;
    sceneClass: string;
  }
> = {
  gender_direction: {
    overline: "Identity",
    headline: "Shape the scent point of view.",
    body: "Begin with the fragrance direction that feels closest to the wearer.",
    themeClass: "theme-noir",
    sceneClass: "scene-silhouette"
  },
  age_range: {
    overline: "Profile",
    headline: "Set the generation and tone.",
    body: "Age helps position the scent story, its polish, and its energy.",
    themeClass: "theme-smoke",
    sceneClass: "scene-atelier"
  },
  usage: {
    overline: "Occasion",
    headline: "Choose where this perfume should shine.",
    body: "From office elegance to evening presence, occasion changes the formula.",
    themeClass: "theme-night",
    sceneClass: "scene-marble"
  },
  longevity: {
    overline: "Performance",
    headline: "Decide how long the aura should stay.",
    body: "We balance freshness, concentration, and lasting power to match your goal.",
    themeClass: "theme-graphite",
    sceneClass: "scene-bottle"
  },
  style_preferences: {
    overline: "Character",
    headline: "Choose the notes and moods that speak to you.",
    body: "Pick up to three styles. This is the heart of the recommendation profile.",
    themeClass: "theme-emerald",
    sceneClass: "scene-botanicals"
  },
  projection: {
    overline: "Impression",
    headline: "Control how the scent moves in the room.",
    body: "Projection determines whether the fragrance whispers, balances, or makes a statement.",
    themeClass: "theme-obsidian",
    sceneClass: "scene-glass"
  },
  budget: {
    overline: "Curation",
    headline: "Set the investment range.",
    body: "We use budget as a curation boundary so the shortlist feels realistic and premium.",
    themeClass: "theme-gold",
    sceneClass: "scene-gilded"
  },
  climate: {
    overline: "Climate",
    headline: "Match the perfume to the air around you.",
    body: "Heat, cool evenings, and year-round versatility all change how a fragrance unfolds.",
    themeClass: "theme-frost",
    sceneClass: "scene-silk"
  },
  brand_scope: {
    overline: "House Lens",
    headline: "Choose the brand world you want to explore.",
    body: "Stay with iconic global houses, or open the door to discovery.",
    themeClass: "theme-noir",
    sceneClass: "scene-shelves"
  },
  gift_target: {
    overline: "Gifting",
    headline: "Refine the recipient profile.",
    body: "A better gifting direction helps us keep the shortlist safer and more flattering.",
    themeClass: "theme-smoke",
    sceneClass: "scene-ribbon"
  },
  avoidances: {
    overline: "Editing",
    headline: "Remove what should not be in the formula.",
    body: "One final edit lets us avoid styles that would feel off from the start.",
    themeClass: "theme-night",
    sceneClass: "scene-petals"
  }
};

function shouldShowQuestion(question: QuestionnaireQuestion, answers: Answers) {
  if (!question.showWhen) {
    return true;
  }

  return answers[question.showWhen.questionId] === question.showWhen.value;
}

function optionIsSelected(question: QuestionnaireQuestion, answers: Answers, value: string) {
  const current = answers[question.id];
  return question.type === "multi_select" ? (Array.isArray(current) ? current.includes(value) : false) : current === value;
}

function nextMultiValue(current: AnswerValue | undefined, value: string, maxSelections = Infinity) {
  const list = Array.isArray(current) ? current.filter((item) => item !== "none") : [];

  if (value === "none") {
    return ["none"];
  }

  if (list.includes(value)) {
    return list.filter((item) => item !== value);
  }

  return [...list, value].slice(0, maxSelections);
}

function labelForAnswer(question: QuestionnaireQuestion, answers: Answers) {
  const current = answers[question.id];

  if (Array.isArray(current)) {
    if (!current.length) {
      return "Awaiting selection";
    }

    return question.options
      .filter((option) => current.includes(option.value))
      .map((option) => option.label)
      .join(", ");
  }

  return question.options.find((option) => option.value === current)?.label || "Awaiting selection";
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
  const activeScene = questionScenes[activeQuestion?.id] || questionScenes.usage;
  const totalSteps = visibleQuestions.length;
  const progress = Math.round(((showResults ? totalSteps : activeIndex + 1) / totalSteps) * 100);
  const recommendations = useMemo(() => recommendPerfumes(answers, { limit: 4 }), [answers]);

  useEffect(() => {
    if (!visibleQuestions.some((question) => question.id === activeQuestionId)) {
      setActiveQuestionId(visibleQuestions[0]?.id || "");
    }
  }, [activeQuestionId, visibleQuestions]);

  function goToNextQuestion() {
    const nextQuestion = visibleQuestions[activeIndex + 1];
    if (nextQuestion) {
      setActiveQuestionId(nextQuestion.id);
      return;
    }

    setShowResults(true);
  }

  function goToPreviousQuestion() {
    if (showResults) {
      setShowResults(false);
      setActiveQuestionId(visibleQuestions[visibleQuestions.length - 1]?.id || activeQuestionId);
      return;
    }

    const previousQuestion = visibleQuestions[activeIndex - 1];
    if (previousQuestion) {
      setActiveQuestionId(previousQuestion.id);
    }
  }

  function updateAnswer(question: QuestionnaireQuestion, value: string) {
    if (showResults) {
      setShowResults(false);
    }

    startTransition(() => {
      setAnswers((current) => {
        if (question.type === "multi_select") {
          return {
            ...current,
            [question.id]: nextMultiValue(current[question.id], value, question.maxSelections)
          };
        }

        return { ...current, [question.id]: value };
      });
    });

    if (question.type === "single_select") {
      window.setTimeout(() => {
        goToNextQuestion();
      }, 220);
    }
  }

  return (
    <section className={`ritual-shell ${showResults ? "ritual-results" : activeScene.themeClass}`}>
      <div className={`ritual-scene ${activeScene.sceneClass}`}>
        <header className="ritual-nav">
          <a className="brand-mark" href="#top">
            Fragrance AI
          </a>
          <nav className="ritual-links" aria-label="Primary">
            <a href="#how">How it works</a>
            <a href="#notes">Notes</a>
            <a href="#quiz">Ritual</a>
            <a href="#results">Results</a>
          </nav>
        </header>

        {!showResults ? (
          <div className="ritual-stage">
            <div className="ritual-copy">
              <p className="ritual-overline">{activeScene.overline}</p>
              <h2>{activeScene.headline}</h2>
              <p className="ritual-body">{activeScene.body}</p>
            </div>

            <div className="question-card">
              <div className="question-meta">
                <span>
                  Step {activeIndex + 1} of {totalSteps}
                </span>
                <span>{progress}% complete</span>
              </div>
              <h3>{activeQuestion.title}</h3>
              <p className="question-hint">
                {activeQuestion.type === "multi_select"
                  ? `Choose up to ${activeQuestion.maxSelections || 3}, then continue.`
                  : "Select one answer and we will move to the next scene automatically."}
              </p>

              <div className={`choice-grid${activeQuestion.type === "multi_select" ? " choice-grid-compact" : ""}`}>
                {activeQuestion.options.map((option) => {
                  const selected = optionIsSelected(activeQuestion, answers, option.value);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`choice-chip${selected ? " choice-chip-selected" : ""}`}
                      onClick={() => updateAnswer(activeQuestion, option.value)}
                    >
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="question-actions">
                <button className="ghost-button dark-ghost" type="button" onClick={goToPreviousQuestion} disabled={activeIndex === 0}>
                  Previous
                </button>
                {activeQuestion.type === "multi_select" ? (
                  <button className="primary-button dark-button" type="button" onClick={goToNextQuestion}>
                    {activeIndex === totalSteps - 1 ? "Finish" : "Continue"}
                  </button>
                ) : (
                  <div className="auto-note">Auto-advances on selection</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="results-stage" id="results">
            <div className="results-hero">
              <p className="ritual-overline">Results</p>
              <h2>Your formula is ready.</h2>
              <p className="ritual-body">{recommendations.profileSummary.summary}</p>
            </div>

            <div className="results-grid">
              {recommendations.recommendations.map((recommendation) => (
                <article key={String(recommendation.perfumeId)} className="formula-card">
                  <div className="formula-rank">0{String(recommendation.rank)}</div>
                  <p className="formula-brand">{String(recommendation.brand)}</p>
                  <h3>{String(recommendation.name)}</h3>
                  <p className="formula-reason">{String(recommendation.reason)}</p>
                  <div className="formula-tags">
                    {(recommendation.notesSummary as string[]).map((note) => (
                      <span key={note} className="formula-tag">
                        {note}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="results-actions">
              <button className="ghost-button dark-ghost" type="button" onClick={goToPreviousQuestion}>
                Back to quiz
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="ritual-progress">
        {visibleQuestions.map((question, index) => (
          <button
            key={question.id}
            type="button"
            className={`progress-stop${index === activeIndex && !showResults ? " progress-stop-active" : ""}`}
            onClick={() => {
              setShowResults(false);
              setActiveQuestionId(question.id);
            }}
          >
            <strong>{index + 1}</strong>
            <span>{labelForAnswer(question, answers)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
