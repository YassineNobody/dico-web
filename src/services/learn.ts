import type { Learn } from "../interfaces/learn/learn";
import { api, ContentType } from "./api";

export async function learnGetByCategory(categoryId: number) {
  return await api.get<Learn[]>(ContentType.LEARN, `/category/${categoryId}`);
}

export async function learnGetAll() {
  return await api.get<Learn[]>(ContentType.LEARN);
}
