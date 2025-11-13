import type { LearnCategories } from "../interfaces/learnCategories/learnCategories";
import { api, ContentType } from "./api";

export async function getAllCategories() {
  return await api.get<LearnCategories[]>(ContentType.LEARN_CATEGORIES);
}
