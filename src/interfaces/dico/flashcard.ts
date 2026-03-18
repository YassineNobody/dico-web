import type { Word } from "./word";

export type CreateFlashcard = {
  themes: string[];
  sourceLanguage: "AR" | "FR";
  targetLanguage: "AR" | "FR";
  limit: number;
};

export type FlashCard = Pick<
  Word,
  "uuid" | "sourceWord" | "translationWord" | "wordType" | "themes"
>;
