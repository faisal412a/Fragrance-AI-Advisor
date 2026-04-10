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

  function updateAnswer(question: QuestionnaireQuestion, value: string) {
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
            <h2>{activeQuestion.title}</h2>
          </div>
          <div className="progress-wrap" aria-label={`Quiz progress ${progress}%`}>
            <span>{progress}%</span>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

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

        <div className="quiz-footer">
          <button className="ghost-button" type="button" onClick={goToPreviousQuestion} disabled={activeIndex === 0}>
            Previous
          </button>
          <button
            className="primary-button"
            type="button"
            onClick={goToNextQuestion}
            disabled={activeIndex === visibleQuestions.length - 1}
          >
            Next
          </button>
        </div>

        <div className="answer-strip">
          {visibleQuestions.slice(0, 6).map((question) => (
            <button
              key={question.id}
              type="button"
              className={`answer-pill${question.id === activeQuestion.id ? " answer-pill-active" : ""}`}
              onClick={() => setActiveQuestionId(question.id)}
            >
              <strong>{question.title}</strong>
              <span>{labelForAnswer(question, answers)}</span>
            </button>
          ))}
        </div>
      </div>

      <aside className="results-panel">
        <div className="results-intro">
          <p className="section-kicker">Recommendation Preview</p>
          <h3>{recommendations.profileSummary.summary}</h3>
        </div>

        <div className="recommendation-stack">
          {recommendations.recommendations.map((recommendation) => (
            <article key={String(recommendation.perfumeId)} className="result-card">
              <div className="result-rank">0{String(recommendation.rank)}</div>
              <div className="result-copy">
                <p className="result-brand">{String(recommendation.brand)}</p>
                <h4>{String(recommendation.name)}</h4>
                <p className="result-reason">{String(recommendation.reason)}</p>
                <div className="tag-row">
                  {(recommendation.notesSummary as string[]).map((note) => (
                    <span key={note} className="tag">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </aside>
    </section>
  );
}
