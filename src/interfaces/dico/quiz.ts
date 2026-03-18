export type QuizQuestion = {
  uuid: string;
  question: string;
  correctAnswer: string;
  choices: string[];
};
export type CreateQuiz = {
  themes: string[];
  sourceLanguage: "AR" | "FR";
  targetLanguage: "AR" | "FR";
  limit: number;
};
