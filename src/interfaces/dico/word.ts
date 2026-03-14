export const WordType = {
  noun: "noun",
  verb: "verb",
  adjective: "adjective",
  adverb: "adverb",
  preposition: "preposition",
  pronoun: "pronoun",
  suffix: "suffix",
  other: "other",
};

export type WordType = (typeof WordType)[keyof typeof WordType];

export interface Word {
  id?: number;
  uuid?: string;
  sourceLanguage: "FR" | "AR";
  targetLanguage: "FR" | "AR";
  wordType: WordType;
  createdAt?: string;
  sourceWord: string;
  themes: string[];
  translationWord: string;
  normalizedWord: string;

  // 🔹 Ajout de la relation
  userId: number; // FK vers User.id
  user?: {
    id?: number | null;
    username?: string | null;
    nickname?: string | null;
    profile?: string | null;
  } | null;
  author?: {
    id?: number | null;
    username?: string | null;
    nickname?: string | null;
    profile?: string | null;
  } | null;
}

export interface WordUpdateForm {
  wordType?: WordType;
  translationWord?: string;
  sourceWord?: string;
}

export interface CreateWord {
  sourceLanguage: "FR" | "AR";
  targetLanguage: "FR" | "AR";
  wordType: WordType;
  sourceWord: string;
  themes: string[];
  translationWord: string;
}
