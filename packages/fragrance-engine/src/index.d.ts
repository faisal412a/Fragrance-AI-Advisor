export type QuestionnaireOption = {
  value: string;
  label: string;
};

export type QuestionnaireQuestion = {
  id: string;
  type: "single_select" | "multi_select";
  required: boolean;
  title: string;
  options: QuestionnaireOption[];
  maxSelections?: number;
  showWhen?: {
    questionId: string;
    operator: "equals";
    value: string;
  };
};

export type Questionnaire = {
  version: number;
  title: string;
  questions: QuestionnaireQuestion[];
};

export declare const questionnaire: Questionnaire;

export declare function buildProfileSummary(answers: Record<string, unknown>): {
  demographicFocus: {
    genderDirection: string;
    ageRange: string;
  };
  summary: string;
  recommendationHints: Record<string, unknown>;
};

export declare const brands: Array<Record<string, unknown>>;
export declare const perfumes: Array<Record<string, unknown>>;
export declare function getBrandById(brandId: string): Record<string, unknown> | null;
export declare function recommendPerfumes(
  answers: Record<string, unknown>,
  options?: { limit?: number }
): {
  profileSummary: ReturnType<typeof buildProfileSummary>;
  totalCandidates: number;
  recommendations: Array<Record<string, unknown>>;
};
