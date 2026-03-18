import type { CreateFlashcard, FlashCard } from "../interfaces/dico/flashcard";
import { api, ContentType } from "./api";

export async function getMetaFlashCard(limit: number, themes: string[]) {
  return await api.create<
    CreateFlashcard,
    { totalWords: number; totalSections: number }
  >(
    ContentType.FLASHCARD,
    { themes, limit, sourceLanguage: "FR", targetLanguage: "AR" },
    "/meta",
  );
}

export async function getFlashcards(
  limit: number,
  themes: string[],
  section: number,
) {
  return await api.create<
    CreateFlashcard & { section: number },
    {
      section: number;
      totalSections: number;
      cards: FlashCard[];
    }
  >(ContentType.FLASHCARD, {
    limit,
    themes,
    sourceLanguage: "FR",
    targetLanguage: "AR",
    section,
  });
}
