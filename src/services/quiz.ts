import type { CreateQuiz, QuizQuestion } from "../interfaces/dico/quiz";
import { api, ContentType } from "./api";

export async function getMetaQuiz(themes: string[], limit: number) {
  return await api.create<
    CreateQuiz,
    { totalWords: number; totalSections: number }
  >(
    ContentType.QUIZ,
    {
      themes,
      limit,
      sourceLanguage: "FR",
      targetLanguage: "AR",
    },
    "/meta",
  );
}

export async function getQuiz(
  limit: number,
  themes: string[],
  section: number,
) {
  return await api.create<
    CreateQuiz & { section: number },
    {
      section: number;
      totalSections: number;
      questions: QuizQuestion[];
    }
  >(ContentType.QUIZ, {
    limit,
    themes,
    sourceLanguage: "FR",
    targetLanguage: "AR",
    section,
  });
}
