import type { CreateWord, Word, WordUpdateForm } from "../interfaces/dico/word";
import { api, ContentType } from "./api";

export async function getAllWords() {
  return await api.get<Word[]>(ContentType.WORDS, undefined, {
    sourceLanguage: "FR",
    targetLanguage: "AR",
  });
}
export async function getMyWords() {
  return await api.get<Word[]>(ContentType.WORDS, "/my-words");
}

export async function updateWord(uuid: string, data: WordUpdateForm) {
  return await api.update<WordUpdateForm, Word>(
    ContentType.WORDS,
    data,
    `/${uuid}`
  );
}

export async function deleteWord(uuid: string) {
  return await api.delete<{ message: string }>(ContentType.WORDS, `/${uuid}`);
}

export async function deleteAllWords() {
  return await api.delete<{ message: string }>(ContentType.WORDS, "/clear/all");
}

export async function createWord(newWord: CreateWord) {
  return await api.create<CreateWord, Word>(ContentType.WORDS, newWord);
}

export async function importWord(words: CreateWord[]) {
  return await api.create<
    CreateWord[],
    { created: number; skipped: number; error: Array<string>; message: string }
  >(ContentType.WORDS, words, "/import");
}
